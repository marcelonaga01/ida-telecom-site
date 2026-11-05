import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultStudy,buildConfig} from '../lib/study.mjs';
import {antennaCatalog,antennaOptions} from '../lib/antenna-catalog.mjs';
import {applyBand} from '../lib/radio-bands.mjs';
test('all sixteen supplied references map to fixed server files and header gains',()=>{
 const references=antennaCatalog.filter(a=>!a.legacy);assert.equal(references.length,16);
 for(const a of references){
  const band=a.bands[0],s={...applyBand(defaultStudy,band),antenna:a.id},c=buildConfig(s,'D:/runner');
  assert.equal(c.defaults.antenna_mode,'msi');assert.equal(c.defaults.antenna_gain_dbi,a.gain);assert.equal(c.defaults.antenna_file,'D:/runner/web/antennas/'+a.file);
 }
});
test('selection shows gain and band, without make or model; n78 has its own references',()=>{
 const b28=antennaOptions('B28','ref_low_sector18');assert.ok(b28.some(([id,label])=>id==='ref_low_sector18'&&label==='Antena Setorial com ganho: 18 dBi - B28'));
 for(const band of ['B28','B40','B38','n38','n78'])for(const [,label]of antennaOptions(band,''))assert.doesNotMatch(label,/APX|ALGcom|AOX|IDEAL/i);
 assert.ok(antennaOptions('n78','').some(([id,label])=>id==='ref_sector_3500'&&label==='Antena Setorial com ganho: 16,9 dBi - n78'));assert.ok(antennaOptions('n78','').some(([id])=>id==='ref_sector_3800'));assert.equal(antennaOptions('n78','').length,3);
});
test('changing band keeps equivalent reference gain and rejects unsupported n78 reference',()=>{
 const s=applyBand({...defaultStudy,antenna:'ref_low_sector18'},'B40');assert.equal(s.antenna,'ref_mid_sector18');
 assert.equal(applyBand(s,'B38').antenna,'ref_mid_sector18');assert.equal(applyBand(s,'n78').antenna,'ref_sector_3800');
 assert.throws(()=>buildConfig({...s,technology:'NR',frequency:3500,bandwidth:100},'D:/runner'));
});
