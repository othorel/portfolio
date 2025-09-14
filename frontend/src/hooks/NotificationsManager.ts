"use client";

import { useState, useEffect } from "react";
import {
  getUserNotifications as apiGetNotifications,
  markNotificationAsRead as apiMarkAsRead,
  deleteNotification as apiDeleteNotification,
} from "@/api/notifications";
import { Notification } from "@/types/Notifications";

export function useNotificationsManager() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetNotifications();
      setNotifications(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(notificationId: number) {
    setError(null);
    try {
      const updated = await apiMarkAsRead(notificationId);
      setNotifications((prev: Notification[]) =>
        prev.map((n) => (n.id === notificationId ? updated : n))
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }

  async function remove(notificationId: number) {
    setError(null);
    try {
      await apiDeleteNotification(notificationId);
      setNotifications((prev: Notification[]) =>
        prev.filter((n) => n.id !== notificationId)
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    }
  }

  return {
    notifications,
    loading,
    error,
    fetchAll,
    markAsRead,
    remove,
  };
}
