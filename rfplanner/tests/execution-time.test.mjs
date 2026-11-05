import test from 'node:test';
import assert from 'node:assert/strict';
import {executionTime} from '../lib/execution-time.mjs';
const study={radius:20,resolution:20,sectors:[{},{}]};
test('estimates approximate observed two-sector timings by grid size',()=>{
 assert.equal(executionTime(study,50),'cerca de 4 min');
 assert.equal(executionTime(study,30),'cerca de 9 min');
 assert.equal(executionTime(study,20),'cerca de 20 min');
 assert.equal(executionTime({...study,radius:10},50),'cerca de 2 min');
 assert.equal(executionTime({...study,sectors:[{},{},{},{}]},50),'cerca de 7 min');
});
test('incomplete form values do not display invalid estimates',()=>{
 for(const radius of ['',NaN,0,-2])assert.equal(executionTime({...study,radius}),'tempo a estimar');
});


test('5 m estimates use the measured dense-profile benchmark',()=>{
 assert.equal(executionTime({...study,sampling:5},150),'cerca de 3 min');
 assert.equal(executionTime({...study,sampling:5},50),'cerca de 14 min');
 assert.equal(executionTime({...study,sampling:5},20),'cerca de 85 min');
});
