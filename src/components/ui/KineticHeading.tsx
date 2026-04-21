"use client";

import { motion } from "framer-motion";

export function KineticHeading({
  text,
  className = "",
  highlightIndex,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  highlightIndex?: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <h2 className={`font-heading leading-[0.95] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.8,
            delay: i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block overflow-hidden pb-2"
        >
          <span
            className={`inline-block mr-[0.25em] ${
              highlightIndex === i ? "text-gold italic" : ""
            }`}
          >
            {word}
          </span>
        </motion.span>
      ))}
    </h2>
  );
}
