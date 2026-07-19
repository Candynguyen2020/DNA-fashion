export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="border-b border-border bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-xl text-muted-foreground">{intro}</p>}
      </div>
    </div>
  );
}
