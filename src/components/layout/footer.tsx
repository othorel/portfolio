export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Olivier Thorel</span>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/othorel"
            target="_blank"
            className="hover:text-foreground"
          >
            GitHub
          </a>

          <a
            href="mailto:your@email.com"
            className="hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
