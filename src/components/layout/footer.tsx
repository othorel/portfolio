import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        
        {/* LEFT */}
        <span className="text-xs sm:text-sm">
          © {new Date().getFullYear()} Olivier Thorel
        </span>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/othorel"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center gap-2 rounded-full
              border border-border
              bg-card/60
              px-3 py-1.5
              transition-all
              hover:bg-card
              hover:border-primary/40
            "
          >
            <FaGithub className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/olivier-thorel-24a87b158/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center gap-2 rounded-full
              border border-border
              bg-card/60
              px-3 py-1.5
              transition-all
              hover:bg-card
              hover:border-primary/40
            "
          >
            <FaLinkedin className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          <a
            href="mailto:thorel.olivier@hotmail.com"
            className="
              group flex items-center gap-2 rounded-full
              border border-border
              bg-card/60
              px-3 py-1.5
              transition-all
              hover:bg-card
              hover:border-primary/40
            "
          >
            <Mail className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
            <span className="hidden sm:inline">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
