"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Výběr masa",
    accent: "Původ",
    desc: "Pouze prověření farmáři. Angus, Charolais, Wagyu.",
    image: "/images/photos/butcher-ribcage.jpg",
    alt: "Řezník s hovězím žebrem v bourárně Wood & Steak",
  },
  {
    num: "02",
    title: "Dry-aging",
    accent: "21–35 dní",
    desc: "V zrací komoře při 1–3 °C a vlhkosti 75–85 %.",
    image: "/images/photos/hero-dryagers.jpg",
    alt: "Zrací vitríny DRY-AGER s visícím hovězím",
  },
  {
    num: "03",
    title: "Porcování",
    accent: "Řemeslo",
    desc: "Ruční krájení s respektem ke směru vláken.",
    image: "/images/photos/butcher-dog.jpg",
    alt: "Bourání masa v řeznické dílně",
  },
  {
    num: "04",
    title: "Rozvoz",
    accent: "Do 24 h",
    desc: "Chlazené boxy, vlastní rozvoz po Praze.",
    image: "/images/photos/shop-entrance.jpg",
    alt: "Vchod do Wood & Steak — místo, odkud vyjíždí rozvoz",
  },
];

export function ProcessShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  // Progress line grows as section scrolls through viewport
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineWidthVertical = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative bg-black py-28 sm:py-40 overflow-hidden"
    >
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 10%, rgba(164,135,66,0.18) 0%, transparent 55%), radial-gradient(ellipse at 90% 85%, rgba(184,115,51,0.12) 0%, transparent 55%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="overline block"
          >
            Proces · Od farmy po stůl
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-heading text-5xl sm:text-6xl md:text-7xl leading-[0.95]"
          >
            <span className="text-white">Poctivost</span>
            <br />
            <span className="text-gradient-gold italic">v každém kroku.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-white/60 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            Nekupujeme maso ze supermarketu. Staráme se o každý kus — od výběru
            farmáře, přes zrání, až po doručení ke dveřím.
          </motion.p>
        </div>

        {/* Desktop — horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Progress rail */}
          <div className="absolute top-[140px] left-0 right-0 h-px bg-white/[0.08]" />
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-[140px] left-0 h-px bg-gradient-to-r from-gold via-gold-light to-gold origin-left"
          />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* Photo */}
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-10">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-5 font-heading italic text-white/90 text-4xl leading-none">
                    {s.num}
                  </span>
                </div>

                {/* Node dot on progress rail */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.4, duration: 0.5 }}
                  className="absolute top-[130px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gold border-2 border-black shadow-[0_0_0_4px_rgba(164,135,66,0.18)]"
                />

                {/* Text */}
                <div className="pt-8 text-center">
                  <span className="inline-block font-body text-gold text-[10px] tracking-[0.3em] uppercase">
                    {s.accent}
                  </span>
                  <h3 className="mt-3 font-heading text-2xl text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 font-body text-white/50 text-sm leading-relaxed max-w-[220px] mx-auto">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile — vertical timeline */}
        <div className="lg:hidden relative pl-10">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-white/[0.08]" />
          <motion.div
            style={{ height: lineWidthVertical }}
            className="absolute left-4 top-2 w-px bg-gradient-to-b from-gold via-gold-light to-gold origin-top"
          />

          <div className="space-y-14">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[26px] top-2 w-4 h-4 rounded-full bg-gold border-2 border-black shadow-[0_0_0_4px_rgba(164,135,66,0.18)]" />

                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-5">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    className="object-cover"
                    sizes="80vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-5 font-heading italic text-white/90 text-4xl leading-none">
                    {s.num}
                  </span>
                </div>
                <span className="font-body text-gold text-[10px] tracking-[0.3em] uppercase">
                  {s.accent}
                </span>
                <h3 className="mt-2 font-heading text-2xl text-white">
                  {s.title}
                </h3>
                <p className="mt-2 font-body text-white/50 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
