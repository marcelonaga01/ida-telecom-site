import{owner,json,failure,database,sameOrigin,validateId,publicStudy,StudyRow,refresh,ownedStudy}from'@/lib/api';
import{settings,github,workflow,ApiError}from'@/lib/github';
import{validateStudy}from'@/lib/study.mjs';
import{validateLandcoverCoverage}from'@/lib/landcover-coverage.mjs';
export const dynamic='force-dynamic';
export async function GET(req:Request){try{const user=await owner(req);const rows=await database().prepare('SELECT * FROM studies WHERE owner=? ORDER BY created DESC LIMIT 30').bind(user).all<StudyRow>();let connected=false,connectionError=null;if(settings().token){try{await github(`/actions/workflows/${workflow}`);connected=true;}catch(e){connectionError=(e as Error).message;}}return json({studies:rows.results.map(publicStudy),connected,connectionError});}catch(e){return failure(e);}}
export async function POST(req:Request){try{
 sameOrigin(req);const user=await owner(req);const raw=await req.text();if(raw.length>18000)throw new ApiError('Dados muito grandes.',413);const body=JSON.parse(raw),id=validateId(body.id),study=validateStudy({...body.study,terrain:'AW3D30'});
 validateLandcoverCoverage(study);
 if(!settings().token)throw new ApiError('Configure a conexão com o GitHub antes de iniciar o cálculo.',503);
 const inserted=await database().prepare('INSERT OR IGNORE INTO studies(id,owner,name,request,state,created) VALUES(?,?,?,?,?,?)').bind(id,user,study.name,JSON.stringify(study),'dispatching',Date.now()).run();
 if(!inserted.meta.changes){
  let old=await ownedStudy(id,user);if(old.request!==JSON.stringify(study))throw new ApiError('Este identificador já foi utilizado.',409);
  // An ambiguous dispatch is reconciled, never blindly repeated.
  old=await refresh(old);
  if(old.state!=='dispatch_failed')return json(publicStudy(old),200);
  const claim=await database().prepare("UPDATE studies SET state='dispatching',error=NULL WHERE id=? AND owner=? AND state='dispatch_failed'").bind(id,user).run();
  if(!claim.meta.changes)return json(publicStudy(await ownedStudy(id,user)),200);
 }
 let state='queued',message:string|null=null;
 try{await github(`/actions/workflows/${workflow}/dispatches`,{method:'POST',body:JSON.stringify({ref:settings().ref,inputs:{request_id:id,study_json:JSON.stringify(study)}})});}
 catch(error){
  const known=error instanceof ApiError;
  state=known&&error.delivery==='rejected'?'dispatch_failed':'unconfirmed';
  message=known?error.message:'Não foi possível confirmar a resposta do GitHub.';
  if(state==='unconfirmed')message+=' A aplicação continuará verificando se o estudo foi recebido. Não crie outro estudo enquanto o envio estiver sem confirmação.';
  console.warn(JSON.stringify({event:'study_dispatch_failed',studyId:id,state,status:known?error.upstreamStatus:null,requestId:known?error.requestId:null,code:known?error.code:'local_error'}));
 }
 await database().prepare('UPDATE studies SET state=?,error=? WHERE id=? AND owner=?').bind(state,message,id,user).run();
 let row=await ownedStudy(id,user);
 if(state==='unconfirmed'){try{row=await refresh(row);}catch{/* Polling will reconcile after connectivity returns. */}}
 return json(publicStudy(row),state==='dispatch_failed'?200:202);
 }catch(e){return failure(e);}}
