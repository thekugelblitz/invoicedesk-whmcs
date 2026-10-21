<?php
declare(strict_types=1);
namespace InvoiceDesk\Connectors;
use PDO;
final class Database implements Source {
    private PDO $p;
    private array $cols=[];
    public function __construct(array $c,?PDO $pdo=null){
        if($pdo){$this->p=$pdo;return;}
        foreach(['db_host','db_name','db_user'] as $k)if(empty($c[$k]))throw new \InvalidArgumentException('Database connection fields are required.');
        if(preg_match('/[;\x00-\x1f]/',($c['db_host']??'').($c['db_name']??'')))throw new \InvalidArgumentException('Invalid database host or name.');
        $port=(int)($c['db_port']??3306);if($port<1||$port>65535)throw new \InvalidArgumentException('Invalid database port.');
        $options=[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,PDO::ATTR_EMULATE_PREPARES=>false,PDO::ATTR_TIMEOUT=>5];
        if(!empty($c['db_ssl_ca'])){$options[PDO::MYSQL_ATTR_SSL_CA]=$c['db_ssl_ca'];$options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT]=true;}
        $this->p=new PDO('mysql:host='.$c['db_host'].';port='.$port.';dbname='.$c['db_name'].';charset=utf8mb4',$c['db_user'],$c['db_password']??'',$options);
        $this->p->exec('SET SESSION TRANSACTION READ ONLY');
    }
    private function query(string $sql,array $args=[]): array {$s=$this->p->prepare($sql);$s->execute($args);return $s->fetchAll(PDO::FETCH_ASSOC);}
    public function columns(string $table): array {
        if(!preg_match('/^tbl[a-z_]+$/D',$table))throw new \InvalidArgumentException('Invalid table.');
        return $this->cols[$table]??=array_column($this->query('SHOW COLUMNS FROM `'.$table.'`'),'Field');
    }
    public function test(): array {
        foreach(['tblinvoices'=>['id','userid','date','duedate','datepaid','status','total','credit','tax','tax2','subtotal'],'tblclients'=>['id','currency'],'tblaccounts'=>['id','invoiceid','userid','amountin','amountout','date'],'tblinvoiceitems'=>['invoiceid','amount','description'],'tblcurrencies'=>['id','code'],'tblcredit'=>['id','clientid','amount','date']] as $table=>$required){$missing=array_diff($required,$this->columns($table));if($missing)throw new \RuntimeException($table.' is incompatible: missing '.implode(', ',$missing));}
        return ['mode'=>'db','message'=>'Read-only connection and required schema checked. Use a dedicated SELECT-only WHMCS user.'];
    }
    public function currencies(): array {return $this->query('SELECT id,code,prefix,suffix,rate FROM tblcurrencies');}
    public function page(array $f,array $cursor): array {
        $field=['date'=>'date','due'=>'duedate','paid'=>'datepaid'][$f['basis']??'date']??'date';
        $where=['id > ?'];$args=[(int)($cursor['last']??0)];
        if(!empty($f['client_id'])){$where[]='userid=?';$args[]=(int)$f['client_id'];}
        if(empty($f['all'])){$where[]=$field.' >= ? AND '.$field.' < ?';$args[]=$f['from'];$args[]=(new \DateTimeImmutable($f['to']))->modify('+1 day')->format('Y-m-d');}
        if(!isset($cursor['high'])){$high=$this->query('SELECT MAX(id) AS n FROM tblinvoices')[0]['n']??0;}else{$high=(int)$cursor['high'];}
        $where[]='id <= ?';$args[]=$high;
        $r=$this->query('SELECT id,date,duedate,datepaid FROM tblinvoices WHERE '.implode(' AND ',$where).' ORDER BY id ASC LIMIT 100',$args);
        return ['rows'=>$r,'total'=>null,'cursor'=>['last'=>$r?(int)end($r)['id']:(int)($cursor['last']??0),'high'=>$high],'finished'=>count($r)<100];
    }
    public function invoice(int $id): array {
        $r=$this->query('SELECT id,invoicenum,userid,date,duedate,datepaid,subtotal,credit,tax,tax2,total,taxrate,taxrate2,status,paymentmethod,notes FROM tblinvoices WHERE id=?',[$id])[0]??null;
        if(!$r)throw new \RuntimeException('Invoice no longer exists in WHMCS.');
        $r['invoiceid']=$r['id'];$r['items']=['item'=>$this->query('SELECT id,type,relid,description,amount,taxed FROM tblinvoiceitems WHERE invoiceid=? ORDER BY id',[$id])];
        return $r;
    }
    public function client(int $id): array {
        $fields=['id','firstname','lastname','companyname','email','address1','address2','city','state','postcode','country','currency','credit','tax_id','taxexempt'];
        $select=implode(',',array_intersect($fields,$this->columns('tblclients')));
        $r=$this->query('SELECT '.$select.' FROM tblclients WHERE id=?',[$id])[0]??null;
        if(!$r)throw new \RuntimeException('Client no longer exists in WHMCS.');
        $r['customfields']=$this->query("SELECT f.id,f.fieldname AS name,v.value FROM tblcustomfields f JOIN tblcustomfieldsvalues v ON v.fieldid=f.id WHERE f.type='client' AND v.relid=?",[$id]);
        return $r;
    }
    public function transactions(?int $client=null,?int $invoice=null): array {
        $w=[];$a=[];if($client!==null){$w[]='userid=?';$a[]=$client;}if($invoice!==null){$w[]='invoiceid=?';$a[]=$invoice;}
        return $this->query('SELECT id,userid,currency,gateway,date,description,amountin,fees,amountout,transid,invoiceid,refundid FROM tblaccounts'.($w?' WHERE '.implode(' AND ',$w):'').' ORDER BY id',$a);
    }
    public function credits(int $client): array {return $this->query('SELECT id,clientid,date,description,amount FROM tblcredit WHERE clientid=? ORDER BY id',[$client]);}
    public function paymentPage(array $f,int $after): array {
        return $this->query('SELECT id,userid,currency,gateway,date,description,amountin,fees,amountout,transid,invoiceid,refundid FROM tblaccounts WHERE id>? AND date>=? AND date<? ORDER BY id LIMIT 100',[$after,$f['from'],(new \DateTimeImmutable($f['to']))->modify('+1 day')->format('Y-m-d')]);
    }
}
