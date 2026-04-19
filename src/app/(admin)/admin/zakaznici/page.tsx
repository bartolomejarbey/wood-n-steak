const customers = [
  { name: "Jan Novák", email: "jan@novak.cz", phone: "+420 602 123 456", orders: 8, registered: "15. 1. 2026" },
  { name: "Eva Svobodová", email: "eva@email.cz", phone: "+420 731 234 567", orders: 5, registered: "22. 1. 2026" },
  { name: "Petr Dvořák", email: "petr.dvorak@email.cz", phone: "+420 608 345 678", orders: 12, registered: "3. 12. 2025" },
  { name: "Marie Králová", email: "kralova@firma.cz", phone: "+420 774 456 789", orders: 3, registered: "18. 2. 2026" },
  { name: "Tomáš Horák", email: "t.horak@gmail.com", phone: "+420 605 567 890", orders: 7, registered: "5. 11. 2025" },
  { name: "Lucie Němcová", email: "lucie.n@email.cz", phone: "+420 722 678 901", orders: 2, registered: "28. 3. 2026" },
  { name: "Jakub Černý", email: "jakub@cerny.cz", phone: "+420 601 789 012", orders: 1, registered: "2. 4. 2026" },
  { name: "Hana Veselá", email: "hana.v@email.cz", phone: "+420 736 890 123", orders: 4, registered: "10. 2. 2026" },
  { name: "Martin Procházka", email: "martin.p@firma.cz", phone: "+420 607 901 234", orders: 6, registered: "19. 12. 2025" },
];

export default function ZakazniciPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-white">Zákazníci</h1>
        <p className="mt-1 text-sm text-white/50 font-body">
          Přehled registrovaných zákazníků
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gold/10 bg-off-black">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gold/10 text-left">
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Jméno
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                E-mail
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Telefon
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Objednávek
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Registrace
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/5">
            {customers.map((customer) => (
              <tr
                key={customer.email}
                className="transition-colors hover:bg-white/[0.02]"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10">
                      <span className="text-xs font-body text-gold">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="text-sm font-body text-white">
                      {customer.name}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white/60">
                  {customer.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white/60">
                  {customer.phone}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white">
                  {customer.orders}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white/50">
                  {customer.registered}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
