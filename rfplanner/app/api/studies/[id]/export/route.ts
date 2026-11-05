import{owner,json,failure,ownedStudy,sameOrigin}from'@/lib/api';
import{ApiError}from'@/lib/github';
import{exportAccess,exportCookie}from'@/lib/export-access';
import{notifyLead}from'@/lib/email';
import{validateLead}from'@/lib/lead.mjs';
export const dynamic='force-dynamic';
export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){try{const user=await owner(req),{id}=await params;await ownedStudy(id,user);return json({allowed:await exportAccess(user,req)});}catch(e){return failure(e);}}
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){try{
 sameOrigin(req);const user=await owner(req),{id}=await params,row=await ownedStudy(id,user);if(row.state!=='success')throw new ApiError('Aguarde o cálculo terminar antes de exportar.',409);
 const raw=await req.text();if(raw.length>3000)throw new ApiError('Formulário muito grande.',413);const lead=validateLead(JSON.parse(raw));
 if(await exportAccess(user,req))return json({allowed:true});
 const cookie=await exportCookie(user,req);
 await notifyLead(lead,row,user);
 const response=json({allowed:true});response.headers.set('Set-Cookie',cookie);return response;
}catch(e){return failure(e);}}
