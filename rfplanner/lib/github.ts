import { env } from './server-env';
import {githubRequest,GitHubRequestError} from './github-http.mjs';
export const workflow='web-coverage.yml';
export function settings(){
 const vars=env as unknown as Record<string,string>,repository=vars.RF_GITHUB_REPOSITORY||'marcelonaga01/rfplanner-c';
 if(!/^[\w.-]+\/[\w.-]+$/.test(repository))throw Error('Repositório inválido no servidor.');
 return {token:vars.RF_GITHUB_TOKEN,repository,ref:vars.RF_GITHUB_REF||'main'};
}
export class ApiError extends Error{delivery?:string;upstreamStatus?:number|null;requestId?:string|null;code?:string;constructor(message:string,public status=400){super(message);}}
export async function github(path:string,init:RequestInit={},allowRedirect=false){
 const s=settings();if(!s.token)throw new ApiError('A conexão com o GitHub ainda precisa ser configurada pelo administrador.',503);
 try{return await githubRequest(`https://api.github.com/repos/${s.repository}${path}`,{...init,headers:{Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'RFPlanner-Web',Authorization:`Bearer ${s.token}`,'Content-Type':'application/json'}},{allowRedirect});}
 catch(error){if(error instanceof GitHubRequestError)throw Object.assign(new ApiError(error.message,error.status),{delivery:error.delivery,upstreamStatus:error.upstreamStatus,requestId:error.requestId,code:error.code});throw error;}
}
export async function artifactArchive(id:number){
 const r=await github(`/actions/artifacts/${id}/zip`,{redirect:'manual'},true),url=new URL(r.headers.get('location')||'https://invalid.local');
 if(url.protocol!=='https:'||!/(\.blob\.core\.windows\.net|\.githubusercontent\.com|\.actions\.githubusercontent\.com)$/.test(url.hostname))throw new ApiError('Endereço de download inesperado.',502);
 const archive=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(45000)});
 if(!archive.ok)throw new ApiError('Não foi possível baixar o arquivo do GitHub.',502);
 const max=16*1024*1024;if(Number(archive.headers.get('content-length'))>max)throw new ApiError('KMZ maior que o limite da interface. Use o pacote no GitHub.',413);
 const reader=archive.body!.getReader(),parts:Uint8Array[]=[];let size=0;
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>max){await reader.cancel();throw new ApiError('KMZ excede o limite de download. Use o GitHub.',413);}parts.push(value);}
 const buffer=new Uint8Array(size);let offset=0;for(const p of parts){buffer.set(p,offset);offset+=p.length;}return buffer;
}
