import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectArchitecture({ project }: { project: Project }) {
  return (
    <>
      <div className="architecture-flow" data-layer-count={project.architectureLayers.length} aria-label={`Application layers: ${project.architectureLayers.map(layer => `${layer.label}: ${layer.technology}${layer.detail ? `, ${layer.detail}` : ""}`).join("; ")}`}>
        {project.architectureLayers.map((layer, index) => (
          <Fragment key={layer.label}>
            {index > 0 && <ArrowRight aria-hidden="true" />}
            <div><span className="eyebrow">{layer.label}</span><strong>{layer.technology}{layer.detail && <span>{layer.detail}</span>}</strong></div>
          </Fragment>
        ))}
      </div>
      {project.architectureServices && <ul className="architecture-services" aria-label="Supporting services">{project.architectureServices.map(service => <li key={service}>{service}</li>)}</ul>}
    </>
  );
}
