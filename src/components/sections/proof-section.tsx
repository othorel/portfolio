export function ProofSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-card/50 p-6">
          <h3 className="text-lg font-medium">End-to-end development</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Designing and building complete SaaS platforms, from database and
            backend logic to frontend interfaces.
          </p>
        </div>

        <div className="rounded-2xl border bg-card/50 p-6">
          <h3 className="text-lg font-medium">Complex systems</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Experience with authentication, onboarding workflows, document
            management and real-time features.
          </p>
        </div>

        <div className="rounded-2xl border bg-card/50 p-6">
          <h3 className="text-lg font-medium">Clean architecture</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Strong focus on maintainability, shared validation, and scalable
            code structure across the stack.
          </p>
        </div>
      </div>
    </section>
  );
}
