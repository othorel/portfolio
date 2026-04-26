import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/sections/project-card";
import { StackSection } from "@/components/sections/stack-section";
import { AboutSection } from "@/components/sections/about-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen bg-background text-foreground">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.18),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] mask-[linear-gradient(to_bottom,black,transparent_70%)]" />
        </div>

        {/* HERO */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground backdrop-blur">
              Fullstack Engineer
            </div>

            <h1 className="mt-8 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Olivier Thorel
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              I design and build scalable SaaS applications with modern
              architecture, from clean frontend interfaces to robust backend
              systems.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Button size="lg" asChild>
                <a href="#work">View Work</a>
              </Button>

              <Button variant="ghost" size="lg" asChild>
                <a href="https://github.com/othorel" target="_blank">
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="mx-auto max-w-6xl px-6 pb-24">
          <h2 className="text-2xl font-semibold">Selected Work</h2>

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
