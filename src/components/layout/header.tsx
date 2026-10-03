"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

const navigation = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function updateNavigation() {
      setScrolled(window.scrollY > 24);
      const current = navigation.filter(({ id }) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 180;
      }).at(-1);
      setActive(current?.id ?? "");
    }
    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    return () => window.removeEventListener("scroll", updateNavigation);
  }, [pathname]);

  const currentSection = pathname === "/" ? active : "work";

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="page-shell header-inner">
        <Link href="/" className="identity" aria-label="Olivier Thorel — home">
          <span className="identity-mark" aria-hidden="true">ot<span>.</span></span>
          <span>Olivier Thorel</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ id, label }) => (
            <a key={id} href={`/#${id}`} className="nav-link" aria-current={currentSection === id ? "location" : undefined}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <span className="header-divider" aria-hidden="true" />
          <a className="icon-link header-social" href="https://github.com/othorel" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" title="GitHub"><FaGithub /></a>
          <a className="icon-link header-social" href="https://www.linkedin.com/in/olivier-thorel-24a87b158/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn"><FaLinkedin /></a>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <Button variant="ghost" size="icon" className="mobile-menu-trigger" aria-label="Open navigation"><Menu /></Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="mobile-nav-overlay" />
              <Dialog.Content className="mobile-nav-panel">
                <div className="mobile-nav-top">
                  <Dialog.Title className="identity">Olivier Thorel<span className="accent-text">.</span></Dialog.Title>
                  <Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close navigation"><X /></Button></Dialog.Close>
                </div>
                <Dialog.Description className="eyebrow">Explore the portfolio</Dialog.Description>
                <nav aria-label="Mobile navigation" className="mobile-nav-links">
                  {navigation.map(({ id, label }, index) => (
                    <a key={id} href={`/#${id}`} onClick={() => setOpen(false)} aria-current={currentSection === id ? "location" : undefined}>
                      <span className="eyebrow">0{index + 1}</span><span>{label}</span><ArrowUpRight />
                    </a>
                  ))}
                </nav>
                <div className="mobile-nav-contact">
                  <a className="text-link" href="mailto:thorel.olivier@hotmail.com">Get in touch <ArrowUpRight className="size-4" /></a>
                  <div className="flex gap-6">
                    <a className="text-link" href="https://github.com/othorel" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight className="size-4" /></a>
                    <a className="text-link" href="https://www.linkedin.com/in/olivier-thorel-24a87b158/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight className="size-4" /></a>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
