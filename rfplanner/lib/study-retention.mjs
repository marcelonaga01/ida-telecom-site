export const STUDY_RETENTION_MS = 7 * 24 * 60 * 60 * 1000;

// Runs at startup and in the background, independent of browser activity.
export function startStudyRetention(db, {clock=Date.now, schedule=setInterval, cancel=clearInterval}={}) {
  const remove = db.prepare('DELETE FROM studies WHERE created <= ?');
  const prune = () => remove.run(clock() - STUDY_RETENTION_MS);
  prune();
  const timer = schedule(() => {
    try { prune(); }
    catch { console.error('Não foi possível concluir a limpeza automática dos estudos.'); }
  }, 60_000);
  timer.unref?.();
  return {prune, stop:()=>cancel(timer)};
}
