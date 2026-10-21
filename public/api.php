<?php
declare(strict_types=1);
ini_set('display_errors','0');ini_set('log_errors','1');
require dirname(__DIR__).'/app/bootstrap.php';
use InvoiceDesk\{Auth,Service,Jobs,Report,Archive,InvoiceView,Vault,Http,Gst,Downloads,Diagnostics};
use function InvoiceDesk\{config,db,json,now,audit};
header('Cache-Control: no-store, private');header('X-Content-Type-Options: nosniff');header('X-Frame-Options: DENY');header('Referrer-Policy: same-origin');
set_exception_handler(function(Throwable $e){
    $r=Diagnostics::response($e,['action'=>substr((string)($_GET['action']??''),0,60)]);json($r,$e instanceof Error?500:400);
});
if((config()['require_https']??true) && !Auth::https())json(['error'=>'HTTPS is required. Configure HTTPS for this app and pass HTTPS=on through your trusted reverse proxy if applicable.'],400);
Auth::start();$action=$_GET['action']??'bootstrap';$method=$_SERVER['REQUEST_METHOD'];$body=[];
if($method==='POST'){
    if((int)($_SERVER['CONTENT_LENGTH']??0)>2097152)json(['error'=>'Request too large.'],413);
    $body=json_decode(file_get_contents('php://input')?:'{}',true,64,JSON_THROW_ON_ERROR);if(!is_array($body))json(['error'=>'JSON object required.'],400);Auth::csrf();
}
$s=new Service();$jobs=new Jobs($s);
if($action==='bootstrap')json(['installed'=>(bool)db()->one('SELECT id FROM users LIMIT 1'),'user'=>Auth::user(),'csrf'=>$_SESSION['csrf'],'configured'=>(bool)db()->get('connection'),'preferences'=>$s->settings(),'currencies'=>db()->get('currencies',[]),'timezone'=>config()['timezone']??'Asia/Kolkata','today'=>date('Y-m-d')]);
if($action==='login' && $method==='POST'){Auth::login((string)($body['email']??''),(string)($body['password']??''));json(['ok'=>true,'csrf'=>$_SESSION['csrf']]);}
if($action==='install' && $method==='POST'){Auth::install($body);json(['ok'=>true]);}
$u=Auth::require();
if($method==='POST' && $action==='logout'){audit('logout');$_SESSION=[];session_destroy();json(['ok'=>true]);}
if($action==='dashboard' && $method==='GET')json(Report::dashboard($_GET));
if($action==='gst_summary' && $method==='GET')json(Report::gstSummary($_GET));
if($action==='download_summary' && $method==='GET')json(Downloads::summary($_GET));
if($action==='download_history' && $method==='GET')json(Downloads::history($_GET));
if($action==='invoices' && $method==='GET')json(Report::invoices($_GET));
if($action==='invoice' && $method==='GET'){
    $id=(int)($_GET['id']??0);$i=db()->one('SELECT * FROM invoices WHERE id=?',[$id]);if(!$i)json(['error'=>'Invoice not found'],404);
    $i['payload']=json_decode($i['payload'],true);$i['issues']=json_decode($i['issues'],true);$i['pdf_check']=$i['pdf_check']?json_decode($i['pdf_check'],true):null;
    $i['review_record']=db()->one('SELECT r.*,u.name AS reviewer FROM reviews r LEFT JOIN users u ON u.id=r.user_id WHERE invoice_id=?',[$id]);
    $i['downloads']=Downloads::history(['invoice_id'=>$id])['rows'];$i['download_state']=db()->one("SELECT * FROM download_state WHERE invoice_id=? AND format='pdf'",[$id]);
    $i['transactions']=db()->all('SELECT * FROM transactions WHERE invoice_id=? ORDER BY date,id',[$id]);json($i);
}
if($action==='clients' && $method==='GET'){
    $term='%'.substr($_GET['search']??'',0,100).'%';json(['rows'=>db()->all('SELECT c.id,c.name,c.email,c.currency,c.wallet,c.ledger_at,COUNT(i.id) AS invoices,SUM(CASE WHEN i.balance>0 AND i.status NOT IN (\'Cancelled\',\'Draft\') THEN i.balance ELSE 0 END) AS due FROM clients c LEFT JOIN invoices i ON i.client_id=c.id WHERE c.name LIKE ? OR c.email LIKE ? OR CAST(c.id AS TEXT) LIKE ? GROUP BY c.id ORDER BY c.id DESC LIMIT 100',[$term,$term,$term])]);
}
if($action==='ledger' && $method==='GET')json(Report::ledger((int)($_GET['id']??0),$_GET));
if($action==='jobs' && $method==='GET'){
    $rows=db()->all('SELECT * FROM jobs ORDER BY created_at DESC LIMIT 40');foreach($rows as &$j){unset($j['params'],$j['cursor']);$j['failures']=db()->all("SELECT record_id,error,attempts FROM tasks WHERE job_id=? AND state='failed' LIMIT 30",[$j['id']]);$j['downloadable']=$j['type']==='archive'&&in_array($j['state'],['complete','partial'],true)&&is_file((new Archive($s))->path($j['id']));}unset($j);json(['rows'=>$rows]);
}
if(in_array($action,['copy','pdf','download','csv','ledger_csv','payments_csv','credits_csv','history_csv'],true) && $method==='GET'){
    Auth::require('analyst');session_write_close();
    if($action==='copy'){$i=db()->one('SELECT * FROM invoices WHERE id=?',[(int)$_GET['id']]);if(!$i)json(['error'=>'Not found'],404);header('Content-Type: text/html; charset=utf-8');echo InvoiceView::html($i);exit;}
    if($action==='pdf'){
        $id=(int)$_GET['id'];$r=(new Archive($s))->pdf($id);
        if(!empty($_GET['preview'])){header('Content-Type: application/pdf');header('Content-Disposition: inline; filename="invoice-'.$id.'.pdf"');readfile($r['path']);exit;}
        Downloads::serve($r['path'],'application/pdf','invoice-'.$id.'.pdf',[['invoice_id'=>$id,'source_hash'=>$r['source_hash']]],'pdf',$u);exit;
    }
    if($action==='download'){
        $id=(string)($_GET['id']??'');$j=db()->one('SELECT state,type,params FROM jobs WHERE id=?',[$id]);
        if(!$j||$j['type']!=='archive'||!in_array($j['state'],['complete','partial'],true))throw new RuntimeException('Archive is not ready.');
        $path=(new Archive($s))->path($id);if(!is_file($path))throw new RuntimeException('Archive expired. Create it again.');
        $members=db()->all("SELECT m.invoice_id,m.source_hash FROM archive_members m JOIN tasks t ON t.job_id=m.job_id AND t.record_id=m.invoice_id WHERE m.job_id=? AND t.state='done'",[$id]);
        if(!$members)throw new RuntimeException('This older archive has no version manifest. Rebuild it to enable accurate download tracking.');
        $params=json_decode($j['params'],true);Downloads::serve($path,'application/zip','Munshi-Ji-'.$id.'.zip',$members,$params['format']??'pdf',$u,$id);exit;
    }
    header('Content-Type: text/csv; charset=utf-8');header('Content-Disposition: attachment; filename="Munshi-Ji-'.date('Ymd-His').'.csv"');$f=fopen('php://output','w');fwrite($f,"\xEF\xBB\xBF");
    if($action==='history_csv'){audit('download_history_export');Downloads::csv($f);}
    elseif($action==='csv'){audit('csv_export');Report::invoiceCsv($f,$_GET);}
    elseif($action==='ledger_csv')InvoiceDesk\Ledger::csv($f,(int)$_GET['id'],$_GET);
    else Report::paymentCsv($f,(int)($_GET['id']??0),$_GET,$action==='credits_csv');
    fclose($f);exit;
}
if($action==='connection' && $method==='GET'){
    Auth::require('admin');$c=$s->connection();foreach(['secret','db_password','bridge_secret'] as $key){$c[$key.'_set']=!empty($c[$key]);unset($c[$key]);}json($c);
}
if($action==='diagnostics' && $method==='GET'){Auth::require('admin');json(Diagnostics::report(substr((string)($_GET['reference']??''),0,30)));}
if($action==='audit' && $method==='GET'){Auth::require('admin');json(['rows'=>db()->all('SELECT a.*,u.name FROM audit a LEFT JOIN users u ON u.id=a.user_id ORDER BY a.id DESC LIMIT 150')]);}
if($action==='users' && $method==='GET'){Auth::require('admin');json(['rows'=>db()->all('SELECT id,name,email,role,enabled,created_at FROM users ORDER BY id')]);}
if($method!=='POST')json(['error'=>'Unknown route'],404);
if($action==='password'){
    $old=db()->one('SELECT hash FROM users WHERE id=?',[$u['id']]);if(!password_verify($body['current']??'',$old['hash']))throw new RuntimeException('Current password is incorrect.');
    db()->run('UPDATE users SET hash=?,version=version+1 WHERE id=?',[Auth::password($body['password']??''),$u['id']]);audit('password_changed');json(['ok'=>true]);
}
Auth::require('analyst');
if($action==='job_create'){
    $type=(string)($body['type']??'sync');$p=$body['params']??[];
    if(in_array($type,['archive','refresh','pdf_scan'],true)){
        $p['ids']=!empty($p['all_filtered'])?Report::ids($p['filter']??[]):array_values(array_unique(array_map('intval',$p['ids']??[])));
        if(count($p['ids'])>10000)throw new RuntimeException('Use smaller date ranges: maximum 10,000 invoices per job.');
    }
    json(['id'=>$jobs->create($type,$p)]);
}
if($action==='job_tick'){session_write_close();@set_time_limit(55);json($jobs->tick(isset($body['id'])?(string)$body['id']:null));}
if($action==='job_retry'){$jobs->retry((string)$body['id']);json(['ok'=>true]);}
if($action==='job_cancel'){
    $l=InvoiceDesk\lock('worker');try{db()->run("UPDATE jobs SET state='cancelled',message='Cancelled by user',updated_at=? WHERE id=? AND state IN ('queued','running','partial','failed')",[now(),$body['id']]);audit('job_cancelled',['id'=>$body['id']]);}finally{flock($l,LOCK_UN);fclose($l);}json(['ok'=>true]);
}
if($action==='review'){
    $id=(int)$body['id'];$i=db()->one('SELECT source_hash FROM invoices WHERE id=?',[$id]);if(!$i)throw new RuntimeException('Invoice not found.');
    $status=in_array($body['status']??'',['reviewed','open'],true)?$body['status']:'open';
    db()->run('INSERT INTO reviews(invoice_id,status,note,user_id,updated_at,source_hash) VALUES(?,?,?,?,?,?) ON CONFLICT(invoice_id) DO UPDATE SET status=excluded.status,note=excluded.note,user_id=excluded.user_id,updated_at=excluded.updated_at,source_hash=excluded.source_hash',[$id,$status,substr($body['note']??'',0,2000),$u['id'],now(),$i['source_hash']]);audit('invoice_reviewed',['invoice'=>$id,'status'=>$status]);json(['ok'=>true]);
}
if($action==='pdf_check'){session_write_close();json((new Archive($s))->verifyPdf((int)$body['id']));}
Auth::require('admin');
if(in_array($action,['connection_test','connection_save'],true)){
    $allowed=['mode','instance','api_url','identifier','secret','db_host','db_port','db_name','db_user','db_password','db_ssl_ca','bridge_url','bridge_secret'];
    $old=$s->connection();$c=[];foreach($allowed as $k)$c[$k]=$body[$k]??'';
    foreach(['secret','db_password','bridge_secret'] as $k)if($c[$k]==='' && !empty($old[$k]))$c[$k]=$old[$k];
    if(strlen(trim($c['instance']))<3)throw new RuntimeException('Give this WHMCS instance a stable name, such as manage.hostingspell.com.');
    if($old && $old['instance']!==$c['instance'] && db()->one('SELECT id FROM invoices LIMIT 1'))throw new RuntimeException('This cache belongs to another instance name. Use a fresh installation for a different WHMCS system.');
    if($c['mode']==='api'){$c['api_url']=Http::validateUrl($c['api_url']);$src=new InvoiceDesk\Connectors\Api($c);}elseif($c['mode']==='db'){$src=new InvoiceDesk\Connectors\Database($c);}else throw new RuntimeException('Choose API or database mode.');
    if($c['bridge_url']!=='')$c['bridge_url']=Http::validateUrl($c['bridge_url']);
    $result=$src->test();$currencies=$src->currencies();if(!$currencies)throw new RuntimeException('No currencies returned.');
    if($c['bridge_url']!=='')$result['bridge']=(new InvoiceDesk\Bridge($c))->call('health');
    if($action==='connection_save'){if(db()->one("SELECT id FROM jobs WHERE state IN ('queued','running') LIMIT 1"))throw new RuntimeException('Finish or cancel the active job before changing connections.');db()->set('connection',Vault::encrypt($c));db()->set('currencies',$currencies);audit('connection_saved',['mode'=>$c['mode'],'instance'=>$c['instance']]);}
    json($result+['currencies'=>$currencies,'saved'=>$action==='connection_save']);
}
if($action==='preferences'){
    $v=$s->settings();$v['company']=substr(trim($body['company']??$v['company']),0,120);$v['supplier_gstin']=strtoupper(trim($body['supplier_gstin']??''));
    if($v['supplier_gstin']!=='' && !Gst::validate($v['supplier_gstin'])['valid'])throw new RuntimeException('Supplier GSTIN fails format, state or checksum checks.');
    $v['gst_labels']=substr($body['gst_labels']??$v['gst_labels'],0,500);$v['tax_is_gst']=(bool)($body['tax_is_gst']??false);$v['archive_days']=min(90,max(1,(int)($body['archive_days']??7)));$v['client_cache_minutes']=min(60,max(0,(int)($body['client_cache_minutes']??5)));
    $accent=$body['accent']??$v['accent'];if(preg_match('/^#[0-9a-fA-F]{6}$/D',$accent))$v['accent']=$accent;
    db()->set('preferences',$v);db()->run("UPDATE clients SET fetched_at='1970-01-01 00:00:00'");audit('preferences_saved');json(['ok'=>true,'note'=>'Refresh imported invoices after changing GST rules to recalculate checks.']);
}
if($action==='user_save'){
    $id=(int)($body['id']??0);$email=trim($body['email']??'');$role=$body['role']??'viewer';$enabled=empty($body['enabled'])?0:1;
    if(!filter_var($email,FILTER_VALIDATE_EMAIL)||!in_array($role,['admin','analyst','viewer'],true))throw new RuntimeException('Valid email and role required.');
    if($id===$u['id'] && ($role!=='admin'||!$enabled))throw new RuntimeException('You cannot disable or demote your own administrator account.');
    if($id){db()->run('UPDATE users SET name=?,email=?,role=?,enabled=?,version=version+1 WHERE id=?',[substr($body['name']??'',0,100),$email,$role,$enabled,$id]);if(!empty($body['password']))db()->run('UPDATE users SET hash=? WHERE id=?',[Auth::password($body['password']),$id]);}
    else db()->run('INSERT INTO users(email,name,hash,role,enabled,created_at) VALUES(?,?,?,?,?,?)',[$email,substr($body['name']??'',0,100),Auth::password($body['password']??''),$role,$enabled,now()]);
    audit('user_saved',['id'=>$id?:db()->pdo->lastInsertId(),'role'=>$role,'enabled'=>$enabled]);json(['ok'=>true]);
}
if($action==='bridge_poll'){
    $events=$s->bridge()->call('events');$ids=array_column($events['events']??[],'invoice_id');if(!$ids)json(['message'=>'No pending hook events.']);
    $id=$jobs->create('refresh',['ids'=>$ids]);db()->set('bridge_ack_'.$id,$events['events']);json(['id'=>$id,'message'=>'Hook events queued. They will be acknowledged after successful import.']);
}
if($action==='prune')json(['removed'=>(new Archive($s))->prune()]);
json(['error'=>'Unknown action'],404);
