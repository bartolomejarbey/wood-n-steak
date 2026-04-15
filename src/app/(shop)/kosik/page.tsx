"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";
import ImagePlaceholder from "@/components/shop/ImagePlaceholder";

const MIN_ORDER = 500;

export default function KosikPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const isUnderMin = subtotal < MIN_ORDER;

  if (items.length === 0) {
    return (
      <section className="min-h-screen bg-forest py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ShoppingBag className="w-16 h-16 text-gold/30 mx-auto mb-6" strokeWidth={1} />
          <h1 className="font-heading text-3xl sm:text-4xl text-white mb-4">
            Kosik je prazdny
          </h1>
          <p className="font-body text-white/50 mb-8">
            Zatim jste do kosiku nic nepridali. Prohlednete nas sortiment a vyberte si.
          </p>
          <Link
            href="/sortiment"
            className="inline-block px-8 py-3.5 bg-gold text-black font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold-light transition-colors"
          >
            Prohlednout sortiment
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-forest py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl text-white mb-12">
          Kosik
        </h1>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Cart items */}
          <div className="flex-1">
            {/* Table header - desktop */}
            <div className="hidden sm:grid grid-cols-[80px_1fr_120px_120px_100px_40px] gap-4 items-center pb-4 border-b border-gold/20 mb-4">
              <span className="font-body text-xs text-white/40 uppercase tracking-wider" />
              <span className="font-body text-xs text-white/40 uppercase tracking-wider">Produkt</span>
              <span className="font-body text-xs text-white/40 uppercase tracking-wider text-center">Cena</span>
              <span className="font-body text-xs text-white/40 uppercase tracking-wider text-center">Pocet</span>
              <span className="font-body text-xs text-white/40 uppercase tracking-wider text-right">Celkem</span>
              <span />
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="grid grid-cols-[80px_1fr] sm:grid-cols-[80px_1fr_120px_120px_100px_40px] gap-4 items-center py-4 border-b border-white/5"
                >
                  {/* Image */}
                  <div className="w-20 h-20 flex-shrink-0">
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
                      <p className="font-body text-white/40 text-xs mt-1">
                        {item.product.weight_info}
                      </p>
                    )}
                    {/* Mobile price + controls */}
                    <div className="flex items-center justify-between mt-3 sm:hidden">
                      <div className="flex items-center border border-gold/30">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-gold transition-colors"
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
                          className="w-10 h-8 bg-transparent text-white text-center font-body text-sm border-x border-gold/30 focus:outline-none"
                        />
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-gold transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-body text-gold text-sm font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-white/30 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Unit price - desktop */}
                  <div className="hidden sm:block text-center">
                    <span className="font-body text-white/70 text-sm">
                      {formatPrice(item.product.price)}
                    </span>
                  </div>

                  {/* Quantity - desktop */}
                  <div className="hidden sm:flex items-center justify-center">
                    <div className="flex items-center border border-gold/30">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-gold transition-colors"
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
                        className="w-10 h-8 bg-transparent text-white text-center font-body text-sm border-x border-gold/30 focus:outline-none"
                      />
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-gold transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal - desktop */}
                  <div className="hidden sm:block text-right">
                    <span className="font-body text-gold text-sm font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>

                  {/* Remove - desktop */}
                  <div className="hidden sm:flex justify-center">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-white/30 hover:text-red-400 transition-colors"
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
            <div className="lg:sticky lg:top-28 bg-black/40 border border-gold/20 p-6">
              <h2 className="font-heading text-lg text-white mb-6">
                Souhrn objednavky
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/60">Mezisouce</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/60">Doprava</span>
                  <span className="text-gold">ZDARMA</span>
                </div>
                <div className="h-px bg-gold/20 my-4" />
                <div className="flex justify-between items-baseline">
                  <span className="font-body text-white/60 text-sm">Celkem</span>
                  <span className="font-heading text-2xl text-gold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {isUnderMin && (
                <p className="font-body text-red-400 text-xs mb-4">
                  Minimalni objednavka je {formatPrice(MIN_ORDER)}. Do minima vam chybi{" "}
                  {formatPrice(MIN_ORDER - subtotal)}.
                </p>
              )}

              <Link
                href={isUnderMin ? "#" : "/pokladna"}
                onClick={(e) => {
                  if (isUnderMin) e.preventDefault();
                }}
                className={cn(
                  "block w-full text-center px-6 py-3.5 font-body text-sm font-semibold tracking-wider uppercase transition-all duration-300",
                  isUnderMin
                    ? "bg-white/10 text-white/30 cursor-not-allowed"
                    : "bg-gold text-black hover:bg-gold-light"
                )}
              >
                Pokracovat k pokladne
              </Link>

              <Link
                href="/sortiment"
                className="block text-center mt-4 font-body text-sm text-white/50 hover:text-gold transition-colors"
              >
                Pokracovat v nakupu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
