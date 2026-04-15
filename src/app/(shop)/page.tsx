"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Truck, CreditCard, Package, MapPin, Clock } from "lucide-react";
import { getCategories, getFeaturedProducts } from "@/lib/data";
import ProductCard from "@/components/shop/ProductCard";
import ImagePlaceholder from "@/components/shop/ImagePlaceholder";
import { useState } from "react";

export default function HomePage() {
  const categories = getCategories();
  const featured = getFeaturedProducts();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    // Will connect to API when Supabase is ready
    setSubscribed(true);
    setEmail("");
  };

  return (
    <>
      {/* HERO — full screen */}
      <section className="relative min-h-screen flex items-center justify-center bg-forest overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-forest via-black/80 to-forest-light" />
        </div>

        {/* Brand mark top left */}
        <div className="absolute top-28 left-8 sm:left-12 z-10">
          <p className="font-heading text-gold/60 text-xs tracking-[0.4em] uppercase">
            Wood & Steak
          </p>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-white leading-tight mb-6">
            Steak jako z restaurace.
            <br />
            <span className="text-gold">U vas doma.</span>
          </h1>

          <div className="gold-divider" />

          <p className="font-body text-white/60 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Premiove maso a domaci omacky z Wood & Steak.
            <br className="hidden sm:block" />
            Vinohrady, Praha.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sortiment"
              className="px-8 py-3.5 border border-gold text-gold font-body text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all duration-300"
            >
              Prohlednout sortiment
            </Link>
            <Link
              href="/o-restauraci"
              className="flex items-center gap-2 text-white/70 font-body text-sm tracking-wide hover:text-gold transition-colors"
            >
              O restauraci
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/40" />
        </div>
      </section>

      {/* SECTION 2 — Brand Statement */}
      <section className="bg-black py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-cream mb-6">
            Vitejte na e-shopu Wood & Steak
          </h2>
          <div className="gold-divider" />
          <p className="font-body text-white/50 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Great steakhouse ve Vinohradech nedaleko Namesti Miru. Prinasime vam vse,
            co potrebujete pro pripravu a grilovani dokonaleho steaku. Na nasem e-shopu
            najdete peclive vybrany sortiment &mdash; od kvalitniho masa, pres domaci
            omacky az po noze a dalsi vybaveni pro pravy steakovy zazitek.
          </p>
        </div>
      </section>

      {/* SECTION 3 — Categories */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl text-black text-center mb-16">
            Sortiment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/sortiment/${cat.slug}`}
                className="group relative overflow-hidden bg-black"
              >
                <ImagePlaceholder
                  type="category"
                  className="group-hover:scale-105 transition-transform duration-500"
                  text={cat.name}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-xl text-gold mb-1 group-hover:text-gold-light transition-colors">
                    {cat.name}
                  </h3>
                  <p className="font-body text-white/50 text-sm line-clamp-1">
                    {cat.description}
                  </p>
                  <ArrowRight className="w-5 h-5 text-gold/50 mt-3 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </div>
                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Featured Products */}
      <section className="bg-forest py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
              Doporucujeme
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} variant="dark" />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/sortiment"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold text-gold font-body text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all duration-300"
            >
              Zobrazit vse
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — O restauraci */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <ImagePlaceholder type="restaurant" text="Restaurace Wood & Steak" />
              <div className="absolute inset-0 border border-gold/20" />
            </div>

            <div>
              <h2 className="font-heading text-3xl sm:text-4xl text-black mb-6">
                Z restaurace ve Vinohradech
              </h2>
              <div className="w-16 h-px bg-gold mb-8" />
              <p className="font-body text-black/60 text-base leading-relaxed mb-6">
                Wood & Steak je steakhouse ve Vinohradech nedaleko Namesti Miru,
                kde servitujeme peclive vybirane maso a domaci omacky. Nase kuchyne
                vyuziva tradicni postupy i moderni techniky, jako je dry-aging ci
                sous-vide, abychom vam donesli ten nejlepsi zazitek.
              </p>
              <p className="font-body text-black/60 text-base leading-relaxed mb-8">
                Nyni si muzete vy uzit steakovy zazitek i u vas doma. Na nasem
                e-shopu najdete presne to, co podarume v restauraci &mdash;
                kvalitni maso, domaci omacky, koreni a vybaveni.
              </p>
              <a
                href="https://www.woodandsteak.cz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold text-gold-dark font-body text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all duration-300"
              >
                Navstivit Wood & Steak
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Jak nakupovat (3 kroky) */}
      <section className="bg-black py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
              Jak nakupovat
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: ShoppingBag,
                title: "Vyberte",
                desc: "Projdete nas sortiment a vyberte si z premiovych steaku, omacek a dalsiho vybaveni.",
              },
              {
                icon: CreditCard,
                title: "Objednejte",
                desc: "Minimalni objednavka 500 Kc. Zaplaite kartou, prevodem nebo dobirkou.",
              },
              {
                icon: Truck,
                title: "Dorucime",
                desc: "Praha a okoli. Vlastni rozvoz s garanci cerstosti a kvality.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 border border-gold/30 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-gold" strokeWidth={1} />
                </div>
                <h3 className="font-heading text-xl text-white mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — Doruceni a info */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl text-black leading-tight">
                Dorucujeme
                <br />
                po Praze
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Package,
                  title: "Min. objednavka",
                  desc: "500 Kc",
                },
                {
                  icon: Truck,
                  title: "Doprava",
                  desc: "Zdarma",
                },
                {
                  icon: MapPin,
                  title: "Oblasti rozvozu",
                  desc: "Praha a okoli, Praha-vychod, Kladno, Melnik, Nymburk",
                },
                {
                  icon: Clock,
                  title: "Platby",
                  desc: "Kartou online, bankovni prevod, dobirka",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 border border-gold/10"
                >
                  <item.icon className="w-5 h-5 text-gold mb-3" strokeWidth={1.5} />
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

      {/* SECTION 8 — Newsletter */}
      <section className="bg-black py-24 sm:py-32">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
            Budte v obraze
          </h2>
          <div className="gold-divider" />
          <p className="font-body text-white/50 text-sm mb-8">
            Prihlaste se k odberu novinek a dozvite se jako prvni o novych produktech,
            sezonnnich nabidkach a akcich.
          </p>

          {subscribed ? (
            <p className="font-body text-gold text-sm">
              Dekujeme za prihlaseni k odberu!
            </p>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vas@email.cz"
                className="flex-1 px-4 py-3 bg-cream/10 border border-gold/30 text-white font-body text-sm placeholder:text-white/30 focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gold text-black font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold-light transition-colors"
              >
                Odebirat
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
