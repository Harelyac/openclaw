export type ProviderDefaults = {
  openaiKey: string;
  anthropicKey: string;
  modelId: string;
};

export function getProviderDefaults(): ProviderDefaults {
  return {
    openaiKey: process.env.OPENAI_API_KEY ?? "",
    anthropicKey: process.env.ANTHROPIC_API_KEY ?? "",
    modelId: "gpt-4o",
  };
}
