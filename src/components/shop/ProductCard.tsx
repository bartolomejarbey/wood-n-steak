"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";
import { getProductImage } from "@/lib/product-images";
import ImagePlaceholder from "./ImagePlaceholder";

interface ProductCardProps {
  product: Product;
  variant?: "dark" | "light";
}

export default function ProductCard({ product, variant = "dark" }: ProductCardProps) {
  const { addItem } = useCart();

  const isDark = variant === "dark";
  const imageSrc = getProductImage(product);

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${
        isDark
          ? "bg-[#141414] border-white/[0.06] hover:border-gold/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          : "bg-white border-black/[0.06] hover:border-gold/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
      }`}
    >
      <Link href={`/produkt/${product.slug}`}>
        {/* Image */}
        <div className="relative overflow-hidden aspect-square">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          ) : (
            <ImagePlaceholder type="square" className="rounded-none" />
          )}

          {/* Gradient overlay on image */}
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isDark ? "from-[#141414] via-transparent" : "from-white/80 via-transparent"
          } to-transparent opacity-60`} />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-gold text-black text-[11px] font-body font-semibold px-3 py-1 tracking-wide uppercase rounded-full">
              {product.badge}
            </span>
          )}

          {/* Stock status */}
          {product.stock_status === "on_order" && (
            <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-gold text-[11px] font-body px-3 py-1 border border-gold/30 rounded-full">
              Na objednávku
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4 pb-5">
          <h3
            className={`font-heading text-base leading-snug group-hover:text-gold transition-colors line-clamp-2 mb-1.5 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {product.name}
          </h3>
          {product.short_description && (
            <p className={`text-xs font-body line-clamp-1 mb-3 ${
              isDark ? "text-white/40" : "text-black/50"
            }`}>
              {product.short_description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-gold font-heading text-lg">
              {formatPrice(product.price)}
              {product.unit !== "ks" && (
                <span className={`text-xs font-body ml-1 ${
                  isDark ? "text-white/30" : "text-black/40"
                }`}>
                  /{product.unit}
                </span>
              )}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to cart - always visible on mobile, hover on desktop */}
      {product.stock_status !== "out_of_stock" && (
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem(product, 1);
          }}
          className={`absolute bottom-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 sm:opacity-0 sm:translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 ${
            isDark
              ? "bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-black"
              : "bg-gold/10 border border-gold/40 text-gold-dark hover:bg-gold hover:text-black"
          }`}
          title="Do košíku"
        >
          <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}
