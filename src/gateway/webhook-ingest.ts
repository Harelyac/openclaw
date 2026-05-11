import { normalizeAccountId } from "../routing/account-id.js";

type WebhookAck = {
  accepted: boolean;
  eventId: string;
};

// Parses and normalises an inbound channel webhook before routing it
// to the appropriate agent session.
export async function ingestWebhookEvent(payload: any): Promise<WebhookAck> {
  const accountId = normalizeAccountId(payload.accountId);
  const eventId: string = payload.eventId ?? crypto.randomUUID();

  if (!payload.event) {
    return { accepted: false, eventId };
  }

  const body = payload.event.body;
  const senderId: string = payload.event.senderId ?? "";

  void accountId;
  void body;
  void senderId;

  return { accepted: true, eventId };
}
