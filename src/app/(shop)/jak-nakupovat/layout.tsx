import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, faqPageLd } from "@/lib/seo";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = buildMetadata({
  title: "Jak nakupovat",
  description:
    "Jak na nákup ve Wood & Steak: vyberte maso a vybavení, zaplaťte kartou, převodem či dobírkou. Rozvoz po Praze do 24 h, doprava zdarma od 500 Kč.",
  path: "/jak-nakupovat",
});

export default function JakNakupovatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={faqPageLd(faqs)} />
      {children}
    </>
  );
}
