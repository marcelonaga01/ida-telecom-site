import test from 'node:test';
import assert from 'node:assert/strict';
import {validateLandcoverCoverage} from '../lib/landcover-coverage.mjs';
import {defaultStudy} from '../lib/study.mjs';
test('Campinas can reach the worker for automatic map acquisition',()=>{
 assert.doesNotThrow(()=>validateLandcoverCoverage(defaultStudy));
 assert.doesNotThrow(()=>validateLandcoverCoverage({...defaultStudy,latitude:-22.904111,longitude:-47.057542,radius:20}));
});
test('unsupported MapBiomas years are rejected before dispatch',()=>{
 assert.throws(()=>validateLandcoverCoverage({...defaultStudy,landcoverYear:2000}),/Ano MapBiomas/);
 assert.doesNotThrow(()=>validateLandcoverCoverage({...defaultStudy,clutter:false,landcoverYear:2000}));
});
