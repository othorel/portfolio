import { ArrowUp, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-inner">
        <p>© {new Date().getFullYear()} Olivier Thorel <span className="footer-built">/ Built with Next.js</span></p>
        <div className="footer-links">
          <a href="https://github.com/othorel" target="_blank" rel="noopener noreferrer" className="text-link">GitHub <ArrowUpRight /></a>
          <a href="https://www.linkedin.com/in/olivier-thorel-24a87b158/" target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn <ArrowUpRight /></a>
          <a href="mailto:thorel.olivier@hotmail.com" className="text-link">Email <ArrowUpRight /></a>
          <a href="#main" className="icon-link" aria-label="Back to top"><ArrowUp /></a>
        </div>
      </div>
    </footer>
  );
}
