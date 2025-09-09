"use client";

import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";
import { useUserManager } from "@/hooks/useUserManager";

export default function UsersPage() {
  const { users, loading, error, addUser } = useUserManager();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des utilisateurs</h1>
      <UserForm onSubmit={addUser} />
      {loading && <p>Chargement des utilisateurs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <UserList users={users} />
    </div>
  );
}
