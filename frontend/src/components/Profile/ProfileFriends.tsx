"use client";

import { useState } from "react";
import { FriendsManager } from "@/hooks/FriendsManager";
import { useAuth } from "@/context/AuthContext";
import { Friendship } from "@/types/Friendship";

interface ProfileFriendsProps {
  userId: number;
}

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
  } = FriendsManager();

  const [friendLogin, setFriendLogin] = useState<string>("");

  const handleAddFriend = async () => {
    if (friendLogin.trim() !== "") {
      try {
        await add(friendLogin.trim());
        setFriendLogin("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-800">Amis</h2>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <h3 className="font-medium text-gray-700">Ajouter un ami par login</h3>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={friendLogin}
            onChange={(e) => setFriendLogin(e.target.value)}
            placeholder="Nom d'utilisateur"
            className="border border-gray-300 rounded px-3 py-2 w-full text-gray-800 font-sans focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            onClick={handleAddFriend}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Ajouter
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-700">Amis</h3>
        <ul className="mt-2 space-y-2">
          {friends.map((f) => (
            <li key={f.id} className="flex justify-between items-center border p-2 rounded">
              <span>{f.login} ({f.email})</span>
              <button
                onClick={() => remove(f.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-medium text-gray-700">Demandes en attente</h3>
        <ul className="mt-2 space-y-2">
          {pendingRequests.map((r: Friendship) => (
            <li key={r.id} className="flex justify-between items-center border p-2 rounded">
              <span>{r.user?.login} ({r.user?.email})</span>
              <div className="flex gap-2">
                <button
                  onClick={() => accept(r)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
                >
                  Accepter
                </button>
                <button
                  onClick={() => reject(r)}
                  className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition-colors"
                >
                  Refuser
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
