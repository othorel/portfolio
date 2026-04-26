import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <Link href={`/work/${slug}`} className="group block">
      <article className="relative overflow-hidden rounded-2xl border bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:bg-card/70">
        
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.2),transparent_50%)]" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-lg font-medium leading-snug">
            {title}
          </h3>

          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
        </div>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </article>
    </Link>
  );
}
