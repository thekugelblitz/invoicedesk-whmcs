import {QueryClient} from '@tanstack/react-query';
export const isPHP=typeof document!=='undefined'&&document.documentElement.dataset.runtime==='php';
export const queryClient=new QueryClient({defaultOptions:{queries:{staleTime:750,gcTime:300000,retry:false,refetchOnWindowFocus:false}}});
let csrf='';
const aliases:Record<string,string>={analytics:'dashboard',history:'download_history',archive:'download'};
export const href=(action:string,q:any={})=>(isPHP?'api.php?':'/api/workspace?')+new URLSearchParams({action:isPHP?(aliases[action]||action):action,...q});
async function raw(action:string,body:any=null,q:any={},signal?:AbortSignal):Promise<any>{const r=await fetch(href(action,q),{method:body===null?'GET':'POST',headers:body===null?{}:{'Content-Type':'application/json',...(isPHP?{'X-CSRF-Token':csrf}:{'X-Munshi-Request':'1'})},body:body===null?undefined:JSON.stringify(body),credentials:'same-origin',signal});let d:any;try{d=await r.json();}catch{throw Error('The server did not return JSON. Check your PHP configuration or hosting error log.');}if(!r.ok)throw Error((d.error||'Request failed.')+(d.reference?' Reference: '+d.reference+'.':'')+(d.help?' '+d.help:''));return d;}
async function request(action:string,body:any,q:any,signal?:AbortSignal):Promise<any>{if(!isPHP)return raw(action,body,q,signal);
 if(action==='review'&&body)body={...body,status:body.reviewed?'reviewed':'open'};
 if((action==='connection_save'||action==='connection_test')&&body)body={mode:'api',...body};
 const d=await raw(action,body,q,signal);
 if(action==='bootstrap'){csrf=d.csrf;return {...d,user:d.user?{...d.user,userId:String(d.user.id),displayName:d.user.name||d.user.email,admin:d.user.role==='admin'}:null};}
 if(action==='analytics'){const g=await raw('gst_summary',null,q,signal);return {...d,summary:await raw('download_summary',null,q,signal),gst:(g.recipients||[]).map((r:any)=>({...r,gst_status:r.category.startsWith('GSTIN')?'valid':r.category.startsWith('No recipient')?'missing':'invalid'})),states:(g.states||[]).map((r:any)=>({...r,state:r.state_code})),rates:g.rates,duplicates:g.duplicates,cash:d.gateways||[]};}
 if(action==='invoices')return {...d,summary:await raw('download_summary',null,q,signal)};
 if(action==='invoice'){const ds=d.download_state||{};return {...d,last_downloaded:ds.last_at,downloaded_by:ds.last_user,download_count:ds.count||0,downloaded_hash:ds.source_hash,review_note:d.review_record?.note,review_hash:d.review_record?.source_hash,review_by:d.review_record?.reviewer,review_at:d.review_record?.updated_at};}
 if(action==='jobs')return {...d,rows:d.rows.map((j:any)=>({...j,failures:j.failures?.map((f:any)=>({...f,invoice_id:f.record_id}))}))};
 return d;
}
export async function call(action:string,body:any=null,q:any={}):Promise<any>{if(body!==null){const d=await request(action,body,q);await queryClient.invalidateQueries({queryKey:['api'],refetchType:'none'});return d;}return queryClient.fetchQuery({queryKey:['api',action,q],queryFn:({signal})=>request(action,null,q,signal)});}
