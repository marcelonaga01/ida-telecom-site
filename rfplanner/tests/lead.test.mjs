import test from'node:test';
import assert from'node:assert/strict';
import{validateLead}from'../lib/lead.mjs';
const form={name:'Contato de teste',email:' TESTE@EXAMPLE.COM ',company:'Empresa teste',phone:'+55 (11) 99999-9999',purpose:'Estudo preliminar',accepted:true,marketing:false};
test('accepts export with required WhatsApp and marketing declined',()=>{const lead=validateLead(form);assert.equal(lead.email,'teste@example.com');assert.equal(lead.phone,'+55 (11) 99999-9999');assert.equal(lead.marketing,false);});
test('requires a separate explicit data-use acknowledgment',()=>{for(const accepted of [false,'true',undefined])assert.throws(()=>validateLead({...form,accepted}));});
test('rejects malformed or oversized contact fields',()=>{for(const patch of [{name:''},{email:'wrong'},{company:'x'},{phone:'<script>'},{purpose:'invalid'},{name:'x'.repeat(101)},{marketing:'true'}])assert.throws(()=>validateLead({...form,...patch}));});

test('requires WhatsApp with actual digits',()=>{for(const phone of ['', '   ',undefined,'--------','(11) 123','1'.repeat(16)])assert.throws(()=>validateLead({...form,phone}));});
