"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { normalizeAvatar } from "@/utils/NormalizeAvatar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (user) {
      setAvatarUrl(normalizeAvatar(user.avatar));
    } else {
      setAvatarUrl(null);
    }
  }, [user]);

  const handleImgError = () => setAvatarUrl("/avatars/default.png");

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
    </nav>
  );
}
