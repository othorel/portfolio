"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";

export function MinirtProject() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux projets
        </Link>
      </div>

      <header className="space-y-6 text-center flex flex-col items-center">
        <div className="relative w-64 h-64 mb-6">
          <Image
            src="/projects/minirt.png"
            alt="MiniRT logo"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Mini moteur 3D basé sur le <strong>raytracing</strong>.  
          Gestion des sphères, plans, cylindres, lumières et ombres avec rendu en temps réel en <strong>C</strong>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-300">🧠 About</h2>
        <p>
          <strong>MiniRT</strong> est un projet graphique du cursus 42 dont le but est de construire
          un moteur 3D minimaliste basé sur le raytracing.  
          Il permet de mieux comprendre la géométrie 3D, les vecteurs et les calculs d’intersection
          entre rayons et objets.
        </p>
        <p>
          Le projet utilise <strong>MiniLibX</strong> pour l’affichage et propose un rendu temps réel
          avec gestion basique de l’éclairage et des ombres portées.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-300">🛠️ Features</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-300">
          <li>Rendu par <strong>raytracing</strong> en temps réel</li>
          <li>Primitives : sphères, plans, cylindres</li>
          <li>Éclairage de type Lambertien</li>
          <li>Gestion des ombres portées</li>
          <li>Caméra paramétrable</li>
          <li>Parsing de scène depuis un fichier</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-300">⚙️ Tech Specs</h2>
        <div className="flex flex-wrap gap-2">
          {["C", "Raytracing", "Maths 3D", "MiniLibX", "Parsing"].map((tech, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <div className="text-center">
        <a
          href="https://github.com/othorel/miniRT#readme"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <Github className="w-5 h-5" />
          Voir le README
        </a>
      </div>
    </div>
  );
}
