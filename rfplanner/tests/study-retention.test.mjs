import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {startStudyRetention,STUDY_RETENTION_MS} from '../lib/study-retention.mjs';

test('expiration applies to every owner and status at the seven-day creation boundary',()=>{
  const db=new DatabaseSync(':memory:');
  db.exec('CREATE TABLE studies(id TEXT,owner TEXT,state TEXT,created INTEGER)');
  let now=STUDY_RETENTION_MS*3, tick, stopped=false;
  const insert=db.prepare('INSERT INTO studies VALUES(?,?,?,?)');
  insert.run('old','one','success',now-STUDY_RETENTION_MS-1);
  insert.run('boundary','two','failure',now-STUDY_RETENTION_MS);
  insert.run('recent','one','success',now-STUDY_RETENTION_MS+1);
  insert.run('running','two','in_progress',now-1000);
  const retention=startStudyRetention(db,{clock:()=>now,schedule:callback=>{tick=callback;return {unref(){}};},cancel:()=>{stopped=true;}});
  assert.deepEqual(db.prepare('SELECT id FROM studies ORDER BY id').all().map(x=>x.id),['recent','running']);
  now+=2;
  tick(); // No HTTP request or open browser is needed.
  assert.deepEqual(db.prepare('SELECT id FROM studies').all().map(x=>x.id),['running']);
  retention.stop();assert.equal(stopped,true);db.close();
});
