<?php
declare(strict_types=1);
ini_set('display_errors','0');ini_set('log_errors','1');
// Copy this file beside WHMCS init.php. Edit ONLY this private configuration path.
$invoiceDeskConfigPath='/home/CPANELUSER/private/invoicedesk-bridge-config.php';
header('Cache-Control: no-store');header('X-Content-Type-Options: nosniff');header('X-Frame-Options: DENY');
function idBridgeJson(array $v,int $status=200): never {http_response_code($status);header('Content-Type: application/json');echo json_encode($v,JSON_INVALID_UTF8_SUBSTITUTE);exit;}
set_exception_handler(function(Throwable $e){error_log('InvoiceDesk bridge: '.get_class($e).' '.$e->getMessage());idBridgeJson(['error'=>'Bridge could not complete this operation. Check its private PHP error log and installed WHMCS version.'],500);});
if(!is_file($invoiceDeskConfigPath))idBridgeJson(['error'=>'Bridge configuration is missing.'],503);
$c=require $invoiceDeskConfigPath;
if(($c['require_https']??true) && (empty($_SERVER['HTTPS'])||$_SERVER['HTTPS']==='off'))idBridgeJson(['error'=>'HTTPS required'],400);
if($_SERVER['REQUEST_METHOD']!=='POST')idBridgeJson(['error'=>'POST required'],405);
if(!empty($c['allow_ips'])&&!in_array($_SERVER['REMOTE_ADDR']??'',$c['allow_ips'],true))idBridgeJson(['error'=>'Forbidden'],403);
if((int)($_SERVER['CONTENT_LENGTH']??0)>65536)idBridgeJson(['error'=>'Too large'],413);
$body=file_get_contents('php://input',false,null,0,65537);if(strlen($body)>65536)idBridgeJson(['error'=>'Too large'],413);
$t=$_SERVER['HTTP_X_INVOICEDESK_TIME']??'';$nonce=$_SERVER['HTTP_X_INVOICEDESK_NONCE']??'';$sig=$_SERVER['HTTP_X_INVOICEDESK_SIGNATURE']??'';
if(!ctype_digit($t)||abs(time()-(int)$t)>300||!preg_match('/^[0-9a-f]{32}$/D',$nonce)||strlen($c['secret']??'')<32||str_contains($c['secret'],'REPLACE_')||!hash_equals(hash_hmac('sha256',$t."\n".$nonce."\n".$body,$c['secret']),$sig))idBridgeJson(['error'=>'Authentication failed'],401);
$dir=$c['private_dir'];if(!is_dir($dir))mkdir($dir,0700,true);@chmod($dir,0700);
$q=new PDO('sqlite:'.$dir.'/queue.sqlite',null,null,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);@chmod($dir.'/queue.sqlite',0600);
$q->exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=1000; CREATE TABLE IF NOT EXISTS nonces(nonce TEXT PRIMARY KEY,expires INTEGER); CREATE TABLE IF NOT EXISTS events(invoice_id INTEGER PRIMARY KEY,version TEXT,event TEXT,created_at TEXT);');
$q->prepare('DELETE FROM nonces WHERE expires < ?')->execute([time()]);
try{$q->prepare('INSERT INTO nonces VALUES(?,?)')->execute([$nonce,time()+600]);}catch(PDOException){idBridgeJson(['error'=>'Replay rejected'],409);}
$p=json_decode($body,true,32,JSON_THROW_ON_ERROR);$action=$p['action']??'';
if($action==='events'){$events=$q->query('SELECT * FROM events ORDER BY created_at,invoice_id LIMIT 100')->fetchAll();idBridgeJson(['events'=>$events]);}
if($action==='ack'){
    $stmt=$q->prepare('DELETE FROM events WHERE invoice_id=? AND version=?');
    foreach(array_slice($p['events']??[],0,100) as $v)$stmt->execute([(int)$v['invoice_id'],$v['version']??'']);idBridgeJson(['ok'=>true]);
}
if(!in_array($action,['health','metadata','pdf'],true))idBridgeJson(['error'=>'Unknown read-only action'],400);
define('INVOICEDESK_BRIDGE',true);
ob_start();require rtrim($c['whmcs_root'],'/').'/init.php';ob_end_clean();
if(session_status()===PHP_SESSION_ACTIVE)session_write_close();
function idLoadPdfFunctions(array $c): void {$f=rtrim($c['whmcs_root'],'/').'/includes/invoicefunctions.php';if(is_file($f))require_once $f;}
if($action==='health'){
    idLoadPdfFunctions($c);
    idBridgeJson(['ok'=>true,'bridge_version'=>'1.0.0','snapshot_model'=>class_exists('WHMCS\\Billing\\Invoice'),'pdf_adapter_ready'=>!empty($c['pdf_adapter'])?is_file($c['pdf_adapter']):function_exists('pdfInvoice'),'note'=>'PDF generation must be verified against a known invoice on your installed WHMCS version.']);
}
$id=(int)($p['invoice_id']??0);if($id<1)idBridgeJson(['error'=>'Positive invoice ID required'],400);
$model=\WHMCS\Billing\Invoice::find($id);if(!$model)idBridgeJson(['error'=>'Invoice not found'],404);
if($action==='metadata'){
    $snapshot=null;$snapshotInfo='No snapshot available';
    if(!empty($c['snapshot_adapter'])){$adapter=require $c['snapshot_adapter'];$snapshot=$adapter($model);$snapshotInfo='Custom snapshot adapter';}
    else{
        $snap=$model->snapshot;
        if($snap){
            $raw=$snap->toArray();
            // Only accept a recognized client-details structure. Never label unknown data as a snapshot.
            $candidates=[$raw];
            foreach(['data','client','clientsdetails','client_details','clientDetails'] as $key)if(isset($raw[$key])){
                $v=$raw[$key];if(is_string($v)){$d=json_decode($v,true);if(is_array($d))$candidates[]=$d;}elseif(is_array($v))$candidates[]=$v;
            }
            foreach($candidates as $candidate){
                if(isset($candidate['clientsdetails'])&&is_array($candidate['clientsdetails']))$candidate=$candidate['clientsdetails'];
                if(array_key_exists('firstname',$candidate)||array_key_exists('firstName',$candidate)||array_key_exists('companyname',$candidate)){
                    $snapshot=$candidate;
                    foreach(['firstName'=>'firstname','lastName'=>'lastname','companyName'=>'companyname','taxId'=>'tax_id','postalCode'=>'postcode'] as $from=>$to)if(array_key_exists($from,$candidate))$snapshot[$to]=$candidate[$from];
                    if(isset($raw['customfields'])&&!isset($snapshot['customfields']))$snapshot['customfields']=$raw['customfields'];
                    $snapshotInfo='Recognized WHMCS snapshot';break;
                }
            }
            if(!$snapshot)$snapshotInfo='Snapshot exists but its layout needs a version-specific adapter; current-profile evidence will remain flagged';
        }
    }
    if($snapshot!==null&&!is_array($snapshot))throw new RuntimeException('Snapshot adapter must return array or null.');
    $currency=null;if(method_exists($model,'getCurrency')){$cu=$model->getCurrency();if(is_array($cu))$currency=$cu['code']??null;}if(!$currency)$currency=$model->currencyCode??null;
    idBridgeJson(['snapshot'=>$snapshot,'snapshot_info'=>$snapshotInfo,'currency'=>$currency]);
}
idLoadPdfFunctions($c);ob_start();
try{
    if(!empty($c['pdf_adapter'])){$adapter=require $c['pdf_adapter'];$pdf=$adapter($id);}
    elseif(function_exists('pdfInvoice')){$pdf=pdfInvoice($id);}
    else throw new RuntimeException('No compatible PDF function is available. Configure a version-specific PDF adapter.');
    $captured=ob_get_contents();
}finally{ob_end_clean();}
if(!is_string($pdf)||!str_starts_with($pdf,'%PDF-')){if(is_string($captured)&&str_starts_with($captured,'%PDF-'))$pdf=$captured;else throw new RuntimeException('WHMCS returned no valid PDF. Check PDF adapter and invoice template.');}
if(strlen($pdf)>20971520)throw new RuntimeException('PDF exceeds safe size limit.');
header_remove('Content-Type');header('Content-Type: application/pdf');header('Content-Disposition: attachment; filename="invoice-'.$id.'.pdf"');header('Content-Length: '.strlen($pdf));echo $pdf;
