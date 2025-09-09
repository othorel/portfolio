import Link from "next/link";

export default function Hero() {
  return (
    <header className="flex-1 flex flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6">
      <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
        Bienvenue sur Project Collab
      </h2>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl">
        Collaborez facilement avec vos équipes, gérez vos utilisateurs et projets en toute simplicité.
      </p>
      <div className="flex gap-6">
        <Link
          href="/login"
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Se connecter
        </Link>
        <Link
          href="/signup"
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          S’inscrire
        </Link>
      </div>
    </header>
  );
}
