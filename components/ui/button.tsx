import { type ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm tracking-[0.08em] uppercase transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-ink-foreground px-8 py-3.5 hover:bg-charcoal active:bg-black",
  secondary:
    "border border-ink text-ink px-8 py-3.5 hover:bg-ink hover:text-ink-foreground",
  ghost: "text-ink px-2 py-2 underline underline-offset-4 hover:text-gold",
};

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}

type LinkButtonProps = ComponentProps<typeof Link> & { variant?: Variant };

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: LinkButtonProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
