type CardTitleProps = {
  children: string;
};

export function CardTitle({ children }: CardTitleProps) {
  return (
    <>
      <h3 className="text-lg font-semibold tracking-tight text-foreground">
        <span className="transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent">
          {children}
        </span>
      </h3>

      <div className="mt-4 h-px w-12 bg-gradient-to-r from-primary to-accent opacity-50 transition-all duration-500 group-hover:w-24 group-hover:opacity-100" />
    </>
  );
}
