import { apiFetch } from "../utils/ApiManager";
import {
    Conversation,
    Message,
    CreateConversationPayload,
    SendMessagePayload } from "../types/Chat";

export async function createConversation(payload: { participantLogins: string[]; title?: string }): Promise<Conversation> {
  const data = await apiFetch<{ conversation: Conversation }>("/chat/conversation", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.conversation;
}

export async function getMessages(conversationId: number): Promise<Message[]> {
  const data = await apiFetch<{ messages: Message[] }>(`/chat/messages?conversationId=${conversationId}`);
  return data.messages ?? [];
}

export async function sendMessage(payload: SendMessagePayload): Promise<Message> {
  const data = await apiFetch<{ message: Message }>("/chat/message", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.message;
}

export async function getConversations(): Promise<Conversation[]> {
  const data = await apiFetch<{ conversations: Conversation[] }>("/chat/conversations");
  return data.conversations ?? [];
}
