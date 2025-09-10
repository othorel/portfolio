"use client";

import { useState } from "react";
import { signup as apiSignup, login as apiLogin, checkEmail, checkLogin } from "@/api/auth";
import { User as UserType } from "@/types/User";

export function useAuthManager() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const loggedUser = await apiLogin(email, password);
      setUser(loggedUser);
      return loggedUser;
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
      const newUser = await apiSignup(loginStr, email, password);
      setUser(newUser);
      return newUser;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function verifyEmail(email: string) {
    setError(null);
    try {
      return await checkEmail(email);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    }
  }

  async function verifyLogin(loginStr: string) {
    setError(null);
    try {
      return await checkLogin(loginStr);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("Token");
  }
  return {
    user,
    loading,
    error,
    login,
    signup,
    verifyEmail,
    verifyLogin,
    logout,
  };
}
