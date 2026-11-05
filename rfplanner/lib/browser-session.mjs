const encoder=new TextEncoder();
async function key(secret){return crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);}
const hex=bytes=>Array.from(new Uint8Array(bytes),v=>v.toString(16).padStart(2,'0')).join('');
export async function browserSession(token,secret){
 if(!secret||secret.length<32)throw Error('A sessão do navegador ainda precisa ser configurada no servidor.');
 if(typeof token==='string'&&/^v1\.[a-f0-9]{64}\.[a-f0-9]{64}$/.test(token)){
  const [,id,signature]=token.split('.');
  if(await crypto.subtle.verify('HMAC',await key(secret),Uint8Array.from(signature.match(/../g),v=>parseInt(v,16)),encoder.encode(`rf-session:v1:${id}`)))return {owner:`browser_${id}`,token,created:false};
 }
 const id=hex(crypto.getRandomValues(new Uint8Array(32))),signature=hex(await crypto.subtle.sign('HMAC',await key(secret),encoder.encode(`rf-session:v1:${id}`)));
 return {owner:`browser_${id}`,token:`v1.${id}.${signature}`,created:true};
}
export function browserCookieOptions(secure){return {httpOnly:true,secure,sameSite:'lax',path:'/'};}
