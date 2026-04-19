import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export const metadata = {
  title: "Stránka nenalezena",
  description: "Požadovaná stránka neexistuje nebo byla přesunuta.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-20">
      <div className="max-w-xl mx-auto text-center">
        <p className="overline text-gold">Chyba 404</p>
        <h1 className="font-heading text-7xl sm:text-8xl font-semibold mt-4 tracking-tight">
          404
        </h1>
        <div className="gold-divider mx-auto" />
        <h2 className="mt-6 font-heading text-2xl sm:text-3xl text-white">
          Tady nic není
        </h2>
        <p className="mt-4 text-white/60 leading-relaxed">
          Stránka, kterou hledáte, neexistuje nebo byla přesunuta. Zkuste přejít
          zpět na úvod nebo rovnou do sortimentu.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black text-sm tracking-[0.15em] uppercase font-medium hover:bg-gold-light transition-colors rounded-full"
          >
            <Home className="w-4 h-4" strokeWidth={1.5} />
            Úvodní strana
          </Link>
          <Link
            href="/sortiment"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/40 text-gold text-sm tracking-[0.15em] uppercase hover:bg-gold hover:text-black transition-colors rounded-full"
          >
            Do sortimentu
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </main>
  );
}
