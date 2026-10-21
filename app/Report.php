<?php
declare(strict_types=1);
namespace InvoiceDesk;
final class Report {
    public static function filter(array $q): array {
        [$from,$to]=dateRange($q);$field=['date'=>'i.date','due'=>'i.due_date','paid'=>'i.paid_date'][$q['basis']??'date']??'i.date';
        $w=[$field.' >= ?',$field.' < ?'];$a=[$from,(new \DateTimeImmutable($to))->modify('+1 day')->format('Y-m-d')];
        foreach(['status'=>'i.status','gst'=>'i.gst_status','currency'=>'i.currency','client_id'=>'i.client_id'] as $k=>$col)if(isset($q[$k]) && $q[$k]!==''){$w[]=$col.'=?';$a[]=$q[$k];}
        $download=$q['download']??'';
        $exists="EXISTS(SELECT 1 FROM download_state d WHERE d.invoice_id=i.id AND d.format='pdf')";
        if($download==='pending')$w[]='NOT '.$exists;
        if($download==='downloaded')$w[]=$exists;
        if($download==='updated')$w[]="EXISTS(SELECT 1 FROM download_state d WHERE d.invoice_id=i.id AND d.format='pdf' AND d.source_hash!=i.source_hash)";
        if($download==='needs_download')$w[]="NOT EXISTS(SELECT 1 FROM download_state d WHERE d.invoice_id=i.id AND d.format='pdf' AND d.source_hash=i.source_hash)";
        if(!empty($q['review'])){$w[]="(i.review=1 AND (r.status IS NULL OR r.status!='reviewed' OR r.source_hash!=i.source_hash))";}
        if(!empty($q['tax'])){$w[]=$q['tax']==='yes'?'(i.tax+i.tax2)!=0':'(i.tax+i.tax2)=0';}
        if(!empty($q['search'])){$w[]='(i.number LIKE ? ESCAPE \'\\\' OR i.client_name LIKE ? ESCAPE \'\\\' OR i.gstin LIKE ? ESCAPE \'\\\')';$v='%'.str_replace(['\\','%','_'],['\\\\','\\%','\\_'],substr($q['search'],0,100)).'%';array_push($a,$v,$v,$v);}
        if(!empty($q['ids'])){$ids=array_slice(array_map('intval',$q['ids']),0,10000);$w[]='i.id IN ('.implode(',',array_fill(0,count($ids),'?')).')';array_push($a,...$ids);}
        return [implode(' AND ',$w),$a];
    }
    public static function invoices(array $q): array {
        [$w,$a]=self::filter($q);$page=max(1,(int)($q['page']??1));$size=min(100,max(10,(int)($q['size']??25)));
        $count=(int)db()->one('SELECT COUNT(*) AS n FROM invoices i LEFT JOIN reviews r ON r.invoice_id=i.id WHERE '.$w,$a)['n'];
        $rows=db()->all('SELECT i.id,i.client_id,i.number,i.date,i.due_date,i.paid_date,i.status,i.currency,i.total,i.tax,i.tax2,i.balance,i.client_name,i.gstin,i.gst_status,i.basis,i.review,i.fetched_at,i.source_hash,i.issues,i.pdf_check,(SELECT last_at FROM download_state d WHERE d.invoice_id=i.id AND d.format=\'pdf\') AS last_downloaded,(SELECT last_user FROM download_state d WHERE d.invoice_id=i.id AND d.format=\'pdf\') AS downloaded_by,(SELECT count FROM download_state d WHERE d.invoice_id=i.id AND d.format=\'pdf\') AS download_count,(SELECT source_hash FROM download_state d WHERE d.invoice_id=i.id AND d.format=\'pdf\') AS downloaded_hash,r.status AS review_status,r.source_hash AS review_hash FROM invoices i LEFT JOIN reviews r ON r.invoice_id=i.id WHERE '.$w.' ORDER BY i.date DESC,i.id DESC LIMIT '.$size.' OFFSET '.(($page-1)*$size),$a);
        return ['rows'=>$rows,'total'=>$count,'page'=>$page,'pages'=>(int)ceil($count/$size)];
    }
    public static function ids(array $q): array {[$w,$a]=self::filter($q);return array_column(db()->all('SELECT i.id FROM invoices i LEFT JOIN reviews r ON r.invoice_id=i.id WHERE '.$w.' ORDER BY i.id LIMIT 10001',$a),'id');}
    private static function sales(): string {return "json_extract(i.payload,'$.invoice._kind')='invoice' AND i.status NOT IN ('Draft','Cancelled','Refunded')";}
    public static function dashboard(array $q): array {
        [$w,$a]=self::filter($q);$join=' FROM invoices i LEFT JOIN reviews r ON r.invoice_id=i.id WHERE '.$w;
        $totals=db()->all('SELECT i.currency,COUNT(*) AS invoices,SUM(i.total) AS billed,SUM(i.tax+i.tax2) AS tax,SUM(CASE WHEN i.balance>0 THEN i.balance ELSE 0 END) AS due,SUM(CASE WHEN i.status=\'Paid\' THEN i.total ELSE 0 END) AS paid_invoice_total'.$join.' AND '.self::sales().' GROUP BY i.currency',$a);
        $gst=db()->all('SELECT i.gst_status,COUNT(*) AS n'.$join.' GROUP BY i.gst_status',$a);
        $trend=db()->all("SELECT substr(i.date,1,7) AS month,i.currency,SUM(i.total) AS total,SUM(i.tax+i.tax2) AS tax".$join.' AND '.self::sales().' GROUP BY month,i.currency ORDER BY month',$a);
        $today=db()->pdo->quote(date('Y-m-d'));
        $aging=db()->all("SELECT i.currency,CASE WHEN julianday($today)-julianday(i.due_date)<=0 THEN 'Not due' WHEN julianday($today)-julianday(i.due_date)<=30 THEN '1–30 days' WHEN julianday($today)-julianday(i.due_date)<=60 THEN '31–60 days' WHEN julianday($today)-julianday(i.due_date)<=90 THEN '61–90 days' ELSE '90+ days' END AS bucket,SUM(i.balance) AS amount".$join.' AND i.balance>0 AND '.self::sales().' GROUP BY i.currency,bucket',$a);
        $top=db()->all('SELECT i.client_id,i.client_name,i.currency,SUM(i.total) AS total'.$join.' AND '.self::sales().' GROUP BY i.client_id,i.currency ORDER BY total DESC LIMIT 10',$a);
        [$from,$to]=dateRange($q);
        $payArgs=[$from,$to.' 23:59:59'];$payWhere='date>=? AND date<=?';
        if(!empty($q['currency'])){$payWhere.=' AND currency=?';$payArgs[]=$q['currency'];}
        $cash=db()->all('SELECT currency,SUM(amount_in) AS received,SUM(amount_out) AS refunded,SUM(fees) AS fees FROM transactions WHERE '.$payWhere.' GROUP BY currency',$payArgs);
        $gateways=db()->all('SELECT gateway,currency,SUM(amount_in-amount_out) AS net,SUM(amount_in) AS received,SUM(amount_out) AS refunded,SUM(fees) AS fees FROM transactions WHERE '.$payWhere.' GROUP BY gateway,currency ORDER BY net DESC',$payArgs);
        $flags=db()->one("SELECT COUNT(*) AS all_count,SUM(i.review=1 AND (r.status IS NULL OR r.status!='reviewed' OR r.source_hash!=i.source_hash)) AS review_count,MIN(i.fetched_at) AS oldest,MAX(i.fetched_at) AS newest".$join,$a);
        return compact('totals','gst','trend','aging','top','cash','gateways','flags')+['coverage'=>db()->all('SELECT * FROM coverage ORDER BY id DESC LIMIT 10'),'active'=>db()->one("SELECT id,type,state,done,total,message FROM jobs WHERE state IN ('queued','running') LIMIT 1")];
    }
    public static function ledger(int $id,array $q): array {
        $client=db()->one('SELECT * FROM clients WHERE id=?',[$id]);if(!$client)throw new \RuntimeException('Client not imported. Start a full client sync using the WHMCS client ID.');
        [$from,$to]=dateRange($q);
        $opening=Ledger::balances($id,$from,false);$balances=Ledger::balances($id,$to,true);$running=$opening;$period=[];
        $stmt=Ledger::statement($id,$from,$to,5001);
        while($r=$stmt->fetch()){$currency=$r['currency'];$running[$currency]=($running[$currency]??0)+$r['debit']-$r['credit'];$r['balance']=$running[$currency];$period[]=$r;}
        $rowCount=(int)db()->one('SELECT COUNT(*) AS n FROM ('.Ledger::query().') WHERE substr(date,1,10)>=? AND substr(date,1,10)<=?',[$id,$id,$id,$from,$to])['n'];
        $source=db()->all("SELECT currency,SUM(balance) AS balance FROM invoices WHERE client_id=? AND status NOT IN ('Draft','Cancelled') AND json_extract(payload,'$.invoice._kind')='invoice' GROUP BY currency",[$id]);
        $allTx=db()->all('SELECT * FROM transactions WHERE client_id=? AND date>=? AND date<=? ORDER BY date,id LIMIT 5001',[$id,$from,$to.' 23:59:59']);
        $wallet=db()->all('SELECT * FROM credits WHERE client_id=? AND date>=? AND date<=? ORDER BY date,id LIMIT 5001',[$id,$from,$to.' 23:59:59']);
        unset($client['data']);
        return ['client'=>$client,'opening'=>$opening,'closing'=>$balances,'rows'=>array_slice($period,0,5000),'row_count'=>$rowCount,'payments'=>array_slice($allTx,0,5000),'payments_truncated'=>count($allTx)>5000,'credits'=>array_slice($wallet,0,5000),'credits_truncated'=>count($wallet)>5000,'source_balances'=>$source,'note'=>'Reconstructed settlement ledger: credit applications use invoice dates because application timestamps are unavailable. It is not a historical general ledger. Current WHMCS balances remain the reconciliation reference.'];
    }
    public static function gstSummary(array $q): array {
        [$w,$a]=self::filter($q);$base=' FROM invoices i LEFT JOIN reviews r ON r.invoice_id=i.id WHERE '.$w.' AND '.self::sales();
        $recipients=db()->all("SELECT CASE WHEN i.gst_status='valid' THEN 'GSTIN format + checksum pass' WHEN i.gst_status='missing' THEN 'No recipient GSTIN' ELSE 'Invalid or conflicting recipient ID' END AS category,i.currency,COUNT(*) AS invoices,SUM(i.subtotal) AS subtotal,SUM(i.tax+i.tax2) AS tax,SUM(i.total) AS total".$base.' GROUP BY category,i.currency ORDER BY i.currency,category',$a);
        $rates=db()->all("SELECT json_extract(i.payload,'$.invoice.taxrate') AS taxrate,json_extract(i.payload,'$.invoice.taxrate2') AS taxrate2,i.currency,COUNT(*) AS invoices,SUM(i.tax) AS tax,SUM(i.tax2) AS tax2".$base.' GROUP BY taxrate,taxrate2,i.currency ORDER BY i.currency,taxrate',$a);
        $states=db()->all("SELECT CASE WHEN i.gst_status='valid' THEN substr(i.gstin,1,2) ELSE 'Unknown' END AS state_code,i.country,i.currency,COUNT(*) AS invoices,SUM(i.tax+i.tax2) AS tax".$base.' GROUP BY state_code,i.country,i.currency ORDER BY tax DESC LIMIT 30',$a);
        $duplicates=db()->all('SELECT i.number,COUNT(*) AS count,GROUP_CONCAT(i.id) AS ids FROM invoices i LEFT JOIN reviews r ON r.invoice_id=i.id WHERE '.$w." AND json_extract(i.payload,'$.invoice.invoicenum')!='' GROUP BY i.number HAVING COUNT(*)>1 LIMIT 30",$a);
        return compact('recipients','rates','states','duplicates');
    }
    public static function paymentCsv($f,int $id,array $q,bool $credits=false): void {
        [$from,$to]=dateRange($q);
        if($credits){
            $client=db()->one('SELECT currency FROM clients WHERE id=?',[$id]);if(!$client)throw new \RuntimeException('Client not found.');
            fputcsv($f,['Credit ID','Date','Description','Wallet movement','Currency (current client)'],',','"','');
            $s=db()->run('SELECT * FROM credits WHERE client_id=? AND date>=? AND date<=? ORDER BY date,id',[$id,$from,$to.' 23:59:59']);
            while($v=$s->fetch())fputcsv($f,array_map([self::class,'csvCell'],[$v['id'],$v['date'],$v['description'],Money::decimal($v['amount']),$client['currency']]),',','"','');
        } else {
            fputcsv($f,['Transaction ID','Date','Client ID','Invoice ID','Currency','Gateway','Reference','Amount in','Amount out','Fees','Net after fees'],',','"','');
            $sql='SELECT * FROM transactions WHERE date>=? AND date<=?';$a=[$from,$to.' 23:59:59'];if($id>0){$sql.=' AND client_id=?';$a[]=$id;}
            $s=db()->run($sql.' ORDER BY date,id',$a);while($v=$s->fetch())fputcsv($f,array_map([self::class,'csvCell'],[$v['id'],$v['date'],$v['client_id'],$v['invoice_id'],$v['currency'],$v['gateway'],$v['reference'],Money::decimal($v['amount_in']),Money::decimal($v['amount_out']),Money::decimal($v['fees']),Money::decimal($v['amount_in']-$v['amount_out']-$v['fees'])]),',','"','');
        }
    }
    public static function csvCell(mixed $v): string { $s=(string)$v;if(preg_match('/^-[0-9]+(?:\.[0-9]+)?$/D',$s))return $s;return preg_match('/^[\x00-\x20]*[=+@\-]/',$s)?"'".$s:$s; }
    public static function invoiceCsv($stream,array $q): void {
        $headers=['Invoice ID','Invoice number','Invoice date','Paid date','Client ID','Client','Country','Currency','Subtotal','Tax level 1','Tax level 2','Total','Credit applied','Balance','Status','Recipient GSTIN','GSTIN check','Evidence','Tax charged','Document type','Issues','Source fetched at','Last PDF downloaded','Last downloaded by','PDF download count','Updated since PDF download','PDF text result','PDF recipient candidates','PDF checked at','PDF check source changed'];
        fputcsv($stream,$headers,',','"','');[$w,$a]=self::filter($q);
        $s=db()->run("SELECT i.*,d.last_at AS dl_at,d.last_user AS dl_user,d.count AS dl_count,d.source_hash AS dl_hash FROM invoices i LEFT JOIN reviews r ON r.invoice_id=i.id LEFT JOIN download_state d ON d.invoice_id=i.id AND d.format='pdf' WHERE ".$w.' ORDER BY i.id',$a);
        while($i=$s->fetch()){$p=json_decode($i['payload'],true);$r=[$i['id'],$i['number'],$i['date'],$i['paid_date'],$i['client_id'],$i['client_name'],$i['country'],$i['currency'],Money::decimal($i['subtotal']),Money::decimal($i['tax']),Money::decimal($i['tax2']),Money::decimal($i['total']),Money::decimal($i['credit']),Money::decimal($i['balance']),$i['status'],$i['gstin'],$i['gst_status'],$i['basis'],($i['tax']+$i['tax2'])!=0?'yes':'no',$p['invoice']['_kind']??'invoice',implode('; ',json_decode($i['issues'],true)),$i['fetched_at']];array_push($r,$i['dl_at']??'',$i['dl_user']??'',$i['dl_count']??0,$i['dl_count']&&$i['dl_hash']!==$i['source_hash']?'yes':'no');$pc=$i['pdf_check']?json_decode($i['pdf_check'],true):[];array_push($r,$pc['result']??'not_scanned',implode('; ',$pc['recipient_candidates']??[]),$pc['checked_at']??'',isset($pc['source_hash'])&&$pc['source_hash']!==$i['source_hash']?'yes':'no');fputcsv($stream,array_map([self::class,'csvCell'],$r),',','"','');}
    }
}
