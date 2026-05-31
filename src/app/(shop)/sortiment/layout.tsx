import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// Metadata only. The per-category ItemList JSON-LD lives in
// sortiment/[slug]/layout.tsx so it stays scoped to each category (a layout here
// would leak an all-products list onto every category page).
export const metadata: Metadata = buildMetadata({
  title: "Sortiment — maso, steaky a grilování",
  description:
    "Kompletní e-shop Wood & Steak: dry-aged steaky, hovězí maso, domácí omáčky, steakové nože a BBQ vybavení. Rozvoz po Praze, doprava zdarma od 500 Kč.",
  path: "/sortiment",
});

export default function SortimentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
