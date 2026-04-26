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
    <Link href={`/work/${slug}`} className="group block h-full outline-none">
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-8 shadow-sm backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10 ring-1 ring-inset ring-white/5">
        
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-transparent opacity-60" />
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-16 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:bg-primary/20" />

        {/* Top glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              <ProjectTitle
                title={title}
                gradient={false}
                className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300"
              />
            </h3>

            {/* ✅ Barre gradient sous le titre */}
            <div className="mt-4 h-px w-12 bg-gradient-to-r from-primary to-accent opacity-50 transition-all duration-500 group-hover:w-24 group-hover:opacity-100" />
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/50 bg-muted/40 text-muted-foreground transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-foreground">
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-8">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-md border border-border/40 bg-muted/30 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </article>
    </Link>
  );
}
