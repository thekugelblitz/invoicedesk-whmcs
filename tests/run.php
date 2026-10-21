<?php
declare(strict_types=1);
$testDir=sys_get_temp_dir().'/invoicedesk-test-'.bin2hex(random_bytes(6));
putenv('INVOICEDESK_STORAGE='.$testDir);
require dirname(__DIR__).'/app/bootstrap.php';
use InvoiceDesk\{Money,Gst,Service,Jobs,Report,Archive,Vault};
use InvoiceDesk\Connectors\{Source,Api};
use function InvoiceDesk\{db,config};
$passed=0;$failed=0;
function test(string $name,callable $f): void {global $passed,$failed;try{$f();echo 'PASS '.$name."\n";$passed++;}catch(Throwable $e){echo 'FAIL '.$name.': '.$e->getMessage()."\n";$failed++;}}
function eq(mixed $a,mixed $b): void {if($a!==$b)throw new RuntimeException(var_export($a,true).' != '.var_export($b,true));}
function throws(callable $f): void {try{$f();}catch(Throwable){return;}throw new RuntimeException('Expected exception');}
function gst(string $body): string {return $body.Gst::checkDigit($body);}
$valid=gst('24ABCDE1234F1Z');$other=gst('27ABCDE1234F1Z');
test('decimal arithmetic and half-up rounding',function(){eq(Money::minor('0.10')+Money::minor('0.20'),30);eq(Money::minor('-1.005'),-101);eq(Money::minor('999.999'),100000);eq(Money::decimal(-101),'-1.01');throws(fn()=>Money::minor('1,000'));throws(fn()=>Money::minor('NaN'));});
test('GSTIN known checksum vector and state validation',function()use($valid){eq(Gst::checkDigit('27AAPFU0939F1Z'),'V');eq(Gst::validate($valid)['valid'],true);eq(Gst::validate('00ABCDE1234F1Z0')['valid'],false);eq(Gst::validate(substr($valid,0,14).'0')['valid'],substr($valid,-1)==='0');});
test('regex boundaries and lowercase',function()use($valid){eq(Gst::extract('GSTIN: '.strtolower($valid)),[$valid]);eq(Gst::extract('X'.$valid.'X'),[]);});
$base=['invoiceid'=>1,'userid'=>101,'invoicenum'=>'HS/2026/1','date'=>'2026-09-01','duedate'=>'2026-09-10','datepaid'=>'2026-09-03 12:00:00','subtotal'=>'100.00','tax'=>'18.00','tax2'=>'0.00','total'=>'118.00','credit'=>'0.00','status'=>'Paid','paymentmethod'=>'razorpay','notes'=>'','items'=>['item'=>[['id'=>1,'type'=>'Hosting','description'=>'Web hosting','amount'=>'100.00','taxed'=>1]]]];
$client=['id'=>101,'firstname'=>'Test','lastname'=>'Client','companyname'=>'Fixture Company','email'=>'fixture@example.test','country'=>'IN','currency'=>1,'credit'=>'25.00','tax_id'=>$valid];
$prefs=['supplier_gstin'=>$other,'gst_labels'=>'gstin','tax_is_gst'=>true];
test('current profile never becomes historical proof',function()use($base,$client,$prefs){$r=Gst::classify($base,$client,$prefs);eq($r['status'],'valid');eq($r['basis'],'current_profile');eq($r['review'],1);});
test('snapshot overrides changed client tax ID',function()use($base,$client,$prefs,$valid,$other){$i=$base;$i['_snapshot']=['firstname'=>'Test','tax_id'=>$valid];$c=$client;$c['tax_id']=$other;$r=Gst::classify($i,$c,$prefs);eq($r['gstin'],$valid);eq($r['basis'],'snapshot');});
test('supplier never treated as recipient',function()use($base,$client,$prefs,$other){$c=$client;$c['tax_id']=$other;$r=Gst::classify($base,$c,$prefs);eq($r['status'],'missing');});
test('conflicting tax fields and malformed IDs are flagged',function()use($base,$client,$prefs,$valid){$c=$client;$c['customfields']=[['name'=>'GSTIN','value'=>gst('29ABCDE1234F1Z')]];eq(Gst::classify($base,$c,$prefs)['status'],'conflict');$c['customfields']=[];$c['tax_id']='wrong';eq(Gst::classify($base,$c,$prefs)['status'],'invalid');});
test('tax amount stays separate from GSTIN presence',function()use($base,$client,$prefs){$i=$base;$i['tax']='0.00';$i['total']='100.00';$r=Gst::classify($i,$client,$prefs);eq($r['tax_charged'],false);eq($r['status'],'valid');});
test('API pagination rejects a shifting source',function(){$a=new Api([],fn()=>json_encode(['result'=>'success','totalresults'=>2,'invoices'=>['invoice'=>[['id'=>1]]]]));throws(fn()=>$a->page([],['expected'=>3]));});
test('API pagination rejects overlapping IDs',function(){$a=new Api([],fn()=>json_encode(['result'=>'success','totalresults'=>2,'invoices'=>['invoice'=>[['id'=>1]]]]));throws(fn()=>$a->page([],['last'=>1]));});
test('partial transaction response cannot pass completeness check',function(){$a=new Api([],fn()=>json_encode(['result'=>'success','totalresults'=>2,'transactions'=>['transaction'=>[['id'=>1]]]]));throws(fn()=>$a->transactions(101));});
test('flattened WHMCS credit responses normalize correctly',function(){$a=new Api([],fn()=>json_encode(['result'=>'success','totalresults'=>1,'credits[credit][0][id]'=>'9','credits[credit][0][date]'=>'2026-09-01','credits[credit][0][amount]'=>'20.00']));eq($a->credits(101)[0]['id'],'9');});
final class FixtureSource implements Source {
    public array $invoices=[];public array $tx=[];public bool $fail=false;public int $clientCalls=0;
    public function __construct(public array $c){}
    public function test(): array{return ['ok'=>true];}public function currencies(): array{return [['id'=>1,'code'=>'INR'],['id'=>2,'code'=>'USD']];}
    public function page(array $f,array $cursor): array{return ['rows'=>array_map(fn($i)=>['id'=>$i['invoiceid'],'date'=>$i['date'],'duedate'=>$i['duedate'],'datepaid'=>$i['datepaid']],array_values($this->invoices)),'total'=>count($this->invoices),'cursor'=>['last'=>99],'finished'=>true];}
    public function invoice(int $id): array{if($this->fail)throw new RuntimeException('Temporary source failure');return $this->invoices[$id];}
    public function client(int $id): array{$this->clientCalls++;return $this->c+['id'=>$id];}
    public function transactions(?int $client=null,?int $invoice=null): array{return array_values(array_filter($this->tx,fn($t)=>($client===null||$t['userid']===$client)&&($invoice===null||$t['invoiceid']===$invoice)));}
    public function credits(int $client): array{return [['id'=>1,'date'=>'2026-08-30','amount'=>'50.00','description'=>'Wallet deposit'],['id'=>2,'date'=>'2026-09-01','amount'=>'-25.00','description'=>'Credit applied']];}
}
$source=new FixtureSource($client);$source->invoices=[1=>$base];
$source->tx=[['id'=>1,'userid'=>101,'invoiceid'=>1,'date'=>'2026-09-03 12:00:00','amountin'=>'118.00','amountout'=>'0.00','fees'=>'2.00','gateway'=>'razorpay','transid'=>'pay_fixture'],['id'=>2,'userid'=>101,'invoiceid'=>0,'date'=>'2026-08-30 12:00:00','amountin'=>'50.00','amountout'=>'0.00','fees'=>'0.00','gateway'=>'bank','transid'=>'wallet_fixture']];
db()->set('currencies',$source->currencies());db()->set('preferences',$prefs+['company'=>'HostingSpell','accent'=>'#b8a1ff','archive_days'=>7]);
$service=new Service($source,[]);$jobs=new Jobs($service);
function drain(Jobs $jobs,string $id): array {for($n=0;$n<40;$n++){$j=$jobs->tick($id);if(!in_array($j['state'],['queued','running'],true))return $j;}throw new RuntimeException('Job did not settle');}
test('credential encryption round trip and wrong ciphertext rejection',function(){$x=Vault::encrypt(['secret'=>'fixture-only']);eq(Vault::decrypt($x),['secret'=>'fixture-only']);throws(fn()=>Vault::decrypt('corrupt'));});
test('invoice import is idempotent and preserves exact balance',function()use($service){$service->importInvoice(1);$service->importInvoice(1);eq((int)db()->one('SELECT COUNT(*) n FROM invoices')['n'],1);eq((int)db()->one('SELECT COUNT(*) n FROM transactions')['n'],1);eq(db()->one('SELECT balance FROM invoices WHERE id=1')['balance'],0);});
test('refund increases settlement balance; credit application reduces it',function()use($service,$source,$base){$source->invoices[2]=$base;$source->invoices[2]['invoiceid']=2;$source->invoices[2]['invoicenum']='HS/2';$source->invoices[2]['status']='Unpaid';$source->invoices[2]['credit']='25.00';$source->tx[]=['id'=>3,'userid'=>101,'invoiceid'=>2,'date'=>'2026-09-04','amountin'=>'50.00','amountout'=>'10.00','fees'=>'1.00','gateway'=>'bank','transid'=>'fixture2'];$service->importInvoice(2);eq(db()->one('SELECT balance FROM invoices WHERE id=2')['balance'],5300);});
test('cancelled invoice has zero collectible balance',function()use($source,$base,$service){$i=$base;$i['invoiceid']=3;$i['status']='Cancelled';$source->invoices[3]=$i;$service->importInvoice(3);eq(db()->one('SELECT balance FROM invoices WHERE id=3')['balance'],0);});
test('client ledger sync includes unallocated receipts and wallet history',function()use($jobs){$id=$jobs->create('ledger',['client_id'=>101]);eq(drain($jobs,$id)['state'],'complete');$l=Report::ledger(101,['from'=>'2026-09-01','to'=>'2026-09-30']);eq($l['closing']['INR'],5300);eq(count($l['credits']),1);eq(count($l['payments']),2);eq((int)db()->one('SELECT COUNT(*) n FROM transactions')['n'],3);});
test('historical opening balances include pre-period entries',function(){$l=Report::ledger(101,['from'=>'2026-09-04','to'=>'2026-09-30']);eq($l['opening']['INR'],9300);eq($l['closing']['INR'],5300);});
test('failed invoice tasks stay visible and retry succeeds',function()use($jobs,$source){$source->fail=true;$id=$jobs->create('refresh',['ids'=>[1]]);eq(drain($jobs,$id)['state'],'partial');eq(db()->one('SELECT state FROM tasks WHERE job_id=?',[$id])['state'],'failed');$source->fail=false;$jobs->retry($id);eq(drain($jobs,$id)['state'],'complete');});
test('mass-pay and add-funds do not inflate sales totals',function()use($source,$base,$service){foreach([4=>'Invoice',5=>'AddFunds'] as $id=>$type){$i=$base;$i['invoiceid']=$id;$i['items']['item'][0]['type']=$type;$source->invoices[$id]=$i;$service->importInvoice($id);} $d=Report::dashboard(['from'=>'2026-09-01','to'=>'2026-09-30']);eq($d['totals'][0]['billed'],23600);});
test('CSV quoting prevents formula execution and preserves totals',function()use($service,$source){eq(Report::csvCell('-10.00'),'-10.00');eq(Report::csvCell('-1+2'),"'-1+2");$source->invoices[1]['invoicenum']='=1+1';$service->importInvoice(1);$f=fopen('php://temp','w+');Report::invoiceCsv($f,['from'=>'2026-09-01','to'=>'2026-09-30']);rewind($f);$txt=stream_get_contents($f);fclose($f);if(!str_contains($txt,"'=1+1"))throw new RuntimeException('Formula not escaped');if(!str_contains($txt,'118.00'))throw new RuntimeException('Amount changed');});
test('HTML rendering escapes invoice and client input',function()use($service,$source){$source->invoices[1]['notes']='<script>alert(1)</script>';$service->importInvoice(1);$i=db()->one('SELECT * FROM invoices WHERE id=1');$html=InvoiceDesk\InvoiceView::html($i);eq(str_contains($html,'<script>alert'),false);eq(str_contains($html,'&lt;script&gt;'),true);});
test('resumable archive has every copy and manifest',function()use($jobs,$service){$id=$jobs->create('archive',['ids'=>[1,2],'format'=>'html']);eq(drain($jobs,$id)['state'],'complete');$z=new ZipArchive();eq($z->open((new Archive($service))->path($id)),true);eq($z->numFiles,4);eq($z->locateName('manifest.csv')!==false,true);$z->close();});
test('date validation rejects impossible dates',function(){throws(fn()=>InvoiceDesk\validDate('2026-02-30'));throws(fn()=>InvoiceDesk\dateRange(['from'=>'2026-09-30','to'=>'2026-09-01']));});
test('payment journal stages records and completes all client tasks',function()use($jobs){$id=$jobs->create('payments',['from'=>'2026-08-01','to'=>'2026-09-30']);eq(drain($jobs,$id)['state'],'complete');eq((int)db()->one('SELECT COUNT(*) n FROM payment_stage WHERE job_id=?',[$id])['n'],0);eq((int)db()->one('SELECT COUNT(*) n FROM transactions')['n'],3);});
test('complete date sync removes deleted cached invoices in that scope',function()use($source,$jobs){unset($source->invoices[5]);$id=$jobs->create('sync',['from'=>'2026-09-01','to'=>'2026-09-30','basis'=>'date']);eq(drain($jobs,$id)['state'],'complete');eq(db()->one('SELECT id FROM invoices WHERE id=5'),null);});
test('GST summary keeps evidence categories and currencies explicit',function(){$d=Report::gstSummary(['from'=>'2026-09-01','to'=>'2026-09-30']);eq(count($d['recipients']),1);eq($d['recipients'][0]['currency'],'INR');eq($d['recipients'][0]['tax'],3600);});
test('source API client passwords and unrelated custom fields are not retained',function()use($service,$client){$c=$client;$c['password']='MUST_NOT_BE_CACHED';$c['customfields']=[['name'=>'Server password','value'=>'MUST_NOT_BE_CACHED']];$saved=$service->saveClient($c);eq(isset($saved['password']),false);eq($saved['customfields'],[]);eq(str_contains(db()->one('SELECT data FROM clients WHERE id=101')['data'],'MUST_NOT_BE_CACHED'),false);});
test('ledger CSV streams every settlement entry with exact running balance',function(){$f=fopen('php://temp','w+');InvoiceDesk\Ledger::csv($f,101,['from'=>'2026-09-01','to'=>'2026-09-30']);rewind($f);$csv=stream_get_contents($f);fclose($f);eq(str_contains($csv,'53.00'),true);eq(substr_count(trim($csv),"\n"),5);});
test('overlapping active jobs are rejected',function()use($jobs){$id=$jobs->create('refresh',['ids'=>[1]]);throws(fn()=>$jobs->create('refresh',['ids'=>[2]]));eq(drain($jobs,$id)['state'],'complete');});
test('bulk PDF scans fail visibly when text extraction is unavailable',function()use($jobs){$id=$jobs->create('pdf_scan',['ids'=>[1]]);$r=drain($jobs,$id);eq($r['state'],'partial');eq($r['errors'],1);});
echo "\n".$passed.' passed, '.$failed." failed\n";
// Keep tests self-contained, clean fixture data after the database handles are closed at process exit.
exit($failed?1:0);
