import * as React from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "gold"
  | "forest"
  | "new"
  | "sale"
  | "top"
  | "stock-in"
  | "stock-out"
  | "stock-order"
  | "status-new"
  | "status-confirmed"
  | "status-processing"
  | "status-ready"
  | "status-delivering"
  | "status-delivered"
  | "status-cancelled"
  | "status-paid"
  | "status-unpaid";

const variants: Record<Variant, string> = {
  gold: "bg-gold/20 text-gold border-gold/40",
  forest: "bg-forest/80 text-cream border-cream/20",
  new: "bg-gold text-black border-gold",
  sale: "bg-red-500 text-white border-red-500",
  top: "bg-gold text-black border-gold",
  "stock-in": "bg-forest text-cream border-forest",
  "stock-out": "bg-red-900/80 text-red-200 border-red-700/60",
  "stock-order": "bg-gold/20 text-gold border-gold/50",
  "status-new": "bg-blue-500/15 text-blue-300 border-blue-500/40",
  "status-confirmed": "bg-cyan-500/15 text-cyan-300 border-cyan-500/40",
  "status-processing": "bg-gold/20 text-gold border-gold/40",
  "status-ready": "bg-orange-500/15 text-orange-300 border-orange-500/40",
  "status-delivering": "bg-purple-500/15 text-purple-300 border-purple-500/40",
  "status-delivered": "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  "status-cancelled": "bg-red-900/40 text-red-300 border-red-700/60",
  "status-paid": "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  "status-unpaid": "bg-amber-500/15 text-amber-300 border-amber-500/40",
};

type BadgeProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function Badge({ variant = "gold", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-[0.15em] uppercase leading-none whitespace-nowrap",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
