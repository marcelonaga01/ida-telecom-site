// Resolve legacy study-wide values without changing the original study.
export const sectorFields=['antenna','gain','power','height','insertionLoss','cableLoss','mimoGain','mimoMultiplier'];
export function sectorValues(study,sector){
 const resolved={...sector};for(const key of sectorFields)if(!Object.hasOwn(sector,key))resolved[key]=study[key];return resolved;
}
export function copyNextSector(study){
 const previous=study.sectors.at(-1),base=sectorValues(study,previous||{azimuth:0,electricalTilt:0,mechanicalTilt:0});
 let n=study.sectors.length+1;while(study.sectors.some(s=>s.name===`Setor ${n}`))n++;
 return {...base,name:`Setor ${n}`};
}
