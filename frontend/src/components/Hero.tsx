"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";

export default function Hero() {
  const { user } = useAuth();

  return (
    <header className="flex-1 flex flex-col items-center justify-center text-center px-6 text-white bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500">
      {user ? (
        <>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            Bienvenue <span className="text-indigo-300">{user.login}</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Explorez vos projets, votre profil et vos amis dans cette démo technique.
          </p>
          <div className="flex gap-4 flex-wrap justify-center mb-6">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-full bg-white text-indigo-600 font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform"
            >
              Voir mes projets
            </Link>

            <Link
              href="/profile"
              className="px-6 py-3 rounded-full bg-white text-indigo-600 font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform"
            >
              Mon profil
            </Link>

            <Link
              href="/friends"
              className="px-6 py-3 rounded-full bg-white text-indigo-600 font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform"
            >
              Mes amis
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/images/profile.jpeg"
              alt="Photo de profil d’Olivier"
              width={160}
              height={160}
              className="rounded-full shadow-lg border-4 border-white object-cover mb-4 hover:scale-105 transition-transform duration-300"
            />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
              <span className="text-indigo-300">Olivier Thorel</span>
            </h2>
          </div>

          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Étudiant à l’école 42 et en reconversion professionnelle, 
            je me passionne pour le développement web et la création 
            d’applications.  
            Bienvenue sur mon site vitrine & démo technique.
          </p>

          <div className="flex gap-4 flex-wrap justify-center mb-6">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-full bg-white text-indigo-600 font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform"
            >
              Voir mes projets
            </Link>
            <a
              href="/signup"
              className="px-6 py-3 rounded-full bg-white text-indigo-600 font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform"
            >
              Inscrivez-vous
            </a>
          </div>
        </>
      )}

      <div className="flex gap-8 mt-6 justify-center">
        <a
          href="/cv/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-5xl text-white hover:text-gray-200 transition"
        >
          <FaFileAlt />
        </a>
        <a
          href="https://github.com/othorel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-5xl text-white hover:text-gray-200 transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/olivier-thorel-24a87b158/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-5xl text-white hover:text-gray-200 transition"
        >
          <FaLinkedin />
        </a>
      </div>
    </header>
  );
}
