import{owner,failure,ownedStudy}from'@/lib/api';
import{ApiError}from'@/lib/github';
import{studyKmz}from'@/lib/study-result';
import{exportAccess}from'@/lib/export-access';
export const dynamic='force-dynamic';
export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){try{
 const user=await owner(req),{id}=await params,row=await ownedStudy(id,user);if(!await exportAccess(user,req))throw new ApiError('Preencha seus dados de contato para liberar a exportação.',403);
 const file=await studyKmz(row);return new Response(new Uint8Array(file),{headers:{'Content-Type':'application/vnd.google-earth.kmz','Content-Disposition':`attachment; filename="cobertura-${id.slice(0,8)}.kmz"`,'Cache-Control':'private, no-store'}});
 }catch(e){return failure(e);}}
