"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ShoppingCart, CreditCard, Truck, ArrowRight, Check, Clock, Shield, Star, Leaf } from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    num: "01",
    title: "Vyberte si z našeho sortimentu",
    subtitle: "Prohlédněte si naši nabídku",
    description:
      "Projděte náš pečlivě vybraný sortiment prémiových steaků, domácích omáček, koření a vybavení. Každý produkt si můžete prohlédnout do detailu — najdete u něj popis, cenu i dostupnost.",
    features: ["Steaky dry-aged i čerstvé", "Domácí omáčky z naší kuchyně", "Nože, prkénka a grilovací vybavení"],
  },
  {
    icon: ShoppingCart,
    num: "02",
    title: "Přidejte do košíku",
    subtitle: "Zkontrolujte si objednávku",
    description:
      "V košíku si zkontrolujte svůj výběr, upravte množství a podívejte se na celkovou cenu. Minimální hodnota objednávky je 500 Kč — to odpovídá přibližně jednomu kvalitnímu steaku.",
    features: ["Přehledný souhrn položek", "Úprava množství jedním klikem", "Min. objednávka pouze 500 Kč"],
  },
  {
    icon: CreditCard,
    num: "03",
    title: "Dokončete objednávku",
    subtitle: "Bezpečná platba",
    description:
      "Vyplňte dodací údaje a zvolte způsob platby. Přijímáme platbu kartou online přes zabezpečenou bránu Comgate, bankovním převodem s QR kódem i dobírkou.",
    features: ["Platba kartou online (Comgate)", "Bankovní převod s QR kódem", "Dobírka při převzetí"],
  },
  {
    icon: Truck,
    num: "04",
    title: "Doručíme až ke dveřím",
    subtitle: "Vlastní rozvoz po Praze",
    description:
      "Doručujeme vlastním rozvozem po Praze a okolí. Zajišťujeme maximální čerstvost a kvalitu vašich produktů. Před doručením vás kontaktujeme pro domluvení přesného času.",
    features: ["Praha a blízké okolí", "Doprava zdarma", "Kontaktujeme vás před doručením"],
  },
];

const reasons = [
  {
    icon: Star,
    title: "Prémiová kvalita",
    desc: "Pouze pečlivě vybrané maso a produkty z naší restaurační kuchyně.",
  },
  {
    icon: Shield,
    title: "Bezpečný nákup",
    desc: "Zabezpečená platba, ochrana osobních údajů, transparentní podmínky.",
  },
  {
    icon: Clock,
    title: "Rychlé doručení",
    desc: "Vlastní rozvoz zajišťuje čerstvost a kvalitu až k vašim dveřím.",
  },
  {
    icon: Leaf,
    title: "Řemeslná výroba",
    desc: "Omáčky a marinády vyrábíme ručně v naší kuchyni z čerstvých surovin.",
  },
];

export default function HowToShopPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-black py-28 sm:py-36 overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block font-body text-gold/40 text-xs tracking-[0.3em] uppercase mb-4">
            Průvodce nákupem
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            Jak nakupovat
          </h1>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-body text-white/45 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Nakupování na našem e-shopu je jednoduché. Stačí 4 kroky
            a máte prémiové produkty přímo u vás doma.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="relative bg-black pb-12 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {steps.map((step, i) => (
            <div key={i} className="relative mb-6 last:mb-0">
              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute left-[52px] top-full w-px h-6 bg-gradient-to-b from-white/[0.06] to-transparent z-0" />
              )}

              <div className="relative bg-white/[0.02] rounded-2xl border border-white/[0.06] p-8 sm:p-10 hover:border-white/[0.1] transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left: number + icon */}
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 flex-shrink-0">
                    <div className="w-16 h-16 bg-white/[0.03] backdrop-blur rounded-2xl flex items-center justify-center border border-white/[0.06]">
                      <step.icon className="w-7 h-7 text-gold/70" strokeWidth={1} />
                    </div>
                    <span className="font-heading text-white/10 text-3xl md:text-4xl">{step.num}</span>
                  </div>

                  {/* Right: content */}
                  <div className="flex-1">
                    <span className="font-body text-gold/40 text-xs tracking-[0.2em] uppercase">{step.subtitle}</span>
                    <h2 className="font-heading text-2xl sm:text-3xl text-white mt-1 mb-4">
                      {step.title}
                    </h2>
                    <p className="font-body text-white/40 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                      {step.description}
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2.5">
                      {step.features.map((f, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.03] rounded-full border border-white/[0.06] font-body text-xs text-white/50"
                        >
                          <Check className="w-3 h-3 text-gold/60" strokeWidth={2} />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why shop with us */}
      <section className="relative bg-forest py-24 sm:py-32 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Proč my</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-white mt-2">
              Proč nakupovat u nás
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-6 text-center hover:border-gold/15 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-5 bg-gold/[0.06] rounded-xl flex items-center justify-center border border-gold/10">
                  <r.icon className="w-5 h-5 text-gold/70" strokeWidth={1.2} />
                </div>
                <h3 className="font-heading text-base text-white mb-2">{r.title}</h3>
                <p className="font-body text-white/40 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative bg-black py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <Image
            src="/images/logo.png"
            alt="Wood & Steak"
            width={100}
            height={70}
            className="mx-auto mb-8 opacity-50"
          />
          <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
            Připraveni na steakový zážitek?
          </h2>
          <p className="font-body text-white/40 text-base mb-10 max-w-lg mx-auto">
            Vyberte si z našeho sortimentu prémiových steaků, domácích omáček
            a vybavení pro grilování. Doprava po Praze zdarma.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sortiment"
              className="px-10 py-4 bg-gold text-black font-body text-sm font-medium tracking-wider uppercase hover:bg-gold-light transition-colors rounded-full"
            >
              Prohlédnout sortiment
            </Link>
            <Link
              href="/kontakt"
              className="flex items-center gap-2 text-white/45 font-body text-sm tracking-wide hover:text-gold transition-colors"
            >
              Máte dotaz? Napište nám
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
