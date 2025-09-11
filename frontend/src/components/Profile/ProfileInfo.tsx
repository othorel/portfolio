"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfileInfo() {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("/avatars/default.png");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setPreview(
        user.avatar
          ? user.avatar.startsWith("http")
            ? user.avatar
            : `http://localhost:4000${user.avatar}`
          : "/avatars/default.png"
      );
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
        setPreview(
          updatedUser.avatar
            ? `http://localhost:4000${updatedUser.avatar}`
            : "/avatars/default.png"
        );
        setMessage("Profil mis à jour !");
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

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-3">
          <img
            src={preview}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-2 border-indigo-500 cursor-pointer"
            onClick={() => document.getElementById("avatarInput")?.click()}
          />
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-800 mb-1">Login</label>
          <input
            type="text"
            value={user.login}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-800"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-800 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-800 mb-1">Rôle</label>
          <input
            type="text"
            value={user.role}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-800"
          />
        </div>

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
