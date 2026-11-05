// One server serves the institutional site, contact API and RFPlanner proxy.
process.env.PORT ||= '4173';
await import('./serve.cjs');
