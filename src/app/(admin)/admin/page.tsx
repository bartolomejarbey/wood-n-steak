import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, DollarSign, Package, Users } from "lucide-react";

const stats = [
  {
    label: "Celkem objednavek",
    value: "156",
    icon: ShoppingCart,
    change: "+12 tento mesic",
  },
  {
    label: "Celkove trzby",
    value: formatPrice(487650),
    icon: DollarSign,
    change: "+8.2 % oproti minulemu mesici",
  },
  {
    label: "Produktu v nabidce",
    value: "21",
    icon: Package,
    change: "3 neaktivni",
  },
  {
    label: "Registrovanych zakazniku",
    value: "89",
    icon: Users,
    change: "+5 tento mesic",
  },
];

const recentOrders = [
  {
    number: "WS-20260412",
    customer: "Jan Novak",
    total: 4580,
    status: "Doruceno",
    statusColor: "text-green-400",
    date: "12. 4. 2026",
  },
  {
    number: "WS-20260411",
    customer: "Eva Svobodova",
    total: 2890,
    status: "Odeslano",
    statusColor: "text-blue-400",
    date: "11. 4. 2026",
  },
  {
    number: "WS-20260410",
    customer: "Petr Dvorak",
    total: 6120,
    status: "Pripravuje se",
    statusColor: "text-yellow-400",
    date: "10. 4. 2026",
  },
  {
    number: "WS-20260409",
    customer: "Marie Kralova",
    total: 1490,
    status: "Nova",
    statusColor: "text-gold",
    date: "9. 4. 2026",
  },
  {
    number: "WS-20260408",
    customer: "Tomas Horak",
    total: 3670,
    status: "Doruceno",
    statusColor: "text-green-400",
    date: "8. 4. 2026",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/50 font-body">
          Prehled vasho obchodu Wood & Steak
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gold/10 bg-off-black p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/50 font-body">
                  {stat.label}
                </span>
                <Icon size={18} className="text-gold/60" />
              </div>
              <p className="mt-2 text-2xl font-heading text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-white/40 font-body">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent orders */}
      <div className="rounded-xl border border-gold/10 bg-off-black">
        <div className="border-b border-gold/10 px-6 py-4">
          <h2 className="font-heading text-lg text-white">
            Posledni objednavky
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/10 text-left">
                <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                  Cislo
                </th>
                <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                  Zakaznik
                </th>
                <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                  Castka
                </th>
                <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                  Stav
                </th>
                <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                  Datum
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {recentOrders.map((order) => (
                <tr
                  key={order.number}
                  className="transition-colors hover:bg-white/[0.02]"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-gold">
                    {order.number}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white">
                    {order.customer}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white">
                    {formatPrice(order.total)}
                  </td>
                  <td
                    className={cn(
                      "whitespace-nowrap px-6 py-4 text-sm font-body",
                      order.statusColor
                    )}
                  >
                    {order.status}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white/50">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
