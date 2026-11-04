// User-supplied reference patterns. Band labels express simulation use, not measured bandwidth.
export const antennaCatalog=[
 {id:'ref_low_sector12',kind:'Setorial',gain:12,bands:['B28'],frequency:825,file:'ref_low_sector12.msi'},
 {id:'ref_low_sector15',kind:'Setorial',gain:15,bands:['B28'],frequency:825,file:'ref_low_sector15.msi'},
 {id:'ref_low_sector18',kind:'Setorial',gain:18,bands:['B28'],frequency:825,file:'ref_low_sector18.msi'},
 {id:'ref_low_omni8',kind:'Omnidirecional',gain:8,bands:['B28'],frequency:825,file:'ref_low_omni8.msi'},
 {id:'ref_low_omni11',kind:'Omnidirecional',gain:11,bands:['B28'],frequency:825,file:'ref_low_omni11.msi'},
 {id:'ref_mid_sector12',kind:'Setorial',gain:12,bands:['B40','B38','n38'],frequency:2192,file:'ref_mid_sector12.msi'},
 {id:'ref_mid_sector15',kind:'Setorial',gain:15,bands:['B40','B38','n38'],frequency:2192,file:'ref_mid_sector15.msi'},
 {id:'ref_mid_sector18',kind:'Setorial',gain:18,bands:['B40','B38','n38'],frequency:2192,file:'ref_mid_sector18.msi'},
 {"id":"ref_sector_735","kind":"Setorial","gain":13.3,"bands":["B28"],"frequency":735,"file":"ref_sector_735.msi"},
 {"id":"ref_sector_825","kind":"Setorial","gain":14,"bands":["B28"],"frequency":825,"file":"ref_sector_825.msi"},
 {"id":"ref_sector_915","kind":"Setorial","gain":14.3,"bands":["B28"],"frequency":915,"file":"ref_sector_915.msi"},
 {"id":"ref_sector_2300","kind":"Setorial","gain":16.2,"bands":["B40"],"frequency":2300,"file":"ref_sector_2300.msi"},
 {"id":"ref_sector_2450","kind":"Setorial","gain":16.6,"bands":["B40","B38","n38"],"frequency":2450,"file":"ref_sector_2450.msi"},
 {"id":"ref_sector_2600","kind":"Setorial","gain":17,"bands":["B38","n38"],"frequency":2600,"file":"ref_sector_2600.msi"},
 {"id":"ref_sector_3500","kind":"Setorial","gain":16.9,"bands":["n78"],"frequency":3500,"file":"ref_sector_3500.msi"},
 {"id":"ref_sector_3800","kind":"Setorial","gain":17.3,"bands":["n78"],"frequency":3800,"file":"ref_sector_3800.msi"},
 {id:'algcom13',kind:'Setorial',gain:13,bands:['B28'],frequency:758,file:'ALGcom_BAS7001465DP_13dBi.msi',legacy:true},
 {id:'apx18',kind:'Setorial',gain:18,bands:['B28'],frequency:825,file:'APX651A18X.msi',legacy:true}
];
export const antennaReference=id=>antennaCatalog.find(a=>a.id===id);
export const antennaLabel=(a,band)=>`Antena ${a.kind} com ganho: ${a.gain.toLocaleString('pt-BR')} dBi - ${band}`;
export function antennaOptions(band,current){
 const available=antennaCatalog.filter(a=>a.bands.includes(band)&&(!a.legacy||a.id===current));
 return [...available.map(a=>[a.id,antennaLabel(a,band)]),['omni','Antena omnidirecional · ganho configurável']];
}

export function referenceSupports(reference,study){
 if(!reference||reference.legacy)return true;
 const ranges={B28:['LTE',758,803],B40:['LTE',2300,2400],B38:['LTE',2570,2620],n38:['NR',2570,2620],n78:['NR',3300,3800]};
 return reference.bands.some(b=>{const [technology,low,high]=ranges[b];return study.technology===technology&&study.frequency>=low&&study.frequency<=high;});
}
