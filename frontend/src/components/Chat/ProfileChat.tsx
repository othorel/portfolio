"use client";

import { useState } from "react";
import { useChatManager } from "@/hooks/ChatManager";
import { Conversation, Message } from "@/types/Chat";

export default function ProfileChat() {
  const {
    conversations,
    messages,
    loading,
    error,
    fetchConversations,
    createConversation,
    fetchMessages,
    sendMessage,
  } = useChatManager();

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [newParticipant, setNewParticipant] = useState<string>("");

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
    const login = newParticipant.trim();
    if (!login) return;
    try {
      await createConversation([login]);
      setNewParticipant("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-300">Chargement des conversations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full flex justify-center p-8 font-sans text-white">
      <div className="max-w-5xl w-full bg-gray-800 p-6 rounded-xl shadow-md space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded-xl shadow-md max-h-[500px] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Conversations ({conversations.length})</h2>

            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Login du participant"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                className="flex-1 p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleCreateConversation}
                className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600 transition-colors"
              >
                Nouvelle conversation
              </button>
            </div>

            {conversations.length === 0 && <p className="text-gray-400">Aucune conversation</p>}
            <div className="space-y-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`w-full text-left p-2 rounded hover:bg-indigo-500/50 transition-colors ${
                    selectedConversation?.id === conv.id ? "bg-indigo-600/70" : ""
                  }`}
                >
                  {conv.participants.map((p) => p.login).join(", ")}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-xl shadow-md flex flex-col max-h-[500px]">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedConversation
                ? `Messages - ${selectedConversation.participants.map((p) => p.login).join(", ")}`
                : "Messages"}
            </h2>
            <div className="flex-1 overflow-y-auto flex flex-col gap-2">
              {selectedConversation ? (
                (messages[selectedConversation.id] || []).map((msg) => (
                  <div
                    key={msg.id}
                    className="p-2 rounded bg-indigo-800/50 text-indigo-50"
                  >
                    <strong>{msg.sender?.login || "Moi"}:</strong> {msg.content}
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Sélectionnez une conversation</p>
              )}
            </div>
            {selectedConversation && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
