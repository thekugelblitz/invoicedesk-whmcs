<?php
declare(strict_types=1);
namespace InvoiceDesk;
final class Diagnostics {
    public static function databaseMessage(\PDOException $e,string $stage='connect'): string {
        $code=(int)($e->errorInfo[1]??0);$raw=strtolower($e->getMessage());
        $help=match($code){
            1045=>'MySQL rejected the username or password. In cPanel → MySQL Databases, use the full account-prefixed database username and confirm its password.',
            1044,1142,1143=>'The MySQL user cannot read this WHMCS database. In cPanel → MySQL Databases, add the user to the correct database and grant SELECT permission.',
            1049=>'The database name was not found. Use the full cPanel account-prefixed WHMCS database name from your WHMCS configuration.php.',
            2002=>str_contains($raw,'no such file')?'MySQL socket was not found. Try 127.0.0.1 instead of localhost, or ask your host for the correct MySQL hostname.':'The MySQL server could not be reached. Check the host and port. For a remote server, allow this cPanel server in Remote Database Access and check its firewall.',
            2003,2005=>'The MySQL host could not be reached or resolved. Check the database hostname, port and remote access rules.',
            2026=>'MySQL TLS verification failed. Check the CA certificate path and use the server hostname covered by its certificate.',
            1146=>'The selected database does not contain a required WHMCS table. Confirm you selected the WHMCS database and that its schema is supported.',
            1064=>$stage==='read-only'?'This MySQL/MariaDB server rejected the read-only session command. Update the database server or use WHMCS API mode.':'This MySQL/MariaDB schema or server version rejected the query. Check Diagnostics for the query stage.',
            default=>str_contains($raw,'could not find driver')?'PHP PDO MySQL is not enabled. In cPanel → Select PHP Version / PHP Extensions, enable pdo_mysql for the PHP version serving this app.':($stage==='read-only'?'MySQL connected but refused the read-only session setup. Ask your host to check server compatibility, or use API mode.':'The MySQL connection or schema check failed. Open Settings → Diagnostics for the SQLSTATE, driver code and next steps.')
        };
        $state=(string)($e->errorInfo[0]??$e->getCode());return $help.' (SQLSTATE '.preg_replace('/[^a-z0-9]/i','',$state).($code?'; MySQL '.$code:'').')';
    }
    public static function redact(string $text): string {
        $text=preg_replace('/((?:password|passwd|secret|token|authorization|db_password|bridge_secret)\s*[=:]\s*)(?:"[^"]*"|\x27[^\x27]*\x27|[^\s,;]+)/i','$1[REDACTED]',$text);
        return preg_replace('~(https?://)[^\s/@:]+:[^\s/@]+@~i','$1[REDACTED]@',substr($text,0,6000));
    }
    public static function path(): string {return config()['storage'].'/logs/application.jsonl';}
    public static function record(\Throwable $e,array $context=[]): array {
        $reference=bin2hex(random_bytes(6));$dir=dirname(self::path());$ok=false;
        try{if(!is_dir($dir))@mkdir($dir,0700,true);@chmod($dir,0700);if(!is_file($dir.'/.htaccess'))@file_put_contents($dir.'/.htaccess',"Require all denied\n");
            $entry=['reference'=>$reference,'time'=>now(),'type'=>get_class($e),'message'=>self::redact($e->getMessage()),'file'=>$e->getFile(),'line'=>$e->getLine(),'context'=>$context];
            if($e instanceof \PDOException)$entry['database']=['sqlstate'=>$e->errorInfo[0]??$e->getCode(),'driver_code'=>$e->errorInfo[1]??null];
            $previous=$e->getPrevious();if($previous instanceof \PDOException)$entry['database']=['sqlstate'=>$previous->errorInfo[0]??$previous->getCode(),'driver_code'=>$previous->errorInfo[1]??null];
            if(is_file(self::path())&&filesize(self::path())>2097152){@rename(self::path(),self::path().'.1');@chmod(self::path().'.1',0600);}
            $ok=@file_put_contents(self::path(),json_encode($entry,JSON_INVALID_UTF8_SUBSTITUTE)."\n",FILE_APPEND|LOCK_EX)!==false;@chmod(self::path(),0600);
        }catch(\Throwable){}
        error_log('Munshi Ji ['.$reference.'] '.self::redact($e->getMessage()));return ['reference'=>$reference,'logged'=>$ok];
    }
    public static function response(\Throwable $e,array $context=[]): array {
        $r=self::record($e,$context);$message=$e instanceof \PDOException?self::databaseMessage($e):($e instanceof \Error?'The server could not complete this request. Check Settings → Diagnostics for missing PHP extensions or the recorded error.':$e->getMessage());
        return ['error'=>substr(self::redact($message),0,900),'reference'=>$r['reference'],'log_saved'=>$r['logged'],'help'=>$r['logged']?'Details saved in private storage: logs/application.jsonl. Open Settings → Diagnostics to find this reference.':'The app could not write its private log. Make the configured storage directory writable by your cPanel PHP user (usually 0700 or 0750; do not use 0777).'];
    }
    public static function report(string $reference=''): array {
        $checks=['php'=>PHP_VERSION,'pdo_mysql'=>extension_loaded('pdo_mysql'),'pdo_sqlite'=>extension_loaded('pdo_sqlite'),'openssl'=>extension_loaded('openssl'),'curl'=>extension_loaded('curl'),'zip'=>extension_loaded('zip'),'storage_writable'=>is_writable(config()['storage']),'log_writable'=>is_file(self::path())?is_writable(self::path()):is_writable(config()['storage']),'log_file'=>self::path()];$entries=[];
        foreach([self::path().'.1',self::path()] as $path){if(!is_readable($path))continue;$f=fopen($path,'r');while(($line=fgets($f))!==false){$row=json_decode($line,true);if(!$row)continue;if($reference!==''&&($row['reference']??'')!==$reference)continue;$entries[]=$row;if(count($entries)>100)array_shift($entries);}fclose($f);}
        return ['checks'=>$checks,'rows'=>array_reverse($entries),'reference'=>$reference,'note'=>$reference&&!$entries?'No application log entry matches this reference. Errors from versions before this logger was installed may exist only in the server PHP error log. Reproduce the error after updating.':'Logs contain technical details and are visible only to administrators. Passwords and tokens are not intentionally logged.'];
    }
}
