"use client";

import { useState } from "react";
import { Mail, MessageCircleHeart, Sparkles, BellRing, ChefHat } from "lucide-react";
import { OpenStatus } from "@/components/shop/OpenStatus";

const infoRows = [
  {
    label: "Adresa",
    lines: ["Belgická 24", "Vinohrady, Praha 2 — 120 00"],
  },
  {
    label: "Telefon",
    lines: ["+420 725 724 540"],
    href: "tel:+420725724540",
  },
  {
    label: "E-mail",
    lines: ["info@woodandsteak.cz"],
    href: "mailto:info@woodandsteak.cz",
  },
  {
    label: "Restaurace",
    lines: ["woodandsteak.cz"],
    href: "https://www.woodandsteak.cz/",
    external: true,
  },
];

const newsletterPerks = [
  {
    icon: ChefHat,
    title: "Nové kousky dřív než ostatní",
    body: "Vzácné dry-aged řezy a limitované edice posíláme odběratelům 24 hodin před spuštěním e-shopu.",
  },
  {
    icon: Sparkles,
    title: "Recepty přímo od šéfkuchaře",
    body: "Jak naložit picanhu, kdy otočit T-bone a proč maso po grilu odpočívá. Bez žvástů, rovnou k věci.",
  },
  {
    icon: BellRing,
    title: "Pozvánky na tasting a akce",
    body: "Občas pořádáme degustace a steak nights v restauraci. Odběratelé dostávají pozvánky jako první.",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const [newsletter, setNewsletter] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSent(true);
    setNewsletter("");
  };

  return (
    <>
      {/* Warm, typography-driven CTA — no photo hero */}
      <section className="relative bg-black overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 20%, rgba(164,135,66,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(164,135,66,0.12) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 sm:pb-28 text-center">
          <span className="inline-flex items-center gap-2 font-body text-gold/80 text-xs tracking-[0.3em] uppercase">
            <MessageCircleHeart className="w-4 h-4" strokeWidth={1.5} />
            Ahoj, tady Wood &amp; Steak
          </span>
          <h1 className="mt-6 font-heading text-5xl sm:text-6xl md:text-7xl text-white leading-[1.02]">
            Napište nám.<br />
            <span className="text-gold italic">Kousneme jen&nbsp;do steaku.</span>
          </h1>
          <div className="gold-divider" />
          <p className="mt-2 font-body text-white/65 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Máte dotaz k objednávce, chcete poradit s výběrem masa, nebo si jen
            popovídat o dry-agingu? Jsme tady — a odpovídáme většinou dřív, než
            stihnete vychladit víno.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="#napiste-nam"
              className="inline-flex items-center gap-3 px-9 py-4 bg-gold text-black font-body text-sm font-semibold tracking-[0.15em] uppercase rounded-full hover:bg-gold-light transition-colors"
            >
              <Mail className="w-4 h-4" strokeWidth={2} />
              Napsat zprávu
            </a>
            <a
              href="tel:+420725724540"
              className="font-body text-white/60 hover:text-gold text-sm tracking-wide transition-colors link-underline"
            >
              nebo volejte +420&nbsp;725&nbsp;724&nbsp;540
            </a>
          </div>

          <div className="mt-14 flex justify-center">
            <OpenStatus />
          </div>
        </div>
      </section>

      {/* Newsletter CTA — proč je dobrý */}
      <section className="relative bg-[#0d0d0d] border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="overline">Newsletter</span>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1]">
                Proč jsou u&nbsp;nás <span className="text-gold italic">odběratelé první&nbsp;u stolu</span>.
              </h2>
              <div className="gold-divider-left" />
              <p className="font-body text-white/55 text-base leading-relaxed max-w-md">
                Jeden e-mail měsíčně. Žádné slevové akce každý týden, žádný spam.
                Jen to, co by nás samotné bavilo dostávat.
              </p>

              {newsletterSent ? (
                <div className="mt-10 border-l-2 border-gold pl-5 py-3">
                  <p className="font-heading text-white text-xl">Vítejte v klubu.</p>
                  <p className="font-body text-white/50 text-sm mt-2">
                    První e-mail dorazí, jakmile se objeví něco, co stojí za sdílení.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    required
                    value={newsletter}
                    onChange={(e) => setNewsletter(e.target.value)}
                    placeholder="vas@email.cz"
                    className="flex-1 bg-transparent border-0 border-b border-white/20 focus:border-gold pb-3 text-white font-body text-base outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-black font-body text-xs font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-gold-light transition-colors whitespace-nowrap"
                  >
                    Odebírat
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-10">
                {newsletterPerks.map((perk) => {
                  const Icon = perk.icon;
                  return (
                    <li key={perk.title} className="flex gap-5">
                      <span className="flex-shrink-0 mt-1 inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold/30 text-gold">
                        <Icon className="w-4 h-4" strokeWidth={1.6} />
                      </span>
                      <div>
                        <h3 className="font-heading text-white text-xl leading-snug">
                          {perk.title}
                        </h3>
                        <p className="mt-2 font-body text-white/50 text-[15px] leading-relaxed max-w-lg">
                          {perk.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Form + info + map at the bottom */}
      <section id="napiste-nam" className="bg-black py-20 sm:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Info column */}
            <div className="lg:col-span-5">
              <span className="overline">Navštivte nás</span>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-white leading-tight">
                Vinohrady,<br />Praha&nbsp;2.
              </h2>
              <div className="gold-divider-left" />

              <dl className="divide-y divide-white/[0.06]">
                {infoRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[110px_1fr] items-baseline py-5"
                  >
                    <dt className="font-body text-white/30 text-[10px] tracking-[0.3em] uppercase">
                      {row.label}
                    </dt>
                    <dd className="font-body text-white/85 text-base leading-relaxed">
                      {row.href ? (
                        <a
                          href={row.href}
                          {...(row.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="hover:text-gold transition-colors"
                        >
                          {row.lines.map((l, i) => (
                            <span key={i} className="block">
                              {l}
                            </span>
                          ))}
                        </a>
                      ) : (
                        row.lines.map((l, i) => (
                          <span key={i} className="block">
                            {l}
                          </span>
                        ))
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="pt-8 flex items-center gap-6">
                <span className="font-body text-white/30 text-[10px] tracking-[0.3em] uppercase">
                  Sledujte
                </span>
                <div className="flex items-center gap-5">
                  <a
                    href="https://www.instagram.com/woodandsteak/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-white/60 hover:text-white text-sm tracking-wide link-underline"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/woodandsteak/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-white/60 hover:text-white text-sm tracking-wide link-underline"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-7">
              <span className="overline">Napište nám</span>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-white leading-tight">
                Máte dotaz?
              </h2>
              <div className="gold-divider-left" />

              {sent ? (
                <div className="border-l-2 border-gold pl-5 py-4">
                  <p className="font-heading text-white text-xl">
                    Děkujeme za vaši zprávu.
                  </p>
                  <p className="font-body text-white/50 text-sm mt-2">
                    Ozveme se vám co nejdříve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <label className="block">
                      <span className="font-body text-white/40 text-[10px] tracking-[0.3em] uppercase">
                        Jméno
                      </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 w-full bg-transparent border-0 border-b border-white/15 focus:border-white pb-3 text-white font-body text-base outline-none transition-colors"
                        placeholder="Jan Novák"
                      />
                    </label>
                    <label className="block">
                      <span className="font-body text-white/40 text-[10px] tracking-[0.3em] uppercase">
                        E-mail
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 w-full bg-transparent border-0 border-b border-white/15 focus:border-white pb-3 text-white font-body text-base outline-none transition-colors"
                        placeholder="vas@email.cz"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="font-body text-white/40 text-[10px] tracking-[0.3em] uppercase">
                      Zpráva
                    </span>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-2 w-full bg-transparent border-0 border-b border-white/15 focus:border-white pb-3 text-white font-body text-base outline-none transition-colors resize-none"
                      placeholder="O čem si chcete povídat?"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-4 inline-flex items-center gap-3 font-body text-white text-sm tracking-[0.2em] uppercase link-underline"
                  >
                    Odeslat zprávu
                    <span aria-hidden>→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map — at the very bottom */}
      <section className="relative bg-black pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/[0.08]">
            <iframe
              title="Wood & Steak — Belgická 24, Praha 2"
              src="https://www.google.com/maps?q=Belgick%C3%A1+24,+Praha+2,+120+00&output=embed"
              className="absolute inset-0 w-full h-full grayscale-[0.35] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
