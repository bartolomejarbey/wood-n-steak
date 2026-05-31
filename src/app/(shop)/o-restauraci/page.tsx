import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Utensils } from "lucide-react";
import { StoryTimeline } from "@/components/shop/StoryTimeline";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "O restauraci",
  description:
    "Wood & Steak je steakhouse ve Vinohradech od roku 2018. Dry-aging, otevřený oheň a poctivé maso. Náš příběh, kuchyně a e-shop s rozvozem po Praze.",
  path: "/o-restauraci",
});

export default function AboutPage() {
  return (
    <>
      {/* Hero — fullbleed darkened photo */}
      <section className="relative h-[65vh] min-h-[460px] overflow-hidden">
        <Image
          src="/images/photos/interior-wide.jpg"
          alt=""
          aria-hidden
          fill
          priority
          className="object-cover scale-[1.02]"
          sizes="100vw"
        />
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
            <span className="overline">Náš příběh</span>
            <h1 className="mt-3 font-heading text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
              O restauraci
            </h1>
            <div className="gold-divider-left" />
            <p className="font-body text-white/80 text-base sm:text-lg max-w-md">
              Steakhouse ve Vinohradech — dry-aging, otevřený oheň a poctivé maso od roku 2018.
            </p>
          </div>
        </div>
      </section>

      {/* Intro text under hero */}
      <section className="bg-black py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-body text-white/60 text-lg sm:text-xl leading-relaxed">
            Wood & Steak je prémiová steakhouse v srdci Vinohrad, nedaleko
            Náměstí Míru. Specializujeme se na pečlivě vybírané kusy masa,
            které připravujeme metodami dry-aging a sous-vide.
          </p>
          <p className="mt-5 font-body text-white/60 text-lg sm:text-xl leading-relaxed">
            Každý steak je u nás umění — a tímto e-shopem ho posíláme i k vám
            domů.
          </p>
        </div>
      </section>

      {/* Premium Concept — Cream asymmetric */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)]">
                <Image
                  src="/images/photos/interior-dryager-lady.jpg"
                  alt="Zrající hovězí v dry-ager boxu — pohled do kuchyně Wood & Steak"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-gold/20 rounded-2xl pointer-events-none" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <span className="font-body text-gold-dark/60 text-xs tracking-[0.3em] uppercase">Filozofie</span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-black mt-2 leading-tight">
                Prémiový koncept
              </h2>
              <div className="w-10 h-px bg-gold/50 my-8" />
              <p className="font-body text-black/55 text-base sm:text-lg leading-relaxed mb-5">
                Naše filozofie stojí na jednoduchosti a kvalitě. Vybíráme pouze
                ty nejlepší suroviny od prověřených dodavatelů a každý produkt
                připravujeme s maximální péčí. Od stolu v restauraci až po Vaši
                kuchyň — kvalita zůstává stejná.
              </p>
              <p className="font-body text-black/55 text-base sm:text-lg leading-relaxed">
                Prostřednictvím našeho e-shopu přinášíme steakový zážitek přímo
                k Vám domů. Najdete zde přesně to, co podáváme v restauraci —
                prémiové maso, domácí omáčky, koření a profesionální vybavení
                pro grilování.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story timeline */}
      <StoryTimeline />

      {/* Galerie — photo strip */}
      <section className="relative bg-black py-20 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Atmosféra</span>
          <h2 className="font-heading text-3xl sm:text-4xl text-white mt-2">
            Pohled do kuchyně a restaurace
          </h2>
          <div className="w-12 h-px bg-gold/30 mx-auto mt-6" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { src: "/images/photos/chef-flame.jpg", alt: "Kuchař u otevřeného ohně — příprava steaku na přímém ohni" },
            { src: "/images/photos/hero-dryagers.jpg", alt: "Zrací vitríny DRY-AGER s hovězími kusy" },
            { src: "/images/photos/butcher-ribcage.jpg", alt: "Řezník s kusem hovězího žebra v bourárně" },
            { src: "/images/photos/couple-wine.jpg", alt: "Hosté u stolu s vínem ve Wood & Steak" },
            { src: "/images/photos/interior-woman-wine.jpg", alt: "Žena s sklenicí vína v interiéru restaurace" },
            { src: "/images/photos/food-tartare.jpg", alt: "Hovězí tatarák se žloutkem a domácí omáčkou" },
            { src: "/images/photos/tbone-grill.jpg", alt: "T-bone steak na grilu" },
            { src: "/images/photos/dog-dryager.jpg", alt: "Maskot Wood & Steak — bílý samojed u zrací vitríny" },
          ].map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl bg-off-black group ${
                i === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* Location — Map + address */}
      <section className="bg-black py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Lokace</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-white mt-2">
              Najdete nás ve Vinohradech
            </h2>
            <div className="w-12 h-px bg-gold/30 mx-auto mt-6" />
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gold/10">
            <iframe
              title="Wood & Steak — Belgická 24, Praha 2"
              src="https://www.google.com/maps?q=Belgick%C3%A1+24,+Praha+2,+120+00&output=embed"
              className="absolute inset-0 w-full h-full grayscale-[0.35] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <span className="font-body text-gold/40 text-[10px] tracking-[0.25em] uppercase">Adresa</span>
              <p className="mt-2 font-heading text-xl text-white leading-snug">
                Belgická 24<br />
                <span className="text-white/70">Vinohrady, Praha 2 — 120 00</span>
              </p>
              <p className="mt-3 font-body text-white/45 text-sm leading-relaxed">
                Pár minut chůze od Náměstí Míru. Nejbližší metro A — Náměstí Míru.
              </p>
            </div>
            <div className="sm:text-right">
              <span className="font-body text-gold/40 text-[10px] tracking-[0.25em] uppercase">Otevírací doba</span>
              <p className="mt-2 font-heading text-xl text-white leading-snug">
                Po–Čt &nbsp;11:30 – 23:00<br />
                Pá–So &nbsp;11:30 – 00:00<br />
                <span className="text-white/70">Ne &nbsp;zavřeno</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BIG CTA — visit restaurant website */}
      <section className="relative bg-black overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, rgba(164,135,66,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(164,135,66,0.25) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <span className="overline">Restaurant · Vinohrady</span>
          <h2 className="mt-5 font-heading text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
            Zažijte Wood & Steak <br className="hidden sm:block" />
            <span className="text-gold">naživo.</span>
          </h2>
          <p className="mt-6 font-body text-white/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Rezervujte si stůl v naší restauraci, prohlédněte si menu, otevírací
            dobu a galerii interiéru na hlavním webu.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.woodandsteak.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gold text-black font-body text-base font-semibold tracking-wider uppercase rounded-full hover:bg-gold-light transition-all duration-300 shadow-[0_20px_60px_-20px_rgba(164,135,66,0.6)] hover:shadow-[0_25px_70px_-15px_rgba(164,135,66,0.8)] hover:-translate-y-0.5"
            >
              <Utensils className="w-5 h-5" strokeWidth={2} />
              Navštívit restauraci
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
            </a>

            <a
              href="https://www.woodandsteak.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 font-body text-sm tracking-wide hover:text-gold transition-colors"
            >
              <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              woodandsteak.cz
            </a>
          </div>

          <div className="mt-12 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left sm:text-center">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold/70">Rezervace</p>
              <p className="mt-2 font-heading text-lg text-white">Online 24/7</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold/70">Kuchyně</p>
              <p className="mt-2 font-heading text-lg text-white">Steaky · Grill</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold/70">Lokace</p>
              <p className="mt-2 font-heading text-lg text-white">Vinohrady, Praha 2</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
