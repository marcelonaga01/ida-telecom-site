import test from 'node:test';
import assert from 'node:assert/strict';
import {githubRequest} from '../lib/github-http.mjs';
const url='https://api.github.com/repos/test/rf/actions/workflows/web-coverage.yml/dispatches';
function setup(sequence){
 const calls=[],logs=[],delays=[];
 const options={log:r=>logs.push(r),wait:async ms=>delays.push(ms),fetcher:async(...args)=>{calls.push(args);const next=sequence.shift();if(next instanceof Error)throw next;assert.ok(next,'unexpected extra request');return next;}};
 return {calls,logs,delays,run:(init={})=>githubRequest(url,init,options)};
}
test('dispatch success is sent once',async()=>{
 const s=setup([new Response(null,{status:204})]);assert.equal((await s.run({method:'POST'})).status,204);assert.equal(s.calls.length,1);
});
test('reads recover from a transient GitHub outage',async()=>{
 const s=setup([new Response('unavailable',{status:503}),new Response('{}')]);assert.equal((await s.run()).status,200);assert.equal(s.calls.length,2);assert.deepEqual(s.delays,[500]);
});
test('reads recover from a network interruption with a bounded retry',async()=>{
 const s=setup([new TypeError('fetch failed'),new Response('{}')]);assert.equal((await s.run()).status,200);assert.equal(s.calls.length,2);
});
test('a lost POST response is ambiguous and must never be automatically resent',async()=>{
 const s=setup([new TypeError('fetch failed')]);await assert.rejects(s.run({method:'POST'}),e=>e.delivery==='unknown'&&e.code==='network_error');assert.equal(s.calls.length,1);
});
test('a 5xx POST response is also ambiguous, even with Retry-After',async()=>{
 const s=setup([new Response('upstream failure',{status:502,headers:{'retry-after':'1','x-github-request-id':'ABCD:1234'}})]);
 await assert.rejects(s.run({method:'POST'}),e=>e.delivery==='unknown'&&e.upstreamStatus===502&&e.requestId==='ABCD:1234');assert.equal(s.calls.length,1);
});
test('a definite GitHub rejection retains the HTTP reason and allows safe user retry',async()=>{
 for(const status of [400,401,403,404,422,429]){
  const s=setup([new Response('private response',{status})]);await assert.rejects(s.run({method:'POST'}),e=>e.delivery==='rejected'&&e.upstreamStatus===status);assert.equal(s.calls.length,1);
 }
});
test('rate limits are distinguished from missing permissions and long waits are not retried',async()=>{
 const s=setup([new Response('',{status:403,headers:{'retry-after':'60','x-ratelimit-remaining':'0'}})]);
 await assert.rejects(s.run(),e=>e.code==='rate_limited'&&e.message.includes('limitou temporariamente'));assert.equal(s.calls.length,1);assert.equal(s.delays.length,0);
});
test('diagnostics cannot disclose credentials, request data or upstream response bodies',async()=>{
 const secret='SECRET-DO-NOT-LOG',s=setup([new Response(secret,{status:422,headers:{'x-github-request-id':'SAFE:123'}})]);
 await assert.rejects(s.run({method:'POST',headers:{Authorization:secret},body:secret}));assert.equal(JSON.stringify(s.logs).includes(secret),false);assert.equal(s.logs[0].requestId,'SAFE:123');
});
