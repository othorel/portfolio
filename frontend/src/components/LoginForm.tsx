"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de la connexion");
    } finally {
      setLoading(false);
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
      <p className="text-center text-gray-500 text-sm mt-2">
        Pas encore de compte ?{" "}
        <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">
          Inscrivez-vous
        </Link>
      </p>
    </form>
  );
}
