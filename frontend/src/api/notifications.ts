import { apiFetch } from "@/utils/ApiManager";
import { Notification } from "../types/Notifications";

export async function getUserNotifications(): Promise<Notification[]> {
  const data = await apiFetch<{ notifications: Notification[] }>("/notifications");
  return data.notifications ?? [];
}

export async function markNotificationAsRead(notificationId: number): Promise<Notification> {
  const data = await apiFetch<{ notification: Notification }>(`/notifications/read/${notificationId}`, {
    method: "PATCH",
  });
  return data.notification;
}

export async function deleteNotification(notificationId: number): Promise<void> {
  await apiFetch(`/notifications/${notificationId}`, { method: "DELETE" });
}
