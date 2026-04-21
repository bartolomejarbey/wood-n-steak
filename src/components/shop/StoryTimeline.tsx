"use client";

import { motion } from "framer-motion";
import { Flame, Award, Snowflake, Home, Sparkles } from "lucide-react";

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="overline">Příběh</span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-white">Naše cesta</h2>
          <p className="mt-3 text-white/60 max-w-xl mx-auto">
            Od malé restaurace k poctivému e-shopu. Milníky, kterými jsme prošli.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent -translate-x-1/2" />

          <div className="space-y-10">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              const leftSide = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex items-center gap-6 sm:gap-10 ${
                    leftSide ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border-2 border-gold flex items-center justify-center z-10">
                    <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 pl-20 sm:pl-0 sm:text-right sm:pr-12 sm:pl-0 sm:only:pl-0">
                    {leftSide ? (
                      <>
                        <p className="font-heading text-2xl text-gold">{m.year}</p>
                        <h3 className="mt-1 font-heading text-xl text-white">{m.title}</h3>
                        <p className="mt-2 text-sm text-white/60 leading-relaxed">{m.desc}</p>
                      </>
                    ) : null}
                  </div>
                  <div className="hidden sm:block flex-1 pl-12">
                    {!leftSide ? (
                      <>
                        <p className="font-heading text-2xl text-gold">{m.year}</p>
                        <h3 className="mt-1 font-heading text-xl text-white">{m.title}</h3>
                        <p className="mt-2 text-sm text-white/60 leading-relaxed">{m.desc}</p>
                      </>
                    ) : null}
                  </div>

                  {!leftSide && (
                    <div className="sm:hidden flex-1 pl-20">
                      <p className="font-heading text-2xl text-gold">{m.year}</p>
                      <h3 className="mt-1 font-heading text-xl text-white">{m.title}</h3>
                      <p className="mt-2 text-sm text-white/60 leading-relaxed">{m.desc}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
