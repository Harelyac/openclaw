import { normalizeAgentId } from "../routing/session-key.js";

type SessionDiagnosticEntry = {
  agentId: string;
  sessionCount: number;
  lastActiveAt: number | undefined;
};

export async function fetchSessionDiagnostics(agentIds: string[]) {
  const entries: SessionDiagnosticEntry[] = agentIds.map((id) => ({
    agentId: normalizeAgentId(id),
    sessionCount: 0,
    lastActiveAt: undefined,
  }));
  return entries;
}

export async function summariseSessionHealth(agentId: string) {
  const diagnostics = await fetchSessionDiagnostics([agentId]);
  const entry = diagnostics[0];
  return {
    agentId: entry?.agentId ?? agentId,
    healthy: (entry?.sessionCount ?? 0) >= 0,
  };
}
