"use client";

import Footer from "@/components/Footer";
import ProfileInfo from "@/components/Profile/ProfileInfo";
import ChangePassword from "@/components/Profile/ChangePassword";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 px-6 py-10">
        <div className="w-full max-w-2xl flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold text-center text-indigo-200 mb-4 drop-shadow-lg">
              Mon Profil
            </h1>
            <ProfileInfo />
          </div>

          <div className="flex flex-col gap-4">
            <ChangePassword />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
