"use client";

import { useState, useEffect } from "react";
import {
    addFriend,
    removeFriend,
    getFriends
} from "@/api/friends";
import { User } from "@/types/User";

export function useFriendManager(userId: number) {
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (userId) {
      fetchFriends();
    }
  }, [userId]);

  async function fetchFriends() {
    setLoading(true);
    setError(null);
    try {
      const data = await getFriends(userId);
      setFriends(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function add(friendId: number) {
    setError(null);
    try {
      const updatedUser = await addFriend(friendId);
      await fetchFriends();
      return updatedUser;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    }
  }

  async function remove(friendId: number) {
    setError(null);
    try {
      const updatedUser = await removeFriend(friendId);
      await fetchFriends();
      return updatedUser;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    }
  }
  return {
    friends,
    loading,
    error,
    fetchFriends,
    add,
    remove,
  };
}
