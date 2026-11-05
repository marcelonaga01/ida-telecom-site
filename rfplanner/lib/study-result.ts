import{StudyRow,refresh}from'./api';
import{github,artifactArchive,ApiError}from'./github';
import{extractKmz}from'./zip.mjs';
import{withStudyLegend}from'./coverage-legend.mjs';
// Result adapter: the viewer and export flow consume KMZ bytes, independent of the calculation provider.
export async function studyKmz(row:StudyRow){
 row=await refresh(row);if(row.state!=='success'||!row.run_id)throw new ApiError('O resultado ainda não está disponível.',409);
 const data=await(await github(`/actions/runs/${row.run_id}/artifacts?per_page=30`)).json() as any,artifact=data.artifacts?.find((a:any)=>a.name==='kmz'&&!a.expired);if(!artifact)throw new ApiError('O resultado expirou. Execute um novo estudo para gerar os arquivos.',410);
 return withStudyLegend(extractKmz(await artifactArchive(artifact.id)),JSON.parse(row.request));
}
