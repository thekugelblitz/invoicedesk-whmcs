<?php
declare(strict_types=1);
namespace InvoiceDesk;
final class Bridge {
    public function __construct(private array $c){}
    public function call(string $action,array $params=[],bool $pdf=false): array|string {
        if(empty($this->c['bridge_url']) || strlen($this->c['bridge_secret']??'')<32)throw new \RuntimeException('Configure the optional WHMCS bridge for original PDFs and historical snapshots.');
        $body=json_encode(['action'=>$action]+$params,JSON_THROW_ON_ERROR);$time=(string)time();$nonce=bin2hex(random_bytes(16));
        $sig=hash_hmac('sha256',$time."\n".$nonce."\n".$body,$this->c['bridge_secret']);
        $raw=Http::post($this->c['bridge_url'],$body,['Content-Type: application/json','X-InvoiceDesk-Time: '.$time,'X-InvoiceDesk-Nonce: '.$nonce,'X-InvoiceDesk-Signature: '.$sig],$pdf?20971520:2097152);
        if($pdf){if(!str_starts_with($raw,'%PDF-'))throw new \RuntimeException('Bridge did not return a valid PDF. Check the WHMCS PDF adapter.');return $raw;}
        $r=json_decode($raw,true,512,JSON_THROW_ON_ERROR);if(!empty($r['error']))throw new \RuntimeException('Bridge: '.substr((string)$r['error'],0,200));return $r;
    }
}
