export default function TermsPage() {
  return (
    <section className="bg-off-black min-h-screen py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Právní informace</span>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mt-2">
            Obchodní podmínky
          </h1>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 sm:p-12">
          <p className="font-body text-white/50 text-base leading-relaxed">
            Obchodní podmínky budou doplněny. Kontaktujte nás na{" "}
            <a
              href="mailto:info@woodandsteak.cz"
              className="text-gold/70 hover:text-gold transition-colors"
            >
              info@woodandsteak.cz
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
