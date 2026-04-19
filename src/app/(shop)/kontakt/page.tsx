"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, Globe } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="bg-off-black min-h-screen py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Napište nám</span>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mt-2">
            Kontakt
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info Column */}
          <div className="space-y-6">
            {[
              {
                icon: MapPin,
                title: "Adresa",
                content: (
                  <p className="font-body text-white/45 text-sm leading-relaxed">
                    Vinohrady<br />Praha 2
                  </p>
                ),
              },
              {
                icon: Mail,
                title: "E-mail",
                content: (
                  <a
                    href="mailto:info@woodandsteak.cz"
                    className="font-body text-gold/70 text-sm hover:text-gold transition-colors"
                  >
                    info@woodandsteak.cz
                  </a>
                ),
              },
              {
                icon: Phone,
                title: "Telefon",
                content: (
                  <p className="font-body text-white/45 text-sm">+420 XXX XXX XXX</p>
                ),
              },
              {
                icon: Globe,
                title: "Restaurace",
                content: (
                  <a
                    href="https://www.woodandsteak.cz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-gold/70 text-sm hover:text-gold transition-colors"
                  >
                    woodandsteak.cz
                  </a>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="w-11 h-11 flex-shrink-0 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center justify-center group-hover:border-gold/20 transition-colors">
                  <item.icon className="w-[18px] h-[18px] text-gold/70" strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h3 className="font-heading text-base text-white mb-1">{item.title}</h3>
                  {item.content}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-6 mt-2 border-t border-white/[0.06]">
              <h3 className="font-body text-white/30 text-xs tracking-[0.2em] uppercase mb-4">
                Sledujte nás
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/woodandsteak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center justify-center hover:border-gold/30 hover:bg-gold/[0.04] transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-[18px] h-[18px] text-gold/70" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/woodandsteak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center justify-center hover:border-gold/30 hover:bg-gold/[0.04] transition-all"
                  aria-label="Facebook"
                >
                  <svg className="w-[18px] h-[18px] text-gold/70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
            <h2 className="font-heading text-xl text-white mb-6">
              Napište nám
            </h2>

            {sent ? (
              <div className="bg-gold/[0.06] border border-gold/15 rounded-xl p-6">
                <p className="font-body text-gold text-sm">
                  Děkujeme za Vaši zprávu! Ozveme se Vám co nejdříve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">
                    Jméno
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vaše jméno"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white font-body text-sm placeholder:text-white/20 focus:border-gold/40 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vas@email.cz"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white font-body text-sm placeholder:text-white/20 focus:border-gold/40 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">
                    Zpráva
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Vaše zpráva..."
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white font-body text-sm placeholder:text-white/20 focus:border-gold/40 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gold text-black font-body text-sm font-medium tracking-wider uppercase rounded-full hover:bg-gold-light transition-colors"
                >
                  Odeslat zprávu
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
