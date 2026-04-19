"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Úvod", href: "/" },
  {
    label: "Sortiment",
    href: "/sortiment",
    children: [
      { label: "Steaky", href: "/sortiment/steaky" },
      { label: "Hovězí maso", href: "/sortiment/hovezi-maso" },
      { label: "Domácí omáčky", href: "/sortiment/domaci-omacky" },
      { label: "Marinády a koření", href: "/sortiment/marinady-a-koreni" },
      { label: "Nože a vybavení", href: "/sortiment/noze-a-vybaveni" },
      { label: "Doplňky", href: "/sortiment/doplnky" },
    ],
  },
  { label: "Jak nakupovat", href: "/jak-nakupovat" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sortimentOpen, setSortimentOpen] = useState(false);
  const { itemCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setSortimentOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <Image
              src="/images/logo.png"
              alt="Wood & Steak"
              width={120}
              height={85}
              className="h-10 w-auto transition-opacity group-hover:opacity-90"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 px-4 py-2 text-[13px] font-body tracking-[0.04em] uppercase transition-all duration-200 rounded-lg ${
                      isActive(link.href)
                        ? "text-gold"
                        : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-all group-hover:translate-y-px" />
                  </Link>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                    <div className="bg-[#141414] backdrop-blur-2xl border border-white/[0.08] rounded-xl py-1.5 min-w-[240px] shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-5 py-2.5 text-[13px] font-body transition-all ${
                            isActive(child.href)
                              ? "text-gold bg-gold/[0.06]"
                              : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-[13px] font-body tracking-[0.04em] uppercase transition-all duration-200 rounded-lg ${
                    isActive(link.href)
                      ? "text-gold"
                      : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button className="hidden sm:flex w-10 h-10 items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all">
              <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
            <Link
              href="/ucet"
              className={`hidden sm:flex w-10 h-10 items-center justify-center rounded-lg transition-all ${
                isActive("/ucet")
                  ? "text-gold bg-gold/[0.06]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </Link>
            <Link
              href="/kosik"
              className={`relative flex w-10 h-10 items-center justify-center rounded-lg transition-all ${
                isActive("/kosik")
                  ? "text-gold bg-gold/[0.06]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex w-10 h-10 items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/98 backdrop-blur-2xl border-t border-white/[0.06]">
          <nav className="max-w-7xl mx-auto px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setSortimentOpen(!sortimentOpen)}
                      className={`w-full flex items-center justify-between py-3 px-3 rounded-lg font-body tracking-wide transition-all ${
                        isActive(link.href)
                          ? "text-gold bg-gold/[0.04]"
                          : "text-white/80 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 opacity-50 transition-transform duration-200 ${sortimentOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        sortimentOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-4 py-1 space-y-0.5">
                        <Link
                          href={link.href}
                          className={`block py-2.5 px-3 rounded-lg text-sm font-body transition-all ${
                            pathname === link.href
                              ? "text-gold bg-gold/[0.04]"
                              : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                          }`}
                        >
                          Vše
                        </Link>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block py-2.5 px-3 rounded-lg text-sm font-body transition-all ${
                              isActive(child.href)
                                ? "text-gold bg-gold/[0.04]"
                                : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`block py-3 px-3 rounded-lg font-body tracking-wide transition-all ${
                      isActive(link.href)
                        ? "text-gold bg-gold/[0.04]"
                        : "text-white/80 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 mt-2 border-t border-white/[0.06] flex gap-4">
              <Link
                href="/ucet"
                className="flex items-center gap-2 py-2 px-3 text-sm text-white/50 hover:text-gold rounded-lg transition-all"
              >
                <User className="w-4 h-4" strokeWidth={1.5} />
                Účet
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
