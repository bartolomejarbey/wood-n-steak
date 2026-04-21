"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FAQ } from "@/components/shop/FAQ";

const steps = [
  {
    num: "01",
    title: "Vyberte si z našeho sortimentu",
    subtitle: "Prohlédněte si naši nabídku",
    description:
      "Projděte náš pečlivě vybraný sortiment prémiových steaků, domácích omáček, koření a vybavení. Každý produkt si můžete prohlédnout do detailu — najdete u něj popis, cenu i dostupnost.",
    features: [
      "Steaky dry-aged i čerstvé",
      "Domácí omáčky z naší kuchyně",
      "Nože, prkénka a grilovací vybavení",
    ],
    image: "/images/photos/hero-dryagers.jpg",
    alt: "Zrací vitríny DRY-AGER v restauraci Wood & Steak",
  },
  {
    num: "02",
    title: "Přidejte do košíku",
    subtitle: "Zkontrolujte si objednávku",
    description:
      "V košíku si zkontrolujte svůj výběr, upravte množství a podívejte se na celkovou cenu. Minimální hodnota objednávky je 500 Kč — to odpovídá přibližně jednomu kvalitnímu steaku.",
    features: [
      "Přehledný souhrn položek",
      "Úprava množství jedním klikem",
      "Min. objednávka 500 Kč",
    ],
    image: "/images/photos/food-burger.jpg",
    alt: "Prémiový burger z čerstvě mletého hovězího",
  },
  {
    num: "03",
    title: "Dokončete objednávku",
    subtitle: "Bezpečná platba",
    description:
      "Vyplňte dodací údaje a zvolte způsob platby. Přijímáme platbu kartou online přes zabezpečenou bránu Comgate, bankovním převodem s QR kódem i dobírkou.",
    features: [
      "Platba kartou online (Comgate)",
      "Bankovní převod s QR kódem",
      "Dobírka při převzetí",
    ],
    image: "/images/photos/couple-dining.jpg",
    alt: "Večeře v restauraci Wood & Steak",
  },
  {
    num: "04",
    title: "Doručíme až ke dveřím",
    subtitle: "Vlastní rozvoz po Praze",
    description:
      "Doručujeme vlastním rozvozem po Praze a okolí. Zajišťujeme maximální čerstvost a kvalitu vašich produktů. Před doručením vás kontaktujeme pro domluvení přesného času.",
    features: [
      "Praha a blízké okolí",
      "Doprava zdarma",
      "Kontaktujeme vás před doručením",
    ],
    image: "/images/photos/shop-entrance.jpg",
    alt: "Vchod do Wood & Steak ve Vinohradech",
  },
];

export default function HowToShopPage() {
  return (
    <>
      {/* Hero — fullbleed darkened photo */}
      <section className="relative h-[65vh] min-h-[460px] overflow-hidden">
        <Image
          src="/images/photos/chef-flame.jpg"
          alt=""
          aria-hidden
          fill
          priority
          className="object-cover scale-[1.02]"
          sizes="100vw"
        />
        {/* Heavy dark wash for readability */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 55%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 70%)",
          }}
        />

        <div className="relative z-10 h-full flex items-end max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div>
            <span className="overline">Průvodce nákupem</span>
            <h1 className="mt-3 font-heading text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
              Jak nakupovat
            </h1>
            <div className="gold-divider-left" />
            <p className="font-body text-white/80 text-base sm:text-lg max-w-md">
              Čtyři kroky mezi výběrem a prvním řezem nožem.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial steps — alternating photo + text */}
      <section className="bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-24 sm:space-y-32">
          {steps.map((step, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={step.num}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-7 relative">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute top-6 left-6 font-heading italic text-gold/90 text-5xl md:text-6xl leading-none">
                      {step.num}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <span className="overline">{step.subtitle}</span>
                  <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-white leading-tight">
                    {step.title}
                  </h2>
                  <div className="gold-divider-left" />
                  <p className="font-body text-white/55 text-base leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {step.features.map((f) => (
                      <li
                        key={f}
                        className="font-body text-white/55 text-sm leading-relaxed flex gap-3"
                      >
                        <span className="text-gold/70 font-heading">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA Banner */}
      <section className="relative bg-black py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
            Připraveni na steakový zážitek?
          </h2>
          <div className="gold-divider" />
          <p className="font-body text-white/45 text-base mb-10 max-w-lg mx-auto">
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
