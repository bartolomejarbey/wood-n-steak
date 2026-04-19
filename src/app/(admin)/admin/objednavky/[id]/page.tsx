"use client";

import Link from "next/link";
import { use } from "react";
import {
  ArrowLeft,
  CircleCheck,
  Clock,
  Truck,
  Package,
  Mail,
  Printer,
  XCircle,
  MapPin,
  Phone,
  CreditCard,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

type OrderStatus =
  | "new"
  | "confirmed"
  | "processing"
  | "ready"
  | "delivering"
  | "delivered";

const timeline: { key: OrderStatus; label: string; icon: typeof Clock }[] = [
  { key: "new", label: "Přijata", icon: CircleCheck },
  { key: "confirmed", label: "Potvrzena", icon: CircleCheck },
  { key: "processing", label: "Připravuje se", icon: Package },
  { key: "ready", label: "Připraveno", icon: Package },
  { key: "delivering", label: "Na cestě", icon: Truck },
  { key: "delivered", label: "Doručeno", icon: CircleCheck },
];

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const order = {
    id,
    number: `WS${id.padStart(5, "0")}`,
    createdAt: "2026-04-18 14:32",
    status: "processing" as OrderStatus,
    payment: { method: "Kartou online (Comgate)", paid: true },
    delivery: { method: "Vlastní rozvoz Praha", eta: "Dnes, 17:00–19:00" },
    customer: {
      name: "Jan Novák",
      email: "jan.novak@example.cz",
      phone: "+420 777 123 456",
    },
    billing: "Jan Novák, Vinohradská 12, Praha 2, 120 00",
    shipping: "Jan Novák, Vinohradská 12, Praha 2, 120 00",
    items: [
      {
        id: "1",
        name: "Rib-eye steak Black Angus dry-aged",
        weight: "0.65 kg",
        unitPrice: 1890,
        qty: 1,
        total: 1228.5,
      },
      {
        id: "2",
        name: "BBQ omáčka domácí",
        weight: "250 g",
        unitPrice: 189,
        qty: 2,
        total: 378,
      },
    ],
    subtotal: 1606.5,
    delivery_fee: 0,
    total: 1606.5,
    note: "Prosím zazvoňte dvakrát.",
  };

  const statusIndex = timeline.findIndex((t) => t.key === order.status);

  return (
    <div className="max-w-6xl">
      <Link
        href="/admin/objednavky"
        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-gold mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Zpět na objednávky
      </Link>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <p className="overline text-gold">Objednávka</p>
          <h1 className="font-heading text-3xl text-white">#{order.number}</h1>
          <p className="text-sm text-white/50 mt-1">Vytvořeno {order.createdAt}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast.success("Odesláno")}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gold/40 text-gold text-xs tracking-[0.15em] uppercase rounded-full hover:bg-gold hover:text-black transition-colors"
          >
            <Mail className="w-4 h-4" />
            E-mail zákazníkovi
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-white/70 text-xs tracking-[0.15em] uppercase rounded-full hover:border-gold/40 hover:text-gold transition-colors"
          >
            <Printer className="w-4 h-4" />
            Tisk
          </button>
          <button
            onClick={() => {
              if (confirm("Opravdu zrušit objednávku?")) {
                toast.error("Objednávka zrušena");
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-red-500/40 text-red-400 text-xs tracking-[0.15em] uppercase rounded-full hover:bg-red-500/20 transition-colors"
          >
            <XCircle className="w-4 h-4" />
            Zrušit
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white/5 border border-gold/10 rounded-2xl p-6 mb-6">
        <div className="flex items-start overflow-x-auto gap-2">
          {timeline.map((step, i) => {
            const active = i <= statusIndex;
            const Icon = step.icon;
            return (
              <div key={step.key} className="flex items-center min-w-fit flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      active
                        ? "bg-gold/20 border-gold text-gold"
                        : "bg-white/5 border-white/20 text-white/30"
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <span
                    className={`text-[10px] tracking-[0.15em] uppercase mt-2 ${
                      active ? "text-gold" : "text-white/30"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < timeline.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-2 ${
                      i < statusIndex ? "bg-gold" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Items */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-gold/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="font-heading text-lg">Položky objednávky</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-[0.1em] text-white/40 border-b border-white/5">
                  <th className="text-left px-6 py-3">Produkt</th>
                  <th className="text-right px-4 py-3">Váha</th>
                  <th className="text-right px-4 py-3">Cena</th>
                  <th className="text-right px-4 py-3">Ks</th>
                  <th className="text-right px-6 py-3">Celkem</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 last:border-0">
                    <td className="px-6 py-4 text-white">{item.name}</td>
                    <td className="px-4 py-4 text-right text-white/70">{item.weight}</td>
                    <td className="px-4 py-4 text-right text-white/70">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="px-4 py-4 text-right text-white/70">{item.qty}</td>
                    <td className="px-6 py-4 text-right text-gold">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-black/20">
                <tr className="text-white/60">
                  <td colSpan={4} className="px-6 py-3 text-right">Mezisoučet</td>
                  <td className="px-6 py-3 text-right">{formatCurrency(order.subtotal)}</td>
                </tr>
                <tr className="text-white/60">
                  <td colSpan={4} className="px-6 py-3 text-right">Doprava</td>
                  <td className="px-6 py-3 text-right">
                    {order.delivery_fee === 0 ? "Zdarma" : formatCurrency(order.delivery_fee)}
                  </td>
                </tr>
                <tr className="border-t border-gold/20">
                  <td colSpan={4} className="px-6 py-4 text-right font-heading text-lg text-white">
                    Celkem
                  </td>
                  <td className="px-6 py-4 text-right font-heading text-xl text-gold">
                    {formatCurrency(order.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {order.note && (
            <div className="bg-gold/5 border border-gold/20 rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-gold mb-2">Poznámka zákazníka</p>
              <p className="text-sm text-white/80">{order.note}</p>
            </div>
          )}
        </div>

        {/* Info panels */}
        <aside className="space-y-4">
          <InfoPanel icon={UserIcon} title="Zákazník">
            <p className="text-sm text-white">{order.customer.name}</p>
            <p className="text-xs text-white/50 flex items-center gap-2 mt-1.5">
              <Mail className="w-3 h-3" /> {order.customer.email}
            </p>
            <p className="text-xs text-white/50 flex items-center gap-2 mt-1">
              <Phone className="w-3 h-3" /> {order.customer.phone}
            </p>
          </InfoPanel>
          <InfoPanel icon={MapPin} title="Doručovací adresa">
            <p className="text-sm text-white/80 leading-relaxed">{order.shipping}</p>
          </InfoPanel>
          <InfoPanel icon={MapPin} title="Fakturační adresa">
            <p className="text-sm text-white/80 leading-relaxed">{order.billing}</p>
          </InfoPanel>
          <InfoPanel icon={Truck} title="Doprava">
            <p className="text-sm text-white">{order.delivery.method}</p>
            <p className="text-xs text-white/50 mt-1">Očekávané doručení: {order.delivery.eta}</p>
          </InfoPanel>
          <InfoPanel icon={CreditCard} title="Platba">
            <p className="text-sm text-white">{order.payment.method}</p>
            <span
              className={`inline-block mt-2 text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-full ${
                order.payment.paid
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-300"
              }`}
            >
              {order.payment.paid ? "Zaplaceno" : "Čeká na platbu"}
            </span>
          </InfoPanel>
        </aside>
      </div>
    </div>
  );
}

function InfoPanel({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Clock;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-gold/10 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3 text-gold">
        <Icon className="w-4 h-4" strokeWidth={1.5} />
        <p className="text-xs uppercase tracking-[0.15em]">{title}</p>
      </div>
      {children}
    </div>
  );
}
