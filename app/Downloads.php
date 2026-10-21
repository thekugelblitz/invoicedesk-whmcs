<?php
declare(strict_types=1);
namespace InvoiceDesk;
final class Downloads {
    public static function begin(array $members,string $format,array $user,?string $archive=null): string {
        $id=bin2hex(random_bytes(16));
        db()->atomic(function()use($id,$members,$format,$user,$archive){
            db()->run('INSERT INTO download_events(id,user_id,user_name,format,archive_id,status,invoice_count,created_at) VALUES(?,?,?,?,?,?,?,?)',[$id,$user['id'],$user['name']?:$user['email'],$format,$archive,'started',count($members),now()]);
            foreach($members as $m)db()->run('INSERT INTO download_items(event_id,invoice_id,source_hash) VALUES(?,?,?)',[$id,$m['invoice_id'],$m['source_hash']]);
        });return $id;
    }
    public static function finish(string $id,bool $ok,string $error=''): void {
        db()->atomic(function()use($id,$ok,$error){
            $e=db()->one('SELECT * FROM download_events WHERE id=?',[$id]);if(!$e||$e['status']!=='started')return;
            db()->run('UPDATE download_events SET status=?,completed_at=?,error=? WHERE id=?',[$ok?'served':'failed',now(),substr($error,0,300),$id]);
            if($ok)foreach(db()->all('SELECT * FROM download_items WHERE event_id=?',[$id]) as $m)
                db()->run('INSERT INTO download_state(invoice_id,format,count,last_at,last_user,source_hash) VALUES(?,?,1,?,?,?) ON CONFLICT(invoice_id,format) DO UPDATE SET count=count+1,last_at=excluded.last_at,last_user=excluded.last_user,source_hash=excluded.source_hash',[$m['invoice_id'],$e['format'],now(),$e['user_name'],$m['source_hash']]);
        });
    }
    public static function serve(string $path,string $type,string $name,array $members,string $format,array $user,?string $archive=null): void {
        if(!is_file($path)||!is_readable($path))throw new \RuntimeException('Download file unavailable.');
        $file=fopen($path,'rb');if(!$file)throw new \RuntimeException('Download file cannot be opened.');
        $id=self::begin($members,$format,$user,$archive);$finished=false;
        register_shutdown_function(function()use($id,&$finished){if(!$finished)try{self::finish($id,false,'Transfer interrupted before completion.');}catch(\Throwable){}});
        ignore_user_abort(true);header('Content-Type: '.$type);header('Content-Disposition: attachment; filename="'.$name.'"');header('Content-Length: '.filesize($path));header('X-Download-Id: '.$id);
        $sent=0;while(!feof($file)){if(connection_aborted())break;$part=fread($file,65536);if($part===false)break;echo $part;$sent+=strlen($part);flush();}fclose($file);
        $ok=$sent===filesize($path)&&!connection_aborted();self::finish($id,$ok,$ok?'':'Transfer interrupted.');$finished=true;
        audit($ok?'download_served':'download_failed',['id'=>$id,'format'=>$format,'invoices'=>count($members),'archive'=>$archive]);
    }
    public static function summary(array $q): array {
        unset($q['download']);[$w,$a]=Report::filter($q);
        $row=db()->one("SELECT COUNT(*) AS total,SUM(d.invoice_id IS NULL) AS pending,SUM(d.invoice_id IS NOT NULL) AS downloaded,SUM(d.invoice_id IS NOT NULL AND d.source_hash!=i.source_hash) AS updated,MAX(d.last_at) AS last_at FROM invoices i LEFT JOIN reviews r ON r.invoice_id=i.id LEFT JOIN download_state d ON d.invoice_id=i.id AND d.format='pdf' WHERE ".$w,$a);
        return $row+['tracking_note'=>'PDF downloads served through Munshi Ji. Previewing, CSV exports and preparing ZIPs do not change this status. Browser file saving and downloads outside this app cannot be verified.'];
    }
    public static function csv($stream): void {
        fputcsv($stream,['Time','Person','Format','Invoices','Status','Archive ID','Error'],',','"','');
        $s=db()->run('SELECT * FROM download_events ORDER BY created_at DESC');
        while($e=$s->fetch())fputcsv($stream,array_map([Report::class,'csvCell'],[$e['completed_at']?:$e['created_at'],$e['user_name'],$e['format'],$e['invoice_count'],$e['status'],$e['archive_id'],$e['error']]),',','"','');
    }
    public static function history(array $q): array {
        $page=max(1,(int)($q['page']??1));$args=[];$where='';
        if(!empty($q['invoice_id'])){$where=' WHERE EXISTS(SELECT 1 FROM download_items di WHERE di.event_id=e.id AND di.invoice_id=?)';$args[]=(int)$q['invoice_id'];}
        return ['rows'=>db()->all('SELECT e.* FROM download_events e'.$where.' ORDER BY e.created_at DESC,e.id DESC LIMIT 50 OFFSET '.(($page-1)*50),$args),'page'=>$page,'total'=>(int)db()->one('SELECT COUNT(*) AS n FROM download_events e'.$where,$args)['n']];
    }
}
