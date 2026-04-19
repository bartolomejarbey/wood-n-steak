"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";

export default function ZapomenuteHesloPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!hasEnv) {
      toast.error("Obnova hesla je dočasně nedostupná");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/reset-hesla`
          : undefined;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });
      if (error) {
        toast.error("Odeslání se nepodařilo");
      } else {
        setSent(true);
        toast.success("E-mail s instrukcemi byl odeslán");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        <Link
          href="/prihlaseni"
          className="inline-flex items-center gap-2 text-white/60 text-sm hover:text-gold mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Zpět na přihlášení
        </Link>
        <p className="overline text-gold">Obnova</p>
        <h1 className="mt-4 font-heading text-3xl sm:text-4xl">Zapomněli jste heslo?</h1>
        <div className="gold-divider ml-0 mr-auto" />
        <p className="mt-6 text-white/60 leading-relaxed">
          Zadejte svůj e-mail a zašleme vám odkaz pro nastavení nového hesla.
        </p>

        {sent ? (
          <div className="mt-8 border border-gold/30 rounded-xl p-6 bg-gold/5">
            <p className="text-sm text-gold">
              Odkaz pro obnovu hesla jsme poslali na{" "}
              <strong className="text-white">{email}</strong>. Zkontrolujte
              e-mail a postupujte podle instrukcí.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-xs tracking-[0.15em] uppercase text-white/50">E-mail</span>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" strokeWidth={1.5} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gold outline-none text-sm"
                  placeholder="vas@email.cz"
                />
              </div>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-black py-3.5 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-gold-light transition-colors disabled:opacity-60"
            >
              {loading ? "Odesílám…" : "Odeslat odkaz"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
