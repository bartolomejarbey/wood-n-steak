"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User as UserIcon,
  Package,
  LogOut,
  MapPin,
  Lock,
  LayoutDashboard,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

type Section = "overview" | "orders" | "profile" | "addresses" | "password";

const sections: { id: Section; label: string; icon: typeof UserIcon }[] = [
  { id: "overview", label: "Přehled", icon: LayoutDashboard },
  { id: "orders", label: "Moje objednávky", icon: Package },
  { id: "profile", label: "Osobní údaje", icon: UserIcon },
  { id: "addresses", label: "Adresy", icon: MapPin },
  { id: "password", label: "Heslo", icon: Lock },
];

export default function AccountPage() {
  const router = useRouter();
  const [section, setSection] = useState<Section>("overview");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const hasEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    let mounted = true;
    if (!hasEnv) {
      setLoading(false);
      return;
    }
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      if (!data.user) {
        router.replace("/prihlaseni");
      } else {
        setUser(data.user);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [hasEnv, router]);

  async function handleLogout() {
    if (!hasEnv) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Byli jste odhlášeni");
    router.push("/");
  }

  if (!hasEnv) {
    return (
      <main className="min-h-screen bg-off-black text-white flex items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <p className="overline text-gold">Účet</p>
          <h1 className="mt-4 font-heading text-3xl">Účty dočasně nedostupné</h1>
          <div className="gold-divider mx-auto" />
          <p className="mt-4 text-white/60">
            Přihlašování právě konfigurujeme. Nákup můžete dokončit i jako host.
          </p>
          <Link
            href="/sortiment"
            className="mt-8 inline-block px-6 py-3 bg-gold text-black text-sm tracking-[0.15em] uppercase rounded-full hover:bg-gold-light transition-colors"
          >
            Do sortimentu
          </Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-off-black text-white flex items-center justify-center">
        <div className="h-6 w-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </main>
    );
  }

  const fullName = (user?.user_metadata?.full_name as string) || user?.email || "";

  return (
    <main className="min-h-screen bg-off-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-10">
          <p className="overline text-gold">Zákaznická zóna</p>
          <h1 className="mt-3 font-heading text-3xl sm:text-4xl">Můj účet</h1>
          <div className="gold-divider ml-0 mr-auto" />
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside>
            <div className="bg-white/5 border border-gold/10 rounded-2xl p-5 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-heading">
                  {fullName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm truncate">{fullName}</p>
                  <p className="text-xs text-white/40 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
            <nav className="space-y-1">
              {sections.map((s) => {
                const Icon = s.icon;
                const active = section === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSection(s.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-left transition-colors",
                      active
                        ? "bg-gold/10 text-gold border-l-2 border-gold"
                        : "text-white/60 hover:bg-white/5 hover:text-white border-l-2 border-transparent",
                    )}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    {s.label}
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors mt-4 border-t border-white/10 pt-5"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.5} />
                Odhlásit se
              </button>
            </nav>
          </aside>

          <section className="bg-white/5 border border-gold/10 rounded-2xl p-6 lg:p-8 min-h-[420px]">
            {section === "overview" && (
              <div>
                <h2 className="font-heading text-2xl">Přehled</h2>
                <p className="mt-2 text-white/60 text-sm">
                  Vítejte, {fullName}. Zde je rychlý přehled vašeho účtu.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Objednávek", value: "0" },
                    { label: "Utraceno", value: "0 Kč" },
                    { label: "Věrnostní body", value: "0" },
                  ].map((k) => (
                    <div key={k.label} className="bg-black/30 rounded-xl p-5 border-t-2 border-gold">
                      <p className="text-xs uppercase tracking-[0.15em] text-white/40">{k.label}</p>
                      <p className="mt-2 font-heading text-2xl text-gold">{k.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {section === "orders" && (
              <div>
                <h2 className="font-heading text-2xl">Moje objednávky</h2>
                <div className="mt-6 border border-white/10 rounded-xl p-10 text-center">
                  <Package className="w-10 h-10 text-gold/50 mx-auto" strokeWidth={1} />
                  <p className="mt-4 text-white/60">Zatím jste neudělali žádnou objednávku.</p>
                  <Link
                    href="/sortiment"
                    className="mt-6 inline-block px-6 py-2.5 bg-gold text-black text-xs tracking-[0.15em] uppercase rounded-full hover:bg-gold-light"
                  >
                    Do sortimentu
                  </Link>
                </div>
              </div>
            )}
            {section === "profile" && (
              <div>
                <h2 className="font-heading text-2xl">Osobní údaje</h2>
                <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Jméno" defaultValue={(user?.user_metadata?.first_name as string) || ""} />
                  <Field label="Příjmení" defaultValue={(user?.user_metadata?.last_name as string) || ""} />
                  <Field label="E-mail" type="email" defaultValue={user?.email || ""} disabled />
                  <Field label="Telefon" type="tel" defaultValue={(user?.user_metadata?.phone as string) || ""} />
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      className="px-6 py-3 bg-gold text-black text-xs tracking-[0.15em] uppercase rounded-full hover:bg-gold-light"
                      onClick={() => toast.success("Uloženo")}
                    >
                      Uložit změny
                    </button>
                  </div>
                </form>
              </div>
            )}
            {section === "addresses" && (
              <div>
                <h2 className="font-heading text-2xl">Adresy</h2>
                <p className="mt-2 text-white/60 text-sm">Doručovací a fakturační adresy.</p>
                <div className="mt-6 border border-white/10 rounded-xl p-6 text-white/60">
                  Zatím nemáte uložené adresy. Přidejte je při nejbližší objednávce.
                </div>
              </div>
            )}
            {section === "password" && (
              <div>
                <h2 className="font-heading text-2xl">Změna hesla</h2>
                <form className="mt-6 space-y-4 max-w-md">
                  <Field label="Současné heslo" type="password" />
                  <Field label="Nové heslo" type="password" />
                  <Field label="Potvrdit heslo" type="password" />
                  <button
                    type="button"
                    className="px-6 py-3 bg-gold text-black text-xs tracking-[0.15em] uppercase rounded-full hover:bg-gold-light"
                    onClick={() => toast.success("Heslo bylo aktualizováno")}
                  >
                    Uložit
                  </button>
                </form>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  type = "text",
  defaultValue,
  disabled,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs tracking-[0.15em] uppercase text-white/50">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        className="mt-2 w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-sm focus:border-gold outline-none transition-colors disabled:opacity-60"
      />
    </label>
  );
}
