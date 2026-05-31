import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";
import { SITE, siteUrl } from "@/lib/seo";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Wood & Steak | Steak jako z restaurace u vás doma",
    template: "%s | Wood & Steak",
  },
  description: SITE.description,
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
    url: siteUrl(),
    siteName: "Wood & Steak",
    title: "Wood & Steak | Steak jako z restaurace u vás doma",
    description: SITE.description,
    images: [{ url: "/images/photos/tbone-grill.jpg", width: 1920, height: 1280, alt: "Wood & Steak — prémiový steakhouse ve Vinohradech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wood & Steak",
    description: "Steak jako z restaurace u vás doma.",
    images: ["/images/photos/tbone-grill.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
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
