import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";

const categoryLinks = [
  { label: "Steaky", href: "/sortiment/steaky" },
  { label: "Hovezi maso", href: "/sortiment/hovezi-maso" },
  { label: "Domaci omacky", href: "/sortiment/domaci-omacky" },
  { label: "Marinady a koreni", href: "/sortiment/marinady-a-koreni" },
  { label: "Noze a vybaveni", href: "/sortiment/noze-a-vybaveni" },
  { label: "Doplnky", href: "/sortiment/doplnky" },
];

const infoLinks = [
  { label: "Jak nakupovat", href: "/jak-nakupovat" },
  { label: "Obchodni podminky", href: "/obchodni-podminky" },
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
            <h3 className="font-heading text-xl tracking-[0.15em] text-white mb-4">
              WOOD <span className="text-gold">&</span> STEAK
            </h3>
            <p className="text-white/50 text-sm font-body leading-relaxed mb-4">
              Premiove maso a domaci omacky z restaurace Wood & Steak.
              Steakhouse ve Vinohradech nedaleko Namesti Miru.
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
              Sledujte nas
            </h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com/woodandsteak"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold/70 hover:bg-gold hover:text-black transition-all"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold/70 hover:bg-gold hover:text-black transition-all"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="mailto:info@woodandsteak.cz"
                className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold/70 hover:bg-gold hover:text-black transition-all"
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
            &copy; {new Date().getFullYear()} Wood & Steak. Vsechny ceny uvedeny s DPH.
          </p>
          <div className="flex gap-6">
            <Link
              href="/obchodni-podminky"
              className="text-xs text-white/30 hover:text-gold transition-colors font-body"
            >
              Obchodni podminky
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
