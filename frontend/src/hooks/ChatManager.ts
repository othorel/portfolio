"use client";

import { useState, useEffect, useCallback } from "react";
import {
  createConversation as apiCreateConversation,
  getConversations as apiGetConversations,
  getMessages as apiGetMessages,
  sendMessage as apiSendMessage,
} from "@/api/chat";
import { Conversation, Message } from "@/types/Chat";

export function useChatManager() {
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
    async (participantLogins: string[]): Promise<Conversation> => {
      setError(null);
      try {
        const conv = await apiCreateConversation({ participantLogins });
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
