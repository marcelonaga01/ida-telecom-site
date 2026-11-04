export const leadRecipient='marcelo.nagashima@idatele.com';
export function leadMessage(lead,study,from){
 return {from,to:[leadRecipient],reply_to:lead.email,subject:`RFPlanner · solicitação de exportação · ${study.name.replace(/[\r\n\x00-\x1f]/g,' ').slice(0,150)}`,
 text:['Solicitação de exportação de cobertura — IDA Telecom','',`Nome: ${lead.name}`,`E-mail: ${lead.email}`,`Empresa: ${lead.company}`,`WhatsApp: ${lead.phone||'Não informado'}`,`Finalidade: ${lead.purpose}`,`Novidades e ofertas: ${lead.marketing?'Autorizadas':'Não autorizadas'}`,'Concordância com envio dos dados à IDA: confirmada (email-v1)','',`Estudo: ${study.name}`,`Identificador: ${study.id}`,`Criado em: ${new Date(study.created).toISOString()}`,'Parâmetros do estudo:',JSON.stringify(JSON.parse(study.request),null,2)].join('\n')};
}
export async function sendLeadEmail({apiKey,from,lead,study,user,fetcher=fetch}){
 if(!apiKey||!from)throw Object.assign(Error('O envio de e-mail ainda precisa ser configurado pelo administrador.'),{status:503});
 const message=leadMessage(lead,study,from);
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify([user,message])));
 const idempotency='rf-export-'+Array.from(new Uint8Array(digest),v=>v.toString(16).padStart(2,'0')).join('');
 let response;
 try{response=await fetcher('https://api.resend.com/emails',{method:'POST',redirect:'manual',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json','Idempotency-Key':idempotency},body:JSON.stringify(message),signal:AbortSignal.timeout(20000)});}catch{throw Object.assign(Error('Não foi possível confirmar o envio à IDA. Tente novamente.'),{status:502});}
 if(!response.ok){await response.body?.cancel();throw Object.assign(Error(response.status===429?'O serviço de e-mail está ocupado. Aguarde e tente novamente.':'O serviço recusou o envio à IDA. Confira a configuração do remetente e da chave.'),{status:502});}
 let result;try{result=await response.json();}catch{}
 if(typeof result?.id!=='string'||!result.id)throw Object.assign(Error('O serviço de e-mail não confirmou o envio. Tente novamente.'),{status:502});
}
