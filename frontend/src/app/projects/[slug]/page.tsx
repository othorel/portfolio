"use client";

import Image from "next/image";
import { Github } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MarkdownImage } from "@/utils/MarkdownImage";
import { Project } from "@/types/Project";
import { PageProps } from "@/types/Page";
import { WebservProject } from "@/components/Projects/WebservProject";
import { MinirtProject } from "@/components/Projects/MinirtProject";
import { PortfolioProject } from "@/components/Projects/PortfolioProject";

const projects: Project[] = [
  {
    slug: "webserv",
    title: "Webserv (42)",
    image: "/projects/webserv/webserv.png",
    github: "https://github.com/othorel/Webserv",
  },
  {
    slug: "miniRT",
    title: "MiniRT (42)",
    image: "/projects/minirt.png",
    github: "https://github.com/othorel/miniRT",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    image: "/projects/portfolio.png",
    github: "https://github.com/othorel/portfolio",
  },
];

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project)
    return <p className="text-center text-red-400">Projet non trouvé 😢</p>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {params.slug === "webserv" ? (
        <WebservProject />
      ) : params.slug === "miniRT" ? (
        <MinirtProject />
      ) : params.slug === "portfolio" ? (
        <PortfolioProject />
      ) : (
        <>
          <h1 className="text-4xl font-bold text-indigo-400 mb-6">
            {project.title}
          </h1>

          <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-invert max-w-full mb-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{ img: MarkdownImage }}
            >
              {project.description || ""}
            </ReactMarkdown>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack?.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-indigo-600/20 text-indigo-300 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Github className="w-4 h-4" />
            Code source
          </a>
        </>
      )}
    </div>
  );
}
