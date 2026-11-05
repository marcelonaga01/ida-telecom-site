import test from 'node:test';
import assert from 'node:assert/strict';
import {validateLandcoverCoverage,installedLandcover} from '../lib/landcover-coverage.mjs';
import {defaultStudy} from '../lib/study.mjs';

test('installed MapBiomas accepts Itajuba and rejects the full Campinas study before dispatch',()=>{
 assert.doesNotThrow(()=>validateLandcoverCoverage(defaultStudy));
 const campinas={...defaultStudy,latitude:-22.904111,longitude:-47.057542,radius:20};
 assert.throws(()=>validateLandcoverCoverage(campinas),/MapBiomas.*não cobre/);
 assert.equal(campinas.landcoverSource,'MAPBIOMAS');assert.equal(campinas.longitude,-47.057542);
});
test('a radius extending outside the installed data is rejected even when its center is inside',()=>{
 assert.throws(()=>validateLandcoverCoverage({...defaultStudy,longitude:installedLandcover[0].bounds[0]+.02}),/todo o raio/);
});
test('neighboring sources can jointly cover the area but gaps are not treated as coverage',()=>{
 const study={...defaultStudy,latitude:0,longitude:0,radius:.5};
 const tile=bounds=>({year:2025,collection:4,bounds});
 assert.doesNotThrow(()=>validateLandcoverCoverage(study,[tile([-.01,-.01,0,.01]),tile([0,-.01,.01,.01])]));
 assert.throws(()=>validateLandcoverCoverage(study,[tile([-.01,-.01,-.002,.01]),tile([.002,-.01,.01,.01])]));
 assert.doesNotThrow(()=>validateLandcoverCoverage({...study,clutter:false},[]));
});
