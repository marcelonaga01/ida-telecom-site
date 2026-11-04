export const exportLifetime=7*24*60*60;
const encoder=new TextEncoder();
async function key(secret){return crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);}
export async function createExportToken(user,secret,now=Date.now()){
 const expiry=Math.floor(now/1000)+exportLifetime;
 const signature=await crypto.subtle.sign('HMAC',await key(secret),encoder.encode(`v1:${user}:${expiry}`));
 return `v1.${expiry}.${Array.from(new Uint8Array(signature),v=>v.toString(16).padStart(2,'0')).join('')}`;
}
export async function verifyExportToken(token,user,secret,now=Date.now()){
 if(typeof token!=='string'||!/^v1\.\d{10}\.[a-f0-9]{64}$/.test(token))return false;
 const [,value,signature]=token.split('.'),expiry=Number(value),seconds=Math.floor(now/1000);
 if(expiry<=seconds||expiry>seconds+exportLifetime+60)return false;
 return crypto.subtle.verify('HMAC',await key(secret),Uint8Array.from(signature.match(/../g),v=>parseInt(v,16)),encoder.encode(`v1:${user}:${expiry}`));
}
