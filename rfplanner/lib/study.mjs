import{sectorValues,sectorFields}from'./sector-settings.mjs';
import{antennaCatalog,antennaReference,referenceSupports}from'./antenna-catalog.mjs';
export const defaultStudy = {
  name:'Itajubá · estudo de cobertura',latitude:-22.397584,longitude:-45.509247,
  radius:20,resolution:20,technology:'LTE',frequency:780,bandwidth:5,scs:30,duplex:'FDD',
  power:20,height:12,antenna:'algcom13',gain:13,insertionLoss:4.6,cableLoss:0.7065,
  receiverHeight:1.5,receiverGain:0,receiverLoss:0,threshold:-107,opacity:45,
  terrain:'AW3D30',landcoverSource:'MAPBIOMAS',landcoverYear:2025,sampling:5,time:50,location:50,fadeMargin:0,confidenceMargin:0,
  clutterWater:0,clutterOpenRural:0,clutterMosaicAgriculture:0,clutterSuburban:15,clutterUrbanForest:15,clutterDenseUrban:20,
  clutter:true,nearSite:true,combination:'strongest_cell',noiseFigure:6,mimoGain:0,mimoMultiplier:1,
  interferenceReduction:0,adjacentRejection:0,cochannel:false,adjacent:false,
  sectors:[{name:'A95',azimuth:95,electricalTilt:2,mechanicalTilt:0},{name:'A174',azimuth:174,electricalTilt:2,mechanicalTilt:0}]
};
export function validateStudy(input){
  if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Informe os dados do estudo.');
  const unknown=Object.keys(input).filter(k=>!Object.hasOwn(defaultStudy,k));if(unknown.length)throw Error('Campo desconhecido: '+unknown[0]);
  const s=structuredClone({...defaultStudy,...input});
  const ranges={clutterWater:[0,100],clutterOpenRural:[0,100],clutterMosaicAgriculture:[0,100],clutterSuburban:[0,100],clutterUrbanForest:[0,100],clutterDenseUrban:[0,100],latitude:[-88,88],longitude:[-179,179],radius:[.5,30],frequency:[30,6000],power:[.001,1000000],height:[1,3000],gain:[-50,60],insertionLoss:[0,100],cableLoss:[0,100],receiverHeight:[1,3000],receiverGain:[-50,60],receiverLoss:[0,100],threshold:[-200,0],opacity:[0,100],sampling:[5,1000],time:[1,50],location:[1,99],fadeMargin:[0,100],confidenceMargin:[0,100],noiseFigure:[0,50],mimoGain:[0,40],mimoMultiplier:[.01,64],interferenceReduction:[0,100],adjacentRejection:[0,150]};
  for(const [key,[lo,hi]] of Object.entries(ranges))if(typeof s[key]!=='number'||!Number.isFinite(s[key])||s[key]<lo||s[key]>hi)throw Error(`Valor inválido: ${{clutterWater:"altura de clutter em água",clutterOpenRural:"altura de clutter em área aberta/rural",clutterMosaicAgriculture:"altura de clutter em mosaico agropecuário",clutterSuburban:"altura de clutter suburbano",clutterUrbanForest:"altura de clutter urbano/floresta",clutterDenseUrban:"altura de clutter urbano denso",time:"tempo",location:"localização",radius:"raio",frequency:"frequência",power:"potência",height:"altura",latitude:"latitude",longitude:"longitude"}[key]||key} (${lo} a ${hi}).`);
  const enums={resolution:[10,20,30,50,150],technology:['LTE','NR'],duplex:['FDD','TDD'],terrain:['AW3D30','COP30'],landcoverSource:['MAPBIOMAS','WORLDCOVER'],landcoverYear:[2025],antenna:[...antennaCatalog.map(a=>a.id),'omni'],combination:['same_cell','strongest_cell'],scs:[15,30,60]};
  for(const [key,values]of Object.entries(enums))if(!values.includes(s[key]))throw Error('Opção inválida: '+key);
  if(!referenceSupports(antennaReference(s.antenna),s))throw Error('O diagrama de referência não está cadastrado para esta banda.');
  for(const key of ['clutter','nearSite','cochannel','adjacent'])if(typeof s[key]!=='boolean')throw Error('Opção inválida: '+key);
  if(typeof s.name!=='string'||s.name.trim().length<1||s.name.length>100||/[\x00-\x1f<>]/.test(s.name))throw Error('Informe um nome de até 100 caracteres.');
  s.name=s.name.trim();
  const nr={15:{5:25,10:52,15:79,20:106,25:133,30:160,40:216,50:270},30:{5:11,10:24,15:38,20:51,25:65,30:78,40:106,50:133,60:162,70:189,80:217,90:245,100:273},60:{10:11,15:18,20:24,25:31,30:38,40:51,50:65,60:79,70:93,80:107,90:121,100:135}};
  if(typeof s.bandwidth!=='number'||(s.technology==='LTE'?![1.4,3,5,10,15,20].includes(s.bandwidth):!nr[s.scs][s.bandwidth]))throw Error('Largura de banda/SCS incompatíveis com a tecnologia.');
  if(!Array.isArray(s.sectors)||s.sectors.length<1||s.sectors.length>8)throw Error('Use de 1 a 8 setores.');
  const names=new Set();for(const sector of s.sectors){
    if(!sector||Object.keys(sector).some(k=>!['name','azimuth','electricalTilt','mechanicalTilt',...sectorFields].includes(k)))throw Error('Setor inválido.');
    const resolved=sectorValues(s,sector);
    if(!enums.antenna.includes(resolved.antenna)||!referenceSupports(antennaReference(resolved.antenna),s))throw Error('Antena inválida ou incompatível no setor '+sector.name);
    for(const key of sectorFields.filter(k=>k!=='antenna')){const [lo,hi]=ranges[key];if(typeof resolved[key]!=='number'||!Number.isFinite(resolved[key])||resolved[key]<lo||resolved[key]>hi)throw Error('Valor inválido de '+key+' no setor '+sector.name);}
    if(typeof sector.name!=='string'||!/^[\p{L}\p{N} _.-]{1,40}$/u.test(sector.name)||names.has(sector.name))throw Error('Os setores precisam de nomes únicos.');names.add(sector.name);
    for(const [k,lo,hi]of [['azimuth',0,359.999],['electricalTilt',-90,90],['mechanicalTilt',-90,90]])if(typeof sector[k]!=='number'||!Number.isFinite(sector[k])||sector[k]<lo||sector[k]>hi)throw Error('Ângulo inválido no setor '+sector.name);
  }
  if((2*Math.ceil(s.radius*1000/s.resolution)+1)**2>25000000)throw Error('A grade ultrapassa 25 milhões de pontos. Aumente a resolução em metros ou reduza o raio.');
  const dlat=s.radius/111,dlon=dlat/Math.cos(s.latitude*Math.PI/180);if(s.latitude-dlat<=-90||s.latitude+dlat>=90||s.longitude-dlon< -180||s.longitude+dlon>180)throw Error('A área do estudo cruza um polo ou o antimeridiano.');
  return s;
}
export function buildConfig(input,root){
  const s=validateStudy(input),join=p=>root.replaceAll('\\','/').replace(/\/$/,'')+'/'+p;
  const antennaConfig=a=>{const reference=antennaReference(a.antenna);return {mimo_coverage_gain_db:a.mimoGain,mimo_throughput_multiplier:a.mimoMultiplier,tx_power_w:a.power,insertion_loss_db:a.insertionLoss,cable_loss_db:a.cableLoss,antenna_height_m:a.height,antenna_mode:a.antenna==='omni'?'omni':'msi',antenna_gain_dbi:reference?reference.gain:a.gain,...(reference?{antenna_file:join((reference.legacy?'data/cloud-runtime/antennas/':'web/antennas/')+reference.file)}:{})};};
  return {
    project_name:s.name,combination:s.combination,
    engine:{library_path:join('data/cloud-runtime/engine/crc-covlib.dll'),itu_data_dir:join('data/ITU')},
    terrain:{dem_dir:join('data/DEM/'+s.terrain),dem_type:s.terrain,...(s.landcoverSource==='MAPBIOMAS'?{landcover_source:'MAPBIOMAS',landcover_year:s.landcoverYear,mapbiomas_dir:join('outputs/web/landcover/'+s.landcoverYear)}:{landcover_source:'WORLDCOVER',worldcover_dir:join('data/WORLDCOVER')}),download_missing:true},
    output_dir:join('outputs/web/results'),radio:{technology:s.technology,duplex_mode:s.duplex,frequency_mhz:s.frequency,bandwidth_mhz:s.bandwidth,...(s.technology==='NR'?{subcarrier_spacing_khz:s.scs}:{})},
    simulation:{radius_km:s.radius,nx:2*Math.ceil(s.radius*1000/s.resolution)+1,ny:2*Math.ceil(s.radius*1000/s.resolution)+1,workers:0,terrain_sampling_m:s.sampling,rx_height_m:s.receiverHeight,rx_gain_dbi:s.receiverGain,rx_loss_db:s.receiverLoss,min_distance_km:s.nearSite?.01:.25,allow_short_range_extrapolation:s.nearSite,rsrp_min_dbm:s.threshold,map_opacity:s.opacity/100},
    defaults:antennaConfig(s),
    sites:[{name:s.name,lat:s.latitude,lon:s.longitude,sectors:s.sectors.map(a=>({...antennaConfig(sectorValues(s,a)),name:a.name,azimuth:a.azimuth,electrical_tilt:a.electricalTilt,mechanical_tilt:a.mechanicalTilt}))}],
    p1812:{time_percent:s.time,location_percent:s.location},clutter:{enabled:s.clutter,mapping:'category',water_m:s.clutterWater,open_rural_m:s.clutterOpenRural,mosaic_agriculture_m:s.clutterMosaicAgriculture,suburban_m:s.clutterSuburban,urban_forest_m:s.clutterUrbanForest,dense_urban_m:s.clutterDenseUrban},calibration_loss_db:0,
    radio_system:{fade_margin_db:s.fadeMargin,confidence_margin_db:s.confidenceMargin,cochannel_interference:s.cochannel,adjacent_channel_interference:s.adjacent,downlink_receiver:{noise_figure_db:s.noiseFigure,coverage_gain_db:s.mimoGain,throughput_multiplier:s.mimoMultiplier,interference_reduction_db:s.interferenceReduction,adjacent_channel_rejection_db:s.adjacentRejection}}
  };
}
