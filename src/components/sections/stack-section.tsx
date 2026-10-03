import { SectionHeading } from "@/components/ui/section-heading";

const stackGroups = [
  { title: "Frontend", description: "Clean, modern and maintainable interfaces.", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
  { title: "Backend", description: "Robust APIs, business logic and data handling.", items: ["NestJS", "Node.js", "Prisma", "PostgreSQL"] },
  { title: "Architecture", description: "Structured, typed and scalable systems.", items: ["Monorepo", "Zod validation", "API design", "Socket.IO / WebSockets", "E2E testing"] },
];

export function StackSection() {
  return (
    <section id="stack" className="stack-section section-space">
      <div className="page-shell">
        <SectionHeading number="02" label="Tools & practice" title="The stack, connected." description="Technologies and patterns I use to build production-ready web applications." />
        <div className="stack-columns">
          {stackGroups.map((group, index) => (
            <div key={group.title} className="stack-column">
              <div className="stack-category"><span className="eyebrow accent-text">0{index + 1}</span><h3>{group.title}</h3></div>
              <p>{group.description}</p>
              <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="stack-note"><span className="small-cross" aria-hidden="true" /><p>Shared types and validation keep the interface and API contracts aligned.</p></div>
      </div>
    </section>
  );
}
