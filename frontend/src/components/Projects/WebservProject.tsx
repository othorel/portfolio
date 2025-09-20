"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";

export function WebservProject() {
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
            src="/projects/webserv.png"
            alt="Webserv logo"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Serveur HTTP en <strong>C++98</strong> inspiré de Nginx.  
          Gestion des sockets, multiplexage avec <code>poll()</code>, support CGI et configuration personnalisée.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-300">🧠 About</h2>
        <p>
          <strong>Webserv</strong> est un projet système du cursus 42 visant à recréer un serveur web 
          minimaliste pour comprendre les bases du protocole HTTP, du multiplexage et des 
          architectures réseau.
        </p>
        <p>
          Développé en <strong>C++98</strong>, il implémente un système non-bloquant avec 
          <code> poll()</code>, gère des hôtes virtuels, le routage, et propose un support 
          partiel des scripts CGI.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-300">🛠️ Features</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-300">
          <li>Multiplexage non-bloquant avec <code>poll()</code></li>
          <li>Fichier de configuration type Nginx</li>
          <li>Support multi-ports et virtual hosting</li>
          <li>Méthodes HTTP : <code>GET</code>, <code>POST</code>, <code>DELETE</code></li>
          <li>CGI (Python, PHP)</li>
          <li>Autoindex et upload de fichiers</li>
          <li>Pages d’erreur et redirections personnalisées</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-300">⚙️ Tech Specs</h2>
        <div className="flex flex-wrap gap-2">
          {["C++98", "Sockets", "poll()", "CGI", "Linux", "Makefile"].map((tech, idx) => (
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
          href="https://github.com/othorel/Webserv#readme"
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
