import { cn, formatPrice } from "@/lib/utils";

const paymentStatuses: Record<string, { label: string; color: string }> = {
  paid: { label: "Zaplaceno", color: "bg-green-400/10 text-green-400" },
  pending: { label: "Čeká na platbu", color: "bg-yellow-400/10 text-yellow-400" },
  failed: { label: "Selhala", color: "bg-red-400/10 text-red-400" },
  refunded: { label: "Vraceno", color: "bg-blue-400/10 text-blue-400" },
};

const orderStatuses: Record<string, { label: string; color: string }> = {
  new: { label: "Nová", color: "bg-gold/10 text-gold" },
  confirmed: { label: "Potvrzená", color: "bg-blue-400/10 text-blue-400" },
  preparing: { label: "Připravuje se", color: "bg-yellow-400/10 text-yellow-400" },
  shipped: { label: "Odesláno", color: "bg-purple-400/10 text-purple-400" },
  delivered: { label: "Doručeno", color: "bg-green-400/10 text-green-400" },
  cancelled: { label: "Zrušeno", color: "bg-red-400/10 text-red-400" },
};

const orders = [
  { number: "WS-20260412", customer: "Jan Novák", email: "jan@novak.cz", total: 4580, payment: "paid", status: "delivered", date: "12. 4. 2026" },
  { number: "WS-20260411", customer: "Eva Svobodová", email: "eva@email.cz", total: 2890, payment: "paid", status: "shipped", date: "11. 4. 2026" },
  { number: "WS-20260410", customer: "Petr Dvořák", email: "petr.dvorak@email.cz", total: 6120, payment: "paid", status: "preparing", date: "10. 4. 2026" },
  { number: "WS-20260409", customer: "Marie Králová", email: "kralova@firma.cz", total: 1490, payment: "pending", status: "new", date: "9. 4. 2026" },
  { number: "WS-20260408", customer: "Tomáš Horák", email: "t.horak@gmail.com", total: 3670, payment: "paid", status: "delivered", date: "8. 4. 2026" },
  { number: "WS-20260407", customer: "Lucie Němcová", email: "lucie.n@email.cz", total: 5230, payment: "paid", status: "delivered", date: "7. 4. 2026" },
  { number: "WS-20260406", customer: "Jakub Černý", email: "jakub@cerny.cz", total: 890, payment: "failed", status: "cancelled", date: "6. 4. 2026" },
  { number: "WS-20260405", customer: "Hana Veselá", email: "hana.v@email.cz", total: 2340, payment: "paid", status: "confirmed", date: "5. 4. 2026" },
];

export default function ObjednavkyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-white">Objednávky</h1>
        <p className="mt-1 text-sm text-white/50 font-body">
          Přehled a správa objednávek
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gold/10 bg-off-black">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gold/10 text-left">
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Číslo
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Zákazník
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Částka
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Platba
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
            {orders.map((order) => {
              const payment = paymentStatuses[order.payment];
              const status = orderStatuses[order.status];
              return (
                <tr
                  key={order.number}
                  className="cursor-pointer transition-colors hover:bg-white/[0.02]"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-gold">
                    {order.number}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-body text-white">
                      {order.customer}
                    </div>
                    <div className="text-xs font-body text-white/40">
                      {order.email}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white">
                    {formatPrice(order.total)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-body",
                        payment?.color
                      )}
                    >
                      {payment?.label}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-body",
                        status?.color
                      )}
                    >
                      {status?.label}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white/50">
                    {order.date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
