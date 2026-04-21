"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Kam doručujete a za jak dlouho?",
    a: "Doručujeme po celé Praze a okolí. Pokud objednáte do 14:00 v pracovní den, doručení je možné tentýž den. Jinak další pracovní den.",
  },
  {
    q: "Jaká je minimální objednávka a kdy je doprava zdarma?",
    a: "Minimální objednávka je 500 Kč. Doprava zdarma je od 1 500 Kč — průběh progress baru uvidíte přímo v košíku.",
  },
  {
    q: "Jak platit?",
    a: "Můžete platit kartou online přes Comgate, bankovním převodem (najdete QR kód pro Pay by Square v souhrnu) nebo dobírkou při doručení.",
  },
  {
    q: "Jak je zajištěn chladicí řetězec?",
    a: "Maso rozvážíme v chlazených boxech s teplotou 1–3 °C. Při převzetí okamžitě uložte do lednice nebo mrazáku podle instrukcí na etiketě.",
  },
  {
    q: "Co znamená dry-aging?",
    a: "Dry-aging je proces suchého zrání masa v kontrolovaných podmínkách (vlhkost 75–85 %, teplota 1–3 °C). Maso získá hlubší chuť, oříškové tóny a máslovou texturu. Naše steaky zrají 21–35 dní.",
  },
  {
    q: "Mohu objednávku vrátit?",
    a: "Vzhledem k povaze potravin nelze objednávku po rozbalení vrátit. Pokud je s produktem něco v nepořádku, neprodleně nás kontaktujte — vyřešíme to individuálně.",
  },
  {
    q: "Nabízíte dárkové poukazy?",
    a: "Ano, dárkové poukazy na libovolnou částku vystavíme na vyžádání. Napište nám na info@woodandsteak.cz.",
  },
  {
    q: "Je e-shop stejný jako restaurace?",
    a: "Ano, e-shop provozuje stejný tým jako restauraci Wood & Steak ve Vinohradech. Maso, omáčky i vybavení pocházejí z naší kuchyně.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-black py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="overline">Často kladené dotazy</span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-white">Co vás zajímá?</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-body text-white text-sm sm:text-base pr-4">{f.q}</span>
                  <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus className="w-5 h-5 text-gold flex-shrink-0" strokeWidth={1.5} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-white/60 leading-relaxed border-t border-white/5">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
