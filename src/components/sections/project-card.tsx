import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectVisual } from "@/components/sections/project-visual";
import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  project: (typeof projects)[number];
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-feature" data-reversed={index % 2 === 1}>
      <Link href={`/${project.slug}`} className="project-visual-link" aria-label={`Read the ${project.title} case study`}><ProjectVisual project={project} /></Link>
      <div className="project-copy">
        <div className="project-meta"><span className="eyebrow">0{index + 1} / {project.category}</span><span className="project-status" data-live={project.status === "Live"}><span />{project.status}</span></div>
        <h3><Link href={`/${project.slug}`}>{project.title}<ArrowUpRight aria-hidden="true" /></Link></h3>
        <p className="project-description">{project.description}</p>
        <div className="project-contribution"><span className="eyebrow">What I built</span><p>{project.highlights.join(" · ")}</p></div>
        <p className="project-stack">{project.tags.join(" / ")}</p>
        <div className="project-links">
          <Button asChild size="action" variant="secondary"><Link href={`/${project.slug}`}>Read case study <ArrowUpRight aria-hidden="true" /></Link></Button>
          {project.href && <Button asChild size="action" variant="outline"><a href={project.href} target="_blank" rel="noopener noreferrer">Visit project <ArrowUpRight aria-hidden="true" /></a></Button>}
        </div>
      </div>
    </article>
  );
}
