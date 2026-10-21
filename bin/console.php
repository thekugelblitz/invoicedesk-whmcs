#!/usr/bin/env php
<?php
declare(strict_types=1);
require dirname(__DIR__).'/app/bootstrap.php';
use InvoiceDesk\{Service,Jobs,Archive,Auth};
use function InvoiceDesk\{db,config,now};
if(PHP_SAPI!=='cli')exit(1);
$cmd=$argv[1]??'help';$opts=[];foreach(array_slice($argv,2) as $arg)if(preg_match('/^--([a-z_-]+)(?:=(.*))?$/',$arg,$m))$opts[$m[1]]=$m[2]??true;
try{
    if($cmd==='init'){
        $path=dirname(__DIR__).'/config.php';if(is_file($path))throw new RuntimeException('config.php already exists. Edit it directly.');
        $token=bin2hex(random_bytes(24));$example=file_get_contents(dirname(__DIR__).'/config.example.php');
        if(file_put_contents($path,str_replace('REPLACE_WITH_YOUR_OWN_RANDOM_32_OR_MORE_CHARACTERS',$token,$example))===false)throw new RuntimeException('Cannot write config.php.');chmod($path,0600);
        echo "Configuration created. Open the HTTPS app URL, then enter this one-time setup token:\n".$token."\n";exit;
    }
    if($cmd==='doctor'){
        echo 'PHP '.PHP_VERSION."\n";foreach(['pdo','pdo_sqlite','openssl','curl','pdo_mysql','zip'] as $ext)echo $ext.': '.(extension_loaded($ext)?'OK':'MISSING')."\n";
        echo 'Private storage: '.(is_writable(config()['storage'])?'writable':'not writable or not yet created')."\n";
        echo 'Configured source: '.(db()->get('connection')?'yes':'no')."\n";exit;
    }
    $s=new Service();$j=new Jobs($s);
    if($cmd==='sync'){
        $type=isset($opts['client'])?'ledger':(isset($opts['payments'])?'payments':'sync');
        $params=['from'=>$opts['from']??date('Y-m-d',strtotime('-90 days')),'to'=>$opts['to']??date('Y-m-d'),'basis'=>$opts['basis']??'date','client_id'=>isset($opts['client'])?(int)$opts['client']:null];
        echo $j->create($type,$params)."\n";exit;
    }
    if($cmd==='work'){
        $seconds=min(300,max(1,(int)($opts['seconds']??45)));$start=microtime(true);$n=0;
        do{$r=$j->tick();$n++;if($r['state']==='idle')break;if(in_array($r['state'],['failed','partial'],true)){fwrite(STDERR,($r['message']??'Job failed')."\n");break;}usleep(100000);}while(microtime(true)-$start<$seconds);
        echo 'Worker steps: '.$n.'; last state: '.($r['state']??'idle')."\n";exit;
    }
    if($cmd==='hooks'){
        $events=$s->bridge()->call('events');$ids=array_column($events['events']??[],'invoice_id');
        if($ids){$id=$j->create('refresh',['ids'=>$ids]);db()->set('bridge_ack_'.$id,$events['events']);echo 'Queued '.$id."\n";}else echo "No hook events\n";exit;
    }
    if($cmd==='prune'){echo (new Archive($s))->prune()." expired ZIP archives removed\n";db()->run('DELETE FROM attempts WHERE until_at < ?',[time()]);exit;}
    if($cmd==='reset-password'){
        $email=$opts['email']??'';if(!db()->one('SELECT id FROM users WHERE email=?',[$email]))throw new RuntimeException('User not found.');
        echo 'New password (12–128 characters): ';$tty=function_exists('shell_exec')?shell_exec('stty -g 2>/dev/null'):null;
        if($tty!==null)shell_exec('stty -echo');try{$pass=rtrim((string)fgets(STDIN),"\r\n");}finally{if($tty!==null)shell_exec('stty '.escapeshellarg(trim($tty)));echo "\n";}
        db()->run('UPDATE users SET hash=?,version=version+1 WHERE email=?',[Auth::password($pass),$email]);echo "Password updated; prior sessions invalidated\n";exit;
    }
    if($cmd==='backup'){
        $dest=$opts['out']??'';if(!$dest||$dest[0]!=='/'||file_exists($dest))throw new RuntimeException('Pass a new absolute --out path outside the web root.');
        db()->run('VACUUM INTO ?',[$dest]);chmod($dest,0600);echo "Database snapshot saved. Back up config.php and var/master.key separately with restricted access.\n";exit;
    }
    echo <<<'TXT'
InvoiceDesk CLI
  php bin/console.php init
  php bin/console.php doctor
  php bin/console.php sync --from=2026-09-01 --to=2026-09-30 --basis=date
  php bin/console.php sync --client=123
  php bin/console.php sync --payments --from=2026-09-01 --to=2026-09-30
  php bin/console.php work --seconds=45
  php bin/console.php hooks
  php bin/console.php prune
  php bin/console.php reset-password --email=admin@example.com
  php bin/console.php backup --out=/home/ACCOUNT/private/invoicedesk-backup.sqlite
TXT;
    echo "\n";
}catch(Throwable $e){fwrite(STDERR,'InvoiceDesk: '.$e->getMessage()."\n");exit(1);}
