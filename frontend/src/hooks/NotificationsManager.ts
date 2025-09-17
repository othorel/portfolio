"use client";

import { useState, useEffect, useCallback } from "react";
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

  const fetchAll = useCallback(async () => {
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
  }, []);

  const markAsRead = useCallback(async (notificationId: number) => {
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
  }, []);

  const remove = useCallback(async (notificationId: number) => {
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
  }, []);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    notifications,
    loading,
    error,
    fetchAll,
    markAsRead,
    remove,
    addNotification,
  };
}
