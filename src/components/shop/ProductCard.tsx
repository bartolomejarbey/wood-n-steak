"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";
import ImagePlaceholder from "./ImagePlaceholder";

interface ProductCardProps {
  product: Product;
  variant?: "dark" | "light";
}

export default function ProductCard({ product, variant = "dark" }: ProductCardProps) {
  const { addItem } = useCart();

  const bgClass = variant === "dark" ? "bg-off-black" : "bg-white";
  const textClass = variant === "dark" ? "text-white" : "text-black";

  return (
    <div
      className={`group relative ${bgClass} border border-gold/0 hover:border-gold/30 transition-all duration-300 overflow-hidden`}
    >
      <Link href={`/produkt/${product.slug}`}>
        {/* Image */}
        <div className="relative overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <ImagePlaceholder
              type="product"
              className="group-hover:scale-105 transition-transform duration-500"
            />
          )}

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-gold text-black text-xs font-body font-semibold px-3 py-1 tracking-wide uppercase">
              {product.badge}
            </span>
          )}

          {/* Stock status */}
          {product.stock_status === "on_order" && (
            <span className="absolute top-3 right-3 bg-black/70 text-gold text-xs font-body px-3 py-1 border border-gold/30">
              Na objednavku
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3
            className={`font-heading text-base ${textClass} group-hover:text-gold transition-colors line-clamp-2 mb-1`}
          >
            {product.name}
          </h3>
          {product.short_description && (
            <p className="text-white/50 text-xs font-body line-clamp-1 mb-3">
              {product.short_description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-gold font-heading text-lg">
              {formatPrice(product.price)}
              {product.unit !== "ks" && (
                <span className="text-white/40 text-xs font-body ml-1">
                  /{product.unit}
                </span>
              )}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to cart */}
      {product.stock_status !== "out_of_stock" && (
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem(product, 1);
          }}
          className="absolute bottom-4 right-4 w-9 h-9 bg-gold/0 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-200 opacity-0 group-hover:opacity-100"
          title="Do kosiku"
        >
          <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}
