const proofItems = [
  {
    title: "From backend to frontend",
    description:
      "Building complete SaaS platforms, from database design and backend logic to high-quality user interfaces.",
  },
  {
    title: "Handling real-world complexity",
    description:
      "Experience with authentication, onboarding flows, document workflows and real-time features in production-like systems.",
  },
  {
    title: "Designed for scalability",
    description:
      "Strong focus on maintainable architecture, shared validation and scalable systems across the entire stack.",
  },
];

export function ProofSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 animate-in fade-in duration-500">
      <div className="grid gap-6 md:grid-cols-3">
        {proofItems.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-8 shadow-sm ring-1 ring-inset ring-white/5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10"
          >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-transparent opacity-60" />
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-16 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:bg-primary/20" />

            {/* Top glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Title + gradient */}
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              <span className="transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent">
                {item.title}
              </span>
            </h3>

            {/* ✅ Barre sous titre */}
            <div className="mt-4 h-px w-12 bg-gradient-to-r from-primary to-accent opacity-50 transition-all duration-500 group-hover:w-24 group-hover:opacity-100" />

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
