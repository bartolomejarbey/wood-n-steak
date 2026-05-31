import type { Metadata } from "next";
import { noindexMetadata } from "@/lib/seo";

// Applies to /pokladna and the nested /pokladna/dekujeme.
export const metadata: Metadata = noindexMetadata("Pokladna");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
