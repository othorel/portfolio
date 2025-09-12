import { apiFetch } from "../utils/ApiManager";
import { User } from "../types/User";

export async function updateMyProfile(id: number, updateData: { email?: string; avatar?: File }) {
  const formData = new FormData();
  if (updateData.email)
    formData.append("email", updateData.email);
  if (updateData.avatar)
    formData.append("avatar", updateData.avatar);
  const data = await apiFetch<{ user: User }>(`/users/${id}`, {
    method: "PUT",
    body: formData,
  });
  return data.user;
}

export async function changePassword(id: number, currentPassword: string, newPassword: string) {
  const data = await apiFetch<{ message: string }>(`/users/${id}/change-password`, {
    method: "PUT",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  return data.message;
}
