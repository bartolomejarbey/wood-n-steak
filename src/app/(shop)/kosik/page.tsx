"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, Truck, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";
import ImagePlaceholder from "@/components/shop/ImagePlaceholder";

const MIN_ORDER = 500;
const FREE_SHIPPING = 1500;

export default function KosikPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const isUnderMin = subtotal < MIN_ORDER;
  const toFreeShipping = Math.max(0, FREE_SHIPPING - subtotal);
  const hasFreeShipping = subtotal >= FREE_SHIPPING;
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  if (items.length === 0) {
    return (
      <section className="min-h-screen bg-off-black py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ShoppingBag className="w-14 h-14 text-white/10 mx-auto mb-6" strokeWidth={1} />
          <h1 className="font-heading text-3xl sm:text-4xl text-cream mb-4">
            Košík je prázdný
          </h1>
          <p className="font-body text-white/40 mb-8 max-w-sm mx-auto">
            Zatím jste do košíku nic nepřidali. Prohlédněte náš sortiment a vyberte si.
          </p>
          <Link
            href="/sortiment"
            className="inline-block px-8 py-3.5 bg-gold text-black font-body text-sm font-medium tracking-wider uppercase rounded-full hover:bg-gold-light transition-colors"
          >
            Prohlédnout sortiment
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-off-black py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Nákup</span>
          <h1 className="font-heading text-3xl sm:text-4xl text-cream mt-1">
            Košík
          </h1>
        </div>

        {/* Free shipping progress bar */}
        <div className="mb-8 rounded-2xl border border-gold/20 bg-black/30 p-5">
          <div className="flex items-center gap-3 mb-3">
            {hasFreeShipping ? (
              <>
                <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center">
                  <Check className="w-4 h-4 text-gold" strokeWidth={2.5} />
                </div>
                <p className="font-body text-sm text-white">
                  <span className="text-gold font-semibold">Gratulujeme!</span> Máte dopravu zdarma.
                </p>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-gold" strokeWidth={1.5} />
                </div>
                <p className="font-body text-sm text-white/80">
                  Do dopravy zdarma vám chybí{" "}
                  <span className="text-gold font-semibold">{formatPrice(toFreeShipping)}</span>
                </p>
              </>
            )}
          </div>
          <div className="relative h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${shippingProgress}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full"
              style={{
                backgroundSize: "200% 100%",
                animation: hasFreeShipping ? "shimmer 3s linear infinite" : undefined,
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] tracking-[0.15em] uppercase text-white/40">
            <span>0 Kč</span>
            <span className={hasFreeShipping ? "text-gold" : ""}>{formatPrice(FREE_SHIPPING)}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Cart items */}
          <div className="flex-1">
            {/* Table header - desktop */}
            <div className="hidden sm:grid grid-cols-[80px_1fr_120px_120px_100px_40px] gap-4 items-center pb-4 border-b border-white/[0.06] mb-4">
              <span className="font-body text-xs text-white/25 uppercase tracking-wider" />
              <span className="font-body text-xs text-white/25 uppercase tracking-wider">Produkt</span>
              <span className="font-body text-xs text-white/25 uppercase tracking-wider text-center">Cena</span>
              <span className="font-body text-xs text-white/25 uppercase tracking-wider text-center">Počet</span>
              <span className="font-body text-xs text-white/25 uppercase tracking-wider text-right">Celkem</span>
              <span />
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="grid grid-cols-[80px_1fr] sm:grid-cols-[80px_1fr_120px_120px_100px_40px] gap-4 items-center py-4 border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors rounded-lg px-1"
                >
                  {/* Image */}
                  <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                    <ImagePlaceholder
                      type="square"
                      className="w-full h-full !aspect-auto"
                      text={item.product.name}
                    />
                  </div>

                  {/* Product name */}
                  <div className="sm:pr-4">
                    <Link
                      href={`/produkt/${item.product.slug}`}
                      className="font-body text-white text-sm hover:text-gold transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    {item.product.weight_info && (
                      <p className="font-body text-white/30 text-xs mt-1">
                        {item.product.weight_info}
                      </p>
                    )}
                    {/* Mobile price + controls */}
                    <div className="flex items-center justify-between mt-3 sm:hidden">
                      <div className="flex items-center border border-white/[0.08] rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-gold transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (val > 0) updateQuantity(item.product.id, val);
                          }}
                          className="w-10 h-8 bg-transparent text-white text-center font-body text-sm border-x border-white/[0.08] focus:outline-none"
                        />
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-gold transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-body text-gold text-sm font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-white/20 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Unit price - desktop */}
                  <div className="hidden sm:block text-center">
                    <span className="font-body text-white/60 text-sm">
                      {formatPrice(item.product.price)}
                    </span>
                  </div>

                  {/* Quantity - desktop */}
                  <div className="hidden sm:flex items-center justify-center">
                    <div className="flex items-center border border-white/[0.08] rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-gold transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val > 0) updateQuantity(item.product.id, val);
                        }}
                        className="w-10 h-8 bg-transparent text-white text-center font-body text-sm border-x border-white/[0.08] focus:outline-none"
                      />
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-gold transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal - desktop */}
                  <div className="hidden sm:block text-right">
                    <span className="font-body text-gold text-sm font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>

                  {/* Remove - desktop */}
                  <div className="hidden sm:flex justify-center">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-white/20 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-28 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
              <h2 className="font-heading text-lg text-white mb-6">
                Souhrn objednávky
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/45">Mezisoučet</span>
                  <span className="text-white/80">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/45">Doprava</span>
                  <span className="text-gold/80">ZDARMA</span>
                </div>
                <div className="h-px bg-white/[0.06] my-4" />
                <div className="flex justify-between items-baseline">
                  <span className="font-body text-white/45 text-sm">Celkem</span>
                  <span className="font-heading text-2xl text-gold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {isUnderMin && (
                <p className="font-body text-red-400/80 text-xs mb-4 bg-red-400/[0.04] border border-red-400/10 rounded-lg p-3">
                  Minimální objednávka je {formatPrice(MIN_ORDER)}. Do minima vám chybí{" "}
                  {formatPrice(MIN_ORDER - subtotal)}.
                </p>
              )}

              <Link
                href={isUnderMin ? "#" : "/pokladna"}
                onClick={(e) => {
                  if (isUnderMin) e.preventDefault();
                }}
                className={cn(
                  "block w-full text-center px-6 py-3.5 font-body text-sm font-medium tracking-wider uppercase transition-all duration-300 rounded-full",
                  isUnderMin
                    ? "bg-white/[0.04] text-white/20 cursor-not-allowed"
                    : "bg-gold text-black hover:bg-gold-light"
                )}
              >
                Pokračovat k pokladně
              </Link>

              <Link
                href="/sortiment"
                className="block text-center mt-4 font-body text-sm text-white/35 hover:text-gold transition-colors"
              >
                Pokračovat v nákupu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
