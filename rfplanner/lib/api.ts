import { env } from './server-env';
import {cookies}from'next/headers';
import{browserSession,browserCookieOptions}from'./browser-session.mjs';
import{publicOrigin}from'./public-origin.mjs';
import{ApiError,github,workflow,settings}from'./github';
export const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
export function failure(error:unknown){return json({error:error instanceof Error?error.message:'Não foi possível concluir a operação.'},error instanceof ApiError?error.status:400);}
export async function owner(req:Request){
 const jar=await cookies();let session;
 try{session=await browserSession(jar.get('rf_session')?.value,(env as unknown as Record<string,string>).RF_SESSION_SIGNING_KEY);}catch{throw new ApiError('A sessão do navegador ainda precisa ser configurada no servidor.',503);}
 if(session.created){
  jar.set('rf_session',session.token,{...browserCookieOptions(publicOrigin(req.url,env.RF_PUBLIC_ORIGIN).startsWith('https:')),sameSite:'lax'});
 }
 return session.owner;
}
export function sameOrigin(req:Request){if(req.headers.get('origin')!==publicOrigin(req.url,env.RF_PUBLIC_ORIGIN))throw new ApiError('Origem da solicitação inválida.',403);}
export function database(){if(!env.DB)throw new ApiError('O banco de estudos ainda não está disponível.',503);return env.DB;}
export function validateId(id:string){if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id))throw new ApiError('Identificador inválido.');return id;}
export type StudyRow={id:string;owner:string;name:string;request:string;state:string;created:number;run_id:number|null;run_url:string|null;error:string|null};
export async function ownedStudy(id:string,user:string){const row=await database().prepare('SELECT * FROM studies WHERE id=? AND owner=?').bind(validateId(id),user).first<StudyRow>();if(!row)throw new ApiError('Estudo não encontrado.',404);return row;}
export function publicStudy(row:StudyRow){return {id:row.id,name:row.name,state:row.state,created:row.created,runId:row.run_id,runUrl:row.run_url,error:row.error,study:JSON.parse(row.request)};}
export async function refresh(row:StudyRow){
 if(!settings().token||['success','failure','cancelled','timed_out'].includes(row.state))return row;
 let run;if(row.run_id){run=await(await github(`/actions/runs/${row.run_id}`)).json() as any;}
 else{const runs=await(await github(`/actions/workflows/${workflow}/runs?event=workflow_dispatch&per_page=100`)).json() as any;run=runs.workflow_runs?.find((r:any)=>r.display_title===`RFPlanner ${row.id}`);}
 if(run){row.run_id=run.id;row.run_url=run.html_url;row.state=run.status==='completed'?(run.conclusion||'failure'):run.status;row.error=null;await database().prepare('UPDATE studies SET run_id=?,run_url=?,state=?,error=NULL WHERE id=? AND owner=?').bind(row.run_id,row.run_url,row.state,row.id,row.owner).run();}
 return row;
}
