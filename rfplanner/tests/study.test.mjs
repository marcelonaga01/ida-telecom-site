import test from'node:test';
import assert from'node:assert/strict';
import{defaultStudy,validateStudy,buildConfig}from'../lib/study.mjs';
test('reference uses two sectors and 50/50 percentages',()=>{
 const c=buildConfig(defaultStudy,'D:/runner');assert.equal(c.p1812.time_percent,50);assert.equal(c.p1812.location_percent,50);assert.deepEqual(c.sites[0].sectors.map(a=>a.azimuth),[95,174]);assert.equal(c.radio_system.fade_margin_db,0);assert.equal(c.defaults.tx_power_w,20);assert.equal(c.simulation.nx,2001);
});
test('server owns all filesystem paths',()=>{
 assert.throws(()=>validateStudy({...defaultStudy,engine:{library_path:'bad.dll'}}));
 assert.throws(()=>validateStudy({...defaultStudy,output_dir:'bad'}));
 const c=buildConfig({...defaultStudy,name:'Estudo "$()"'},'D:/runner');assert.equal(c.output_dir,'D:/runner/outputs/web/results');assert.equal(c.defaults.antenna_file,'D:/runner/data/cloud-runtime/antennas/ALGcom_BAS7001465DP_13dBi.msi');
});
test('numerical and grid limits reject malformed requests',()=>{
 for(const patch of [{latitude:'-22'},{radius:31},{resolution:1},{power:-1},{time:86},{location:0},{latitude:NaN},{clutter:'true'},{radius:30,resolution:10}])assert.throws(()=>validateStudy({...defaultStudy,...patch}));
});
test('sectors require valid names and angles',()=>{
 assert.throws(()=>validateStudy({...defaultStudy,sectors:[]}));
 assert.throws(()=>validateStudy({...defaultStudy,sectors:[{name:'A',azimuth:360,electricalTilt:0,mechanicalTilt:0}]}));
 assert.throws(()=>validateStudy({...defaultStudy,sectors:[defaultStudy.sectors[0],defaultStudy.sectors[0]]}));
 const c=buildConfig({...defaultStudy,sectors:[{name:'Norte',azimuth:0,electricalTilt:3,mechanicalTilt:1}]},'/runner');assert.equal(c.sites[0].sectors[0].electrical_tilt,3);
});
test('NR resource combinations and omnidirectional gains',()=>{
 assert.throws(()=>validateStudy({...defaultStudy,technology:'NR',scs:15,bandwidth:100}));
 const c=buildConfig({...defaultStudy,technology:'NR',frequency:3500,scs:30,bandwidth:100,antenna:'omni',gain:8},'/runner');assert.equal(c.radio.subcarrier_spacing_khz,30);assert.equal(c.defaults.antenna_gain_dbi,8);assert.equal(c.defaults.antenna_file,undefined);assert.equal(c.radio.band,undefined);
});

test('legacy studies retain previous clutter heights',()=>{
 const legacy=structuredClone(defaultStudy);for(const key of ['clutterWater','clutterOpenRural','clutterMosaicAgriculture','clutterSuburban','clutterUrbanForest','clutterDenseUrban'])delete legacy[key];
 assert.deepEqual(buildConfig(legacy,'D:/runner').clutter,{enabled:true,mapping:'category',water_m:0,open_rural_m:0,mosaic_agriculture_m:0,suburban_m:15,urban_forest_m:15,dense_urban_m:20});
});
test('edited clutter heights reach the engine config and survive JSON round-trip',()=>{
 const study=validateStudy({...defaultStudy,clutterWater:1,clutterOpenRural:2.5,clutterSuburban:7,clutterUrbanForest:10,clutterDenseUrban:35});
 assert.deepEqual(buildConfig(JSON.parse(JSON.stringify(study)),'D:/runner').clutter,{enabled:true,mapping:'category',water_m:1,open_rural_m:2.5,mosaic_agriculture_m:2.5,suburban_m:7,urban_forest_m:10,dense_urban_m:35});
 assert.equal(buildConfig({...defaultStudy,clutterUrbanForest:0},'D:/runner').clutter.urban_forest_m,0);
 assert.equal(buildConfig({...defaultStudy,clutterDenseUrban:100},'D:/runner').clutter.dense_urban_m,100);
});
test('clutter height limits match the native engine',()=>{
 for(const key of ['clutterWater','clutterOpenRural','clutterMosaicAgriculture','clutterSuburban','clutterUrbanForest','clutterDenseUrban'])for(const value of [-.1,100.1,NaN,Infinity,'10',null])assert.throws(()=>validateStudy({...defaultStudy,[key]:value}));
});


test('new studies use 5 m terrain profiles while explicit legacy values remain readable',()=>{
 assert.equal(defaultStudy.sampling,5);assert.equal(buildConfig(defaultStudy,'D:/runner').simulation.terrain_sampling_m,5);
 assert.equal(buildConfig({...defaultStudy,sampling:30},'D:/runner').simulation.terrain_sampling_m,30);
});

test('new studies use a -107 dBm planning cutoff',()=>{assert.equal(defaultStudy.threshold,-107);assert.equal(buildConfig(defaultStudy,'D:/runner').simulation.rsrp_min_dbm,-107);});
test('web calculations select automatic native workers without changing grid or profile sampling',()=>{const s=buildConfig(defaultStudy,'D:/runner').simulation;assert.equal(s.workers,0);assert.equal(s.terrain_sampling_m,5);assert.equal(s.nx,2*Math.ceil(defaultStudy.radius*1000/defaultStudy.resolution)+1);});


test('propagation margins and clutter accept zero and reject negative values on the server',()=>{
 for(const key of ['fadeMargin','confidenceMargin','clutterWater','clutterOpenRural','clutterMosaicAgriculture','clutterSuburban','clutterUrbanForest','clutterDenseUrban']){
  assert.equal(validateStudy({...defaultStudy,[key]:0})[key],0);
  assert.throws(()=>validateStudy({...defaultStudy,[key]:-.1}));
 }
});

test('agricultural mosaic follows open/rural height even for an explicit previous value',()=>{
 const legacy=structuredClone(defaultStudy);delete legacy.clutterMosaicAgriculture;
 assert.equal(buildConfig(legacy,'D:/runner').clutter.mosaic_agriculture_m,0);
 const s=JSON.parse(JSON.stringify({...defaultStudy,clutterOpenRural:4,clutterMosaicAgriculture:2.5,clutterSuburban:17,clutterUrbanForest:23}));
 const c=buildConfig(s,'D:/runner');
 assert.equal(c.clutter.mosaic_agriculture_m,4);
 assert.equal(c.clutter.suburban_m,17);assert.equal(c.clutter.urban_forest_m,23);
});
