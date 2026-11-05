import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultStudy,validateStudy,buildConfig} from '../lib/study.mjs';
import {sectorValues,copyNextSector} from '../lib/sector-settings.mjs';
const root='D:/runner';
test('separate sector radios reach the native configuration without cross-sector changes',()=>{
 const input={...defaultStudy,sectors:[{name:'Norte',azimuth:0,electricalTilt:1,mechanicalTilt:2,antenna:'ref_low_sector12',gain:12,power:5,height:10,insertionLoss:1,cableLoss:.5},{name:'Sul',azimuth:180,electricalTilt:3,mechanicalTilt:4,antenna:'ref_low_sector18',gain:18,power:40,height:25,insertionLoss:2,cableLoss:2.5}]};
 const [a,b]=buildConfig(input,root).sites[0].sectors;
 assert.equal(a.tx_power_w,5);assert.equal(b.tx_power_w,40);assert.equal(a.antenna_height_m,10);assert.equal(b.antenna_height_m,25);
 assert.ok(a.antenna_file.endsWith('ref_low_sector12.msi'));assert.ok(b.antenna_file.endsWith('ref_low_sector18.msi'));
 assert.equal(a.antenna_gain_dbi,12);assert.equal(b.antenna_gain_dbi,18);assert.equal(a.cable_loss_db,.5);assert.equal(b.cable_loss_db,2.5);assert.equal(b.electrical_tilt,3);
 const mixed=structuredClone(input);mixed.sectors[1].antenna='omni';mixed.sectors[1].gain=7;const c=buildConfig(mixed,root).sites[0].sectors[1];assert.equal(c.antenna_mode,'omni');assert.equal(c.antenna_file,undefined);assert.equal(c.antenna_gain_dbi,7);
 assert.equal(input.sectors[0].power,5);
});
test('old studies retain their original study-wide physical parameters in every sector',()=>{
 const c=buildConfig(defaultStudy,root);
 for(const s of c.sites[0].sectors)for(const key of Object.keys(c.defaults))assert.deepEqual(s[key],c.defaults[key]);
 assert.ok(!Object.hasOwn(defaultStudy.sectors[0],'antenna'));
});
test('invalid independent sector parameters and paths are rejected',()=>{
 for(const patch of [{power:-1},{height:0},{gain:NaN},{cableLoss:101},{insertionLoss:'3'},{antenna:'../../private.msi'},{antenna_file:'bad.msi'},{antenna:'ref_sector_3500'}]){
  assert.throws(()=>validateStudy({...defaultStudy,sectors:[{...defaultStudy.sectors[0],...patch}]}));
 }
});
test('new sectors copy the previous radio settings with unique name and independent values',()=>{
 const study={...defaultStudy,sectors:[{...defaultStudy.sectors[0],name:'Setor 3',antenna:'ref_low_sector18',power:7},{...defaultStudy.sectors[1],name:'Setor 2',antenna:'ref_low_omni8',power:11}]};
 const copy=copyNextSector(study);assert.equal(copy.name,'Setor 4');assert.equal(copy.power,11);assert.equal(copy.antenna,'ref_low_omni8');assert.equal(copy.height,defaultStudy.height);copy.power=99;assert.equal(study.sectors[1].power,11);
 assert.equal(sectorValues(defaultStudy,defaultStudy.sectors[0]).power,20);
});
