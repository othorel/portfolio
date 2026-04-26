import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";

const stackGroups = [
  {
    title: "Frontend",
    description: "Interfaces clean, modernes et maintenables.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend",
    description: "APIs robustes, logique métier et données.",
    items: ["NestJS", "Node.js", "Prisma", "PostgreSQL"],
  },
  {
    title: "Architecture",
    description: "Code structuré, typé et scalable.",
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
              border border-border
              bg-card/70
              p-8
              shadow-sm
              ring-1 ring-inset ring-border/40
              backdrop-blur-md
              transition-all duration-500
              hover:-translate-y-1
              hover:bg-accent/20
              hover:border-primary/40
              hover:shadow-2xl hover:shadow-black/40
            "
          >
            {/* Subtle gradient */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-transparent opacity-60" />

            {/* Glow */}
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <h3 className="text-lg font-medium text-foreground">
              {group.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {group.description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {group.items.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="
                    border border-border
                    bg-muted/40
                    text-muted-foreground
                    transition-colors
                    hover:border-primary/30
                    hover:bg-accent/30
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
