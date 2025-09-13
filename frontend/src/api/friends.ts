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

export async function acceptFriend(friendLogin: string) {
  const data = await apiFetch<{ friendship: Friendship }>("/friends/accept", {
    method: "PATCH",
    body: JSON.stringify({ friendLogin }),
  });
  return data.friendship;
}

export async function rejectFriend(friendLogin: string) {
  const data = await apiFetch<{ friendship: Friendship }>("/friends/reject", {
    method: "PATCH",
    body: JSON.stringify({ friendLogin }),
  });
  return data.friendship;
}

export async function removeFriend(friendLogin: string) {
  await apiFetch("/friends/remove", {
    method: "DELETE",
    body: JSON.stringify({ friendLogin }),
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

export async function getUserWithFriends(login: string) {
  const data = await apiFetch<{ user: User & { friends: User[] } }>(`/friends/user?login=${encodeURIComponent(login)}`);
  return data.user;
}
