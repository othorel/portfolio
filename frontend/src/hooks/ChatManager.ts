"use client";

import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import {
  createConversation as apiCreateConversation,
  getConversations as apiGetConversations,
  getMessages as apiGetMessages,
  sendMessage as apiSendMessage,
} from "@/api/chat";
import { Conversation, Message } from "@/types/Chat";

let socket: Socket | null = null;

export function useChatManager(token?: string) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetConversations();
      setConversations(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, []);

  const createConversation = useCallback(
  async (participantLogins: string[], name?: string): Promise<Conversation> => {
    setError(null);
    try {
      const conv = await apiCreateConversation({ participantLogins, name });
      setConversations((prev) => [...prev, conv]);
      return conv;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  },
  []
);

  const fetchMessages = useCallback(async (conversationId: number) => {
    setError(null);
    try {
      const msgs = await apiGetMessages(conversationId);
      setMessages((prev) => ({ ...prev, [conversationId]: msgs }));
      return msgs;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }, []);

  const sendMessage = useCallback(async (conversationId: number, content: string) => {
    setError(null);
    try {
      const msg = await apiSendMessage({ conversationId, content });
      setMessages((prev) => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), msg],
      }));
      return msg;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
        auth: { token },
      });
    }

    const handleNewMessage = (msg: Message) => {
      setMessages((prev) => {
        const convMsgs = prev[msg.conversationId] || [];
        return { ...prev, [msg.conversationId]: [...convMsgs, msg] };
      });
      if (!conversations.find((c) => c.id === msg.conversationId)) {
        fetchConversations();
      }
    };

    const handleNewConversation = (conv: Conversation) => {
      setConversations((prev) => [...prev, conv]);
    };

    socket.on("new-message", handleNewMessage);
    socket.on("new-conversation", handleNewConversation);

    return () => {
      socket?.off("new-message", handleNewMessage);
      socket?.off("new-conversation", handleNewConversation);
    };
  }, [token, conversations, fetchConversations]);

  // Initial fetch
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    messages,
    loading,
    error,
    fetchConversations,
    createConversation,
    fetchMessages,
    sendMessage,
  };
}
