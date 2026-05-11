type PromptOptions = {
  agentName: string;
};

export function buildAgentSystemPrompt(opts: PromptOptions): string {
  return `You are ${opts.agentName}, a helpful personal AI assistant. Respond concisely and helpfully.`;
}
