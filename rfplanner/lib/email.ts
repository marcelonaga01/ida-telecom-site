import{env}from'./server-env';
import{ApiError}from'./github';
import{sendLeadEmail}from'./lead-email.mjs';
import type{StudyRow}from'./api';
export async function notifyLead(lead:any,study:StudyRow,user:string){
 const vars=env as unknown as Record<string,string>;
 try{await sendLeadEmail({apiKey:vars.RESEND_API_KEY,from:vars.RF_EMAIL_FROM,lead,study,user});}catch(e){const error=e as Error&{status?:number};throw new ApiError(error.message,error.status||502);}
}
