// Toutes les fonctions pour communiquer avec le backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`);
  const data = await res.json();
  if (!res.ok)
    throw new Error(`HTTP error! status: ${res.status}`);
  return data.users ?? [];
}

export async function createUser(name: string, email: string) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  const data = await res.json();
  if (!res.ok)
    throw new Error(`HTTP error! status: ${res.status}`);
  return data.user;
}
