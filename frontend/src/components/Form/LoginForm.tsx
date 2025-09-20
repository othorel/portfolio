"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-xl shadow-md flex flex-col gap-6 text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {(localError || error) && (
          <p className="text-red-500 text-sm">{localError || error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 transition-colors py-2 rounded font-semibold"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p className="text-center text-gray-300 text-sm mt-2">
          Pas encore de compte ?{" "}
          <Link
            href="/signup"
            className="text-indigo-400 font-semibold hover:underline"
          >
            Inscrivez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}
