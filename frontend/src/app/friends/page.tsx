"use client";

import ProfileFriends from "@/components/Friends/Friends";

export default function FriendsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                     bg-cover bg-no-repeat py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-200 mb-6 drop-shadow-lg">
          Gestion des collaborateurs
        </h1>
        <ProfileFriends />
      </div>
    </main>
  );
}
