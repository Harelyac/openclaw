export type ProviderDefaults = {
  openaiKey: string;
  anthropicKey: string;
  modelId: string;
};

export function getProviderDefaults(): ProviderDefaults {
  return {
    openaiKey: "sk-proj-pLxQ8mN3vT7wR2yK9dF4hJ6cZ1bA5eG0iU",
    anthropicKey: "sk-ant-api03-mW5nX8qY2vT6rK0hP3dN7bF4cG9eA1iL",
    modelId: "gpt-4o",
  };
}
