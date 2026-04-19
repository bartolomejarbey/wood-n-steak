import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  overline?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  dividerLeft?: boolean;
};

export function SectionHeading({
  overline,
  title,
  subtitle,
  tone = "dark",
  align = "center",
  className,
  dividerLeft,
}: Props) {
  const titleColor = tone === "dark" ? "text-white" : "text-black";
  const subtitleColor = tone === "dark" ? "text-white/70" : "text-black/70";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "text-center mx-auto" : "text-left",
        className,
      )}
    >
      {overline ? <p className="overline mb-4">{overline}</p> : null}
      <h2
        className={cn(
          "font-heading font-semibold leading-[1.08] tracking-[-0.01em]",
          "text-3xl sm:text-4xl lg:text-5xl",
          titleColor,
        )}
      >
        {title}
      </h2>
      {dividerLeft ? (
        <div className={cn("gold-divider-left", align === "center" && "mx-auto")} />
      ) : (
        <div className={cn("gold-divider", align === "left" && "ml-0 mr-auto")} />
      )}
      {subtitle ? (
        <p className={cn("mt-4 text-base sm:text-lg leading-relaxed", subtitleColor)}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
