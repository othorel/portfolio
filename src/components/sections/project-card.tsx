import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectTitle } from "@/components/ui/project-title";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: readonly string[];
  slug: string;
};

export function ProjectCard({
  title,
  description,
  tags,
  slug,
}: ProjectCardProps) {
  return (
    <Link href={`/work/${slug}`} className="group block h-full">
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-8 shadow-sm ring-1 ring-inset ring-border/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-accent/20 hover:shadow-2xl hover:shadow-black/40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-transparent opacity-60" />

        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="flex items-start justify-between gap-6">
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
            <ProjectTitle title={title} gradient={false} className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300" />
          </h3>

          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/15 group-hover:text-foreground">
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-7">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="border border-border bg-muted/50 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-accent/30 hover:text-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </article>
    </Link>
  );
}
