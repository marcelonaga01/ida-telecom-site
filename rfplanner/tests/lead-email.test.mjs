import test from'node:test';
import assert from'node:assert/strict';
import{sendLeadEmail,leadRecipient}from'../lib/lead-email.mjs';
import{createExportToken,verifyExportToken,exportLifetime}from'../lib/export-token.mjs';
const lead={name:'Teste de integração',email:'test@example.com',company:'Empresa teste',phone:'',purpose:'Estudo preliminar',marketing:false,to:'attacker@example.com'};
const study={id:'study-test',name:'Cobertura\r\nteste',created:1700000000000,request:JSON.stringify({terrain:'AW3D30',radiusKm:20})};
test('notification uses fixed IDA recipient, visitor reply-to, preferences and study parameters',async()=>{
 const calls=[];
 for(let i=0;i<2;i++)await sendLeadEmail({apiKey:'test-key',from:'Test <onboarding@resend.dev>',lead,study,user:'owner',fetcher:async(url,init)=>{calls.push({url,init});return Response.json({id:'accepted-id'});}});
 const payload=JSON.parse(calls[0].init.body);assert.deepEqual(payload.to,[leadRecipient]);assert.equal(payload.reply_to,lead.email);assert.match(payload.text,/Não autorizadas/);assert.match(payload.text,/AW3D30/);assert.doesNotMatch(payload.subject,/[\r\n]/);assert.equal(calls[0].init.headers['Idempotency-Key'],calls[1].init.headers['Idempotency-Key']);assert.equal(calls[0].init.redirect,'manual');
});
test('provider rejection, timeout and missing configuration fail closed',async()=>{
 for(const fetcher of [async()=>new Response('',{status:401}),async()=>new Response('',{status:429}),async()=>{throw Error('timeout');},async()=>Response.json({})])await assert.rejects(sendLeadEmail({apiKey:'test-key',from:'test@example.com',lead,study,user:'owner',fetcher}),{status:502});
 await assert.rejects(sendLeadEmail({apiKey:'',from:'',lead,study,user:'owner'}),{status:503});
});
test('export token binds identity, expires, rejects tampering and contains no contact data',async()=>{
 const secret='a'.repeat(64),now=1700000000000,token=await createExportToken('owner-a',secret,now);
 assert.equal(await verifyExportToken(token,'owner-a',secret,now),true);
 assert.equal(await verifyExportToken(token,'owner-b',secret,now),false);
 assert.equal(await verifyExportToken(token,'owner-a','b'.repeat(64),now),false);
 assert.equal(await verifyExportToken(token,'owner-a',secret,now+exportLifetime*1000),false);
 assert.equal(await verifyExportToken(token.slice(0,-1)+(token.endsWith('0')?'1':'0'),'owner-a',secret,now),false);
 assert.equal(await verifyExportToken('bad','owner-a',secret,now),false);
 assert.doesNotMatch(token,/owner-a|@|example|Teste/);
});
