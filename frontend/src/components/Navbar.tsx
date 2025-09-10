"use client";

import Link from "next/link";
import { useAuthManager } from "@/hooks/AuthManager";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuthManager();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">Project Collab</h1>

      {!user ? (
        <div className="flex gap-4">
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
          <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      ) : (
        <div
          className="relative"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <img
            src={user.avatar || "/avatars/default.png"}
            alt="Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg p-2">
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Mon profil
              </Link>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
