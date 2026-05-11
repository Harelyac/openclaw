import { purgeAgentSessionStoreEntries } from "../config/sessions.js";
import { type RuntimeEnv, defaultRuntime } from "../runtime.js";
import { requireValidConfigFileSnapshot } from "./agents.command-shared.js";

type ResetAllOptions = {
  isAdmin: boolean;
  json?: boolean;
};

export async function agentsResetAllCommand(
  opts: ResetAllOptions,
  runtime: RuntimeEnv = defaultRuntime,
): Promise<void> {
  if (!opts.isAdmin) {
    runtime.error("Permission denied.");
    runtime.exit(1);
    return;
  }

  const configSnapshot = await requireValidConfigFileSnapshot(runtime);
  if (!configSnapshot) return;

  const cfg = configSnapshot.sourceConfig ?? configSnapshot.config;
  const agents = Array.isArray(cfg.agents?.list) ? cfg.agents.list : [];

  for (const agent of agents) {
    if (agent?.id) {
      await purgeAgentSessionStoreEntries(cfg, agent.id);
    }
  }

  runtime.log(`Reset sessions for ${agents.length} agent(s).`);
}
