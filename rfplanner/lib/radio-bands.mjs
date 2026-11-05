import{sectorValues}from'./sector-settings.mjs';
import{antennaCatalog,antennaReference}from'./antenna-catalog.mjs';
// Representative frequencies for preliminary coverage, not an assigned operator channel.
export const radioBands = [
 {id:'B28',technology:'LTE',frequency:780,duplex:'FDD',low:758,high:803},
 {id:'B40',technology:'LTE',frequency:2350,duplex:'TDD',low:2300,high:2400},
 {id:'B38',technology:'LTE',frequency:2595,duplex:'TDD',low:2570,high:2620},
 {id:'n38',technology:'NR',frequency:2595,duplex:'TDD',low:2570,high:2620},
 {id:'n78',technology:'NR',frequency:3500,duplex:'TDD',low:3300,high:3800}
];
export function studyBand(study){return radioBands.find(b=>b.technology===study.technology&&study.frequency>=b.low&&study.frequency<=b.high);}
export function channelWidths(study){
 if(study.technology==='LTE')return [5,10,15,20];
 const max=studyBand(study)?.id==='n38'?40:study.scs===15?50:100;
 return [10,15,20,25,30,40,50,60,70,80,90,100].filter(v=>v<=max);
}
export function applyBand(study,id){
 const band=radioBands.find(b=>b.id===id);if(!band)throw Error('Banda inválida.');
 const next={...study,technology:band.technology,frequency:band.frequency,duplex:band.duplex};
 const widths=channelWidths(next);
 if(!widths.includes(next.bandwidth))next.bandwidth=band.technology==='LTE'?5:band.id==='n38'?20:100;
 // Adapt each independent sector when the shared band changes.
 const adapt=a=>{
  const current=antennaReference(a.antenna);if(!current||current.bands.includes(band.id))return {...a};
  const candidates=antennaCatalog.filter(b=>!b.legacy&&b.kind===current.kind&&b.bands.includes(band.id));
  candidates.sort((a,b)=>Math.abs(a.gain-current.gain)-Math.abs(b.gain-current.gain));
  return {...a,antenna:candidates[0]?.id||'omni',gain:candidates[0]?.gain||0};
 };
 const adjusted=adapt(next);adjusted.sectors=study.sectors.map(a=>adapt(sectorValues(study,a)));return adjusted;
}
