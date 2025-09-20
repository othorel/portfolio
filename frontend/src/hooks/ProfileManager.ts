"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/User";
import { useAuth } from "@/context/AuthContext";
import { updateMyProfile, changePassword } from "@/api/profile";

export function useProfileManager() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setError(null);
      setSuccess(null);
    }
  }, [user]);

  const updateProfile = async (email?: string, avatar?: File) => {
    if (!user)
      return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const updatedUser: User = await updateMyProfile(user.id, { email, avatar });
      setUser(updatedUser);
      setSuccess("Profil mis à jour !");
      return updatedUser;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de la mise à jour du profil");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    if (!user)
      return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const message = await changePassword(user.id, currentPassword, newPassword);
      setSuccess(message || "Mot de passe changé !");
      return message;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors du changement de mot de passe");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    success,
    updateProfile,
    updatePassword,
  };
}
