"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, generateOrderNumber, cn } from "@/lib/utils";
import ImagePlaceholder from "@/components/shop/ImagePlaceholder";

const MIN_ORDER = 500;

const inputClass =
  "w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white font-body text-sm placeholder:text-white/20 focus:border-gold/40 focus:outline-none transition-colors";

const labelClass = "block font-body text-white/40 text-xs uppercase tracking-wider mb-2";

type PaymentMethod = "comgate" | "bank_transfer" | "cod";

export default function PokladnaPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    shipping_street: "",
    shipping_city: "",
    shipping_zip: "",
    company_name: "",
    ico: "",
    dic: "",
    note: "",
  });

  const [isCompany, setIsCompany] = useState(false);
  const [payment, setPayment] = useState<PaymentMethod>("comgate");
  const [gdpr, setGdpr] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isUnderMin = subtotal < MIN_ORDER;

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isValid =
    form.email &&
    form.first_name &&
    form.last_name &&
    form.phone &&
    form.shipping_street &&
    form.shipping_city &&
    form.shipping_zip &&
    gdpr &&
    !isUnderMin;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    const orderNumber = generateOrderNumber();

    // In production this would POST to an API route
    // For now, simulate order placement
    await new Promise((r) => setTimeout(r, 500));

    clearCart();
    router.push(`/pokladna/dekujeme?order=${orderNumber}`);
  };

  if (items.length === 0) {
    return (
      <section className="min-h-screen bg-off-black py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl text-cream mb-4">Pokladna</h1>
          <p className="font-body text-white/40 mb-8">
            Váš košík je prázdný. Před objednávkou nejprve přidejte produkty do košíku.
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
          <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Objednávka</span>
          <h1 className="font-heading text-3xl sm:text-4xl text-cream mt-1">
            Pokladna
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Left column - form */}
          <div className="flex-1 space-y-10">
            {/* Contact info */}
            <div>
              <h2 className="font-heading text-lg text-cream mb-6">
                Kontaktní údaje
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelClass}>E-mail *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="váš@email.cz"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Jméno *</label>
                  <input
                    type="text"
                    required
                    value={form.first_name}
                    onChange={update("first_name")}
                    placeholder="Jan"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Příjmení *</label>
                  <input
                    type="text"
                    required
                    value={form.last_name}
                    onChange={update("last_name")}
                    placeholder="Novák"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Telefon *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+420 xxx xxx xxx"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Shipping address */}
            <div>
              <h2 className="font-heading text-lg text-cream mb-6">
                Doručovací adresa
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Ulice a číslo popisné *</label>
                  <input
                    type="text"
                    required
                    value={form.shipping_street}
                    onChange={update("shipping_street")}
                    placeholder="Vinohradská 12"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Město *</label>
                  <input
                    type="text"
                    required
                    value={form.shipping_city}
                    onChange={update("shipping_city")}
                    placeholder="Praha"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>PSČ *</label>
                  <input
                    type="text"
                    required
                    value={form.shipping_zip}
                    onChange={update("shipping_zip")}
                    placeholder="120 00"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Company toggle */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={cn(
                    "w-5 h-5 border rounded-md flex items-center justify-center transition-colors",
                    isCompany ? "border-gold bg-gold" : "border-white/[0.08]"
                  )}
                  onClick={() => setIsCompany(!isCompany)}
                >
                  {isCompany && (
                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className="font-body text-white/70 text-sm group-hover:text-white transition-colors"
                  onClick={() => setIsCompany(!isCompany)}
                >
                  Nakupuji na firmu
                </span>
              </label>

              {isCompany && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Název firmy</label>
                    <input
                      type="text"
                      value={form.company_name}
                      onChange={update("company_name")}
                      placeholder="Firma s.r.o."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>IČO</label>
                    <input
                      type="text"
                      value={form.ico}
                      onChange={update("ico")}
                      placeholder="12345678"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>DIČ</label>
                    <input
                      type="text"
                      value={form.dic}
                      onChange={update("dic")}
                      placeholder="CZ12345678"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Delivery */}
            <div>
              <h2 className="font-heading text-lg text-cream mb-6">
                Způsob doručení
              </h2>
              <div className="border border-white/[0.08] bg-white/[0.02] rounded-2xl p-4 flex items-center gap-4">
                <div className="w-5 h-5 border-2 border-gold rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-gold rounded-full" />
                </div>
                <div>
                  <p className="font-body text-white text-sm">Vlastní rozvoz</p>
                  <p className="font-body text-gold text-xs mt-0.5">ZDARMA</p>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="font-heading text-lg text-cream mb-6">
                Způsob platby
              </h2>
              <div className="space-y-3">
                {([
                  { value: "comgate" as const, label: "Kartou online", desc: "Platba kartou přes Comgate" },
                  { value: "bank_transfer" as const, label: "Bankovní převod", desc: "Platba převodem na účet" },
                  { value: "cod" as const, label: "Dobírka", desc: "Platba při převzetí" },
                ]).map((opt) => (
                  <label
                    key={opt.value}
                    className={cn(
                      "flex items-center gap-4 border rounded-2xl p-4 cursor-pointer transition-colors",
                      payment === opt.value
                        ? "border-gold/50 bg-white/[0.02]"
                        : "border-white/10 hover:border-gold/20"
                    )}
                  >
                    <div className="w-5 h-5 border-2 border-gold/50 rounded-full flex items-center justify-center flex-shrink-0">
                      {payment === opt.value && (
                        <div className="w-2.5 h-2.5 bg-gold rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="font-body text-white text-sm">{opt.label}</p>
                      <p className="font-body text-white/40 text-xs mt-0.5">{opt.desc}</p>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={payment === opt.value}
                      onChange={() => setPayment(opt.value)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <h2 className="font-heading text-lg text-cream mb-6">
                Poznámka k objednávce
              </h2>
              <textarea
                value={form.note}
                onChange={update("note")}
                rows={3}
                placeholder="Např. preferovaný čas doručení, poznámky ke zvonku..."
                className={cn(inputClass, "resize-none")}
              />
            </div>

            {/* GDPR */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  className={cn(
                    "w-5 h-5 border rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                    gdpr ? "border-gold bg-gold" : "border-white/[0.08]"
                  )}
                  onClick={() => setGdpr(!gdpr)}
                >
                  {gdpr && (
                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className="font-body text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors"
                  onClick={() => setGdpr(!gdpr)}
                >
                  Souhlasím s{" "}
                  <Link href="/obchodni-podminky" className="text-gold underline underline-offset-2">
                    obchodními podmínkami
                  </Link>{" "}
                  a zpracováním osobních údajů. *
                </span>
              </label>
            </div>

            {/* Submit - mobile */}
            <div className="lg:hidden">
              {isUnderMin && (
                <p className="font-body text-red-400 text-xs mb-4">
                  Minimální objednávka je {formatPrice(MIN_ORDER)}.
                </p>
              )}
              <button
                type="submit"
                disabled={!isValid || submitting}
                className={cn(
                  "w-full px-6 py-4 font-body text-sm font-semibold tracking-wider uppercase transition-all duration-300 rounded-full",
                  isValid && !submitting
                    ? "bg-gradient-to-r from-gold to-gold-light text-black hover:brightness-110"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                )}
              >
                {submitting ? "Odesílám..." : "Objednat"}
              </button>
            </div>
          </div>

          {/* Right column - order summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="lg:sticky lg:top-28 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
              <h2 className="font-heading text-lg text-white mb-6">
                Vaše objednávka
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden">
                      <ImagePlaceholder
                        type="square"
                        className="w-full h-full !aspect-auto"
                        text={item.product.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-white text-sm truncate">
                        {item.product.name}
                      </p>
                      <p className="font-body text-white/40 text-xs mt-0.5">
                        {item.quantity}x {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <span className="font-body text-white text-sm flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/[0.06] mb-4" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/60">Mezisoučet</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/60">Doprava</span>
                  <span className="text-gold">ZDARMA</span>
                </div>
                <div className="h-px bg-white/[0.06]" />
                <div className="flex justify-between items-baseline">
                  <span className="font-body text-white/60 text-sm">Celkem</span>
                  <span className="font-heading text-2xl text-gold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* Submit - desktop */}
              <div className="hidden lg:block">
                {isUnderMin && (
                  <p className="font-body text-red-400 text-xs mb-4">
                    Minimální objednávka je {formatPrice(MIN_ORDER)}.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className={cn(
                    "w-full px-6 py-4 font-body text-sm font-semibold tracking-wider uppercase transition-all duration-300 rounded-full",
                    isValid && !submitting
                      ? "bg-gradient-to-r from-gold to-gold-light text-black hover:brightness-110"
                      : "bg-white/10 text-white/30 cursor-not-allowed"
                  )}
                >
                  {submitting ? "Odesílám..." : "Objednat"}
                </button>
              </div>

              <Link
                href="/kosik"
                className="block text-center mt-4 font-body text-sm text-white/50 hover:text-gold transition-colors"
              >
                Zpět do košíku
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
