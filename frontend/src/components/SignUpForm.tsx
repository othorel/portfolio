"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthManager } from "@/hooks/AuthManager";
import { validatePassword } from "@/utils/PasswordUtils";
import Link from "next/link";

export default function SignUpForm() {
  const [loginVal, setLoginVal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const router = useRouter();
  const { signup, loading, error } = useAuthManager();

  // Validation détaillée pour l'affichage dynamique
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  const hasMinLength = password.length >= 8;

  const isPasswordValid = validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError("Les mots de passe ne correspondent pas");
      return;
    }
    if (!isPasswordValid) {
      setLocalError("Le mot de passe ne respecte pas les règles.");
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

      {/* Règles du mot de passe */}
      <div className="text-sm text-gray-600">
        <p>Votre mot de passe doit contenir :</p>
        <ul className="list-disc list-inside">
          <li className={hasMinLength ? "text-green-600" : "text-red-500"}>
            {hasMinLength ? "✅" : "❌"} Minimum 8 caractères
          </li>
          <li className={hasUpper ? "text-green-600" : "text-red-500"}>
            {hasUpper ? "✅" : "❌"} Une majuscule
          </li>
          <li className={hasLower ? "text-green-600" : "text-red-500"}>
            {hasLower ? "✅" : "❌"} Une minuscule
          </li>
          <li className={hasNumber ? "text-green-600" : "text-red-500"}>
            {hasNumber ? "✅" : "❌"} Un chiffre
          </li>
          <li className={hasSpecial ? "text-green-600" : "text-red-500"}>
            {hasSpecial ? "✅" : "❌"} Un caractère spécial (!@#$%^&*)
          </li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={loading || !isPasswordValid || password !== confirmPassword}
        className={`py-2 rounded font-semibold transition ${
          loading || !isPasswordValid || password !== confirmPassword
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
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
