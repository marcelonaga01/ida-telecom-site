export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NEXT_PHASE !== 'phase-production-build') {
    const {env} = await import('./lib/server-env');
    void env.DB;
  }
}
