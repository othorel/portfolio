import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight transition-colors hover:text-muted-foreground"
        >
          Olivier Thorel
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link
            href="/#work"
            className="transition-colors hover:text-foreground"
          >
            Work
          </Link>
          <Link
            href="/#stack"
            className="transition-colors hover:text-foreground"
          >
            Stack
          </Link>
          <Link
            href="/#about"
            className="transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>

        <Button variant="outline" size="sm" asChild>
          <a
            href="https://github.com/othorel"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </Button>
      </div>
    </header>
  );
}
