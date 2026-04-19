import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "danger" | "outline-dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-[0.1em] uppercase transition-all duration-200 rounded-full select-none disabled:opacity-50 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[11px] min-h-9",
  md: "px-6 py-3 text-xs min-h-11",
  lg: "px-8 py-4 text-sm min-h-14",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-black hover:bg-gold-light active:scale-[0.98] shadow-[0_0_0_1px_rgba(164,135,66,0.3)]",
  outline:
    "border border-gold text-gold hover:bg-gold hover:text-black active:scale-[0.98]",
  "outline-dark":
    "border border-white/20 text-white hover:border-gold hover:text-gold active:scale-[0.98]",
  ghost: "text-white/80 hover:text-gold",
  danger:
    "border border-red-500/60 text-red-400 hover:bg-red-500/10 hover:text-red-300",
};

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
};

type ButtonProps = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "type" | keyof ButtonOwnProps> & {
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  };

export function Button({
  variant = "primary",
  size = "md",
  loading,
  fullWidth,
  href,
  external,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], fullWidth && "w-full", className);

  const inner = (
    <>
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-25"
          />
          <path
            d="M4 12a8 8 0 018-8"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-90"
          />
        </svg>
      ) : null}
      {children}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={classes}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={rest.type ?? "button"}
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {inner}
    </button>
  );
}
