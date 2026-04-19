import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

const subscribers = [
  { email: "jan@novak.cz", active: true, date: "15. 1. 2026" },
  { email: "eva@email.cz", active: true, date: "22. 1. 2026" },
  { email: "petr.dvorak@email.cz", active: true, date: "3. 2. 2026" },
  { email: "kralova@firma.cz", active: false, date: "18. 2. 2026" },
  { email: "t.horak@gmail.com", active: true, date: "5. 2. 2026" },
  { email: "lucie.n@email.cz", active: true, date: "28. 3. 2026" },
  { email: "jakub@cerny.cz", active: true, date: "2. 4. 2026" },
  { email: "hana.v@email.cz", active: false, date: "10. 2. 2026" },
  { email: "martin.p@firma.cz", active: true, date: "19. 3. 2026" },
  { email: "info@steaklovers.cz", active: true, date: "25. 3. 2026" },
  { email: "grill@master.cz", active: true, date: "1. 4. 2026" },
];

const activeCount = subscribers.filter((s) => s.active).length;

export default function NewsletterPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl text-white">Newsletter</h1>
          <p className="mt-1 text-sm text-white/50 font-body">
            {activeCount} aktivních z {subscribers.length} odběratelů
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gold/10 px-4 py-2.5 text-sm font-body text-white/60 transition-colors hover:border-gold/30 hover:text-white">
          <Download size={16} />
          Exportovat CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gold/10 bg-off-black">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gold/10 text-left">
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                E-mail
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Stav
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Datum přihlášení
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/5">
            {subscribers.map((sub) => (
              <tr
                key={sub.email}
                className="transition-colors hover:bg-white/[0.02]"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white">
                  {sub.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-body",
                      sub.active
                        ? "bg-green-400/10 text-green-400"
                        : "bg-red-400/10 text-red-400"
                    )}
                  >
                    {sub.active ? "Aktivní" : "Odhlášený"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white/50">
                  {sub.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
