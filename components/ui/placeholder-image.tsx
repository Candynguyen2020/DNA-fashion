export function PlaceholderImage({
  label,
  className = "",
  showLabel = true,
}: {
  label: string;
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal via-ink to-black ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)",
        }}
      />
      {showLabel && (
        <span className="relative px-4 text-center text-xs tracking-[0.15em] uppercase text-white/50">
          {label}
        </span>
      )}
    </div>
  );
}
