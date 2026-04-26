import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* BADGES */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-full border border-border/60 bg-card/50 px-5 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur-xl">
            Olivier Thorel
          </div>

          <div className="rounded-full border border-border/60 bg-muted/40 px-5 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-xl">
            Full-Stack-Engineer
          </div>
        </div>

        {/* TITLE */}
        <h1 className="mt-8 text-5xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-7xl md:text-[5.5rem]">
          I engineer products
          <span className="animate-gradient-shift mt-2 block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text pb-2 text-transparent">
            not just interfaces.
          </span>
        </h1>

        {/* TEXT */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Building scalable, high-performance SaaS products with clean
          architecture and strong typing. Bridging product thinking with solid
          engineering.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            className="h-12 gap-2 rounded-full px-8 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/30"
            asChild
          >
            <a
              href="https://github.com/othorel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="size-4" />
              GitHub
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-12 gap-2 rounded-full border-border/60 bg-card/40 px-8 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent/10"
            asChild
          >
            <a
              href="https://www.linkedin.com/in/olivier-thorel-24a87b158/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="size-4" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>

      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[4rem] h-[32rem] w-[50rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute left-1/2 top-[8rem] h-[20rem] w-[30rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
      </div>
    </section>
  );
}
