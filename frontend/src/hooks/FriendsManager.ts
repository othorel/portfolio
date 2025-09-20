"use client";

import { useState, useEffect, useCallback } from "react";
import {
  addFriend as apiAddFriend,
  removeFriend as apiRemoveFriend,
  getFriends as apiGetFriends,
  getPendingRequests as apiGetPendingRequests,
  acceptFriend as apiAcceptFriend,
  rejectFriend as apiRejectFriend,
  getUserWithFriends as apiGetUserWithFriends,
} from "@/api/friends";
import { User } from "@/types/User";
import { Friendship } from "@/types/Friendship";

export function FriendsManager() {
  const [friends, setFriends] = useState<User[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friendship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [friendsData, requestsData] = await Promise.all([
        apiGetFriends(),
        apiGetPendingRequests(),
      ]);
      setFriends(friendsData);
      setPendingRequests(requestsData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, []);

  const add = useCallback(async (friendLogin: string) => {
    setError(null);
    try {
      await apiAddFriend(friendLogin);
      await fetchAll();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }, [fetchAll]);

  const remove = useCallback(async (friendLogin: string) => {
    setError(null);
    try {
      await apiRemoveFriend(friendLogin);
      await fetchAll();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }, [fetchAll]);

  const accept = useCallback(async (request: Friendship) => {
    setError(null);
    try {
      if (!request.user)
        throw new Error("Utilisateur introuvable");
      await apiAcceptFriend(request.user.login);
      await fetchAll();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }, [fetchAll]);

  const reject = useCallback(async (request: Friendship) => {
    setError(null);
    try {
      if (!request.user)
        throw new Error("Utilisateur introuvable");
      await apiRejectFriend(request.user.login);
      setPendingRequests((prev) => prev.filter((r) => r.id !== request.id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }, []);

  const getUserWithFriends = useCallback(async (login: string) => {
    setError(null);
    try {
      const user = await apiGetUserWithFriends(login);
      return user;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    friends,
    pendingRequests,
    loading,
    error,
    fetchAll,
    add,
    remove,
    accept,
    reject,
    getUserWithFriends,
  };
}
