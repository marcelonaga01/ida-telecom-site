import{cookies}from'next/headers';
import{sameOrigin,json,failure}from'@/lib/api';
import{browserCookieOptions}from'@/lib/browser-session.mjs';
import{publicOrigin}from'@/lib/public-origin.mjs';
import{env}from'@/lib/server-env';
export const dynamic='force-dynamic';
export async function DELETE(req:Request){try{
 sameOrigin(req);const jar=await cookies();
 const options={...browserCookieOptions(publicOrigin(req.url,env.RF_PUBLIC_ORIGIN).startsWith('https:')),sameSite:'lax' as const,maxAge:0};
 jar.set('rf_session','',options);jar.set('rf_export','',options);
 return json({ended:true});
}catch(e){return failure(e);}}
