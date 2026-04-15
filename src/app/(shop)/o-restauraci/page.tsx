import { ArrowRight } from "lucide-react";
import ImagePlaceholder from "@/components/shop/ImagePlaceholder";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-off-black py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <ImagePlaceholder
                type="restaurant"
                text="Wood & Steak Restaurace"
              />
              <div className="absolute inset-0 border border-gold/20" />
            </div>

            <div>
              <h1 className="font-heading text-4xl sm:text-5xl text-gold mb-6">
                O restauraci
              </h1>
              <div className="w-16 h-px bg-gold mb-8" />
              <p className="font-body text-white/60 text-base sm:text-lg leading-relaxed mb-6">
                Wood & Steak je premiova steakhouse v srdci Vinohrad, nedaleko
                Namesti Miru. Nase restaurace nabizi jedinecny gastronomicky
                zazitek, kde se snoubi tradice s modernimi technikami pripravy
                masa.
              </p>
              <p className="font-body text-white/60 text-base sm:text-lg leading-relaxed">
                Specializujeme se na peclive vybirane kusy masa, ktere
                pripravujeme metodami dry-aging a sous-vide. Kazdy steak je u
                nas umeni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Concept - Cream Section */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-black mb-6">
            Premiovy koncept
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="font-body text-black/60 text-base sm:text-lg leading-relaxed mb-6">
            Nase filozofie stoji na jednoduchosti a kvalite. Vybirame pouze ty
            nejlepsi suroviny od provereny dodavatelu a kazdy produkt
            pripravujeme s maximalni peci. Od stolu v restauraci az po vasi
            kuchyn &mdash; kvalita zustava stejna.
          </p>
          <p className="font-body text-black/60 text-base sm:text-lg leading-relaxed mb-10">
            Prostrednictvim naseho e-shopu prinasime steakovy zazitek primo k
            vam domu. Najdete zde presne to, co podavame v restauraci &mdash;
            premiove maso, domaci omacky, koreni a profesionalni vybaveni pro
            grilovani.
          </p>
          <a
            href="https://www.woodandsteak.cz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold text-gold-dark font-body text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all duration-300"
          >
            Navstivit web restaurace
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </section>

      {/* Location - Dark Section */}
      <section className="bg-off-black py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-white mb-6">
            Najdete nas ve Vinohradech
          </h2>
          <div className="gold-divider" />
          <p className="font-body text-white/50 text-base sm:text-lg leading-relaxed">
            Nase restaurace se nachazi v klidne casti Vinohrad, jen par minut
            chuze od Namesti Miru. Prijdte nas navstivit a ochutnejte nase
            steaky na miste, nebo si objednejte primo z naseho e-shopu.
          </p>
        </div>
      </section>
    </>
  );
}
