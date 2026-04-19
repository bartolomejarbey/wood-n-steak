import { ArrowRight } from "lucide-react";
import ImagePlaceholder from "@/components/shop/ImagePlaceholder";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-off-black py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative rounded-2xl overflow-hidden">
              <ImagePlaceholder
                type="restaurant"
                text="Wood & Steak Restaurace"
              />
            </div>

            <div>
              <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Náš příběh</span>
              <h1 className="font-heading text-4xl sm:text-5xl text-cream mt-2 mb-6">
                O restauraci
              </h1>
              <div className="w-10 h-px bg-gold/40 mb-8" />
              <p className="font-body text-white/50 text-base sm:text-lg leading-relaxed mb-5">
                Wood & Steak je prémiová steakhouse v srdci Vinohrad, nedaleko
                Náměstí Míru. Naše restaurace nabízí jedinečný gastronomický
                zážitek, kde se snoubí tradice s moderními technikami přípravy
                masa.
              </p>
              <p className="font-body text-white/50 text-base sm:text-lg leading-relaxed">
                Specializujeme se na pečlivě vybírané kusy masa, které
                připravujeme metodami dry-aging a sous-vide. Každý steak je u
                nás umění.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Concept - Cream Section */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-body text-gold-dark/60 text-xs tracking-[0.3em] uppercase">Filozofie</span>
          <h2 className="font-heading text-3xl sm:text-4xl text-black mt-2 mb-6">
            Prémiový koncept
          </h2>
          <div className="w-10 h-px bg-gold/50 mx-auto mb-8" />
          <p className="font-body text-black/55 text-base sm:text-lg leading-relaxed mb-5">
            Naše filozofie stojí na jednoduchosti a kvalitě. Vybíráme pouze ty
            nejlepší suroviny od prověřených dodavatelů a každý produkt
            připravujeme s maximální péčí. Od stolu v restauraci až po Vaši
            kuchyň — kvalita zůstává stejná.
          </p>
          <p className="font-body text-black/55 text-base sm:text-lg leading-relaxed mb-10">
            Prostřednictvím našeho e-shopu přinášíme steakový zážitek přímo k
            Vám domů. Najdete zde přesně to, co podáváme v restauraci —
            prémiové maso, domácí omáčky, koření a profesionální vybavení pro
            grilování.
          </p>
          <a
            href="https://www.woodandsteak.cz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold-dark font-body text-sm tracking-wide hover:text-gold transition-colors"
          >
            Navštívit web restaurace
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </section>

      {/* Location - Dark Section */}
      <section className="bg-forest py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Lokace</span>
          <h2 className="font-heading text-3xl sm:text-4xl text-white mt-2 mb-6">
            Najdete nás ve Vinohradech
          </h2>
          <div className="w-12 h-px bg-gold/30 mx-auto mb-8" />
          <p className="font-body text-white/45 text-base sm:text-lg leading-relaxed">
            Naše restaurace se nachází v klidné části Vinohrad, jen pár minut
            chůze od Náměstí Míru. Přijďte nás navštívit a ochutnejte naše
            steaky na místě, nebo si objednejte přímo z našeho e-shopu.
          </p>
        </div>
      </section>
    </>
  );
}
