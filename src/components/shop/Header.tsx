"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Uvod", href: "/" },
  {
    label: "Sortiment",
    href: "/sortiment",
    children: [
      { label: "Steaky", href: "/sortiment/steaky" },
      { label: "Hovezi maso", href: "/sortiment/hovezi-maso" },
      { label: "Domaci omacky", href: "/sortiment/domaci-omacky" },
      { label: "Marinady a koreni", href: "/sortiment/marinady-a-koreni" },
      { label: "Noze a vybaveni", href: "/sortiment/noze-a-vybaveni" },
      { label: "Doplnky", href: "/sortiment/doplnky" },
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-gold/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-heading text-xl tracking-[0.15em] text-white">
              WOOD <span className="text-gold">&</span> STEAK
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-body tracking-wide text-white/80 hover:text-gold transition-colors"
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Link>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-off-black border border-gold/10 rounded-sm py-2 min-w-[200px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-gold hover:bg-gold/5 transition-colors"
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
                  className="text-sm font-body tracking-wide text-white/80 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-white/70 hover:text-gold transition-colors">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link
              href="/ucet"
              className="hidden sm:block text-white/70 hover:text-gold transition-colors"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/kosik"
              className="relative text-white/70 hover:text-gold transition-colors"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white/70 hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/98 border-t border-gold/10">
          <nav className="max-w-7xl mx-auto px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-white/80 hover:text-gold transition-colors font-body tracking-wide"
                  onClick={() => {
                    if (!link.children) setMobileOpen(false);
                    else setSortimentOpen(!sortimentOpen);
                  }}
                >
                  <span className="flex items-center justify-between">
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${sortimentOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </span>
                </Link>
                {link.children && sortimentOpen && (
                  <div className="pl-4 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-sm text-white/60 hover:text-gold transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gold/10 flex gap-6">
              <Link
                href="/ucet"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-gold"
                onClick={() => setMobileOpen(false)}
              >
                <User className="w-4 h-4" strokeWidth={1.5} />
                Ucet
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
