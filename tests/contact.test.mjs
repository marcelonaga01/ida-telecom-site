import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {once} from 'node:events';

const root=new URL('../',import.meta.url);
const payload={name:'Teste técnico',email:'visitante@example.com',company:'Empresa teste',message:'Verificar envio e integração & retorno.',pageUrl:'http://localhost/#contato'};

test('contact API delivers all fields, rejects invalid data and never confirms provider failure',async()=>{
 let mode='ok';const messages=[];
 const emailServer=createServer(async(req,res)=>{
  let body='';for await(const chunk of req)body+=chunk;
  messages.push(JSON.parse(body));res.setHeader('Content-Type','application/json');
  if(mode==='reject'){res.writeHead(401);res.end('{}');}else res.end(JSON.stringify(mode==='missing-id'?{}:{id:'test-accepted'}));
 });
 emailServer.listen(0,'127.0.0.1');await once(emailServer,'listening');
 const reserve=createServer();reserve.listen(0,'127.0.0.1');await once(reserve,'listening');const port=reserve.address().port;await new Promise(resolve=>reserve.close(resolve));
 const child=spawn(process.execPath,['server.mjs'],{cwd:root,env:{...process.env,PORT:String(port),CONTACT_TO_EMAIL:'marcelo.nagashima@idatele.com',CONTACT_FROM_EMAIL:'IDA <onboarding@resend.dev>',EMAIL_API_KEY:'test-key',EMAIL_API_URL:`http://127.0.0.1:${emailServer.address().port}/emails`,CONTACT_DRY_RUN:'false',CONTACT_SIMULATE_EMAIL_FAILURE:'false'},stdio:['ignore','pipe','pipe']});
 try{
  await Promise.race([once(child.stdout,'data'),once(child,'exit').then(()=>{throw Error('Server exited');}),new Promise((_,reject)=>setTimeout(()=>reject(Error('Server startup timeout')),10000).unref())]);
  const post=data=>fetch(`http://127.0.0.1:${port}/api/contact`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  let response=await post({...payload,company:''});assert.equal(response.status,422);assert.equal(messages.length,0);
  response=await post({...payload,email:'invalid'});assert.equal(response.status,422);assert.equal(messages.length,0);
  response=await post(payload);assert.equal(response.status,200);assert.equal((await response.json()).ok,true);
  assert.deepEqual(messages[0].to,['marcelo.nagashima@idatele.com']);assert.equal(messages[0].reply_to,payload.email);
  for(const value of [payload.name,payload.email,payload.company,payload.message])assert.ok(messages[0].text.includes(value));
  assert.match(messages[0].html,/&amp;/);
  mode='reject';response=await post(payload);assert.equal(response.status,502);assert.equal((await response.json()).ok,false);
  mode='missing-id';response=await post(payload);assert.equal(response.status,502);assert.equal((await response.json()).ok,false);
  for(const path of ['/.env.local','/rfplanner/.env','/serve.cjs','/.git/config'])assert.equal((await fetch(`http://127.0.0.1:${port}${path}`)).status,404);
 }finally{
  child.kill();await new Promise(resolve=>emailServer.close(resolve));
 }
});
