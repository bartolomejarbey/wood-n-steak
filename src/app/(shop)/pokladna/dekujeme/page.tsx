"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

function DekujemeContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <section className="min-h-screen bg-off-black py-24 sm:py-32">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-16 h-16 mx-auto mb-8 border border-gold/20 rounded-full flex items-center justify-center bg-gold/[0.04]">
          <CheckCircle className="w-8 h-8 text-gold/80" strokeWidth={1} />
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl text-cream mb-6">
          Děkujeme za objednávku!
        </h1>

        {orderNumber && (
          <div className="mb-8">
            <p className="font-body text-white/30 text-xs uppercase tracking-[0.2em] mb-2">
              Číslo objednávky
            </p>
            <p className="font-heading text-3xl sm:text-4xl text-gold">
              {orderNumber}
            </p>
          </div>
        )}

        <div className="w-12 h-px bg-gold/30 mx-auto my-8" />

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 mb-10 text-left space-y-4">
          <h2 className="font-heading text-lg text-white mb-4 text-center">
            Co bude následovat?
          </h2>
          <div className="space-y-3">
            <p className="font-body text-white/50 text-sm leading-relaxed">
              <span className="text-gold/70 font-medium">1.</span> Na váš e-mail jsme odeslali potvrzení objednávky s detaily.
            </p>
            <p className="font-body text-white/50 text-sm leading-relaxed">
              <span className="text-gold/70 font-medium">2.</span> Naše kuchyně začne připravovat vaši objednávku.
            </p>
            <p className="font-body text-white/50 text-sm leading-relaxed">
              <span className="text-gold/70 font-medium">3.</span> Před doručením vás budeme kontaktovat pro domluvení přesného času.
            </p>
            <p className="font-body text-white/50 text-sm leading-relaxed">
              <span className="text-gold/70 font-medium">4.</span> Objednávku vám doručíme až ke dveřím.
            </p>
          </div>
        </div>

        <p className="font-body text-white/30 text-sm mb-8">
          V případě dotazů nás kontaktujte na{" "}
          <a href="mailto:info@woodandsteak.cz" className="text-gold/70 hover:text-gold transition-colors">
            info@woodandsteak.cz
          </a>
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3.5 bg-gold text-black font-body text-sm font-medium tracking-wider uppercase rounded-full hover:bg-gold-light transition-colors"
        >
          Zpět na hlavní stránku
        </Link>
      </div>
    </section>
  );
}

export default function DekujemePage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-screen bg-off-black py-24 sm:py-32">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="font-body text-white/40">Načítání...</p>
          </div>
        </section>
      }
    >
      <DekujemeContent />
    </Suspense>
  );
}
