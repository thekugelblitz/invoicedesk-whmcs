<?php
declare(strict_types=1);
namespace InvoiceDesk;
final class Vault {
    private static function key(): string {
        $path=config()['storage'].'/master.key';
        if (!is_file($path)) {
            $f=@fopen($path,'x');
            if($f){@chmod($path,0600);fwrite($f,base64_encode(random_bytes(32)));fclose($f);}
        }
        $key=base64_decode((string)file_get_contents($path),true);
        if($key===false || strlen($key)!==32)throw new \RuntimeException('Encryption key is missing or invalid. Restore master.key with the database.');
        return $key;
    }
    public static function encrypt(array $data): string {
        $iv=random_bytes(12); $tag='';
        $cipher=openssl_encrypt(json_encode($data,JSON_THROW_ON_ERROR),'aes-256-gcm',self::key(),OPENSSL_RAW_DATA,$iv,$tag);
        if($cipher===false)throw new \RuntimeException('Credential encryption failed.');
        return base64_encode($iv.$tag.$cipher);
    }
    public static function decrypt(string $data): array {
        $raw=base64_decode($data,true);
        if($raw===false || strlen($raw)<29)throw new \RuntimeException('Invalid encrypted settings.');
        $plain=openssl_decrypt(substr($raw,28),'aes-256-gcm',self::key(),OPENSSL_RAW_DATA,substr($raw,0,12),substr($raw,12,16));
        if($plain===false)throw new \RuntimeException('Cannot decrypt settings. Restore the matching master.key.');
        return json_decode($plain,true,512,JSON_THROW_ON_ERROR);
    }
}
