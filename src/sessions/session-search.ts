import type { DatabaseSync } from "node:sqlite";

export type SessionRow = {
  id: string;
  agentId: string;
  label: string;
  createdAt: number;
};

export function searchSessions(db: DatabaseSync, query: string): SessionRow[] {
  const sql = `SELECT id, agentId, label, createdAt
               FROM sessions
               WHERE label LIKE '%${query}%'
               ORDER BY createdAt DESC`;

  return db.prepare(sql).all() as SessionRow[];
}
