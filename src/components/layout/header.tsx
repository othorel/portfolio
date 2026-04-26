import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="rounded-full bg-gradient-to-br from-primary to-accent px-2 py-1 text-white shadow-sm">
            OT
          </span>
          <span className="hidden sm:inline">Olivier Thorel</span>
        </Link>

        {/* NAV */}
        <nav className="hidden items-center gap-2 md:flex">
          {[
            { href: "/#work", label: "Work" },
            { href: "/#stack", label: "Stack" },
            { href: "/#about", label: "About" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                rounded-full px-4 py-1.5 text-sm
                text-muted-foreground
                transition-all
                hover:bg-muted/40
                hover:text-foreground
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* GitHub */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border bg-card/60 hover:bg-card hover:border-primary/40"
            asChild
          >
            <a
              href="https://github.com/othorel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>

          {/* LinkedIn */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border bg-card/60 hover:bg-card hover:border-primary/40"
            asChild
          >
            <a
              href="https://www.linkedin.com/in/olivier-thorel-24a87b158/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="h-4 w-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </Button>
        </div>

      </div>
    </header>
  );
}
