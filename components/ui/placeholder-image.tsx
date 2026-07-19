import Image from "next/image";

export function PlaceholderImage({
  label,
  className = "",
  showLabel = true,
  src,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  label: string;
  className?: string;
  showLabel?: boolean;
  src?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-muted ${className}`}>
        <Image
          src={src}
          alt={label}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

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
