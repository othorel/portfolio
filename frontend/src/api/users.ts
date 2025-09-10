import { apiFetch } from "../utils/ApiManager";
import { User } from "../types/User";

export async function createUser(login: string, email: string, password: string) {
  const data = await apiFetch<{ user: User }>(`/users`, {
    method: "POST",
    body: JSON.stringify({ login, email, password }),
  });
  return data.user;
}

export async function getAllUsers() {
  const data = await apiFetch<{ users: User[] }>(`/users`);
  return data.users ?? [];
}

export async function getUserByEmail(email: string) {
  const data = await apiFetch<{ user: User }>(`/users/email/${encodeURIComponent(email)}`);
  return data.user;
}

export async function getUserById(id: number) {
  const data = await apiFetch<{ user: User }>(`/users/${id}`);
  return data.user;
}

export async function updateUser(id: number, updateData: { login?: string; email?: string; password?: string; avatar?: string }) {
  const data = await apiFetch<{ user: User }>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(updateData),
  });
  return data.user;
}

export async function deleteUser(id: number) {
  const data = await apiFetch<{ user: User }>(`/users/${id}`, {
    method: "DELETE",
  });
  return data.user;
}
