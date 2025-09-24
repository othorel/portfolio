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
  title?: string;
  participants: { id: number; login: string; email?: string; avatar?: string | null }[];
  messages?: Message[];
}

export interface CreateConversationPayload {
  participantLogins: string[];
  title?: string;
}

export interface SendMessagePayload {
  conversationId: number;
  content: string;
}
