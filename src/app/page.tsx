import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectCard } from "@/components/sections/project-card";
import { ProofSection } from "@/components/sections/proof-section";
import { StackSection } from "@/components/sections/stack-section";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";

type SectionSeparatorProps = {
  variant?: "soft" | "accent";
};

function SectionSeparator({ variant = "accent" }: SectionSeparatorProps) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <Separator
        className={
          variant === "soft"
            ? "bg-gradient-to-r from-transparent via-border to-transparent"
            : "bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        }
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[62rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_45%,transparent_100%)]" />
        </div>

        <HeroSection />

        <ProofSection />

        <SectionSeparator variant="soft" />

        <section
          id="work"
          className="mx-auto max-w-6xl px-6 py-24 animate-in fade-in duration-500"
        >
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

        <SectionSeparator />

        <StackSection />

        <SectionSeparator />

        <AboutSection />
      </main>

      <Footer />
    </>
  );
}
