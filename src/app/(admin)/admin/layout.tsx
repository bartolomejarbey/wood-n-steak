"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  Users,
  Mail,
  Settings,
  Palette,
  Menu,
  X,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produkty", label: "Produkty", icon: Package },
  { href: "/admin/kategorie", label: "Kategorie", icon: FolderOpen },
  { href: "/admin/objednavky", label: "Objednávky", icon: ShoppingCart },
  { href: "/admin/zakaznici", label: "Zákazníci", icon: Users },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/vzhled", label: "Vzhled webu", icon: Palette },
  { href: "/admin/nastaveni", label: "Nastavení", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-forest transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gold/10 px-6">
          <Link href="/admin" className="inline-flex items-baseline" aria-label="W&S Admin">
            <span className="font-heading text-lg font-bold tracking-[0.08em] text-white">
              WOOD
            </span>
            <span className="font-heading text-lg font-bold text-gold mx-1">&amp;</span>
            <span className="font-heading text-lg font-bold tracking-[0.08em] text-white">
              STEAK
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/60 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-body transition-colors border-l-2",
                  active
                    ? "bg-gold/10 text-gold border-gold"
                    : "text-white/60 hover:bg-white/5 hover:text-white border-transparent"
                )}
              >
                <Icon size={18} className={active ? "text-gold" : "text-gold/60"} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gold/10 px-6 py-4">
          <Link
            href="/"
            className="text-xs text-white/40 hover:text-white/60 transition-colors"
          >
            ← Zpet do obchodu
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-16 items-center border-b border-gold/10 bg-off-black px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-4 text-white/60 hover:text-white lg:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-xs font-body text-gold">A</span>
            </div>
            <span className="hidden text-sm text-white/60 font-body sm:block">
              Admin
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
