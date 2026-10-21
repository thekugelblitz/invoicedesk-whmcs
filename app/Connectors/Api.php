<?php
declare(strict_types=1);
namespace InvoiceDesk\Connectors;
use InvoiceDesk\Http;
use function InvoiceDesk\rows;
final class Api implements Source {
    public function __construct(private array $c,private ?\Closure $transport=null){}
    public function call(string $action,array $params=[]): array {
        if(!in_array($action,['GetInvoices','GetInvoice','GetClientsDetails','GetTransactions','GetCredits','GetCurrencies'],true))throw new \RuntimeException('Read-only API action required.');
        $body=http_build_query(array_merge($params,['identifier'=>$this->c['identifier']??'','secret'=>$this->c['secret']??'','action'=>$action,'responsetype'=>'json']));
        $raw=$this->transport?($this->transport)($action,$params):Http::post($this->c['api_url'],$body,['Content-Type: application/x-www-form-urlencoded']);
        try{$data=json_decode($raw,true,512,JSON_THROW_ON_ERROR);}catch(\JsonException){throw new \RuntimeException('WHMCS did not return JSON. Check the API endpoint, WAF, and access restrictions.');}
        if(($data['result']??'')!=='success')throw new \RuntimeException('WHMCS rejected '.$action.'. Check API role permissions, source IP allowlist, and credentials.');
        return $data;
    }
    public function test(): array { $r=$this->call('GetInvoices',['limitstart'=>0,'limitnum'=>1]);return ['mode'=>'api','invoices'=>(int)$r['totalresults'],'message'=>'WHMCS invoice API reachable. Ledger permissions are checked when used.']; }
    public function currencies(): array {return rows($this->call('GetCurrencies')['currencies']??[],'currency');}
    public function page(array $filter,array $cursor): array {
        $offset=(int)($cursor['offset']??0);$p=['limitstart'=>$offset,'limitnum'=>100,'orderby'=>'id','order'=>'asc'];
        if(!empty($filter['client_id']))$p['userid']=(int)$filter['client_id'];
        $r=$this->call('GetInvoices',$p);$total=(int)$r['totalresults'];
        if(isset($cursor['expected']) && $total!==(int)$cursor['expected'])throw new \RuntimeException('Invoice count changed during API pagination. Start a new sync to reconcile this range.');
        $rows=rows($r['invoices']??[],'invoice');
        if(!$rows && $offset<$total)throw new \RuntimeException('API returned an incomplete invoice page.');
        $last=(int)($cursor['last']??0);
        foreach($rows as $row){if((int)$row['id']<=$last)throw new \RuntimeException('API pagination repeated or reordered IDs. Restart this sync.');$last=(int)$row['id'];}
        return ['rows'=>$rows,'total'=>$total,'cursor'=>['offset'=>$offset+count($rows),'expected'=>$total,'last'=>$last],'finished'=>$offset+count($rows)>=$total];
    }
    public function invoice(int $id): array {return $this->call('GetInvoice',['invoiceid'=>$id]);}
    public function client(int $id): array { $r=$this->call('GetClientsDetails',['clientid'=>$id,'stats'=>true]);return $r['client']??$r; }
    private function complete(array $r,string $container,string $key): array {
        $rows=rows($r[$container]??[],$key);
        if(isset($r['totalresults']) && count($rows)!==(int)$r['totalresults'])throw new \RuntimeException('WHMCS returned a partial '.$container.' result. Use database mode for a complete ledger.');
        return $rows;
    }
    public function transactions(?int $client=null,?int $invoice=null): array {
        $p=[];if($client!==null)$p['clientid']=$client;if($invoice!==null)$p['invoiceid']=$invoice;
        return $this->complete($this->call('GetTransactions',$p),'transactions','transaction');
    }
    public function credits(int $client): array {
        $r=$this->call('GetCredits',['clientid'=>$client]);
        if(!isset($r['credits'])){
            $flat=[];foreach($r as $k=>$v)if(preg_match('/^credits\\[credit\\]\\[(\\d+)\\]\\[([a-z_]+)\\]$/',$k,$m))$flat[(int)$m[1]][$m[2]]=$v;
            if($flat)$r['credits']=['credit'=>array_values($flat)];
        }
        return $this->complete($r,'credits','credit');
    }
}
