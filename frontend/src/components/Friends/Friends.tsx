"use client";

import { useState } from "react";
import { FriendsManager } from "@/hooks/FriendsManager";
import { useAuth } from "@/context/AuthContext";
import { Friendship } from "@/types/Friendship";
import { User } from "@/types/User";
import { normalizeAvatar } from "@/utils/NormalizeAvatar";
import ConfirmModal from "../ConfirmModal";

export default function ProfileFriends() {
  const { user } = useAuth();
  const {
    friends,
    pendingRequests,
    loading,
    error,
    add,
    remove,
    accept,
    reject,
    getUserWithFriends,
  } = FriendsManager();

  const [friendLogin, setFriendLogin] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingRemoveFriend, setPendingRemoveFriend] = useState<User | null>(null);

  const resolveAvatar = (avatar?: string | null) => {
    const isDefault = !avatar || avatar.includes("/avatars/default.png");
    return isDefault ? "/avatars/default.png" : normalizeAvatar(avatar as string);
  };

  const handleAction = async (fn: () => Promise<void>, successMsg?: string) => {
    setActionLoading(true);
    setActionMessage(null);
    try {
      await fn();
      if (successMsg)
        setActionMessage(successMsg);
    } catch (err) {
      console.error(err);
      setActionMessage(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddFriend = () => {
    if (!friendLogin.trim() || friendLogin.trim() === user?.login) {
      setActionMessage("Vous ne pouvez pas vous ajouter vous-même");
      return;
    }
    handleAction(
      () => add(friendLogin.trim()), 
      `Demande envoyée à ${friendLogin.trim()}`
    );
    setFriendLogin("");
  };

  const handleRemove = (friend: User) => {
    setPendingRemoveFriend(friend);
    setModalOpen(true);
  };

  const confirmRemove = () => {
    if (pendingRemoveFriend) {
      handleAction(() => remove(pendingRemoveFriend.login), `${pendingRemoveFriend.login} retiré(e) de vos amis`);
      setPendingRemoveFriend(null);
      setModalOpen(false);
    }
  };

  const cancelRemove = () => {
    setPendingRemoveFriend(null);
    setModalOpen(false);
  };

  const handleAccept = (request: Friendship) => {
    if (!request.user)
      return;
    handleAction(() => accept(request), `Vous êtes maintenant ami avec ${request.user.login}`);
  };

  const handleReject = (request: Friendship) => {
    if (!request.user)
      return;
    handleAction(() => reject(request), `Demande de ${request.user.login} refusée`);
  };

  const handleSelectFriend = async (f: User) => {
    setActionLoading(true);
    setActionMessage(null);
    try {
      const fullUser = await getUserWithFriends(f.login);
      setSelectedFriend(fullUser);
    } catch (err) {
      console.error(err);
      setActionMessage(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setActionLoading(false);
    }
  };

  if (!user)
    return (
      <div className="flex items-center justify-center text-white py-20">
        <p className="text-xl font-semibold">Chargement du profil...</p>
      </div>
    );

  return (
    <div className="w-full flex justify-center p-8 font-sans text-white">
      <div className="max-w-5xl w-full bg-gray-800 p-6 rounded-xl shadow-md space-y-8">
        
        {(error || actionMessage) && (
          <div
            className={`p-2 rounded font-medium ${
              error ||
              actionMessage?.toLowerCase().includes("erreur") ||
              actionMessage?.toLowerCase().includes("introuvable")
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {error ?? actionMessage}
          </div>
        )}

        {(loading || actionLoading) && <div className="text-gray-300">Chargement...</div>}

        <div className="bg-gray-800 p-4 rounded-xl shadow-md flex gap-4 items-center">
          <input
            type="text"
            value={friendLogin}
            onChange={(e) => setFriendLogin(e.target.value)}
            placeholder="Nom d&apos;utilisateur"
            className="flex-1 px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddFriend}
            disabled={actionLoading || !friendLogin.trim()}
            className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600 transition-colors disabled:opacity-50"
          >
            Ajouter
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Amis ({friends.length})</h2>
            <div className="space-y-4">
              {friends.length === 0 && <p className="text-gray-400">Aucun ami pour le moment</p>}
              {friends.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between bg-gray-700 p-3 rounded-xl hover:bg-gray-600 transition-colors cursor-pointer"
                  onClick={() => handleSelectFriend(f)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        f.login === user.login
                          ? resolveAvatar(user.avatar)
                          : resolveAvatar(f.avatar)
                      }
                      alt={f.login}
                      className="w-12 h-12 rounded-full border-2 border-indigo-500"
                    />
                    <div>
                      <p className="font-semibold">{f.login}</p>
                      <p className="text-gray-300 text-sm">{f.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(f);
                    }}
                    className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition-colors"
                  >
                    Retirer
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Demandes en attente ({pendingRequests.length})</h2>
            <div className="space-y-4">
              {pendingRequests.length === 0 && <p className="text-gray-400">Aucune demande en attente</p>}
              {pendingRequests.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between bg-gray-700 p-3 rounded-xl hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={resolveAvatar(r.user?.avatar)}
                      alt={r.user?.login}
                      className="w-12 h-12 rounded-full border-2 border-indigo-500"
                    />
                    <div>
                      <p className="font-semibold">{r.user?.login}</p>
                      <p className="text-gray-300 text-sm">{r.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(r)}
                      className="px-3 py-1 bg-green-500 rounded hover:bg-green-600 transition-colors"
                    >
                      Accepter
                    </button>
                    <button
                      onClick={() => handleReject(r)}
                      className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-600 transition-colors"
                    >
                      Refuser
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedFriend && (
          <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-md">
            <button
              onClick={() => setSelectedFriend(null)}
              className="text-gray-400 hover:text-white mb-4"
            >
              &larr; Retour
            </button>
            <div className="flex items-center gap-4">
              <img
                src={resolveAvatar(selectedFriend.avatar)}
                alt={selectedFriend.login}
                className="w-20 h-20 rounded-full border-2 border-indigo-500"
              />
              <div>
                <h3 className="text-2xl font-bold">{selectedFriend.login}</h3>
                <p className="text-gray-300">{selectedFriend.email}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-2">Ses amis</h4>
              <div className="flex flex-wrap gap-3">
                {selectedFriend.friends?.length ? (
                  selectedFriend.friends.map((f) => (
                    <div
                      key={f.id}
                      className="flex flex-col items-center gap-1 bg-gray-700 p-2 rounded-xl"
                    >
                      <img
                        src={resolveAvatar(f.avatar)}
                        alt={f.login}
                        className="w-10 h-10 rounded-full border-2 border-indigo-400"
                      />
                      <span className="text-sm">{f.login}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Pas d&apos;amis pour le moment</p>
                )}
              </div>
            </div>
          </div>
        )}

        {modalOpen && pendingRemoveFriend && (
          <ConfirmModal
            message={`Voulez-vous vraiment retirer ${pendingRemoveFriend.login} de vos amis ?`}
            onConfirm={confirmRemove}
            onCancel={cancelRemove}
          />
        )}
      </div>
    </div>
  );
}
