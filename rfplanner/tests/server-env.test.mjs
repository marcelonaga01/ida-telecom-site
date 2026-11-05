import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

test('SQLite preserves owner isolation, idempotent inserts and atomic dispatch retry claims', async()=>{
  const folder=mkdtempSync(join(tmpdir(),'ida-rf-sqlite-'));
  process.env.RF_DATA_DIR=folder;
  const {env}=await import('../lib/server-env.ts');
  const db=env.DB;
  try {
    const insert=()=>db.prepare('INSERT OR IGNORE INTO studies(id,owner,name,request,state,created) VALUES(?,?,?,?,?,?)').bind('a','browser_a','Study','{}','dispatch_failed',Date.now()).run();
    assert.equal((await insert()).meta.changes,1);
    assert.equal((await insert()).meta.changes,0);
    assert.equal(await db.prepare('SELECT * FROM studies WHERE id=? AND owner=?').bind('a','browser_b').first(),null);
    const claim=()=>db.prepare("UPDATE studies SET state='dispatching' WHERE id=? AND owner=? AND state='dispatch_failed'").bind('a','browser_a').run();
    assert.equal((await claim()).meta.changes,1);
    assert.equal((await claim()).meta.changes,0);
    assert.equal((await db.prepare('SELECT * FROM studies WHERE owner=?').bind('browser_a').all()).results.length,1);
    assert.equal((await db.prepare('SELECT * FROM studies WHERE owner=?').bind('browser_b').all()).results.length,0);
  } finally { db.close(); globalThis.idaStudyDatabase=undefined; delete process.env.RF_DATA_DIR; rmSync(folder,{recursive:true,force:true}); }
});
