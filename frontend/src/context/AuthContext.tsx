"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { login as apiLogin, signup as apiSignup, checkEmail, checkLogin } from "@/api/auth";
import { User } from "@/types/User";
import { AuthResponse } from "@/types/AuthResponse";
import { normalizeAvatar } from "@/utils/NormalizeAvatar";
import { AuthContextType } from "@/types/AuthContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    const storedToken = localStorage.getItem("Token");
    if (storedUser && storedToken) {
      const parsed = JSON.parse(storedUser);
      parsed.avatar = normalizeAvatar(parsed.avatar);
      setUser(parsed);
      setToken(storedToken);
    }
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const res: AuthResponse = await apiLogin(email, password);
      const normalizedUser = { ...res.user, avatar: normalizeAvatar(res.user.avatar) };
      setUser(normalizedUser);
      setToken(res.token);
      localStorage.setItem("Token", res.token);
      localStorage.setItem("User", JSON.stringify(normalizedUser));
      return normalizedUser;
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
      const normalizedUser = { ...res.user, avatar: res.user.avatar ? normalizeAvatar(res.user.avatar) : null };
      setUser(normalizedUser);
      setToken(res.token);
      localStorage.setItem("Token", res.token);
      localStorage.setItem("User", JSON.stringify(normalizedUser));
      return normalizedUser;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, setToken, loading, error, login, signup, logout, checkEmail, checkLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
