import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectCard } from "@/components/sections/project-card";
import { ProofSection } from "@/components/sections/proof-section";
import { StackSection } from "@/components/sections/stack-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";

type SectionSeparatorProps = {
  variant?: "soft" | "accent";
};

function SectionSeparator({ variant = "accent" }: SectionSeparatorProps) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div
        className={
          variant === "soft"
            ? "h-px w-full bg-gradient-to-r from-transparent via-border to-transparent opacity-60"
            : "h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        }
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary/30">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[62rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.15] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <HeroSection />

        <ProofSection />

        <section
          id="work"
          className="mx-auto max-w-6xl px-6 py-24 animate-in fade-in duration-500 sm:py-32"
        >
          <SectionHeading
            title="Selected Work"
            description="A selection of fullstack projects focused on real-world product challenges and scalable architecture."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                tags={project.tags}
                slug={project.slug}
              />
            ))}
          </div>
        </section>

        <SectionSeparator />

        <StackSection />

        <SectionSeparator />

        <AboutSection />
      </main>

      <Footer />
    </>
  );
}
