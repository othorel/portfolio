"use client";

import { useState } from "react";

interface Props {
  onSubmit: (name: string, email: string) => void;
}

export default function UserForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    onSubmit(name, email);
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 flex-1"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 flex-1"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Ajouter
      </button>
    </form>
  );
}
