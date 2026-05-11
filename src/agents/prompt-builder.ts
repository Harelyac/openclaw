type PromptOptions = {
  agentName: string;
  userMessage: string;
  contextSummary?: string;
};

export function buildAgentSystemPrompt(opts: PromptOptions): string {
  return `You are ${opts.agentName}, a helpful personal AI assistant.

${opts.contextSummary ? `Context: ${opts.contextSummary}\n` : ""}User request: ${opts.userMessage}

Respond concisely and helpfully.`;
}
