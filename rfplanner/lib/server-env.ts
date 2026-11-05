import {DatabaseSync, type SQLInputValue} from 'node:sqlite';
import {startStudyRetention} from './study-retention.mjs';
import {mkdirSync} from 'node:fs';
import {resolve, join} from 'node:path';

class BoundStatement {
  constructor(private db: DatabaseSync, private sql: string, private values: SQLInputValue[] = []) {}
  bind(...values: SQLInputValue[]) { return new BoundStatement(this.db, this.sql, values); }
  async all<T>() { return {results: this.db.prepare(this.sql).all(...this.values) as T[]}; }
  async first<T>() { return (this.db.prepare(this.sql).get(...this.values) as T | undefined) ?? null; }
  async run() { const result = this.db.prepare(this.sql).run(...this.values); return {meta: {changes: Number(result.changes)}}; }
}

class StudyDatabase {
  private db: DatabaseSync;
  private retention: ReturnType<typeof startStudyRetention>;
  constructor() {
    const folder = resolve(process.env.RF_DATA_DIR || './data');
    mkdirSync(folder, {recursive: true, mode: 0o700});
    this.db = new DatabaseSync(join(folder, 'studies.sqlite'));
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; PRAGMA secure_delete=ON;
      CREATE TABLE IF NOT EXISTS studies (
        id TEXT PRIMARY KEY, owner TEXT NOT NULL, name TEXT NOT NULL,
        request TEXT NOT NULL, state TEXT NOT NULL, created INTEGER NOT NULL,
        run_id INTEGER, run_url TEXT, error TEXT
      );
      CREATE INDEX IF NOT EXISTS studies_owner_created ON studies(owner, created DESC);
      CREATE INDEX IF NOT EXISTS studies_created ON studies(created);`);
    this.retention = startStudyRetention(this.db);
  }
  prepare(sql: string) { this.retention.prune(); return new BoundStatement(this.db, sql); }
  close() { this.retention.stop(); this.db.close(); }
}

declare global { var idaStudyDatabase: StudyDatabase | undefined; }
// Loaded only by server routes. No Cloudflare bindings or platform identity required.
export const env = new Proxy({} as {DB: StudyDatabase} & Record<string, any>, {
  get(_target, name: string) {
    if (name === 'DB') return globalThis.idaStudyDatabase ??= new StudyDatabase();
    return process.env[name];
  },
});
