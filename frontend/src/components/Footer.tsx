import Link from "next/link";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 text-center py-8 mt-auto">
      <div className="flex justify-center gap-6 mb-4">
        <a
          href="/cv/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-gray-400 transition"
        >
          <FaFileAlt />
        </a>
        <a
          href="https://github.com/othorel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-gray-400 transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/olivier-thorel-24a87b158/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-gray-400 transition"
        >
          <FaLinkedin />
        </a>
      </div>

      <p className="text-sm mb-2">
        &copy; {new Date().getFullYear()} Olivier Thorel – Portfolio. Tous droits réservés.
      </p>

      <p className="text-sm">
        <Link href="/privacy" className="text-indigo-400 hover:underline">
          Politique de confidentialité
        </Link>
      </p>
    </footer>
  );
}
