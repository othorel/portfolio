"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { normalizeAvatar } from "@/utils/NormalizeAvatar";
import { Bell, Check, X, Clock } from "lucide-react";
import { useNotificationsManager } from "@/hooks/NotificationsManager";
import { Notification } from "@/types/Notifications";
import { connectSocket } from "@/utils/Socket";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    notifications,
    loading: notifLoading,
    fetchAll: fetchNotifications,
    markAsRead,
    remove: removeNotification,
    addNotification,
  } = useNotificationsManager();

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  useEffect(() => {
    if (!user || !token)
      return;
    const socket = connectSocket(token);
    socket.on("new-notification", (notification: Notification) => {
      addNotification(notification);
    });
    return () => {
      socket.off("new-notification");
    };
  }, [user, token, addNotification]);

  useEffect(() => {
    if (!user)
      return;
    fetchNotifications();
  }, [user, fetchNotifications]);

  useEffect(() => {
    if (user)
      setAvatarUrl(normalizeAvatar(user.avatar));
    else 
      setAvatarUrl(null);
  }, [user]);

  const handleImgError = () => setAvatarUrl("/avatars/default.png");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationAction = async (notification: Notification) => {
    if (notification.message.includes("demande d'ami")) {
      router.push("/friends");
      setNotifOpen(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (!user) {
    return (
      <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Portfolio
        </Link>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Connexion
          </Link>
          <Link
            href="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Inscription
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-indigo-600">
        Portfolio
      </Link>

      <div className="flex items-center gap-6">
        <div className="relative" ref={notifRef}>
          <div
            className="relative cursor-pointer"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <Bell className="w-6 h-6 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-auto">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>

              {notifLoading ? (
                <div className="p-4 text-center">
                  <Clock className="w-5 h-5 animate-spin mx-auto text-gray-400" />
                </div>
              ) : notifications.length === 0 ? (
                <p className="p-4 text-sm text-gray-500 text-center">
                  Aucune notification
                </p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification: Notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                      onClick={() => handleNotificationAction(notification)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p
                            className={`text-sm ${
                              notification.read
                                ? "text-gray-600"
                                : "font-semibold text-gray-900"
                            }`}
                          >
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(notification.createdAt)}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-2">
                          {!notification.read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="p-1 hover:bg-green-100 rounded transition-colors"
                              title="Marquer comme lu"
                            >
                              <Check className="w-4 h-4 text-green-600" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                            title="Supprimer"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={menuRef}>
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500 hover:border-indigo-600 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              onError={handleImgError}
            />
          )}

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="p-2">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{user.login}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <button
                  onClick={() => {
                    router.push("/profile");
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                >
                  👤 Mon profil
                </button>

                <button
                  onClick={() => {
                    router.push("/friends");
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                >
                  👥 Collaborateurs
                </button>

                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1"
                >
                  🚪 Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
