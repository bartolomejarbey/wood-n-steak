"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";

type Tab = "login" | "register";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") === "register" ? "register" : "login") as Tab;
  const [tab, setTab] = useState<Tab>(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "register" || t === "login") setTab(t);
  }, [searchParams]);

  const hasEnv =
    typeof process !== "undefined" &&
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!hasEnv) {
      toast.error("Přihlašování je dočasně nedostupné");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      if (tab === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          toast.error("Nesprávný e-mail nebo heslo");
        } else {
          toast.success("Přihlášení úspěšné");
          router.push("/ucet");
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) {
          toast.error(error.message.includes("already")
            ? "Účet s tímto e-mailem již existuje"
            : "Registrace se nepodařila");
        } else {
          toast.success("Registrace úspěšná — zkontrolujte e-mail");
          setTab("login");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-black text-white">
      <div className="relative hidden lg:block">
        <Image
          src="/images/hero-2.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-forest/80" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="overline text-gold">Wood &amp; Steak</p>
          <h2 className="mt-4 font-heading text-4xl xl:text-5xl leading-tight">
            Prémiový steak
            <br />
            u vás doma.
          </h2>
          <div className="gold-divider ml-0 mr-auto" />
          <p className="mt-6 text-white/70 max-w-md">
            Vytvořte si účet pro rychlejší nákup, přehled objednávek a
            exkluzivní nabídky pro naše zákazníky.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16 lg:py-24">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-baseline mb-10">
            <span className="font-heading text-xl font-bold tracking-[0.08em]">WOOD</span>
            <span className="font-heading text-xl font-bold text-gold mx-1">&amp;</span>
            <span className="font-heading text-xl font-bold tracking-[0.08em]">STEAK</span>
          </Link>

          <div className="flex border border-gold/20 rounded-full p-1 mb-8 bg-white/5">
            {(["login", "register"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-xs tracking-[0.15em] uppercase rounded-full transition-all ${
                  tab === t ? "bg-gold text-black" : "text-white/60 hover:text-white"
                }`}
              >
                {t === "login" ? "Přihlášení" : "Registrace"}
              </button>
            ))}
          </div>

          <h1 className="font-heading text-3xl">
            {tab === "login" ? "Vítejte zpět" : "Založte si účet"}
          </h1>
          <p className="mt-2 text-white/50 text-sm">
            {tab === "login"
              ? "Přihlaste se ke svému účtu"
              : "Stačí několik vteřin"}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {tab === "register" && (
              <label className="block">
                <span className="text-xs tracking-[0.15em] uppercase text-white/50">
                  Jméno a příjmení
                </span>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" strokeWidth={1.5} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gold outline-none text-sm transition-colors"
                    placeholder="Jan Novák"
                  />
                </div>
              </label>
            )}
            <label className="block">
              <span className="text-xs tracking-[0.15em] uppercase text-white/50">E-mail</span>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" strokeWidth={1.5} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gold outline-none text-sm transition-colors"
                  placeholder="vas@email.cz"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-xs tracking-[0.15em] uppercase text-white/50">Heslo</span>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" strokeWidth={1.5} />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gold outline-none text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </label>

            {tab === "login" && (
              <div className="flex justify-end">
                <Link href="/zapomenute-heslo" className="text-xs text-gold/80 hover:text-gold">
                  Zapomněli jste heslo?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-black py-3.5 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-gold-light transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {loading
                ? "Pracuji…"
                : tab === "login"
                ? "Přihlásit se"
                : "Zaregistrovat se"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-white/50">
            <Link href="/" className="hover:text-gold">
              Pokračovat jako host
            </Link>
          </div>

          {!hasEnv && (
            <div className="mt-6 text-xs text-white/40 border border-white/10 rounded-xl p-3 text-center">
              Přihlašování je dočasně nedostupné. Zkuste to prosím později.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function PrihlaseniPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <LoginForm />
    </Suspense>
  );
}
