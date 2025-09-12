"use client";

import { useState, useEffect } from "react";
import {
  addFriend as apiAddFriend,
  removeFriend as apiRemoveFriend,
  getFriends as apiGetFriends,
  getPendingRequests as apiGetPendingRequests,
  acceptFriend as apiAcceptFriend,
  rejectFriend as apiRejectFriend
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
        apiGetPendingRequests()
      ]);
      setFriends(friendsData);
      setPendingRequests(requestsData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
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
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    }
  }

  async function remove(friendId: number) {
    setError(null);
    try {
      await apiRemoveFriend(friendId);
      await fetchAll();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    }
  }

  async function accept(request: Friendship) {
    setError(null);
    try {
      await apiAcceptFriend(request.friendId);
      await fetchAll();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    }
  }

  async function reject(request: Friendship) {
    setError(null);
    try {
      await apiRejectFriend(request.friendId);
      await fetchAll();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
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
    reject
  };
}
