"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  VisaIcon,
  MastercardIcon,
  ApplePayIcon,
  GooglePayIcon,
} from "@/components/ui/SocialIcons";

const categoryLinks = [
  { label: "Steaky", href: "/sortiment/steaky" },
  { label: "Hovězí maso", href: "/sortiment/hovezi-maso" },
  { label: "Domácí omáčky", href: "/sortiment/domaci-omacky" },
];

const infoLinks = [
  { label: "Jak nakupovat", href: "/jak-nakupovat" },
  { label: "O restauraci", href: "/o-restauraci" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Obchodní podmínky", href: "/obchodni-podminky" },
  { label: "Ochrana osobních údajů", href: "/ochrana-osobnich-udaju" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Zadejte prosím platný e-mail");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast.success("Děkujeme za přihlášení k odběru");
        setEmail("");
      } else {
        toast.error("Přihlášení se nepodařilo");
      }
    } catch {
      toast.error("Zkuste to prosím znovu");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="bg-black text-white">
      {/* Newsletter banner */}
      <div className="bg-black border-t border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="overline mb-2">Newsletter</p>
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight">
                Premium steaky přímo do e-mailu
              </h3>
              <p className="mt-2 text-sm text-white/60 max-w-lg">
                Tipy na přípravu, nové kousky na skladě a občas sleva, která za to stojí.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-lg lg:ml-auto border border-gold/40 bg-black/40 focus-within:border-gold transition-colors"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vas@email.cz"
                aria-label="E-mail pro odběr novinek"
                className="flex-1 bg-transparent px-4 py-3 text-sm placeholder:text-white/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gold text-black px-5 py-3 text-xs tracking-[0.15em] uppercase font-medium hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {loading ? "Odesílám…" : "Přihlásit"}
                {!loading && <ArrowRight className="w-4 h-4" aria-hidden />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="Wood & Steak — domů"
              className="relative block h-16 w-40"
            >
              <Image
                src="/images/logo.png"
                alt="Wood & Steak"
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </Link>
            <div className="gold-divider ml-0 mr-auto" />
            <p className="mt-5 text-sm text-white/60 leading-relaxed">
              Prémiové maso, domácí omáčky a vybavení pro přípravu steaku jako z restaurace.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/woodandsteak/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/woodandsteak/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@woodandsteak"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sortiment */}
          <div>
            <h4 className="overline mb-5 text-gold">Produkty</h4>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informace */}
          <div>
            <h4 className="overline mb-5 text-gold">Informace</h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="overline mb-5 text-gold">Kontakt</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-none" strokeWidth={1.5} />
                <span>
                  Wood &amp; Steak
                  <br />
                  Vinohrady, Praha 2
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-none" strokeWidth={1.5} />
                <a
                  href="tel:+420725724540"
                  className="text-white/70 hover:text-gold transition-colors"
                >
                  +420 725 724 540
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-none" strokeWidth={1.5} />
                <a
                  href="mailto:info@woodandsteak.cz"
                  className="text-white/70 hover:text-gold transition-colors"
                >
                  info@woodandsteak.cz
                </a>
              </li>
            </ul>
            <div className="mt-6 text-xs text-white/40 leading-relaxed">
              <p>Po–Pá 11:00–22:00</p>
              <p>So–Ne 12:00–22:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="text-xs text-white/40 space-y-1">
            <p>
              &copy; {new Date().getFullYear()} Wood &amp; Steak s.r.o. · Všechny ceny s DPH
            </p>
            <p>IČO: doplníme · DIČ: doplníme</p>
          </div>
          <div className="flex items-center gap-4 text-white/60">
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 mr-1">
              Platby
            </span>
            <VisaIcon className="h-5 w-auto" />
            <MastercardIcon className="h-5 w-auto" />
            <ApplePayIcon className="h-4 w-auto" />
            <GooglePayIcon className="h-4 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
}
