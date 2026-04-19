"use client";

import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
} & Omit<MotionProps, "initial" | "whileInView" | "viewport" | "transition">;

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  className,
  once = true,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
