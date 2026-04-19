"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Truck, CreditCard, Package, MapPin, Clock } from "lucide-react";
import { getCategories, getFeaturedProducts } from "@/lib/data";
import ProductCard from "@/components/shop/ProductCard";
import ImagePlaceholder from "@/components/shop/ImagePlaceholder";
import { useState, useEffect, useCallback } from "react";

const heroImages = [
  { src: "/images/hero-4.jpg", alt: "Steaky z Wood & Steak" },
  { src: "/images/hero-3.jpg", alt: "Pokrm z restaurace" },
  { src: "/images/hero-1.jpg", alt: "Zrací boxy s masem" },
  { src: "/images/hero-2.jpg", alt: "Interiér restaurace Wood & Steak" },
];

export default function HomePage() {
  const categories = getCategories();
  const featured = getFeaturedProducts();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {heroImages.map((img, i) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-[1]" />

        {/* Logo top center */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10">
          <Image
            src="/images/logo.png"
            alt="Wood & Steak"
            width={180}
            height={127}
            className="opacity-70"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-white leading-[1.1] mb-6">
            Steak jako z restaurace.
            <br />
            <span className="text-gold">U vás doma.</span>
          </h1>

          <div className="w-12 h-px bg-gold/60 mx-auto my-8" />

          <p className="font-body text-white/60 text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed">
            Prémiové maso a domácí omáčky z&nbsp;Wood&nbsp;&amp;&nbsp;Steak.
            <br className="hidden sm:block" />
            Vinohrady, Praha.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sortiment"
              className="px-8 py-3.5 bg-gold text-black font-body text-sm font-medium tracking-wider uppercase hover:bg-gold-light transition-all duration-300 rounded-full"
            >
              Prohlédnout sortiment
            </Link>
            <Link
              href="/o-restauraci"
              className="flex items-center gap-2 text-white/50 font-body text-sm tracking-wide hover:text-white transition-colors"
            >
              O restauraci
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-0.5 rounded-full transition-all duration-500 ${
                i === currentSlide ? "w-8 bg-gold/80" : "w-4 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Brand Statement */}
      <section className="relative bg-black py-24 sm:py-32 overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-cream mb-6">
            Vítejte na e-shopu Wood&nbsp;&amp;&nbsp;Steak
          </h2>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-body text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Steakhouse ve Vinohradech nedaleko Náměstí Míru. Přinášíme vám vše,
            co potřebujete pro přípravu a grilování dokonalého steaku. Na našem e-shopu
            najdete pečlivě vybraný sortiment — od kvalitního masa, přes domácí
            omáčky až po nože a další vybavení pro pravý steakový zážitek.
          </p>
        </div>
      </section>

      {/* Kategorie */}
      <section className="relative bg-cream py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-gold-dark/60 text-xs tracking-[0.3em] uppercase">Nabídka</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-black mt-2">
              Sortiment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/sortiment/${cat.slug}`}
                className="group relative overflow-hidden bg-black rounded-2xl"
              >
                <ImagePlaceholder
                  type="category"
                  className="group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  text={cat.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-xl text-white mb-1 group-hover:text-gold transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="font-body text-white/40 text-sm line-clamp-1">
                    {cat.description}
                  </p>
                  <div className="w-5 h-px bg-gold/40 mt-4 group-hover:w-10 transition-all duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Doporučujeme */}
      <section className="relative bg-forest py-24 sm:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Výběr</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-white mt-2">
              Doporučujeme
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} variant="dark" />
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/sortiment"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-gold/40 text-gold font-body text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all duration-300 rounded-full"
            >
              Zobrazit vše
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* O restauraci */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/hero-2.jpg"
                alt="Interiér restaurace Wood & Steak"
                width={800}
                height={533}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>

            <div>
              <span className="font-body text-gold-dark/60 text-xs tracking-[0.3em] uppercase">Náš příběh</span>
              <h2 className="font-heading text-3xl sm:text-4xl text-black mt-2 mb-6">
                Z restaurace ve Vinohradech
              </h2>
              <div className="w-10 h-px bg-gold/50 mb-8" />
              <p className="font-body text-black/55 text-base leading-relaxed mb-5">
                Wood&nbsp;&amp;&nbsp;Steak je steakhouse ve Vinohradech nedaleko Náměstí Míru,
                kde servírujeme pečlivě vybírané maso a domácí omáčky. Naše kuchyně
                využívá tradiční postupy i moderní techniky, jako je dry-aging či
                sous-vide, abychom vám donesli ten nejlepší zážitek.
              </p>
              <p className="font-body text-black/55 text-base leading-relaxed mb-8">
                Nyní si můžete užít steakový zážitek i u vás doma. Na našem
                e-shopu najdete přesně to, co podáváme v restauraci —
                kvalitní maso, domácí omáčky, koření a vybavení.
              </p>
              <a
                href="https://www.woodandsteak.cz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold-dark font-body text-sm tracking-wide hover:text-gold transition-colors"
              >
                Navštívit Wood&nbsp;&amp;&nbsp;Steak
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Jak nakupovat - 3 kroky */}
      <section className="relative bg-black py-24 sm:py-32 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Jednoduše</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-white mt-2">
              Jak nakupovat
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShoppingBag,
                num: "01",
                title: "Vyberte",
                desc: "Projděte náš sortiment a vyberte si z prémiových steaků, omáček a dalšího vybavení.",
              },
              {
                icon: CreditCard,
                num: "02",
                title: "Objednejte",
                desc: "Minimální objednávka 500 Kč. Zaplaťte kartou, převodem nebo dobírkou.",
              },
              {
                icon: Truck,
                num: "03",
                title: "Doručíme",
                desc: "Praha a okolí. Vlastní rozvoz s garancí čerstvosti a kvality.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center bg-white/[0.03] rounded-2xl p-8 border border-white/[0.06] hover:border-gold/20 transition-all duration-300">
                <span className="font-body text-gold/25 text-[11px] tracking-[0.3em] uppercase">{step.num}</span>
                <div className="w-14 h-14 mx-auto my-5 bg-gold/[0.06] rounded-2xl flex items-center justify-center border border-gold/15">
                  <step.icon className="w-6 h-6 text-gold/80" strokeWidth={1} />
                </div>
                <h3 className="font-heading text-lg text-white mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-white/40 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doručení a info */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="font-body text-gold-dark/60 text-xs tracking-[0.3em] uppercase">Rozvoz</span>
              <h2 className="font-heading text-3xl sm:text-4xl text-black leading-tight mt-2">
                Doručujeme
                <br />
                po Praze
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: Package,
                  title: "Min. objednávka",
                  desc: "500 Kč",
                },
                {
                  icon: Truck,
                  title: "Doprava",
                  desc: "Zdarma",
                },
                {
                  icon: MapPin,
                  title: "Oblasti rozvozu",
                  desc: "Praha a okolí, Praha-východ, Kladno, Mělník, Nymburk",
                },
                {
                  icon: Clock,
                  title: "Platby",
                  desc: "Kartou online, bankovní převod, dobírka",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-black/[0.04] hover:border-gold/20 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                >
                  <div className="w-10 h-10 bg-gold/[0.08] rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-heading text-sm text-black mb-1">
                    {item.title}
                  </h4>
                  <p className="font-body text-black/50 text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative bg-black py-24 sm:py-32 overflow-hidden">
        <div className="relative max-w-xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
            Buďte v obraze
          </h2>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-body text-white/40 text-sm mb-8 max-w-md mx-auto">
            Přihlaste se k odběru novinek a dozvíte se jako první o nových produktech,
            sezónních nabídkách a akcích.
          </p>

          {subscribed ? (
            <div className="bg-gold/[0.06] border border-gold/15 rounded-2xl p-6">
              <p className="font-body text-gold text-sm">
                Děkujeme za přihlášení k odběru!
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vas@email.cz"
                className="flex-1 px-5 py-3.5 bg-white/[0.04] border border-white/[0.1] text-white font-body text-sm placeholder:text-white/25 focus:border-gold transition-colors rounded-full"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gold text-black font-body text-sm font-medium tracking-wider uppercase hover:bg-gold-light transition-colors rounded-full"
              >
                Odebírat
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
