<?php
declare(strict_types=1);
namespace InvoiceDesk;
final class Ledger {
    // One indexed client scan per register, with streaming export and no N+1 invoice lookups.
    public static function query(): string {
        $eligible="status NOT IN ('Draft','Cancelled') AND json_extract(payload,'$.invoice._kind')='invoice'";
        return "SELECT date,1 AS sort,id,'Invoice '||number AS reference,currency,total AS debit,0 AS credit FROM invoices WHERE client_id=? AND ".$eligible.
            " UNION ALL SELECT date,2 AS sort,id,'Credit currently applied to '||number AS reference,currency,0 AS debit,credit FROM invoices WHERE client_id=? AND credit!=0 AND ".$eligible.
            " UNION ALL SELECT t.date,3 AS sort,t.id,CASE WHEN t.amount_out!=0 THEN 'Refund ' ELSE 'Payment ' END||CASE WHEN t.reference='' THEN '#'||t.id ELSE t.reference END||' · Invoice #'||t.invoice_id AS reference,t.currency,t.amount_out AS debit,t.amount_in AS credit FROM transactions t JOIN invoices i ON i.id=t.invoice_id WHERE t.client_id=? AND i.status NOT IN ('Draft','Cancelled') AND json_extract(i.payload,'$.invoice._kind')='invoice'";
    }
    public static function balances(int $id,string $cut,bool $inclusive): array {
        $r=db()->all('SELECT currency,SUM(debit-credit) AS balance FROM ('.self::query().') WHERE substr(date,1,10)'.($inclusive?' <= ?':' < ?').' GROUP BY currency',[$id,$id,$id,$cut]);$out=[];foreach($r as $v)$out[$v['currency']]=$v['balance'];return $out;
    }
    public static function statement(int $id,string $from,string $to,?int $limit=null): \PDOStatement {
        return db()->run('SELECT * FROM ('.self::query().') WHERE substr(date,1,10)>=? AND substr(date,1,10)<=? ORDER BY substr(date,1,10),sort,date,id'.($limit?' LIMIT '.max(1,$limit):''),[$id,$id,$id,$from,$to]);
    }
    public static function csv($f,int $id,array $q): void {
        [$from,$to]=dateRange($q);$balances=self::balances($id,$from,false);
        fputcsv($f,['Date','Reference','Currency','Debit','Credit','Running balance'],',','"','');
        foreach($balances as $c=>$v)fputcsv($f,[$from,'Opening (reconstructed)',$c,'','',Money::decimal($v)],',','"','');
        $s=self::statement($id,$from,$to);while($v=$s->fetch()){$c=$v['currency'];$balances[$c]=($balances[$c]??0)+$v['debit']-$v['credit'];fputcsv($f,array_map([Report::class,'csvCell'],[$v['date'],$v['reference'],$c,Money::decimal($v['debit']),Money::decimal($v['credit']),Money::decimal($balances[$c])]),',','"','');}
    }
}
