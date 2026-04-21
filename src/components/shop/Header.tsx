"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  Phone,
  Mail,
  Truck,
  Flame,
  Beef,
  Droplet,
  Sparkles,
  Utensils,
  Package,
} from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { useCart } from "@/context/CartContext";
import { getFeaturedProducts, searchProducts, getCategories } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";

type Child = { label: string; href: string; Icon?: typeof Flame };

const navLinks: Array<{
  label: string;
  href: string;
  children?: Child[];
}> = [
  { label: "Úvod", href: "/" },
  {
    label: "Produkty",
    href: "/sortiment",
    children: [
      { label: "Steaky", href: "/sortiment/steaky", Icon: Flame },
      { label: "Hovězí maso", href: "/sortiment/hovezi-maso", Icon: Beef },
      { label: "Domácí omáčky", href: "/sortiment/domaci-omacky", Icon: Droplet },
      { label: "Marinády a koření", href: "/sortiment/marinady-a-koreni", Icon: Sparkles },
      { label: "Nože a vybavení", href: "/sortiment/noze-a-vybaveni", Icon: Utensils },
      { label: "Doplňky", href: "/sortiment/doplnky", Icon: Package },
    ],
  },
  { label: "Jak nakupovat", href: "/jak-nakupovat" },
  { label: "O restauraci", href: "/o-restauraci" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sortimentOpen, setSortimentOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [megaOpen, setMegaOpen] = useState(false);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { itemCount } = useCart();
  const pathname = usePathname();

  // Scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
    setSortimentOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
    setMegaOpen(false);
  }, [pathname]);

  // Lock body scroll when overlay open
  useEffect(() => {
    const locked = mobileOpen || searchOpen;
    document.documentElement.style.overflow = locked ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  // Keyboard: Cmd+K opens search, Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname],
  );

  const featured = useMemo(() => getFeaturedProducts().slice(0, 2), []);
  const categories = useMemo(() => getCategories().slice(0, 6), []);
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchProducts(searchQuery).slice(0, 5);
  }, [searchQuery]);

  const openMega = () => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-black text-cream/90 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-9 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
            <span>Doprava zdarma od 500 Kč · Rozvoz Praha + okolí</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="tel:+420725724540"
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
              +420 725 724 540
            </a>
            <a
              href="mailto:info@woodandsteak.cz"
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
              info@woodandsteak.cz
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-black/92 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-gradient-to-b from-black/70 via-black/35 to-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[88px]">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Wood & Steak — domů"
              className="flex-shrink-0 relative block h-12 w-28 sm:h-14 sm:w-32 lg:h-16 lg:w-40"
            >
              <Image
                src="/images/logo.png"
                alt="Wood & Steak"
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 160px"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Hlavní navigace">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <Link
                      href={link.href}
                      data-active={isActive(link.href)}
                      className={cn(
                        "link-underline text-[12px] font-medium tracking-[0.22em] uppercase py-3 transition-colors",
                        isActive(link.href) ? "text-gold" : "text-white/85 hover:text-white",
                      )}
                    >
                      {link.label}
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-active={isActive(link.href)}
                    className={cn(
                      "link-underline text-[12px] font-medium tracking-[0.22em] uppercase py-3 transition-colors",
                      isActive(link.href) ? "text-gold" : "text-white/85 hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Vyhledat"
                className="hidden sm:flex w-10 h-10 items-center justify-center text-white/80 hover:text-gold transition-colors"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <Link
                href="/ucet"
                aria-label="Můj účet"
                className="hidden sm:flex w-10 h-10 items-center justify-center text-white/80 hover:text-gold transition-colors"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/kosik"
                aria-label={`Košík${itemCount ? ` — ${itemCount} položek` : ""}`}
                className="relative flex w-10 h-10 items-center justify-center text-white/80 hover:text-gold transition-colors"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-0.5 min-w-[18px] h-[18px] bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center leading-none px-1">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                className="lg:hidden flex w-10 h-10 items-center justify-center text-white/85 hover:text-gold transition-colors ml-1"
                onClick={() => setMobileOpen(true)}
                aria-label="Otevřít menu"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        {megaOpen && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full border-t border-gold/40"
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <div className="bg-black/98 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-3 gap-10">
                <div>
                  <p className="overline mb-5">Maso a omáčky</p>
                  <ul className="space-y-3">
                    {navLinks[1].children!.slice(0, 4).map((c) => {
                      const Icon = c.Icon ?? Flame;
                      return (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="group flex items-center gap-3 text-white/85 hover:text-gold transition-colors"
                          >
                            <Icon className="h-4 w-4 text-gold/70 group-hover:text-gold" strokeWidth={1.5} />
                            <span className="text-sm font-medium tracking-wide">{c.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <p className="overline mb-5">Vybavení</p>
                  <ul className="space-y-3">
                    {navLinks[1].children!.slice(4).map((c) => {
                      const Icon = c.Icon ?? Package;
                      return (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="group flex items-center gap-3 text-white/85 hover:text-gold transition-colors"
                          >
                            <Icon className="h-4 w-4 text-gold/70 group-hover:text-gold" strokeWidth={1.5} />
                            <span className="text-sm font-medium tracking-wide">{c.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <Link
                    href="/sortiment"
                    className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-gold hover:text-gold-light transition-colors"
                  >
                    Všechny produkty
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
                <div>
                  <p className="overline mb-5">Doporučujeme</p>
                  <div className="grid grid-cols-2 gap-3">
                    {featured.map((p) => (
                      <Link
                        key={p.id}
                        href={`/produkt/${p.slug}`}
                        className="group block rounded-xl overflow-hidden bg-black/30 border border-white/5 hover:border-gold/50 transition-all"
                      >
                        <div className="aspect-[4/5] relative bg-gradient-to-br from-[#141414] to-black overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-heading text-gold/30 text-xs tracking-[0.3em] uppercase">
                              W&amp;S
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="font-heading text-[13px] text-white/90 group-hover:text-gold transition-colors line-clamp-1">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-gold mt-1 tracking-wide">
                            {formatPrice(p.price)}
                            <span className="text-white/50 ml-1">/ {p.unit}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 bg-black/40">
                <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-white/60">
                    Restaurace · Vinohrady · Praha 2
                  </span>
                  <Link
                    href="/o-restauraci"
                    className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-gold hover:text-gold-light"
                  >
                    O restauraci Wood &amp; Steak
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-50 transition-all duration-300",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/70 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[88%] max-w-md bg-black text-cream shadow-2xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
          role="dialog"
          aria-label="Mobilní menu"
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <span className="relative block h-10 w-24" aria-label="Wood & Steak">
              <Image
                src="/images/logo.png"
                alt="Wood & Steak"
                fill
                className="object-contain object-left"
                sizes="96px"
              />
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Zavřít menu"
              className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-gold"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
          <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-4rem)] no-scrollbar pb-40">
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/sortiment?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="relative"
              >
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50"
                  strokeWidth={1.5}
                />
                <input
                  type="search"
                  placeholder="Hledat produkty…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-cream text-black placeholder:text-black/40 pl-11 pr-4 py-3 rounded-xl"
                />
              </form>
            </div>

            <nav className="space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setSortimentOpen((v) => !v)}
                      className="w-full flex items-center justify-between py-4 px-2 text-white font-medium tracking-wide border-b border-white/10"
                      aria-expanded={sortimentOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 text-gold transition-transform",
                          sortimentOpen ? "rotate-90" : "",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-all overflow-hidden",
                        sortimentOpen
                          ? "grid-rows-[1fr] opacity-100 py-2"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="min-h-0">
                        <Link
                          href={link.href}
                          className="flex items-center justify-between py-3 pl-6 pr-2 text-cream/80 hover:text-gold text-sm"
                        >
                          <span>Všechny produkty</span>
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                        {link.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="flex items-center justify-between py-3 pl-6 pr-2 text-cream/80 hover:text-gold text-sm"
                          >
                            <span>{c.label}</span>
                            <ChevronRight className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between py-4 px-2 text-white font-medium tracking-wide border-b border-white/10 hover:text-gold"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-4 w-4 text-gold" />
                  </Link>
                ),
              )}
              <Link
                href="/ucet"
                className="flex items-center justify-between py-4 px-2 text-white font-medium tracking-wide border-b border-white/10 hover:text-gold"
              >
                <span>Můj účet</span>
                <ChevronRight className="h-4 w-4 text-gold" />
              </Link>
            </nav>

            <div className="pt-8 space-y-3 text-sm text-cream/70">
              <a href="tel:+420725724540" className="flex items-center gap-3 hover:text-gold">
                <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
                +420 725 724 540
              </a>
              <a
                href="mailto:info@woodandsteak.cz"
                className="flex items-center gap-3 hover:text-gold"
              >
                <Mail className="h-4 w-4 text-gold" strokeWidth={1.5} />
                info@woodandsteak.cz
              </a>
              <div className="flex items-center gap-3 pt-4">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-gold/60 text-gold hover:bg-gold hover:text-black flex items-center justify-center transition-colors"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full border border-gold/60 text-gold hover:bg-gold hover:text-black flex items-center justify-center transition-colors"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 transition-opacity duration-200",
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!searchOpen}
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={() => setSearchOpen(false)}
        />
        <div
          className="relative max-w-3xl mx-auto px-6 pt-24 sm:pt-32"
          role="dialog"
          aria-label="Vyhledávání"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/sortiment?q=${encodeURIComponent(searchQuery)}`;
              }
            }}
            className="relative"
          >
            <Search
              className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gold"
              strokeWidth={1.5}
            />
            <input
              autoFocus={searchOpen}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
              placeholder="Co hledáte?"
              className="w-full bg-transparent border-b-2 border-gold text-white placeholder:text-white/40 pl-10 pr-10 py-4 text-2xl font-heading focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Zavřít vyhledávání"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </form>

          <div className="mt-8 space-y-2">
            {searchResults.length > 0
              ? searchResults.map((p) => (
                  <Link
                    key={p.id}
                    href={`/produkt/${p.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-xl bg-off-black/80 border border-white/5 hover:border-gold/50 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#141414] to-black flex items-center justify-center flex-shrink-0">
                      <span className="font-heading text-gold/40 text-[10px] tracking-[0.3em]">
                        W&amp;S
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-heading text-white truncate">{p.name}</div>
                      <div className="text-xs text-white/50 mt-0.5">
                        {categories.find((c) => c.id === p.category_id)?.name}
                      </div>
                    </div>
                    <div className="text-gold font-medium">{formatPrice(p.price)}</div>
                  </Link>
                ))
              : searchQuery.trim().length > 0 && (
                  <div className="text-center text-white/50 py-8">
                    Nic nenalezeno pro „{searchQuery}".
                  </div>
                )}
            {searchQuery.trim().length === 0 && (
              <div className="flex items-center justify-center gap-2 text-white/40 text-xs tracking-[0.2em] uppercase py-4">
                Zkratka
                <kbd className="px-2 py-0.5 rounded bg-white/10 text-white/60">⌘ K</kbd>
                nebo
                <kbd className="px-2 py-0.5 rounded bg-white/10 text-white/60">Ctrl K</kbd>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
