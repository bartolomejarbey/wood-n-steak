import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  items,
  className,
  tone = "dark",
}: {
  items: Crumb[];
  className?: string;
  tone?: "dark" | "light";
}) {
  const textColor = tone === "dark" ? "text-white/60" : "text-black/60";
  const activeColor = tone === "dark" ? "text-cream" : "text-black";
  const hoverColor = tone === "dark" ? "hover:text-gold" : "hover:text-gold";

  return (
    <nav
      aria-label="Drobečková navigace"
      className={cn("flex flex-wrap items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase", textColor, className)}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <div key={i} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className={cn("transition-colors", hoverColor)}>
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? activeColor : undefined}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="h-3 w-3 text-gold/70" aria-hidden />}
          </div>
        );
      })}
    </nav>
  );
}
