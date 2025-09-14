"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { normalizeAvatar } from "@/utils/NormalizeAvatar";
import { Bell } from "lucide-react";
import { useNotificationsManager } from "@/hooks/NotificationsManager";
import { Notification } from "@/types/Notifications";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    notifications,
    fetchAll: fetchNotifications,
    markAsRead,
    remove: removeNotification,
  } = useNotificationsManager();

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  // Polling notifications toutes les 10 secondes
  useEffect(() => {
    if (!user) return;
    fetchNotifications(); // fetch initial
    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);
    return () => clearInterval(interval);
  }, [user]);

  // Gestion avatar
  useEffect(() => {
    if (user) setAvatarUrl(normalizeAvatar(user.avatar));
    else setAvatarUrl(null);
  }, [user]);

  const handleImgError = () => setAvatarUrl("/avatars/default.png");

  // Gestion clics à l'extérieur
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

  if (!user) {
    return (
      <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Project Collab
        </Link>
        <div className="flex gap-4">
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
          <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-indigo-600">
        Project Collab
      </Link>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <Bell
            className="w-6 h-6 cursor-pointer text-gray-700"
            onClick={() => setNotifOpen(!notifOpen)}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-lg p-2 z-50 max-h-96 overflow-auto">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500">Pas de notifications</p>
              ) : (
                notifications.map((n: Notification) => (
                  <div
                    key={n.id}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 rounded"
                  >
                    <span className={`text-sm ${n.read ? "text-gray-400" : "font-semibold"}`}>
                      {n.message}
                    </span>
                    <div className="flex gap-1">
                      {!n.read && (
                        <button
                          onClick={() => markAsRead(n.id)}
                          className="text-green-500 hover:underline text-xs"
                        >
                          Marquer lu
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(n.id)}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="relative" ref={menuRef}>
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
              onClick={() => setMenuOpen(!menuOpen)}
              onError={handleImgError}
            />
          )}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg p-2 z-50">
              <button
                onClick={() => { router.push("/profile"); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Mon profil
              </button>
              <button
                onClick={() => { router.push("/friends"); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Collaborateurs
              </button>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
