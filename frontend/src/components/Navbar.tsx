import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">Project Collab</h1>
      <div className="flex gap-4">
        <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
          Login
        </Link>
        <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
