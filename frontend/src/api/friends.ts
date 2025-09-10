import { apiFetch } from "../utils/ApiManager";
import { User } from "../types/User";

export async function addFriend(userId: number) {
  const data = await apiFetch<{ user: User }>(`/friends/add`, {
    method: "POST",
    body: JSON.stringify({ friendId: userId }),
  });
  return data.user;
}

export async function removeFriend(userId: number) {
  const data = await apiFetch<{ user: User }>(`/friends/remove`, {
    method: "POST",
    body: JSON.stringify({ friendId: userId }),
  });
  return data.user;
}

export async function getFriends(userId: number) {
  const data = await apiFetch<{ friends: User[] }>(`/friends/${userId}`);
  return data.friends ?? [];
}
