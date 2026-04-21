"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const doneness = [
  {
    id: "rare",
    label: "Rare",
    coreTemp: "48–52 °C",
    time: "2 min / strana",
    color: "#8B1A1A",
    fill: 20,
    note: "Syrový uprostřed, teplý na dotek. Pro znalce.",
  },
  {
    id: "medium-rare",
    label: "Medium rare",
    coreTemp: "53–57 °C",
    time: "3 min / strana",
    color: "#B3341F",
    fill: 40,
    note: "Šťavnatý, růžový střed. Nejčastější volba.",
  },
  {
    id: "medium",
    label: "Medium",
    coreTemp: "58–62 °C",
    time: "4 min / strana",
    color: "#C75B2C",
    fill: 60,
    note: "Mírně růžový, pevný. Klasika.",
  },
  {
    id: "medium-well",
    label: "Medium well",
    coreTemp: "63–68 °C",
    time: "5 min / strana",
    color: "#A0623A",
    fill: 80,
    note: "Jen náznak růžové, propečený.",
  },
  {
    id: "well-done",
    label: "Well done",
    coreTemp: "69 °C+",
    time: "6+ min / strana",
    color: "#6B3A1F",
    fill: 100,
    note: "Plně propečený. Bez růžové.",
  },
];

export function TemperatureGuide() {
  const [selected, setSelected] = useState(1);
  const current = doneness[selected];

  return (
    <div className="border border-gold/20 rounded-2xl bg-black/30 p-6 sm:p-8">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
        <div>
          <p className="overline text-gold">Stupeň propečení</p>
          <h3 className="mt-2 font-heading text-2xl text-white">Teplotní průvodce</h3>
          <p className="mt-1 text-sm text-white/60">
            Vyberte požadovaný stupeň — ukážeme doporučenou core teplotu a čas.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs tracking-[0.15em] uppercase">
          Odpočinek 5–10 min
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-8">
        {doneness.map((d, i) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setSelected(i)}
            onMouseEnter={() => setSelected(i)}
            className="group flex flex-col items-center outline-none"
          >
            <div className="relative w-full h-16 rounded-lg overflow-hidden border border-white/10">
              <motion.div
                animate={{ opacity: selected === i ? 1 : 0.45 }}
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, ${d.color} 0%, #2a1410 100%)`,
                }}
              />
              <motion.div
                animate={{ scale: selected === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 border-2 border-gold rounded-lg"
              />
            </div>
            <span
              className={`mt-2 text-[10px] tracking-[0.15em] uppercase transition-colors text-center leading-tight ${
                selected === i ? "text-gold" : "text-white/40"
              }`}
            >
              {d.label}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid sm:grid-cols-3 gap-4"
      >
        <div className="rounded-xl border border-gold/20 bg-gold/5 p-4">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold/70">Core teplota</p>
          <p className="mt-1 font-heading text-2xl text-gold">{current.coreTemp}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">Čas na pánvi</p>
          <p className="mt-1 font-heading text-2xl text-white">{current.time}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:col-span-1">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">Výsledek</p>
          <p className="mt-1 text-sm text-white/80 leading-snug">{current.note}</p>
        </div>
      </motion.div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 text-xs text-white/50">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          Měřte teplotu uprostřed nejtlustší části. Kolem kosti přidejte 2 °C.
        </div>
      </div>
    </div>
  );
}
