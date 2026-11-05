import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultStudy,buildConfig} from '../lib/study.mjs';
import {applyBand,studyBand,channelWidths} from '../lib/radio-bands.mjs';
test('band changes reach the engine with appropriate duplex and frequency',()=>{
 for(const [id,technology,frequency,duplex] of [['B28','LTE',780,'FDD'],['B40','LTE',2350,'TDD'],['B38','LTE',2595,'TDD'],['n38','NR',2595,'TDD'],['n78','NR',3500,'TDD']]){
  const s=applyBand(defaultStudy,id),c=buildConfig(s,'D:/runner');
  assert.equal(studyBand(s).id,id);assert.equal(c.radio.technology,technology);assert.equal(c.radio.frequency_mhz,frequency);assert.equal(c.radio.duplex_mode,duplex);
  if(id==='n78'){assert.ok(c.defaults.antenna_file.endsWith('ref_sector_3500.msi'));assert.equal(c.defaults.antenna_gain_dbi,16.9);}else if(id!=='B28'){assert.ok(c.defaults.antenna_file.endsWith('ref_mid_sector12.msi'));assert.equal(c.defaults.antenna_gain_dbi,12);}
 }
});
test('switching 100 MHz n78 to n38 selects a channel that fits the band',()=>{
 const s=applyBand({...defaultStudy,technology:'NR',frequency:3500,bandwidth:100},'n38');
 assert.equal(s.bandwidth,20);assert.ok(channelWidths(s).every(w=>w<=40));buildConfig(s,'D:/runner');
 assert.ok(channelWidths({...s,frequency:3500,scs:15}).every(w=>w<=50));
});
test('legacy frequency is identified without rewriting its configuration',()=>{
 const s={...defaultStudy,frequency:758};assert.equal(studyBand(s).id,'B28');assert.equal(s.frequency,758);
});


test('band changes adapt each sector independently without resetting its power, height or losses',()=>{
 const input={...defaultStudy,sectors:[{...defaultStudy.sectors[0],antenna:'ref_low_sector12',power:5,height:10,cableLoss:.5},{...defaultStudy.sectors[1],antenna:'ref_low_sector18',power:40,height:25,cableLoss:2.5}]};
 const next=applyBand(input,'n78'),[a,b]=buildConfig(next,'D:/runner').sites[0].sectors;
 assert.ok(a.antenna_file.endsWith('ref_sector_3500.msi'));assert.ok(b.antenna_file.endsWith('ref_sector_3800.msi'));
 assert.equal(a.tx_power_w,5);assert.equal(b.tx_power_w,40);assert.equal(a.antenna_height_m,10);assert.equal(b.antenna_height_m,25);assert.equal(b.cable_loss_db,2.5);
 assert.equal(input.sectors[0].antenna,'ref_low_sector12');
});
