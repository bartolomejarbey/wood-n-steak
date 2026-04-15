import { ShoppingBag, ShoppingCart, CreditCard, Truck } from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    title: "Vyber produktu",
    description:
      "Projdete nas sortiment premiovych steaku, domacich omacek, koreni a vybaveni. Kazdy produkt si muzete prohlednout do detailu a pridat do kosiku.",
  },
  {
    icon: ShoppingCart,
    title: "Kosik",
    description:
      "V kosiku si zkontrolujte vyber, upravte mnozstvi a zkontrolujte celkovou cenu. Minimalni hodnota objednavky je 500 Kc.",
  },
  {
    icon: CreditCard,
    title: "Pokladna",
    description:
      "Vyplnte dodaci udaje a zvolte zpusob platby. Prijimame platbu kartou online, bankovnim prevodem i dobirkou.",
  },
  {
    icon: Truck,
    title: "Doruceni",
    description:
      "Dorucujeme vlastnim rozvozem po Praze a okoli. Zajistujeme maximalni cerstost a kvalitu vasich produktu az ke dverim.",
  },
];

export default function HowToShopPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-off-black py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl text-gold mb-4">
            Jak nakupovat
          </h1>
          <div className="gold-divider" />
          <p className="font-body text-white/50 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Nakupovani na nasem e-shopu je jednoduche. Staci 4 kroky a mate
            premiove produkty primo u vas doma.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-off-black pb-24 sm:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex gap-6 sm:gap-8 py-12 ${
                i < steps.length - 1 ? "border-b border-gold/30" : ""
              }`}
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 border border-gold/30 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-gold" strokeWidth={1} />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-heading text-gold/40 text-sm">
                    0{i + 1}
                  </span>
                  <h2 className="font-heading text-2xl text-white">
                    {step.title}
                  </h2>
                </div>
                <p className="font-body text-white/50 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
