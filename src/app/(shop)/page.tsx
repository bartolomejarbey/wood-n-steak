import type { Metadata } from "next";
import HomeClient from "./HomeClient";

// Title/description/OG are inherited from the root layout (they already describe
// the homepage); here we only add the self-referencing canonical.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
