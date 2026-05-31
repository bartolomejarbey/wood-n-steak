import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt",
  description:
    "Napište nebo zavolejte. Wood & Steak, Belgická 24, Praha 2 — Vinohrady. Tel. +420 725 724 540, info@woodandsteak.cz. Dotazy k objednávce i výběru masa.",
  path: "/kontakt",
});

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
