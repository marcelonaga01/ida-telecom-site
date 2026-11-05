export const installedLandcover = [
  {
    "collection": 4,
    "year": 2025,
    "region": "Sul de Minas Gerais",
    "bounds": [
      -45.90004826278583,
      -22.79996056318075,
      -45.100008670748984,
      -21.999920971143904
    ]
  }
];
export class LandcoverCoverageError extends Error {}
// Metadata can reject an unavailable extent. The raster crop still checks every required pixel.
export function validateLandcoverCoverage(study,sources=installedLandcover){
 if(!study.clutter||study.landcoverSource!=='MAPBIOMAS')return;
 const delta=study.radius/111,dx=delta/Math.cos(study.latitude*Math.PI/180);
 const [west,south,east,north]=[study.longitude-dx,study.latitude-delta,study.longitude+dx,study.latitude+delta];
 const rectangles=sources.filter(s=>s.year===study.landcoverYear&&s.collection===4).map(s=>s.bounds);
 const xs=[...new Set([west,east,...rectangles.flatMap(b=>[b[0],b[2]]).filter(x=>x>west&&x<east)])].sort((a,b)=>a-b);
 for(let i=1;i<xs.length;i++){
  const x=(xs[i-1]+xs[i])/2,ys=rectangles.filter(b=>b[0]<=x&&b[2]>=x).map(b=>[b[1],b[3]]).sort((a,b)=>a[0]-b[0]);
  let covered=south;
  for(const [lo,hi] of ys){if(lo>covered+1e-9)break;covered=Math.max(covered,hi);}
  if(covered<north-1e-9)throw new LandcoverCoverageError('A base MapBiomas instalada não cobre toda a área deste estudo. Atualmente há dados para o sul de Minas Gerais. Instale um recorte MapBiomas da região que cubra todo o raio solicitado antes de calcular.');
 }
}
