"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import {
  getProductBySlug,
  getProductsByCategory,
  getCategories,
} from "@/lib/data";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { getProductImage } from "@/lib/product-images";
import { useCart } from "@/context/CartContext";
import ImagePlaceholder from "@/components/shop/ImagePlaceholder";
import ProductCard from "@/components/shop/ProductCard";
import { DryAgingTimeline } from "@/components/product/DryAgingTimeline";
import { TemperatureGuide } from "@/components/product/TemperatureGuide";

const stockLabels: Record<Product["stock_status"], string> = {
  in_stock: "Skladem",
  on_order: "Na objednávku",
  out_of_stock: "Vyprodáno",
};

const stockColors: Record<Product["stock_status"], string> = {
  in_stock: "text-gold",
  on_order: "text-cream/60",
  out_of_stock: "text-red-400",
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProductBySlug(slug);

  const category = useMemo(() => {
    if (!product) return undefined;
    return getCategories().find((c) => c.id === product.category_id);
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getProductsByCategory(product.category_id)
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-off-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-cream text-2xl mb-4">
            Produkt nenalezen
          </h1>
          <Link
            href="/sortiment"
            className="font-body text-gold border border-gold rounded-full px-6 py-2 hover:bg-gold hover:text-black transition-all duration-200 text-sm"
          >
            Zpět na sortiment
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-off-black">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <nav>
          <ol className="flex items-center gap-2 font-body text-xs text-white/35">
            <li>
              <Link
                href="/sortiment"
                className="hover:text-gold transition-colors"
              >
                Produkty
              </Link>
            </li>
            <li className="text-gold/40">/</li>
            {category && (
              <>
                <li>
                  <Link
                    href={`/sortiment/${category.slug}`}
                    className="hover:text-gold transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
                <li className="text-gold/40">/</li>
              </>
            )}
            <li className="text-cream/70">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* Product detail */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Image gallery - 60% */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden">
            {(() => {
              const src = getProductImage(product);
              return src ? (
                <img
                  src={src}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded-2xl"
                />
              ) : (
                <ImagePlaceholder type="product" className="rounded-2xl" />
              );
            })()}
          </div>

          {/* Info - 40% */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Badge */}
            {product.badge && (
              <span className="inline-block self-start bg-gold text-black text-xs font-body font-semibold px-3 py-1 rounded-full tracking-wide uppercase mb-4">
                {product.badge}
              </span>
            )}

            {/* Name */}
            <h1 className="font-heading text-3xl md:text-4xl text-cream mb-3">
              {product.name}
            </h1>

            {/* Stock status */}
            <p
              className={cn(
                "font-body text-sm mb-6",
                stockColors[product.stock_status]
              )}
            >
              {stockLabels[product.stock_status]}
            </p>

            {/* Price */}
            <div className="mb-6">
              <span className="font-heading text-3xl text-gold">
                {formatPrice(product.price)}
              </span>
              {product.unit && (
                <span className="font-body text-cream/40 text-sm ml-2">
                  / {product.unit}
                </span>
              )}
              {product.weight_info && (
                <span className="font-body text-cream/30 text-xs ml-3">
                  ({product.weight_info})
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="font-body text-cream/70 text-sm leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* Quantity selector + Add to cart */}
            {product.stock_status !== "out_of_stock" && (
              <div className="mt-auto space-y-4">
                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="font-body text-cream/50 text-sm">
                    Počet:
                  </span>
                  <div className="flex items-center border border-white/[0.08] rounded-xl overflow-hidden">
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.max(1, q - 1))
                      }
                      className="w-10 h-10 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors rounded-xl"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-body text-cream text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors rounded-xl"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Add to cart button */}
                <button
                  onClick={handleAddToCart}
                  className={cn(
                    "w-full py-3.5 font-body font-semibold text-sm tracking-wide uppercase rounded-full transition-all duration-200",
                    added
                      ? "bg-green-700 text-cream border border-green-700"
                      : "bg-gold text-black border border-gold hover:bg-gold/90"
                  )}
                >
                  {added ? "Přidáno do košíku!" : "Do košíku"}
                </button>
              </div>
            )}

            {product.stock_status === "out_of_stock" && (
              <div className="mt-auto">
                <button
                  disabled
                  className="w-full py-3.5 font-body font-semibold text-sm tracking-wide uppercase rounded-full bg-transparent border border-cream/20 text-cream/30 cursor-not-allowed"
                >
                  Vyprodáno
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Infographics — dry-aging + temperature (steaks only) */}
      {category?.slug === "steaky" && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="border-t border-white/[0.06] pt-12 space-y-6">
            <DryAgingTimeline activeDays={28} />
            <TemperatureGuide />
          </div>
        </section>
      )}

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="border-t border-white/[0.06] pt-12">
            <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Další produkty</span>
            <h2 className="font-heading text-2xl md:text-3xl text-cream mt-1 mb-8">
              Mohlo by vás zajímat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
