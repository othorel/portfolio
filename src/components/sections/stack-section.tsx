import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardTitle } from "@/components/ui/card-title";

const stackGroups = [
  {
    title: "Frontend",
    description: "Clean, modern and maintainable interfaces.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend",
    description: "Robust APIs, business logic and data handling.",
    items: ["NestJS", "Node.js", "Prisma", "PostgreSQL"],
  },
  {
    title: "Architecture",
    description: "Structured, typed and scalable systems.",
    items: ["Monorepo", "Zod validation", "API design", "E2E testing"],
  },
];

export function StackSection() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        title="Stack"
        description="Technologies and patterns I use to build production-ready web applications."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {stackGroups.map((group) => (
          <div
            key={group.title}
            className="
              group relative flex flex-col overflow-hidden rounded-2xl
              border border-border/60
              bg-card/50
              p-8
              shadow-sm
              ring-1 ring-inset ring-white/5
              backdrop-blur-md
              transition-all duration-500
              hover:-translate-y-1
              hover:border-primary/40
              hover:bg-card/80
              hover:shadow-2xl hover:shadow-primary/10
            "
          >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-transparent opacity-60" />

            {/* Glow */}
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-16 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:bg-primary/20" />

            {/* Top line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* ✅ Title factorisé */}
            <CardTitle>{group.title}</CardTitle>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {group.description}
            </p>

            {/* Tags */}
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {group.items.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="
                    border border-border/40
                    bg-muted/30
                    text-muted-foreground
                    transition-colors
                    hover:border-primary/30
                    hover:bg-primary/5
                    hover:text-foreground
                  "
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
