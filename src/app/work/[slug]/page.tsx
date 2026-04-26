import { notFound } from "next/navigation";
import Link from "next/link";

import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { SectionBlock } from "@/components/ui/section-block";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="relative min-h-screen bg-background text-foreground">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.15),transparent_60%)]" />

        <section className="mx-auto max-w-4xl px-6 py-24">
          <Link
            href="/#work"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to work
          </Link>

          <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Features */}
          <div className="mt-12">
            <h2 className="text-lg font-semibold">Key features</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border bg-card/40 p-4 text-sm text-muted-foreground"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Tech decisions */}
          <div className="mt-12 rounded-2xl border bg-card/50 p-6">
            <h2 className="text-lg font-semibold">Tech decisions</h2>

            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {project.decisions.map((decision) => (
                <li key={decision} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/70" />
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sections */}
          <div className="mt-16 divide-y border-t">
            <SectionBlock title="Context">
              <p>{project.context}</p>
            </SectionBlock>

            <SectionBlock title="Architecture">
              <p>{project.architecture}</p>
            </SectionBlock>

            <SectionBlock title="Challenges">
              <p>{project.challenges}</p>
            </SectionBlock>

            <SectionBlock title="Outcome">
              <p>{project.outcome}</p>
            </SectionBlock>
          </div>
        </section>
      </main>
    </>
  );
}
