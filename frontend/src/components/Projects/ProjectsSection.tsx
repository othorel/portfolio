"use client";

import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

const projects = [
  {
    slug: "webserv",
    description:
      "Serveur HTTP en C++98 inspiré de Nginx. Gestion des sockets, multiplexage avec poll(), parsing HTTP et configuration dynamique.",
    stack: ["C++98", "Sockets", "HTTP", "Linux"],
    image: "/projects/webserv.png",
    github: "https://github.com/othorel/Webserv",
  },
  {
    slug: "miniRT",
    description:
      "Mini moteur 3D basé sur le raytracing. Support des sphères, plans, cylindres, lumières et ombres avec rendu temps réel en C.",
    stack: ["C", "Raytracing", "Maths 3D", "MiniLibX"],
    image: "/projects/minirt.png",
    github: "https://github.com/othorel/miniRT",
  },
  {
    slug: "portfolio",
    description:
      "Application web fullstack pour présenter mes projets et gérer un espace collaboratif avec authentification JWT et Websocket pour notifications en temps réel.",
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL"],
    image: "/projects/logos/portfolio_logo.png",
    github: "https://github.com/tonpseudo/portfolio",
  },
];

export default function ProjectsSection() {
  return (
    <section className="w-full py-12 px-6">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Link
            key={i}
            href={`/projects/${project.slug}`}
            className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] transition-transform p-4 flex flex-col items-center"
          >
            <div className="relative w-48 h-48 mb-4 rounded-xl overflow-hidden">
              <Image
                src={project.image}
                alt="Project logo"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-sm text-gray-300 mb-4 text-center flex-1">
              {project.description}
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-indigo-600/20 text-indigo-300 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
              Code source
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
}
