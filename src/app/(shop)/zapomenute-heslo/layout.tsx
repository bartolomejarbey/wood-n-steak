import type { Metadata } from "next";
import { noindexMetadata } from "@/lib/seo";

export const metadata: Metadata = noindexMetadata("Zapomenuté heslo");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
