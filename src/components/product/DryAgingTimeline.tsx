"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const stages = [
  { days: 7, label: "7 dní", intensity: 1, note: "Jemná křehkost, čerstvá chuť" },
  { days: 14, label: "14 dní", intensity: 2, note: "Výraznější aroma, začíná koncentrace" },
  { days: 21, label: "21 dní", intensity: 3, note: "Oříškové tóny, intenzivní chuť" },
  { days: 28, label: "28 dní", intensity: 4, note: "Hluboké umami, máslová textura" },
  { days: 35, label: "35+ dní", intensity: 5, note: "Extrémní koncentrace, pro znalce" },
];

export function DryAgingTimeline({ activeDays = 28 }: { activeDays?: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const activeIdx = stages.findIndex((s) => s.days === activeDays);
  const showIdx = hovered ?? activeIdx;
  const current = stages[showIdx] ?? stages[3];

  return (
    <div className="border border-gold/20 rounded-2xl bg-black/30 p-6 sm:p-8">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
        <div>
          <p className="overline text-gold">Proces zrání</p>
          <h3 className="mt-2 font-heading text-2xl text-white">Dry-aging timeline</h3>
          <p className="mt-1 text-sm text-white/60">
            Tento kus zraje <span className="text-gold">{activeDays} dní</span>.
            Najeďte na fáze — uvidíte chuťový profil.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs tracking-[0.15em] uppercase">
          Vlhkost 75–85 % · 1–3 °C
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-5 h-[2px] bg-white/10" />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(activeIdx / (stages.length - 1)) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 top-5 h-[2px] bg-gradient-to-r from-gold/40 via-gold to-gold"
        />
        <div className="relative grid grid-cols-5 gap-2">
          {stages.map((s, i) => {
            const active = i <= activeIdx;
            const isCurrent = i === showIdx;
            return (
              <button
                key={s.days}
                type="button"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="group flex flex-col items-center outline-none"
              >
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                    backgroundColor: active ? "#A48742" : "#1A1A1A",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-[11px] font-medium z-10 ${
                    active ? "border-gold text-black" : "border-white/20 text-white/40"
                  }`}
                >
                  {s.days}
                </motion.div>
                <span
                  className={`mt-3 text-[10px] tracking-[0.15em] uppercase transition-colors ${
                    isCurrent ? "text-gold" : active ? "text-white/70" : "text-white/30"
                  }`}
                >
                  {s.label}
                </span>
                <div className="flex gap-0.5 mt-2">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <span
                      key={k}
                      className={`w-1 h-3 rounded-sm ${
                        k < s.intensity ? "bg-gold/80" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        key={showIdx}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 pt-6 border-t border-white/10"
      >
        <p className="text-xs tracking-[0.2em] uppercase text-gold/80">
          Fáze {current.label}
        </p>
        <p className="mt-2 text-white/80 text-sm leading-relaxed">{current.note}</p>
      </motion.div>
    </div>
  );
}
