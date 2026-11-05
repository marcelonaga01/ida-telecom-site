import test from 'node:test';
import assert from 'node:assert/strict';
import {newStudyDraft,newSectorDraft} from '../lib/study-draft.mjs';
import {validateStudy,buildConfig} from '../lib/study.mjs';

function completed(){
 const s=newStudyDraft();Object.assign(s,{name:'Projeto do cliente',latitude:-22.4,longitude:-45.5});
 Object.assign(s.sectors[0],{name:'Norte',azimuth:0,power:10,height:15,electricalTilt:0,mechanicalTilt:0});
 return s;
}
test('new study starts with one empty sector, blank project/location and zero losses',()=>{
 const s=newStudyDraft();for(const key of ['name','latitude','longitude'])assert.equal(s[key],'');
 assert.equal(s.sectors.length,1);
 for(const key of ['name','azimuth','power','height','electricalTilt','mechanicalTilt'])assert.equal(s.sectors[0][key],'');
 assert.equal(s.sectors[0].insertionLoss,0);assert.equal(s.sectors[0].cableLoss,0);
 assert.throws(()=>validateStudy(s));
 const a=completed(),b=newStudyDraft();assert.equal(b.sectors[0].power,'');assert.equal(a.sectors[0].power,10);
});
test('new sectors do not copy project-specific values from a completed sector',()=>{
 const s=completed(),sector=newSectorDraft(s);
 for(const key of ['name','azimuth','power','height','electricalTilt','mechanicalTilt'])assert.equal(sector[key],'');
 assert.equal(sector.antenna,s.sectors[0].antenna);assert.equal(sector.insertionLoss,0);assert.equal(sector.cableLoss,0);
});
test('each required blank is rejected, while a true zero azimuth and tilt are accepted',()=>{
 const full=completed();assert.doesNotThrow(()=>validateStudy(full));
 for(const key of ['name','latitude','longitude'])assert.throws(()=>validateStudy({...full,[key]:''}));
 for(const key of ['name','azimuth','power','height','electricalTilt','mechanicalTilt']){
  const s=completed();s.sectors[0][key]='';assert.throws(()=>validateStudy(s));
 }
 const c=buildConfig(full,'/runner');assert.equal(c.sites[0].sectors[0].azimuth,0);
 assert.equal(c.sites[0].sectors[0].tx_power_w,10);assert.equal(c.sites[0].sectors[0].cable_loss_db,0);
});
test('MapBiomas is fixed and agricultural mosaic uses rural height in the native request',()=>{
 const s=completed();Object.assign(s,{landcoverSource:'WORLDCOVER',clutterOpenRural:3.5,clutterMosaicAgriculture:19});
 const normalized=validateStudy(s),config=buildConfig(normalized,'/runner');
 assert.equal(normalized.landcoverSource,'MAPBIOMAS');assert.equal(normalized.clutterMosaicAgriculture,3.5);
 assert.equal(config.terrain.landcover_source,'MAPBIOMAS');assert.equal(config.clutter.mosaic_agriculture_m,3.5);
 assert.equal(config.clutter.open_rural_m,3.5);assert.equal(s.clutterMosaicAgriculture,19);
});
