import { apiFetch } from "../utils/ApiManager";
import { User } from "../types/User";

export async function login(email: string, password: string) {
  const data = await apiFetch<{ user: User; token: string }>(`/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.token)
    localStorage.setItem("Token", data.token);
  return data.user;
}

export async function signup(login: string, email: string, password: string) {
  const data = await apiFetch<{ user: User }>(`/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ login, email, password }),
  });
  return data.user;
}

export async function checkEmail(email: string) {
  const data = await apiFetch<{ exists: boolean }>(`/auth/email/${encodeURIComponent(email)}`);
  return data.exists;
}

export async function checkLogin(login: string) {
  const data = await apiFetch<{ exists: boolean }>(`/auth/login/${encodeURIComponent(login)}`);
  return data.exists;
}
