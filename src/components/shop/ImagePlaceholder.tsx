"use client";

import Image from "next/image";
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
        "relative overflow-hidden bg-[#0d0d0d]",
        aspectMap[type],
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(164,135,66,0.14)_0%,_transparent_65%)]" />

      <div className="absolute inset-0 flex items-center justify-center p-[12%]">
        <div className="relative w-full h-full">
          <Image
            src="/images/logo.png"
            alt="Wood & Steak"
            fill
            className="object-contain opacity-60"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      </div>

      {text && (
        <p className="absolute bottom-4 left-0 right-0 text-center font-body text-gold/50 text-[10px] tracking-[0.3em] uppercase">
          {text}
        </p>
      )}
    </div>
  );
}
