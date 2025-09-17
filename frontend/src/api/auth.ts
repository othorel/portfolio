import { apiFetch } from "../utils/ApiManager";
import { AuthResponse } from "../types/AuthResponse";

export async function login(email: string, password: string): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>(`/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.token) {
    localStorage.setItem("Token", data.token);
    localStorage.setItem("User", JSON.stringify(data.user));
  }
  return data;
}

export async function signup(login: string, email: string, password: string): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>(`/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ login, email, password }),
  });
  if (data.token) {
    localStorage.setItem("Token", data.token);
    localStorage.setItem("User", JSON.stringify(data.user));
  }
  return data;
}

export async function checkEmail(email: string): Promise<boolean> {
  const data = await apiFetch<{ exists: boolean }>(`/auth/email/${encodeURIComponent(email)}`);
  return data.exists;
}

export async function checkLogin(login: string): Promise<boolean> {
  const data = await apiFetch<{ exists: boolean }>(`/auth/login/${encodeURIComponent(login)}`);
  return data.exists;
}
