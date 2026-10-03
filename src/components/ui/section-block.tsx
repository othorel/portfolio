type SectionBlockProps = {
  title: string;
  id?: string;
  number?: string;
  children: React.ReactNode;
};

export function SectionBlock({ title, id, number, children }: SectionBlockProps) {
  return (
    <section className="case-section" id={id}>
      <div className="case-section-title">
        {number && <span className="eyebrow accent-text">{number}</span>}
        <h2>{title}</h2>
      </div>
      <div className="case-section-content">{children}</div>
    </section>
  );
}
