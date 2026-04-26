import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Footer } from "@/components/layout/footer";
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

      <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[62rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_45%,transparent_100%)]" />
        </div>

        <section className="mx-auto max-w-5xl px-6 py-24">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur-md transition-all hover:border-primary/40 hover:bg-accent/20 hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to work
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Case study
              </p>

              <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
                {project.slug === "confidential-saas-platform" ? (
                  <>
                    Confidential SaaS{" "}
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Platform
                    </span>
                  </>
                ) : project.slug === "real-time-messaging" ? (
                  <>
                    Real-time Messaging{" "}
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Platform
                    </span>
                  </>
                ) : (
                  project.title
                )}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                {project.description}
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-sm ring-1 ring-inset ring-border/40 backdrop-blur-md transition-all duration-500 hover:border-primary/40 hover:bg-accent/20">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-transparent opacity-60" />
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-center justify-between border-b border-border pb-4 text-sm">
                <span className="text-muted-foreground">Project focus</span>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="border border-border bg-muted/50 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-accent/30 hover:text-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="mb-6 flex items-end justify-between gap-6">
              <div>
                <p className="text-sm text-muted-foreground">What I built</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Key product features
                </h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 text-sm leading-6 text-muted-foreground shadow-sm ring-1 ring-inset ring-border/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-accent/20 hover:shadow-2xl hover:shadow-black/40"
                >
                  <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-transparent opacity-60" />
                  <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <CheckCircle2 className="mb-4 size-5 text-primary/80" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="group relative mt-12 overflow-hidden rounded-3xl border border-border bg-card/70 p-6 shadow-sm ring-1 ring-inset ring-border/40 backdrop-blur-md transition-all duration-500 hover:border-primary/40 hover:bg-accent/20">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-transparent opacity-60" />
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 translate-x-16 -translate-y-16 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <p className="text-sm text-muted-foreground">Technical approach</p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Tech decisions
            </h2>

            <ul className="mt-6 grid gap-4 text-sm leading-6 text-muted-foreground">
              {project.decisions.map((decision) => (
                <li
                  key={decision}
                  className="flex gap-3 rounded-2xl border border-border bg-muted/40 p-4 transition-colors hover:border-primary/30 hover:bg-accent/20"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/80 shadow-[0_0_12px_oklch(0.92_0.02_255/0.5)]" />
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 divide-y divide-border border-y border-border">
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

      <Footer />
    </>
  );
}
