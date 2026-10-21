<?php
declare(strict_types=1);
namespace InvoiceDesk;
final class Http {
    public static function validateUrl(string $url): string {
        $p=parse_url($url);
        if(!$p || ($p['scheme']??'')!=='https' || empty($p['host']) || isset($p['user']) || isset($p['pass']) || isset($p['fragment']) || isset($p['query']))throw new \InvalidArgumentException('Use a complete HTTPS URL without credentials, query, or fragment.');
        return rtrim($url,'/');
    }
    public static function post(string $url,string $body,array $headers=[],int $max=16777216): string {
        self::validateUrl($url);
        if(!function_exists('curl_init'))throw new \RuntimeException('Enable the PHP cURL extension.');
        $c=curl_init($url);$out='';$overflow=false;
        curl_setopt_array($c,[CURLOPT_POST=>true,CURLOPT_POSTFIELDS=>$body,CURLOPT_HTTPHEADER=>$headers,CURLOPT_CONNECTTIMEOUT=>4,CURLOPT_TIMEOUT=>10,CURLOPT_FOLLOWLOCATION=>false,CURLOPT_SSL_VERIFYPEER=>true,CURLOPT_SSL_VERIFYHOST=>2,CURLOPT_PROTOCOLS=>CURLPROTO_HTTPS,CURLOPT_USERAGENT=>'InvoiceDesk/1.0',CURLOPT_WRITEFUNCTION=>function($ch,$chunk)use(&$out,&$overflow,$max){if(strlen($out)+strlen($chunk)>$max){$overflow=true;return 0;}$out.=$chunk;return strlen($chunk);}]);
        $ok=curl_exec($c);$code=(int)curl_getinfo($c,CURLINFO_RESPONSE_CODE);$errno=curl_errno($c);curl_close($c);
        if($overflow)throw new \RuntimeException('Response exceeds the safe size limit. Use database mode or a smaller scope.');
        if($ok===false)throw new \RuntimeException('Source connection failed (cURL '.$errno.'). Check connectivity, TLS certificate, and timeout.');
        if($code<200||$code>=300)throw new \RuntimeException('Source returned HTTP '.$code.'. Check the endpoint and access restrictions.');
        return $out;
    }
}
