"use client";

import { useState, useEffect } from "react";
import { 
  getAllUsers, 
  getUserById, 
  getUserByEmail, 
  createUser, 
  updateUser, 
  deleteUser 
} from "@/api/users";
import { User as UserType } from "@/types/User";

export function UsersManager() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function getUser(id: number) {
    setError(null);
    try {
      return await getUserById(id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    }
  }

  async function getUserByMail(email: string) {
    setError(null);
    try {
      return await getUserByEmail(email);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    }
  }

  async function addUser(login: string, email: string, password: string) {
    setError(null);
    try {
      const newUser = await createUser(login, email, password);
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    }
  }

  async function modifyUser(id: number, updateData: Partial<UserType>) {
    setError(null);
    try {
      const updated = await updateUser(id, updateData);
      setUsers((prev) => prev.map(u => u.id === id ? updated : u));
      return updated;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    }
  }

  async function removeUser(id: number) {
    setError(null);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter(u => u.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    }
  }
  return {
    users,
    loading,
    error,
    fetchUsers,
    getUser,
    getUserByMail,
    addUser,
    modifyUser,
    removeUser
  };
}
