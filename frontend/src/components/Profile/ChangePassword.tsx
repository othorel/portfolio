"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

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
      const res = await fetch(`/api/user/${user.id}/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Mot de passe mis à jour !");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.message || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

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
