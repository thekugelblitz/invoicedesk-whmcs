<?php
declare(strict_types=1);
namespace InvoiceDesk;
final class Auth {
    public static function start(): void {
        if(session_status()===PHP_SESSION_ACTIVE)return;
        ini_set('session.use_strict_mode','1');ini_set('session.use_only_cookies','1');
        $dir=db()->dir.'/sessions';if(!is_dir($dir)&&!mkdir($dir,0700,true))throw new \RuntimeException('Cannot create private session storage.');
        session_save_path($dir);
        session_name('invoicedesk');
        session_set_cookie_params(['lifetime'=>0,'path'=>'/','secure'=>self::https(),'httponly'=>true,'samesite'=>'Strict']);session_start();
        $_SESSION['csrf']??=bin2hex(random_bytes(32));
    }
    public static function https(): bool { return !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS']!=='off'; }
    public static function csrf(): void { if(!hash_equals($_SESSION['csrf']??'',$_SERVER['HTTP_X_CSRF_TOKEN']??$_POST['csrf']??'__invalid'))throw new \RuntimeException('Session validation failed. Refresh and try again.'); }
    public static function user(): ?array {
        if(empty($_SESSION['uid']))return null;
        $u=db()->one('SELECT id,email,name,role,enabled,version FROM users WHERE id=?',[$_SESSION['uid']]);
        if(!$u || !$u['enabled'] || $u['version']!==($_SESSION['version']??0) || time()-($_SESSION['last']??0)>(config()['session_minutes']??30)*60){unset($_SESSION['uid']);return null;}
        $_SESSION['last']=time();return $u;
    }
    public static function require(string $role='viewer'): array {
        $u=self::user();if(!$u)json(['error'=>'Sign in to continue.'],401);
        $r=['viewer'=>0,'analyst'=>1,'admin'=>2];if($r[$u['role']]<$r[$role])json(['error'=>'Your role cannot perform this action.'],403);return $u;
    }
    public static function limit(string $name,int $max=8,int $seconds=900): string {
        $key=hash('sha256',$name.'|'.($_SERVER['REMOTE_ADDR']??'cli'));
        db()->run('DELETE FROM attempts WHERE until_at < ?', [time()]);
        $a=db()->one('SELECT * FROM attempts WHERE key=?',[$key]);
        if($a && $a['hits']>=$max)throw new \RuntimeException('Too many attempts. Try again after 15 minutes.');
        db()->run('INSERT INTO attempts(key,hits,until_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET hits=hits+1',[$key,time()+$seconds]);return $key;
    }
    public static function password(string $p): string { if(strlen($p)<12 || strlen($p)>128)throw new \InvalidArgumentException('Use a password between 12 and 128 characters.');return password_hash($p,PASSWORD_DEFAULT); }
    public static function login(string $email,string $pass): void {
        $key=self::limit('login');$u=db()->one('SELECT * FROM users WHERE email=?',[trim($email)]);
        $dummy='$2y$10$zqtX.EaG9VJ8XrkoMsF8vuc7Qz3S5TH4EGkAIp4CYpOJYYvMKaXEi';
        if(!password_verify($pass,$u['hash']??$dummy) || !$u || !$u['enabled'])throw new \RuntimeException('Email or password is incorrect.');
        session_regenerate_id(true);$_SESSION['uid']=$u['id'];$_SESSION['version']=$u['version'];$_SESSION['last']=time();$_SESSION['csrf']=bin2hex(random_bytes(32));
        db()->run('DELETE FROM attempts WHERE key=?',[$key]);audit('login');
    }
    public static function install(array $v): void {
        $l=lock('install');
        try {
            self::limit('install');
            if(db()->one('SELECT id FROM users LIMIT 1'))throw new \RuntimeException('Installation is already complete.');
            $token=config()['setup_token']??'';
            if(strlen($token)<32 || str_contains($token,'REPLACE_') || !hash_equals($token,(string)($v['token']??'')))throw new \RuntimeException('Set your own setup_token in config.php and enter the same value here.');
            if(!filter_var($v['email']??'',FILTER_VALIDATE_EMAIL))throw new \InvalidArgumentException('Enter a valid email address.');
            db()->run('INSERT INTO users(email,name,hash,role,created_at) VALUES(?,?,?,?,?)',[$v['email'],trim($v['name']??'Administrator'),self::password($v['password']??''),'admin',now()]);
            audit('installed');
        } finally {flock($l,LOCK_UN);fclose($l);}
    }
}
