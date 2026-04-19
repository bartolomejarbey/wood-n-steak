"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      theme="dark"
      closeButton
      duration={4000}
      toastOptions={{
        classNames: {
          toast:
            "!bg-off-black !border !border-gold/30 !text-white !rounded-xl !shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]",
          title: "!font-medium !tracking-wide",
          description: "!text-white/70",
          success: "!border-gold/50",
          error: "!border-red-500/50",
        },
        style: {
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        },
      }}
    />
  );
}
