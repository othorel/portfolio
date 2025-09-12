"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const router = useRouter();
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: unknown) {
      setLocalError("Email ou mot de passe invalide");
      console.error("Erreur login:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

      {(localError || error) && (
        <p className="text-red-500 text-sm">{localError || error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`py-2 rounded font-semibold transition ${
          loading
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>

      <p className="text-center text-gray-500 text-sm mt-2">
        Pas encore de compte ?{" "}
        <Link
          href="/signup"
          className="text-indigo-600 font-semibold hover:underline"
        >
          Inscrivez-vous
        </Link>
      </p>
    </form>
  );
}
