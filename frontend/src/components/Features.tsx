import { FaUser, FaUsers, FaLaptopCode, FaBell } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      title: "Gestion des utilisateurs",
      desc: "Implémentation complète d’authentification JWT, gestion de profil, et sécurisation des données avec Prisma et PostgreSQL.",
      icon: <FaUser className="text-4xl text-indigo-500 mb-4" />,
    },
    {
      title: "Relations et collaborations",
      desc: "Système de relations amis et collaboration entre utilisateurs, démontrant la gestion de relations complexes en base de données.",
      icon: <FaUsers className="text-4xl text-indigo-500 mb-4" />,
    },
    {
      title: "Applications web modernes",
      desc: "Développement de dashboards interactifs et responsive avec Next.js et TailwindCSS, optimisés pour performance et UX.",
      icon: <FaLaptopCode className="text-4xl text-indigo-500 mb-4" />,
    },
    {
      title: "Notifications en temps réel",
      desc: "Mise en place d’un système de notifications via WebSocket pour offrir une expérience utilisateur réactive et interactive.",
      icon: <FaBell className="text-4xl text-indigo-500 mb-4" />,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 text-gray-800 px-6">
      <h3 className="text-3xl font-bold text-center mb-12">Mes compétences & réalisations</h3>
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform flex flex-col items-center text-center"
          >
            {f.icon}
            <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
            <p className="text-gray-700">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
