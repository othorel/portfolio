import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProjectVisual } from "@/components/sections/project-visual";
import { ProjectArchitecture } from "@/components/sections/project-architecture";
import { SectionBlock } from "@/components/ui/section-block";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return project ? { title: `${project.title} — Olivier Thorel`, description: project.description } : { title: "Project not found — Olivier Thorel" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <>
      <Header />
      <main id="main" className="case-study page-shell">
        <Button asChild size="action" variant="outline"><Link href="/#work"><ArrowLeft aria-hidden="true" />Back to work</Link></Button>
        <section className="case-hero" aria-labelledby="project-title">
          <div>
            <p className="eyebrow section-kicker"><span>Case study</span>{project.caseLabel}</p>
            <h1 id="project-title">{project.title}<span className="accent-text">.</span></h1>
            <p className="case-summary">{project.description}</p>
          </div>
          <dl className="case-facts" data-has-website={Boolean(project.href)}>
            <div><dt>Project status</dt><dd><span className="project-status" data-live={project.status === "Live"}><span />{project.status}</span></dd></div>
            <div><dt>Scope</dt><dd>Full-stack application</dd></div>
            {project.href && <div><dt>Website</dt><dd><a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">{new URL(project.href).hostname}<ArrowUpRight /></a></dd></div>}
          </dl>
        </section>
        <ProjectVisual project={project} wide />
        <div className="case-layout">
          <aside className="case-sidebar" aria-label="Case study contents">
            <div className="case-sidebar-inner">
              <p className="eyebrow">In this study</p>
              <nav aria-label="Case study sections">
                <a href="#context">01 <span>Context & problem</span></a>
                <a href="#built">02 <span>What I built</span></a>
                <a href="#architecture">03 <span>Architecture</span></a>
                <a href="#decisions">04 <span>Technical decisions</span></a>
                <a href="#challenges">05 <span>Challenges</span></a>
                <a href="#outcome">06 <span>Outcome</span></a>
              </nav>
              <div className="case-sidebar-stack"><p className="eyebrow">Stack</p><ul>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>
            </div>
          </aside>
          <div className="case-body">
            <SectionBlock id="context" number="01" title="Context & problem"><p>{project.context}</p></SectionBlock>
            <SectionBlock id="built" number="02" title="What I built">
              <ol className="feature-list">{project.features.map((feature, index) => <li key={feature}><span className="feature-number">{String(index + 1).padStart(2, "0")}</span><p>{feature}</p></li>)}</ol>
            </SectionBlock>
            <SectionBlock id="architecture" number="03" title="Architecture">
              <p>{project.architecture}</p>
              <ProjectArchitecture project={project} />
            </SectionBlock>
            <SectionBlock id="decisions" number="04" title="Technical decisions">
              <ul className="decision-list">{project.decisions.map(decision => <li key={decision}><span className="small-cross" aria-hidden="true" /><p>{decision}</p></li>)}</ul>
            </SectionBlock>
            <SectionBlock id="challenges" number="05" title="Challenges"><p>{project.challenges}</p></SectionBlock>
            <SectionBlock id="outcome" number="06" title="Outcome">
              <p>{project.outcome}</p>
              {project.href && <Button asChild size="action" variant="outline" className="outcome-link"><a href={project.href} target="_blank" rel="noopener noreferrer">Visit {project.title}<ArrowUpRight aria-hidden="true" /></a></Button>}
            </SectionBlock>
          </div>
        </div>
        <div className="next-project"><span className="eyebrow">Next case study</span><Link href={`/${nextProject.slug}`}>{nextProject.title}<ArrowUpRight /></Link></div>
      </main>
      <Footer />
    </>
  );
}
