import { Badge } from "@/components/ui/badge";

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
    <section id="stack" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold">Stack</h2>
        <p className="mt-3 text-muted-foreground">
          Technologies and patterns I use to build production-ready web
          applications.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {stackGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border bg-card/50 p-6 transition hover:-translate-y-1 hover:bg-muted/40"
          >
            <h3 className="font-medium">{group.title}</h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {group.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} variant="secondary">
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
