"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";

export function PortfolioProject() {
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
            src="/projects/logos/portfolio_logo.png"
            alt="Portfolio logo"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Mon portfolio fullstack, avec frontend Next.js/TailwindCSS et backend Express/Prisma/PostgreSQL.  
          Gestion complète des utilisateurs, relations entre amis et authentification JWT.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-300">🧠 About</h2>
        <p>
          Ce projet est mon portfolio interactif, permettant de présenter mes projets tout en offrant un espace collaboratif.
          J’ai construit un <strong>backend Dockerisé</strong> avec Express, Prisma ORM et PostgreSQL pour gérer les données utilisateurs.
        </p>
        <p>
          Le <strong>frontend</strong> est réalisé avec Next.js et TailwindCSS, avec gestion des utilisateurs, relations d’amis et modification de profil.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-300">🛠️ Features</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-300">
          <li>Gestion complète des utilisateurs (authentification JWT, création, modification, suppression)</li>
          <li>Relations d’amis et gestion de contacts</li>
          <li>Websocket pour les notifications en temps réel</li>
          <li>Interface moderne avec Next.js et TailwindCSS</li>
          <li>Mode responsive design</li>
          <li>Backend avec Prisma ORM et PostgreSQL, entièrement dockerisé</li>
          <li>API sécurisée et performante via Express</li>
          <li>Déploiement conteneurisé (frontend, backend, base de données)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-300">⚙️ Tech Specs</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Next.js",
            "TailwindCSS",
            "TypeScript",
            "Express",
            "Prisma ORM",
            "PostgreSQL",
            "Docker",
            "JWT",
          ].map((tech, idx) => (
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
          href="https://github.com/tonpseudo/portfolio"
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
