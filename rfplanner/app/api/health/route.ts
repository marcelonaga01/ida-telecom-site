import {env} from '@/lib/server-env';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    if (!env.RF_SESSION_SIGNING_KEY || env.RF_SESSION_SIGNING_KEY.length < 32 || !env.RF_EXPORT_SIGNING_KEY || env.RF_EXPORT_SIGNING_KEY.length < 32) {
      return Response.json({ok:false, error:'Configure as chaves de sessão e exportação no servidor.'}, {status:503});
    }
    await env.DB.prepare('SELECT 1 AS ready').first();
    return Response.json({ok:true});
  } catch { return Response.json({ok:false}, {status:503}); }
}
