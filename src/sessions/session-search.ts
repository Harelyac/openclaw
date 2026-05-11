import type { DatabaseSync } from "node:sqlite";

export type SessionRow = {
  id: string;
  agentId: string;
  label: string;
  createdAt: number;
};

function escapeLikePattern(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
}

export function searchSessions(db: DatabaseSync, query: string): SessionRow[] {
  if (!query.trim()) return [];

  const sql = `SELECT id, agentId, label, createdAt
               FROM sessions
               WHERE label LIKE ? ESCAPE '\\'
               ORDER BY createdAt DESC`;

  return db.prepare(sql).all(`%${escapeLikePattern(query)}%`) as SessionRow[];
}
