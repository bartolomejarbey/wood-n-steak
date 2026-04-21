import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wood & Steak | Steak jako z restaurace u vás doma",
    template: "%s | Wood & Steak",
  },
  description:
    "Prémiové maso, domácí omáčky, koření a vybavení pro přípravu dokonalého steaku. E-shop steakhouse Wood & Steak z Vinohrad — rozvážíme po Praze, doprava zdarma od 500 Kč.",
  keywords: [
    "steak e-shop Praha",
    "hovězí maso Vinohrady",
    "dry aged steak",
    "Wood & Steak",
    "prémiové maso",
    "domácí steakové omáčky",
  ],
  authors: [{ name: "Wood & Steak" }],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: siteUrl,
    siteName: "Wood & Steak",
    title: "Wood & Steak | Steak jako z restaurace u vás doma",
    description:
      "Prémiové maso, domácí omáčky a vybavení pro přípravu dokonalého steaku. Rozvoz po Praze.",
    images: [{ url: "/images/photos/tbone-grill.jpg", width: 1920, height: 1280, alt: "Wood & Steak — prémiový steakhouse ve Vinohradech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wood & Steak",
    description: "Steak jako z restaurace u vás doma.",
    images: ["/images/photos/tbone-grill.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-black text-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
