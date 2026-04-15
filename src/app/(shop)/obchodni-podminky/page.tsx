export default function TermsPage() {
  return (
    <section className="bg-off-black min-h-screen py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl sm:text-5xl text-gold mb-4 text-center">
          Obchodni podminky
        </h1>
        <div className="gold-divider" />

        <div className="border border-gold/20 bg-black/40 p-8 sm:p-12">
          <p className="font-body text-white/60 text-base leading-relaxed">
            Obchodni podminky budou doplneny. Kontaktujte nas na{" "}
            <a
              href="mailto:info@woodandsteak.cz"
              className="text-gold hover:text-gold-light transition-colors underline underline-offset-2"
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
