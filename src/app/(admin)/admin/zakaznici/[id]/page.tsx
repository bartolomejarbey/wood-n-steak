"use client";

import Link from "next/link";
import { use } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Package,
  ShoppingBag,
  Coins,
  Edit3,
} from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const customer = {
    id,
    name: "Jan Novák",
    email: "jan.novak@example.cz",
    phone: "+420 777 123 456",
    registeredAt: "2025-11-04",
    note: "",
    addresses: [
      {
        label: "Domov",
        street: "Vinohradská 12",
        city: "Praha 2",
        zip: "120 00",
      },
    ],
    stats: {
      orders: 4,
      spent: 12450,
      avg: 3112,
    },
    orders: [
      { number: "WS00041", date: "2026-04-18", total: 1890, status: "Zpracovává se" },
      { number: "WS00035", date: "2026-03-29", total: 2250, status: "Doručeno" },
      { number: "WS00022", date: "2026-02-14", total: 3980, status: "Doručeno" },
      { number: "WS00011", date: "2026-01-08", total: 4330, status: "Doručeno" },
    ],
  };

  return (
    <div className="max-w-6xl">
      <Link
        href="/admin/zakaznici"
        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-gold mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Zpět na zákazníky
      </Link>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-heading text-2xl">
            {customer.name.charAt(0)}
          </div>
          <div>
            <p className="overline text-gold">Zákazník</p>
            <h1 className="font-heading text-3xl text-white">{customer.name}</h1>
            <p className="text-sm text-white/50 mt-1">
              Registrován {customer.registeredAt}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={ShoppingBag} label="Objednávky" value={String(customer.stats.orders)} />
        <StatCard icon={Coins} label="Celkem utraceno" value={formatPrice(customer.stats.spent)} />
        <StatCard icon={Package} label="Průměr na objednávku" value={formatPrice(customer.stats.avg)} />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <div className="bg-white/5 border border-gold/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="font-heading text-lg">Historie objednávek</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-[0.1em] text-white/40 border-b border-white/5">
                  <th className="text-left px-6 py-3">Číslo</th>
                  <th className="text-left px-4 py-3">Datum</th>
                  <th className="text-left px-4 py-3">Stav</th>
                  <th className="text-right px-6 py-3">Celkem</th>
                </tr>
              </thead>
              <tbody>
                {customer.orders.map((o) => (
                  <tr key={o.number} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <Link href={`/admin/objednavky/${o.number}`} className="text-gold hover:underline">
                        #{o.number}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-white/60">{o.date}</td>
                    <td className="px-4 py-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold">
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-white">{formatPrice(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white/5 border border-gold/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-lg">Admin poznámka</h3>
              <Edit3 className="w-4 h-4 text-white/40" />
            </div>
            <textarea
              rows={4}
              placeholder="Interní poznámka — neviditelná pro zákazníka"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-white/30 focus:border-gold outline-none transition-colors"
            />
            <div className="mt-3 text-right">
              <button
                onClick={() => toast.success("Poznámka uložena")}
                className="px-4 py-2 bg-gold text-black text-xs tracking-[0.15em] uppercase rounded-full hover:bg-gold-light"
              >
                Uložit
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white/5 border border-gold/10 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-gold mb-3">Kontakt</p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4 text-gold/70" />
                {customer.email}
              </p>
              <p className="flex items-center gap-2 text-white/80">
                <Phone className="w-4 h-4 text-gold/70" />
                {customer.phone}
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-gold/10 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-gold mb-3">Adresy</p>
            {customer.addresses.map((a, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-white/80">
                <MapPin className="w-4 h-4 text-gold/70 mt-0.5" />
                <div>
                  <p className="text-white">{a.label}</p>
                  <p className="text-white/60">
                    {a.street}
                    <br />
                    {a.zip} {a.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white/5 border border-gold/10 rounded-2xl p-5 border-t-2 border-t-gold">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.15em] text-white/50">{label}</span>
        <Icon className="w-4 h-4 text-gold/60" strokeWidth={1.5} />
      </div>
      <p className="mt-3 font-heading text-2xl text-gold">{value}</p>
    </div>
  );
}
