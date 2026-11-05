import{env}from'./server-env';
import{publicOrigin}from'./public-origin.mjs';
import{ApiError}from'./github';
import{createExportToken,verifyExportToken,exportLifetime}from'./export-token.mjs';
function secret(){const value=(env as unknown as Record<string,string>).RF_EXPORT_SIGNING_KEY;if(!value||value.length<32)throw new ApiError('A liberação da exportação ainda precisa ser configurada.',503);return value;}
export async function exportAccess(user:string,req:Request){
 const token=req.headers.get('cookie')?.split(';').map(p=>p.trim()).find(p=>p.startsWith('rf_export='))?.slice('rf_export='.length);
 return token?verifyExportToken(token,user,secret()):false;
}
export async function exportCookie(user:string,req:Request){return `rf_export=${await createExportToken(user,secret())}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${exportLifetime}${publicOrigin(req.url,env.RF_PUBLIC_ORIGIN).startsWith('https:')?'; Secure':''}`;}
