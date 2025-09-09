import NavButton from "@/components/NavButton";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur Project Collab 🚀</h1>
      <p className="text-lg text-gray-600">Ceci est la page d’accueil.</p>

      <NavButton href="/login" label="Aller à la page de login" />
    </div>
  );
}
