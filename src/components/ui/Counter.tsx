"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const spring = useSpring(count, { duration: duration * 1000, bounce: 0 });
  const rounded = useTransform(spring, (latest) => Math.round(latest).toLocaleString("cs-CZ"));

  useEffect(() => {
    if (inView) count.set(value);
  }, [inView, value, count]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      {prefix && <span>{prefix}</span>}
      <motion.span>{rounded}</motion.span>
      {suffix && <span className="ml-1">{suffix}</span>}
    </span>
  );
}
