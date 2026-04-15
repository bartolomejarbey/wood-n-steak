"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

function DekujemeContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <section className="min-h-screen bg-forest py-24 sm:py-32">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 mx-auto mb-8 border border-gold/30 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-gold" strokeWidth={1} />
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl text-white mb-6">
          Dekujeme za objednavku!
        </h1>

        {orderNumber && (
          <div className="mb-8">
            <p className="font-body text-white/50 text-sm uppercase tracking-wider mb-2">
              Cislo objednavky
            </p>
            <p className="font-heading text-3xl sm:text-4xl text-gold">
              {orderNumber}
            </p>
          </div>
        )}

        <div className="gold-divider" />

        <div className="bg-black/30 border border-gold/20 p-8 mb-10 text-left space-y-4">
          <h2 className="font-heading text-lg text-white mb-4 text-center">
            Co bude nasledovat?
          </h2>
          <div className="space-y-3">
            <p className="font-body text-white/60 text-sm leading-relaxed">
              <span className="text-gold font-semibold">1.</span> Na vas e-mail jsme odeslali potvrzeni objednavky s detaily.
            </p>
            <p className="font-body text-white/60 text-sm leading-relaxed">
              <span className="text-gold font-semibold">2.</span> Nase kuchyne zacne pripravovat vasi objednavku.
            </p>
            <p className="font-body text-white/60 text-sm leading-relaxed">
              <span className="text-gold font-semibold">3.</span> Pred dorucenim vas budeme kontaktovat pro domluveni presneho casu.
            </p>
            <p className="font-body text-white/60 text-sm leading-relaxed">
              <span className="text-gold font-semibold">4.</span> Objednavku vam dorucime az ke dverim.
            </p>
          </div>
        </div>

        <p className="font-body text-white/40 text-sm mb-8">
          V pripade dotazu nas kontaktujte na{" "}
          <a href="mailto:info@woodandsteak.cz" className="text-gold hover:underline">
            info@woodandsteak.cz
          </a>
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3.5 bg-gold text-black font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold-light transition-colors"
        >
          Zpet na hlavni stranku
        </Link>
      </div>
    </section>
  );
}

export default function DekujemePage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-screen bg-forest py-24 sm:py-32">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="font-body text-white/50">Nacitani...</p>
          </div>
        </section>
      }
    >
      <DekujemeContent />
    </Suspense>
  );
}
