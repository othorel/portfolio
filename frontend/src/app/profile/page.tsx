"use client";

import ProfileInfo from "@/components/Profile/ProfileInfo";
import ChangePassword from "@/components/Profile/ChangePassword";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
                     bg-cover bg-no-repeat py-10 px-4 flex flex-col items-center gap-10">
      <div className="w-full max-w-2xl flex flex-col gap-10">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-4">
            Mon Profil
          </h1>
          <ProfileInfo />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          <ChangePassword />
        </div>
      </div>
    </main>
  );
}
