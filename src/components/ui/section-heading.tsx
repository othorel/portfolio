type SectionHeadingProps = {
  title: string;
  description?: string;
  number?: string;
  label?: string;
};

export function SectionHeading({ title, description, number, label }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow section-kicker"><span>{number}</span>{label ?? title}</p>
        <h2>{title}</h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
