import { ArrowDown, ArrowUpRight, Braces } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="page-shell hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-kicker"><span className="small-cross" aria-hidden="true" />Independent projects / Full-stack development</p>
        <h1 id="hero-title">Olivier<br />Thorel<span className="accent-text">.</span></h1>
        <p className="hero-role">Full-stack developer</p>
        <p className="hero-description">I design and build complete web applications, from backend architecture and business logic to the interface.</p>
        <div className="hero-actions">
          <Button asChild size="action"><a href="#work">Explore my work <ArrowDown aria-hidden="true" /></a></Button>
          <a href="mailto:thorel.olivier@hotmail.com" className="text-link">Get in touch <ArrowUpRight /></a>
        </div>
      </div>
      <div className="hero-system" aria-label="My approach: interfaces, business logic and data connected by shared typed contracts">
        <div className="system-heading"><Braces className="size-4" /><span className="eyebrow">Across the stack</span><span className="system-index">01—03</span></div>
        <div className="system-layers">
          <div className="system-layer"><span className="system-number">01</span><div><p>Interface</p><span>React / Next.js</span></div><span className="layer-symbol" aria-hidden="true">↗</span></div>
          <div className="system-connector" aria-hidden="true" /><div className="system-layer"><span className="system-number">02</span><div><p>Business logic</p><span>TypeScript / NestJS</span></div><span className="layer-symbol" aria-hidden="true">&#123; &#125;</span></div>
          <div className="system-connector" aria-hidden="true" /><div className="system-layer"><span className="system-number">03</span><div><p>Data & persistence</p><span>Prisma / PostgreSQL</span></div><span className="layer-symbol" aria-hidden="true">≡</span></div>
        </div>
        <div className="system-footnote"><span className="small-cross" aria-hidden="true" />Shared types. Clear boundaries.</div>
      </div>
      <div className="hero-bottom"><span className="eyebrow">Selected projects & engineering notes</span><a href="#work" className="hero-scroll" aria-label="Scroll to selected projects"><ArrowDown className="size-4" /></a></div>
    </section>
  );
}
