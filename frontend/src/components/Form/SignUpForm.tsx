"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { validatePassword } from "@/utils/PasswordUtils";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUpForm() {
  const [loginVal, setLoginVal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();
  const { signup, loading, error } = useAuth();

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
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-xl shadow-md flex flex-col gap-6 text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Login"
          value={loginVal}
          onChange={(e) => setLoginVal(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
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

        <div className="relative w-full">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {(localError || error) && (
          <p className="text-red-500 text-sm">{localError || error}</p>
        )}

        {password && (
          <ul className="text-sm list-disc list-inside text-gray-300">
            <li className={hasMinLength ? "text-green-500" : "text-red-500"}>
              {hasMinLength ? "✅" : "❌"} Minimum 8 caractères
            </li>
            <li className={hasUpper ? "text-green-500" : "text-red-500"}>
              {hasUpper ? "✅" : "❌"} Une majuscule
            </li>
            <li className={hasLower ? "text-green-500" : "text-red-500"}>
              {hasLower ? "✅" : "❌"} Une minuscule
            </li>
            <li className={hasNumber ? "text-green-500" : "text-red-500"}>
              {hasNumber ? "✅" : "❌"} Un chiffre
            </li>
            <li className={hasSpecial ? "text-green-500" : "text-red-500"}>
              {hasSpecial ? "✅" : "❌"} Un caractère spécial (!@#$%^&*)
            </li>
          </ul>
        )}

        <button
          type="submit"
          disabled={loading || !isPasswordValid || password !== confirmPassword}
          className="bg-indigo-500 hover:bg-indigo-600 transition-colors py-2 rounded font-semibold"
        >
          {loading ? "Inscription..." : "S’inscrire"}
        </button>

        <p className="text-center text-gray-300 text-sm mt-2">
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="text-indigo-400 font-semibold hover:underline"
          >
            Connectez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}
