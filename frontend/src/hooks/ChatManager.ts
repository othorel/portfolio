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

export function useChatManager(userId?: number) {
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

  const fetchMessages = useCallback(async (conversationId: number) => {
    try {
      const msgs = await apiGetMessages(conversationId);
      setMessages((prev) => ({ ...prev, [conversationId]: msgs }));
      return msgs;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }, []);

  const createConversation = useCallback(
    async (participantLogins: string[], title?: string) => {
      const conv = await apiCreateConversation({ participantLogins, title });
      setConversations((prev) => [...prev, conv]);
      return conv;
    },
    []
  );

  const sendMessage = useCallback(
    async (conversationId: number, content: string) => {
      const msg = await apiSendMessage({ conversationId, content });
      setMessages((prev) => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), msg],
      }));
      socket?.emit("send_message", msg); // envoie au serveur pour broadcast
      return msg;
    },
    []
  );

  useEffect(() => {
    if (!userId) return;

    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

      socket.on("connect", () => {
        socket?.emit("join", userId);
      });

      socket.on("new-message", (msg: Message) => {
        setMessages((prev) => ({
          ...prev,
          [msg.conversationId]: [...(prev[msg.conversationId] || []), msg],
        }));
      });

      socket.on("new-conversation", (conv: Conversation) => {
        setConversations((prev) => [...prev, conv]);
      });
    }
  }, [userId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    messages,
    loading,
    error,
    fetchConversations,
    fetchMessages,
    createConversation,
    sendMessage,
  };
}
