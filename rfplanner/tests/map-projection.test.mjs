import test from'node:test';
import assert from'node:assert/strict';
import{geographicRow}from'../lib/map-projection.mjs';
test('rows remain ordered inside the source image',()=>{const rows=Array.from({length:2001},(_,i)=>geographicRow(i,2001,-22.58,-22.21));assert.equal(rows[0],0);assert.equal(rows.at(-1),2000);for(let i=1;i<rows.length;i++)assert.ok(rows[i]>=rows[i-1]);});
test('Mercator preview reprojects latitude instead of treating rows as linear',()=>{assert.notEqual(geographicRow(500,1000,60,70),500);assert.equal(geographicRow(0,1,-1,1),0);});
