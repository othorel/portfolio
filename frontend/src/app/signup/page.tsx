"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Créez votre compte
          </h2>
          <SignUpForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
