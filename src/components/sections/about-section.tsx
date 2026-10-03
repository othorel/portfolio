import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/section-heading";

const focusItems = ["Typed full-stack architecture", "Complex business workflows", "Real-time applications"];

export function AboutSection() {
  return (
    <section id="about" className="page-shell about-section section-space">
      <SectionHeading number="03" label="A little about me" title="From the interface to the system." />
      <div className="about-layout">
        <div className="about-copy">
          <p className="about-intro">I’m Olivier, a full-stack developer trained at 42 Perpignan. I build web products end to end, from frontend interfaces to backend architecture, business rules and data.</p>
          <p>My previous experience in project and team management shapes the way I approach software: understand the product first, make complex workflows clear, and build systems that remain maintainable as they grow.</p>
          <div className="about-focus"><span className="eyebrow">My focus</span><ul>{focusItems.map(item => <li key={item}>{item}</li>)}</ul></div>
        </div>
        <div className="about-contact">
          <span className="eyebrow">Start a conversation</span>
          <a href="mailto:thorel.olivier@hotmail.com" className="contact-email">Let’s talk.<ArrowUpRight aria-hidden="true" /></a>
          <a className="contact-address" href="mailto:thorel.olivier@hotmail.com"><Mail className="size-4" />thorel.olivier@hotmail.com</a>
          <div className="contact-socials">
            <a href="https://github.com/othorel" target="_blank" rel="noopener noreferrer"><FaGithub /><span>GitHub</span><ArrowUpRight /></a>
            <a href="https://www.linkedin.com/in/olivier-thorel-24a87b158/" target="_blank" rel="noopener noreferrer"><FaLinkedin /><span>LinkedIn</span><ArrowUpRight /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
