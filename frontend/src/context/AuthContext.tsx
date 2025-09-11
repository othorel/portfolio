"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { login as apiLogin, signup as apiSignup, checkEmail, checkLogin } from "@/api/auth";
import { User } from "@/types/User";
import { AuthResponse } from "@/types/Auth";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (login: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  checkEmail: (email: string) => Promise<boolean>;
  checkLogin: (login: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
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

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, error, login, signup, logout, checkEmail, checkLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
