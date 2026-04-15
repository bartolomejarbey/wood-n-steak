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
    // UI only - no backend yet
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="bg-off-black min-h-screen py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl sm:text-5xl text-gold mb-4 text-center">
          Kontakt
        </h1>
        <div className="gold-divider" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info Column */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 border border-gold/30 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-heading text-lg text-white mb-1">
                  Adresa
                </h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">
                  Vinohrady
                  <br />
                  Praha 2
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 border border-gold/30 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-heading text-lg text-white mb-1">Email</h3>
                <a
                  href="mailto:info@woodandsteak.cz"
                  className="font-body text-gold/80 text-sm hover:text-gold transition-colors"
                >
                  info@woodandsteak.cz
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 border border-gold/30 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-heading text-lg text-white mb-1">
                  Telefon
                </h3>
                <p className="font-body text-white/50 text-sm">
                  +420 XXX XXX XXX
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 border border-gold/30 flex items-center justify-center">
                <Globe className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-heading text-lg text-white mb-1">
                  Restaurace
                </h3>
                <a
                  href="https://www.woodandsteak.cz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-gold/80 text-sm hover:text-gold transition-colors"
                >
                  woodandsteak.cz
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-gold/20">
              <h3 className="font-heading text-lg text-white mb-4">
                Sledujte nas
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/woodandsteak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gold"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/woodandsteak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="border border-gold/20 bg-black/40 p-8">
            <h2 className="font-heading text-2xl text-white mb-6">
              Napiste nam
            </h2>

            {sent ? (
              <p className="font-body text-gold text-sm">
                Dekujeme za vasi zpravu! Ozveme se vam co nejdrive.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-body text-white/60 text-xs uppercase tracking-wider block mb-2">
                    Jmeno
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vase jmeno"
                    className="w-full px-4 py-3 bg-black/60 border border-gold/20 text-white font-body text-sm placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-white/60 text-xs uppercase tracking-wider block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vas@email.cz"
                    className="w-full px-4 py-3 bg-black/60 border border-gold/20 text-white font-body text-sm placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-white/60 text-xs uppercase tracking-wider block mb-2">
                    Zprava
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Vase zprava..."
                    className="w-full px-4 py-3 bg-black/60 border border-gold/20 text-white font-body text-sm placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gold text-black font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold-light transition-colors"
                >
                  Odeslat zpravu
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
