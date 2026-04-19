"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";

export default function ResetHeslaPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const hasEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Hesla se neshodují");
      return;
    }
    if (password.length < 6) {
      toast.error("Heslo musí mít alespoň 6 znaků");
      return;
    }
    if (!hasEnv) {
      toast.error("Obnova hesla je dočasně nedostupná");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast.error("Nepodařilo se aktualizovat heslo");
      } else {
        toast.success("Heslo bylo změněno");
        router.push("/prihlaseni");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        <p className="overline text-gold">Nové heslo</p>
        <h1 className="mt-4 font-heading text-3xl sm:text-4xl">Nastavte si nové heslo</h1>
        <div className="gold-divider ml-0 mr-auto" />
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs tracking-[0.15em] uppercase text-white/50">Nové heslo</span>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" strokeWidth={1.5} />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gold outline-none text-sm"
                placeholder="••••••••"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-xs tracking-[0.15em] uppercase text-white/50">Potvrdit heslo</span>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" strokeWidth={1.5} />
              <input
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gold outline-none text-sm"
                placeholder="••••••••"
              />
            </div>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-3.5 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-gold-light transition-colors disabled:opacity-60"
          >
            {loading ? "Ukládám…" : "Uložit nové heslo"}
          </button>
          <div className="text-center">
            <Link href="/prihlaseni" className="text-sm text-white/60 hover:text-gold">
              Zpět na přihlášení
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
