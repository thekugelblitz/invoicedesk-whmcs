<?php
declare(strict_types=1);
namespace InvoiceDesk;
final class Gst {
    public const PATTERN='/(?<![A-Z0-9])[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z](?![A-Z0-9])/i';
    public const STATES=['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','97','99'];
    public static function checkDigit(string $body): string {
        $chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';$sum=0;$factor=2;
        for($i=strlen($body)-1;$i>=0;$i--){$code=strpos($chars,strtoupper($body[$i]));if($code===false)return ''; $n=$code*$factor;$sum+=intdiv($n,36)+($n%36);$factor=$factor===2?1:2;}
        return $chars[(36-$sum%36)%36];
    }
    public static function validate(string $gstin): array {
        $v=strtoupper(trim($gstin));$format=(bool)preg_match('/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/D',$v);
        $state=$format && in_array(substr($v,0,2),self::STATES,true);
        $checksum=$format && self::checkDigit(substr($v,0,14))===substr($v,14,1);
        return ['value'=>$v,'format'=>$format,'state'=>$state,'checksum'=>$checksum,'valid'=>$format&&$state&&$checksum,'registration'=>'not_checked'];
    }
    public static function extract(string $text): array { preg_match_all(self::PATTERN,strtoupper($text),$m);return array_values(array_unique($m[0])); }
    public static function classify(array $invoice,array $client,array $settings): array {
        $issues=[];$evidence=[];$supplier=strtoupper(trim($settings['supplier_gstin']??''));
        $snapshot=$invoice['_snapshot']??null;
        $recipient=is_array($snapshot)?$snapshot:$client;
        $basis=is_array($snapshot)?'snapshot':'current_profile';
        $add=function(string $text,string $source,bool $strict=false)use(&$evidence,$supplier){
            $values=self::extract($text);
            if($strict && trim($text)!=='' && !$values)$values=[strtoupper(trim($text))];
            foreach($values as $v){if($supplier!=='' && $v===$supplier)continue;$evidence[]=['source'=>$source]+self::validate($v);}
        };
        $add((string)($recipient['tax_id']??$recipient['taxId']??''),$basis.'.tax_id',true);
        $fields=$recipient['customfields']??[];
        if(isset($fields['customfield']))$fields=$fields['customfield'];
        $labels=array_filter(array_map('trim',explode(',',strtolower($settings['gst_labels']??'gstin,gst number,gst no,gst registration'))));
        foreach($fields as $f){
            if(!is_array($f))continue;$name=strtolower(trim((string)($f['name']??$f['fieldname']??'')));
            if(in_array($name,$labels,true))$add((string)($f['value']??''),$basis.'.customfield:'.$name,true);
        }
        $vals=array_values(array_unique(array_column($evidence,'value')));
        if(count($vals)>1){$state='conflict';$issues[]='Multiple recipient tax IDs need review.';}
        elseif(!$vals){$state='missing';}
        else{$state=$evidence[0]['valid']?'valid':'invalid';if($state==='invalid')$issues[]='Recipient tax ID fails format, state, or checksum checks.';}
        if($basis==='current_profile')$issues[]='Current client profile; historical invoice GSTIN is not confirmed.';
        $notes=self::extract((string)($invoice['notes']??''));
        $notes=array_values(array_filter($notes,fn($v)=>$v!==$supplier));
        if($notes)$issues[]='GSTIN-like text appears in invoice notes; not automatically attributed to the recipient.';
        $tax=Money::minor($invoice['tax']??'0')+Money::minor($invoice['tax2']??'0');
        if(($settings['tax_is_gst']??false) && $tax>0 && $state!=='valid')$issues[]='GST-configured tax charged without one valid recipient GSTIN (may be a retail sale).';
        $items=rows($invoice['items']??[],'item');$itemSum=0;
        foreach($items as $item)$itemSum+=Money::minor($item['amount']??'0');
        if($items && abs($itemSum-Money::minor($invoice['subtotal']??'0'))>1)$issues[]='Line items differ from subtotal by more than 0.01.';
        if(abs(Money::minor($invoice['subtotal']??'0')+$tax-Money::minor($invoice['total']??'0'))>1)$issues[]='Subtotal plus tax differs from total; inspect adjustments or tax-inclusive configuration.';
        $review=$state==='invalid'||$state==='conflict'||$basis==='current_profile'||count($issues)>0;
        return ['gstin'=>$vals[0]??'','status'=>$state,'basis'=>$basis,'review'=>(int)$review,'issues'=>$issues,'evidence'=>$evidence,'notes_matches'=>$notes,'tax_charged'=>$tax!==0];
    }
}
