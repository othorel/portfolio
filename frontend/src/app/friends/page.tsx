"use client";

import Footer from "@/components/Footer";
import ProfileFriends from "@/components/Friends/Friends";

export default function FriendsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 px-6 py-10">
        <div className="w-full max-w-4xl flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold text-center text-indigo-200 mb-6 drop-shadow-lg">
            Gestion des collaborateurs
          </h1>
          <ProfileFriends />
        </div>
      </main>
      <Footer />
    </div>
  );
}
