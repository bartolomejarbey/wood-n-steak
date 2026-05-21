"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getCategories, getFeaturedProducts } from "@/lib/data";
import ProductCard from "@/components/shop/ProductCard";
import { KineticHeading } from "@/components/ui/KineticHeading";
import { ProcessShowcase } from "@/components/shop/ProcessShowcase";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const heroImages = [
  { src: "/images/photos/tbone-grill.jpg", alt: "T-bone steak grilovaný na přímém ohni" },
  { src: "/images/photos/hero-dryagers.jpg", alt: "Zrací vitríny DRY-AGER s visícím hovězím masem" },
  { src: "/images/photos/interior-wide.jpg", alt: "Interiér steakhouse Wood & Steak — cihlový valený strop a dřevěné stoly" },
  { src: "/images/photos/interior-woman-wine.jpg", alt: "Atmosféra restaurace Wood & Steak ve Vinohradech" },
];

const categoryImages: Record<string, { src: string; alt: string }> = {
  steaky: {
    src: "/images/photos/tbone-grill.jpg",
    alt: "T-bone steak na grilu — ukázka sortimentu steaků",
  },
  "hovezi-maso": {
    src: "/images/photos/food-skewers-beef.jpg",
    alt: "Marinované hovězí špízy grilované do křupava",
  },
  "domaci-omacky": {
    src: "/images/photos/food-tartare.jpg",
    alt: "Steak s domácí bylinkovou omáčkou chimichurri",
  },
};

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
      <section className="relative bg-black py-32 sm:py-48 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, rgba(164,135,66,0.18) 0%, transparent 55%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overline inline-block mb-8"
          >
            Steakhouse · Vinohrady · od 2018
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl sm:text-7xl md:text-8xl text-white leading-[0.95]"
          >
            Prémiový steak.
          </motion.h2>
          <KineticHeading
            text="Přímo od zdroje."
            className="text-6xl sm:text-7xl md:text-8xl text-gradient-gold italic mt-2"
            stagger={0.1}
          />

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-20 h-px bg-gold mx-auto my-10 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-body text-white/60 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Neprodáváme maso. Servírujeme zážitek. Každý steak z&nbsp;naší
            kuchyně prošel rukama řezníka, zrací komorou a kontrolou kvality,
            než ho necháme putovat k&nbsp;vám.
          </motion.p>
        </div>
      </section>

      {/* Process showcase */}
      <ProcessShowcase />

      {/* Kategorie */}
      <section className="relative bg-cream py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="font-body text-gold-dark/60 text-xs tracking-[0.3em] uppercase">Nabídka</span>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-black mt-2">
              Produkty
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-5 auto-rows-[180px] sm:auto-rows-[220px]">
            {categories.map((cat, i) => {
              // 3-category layout: big hero (Steaky) + 2 cards stacked on the right
              const spans = [
                "col-span-2 md:col-span-4 row-span-2", // 0 Steaky
                "col-span-2 md:col-span-2 row-span-1", // 1 Hovězí maso
                "col-span-2 md:col-span-2 row-span-1", // 2 Domácí omáčky
              ];
              const span = spans[i] ?? "col-span-2 md:col-span-2 row-span-1";
              const img = categoryImages[cat.slug];
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={span}
                >
                  <Link
                    href={`/sortiment/${cat.slug}`}
                    className="group relative overflow-hidden bg-black rounded-3xl block h-full"
                  >
                    {img ? (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-off-black" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />
                    <div className="absolute top-5 left-5 w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-3 transition-all duration-500">
                      <ArrowRight className="w-4 h-4 text-gold" strokeWidth={2} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                      <span className="font-body text-gold/70 text-[10px] tracking-[0.25em] uppercase">0{i + 1}</span>
                      <h3 className="mt-2 font-heading text-2xl sm:text-3xl text-white group-hover:text-gold transition-colors duration-300">
                        {cat.name}
                      </h3>
                      <p className="font-body text-white/50 text-sm line-clamp-1 mt-1">
                        {cat.description}
                      </p>
                      <div className="w-8 h-px bg-gold/50 mt-3 group-hover:w-16 transition-all duration-500" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doporučujeme */}
      <section className="relative bg-black py-28 sm:py-40 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overline"
              >
                Doporučujeme
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mt-3 font-heading text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05]"
              >
                Naše nejlepší kousky.
              </motion.h2>
            </div>
            <Link
              href="/sortiment"
              className="group inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors self-start md:self-auto"
            >
              <span className="text-xs tracking-[0.25em] uppercase">Všechny produkty</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.slice(0, 8).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} variant="dark" />
              </motion.div>
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
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/photos/interior-bull-logo.jpg"
                alt="Interiér steakhouse Wood & Steak — dřevěné logo býka na stěně s cihlovým valeným stropem"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
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

      {/* Jak nakupovat — editorial split */}
      <section className="relative bg-black overflow-hidden">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* Sticky photo panel */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-0">
            <Image
              src="/images/photos/food-skewers-chicken.jpg"
              alt="Grilované maso v restauraci Wood & Steak — ilustrace k procesu objednávky"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/20 to-black/70" />
            <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12">
              <span className="overline">Jak nakupovat</span>
              <div>
                <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white leading-[1.02]">
                  Od výběru<br />
                  <span className="italic text-gradient-gold">ke dveřím.</span>
                </h2>
                <div className="gold-divider-left mt-6" />
                <p className="font-body text-white/70 text-sm sm:text-base max-w-sm">
                  Tři kroky mezi vámi a prvním plátkem steaku.
                </p>
              </div>
            </div>
          </div>

          {/* Steps panel */}
          <div className="lg:col-span-7 relative bg-[#0a0a0a] py-16 lg:py-24 px-6 sm:px-10 lg:px-16 flex flex-col justify-center">
            <ol className="space-y-10 lg:space-y-14 relative">
              {/* Vertical guide line */}
              <div className="absolute left-[18px] top-4 bottom-4 w-px bg-white/[0.06]" aria-hidden />

              {[
                {
                  num: "01",
                  title: "Vyberte prémiové kousky",
                  desc: "Projděte si steaky, omáčky, koření a vybavení — každý produkt pečlivě popsán.",
                  time: "≈ 5 min",
                },
                {
                  num: "02",
                  title: "Zaplaťte, jak vám vyhovuje",
                  desc: "Minimální objednávka 500 Kč. Karta online, převod s QR nebo dobírka.",
                  time: "Bezpečná platba",
                },
                {
                  num: "03",
                  title: "Doručíme do 24 hodin",
                  desc: "Vlastní rozvoz po Praze a okolí. Chlazené boxy, doprava zdarma od 500 Kč.",
                  time: "Do 24 h",
                },
              ].map((step, i) => (
                <motion.li
                  key={step.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-14"
                >
                  <span className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full border border-gold/40 bg-black font-heading italic text-gold text-lg">
                    {i + 1}
                  </span>
                  <span className="font-body text-white/30 text-[10px] tracking-[0.3em] uppercase">
                    {step.time}
                  </span>
                  <h3 className="mt-1 font-heading text-2xl sm:text-3xl text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-3 font-body text-white/50 text-sm sm:text-base leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </motion.li>
              ))}
            </ol>

            <div className="mt-12 pl-14">
              <Link
                href="/jak-nakupovat"
                className="group inline-flex items-center gap-3 font-body text-white/70 hover:text-gold text-sm tracking-[0.2em] uppercase link-underline"
              >
                Podrobný průvodce
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
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
