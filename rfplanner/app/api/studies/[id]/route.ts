import{owner,json,failure,ownedStudy,publicStudy,refresh,sameOrigin,database}from'@/lib/api';
export const dynamic='force-dynamic';
export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){try{const user=await owner(req),{id}=await params;return json(publicStudy(await refresh(await ownedStudy(id,user))));}catch(e){return failure(e);}}
export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){try{
 sameOrigin(req);const user=await owner(req),{id}=await params;const row=await ownedStudy(id,user);
 await database().prepare('DELETE FROM studies WHERE id=? AND owner=?').bind(row.id,user).run();
 return json({deleted:true,id:row.id});
}catch(e){return failure(e);}}
