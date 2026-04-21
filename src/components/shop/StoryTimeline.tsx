"use client";

import { motion } from "framer-motion";
import { Flame, Award, Snowflake, Home, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const milestones = [
  {
    year: "2018",
    title: "Založení restaurace",
    desc: "Otevřeli jsme steakhouse ve Vinohradech s vizí poctivé kuchyně.",
    icon: Home,
  },
  {
    year: "2020",
    title: "Vlastní dry-aging",
    desc: "Uvedli jsme do provozu první zrací komoru — 35denní maturace.",
    icon: Snowflake,
  },
  {
    year: "2022",
    title: "Rozšíření konceptu",
    desc: "Přidali jsme sous-vide stanici a rozšířili vinný lístek.",
    icon: Flame,
  },
  {
    year: "2024",
    title: "Michelin Bib Gourmand",
    desc: "Získali jsme ocenění za poměr kvality a ceny.",
    icon: Award,
  },
  {
    year: "2026",
    title: "Spouštíme e-shop",
    desc: "Naši kuchyni si teď můžete vzít domů — rozvoz po Praze.",
    icon: Sparkles,
  },
];

export function StoryTimeline() {
  return (
    <section className="bg-black py-24 border-y border-gold/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="overline">Příběh</span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-white">Naše cesta</h2>
          <p className="mt-3 text-white/60 max-w-xl mx-auto">
            Od malé restaurace k poctivému e-shopu. Milníky, kterými jsme prošli.
          </p>
        </div>

        <div className="relative">
          {/* Center vertical line (left on mobile, center on desktop) */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent sm:-translate-x-1/2" />

          <ol className="space-y-12 sm:space-y-16">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.li
                  key={m.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={cn(
                    "relative pl-20 sm:pl-0 sm:w-1/2",
                    isLeft ? "sm:pr-16 sm:text-right" : "sm:ml-auto sm:pl-16 sm:text-left"
                  )}
                >
                  {/* Icon node pinned to the center line */}
                  <span
                    className={cn(
                      "absolute top-1 w-12 h-12 rounded-full bg-black border-2 border-gold flex items-center justify-center z-10 shadow-[0_0_0_6px_rgba(0,0,0,1)]",
                      "left-6 -translate-x-1/2",
                      isLeft
                        ? "sm:left-auto sm:right-0 sm:translate-x-1/2"
                        : "sm:left-0 sm:-translate-x-1/2"
                    )}
                  >
                    <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                  </span>

                  <p className="font-heading text-2xl text-gold">{m.year}</p>
                  <h3 className="mt-1 font-heading text-xl text-white">{m.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{m.desc}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
