// Never replay a POST whose response was lost: workflow_dispatch has no idempotency key.
export class GitHubRequestError extends Error {
 constructor(message,{upstreamStatus=null,delivery='unknown',requestId=null,code='upstream_error'}={}){
  super(message);this.name='GitHubRequestError';this.status=502;
  this.upstreamStatus=upstreamStatus;this.delivery=delivery;this.requestId=requestId;this.code=code;
 }
}
export async function githubRequest(url,init={}, {fetcher=fetch,allowRedirect=false,wait=ms=>new Promise(resolve=>setTimeout(resolve,ms)),log=record=>console.warn(JSON.stringify(record))}={}){
 const method=(init.method||'GET').toUpperCase(),readOnly=method==='GET'||method==='HEAD';
 for(let attempt=0;attempt<2;attempt++){
  let response,error,retry=false,delay=500;
  try{response=await fetcher(url,{...init,redirect:init.redirect||'manual',signal:AbortSignal.timeout(25000)});}
  catch(cause){
   const timeout=cause?.name==='TimeoutError'||cause?.name==='AbortError';
   error=new GitHubRequestError(timeout?'O GitHub demorou para responder.':'A conexão com o GitHub foi interrompida.',{code:timeout?'timeout':'network_error'});
   retry=readOnly;
  }
  if(response){
   if(response.ok||(allowRedirect&&response.status===302))return response;
   const status=response.status,rateLimited=status===429||(status===403&&(response.headers.get('x-ratelimit-remaining')==='0'||response.headers.has('retry-after')));
   let message=`O GitHub não concluiu a operação (HTTP ${status}).`;
   if(rateLimited)message='O GitHub limitou temporariamente as solicitações. Aguarde antes de tentar novamente.';
   else if(status===401||status===403)message='O GitHub recusou o acesso. Confira a validade e as permissões da conexão.';
   else if(status===404)message='Workflow ou repositório não encontrado. Confira a conexão do servidor.';
   else if(status===422)message='O GitHub recusou os dados de envio do estudo (HTTP 422). Confira o workflow e a referência configurados.';
   else if(status>=500)message=`O GitHub apresentou uma falha temporária (HTTP ${status}).`;
   const rawId=response.headers.get('x-github-request-id');
   const requestId=rawId&&/^[A-Za-z0-9:-]{1,128}$/.test(rawId)?rawId:null;
   error=new GitHubRequestError(message,{upstreamStatus:status,delivery:status>=400&&status<500&&status!==408?'rejected':'unknown',requestId,code:rateLimited?'rate_limited':'http_error'});
   // Only retry reads. Even a 5xx response to a POST can follow an accepted dispatch.
   const after=response.headers.get('retry-after');
   const reset=response.headers.get('x-ratelimit-reset');
   const retryMs=after!==null?(Number.isFinite(Number(after))?Number(after)*1000:Date.parse(after)-Date.now()):reset?Number(reset)*1000-Date.now():null;
   retry=readOnly&&(status>=500||rateLimited)&&(!rateLimited||retryMs!==null&&retryMs<=1000);
   delay=Math.min(1000,Math.max(500,Number.isFinite(retryMs)?retryMs:0));
   await response.body?.cancel();
  }
  // Deliberately exclude URL, headers, tokens, response bodies and study/contact data.
  log({event:'github_request_failed',method,attempt:attempt+1,status:error.upstreamStatus,requestId:error.requestId,code:error.code,delivery:error.delivery});
  if(attempt===0&&retry){await wait(delay);continue;}
  throw error;
 }
 throw new GitHubRequestError('Não foi possível obter a resposta do GitHub.');
}
