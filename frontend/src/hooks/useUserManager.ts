"use client";

import { useState, useEffect } from "react";
import { getUsers, createUser } from "@/api/index";

export interface User {
  id: number;
  name: string;
  email: string;
}

export function useUserManager() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        setLoading(true);
        setError(null);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    async function addUser(name: string, email: string) {
        setError(null);
        try {
            const newUser = await createUser(name, email);
            setUsers((prev) => [...prev, newUser]);
            return newUser;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
            throw err;
        }
    }
    return { users, error, loading, fetchUsers, addUser };
}
