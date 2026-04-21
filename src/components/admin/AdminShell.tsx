"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";
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
  LogOut,
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

interface AdminShellProps {
  children: React.ReactNode;
  userEmail: string;
}

export function AdminShell({ children, userEmail }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const initials = userEmail.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-black">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0d0d0d] border-r border-white/[0.06] transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/[0.06] px-6">
          <Link
            href="/admin"
            className="relative block h-9 w-24"
            aria-label="W&S Admin"
          >
            <Image
              src="/images/logo.png"
              alt="Wood & Steak"
              fill
              className="object-contain object-left"
              sizes="96px"
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/60 hover:text-white lg:hidden"
            aria-label="Zavřít menu"
          >
            <X size={20} />
          </button>
        </div>

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
                    : "text-white/60 hover:bg-white/5 hover:text-white border-transparent",
                )}
              >
                <Icon size={18} className={active ? "text-gold" : "text-gold/60"} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.06] px-6 py-4">
          <Link
            href="/"
            className="text-xs text-white/40 hover:text-white/60 transition-colors"
          >
            ← Zpět do obchodu
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b border-white/[0.06] bg-[#0d0d0d] px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-4 text-white/60 hover:text-white lg:hidden"
            aria-label="Otevřít menu"
          >
            <Menu size={24} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-xs font-body text-gold">{initials}</span>
            </div>
            <span
              className="hidden text-sm text-white/60 font-body sm:block max-w-[200px] truncate"
              title={userEmail}
            >
              {userEmail}
            </span>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-body text-white/70 hover:border-gold/50 hover:text-gold transition-colors disabled:opacity-50"
              aria-label="Odhlásit se"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">
                {signingOut ? "Odhlašuji…" : "Odhlásit"}
              </span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
