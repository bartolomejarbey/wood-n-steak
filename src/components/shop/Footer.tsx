import Link from "next/link";
import Image from "next/image";
import { Mail, ExternalLink } from "lucide-react";

const categoryLinks = [
  { label: "Steaky", href: "/sortiment/steaky" },
  { label: "Hovězí maso", href: "/sortiment/hovezi-maso" },
  { label: "Domácí omáčky", href: "/sortiment/domaci-omacky" },
  { label: "Marinády a koření", href: "/sortiment/marinady-a-koreni" },
  { label: "Nože a vybavení", href: "/sortiment/noze-a-vybaveni" },
  { label: "Doplňky", href: "/sortiment/doplnky" },
];

const infoLinks = [
  { label: "Jak nakupovat", href: "/jak-nakupovat" },
  { label: "Obchodní podmínky", href: "/obchodni-podminky" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "O restauraci", href: "/o-restauraci" },
];

export default function Footer() {
  return (
    <footer className="bg-forest border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Wood & Steak"
              width={140}
              height={99}
              className="h-12 w-auto mb-4 opacity-80"
            />
            <p className="text-white/50 text-sm font-body leading-relaxed mb-4">
              Prémiové maso a domácí omáčky z restaurace
              Wood&nbsp;&amp;&nbsp;Steak. Steakhouse ve Vinohradech nedaleko
              Náměstí Míru.
            </p>
            <p className="text-white/40 text-sm font-body">
              Vinohrady, Praha 2
            </p>
          </div>

          {/* Sortiment */}
          <div>
            <h4 className="font-heading text-sm tracking-[0.2em] uppercase text-gold mb-6">
              Sortiment
            </h4>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading text-sm tracking-[0.2em] uppercase text-gold mb-6">
              Informace
            </h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-sm tracking-[0.2em] uppercase text-gold mb-6">
              Sledujte nás
            </h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.instagram.com/woodandsteak/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gold/30 rounded-xl flex items-center justify-center text-gold/70 hover:bg-gold hover:text-black transition-all"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
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
                className="w-10 h-10 border border-gold/30 rounded-xl flex items-center justify-center text-gold/70 hover:bg-gold hover:text-black transition-all"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="mailto:info@woodandsteak.cz"
                className="w-10 h-10 border border-gold/30 rounded-xl flex items-center justify-center text-gold/70 hover:bg-gold hover:text-black transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
            <p className="text-sm text-white/50 font-body">
              info@woodandsteak.cz
            </p>
            <p className="text-sm text-white/50 font-body">
              +420 XXX XXX XXX
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gold/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30 font-body">
            &copy; {new Date().getFullYear()} Wood&nbsp;&amp;&nbsp;Steak.
            Všechny ceny uvedeny s DPH.
          </p>
          <div className="flex gap-6">
            <Link
              href="/obchodni-podminky"
              className="text-xs text-white/30 hover:text-gold transition-colors font-body"
            >
              Obchodní podmínky
            </Link>
            <Link
              href="/kontakt"
              className="text-xs text-white/30 hover:text-gold transition-colors font-body"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
