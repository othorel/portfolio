import { SectionHeading } from "@/components/ui/section-heading";
import { CardTitle } from "@/components/ui/card-title";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const focusItems = [
  "Product-driven interfaces",
  "Typed fullstack architecture",
  "Scalable SaaS workflows",
];

const cardClassName =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-8 shadow-sm ring-1 ring-inset ring-white/5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10";

function CardDecorations() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-transparent opacity-60" />
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-16 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:bg-primary/20" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        title="About"
        description="Who I am, what I build, and how to reach me."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className={cardClassName}>
          <CardDecorations />

          <CardTitle>About</CardTitle>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            I design and build production-ready systems across the entire stack,
            from frontend interfaces to backend architecture and business logic.
          </p>
        </div>

        <div className={cardClassName}>
          <CardDecorations />

          <CardTitle>Focus</CardTitle>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {focusItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={cardClassName}>
          <CardDecorations />

          <CardTitle>Contact</CardTitle>

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
