import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectCard } from "@/components/sections/project-card";
import { ProofSection } from "@/components/sections/proof-section";
import { StackSection } from "@/components/sections/stack-section";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen bg-background text-foreground">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.18),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] mask-[linear-gradient(to_bottom,black,transparent_70%)]" />
        </div>

        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground backdrop-blur">
              Fullstack Engineer · SaaS & Architecture
            </div>

            <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Olivier Thorel
              <span className="block text-muted-foreground">
                Fullstack SaaS Developer.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              I build production-ready web platforms with clean architecture,
              strong typing and scalable user interfaces.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" asChild>
                <a href="#work">View selected work</a>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/othorel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>

        <ProofSection />

        <section id="work" className="mx-auto max-w-6xl px-6 pb-24 animate-in fade-in duration-700">
          <SectionHeading
            title="Selected Work"
            description="A selection of fullstack projects focused on real-world product and architecture challenges."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
                slug={project.slug}
              />
            ))}
          </div>
        </section>

        <StackSection />
        <AboutSection />
      </main>

      <Footer />
    </>
  );
}
