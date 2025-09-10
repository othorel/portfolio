"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthManager } from "@/hooks/AuthManager";
import Link from "next/link";

export default function SignUpForm() {
  const [loginVal, setLoginVal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const router = useRouter();
  const { signup, loading, error } = useAuthManager();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await signup(loginVal, email, password);
      router.push("/login");
    } catch (err) {
      console.error("Erreur signup:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Login"
        value={loginVal}
        onChange={(e) => setLoginVal(e.target.value)}
        className="border rounded px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />
      <input
        type="password"
        placeholder="Confirmez le mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border rounded px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />

      {(localError || error) && (
        <p className="text-red-500 text-sm">{localError || error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
      >
        {loading ? "Inscription..." : "S’inscrire"}
      </button>

      <p className="text-center text-gray-500 text-sm mt-2">
        Déjà un compte ?{" "}
        <Link
          href="/login"
          className="text-indigo-600 font-semibold hover:underline"
        >
          Connectez-vous
        </Link>
      </p>
    </form>
  );
}
