"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { normalizeAvatar } from "@/utils/NormalizeAvatar";

export default function ProfileInfo() {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("/avatars/default.png");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      const isDefault = !user.avatar || user.avatar.includes("/avatars/default.png");
      const normalized = isDefault ? "/avatars/default.png" : normalizeAvatar(user.avatar);
      setPreview(normalized);
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatar(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("email", email);
      if (password) formData.append("currentPassword", password);
      if (password) formData.append("password", password);
      if (avatar) formData.append("avatar", avatar);

      const token = localStorage.getItem("Token");
      const res = await fetch(`http://localhost:4000/users/${user.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        const updatedUser = { ...user, email, avatar: data.user.avatar || null };
        setUser(updatedUser);
        localStorage.setItem("User", JSON.stringify(updatedUser));
        const isDefault = !updatedUser.avatar || updatedUser.avatar.includes("/avatars/default.png");
        setPreview(isDefault ? "/avatars/default.png" : normalizeAvatar(updatedUser.avatar));
        setPassword("");
        setMessage("Profil mis à jour !");
      } else setMessage(data.message || "Erreur lors de la mise à jour");
    } catch {
      setMessage("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-xl shadow-md flex flex-col gap-6 text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-3">
          <img
            src={preview}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-2 border-indigo-500 cursor-pointer"
            onClick={() => document.getElementById("avatarInput")?.click()}
          />
          <input type="file" id="avatarInput" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </div>

        <div>
          <label className="block font-medium mb-1">Login</label>
          <input type="text" value={user.login} disabled className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white" />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white" />
        </div>

        {email !== user.email && (
          <div>
            <label className="block font-medium mb-1">Mot de passe actuel</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Saisissez votre mot de passe" className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white" />
          </div>
        )}

        <div>
          <label className="block font-medium mb-1">Rôle</label>
          <input type="text" value={user.role} disabled className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white" />
        </div>

        <button type="submit" disabled={loading} className="bg-indigo-500 hover:bg-indigo-600 transition-colors py-2 rounded font-semibold">
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </form>

      {message && <p className="text-center text-sm text-gray-300 mt-2">{message}</p>}
    </div>
  );
}
