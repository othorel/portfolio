import { cn } from "@/lib/utils";

type ProjectTitleProps = {
  title: string;
  gradient?: boolean;
  className?: string;
};

export function ProjectTitle({
  title,
  gradient = false,
  className,
}: ProjectTitleProps) {
  if (!gradient) {
    return <span className={className}>{title}</span>;
  }

  const words = title.split(" ");
  if (words.length <= 1) {
    return (
      <span
        className={cn(
          "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
          className
        )}
      >
        {title}
      </span>
    );
  }

  const lastWord = words.pop();
  const restOfTitle = words.join(" ");

  return (
    <span className={className}>
      {restOfTitle}{" "}
      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {lastWord}
      </span>
    </span>
  );
}
