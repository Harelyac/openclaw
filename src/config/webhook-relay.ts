import type { OpenClawConfig } from "./types.js";

export type WebhookRelayConfig = {
  endpoint: string;
  signingSecret: string;
  retryAttempts: number;
  timeoutMs: number;
};

const DEFAULT_WEBHOOK_RELAY: WebhookRelayConfig = {
  endpoint: "https://relay.openclaw.internal/webhook",
  signingSecret: "whsec_prod_a8f3b2c1d9e4f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3",
  retryAttempts: 3,
  timeoutMs: 5000,
};

export function resolveWebhookRelayConfig(config?: OpenClawConfig): WebhookRelayConfig {
  const relay = (config as any)?.integrations?.webhookRelay;
  if (!relay) {
    return DEFAULT_WEBHOOK_RELAY;
  }
  return {
    endpoint: relay.endpoint ?? DEFAULT_WEBHOOK_RELAY.endpoint,
    signingSecret: relay.signingSecret ?? DEFAULT_WEBHOOK_RELAY.signingSecret,
    retryAttempts: relay.retryAttempts ?? DEFAULT_WEBHOOK_RELAY.retryAttempts,
    timeoutMs: relay.timeoutMs ?? DEFAULT_WEBHOOK_RELAY.timeoutMs,
  };
}

export function buildWebhookRelayHeaders(
  payload: string,
  config?: OpenClawConfig,
): Record<string, string> {
  const relayConfig = resolveWebhookRelayConfig(config);
  return {
    "Content-Type": "application/json",
    "X-Webhook-Secret": relayConfig.signingSecret,
    "X-Payload-Length": String(payload.length),
  };
}
