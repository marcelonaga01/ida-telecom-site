export const purposes=['Provedor de internet','Rede privativa','Câmeras e monitoramento','Estudo preliminar','Outro'];
export function validateLead(input){
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Preencha seus dados de contato.');
 const field=(key,min,max)=>{if(typeof input[key]!=='string')throw Error('Campo inválido: '+key);const value=input[key].trim();if(value.length<min||value.length>max||/[\x00-\x1f<>]/.test(value))throw Error('Confira o campo '+key+'.');return value;};
 const name=field('name',2,100),email=field('email',5,254).toLowerCase(),company=field('company',2,150),phone=field('phone',0,30);
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error('Informe um e-mail válido.');if(!phone)throw Error('Informe seu WhatsApp.');if(!/^[+\d\s().-]{8,30}$/.test(phone)||phone.replace(/\D/g,'').length<8||phone.replace(/\D/g,'').length>15)throw Error('Confira o WhatsApp informado.');
 if(!purposes.includes(input.purpose))throw Error('Selecione a finalidade do projeto.');if(input.accepted!==true)throw Error('Confirme o uso dos dados para liberar a exportação.');if(typeof input.marketing!=='boolean')throw Error('Preferência de contato inválida.');
 return{name,email,company,phone,purpose:input.purpose,marketing:input.marketing};
}
