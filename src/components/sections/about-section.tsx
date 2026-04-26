import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid gap-12 md:grid-cols-2">
        {/* About */}
        <div>
          <SectionHeading
            title="About"
            description="Fullstack engineer focused on building real-world SaaS applications with clean architecture and strong product thinking."
          />

          <p className="mt-4 text-muted-foreground">
            I work across the entire stack, from modern frontend interfaces to
            backend systems and business logic. I value maintainability,
            scalability and simplicity.
          </p>
        </div>

        {/* Contact */}
        <div>
          <SectionHeading title="Contact" />

          <div className="mt-6 space-y-3 text-muted-foreground">
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/othorel"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground hover:underline underline-offset-4"
              >
                github.com/othorel
              </a>
            </p>

            <p>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/olivier-thorel-24a87b158/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground hover:underline underline-offset-4"
              >
                linkedin.com/in/olivier-thorel
              </a>
            </p>

            <p>
              Email:{" "}
              <a
                href="mailto:thorel.olivier@hotmail.com"
                className="transition-colors hover:text-foreground hover:underline underline-offset-4"
              >
                thorel.olivier@hotmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
