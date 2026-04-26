import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">
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

        {/* CTA */}
        <Button
          variant="outline"
          size="sm"
          className="
            gap-2
            border-border
            bg-card/60
            hover:bg-card
            hover:border-primary/40
          "
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
      </div>
    </header>
  );
}
