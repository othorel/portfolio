const proofItems = [
  {
    title: "End-to-end development",
    description:
      "Designing and building complete SaaS platforms, from database and backend logic to frontend interfaces.",
  },
  {
    title: "Complex systems",
    description:
      "Experience with authentication, onboarding workflows, document management and real-time features.",
  },
  {
    title: "Clean architecture",
    description:
      "Strong focus on maintainability, shared validation, and scalable code structure across the stack.",
  },
];

export function ProofSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 animate-in fade-in duration-500">
      <div className="grid gap-6 md:grid-cols-3">
        {proofItems.map((item) => (
          <div
            key={item.title}
            className="
              group relative overflow-hidden rounded-2xl
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
            {/* Gradient */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-transparent opacity-60" />

            {/* Glow */}
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Top line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <h3 className="text-lg font-medium text-foreground">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
