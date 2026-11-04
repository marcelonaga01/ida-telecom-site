import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultStudy,buildConfig} from '../lib/study.mjs';
import {mimoModes,selectedMimo,applyMimo} from '../lib/mimo.mjs';
test('MIMO presets set maximum rate layers without adding coverage gain or power',()=>{
 for(const mode of mimoModes){
  const s=applyMimo({...defaultStudy,mimoGain:7},mode.id),c=buildConfig(s,'D:/runner');
  assert.equal(selectedMimo(s).id,mode.id);
  assert.equal(c.radio_system.downlink_receiver.throughput_multiplier,mode.layers);
  assert.equal(c.radio_system.downlink_receiver.coverage_gain_db,0);
  assert.equal(c.defaults.tx_power_w,defaultStudy.power);
  assert.equal(c.simulation.rx_gain_dbi,defaultStudy.receiverGain);
 }
});
test('legacy custom MIMO settings remain distinguishable and unchanged until selected',()=>{
 const s={...defaultStudy,mimoGain:3,mimoMultiplier:2};
 assert.equal(selectedMimo(s),undefined);assert.equal(s.mimoGain,3);
 assert.equal(selectedMimo({...s,mimoGain:0,mimoMultiplier:1.5}),undefined);
 assert.throws(()=>applyMimo(s,'unknown'));
});


test('MIMO is emitted independently per sector and copied when adding a sector',async()=>{
 const {sectorValues,copyNextSector}=await import('../lib/sector-settings.mjs');
 const study={...defaultStudy,sectors:[applyMimo(sectorValues(defaultStudy,defaultStudy.sectors[0]),'2x2'),applyMimo(sectorValues(defaultStudy,defaultStudy.sectors[1]),'4x4')]};
 const c=buildConfig(study,'D:/runner');
 assert.deepEqual(c.sites[0].sectors.map(s=>s.mimo_throughput_multiplier),[2,4]);
 assert.deepEqual(c.sites[0].sectors.map(s=>s.mimo_coverage_gain_db),[0,0]);
 assert.equal(copyNextSector(study).mimoMultiplier,4);
 assert.throws(()=>buildConfig({...study,sectors:[{...study.sectors[0],mimoMultiplier:0}]},'D:/runner'));
 assert.throws(()=>buildConfig({...study,sectors:[{...study.sectors[0],mimoGain:41}]},'D:/runner'));
 const legacy=buildConfig({...defaultStudy,mimoGain:3,mimoMultiplier:2},'D:/runner');
 assert.ok(legacy.sites[0].sectors.every(s=>s.mimo_coverage_gain_db===3&&s.mimo_throughput_multiplier===2));
});
