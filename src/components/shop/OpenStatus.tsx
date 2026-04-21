"use client";

import { useEffect, useState } from "react";

const hours: Record<number, { open: number; close: number } | null> = {
  0: null,
  1: { open: 11, close: 22 },
  2: { open: 11, close: 22 },
  3: { open: 11, close: 22 },
  4: { open: 11, close: 23 },
  5: { open: 11, close: 23 },
  6: { open: 12, close: 23 },
};

function computeStatus(now: Date) {
  const day = now.getDay();
  const hoursNow = now.getHours() + now.getMinutes() / 60;
  const today = hours[day];
  if (today && hoursNow >= today.open && hoursNow < today.close) {
    const closeH = Math.floor(today.close);
    const minutesLeft = Math.round((today.close - hoursNow) * 60);
    const h = Math.floor(minutesLeft / 60);
    const m = minutesLeft % 60;
    return {
      open: true,
      label: `Otevřeno · zavíráme v ${closeH}:00`,
      sub: h > 0 ? `za ${h} h ${m} min` : `za ${m} min`,
    };
  }
  for (let i = 1; i <= 7; i++) {
    const nextDay = (day + i) % 7;
    const nd = hours[nextDay];
    if (nd) {
      const names = ["ne", "po", "út", "st", "čt", "pá", "so"];
      return {
        open: false,
        label: "Zavřeno",
        sub: `Otevíráme ${i === 1 ? "zítra" : names[nextDay]} v ${nd.open}:00`,
      };
    }
  }
  return { open: false, label: "Zavřeno", sub: "" };
}

export function OpenStatus() {
  const [status, setStatus] = useState<ReturnType<typeof computeStatus> | null>(null);

  useEffect(() => {
    const tick = () => setStatus(computeStatus(new Date()));
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  if (!status) return null;

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 ${
        status.open
          ? "border-green-500/40 bg-green-500/10"
          : "border-red-500/30 bg-red-500/5"
      }`}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={`absolute inset-0 rounded-full ${
            status.open ? "bg-green-400 animate-ping" : "bg-red-400"
          } opacity-60`}
        />
        <span
          className={`relative rounded-full h-2.5 w-2.5 ${
            status.open ? "bg-green-400" : "bg-red-400"
          }`}
        />
      </span>
      <div className="flex flex-col leading-tight">
        <span
          className={`font-body text-sm font-medium ${
            status.open ? "text-green-300" : "text-red-300"
          }`}
        >
          {status.label}
        </span>
        {status.sub && <span className="text-[10px] text-white/50">{status.sub}</span>}
      </div>
    </div>
  );
}
