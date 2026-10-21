<?php
declare(strict_types=1);
namespace InvoiceDesk;
use InvoiceDesk\Connectors\{Source,Api,Database};
final class Service {
    private ?Source $source=null;
    private array $clients=[];
    public function __construct(?Source $source=null,private ?array $connectionOverride=null){$this->source=$source;}
    public function settings(): array {return db()->get('preferences',['company'=>'HostingSpell','supplier_gstin'=>'','gst_labels'=>'gstin,gst number,gst no,gst registration','tax_is_gst'=>false,'accent'=>'#b8a1ff','archive_days'=>7,'batch_size'=>1,'client_cache_minutes'=>5]);}
    public function connection(): array {if($this->connectionOverride!==null)return $this->connectionOverride;$v=db()->get('connection');return $v?Vault::decrypt($v):[];}
    public function source(): Source {
        if($this->source)return $this->source;$c=$this->connection();
        return $this->source=match($c['mode']??''){ 'api'=>new Api($c),'db'=>new Database($c),default=>throw new \RuntimeException('Configure a WHMCS connection in Settings first.')};
    }
    public function bridge(): Bridge {return new Bridge($this->connection());}
    public function currency(mixed $id): string {
        if(is_array($id))$id=$id['id']??0;
        $all=db()->get('currencies',[]);
        foreach($all as $c)if((int)$c['id']===(int)$id)return strtoupper($c['code']);
        throw new \RuntimeException('Currency cannot be determined. Test and save your connection to load currencies.');
    }
    private function billingClient(array $c): array {
        $allowed=['id','userid','clientid','firstname','lastname','companyname','email','address1','address2','city','state','postcode','country','currency','credit','tax_id','taxexempt','customfields'];
        $out=array_intersect_key($c,array_flip($allowed));
        $labels=array_map('trim',explode(',',strtolower($this->settings()['gst_labels']??'gstin,gst number,gst no,gst registration')));
        $fields=rows($out['customfields']??[],'customfield');
        $out['customfields']=array_values(array_filter($fields,fn($v)=>is_array($v)&&in_array(strtolower(trim((string)($v['name']??$v['fieldname']??''))),$labels,true)));
        return $out;
    }
    public function saveClient(array $c): array {
        $c=$this->billingClient($c);
        $id=(int)($c['id']??$c['userid']??$c['clientid']??0);if($id<1)throw new \RuntimeException('Client ID missing from source response.');
        $name=trim(($c['companyname']??'')?:trim(($c['firstname']??'').' '.($c['lastname']??'')));
        $currency=$this->currency($c['currency']??0);
        db()->run('INSERT INTO clients(id,name,email,currency,wallet,data,fetched_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,email=excluded.email,currency=excluded.currency,wallet=excluded.wallet,data=excluded.data,fetched_at=excluded.fetched_at',[$id,$name,$c['email']??'',$currency,Money::minor($c['credit']??'0'),json_encode($c,JSON_THROW_ON_ERROR),now()]);
        return $this->clients[$id]=$c;
    }
    public function client(int $id,bool $force=false): array {
        if(!$force && isset($this->clients[$id]))return $this->clients[$id];
        $ttl=max(0,min(60,(int)($this->settings()['client_cache_minutes']??5)))*60;
        if(!$force && $ttl>0){$row=db()->one('SELECT data,fetched_at FROM clients WHERE id=?',[$id]);if($row && time()-strtotime($row['fetched_at'])<$ttl)return $this->clients[$id]=json_decode($row['data'],true,512,JSON_THROW_ON_ERROR);}
        return $this->saveClient($this->source()->client($id)+['id'=>$id]);
    }
    public function saveTransactions(array $rows,array $client,?int $invoice=null,bool $replaceClient=false): void {
        $cid=(int)$client['id'];$currency=$this->currency($client['currency']);
        if($replaceClient)db()->run('DELETE FROM transactions WHERE client_id=?',[$cid]);
        elseif($invoice!==null)db()->run('DELETE FROM transactions WHERE invoice_id=?',[$invoice]);
        foreach($rows as $t){
            $tid=(int)($t['id']??0);if($tid<1)throw new \RuntimeException('Transaction ID missing.');
            $tc=(int)($t['currency']??0)>0?$this->currency($t['currency']):$currency;
            db()->run('INSERT INTO transactions(id,client_id,invoice_id,date,currency,gateway,reference,amount_in,amount_out,fees,refund_id,data) VALUES(?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET client_id=excluded.client_id,invoice_id=excluded.invoice_id,date=excluded.date,currency=excluded.currency,gateway=excluded.gateway,reference=excluded.reference,amount_in=excluded.amount_in,amount_out=excluded.amount_out,fees=excluded.fees,refund_id=excluded.refund_id,data=excluded.data',[$tid,$cid,(int)($t['invoiceid']??$invoice??0),$t['date'],$tc,$t['gateway']??'',$t['transid']??'',Money::minor($t['amountin']??'0'),Money::minor($t['amountout']??'0'),Money::minor($t['fees']??'0'),(int)($t['refundid']??0),json_encode($t,JSON_THROW_ON_ERROR)]);
        }
    }
    public function importInvoice(int $id): void {
        $i=$this->source()->invoice($id);$client=$this->client((int)$i['userid']);$client['id']=(int)$i['userid'];
        $c=$this->connection();
        if(!empty($c['bridge_url'])){
            $meta=$this->bridge()->call('metadata',['invoice_id'=>$id]);
            if(is_array($meta['snapshot']??null))$i['_snapshot']=$this->billingClient($meta['snapshot']);
            $i['_currency']=$meta['currency']??null;
        }
        $tx=$this->source()->transactions(null,$id);
        $gst=Gst::classify($i,$client,$this->settings());$i['_gst']=$gst;
        $kind='invoice';
        foreach(rows($i['items']??[],'item') as $item){if(strtolower($item['type']??'')==='invoice')$kind='masspay';if(strtolower($item['type']??'')==='addfunds')$kind='addfunds';}
        $i['_kind']=$kind;
        if($kind!=='invoice'){$gst['issues'][]=ucfirst($kind).' document excluded from sales and receivable totals to avoid double counting.';$gst['review']=1;}
        $currency=!empty($i['_currency'])?strtoupper($i['_currency']):$this->currency($client['currency']);
        if(empty($i['_currency'])){$gst['issues'][]='Currency inferred from current client currency; use bridge metadata for invoice currency.';$gst['review']=1;}
        $i['_gst']=$gst;$net=0;$mixed=false;
        foreach($tx as $t){$tc=(int)($t['currency']??0)>0?$this->currency($t['currency']):$this->currency($client['currency']);
            if($tc!==$currency){$mixed=true;continue;}$net+=Money::minor($t['amountin']??'0')-Money::minor($t['amountout']??'0');}
        if($mixed&&!array_key_exists('balance',$i))throw new \RuntimeException('Cross-currency transaction found; database mode cannot safely derive this invoice balance. Use API mode to obtain the authoritative WHMCS balance.');
        if($mixed){$gst['issues'][]='Transaction currency differs from invoice currency. Source balance is retained; review the conversion at source.';$gst['review']=1;}

        $balance=array_key_exists('balance',$i)?Money::minor($i['balance']):Money::minor($i['total'])-Money::minor($i['credit']??'0')-$net;
        if(($i['status']??'')==='Cancelled' || ($i['status']??'')==='Draft')$balance=0;
        if(($i['status']??'')==='Paid' && abs($balance)>1){$gst['issues'][]='Invoice is marked Paid but its source/derived balance is not zero.';$gst['review']=1;}
        $i['_gst']=$gst;
        $payload=json_encode(['invoice'=>$i,'client'=>$client],JSON_THROW_ON_ERROR|JSON_INVALID_UTF8_SUBSTITUTE);
        // Exclude balance derived from payment timestamps from source hash? Preserve all accounting inputs instead.
        $hash=hash('sha256',$payload);
        db()->atomic(function()use($id,$i,$client,$gst,$currency,$balance,$payload,$hash,$tx){
            $this->saveTransactions($tx,$client,$id);
            db()->run('INSERT INTO invoices(id,client_id,number,date,due_date,paid_date,status,currency,subtotal,tax,tax2,total,credit,balance,client_name,country,gstin,gst_status,basis,review,issues,payload,fetched_at,source_hash) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET client_id=excluded.client_id,number=excluded.number,date=excluded.date,due_date=excluded.due_date,paid_date=excluded.paid_date,status=excluded.status,currency=excluded.currency,subtotal=excluded.subtotal,tax=excluded.tax,tax2=excluded.tax2,total=excluded.total,credit=excluded.credit,balance=excluded.balance,client_name=excluded.client_name,country=excluded.country,gstin=excluded.gstin,gst_status=excluded.gst_status,basis=excluded.basis,review=excluded.review,issues=excluded.issues,payload=excluded.payload,fetched_at=excluded.fetched_at,source_hash=excluded.source_hash',[$id,(int)$i['userid'],(string)(($i['invoicenum']??'')?:$id),$i['date'],$i['duedate'],str_starts_with($i['datepaid']??'','0000')?null:($i['datepaid']??null),$i['status'],$currency,Money::minor($i['subtotal']),Money::minor($i['tax']??'0'),Money::minor($i['tax2']??'0'),Money::minor($i['total']),Money::minor($i['credit']??'0'),$balance,trim(($i['_snapshot']['companyname']??$client['companyname']??'')?:trim(($i['_snapshot']['firstname']??$client['firstname']??'').' '.($i['_snapshot']['lastname']??$client['lastname']??''))),$i['_snapshot']['country']??$client['country']??'',$gst['gstin'],$gst['status'],$gst['basis'],$gst['review'],json_encode($gst['issues']),$payload,now(),$hash]);
            // Reviews and PDF checks become visibly stale if the accounting inputs change.
        });
    }
    public function fullClient(int $id): void {
        $c=$this->client($id,true);$tx=$this->source()->transactions($id);$credits=$this->source()->credits($id);
        db()->atomic(function()use($id,$c,$tx,$credits){
            $this->saveTransactions($tx,$c,null,true);db()->run('DELETE FROM credits WHERE client_id=?',[$id]);
            foreach($credits as $v)db()->run('INSERT INTO credits(id,client_id,date,amount,description) VALUES(?,?,?,?,?)',[(int)$v['id'],$id,$v['date'],Money::minor($v['amount']),$v['description']??'']);
            db()->run('UPDATE clients SET ledger_at=? WHERE id=?',[now(),$id]);
        });
    }
}
