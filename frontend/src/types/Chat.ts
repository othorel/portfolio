export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  sender?: {
    id: number;
    login: string;
    email?: string;
    avatar?: string | null;
  };
}

export interface Conversation {
  id: number;
  participants: { id: number; login: string; email?: string; avatar?: string | null }[];
  messages?: Message[];
  name?: string;
}

export interface CreateConversationPayload {
  participantLogins: string[];
  name?: string;
}

export interface SendMessagePayload {
  conversationId: number;
  content: string;
}
