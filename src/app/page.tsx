import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectCard } from "@/components/sections/project-card";
import { StackSection } from "@/components/sections/stack-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroSection />
        <section id="work" className="page-shell work-section section-space">
          <SectionHeading number="01" label="Selected work" title="Built from end to end." description="Selected projects. Different product challenges, the same attention to the whole system." />
          <div className="projects-list">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
        </section>
        <StackSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
