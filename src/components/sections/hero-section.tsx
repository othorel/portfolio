import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-28 pb-12 md:pt-36 md:pb-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">

        {/* BADGES */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-full border border-border bg-card/70 px-5 py-2 text-sm font-semibold text-foreground backdrop-blur-xl">
            Olivier Thorel
          </div>

          <div className="rounded-full border border-border bg-muted/50 px-5 py-2 text-sm font-medium text-muted-foreground backdrop-blur-xl">
            Fullstack Product Engineer
          </div>
        </div>

        {/* TITLE */}
        <h1 className="mt-8 text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl md:text-8xl">
          I build real products
          <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            not just interfaces.
          </span>
        </h1>

        {/* TEXT */}
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Clean architecture, typed systems and production-ready SaaS platforms.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="gap-2" asChild>
            <a
              href="https://github.com/othorel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="gap-2 border-border bg-card/60 hover:bg-accent/20 hover:border-primary/40"
            asChild
          >
            <a
              href="https://www.linkedin.com/in/olivier-thorel-24a87b158/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[8rem] h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

        {/* petit glow en plus */}
        <div className="absolute left-1/2 top-[10rem] h-[18rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>
    </section>
  );
}
