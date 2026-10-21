<?php
declare(strict_types=1);
namespace InvoiceDesk;
use InvoiceDesk\Connectors\Database;
final class Jobs {
    public function __construct(private Service $s=new Service()){}
    public function create(string $type,array $params): string {
        $l=lock('worker');try{return $this->createUnlocked($type,$params);}finally{flock($l,LOCK_UN);fclose($l);}
    }
    private function createUnlocked(string $type,array $params): string {
        if(!in_array($type,['sync','ledger','payments','archive','refresh','pdf_scan'],true))throw new \InvalidArgumentException('Unknown job type.');
        if(db()->one("SELECT id FROM jobs WHERE state IN ('queued','running') LIMIT 1"))throw new \RuntimeException('Finish or cancel the active job first.');
        $id=bin2hex(random_bytes(12));$state='queued';$cursor=['phase'=>in_array($type,['archive','refresh','pdf_scan'],true)?'items':'scan'];
        if(in_array($type,['sync','payments'],true)){[$params['from'],$params['to']]=dateRange($params);if(!in_array($params['basis']??'date',['date','due','paid'],true))throw new \InvalidArgumentException('Invalid date basis.');}
        if($type==='ledger'){if((int)($params['client_id']??0)<1)throw new \InvalidArgumentException('Enter a client ID.');$params['all']=true;}
        if($type==='archive'){if(!in_array($params['format']??'pdf',['pdf','html'],true))throw new \InvalidArgumentException('Invalid archive format.');}
        db()->atomic(function()use($id,$type,$params,$cursor){
            db()->run('INSERT INTO jobs(id,type,state,params,cursor,message,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)',[$id,$type,'queued',json_encode($params),json_encode($cursor),'Waiting to start',now(),now()]);
            if(in_array($type,['archive','refresh','pdf_scan'],true)){
                $ids=$params['ids']??[];
                if(!$ids)throw new \InvalidArgumentException('No invoices selected.');
                foreach($ids as $i){if(!db()->one('SELECT id FROM invoices WHERE id=?',[(int)$i]))throw new \InvalidArgumentException('Unknown invoice selected.');db()->run('INSERT OR IGNORE INTO tasks(job_id,record_id) VALUES(?,?)',[$id,(int)$i]);}
                db()->run('UPDATE jobs SET total=(SELECT COUNT(*) FROM tasks WHERE job_id=?) WHERE id=?',[$id,$id]);
            }
        });audit('job_created',['id'=>$id,'type'=>$type]);return $id;
    }
    private function update(string $id,array $v): void {
        $v['updated_at']=now();$set=[];$args=[];foreach($v as $k=>$x){$set[]=$k.'=?';$args[]=$x;}$args[]=$id;db()->run('UPDATE jobs SET '.implode(',',$set).' WHERE id=?',$args);
    }
    public function tick(?string $id=null): array {
        $l=lock('worker');
        try {
            $j=$id?db()->one('SELECT * FROM jobs WHERE id=?',[$id]):db()->one("SELECT * FROM jobs WHERE state IN ('queued','running') ORDER BY created_at LIMIT 1");
            if(!$j)return ['state'=>'idle'];if(!in_array($j['state'],['queued','running'],true))return $j;
            $id=$j['id'];$p=json_decode($j['params'],true);$c=json_decode($j['cursor'],true);
            $this->update($id,['state'=>'running']);
            try {
                if($j['type']==='payments'){$this->payments($j,$p,$c);}
                elseif($c['phase']==='scan'){
                    $r=$this->s->source()->page($p,$c['scan']??[]);
                    db()->atomic(function()use($r,$p,$id){foreach($r['rows'] as $v){
                        // API paid/due date filtering is applied after detail import if summary dates are absent.
                        $field=['date'=>'date','due'=>'duedate','paid'=>'datepaid'][$p['basis']??'date'];
                        $d=isset($v[$field])?substr((string)$v[$field],0,10):null;
                        if(!empty($p['all']) || $d===null || ($d>=$p['from'] && $d<=$p['to']))db()->run('INSERT OR IGNORE INTO tasks(job_id,record_id) VALUES(?,?)',[$id,(int)$v['id']]);
                    }});
                    $c['scan']=$r['cursor'];if($r['finished'])$c['phase']='items';
                    $total=(int)db()->one('SELECT COUNT(*) AS n FROM tasks WHERE job_id=?',[$id])['n'];
                    $this->update($id,['cursor'=>json_encode($c),'total'=>$total,'message'=>$r['finished']?'Invoice scan complete; importing details':'Scanning invoice IDs ('.$total.' in scope)']);
                } elseif($c['phase']==='items'){
                    $t=db()->one("SELECT * FROM tasks WHERE job_id=? AND state='pending' ORDER BY record_id LIMIT 1",[$id]);
                    if($t){
                        try{
                            if($j['type']==='archive')(new Archive($this->s))->add($id,(int)$t['record_id'],$p['format']);
                            elseif($j['type']==='pdf_scan')(new Archive($this->s))->verifyPdf((int)$t['record_id']);
                            else $this->s->importInvoice((int)$t['record_id']);
                            db()->run("UPDATE tasks SET state='done',error=NULL WHERE job_id=? AND record_id=?",[$id,$t['record_id']]);
                        }catch(\Throwable $e){db()->run("UPDATE tasks SET state='failed',attempts=attempts+1,error=? WHERE job_id=? AND record_id=?",[substr($e->getMessage(),0,300),$id,$t['record_id']]);}
                        $counts=db()->one("SELECT SUM(state='done') AS done,SUM(state='failed') AS errors FROM tasks WHERE job_id=?",[$id]);
                        $this->update($id,['done'=>(int)$counts['done'],'errors'=>(int)$counts['errors'],'message'=>'Processed invoice #'.$t['record_id']]);
                    }else{
                        $errors=(int)db()->one("SELECT COUNT(*) AS n FROM tasks WHERE job_id=? AND state='failed'",[$id])['n'];
                        if($errors){if($j['type']==='archive')(new Archive($this->s))->finish($id,$p['format']);$this->update($id,['state'=>'partial','message'=>'Some invoices failed. Review errors and retry.']);}
                        else{
                            if($j['type']==='archive')(new Archive($this->s))->finish($id,$p['format']);
                            if($j['type']==='ledger'){$this->s->fullClient((int)$p['client_id']);
                                // Remove invoices deleted during previous historical imports only after the complete successful scan.
                                db()->run('DELETE FROM invoices WHERE client_id=? AND id NOT IN(SELECT record_id FROM tasks WHERE job_id=?)',[(int)$p['client_id'],$id]);
                            }
                            if($j['type']==='sync'){
                                $field=['date'=>'date','due'=>'due_date','paid'=>'paid_date'][$p['basis']??'date'];
                                db()->run('DELETE FROM invoices WHERE '.$field.' >= ? AND '.$field.' < ? AND id NOT IN(SELECT record_id FROM tasks WHERE job_id=?)',[$p['from'],(new \DateTimeImmutable($p['to']))->modify('+1 day')->format('Y-m-d'),$id]);
                            }
                            if(in_array($j['type'],['sync','ledger'],true))db()->run('INSERT INTO coverage(job_id,kind,from_date,to_date,client_id,completed_at) VALUES(?,?,?,?,?,?)',[$id,$j['type'].($j['type']==='sync'?':'.($p['basis']??'date'):''),$p['from']??null,$p['to']??null,$p['client_id']??null,now()]);
                            $ack=db()->get('bridge_ack_'.$id);
                            if($ack){$this->s->bridge()->call('ack',['events'=>$ack]);db()->run('DELETE FROM settings WHERE key=?',['bridge_ack_'.$id]);}
                            $this->update($id,['state'=>'complete','message'=>'Completed successfully']);audit('job_completed',['id'=>$id]);
                        }
                    }
                }
            } catch(\Throwable $e) {$this->update($id,['state'=>'failed','message'=>substr($e->getMessage(),0,300)]);}
            return db()->one('SELECT * FROM jobs WHERE id=?',[$id]);
        }finally{flock($l,LOCK_UN);fclose($l);}
    }
    private function payments(array $j,array $p,array $c): void {
        $id=$j['id'];$src=$this->s->source();
        if(($c['phase']??'scan')==='scan'){
            $all=$src instanceof Database?$src->paymentPage($p,(int)($c['last']??0)):$src->transactions();
            $filtered=array_filter($all,fn($v)=>substr($v['date'],0,10)>=$p['from']&&substr($v['date'],0,10)<=$p['to']);
            db()->atomic(function()use($filtered,$id){foreach($filtered as $v){
                db()->run('INSERT OR REPLACE INTO payment_stage(job_id,record_id,client_id,payload) VALUES(?,?,?,?)',[$id,(int)$v['id'],(int)$v['userid'],json_encode($v,JSON_THROW_ON_ERROR)]);
                if((int)$v['userid']>0)db()->run('INSERT OR IGNORE INTO tasks(job_id,record_id) VALUES(?,?)',[$id,(int)$v['userid']]);
            }});
            if(array_filter($filtered,fn($v)=>(int)$v['userid']<1))throw new \RuntimeException('Payments without a client cannot be assigned a safe currency. Review them at source.');
            $finished=!($src instanceof Database)||count($all)<100;
            $c['last']=$all?(int)end($all)['id']:($c['last']??0);if($finished)$c['phase']='clients';
            $total=(int)db()->one('SELECT COUNT(*) AS n FROM tasks WHERE job_id=?',[$id])['n'];
            $this->update($id,['cursor'=>json_encode($c),'total'=>$total,'message'=>$finished?'Payments staged; resolving client currencies':'Staging payment journal']);return;
        }
        $task=db()->one("SELECT * FROM tasks WHERE job_id=? AND state='pending' ORDER BY record_id LIMIT 1",[$id]);
        if($task){
            try{
                $client=$this->s->client((int)$task['record_id'],true);
                db()->atomic(function()use($id,$client,$task){
                    $stmt=db()->run('SELECT payload FROM payment_stage WHERE job_id=? AND client_id=?',[$id,$task['record_id']]);
                    while($v=$stmt->fetch())$this->s->saveTransactions([json_decode($v['payload'],true,512,JSON_THROW_ON_ERROR)],$client);
                    db()->run("UPDATE tasks SET state='done',error=NULL WHERE job_id=? AND record_id=?",[$id,$task['record_id']]);
                });
            }catch(\Throwable $e){db()->run("UPDATE tasks SET state='failed',attempts=attempts+1,error=? WHERE job_id=? AND record_id=?",[substr($e->getMessage(),0,300),$id,$task['record_id']]);}
            $counts=db()->one("SELECT SUM(state='done') AS done,SUM(state='failed') AS errors FROM tasks WHERE job_id=?",[$id]);
            $this->update($id,['done'=>(int)$counts['done'],'errors'=>(int)$counts['errors'],'message'=>'Resolved payment client #'.$task['record_id']]);return;
        }
        $errors=(int)db()->one("SELECT COUNT(*) AS n FROM tasks WHERE job_id=? AND state='failed'",[$id])['n'];
        if($errors){$this->update($id,['state'=>'partial','message'=>'Some payment clients failed. Review and retry.']);return;}
        db()->atomic(function()use($id,$p){
            db()->run('DELETE FROM transactions WHERE date>=? AND date<=? AND id NOT IN(SELECT record_id FROM payment_stage WHERE job_id=?)',[$p['from'],$p['to'].' 23:59:59',$id]);
            db()->run('INSERT INTO coverage(job_id,kind,from_date,to_date,completed_at) VALUES(?,?,?,?,?)',[$id,'payments',$p['from'],$p['to'],now()]);
            db()->run('DELETE FROM payment_stage WHERE job_id=?',[$id]);
        });
        $this->update($id,['state'=>'complete','message'=>'Payment journal imported']);
    }
    public function retry(string $id): void {
        $l=lock('worker');try{
            if(db()->one("SELECT id FROM jobs WHERE state IN ('queued','running') LIMIT 1"))throw new \RuntimeException('Finish or cancel the active job first.');
            $this->retryUnlocked($id);
        }finally{flock($l,LOCK_UN);fclose($l);}
    }
    private function retryUnlocked(string $id): void {
        $j=db()->one('SELECT * FROM jobs WHERE id=?',[$id]);if(!$j || !in_array($j['state'],['partial','failed'],true))throw new \RuntimeException('Only failed jobs can be retried.');
        db()->run("UPDATE tasks SET state='pending',error=NULL WHERE job_id=? AND state='failed'",[$id]);$this->update($id,['state'=>'queued','errors'=>0,'message'=>'Retry queued']);
    }
}
