<?php
declare(strict_types=1);
if(!defined('WHMCS'))die('Access denied');
// Copy into WHMCS/includes/hooks/. Same private config path as the bridge endpoint.
$invoiceDeskConfigPath='/home/CPANELUSER/private/invoicedesk-bridge-config.php';
function invoiceDeskQueueEvent(int $id,string $event,string $configPath): void {
    if($id<1||!is_file($configPath))return;
    try{
        $c=require $configPath;$dir=$c['private_dir'];if(!is_dir($dir))mkdir($dir,0700,true);
        $p=new PDO('sqlite:'.$dir.'/queue.sqlite',null,null,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);
        $p->exec('PRAGMA busy_timeout=50; CREATE TABLE IF NOT EXISTS events(invoice_id INTEGER PRIMARY KEY,version TEXT,event TEXT,created_at TEXT);');
        $p->prepare('INSERT INTO events(invoice_id,version,event,created_at) VALUES(?,?,?,?) ON CONFLICT(invoice_id) DO UPDATE SET version=excluded.version,event=excluded.event,created_at=excluded.created_at')->execute([$id,bin2hex(random_bytes(12)),$event,date('Y-m-d H:i:s')]);
    }catch(Throwable $e){error_log('Munshi Ji hook queue unavailable; use scheduled reconciliation to catch changes.');}
}
foreach(['InvoiceCreated','InvoiceCreationAdminArea','InvoicePaid','InvoiceCancelled','InvoiceRefunded','UpdateInvoiceTotal','AddInvoicePayment'] as $event){
    add_hook($event,1,function($vars)use($event,$invoiceDeskConfigPath){invoiceDeskQueueEvent((int)($vars['invoiceid']??$vars['invoice_id']??0),$event,$invoiceDeskConfigPath);});
}
