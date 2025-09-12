"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { changePassword } from "@/api/profile";

export default function ChangePassword() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const msg = await changePassword(user.id, currentPassword, newPassword);
      setMessage(msg);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      if (err instanceof Error)
        setMessage(err.message);
      else
        setMessage("Erreur lors de la mise à jour du mot de passe.");
    } finally {
      setLoading(false);
    }
  };

  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSpecial = /[!@#$%^&*]/.test(newPassword);
  const hasMinLength = newPassword.length >= 8;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">Changer le mot de passe</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Mot de passe actuel"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
          required
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
          required
        />

        {newPassword && (
          <ul className="text-sm text-gray-600 list-disc list-inside">
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
        )}

        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </form>
      {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
    </div>
  );
}
