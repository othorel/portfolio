"use client";

import { useState } from "react";
import { useChatManager } from "@/hooks/ChatManager";
import { Conversation, Message } from "@/types/Chat";
import { useAuth } from "@/context/AuthContext";

export default function ProfileChat() {
  const { user } = useAuth();
  const {
    conversations,
    messages,
    loading,
    error,
    createConversation,
    sendMessage,
    fetchMessages,
  } = useChatManager();

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newParticipant, setNewParticipant] = useState("");
  const [conversationName, setConversationName] = useState("");

  const handleSelectConversation = async (conv: Conversation) => {
    setSelectedConversation(conv);
    await fetchMessages(conv.id);
  };

  const handleSendMessage = async () => {
    if (!selectedConversation || !newMessage.trim()) return;
    await sendMessage(selectedConversation.id, newMessage);
    setNewMessage("");
  };

  const handleCreateConversation = async () => {
    if (!newParticipant.trim()) return;
    const conv = await createConversation([newParticipant.trim()], conversationName.trim() || undefined);
    setSelectedConversation(conv);
    setNewParticipant("");
    setConversationName("");
  };

  if (loading) return <p className="text-gray-300">Chargement des conversations...</p>;
  if (error) return <p className="bg-red-600 text-white p-2 rounded">{error}</p>;

  return (
    <div className="w-full flex justify-center p-8 font-sans text-white">
      <div className="max-w-5xl w-full space-y-8">

        <div className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nom du participant"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            className="px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Nom de la conversation (optionnel)"
            value={conversationName}
            onChange={(e) => setConversationName(e.target.value)}
            className="px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleCreateConversation}
            className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600 transition-colors mt-2"
          >
            Nouvelle conversation
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow-md max-h-[500px] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Conversations ({conversations.length})</h2>
            {conversations.length === 0 && <p className="text-gray-400">Aucune conversation</p>}
            <div className="space-y-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`w-full text-left p-2 rounded hover:bg-gray-700 transition-colors ${
                    selectedConversation?.id === conv.id ? "bg-gray-700" : ""
                  }`}
                >
                  {conv.name || conv.participants.map((p) => p.login).join(", ")}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col max-h-[500px]">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedConversation
                ? `Messages - ${selectedConversation.name || selectedConversation.participants.map((p) => p.login).join(", ")}`
                : "Messages"}
            </h2>

            <div className="flex-1 overflow-y-auto flex flex-col gap-2 mb-2">
              {selectedConversation ? (
                (messages[selectedConversation.id] || []).map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded flex flex-col ${
                      msg.sender?.id === user?.id
                        ? "bg-gray-700 text-white self-end"
                        : "bg-gray-600 text-gray-300 self-start"
                    }`}
                  >
                    <strong>{msg.sender?.login || "Moi"}:</strong>
                    <span>{msg.content}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Sélectionnez une conversation</p>
              )}
            </div>

            {selectedConversation && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tapez un message..."
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600 transition-colors"
                >
                  Envoyer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
