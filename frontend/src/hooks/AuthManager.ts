"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login as apiLogin, signup as apiSignup, checkEmail, checkLogin } from "@/api/auth";
import { User } from "@/types/User";
import { AuthResponse } from "@/types/Auth";

export function useAuthManager() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Charger le user si token existant (au démarrage)
  useEffect(() => {
  const storedUser = localStorage.getItem("User");
  const token = localStorage.getItem("Token");
  if (storedUser && token) {
    setUser(JSON.parse(storedUser));
  } else {
    setUser(null); // rien de par défaut
  }
}, []);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const res: AuthResponse = await apiLogin(email, password);
      setUser(res.user);
      localStorage.setItem("Token", res.token);
      localStorage.setItem("User", JSON.stringify(res.user));
      return res.user;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function signup(loginStr: string, email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const res: AuthResponse = await apiSignup(loginStr, email, password);
      setUser(res.user);
      localStorage.setItem("Token", res.token);
      localStorage.setItem("User", JSON.stringify(res.user));
      return res.user;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    router.push("/login");
  }

  return {
    user,
    loading,
    error,
    login,
    signup,
    checkEmail,
    checkLogin,
    logout,
  };
}
