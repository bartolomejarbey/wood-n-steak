"use client";

import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  type?: "hero" | "product" | "category" | "restaurant" | "square";
  className?: string;
  text?: string;
}

const aspectMap = {
  hero: "aspect-[16/9]",
  product: "aspect-square",
  category: "aspect-[4/3]",
  restaurant: "aspect-[3/2]",
  square: "aspect-square",
};

export default function ImagePlaceholder({
  type = "product",
  className,
  text,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-off-black border border-gold/20 overflow-hidden",
        aspectMap[type],
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
      <div className="relative text-center px-4">
        <p className="font-heading text-gold/40 text-sm tracking-[0.3em] uppercase">
          {text || "Wood & Steak"}
        </p>
      </div>
    </div>
  );
}
