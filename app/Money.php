<?php
declare(strict_types=1);
namespace InvoiceDesk;
final class Money {
    // WHMCS monetary fields are 2-decimal values. Never sum binary floating point.
    public static function minor(mixed $value): int {
        $s=trim((string)$value);
        if (!preg_match('/^(-?)(\d{1,13})(?:\.(\d{1,8}))?$/D',$s,$m)) throw new \InvalidArgumentException('Invalid monetary value.');
        $d=str_pad($m[3]??'',3,'0');
        $n=(int)$m[2]*100+(int)substr($d,0,2)+((int)$d[2]>=5?1:0);
        return ($m[1]??'')==='-'?-$n:$n;
    }
    public static function decimal(int $n): string { return ($n<0?'-':'').intdiv(abs($n),100).'.'.str_pad((string)(abs($n)%100),2,'0',STR_PAD_LEFT); }
}
