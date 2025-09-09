"use client";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  return (
    <ul className="space-y-2">
      {users.map((u) => (
        <li key={u.id} className="border border-gray-200 rounded p-3 flex justify-between">
          <span>{u.name}</span>
          <span className="text-gray-500">{u.email}</span>
        </li>
      ))}
    </ul>
  );
}
