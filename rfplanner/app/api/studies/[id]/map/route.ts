import{owner,json,failure,ownedStudy}from'@/lib/api';
import{studyKmz}from'@/lib/study-result';
import{coveragePreview}from'@/lib/coverage-zip.mjs';
import{basemap}from'@/lib/map-config';
export const dynamic='force-dynamic';
export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){try{
 const user=await owner(req),{id}=await params,row=await ownedStudy(id,user),study=JSON.parse(row.request);
 return json({...coveragePreview(await studyKmz(row)),site:{latitude:study.latitude,longitude:study.longitude,name:study.name},opacity:study.opacity/100,basemap:basemap()});
}catch(e){return failure(e);}}
