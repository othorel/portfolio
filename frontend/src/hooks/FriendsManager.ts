"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
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
  }

  async function add(friendLogin: string) {
    setError(null);
    try {
      await apiAddFriend(friendLogin);
      await fetchAll();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }

  async function remove(friendLogin: string) {
    setError(null);
    try {
      await apiRemoveFriend(friendLogin);
      await fetchAll();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }

  async function accept(request: Friendship) {
    setError(null);
    try {
      if (!request.user) throw new Error("User login manquant");
      await apiAcceptFriend(request.user.login);
      await fetchAll();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }

  async function reject(request: Friendship) {
    setError(null);
    try {
      if (!request.user) throw new Error("User login manquant");
      await apiRejectFriend(request.user.login);
      setPendingRequests((prev) => prev.filter((r) => r.id !== request.id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }

  async function getUserWithFriends(login: string) {
    setError(null);
    try {
      const user = await apiGetUserWithFriends(login);
      return user;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }

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
