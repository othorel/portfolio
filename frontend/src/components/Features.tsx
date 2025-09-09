export default function Features() {
  const features = [
    {
      title: "Gestion des utilisateurs",
      desc: "Ajoutez, modifiez et supprimez facilement les utilisateurs de votre plateforme.",
    },
    {
      title: "Collaboration en temps réel",
      desc: "Travaillez avec vos équipes en temps réel sur vos projets et tâches.",
    },
    {
      title: "Tableaux de bord",
      desc: "Suivez vos projets et performances grâce à des dashboards clairs et intuitifs.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 text-gray-800 px-6">
      <h3 className="text-3xl font-bold text-center mb-12">Fonctionnalités</h3>
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
