type SectionBlockProps = {
  title: string;
  children: React.ReactNode;
};

export function SectionBlock({ title, children }: SectionBlockProps) {
  return (
    <div className="py-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 text-muted-foreground">{children}</div>
    </div>
  );
}
