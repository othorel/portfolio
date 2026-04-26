import { SectionHeading } from "@/components/ui/section-heading";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const focusItems = [
  "Product-driven interfaces",
  "Typed fullstack architecture",
  "Scalable SaaS workflows",
];

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        title="About"
        description="Who I am, what I focus on and how to reach me."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-8 shadow-sm ring-1 ring-inset ring-border/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-accent/20 hover:shadow-2xl hover:shadow-black/40">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-transparent opacity-60" />
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <h3 className="text-lg font-medium text-foreground">About</h3>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            I design and build production-ready systems across the entire stack,
            from frontend interfaces to backend architecture and business logic.
          </p>
        </div>

        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-8 shadow-sm ring-1 ring-inset ring-border/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-accent/20 hover:shadow-2xl hover:shadow-black/40">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-transparent opacity-60" />
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <h3 className="text-lg font-medium text-foreground">Focus</h3>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {focusItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-8 shadow-sm ring-1 ring-inset ring-border/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-accent/20 hover:shadow-2xl hover:shadow-black/40">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-transparent opacity-60" />
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <h3 className="text-lg font-medium text-foreground">Contact</h3>

          <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            <a
              href="https://github.com/othorel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-foreground"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/olivier-thorel-24a87b158/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-foreground"
            >
              <FaLinkedin className="h-4 w-4" />
              LinkedIn
            </a>

            <a
              href="mailto:thorel.olivier@hotmail.com"
              className="flex items-center gap-2 transition hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
