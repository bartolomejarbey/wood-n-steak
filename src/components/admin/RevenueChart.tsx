"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function generate30Days() {
  const today = new Date("2026-04-20");
  const seed = (i: number) => {
    const base = 8000 + Math.sin(i / 2.3) * 3500 + Math.cos(i / 5) * 2000;
    const weekend = [5, 6].includes(new Date(today.getTime() - (29 - i) * 86400000).getDay()) ? 4500 : 0;
    return Math.max(1200, Math.round(base + weekend + ((i * 313) % 1800)));
  };
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today.getTime() - (29 - i) * 86400000);
    return {
      date: `${d.getDate()}.${d.getMonth() + 1}.`,
      revenue: seed(i),
    };
  });
}

const data = generate30Days();
const total = data.reduce((s, d) => s + d.revenue, 0);
const avg = Math.round(total / data.length);

export function RevenueChart() {
  return (
    <div className="rounded-xl border border-gold/10 bg-off-black p-6">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-heading text-lg text-white">Tržby posledních 30 dní</h2>
          <p className="mt-1 text-xs text-white/40 font-body">Hover pro detail</p>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">Celkem</p>
            <p className="mt-1 font-heading text-xl text-gold">
              {total.toLocaleString("cs-CZ")} Kč
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">Průměr / den</p>
            <p className="mt-1 font-heading text-xl text-white">
              {avg.toLocaleString("cs-CZ")} Kč
            </p>
          </div>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A48742" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#A48742" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              tickLine={false}
              interval={3}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0a0a0a",
                border: "1px solid rgba(164,135,66,0.3)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#A48742", fontWeight: 600 }}
              itemStyle={{ color: "#fff" }}
              formatter={(v) => [`${Number(v).toLocaleString("cs-CZ")} Kč`, "Tržby"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#A48742"
              strokeWidth={2}
              fill="url(#goldGrad)"
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
