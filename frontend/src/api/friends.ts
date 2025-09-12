import { apiFetch } from "../utils/ApiManager";
import { User } from "../types/User";
import { Friendship } from "../types/Friendship";

export async function addFriend(friendLogin: string) {
  const data = await apiFetch<{ friendship: Friendship }>("/friends/add", {
    method: "POST",
    body: JSON.stringify({ friendLogin }),
  });
  return data.friendship;
}

export async function acceptFriend(friendId: number) {
  const data = await apiFetch<{ friendship: Friendship }>("/friends/accept", {
    method: "POST",
    body: JSON.stringify({ friendId }),
  });
  return data.friendship;
}

export async function rejectFriend(friendId: number) {
  const data = await apiFetch<{ friendship: Friendship }>("/friends/reject", {
    method: "POST",
    body: JSON.stringify({ friendId }),
  });
  return data.friendship;
}

export async function removeFriend(friendId: number) {
  await apiFetch("/friends/remove", {
    method: "POST",
    body: JSON.stringify({ friendId }),
  });
}

export async function getFriends() {
  const data = await apiFetch<{ friends: User[] }>("/friends");
  return data.friends ?? [];
}

export async function getPendingRequests() {
  const data = await apiFetch<{ requests: Friendship[] }>("/friends/requests");
  return data.requests ?? [];
}

