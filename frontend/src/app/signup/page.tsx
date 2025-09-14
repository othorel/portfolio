"use client";

import Footer from "@/components/Footer";
import SignUpForm from "@/components/Form/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-10">
        <div className="max-w-md w-full bg-gray-800 p-6 rounded-xl shadow-md text-white">
          <h2 className="text-3xl font-bold text-center text-indigo-200 mb-6">
            Inscription
          </h2>
          <SignUpForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
