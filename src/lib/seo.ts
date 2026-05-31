import type { Metadata } from "next";
import type { Product } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// Central SEO configuration + schema.org JSON-LD builders for Wood & Steak.
// Business facts are sourced from the contact page / footer / OpenStatus.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Wood & Steak",
  legalName: "Wood & Steak s.r.o.",
  description:
    "Prémiové maso, domácí omáčky a vybavení na dokonalý steak. Steakhouse Wood & Steak z Vinohrad — rozvoz po Praze, doprava zdarma od 500 Kč.",
  locale: "cs_CZ",
  email: "info@woodandsteak.cz",
  telephone: "+420725724540",
  telephoneDisplay: "+420 725 724 540",
  address: {
    street: "Belgická 24",
    locality: "Praha 2 — Vinohrady",
    city: "Praha",
    region: "Hlavní město Praha",
    postalCode: "120 00",
    country: "CZ",
  },
  // Opening hours per the OpenStatus component (source of truth for open/closed).
  // NOTE: the Footer text currently shows simplified/different hours — reconcile.
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday"], opens: "11:00", closes: "22:00" },
    { days: ["Thursday", "Friday"], opens: "11:00", closes: "23:00" },
    { days: ["Saturday"], opens: "12:00", closes: "23:00" },
    // Sunday: closed
  ],
  priceRange: "$$$",
  servesCuisine: ["Steak", "Grilování", "Hovězí", "BBQ"],
  currenciesAccepted: "CZK",
  paymentAccepted: "Hotovost, Platební karta, Apple Pay, Google Pay",
  sameAs: [
    "https://www.instagram.com/woodandsteak/",
    "https://www.facebook.com/woodandsteak/",
    "https://www.tiktok.com/@woodandsteak",
    "https://www.woodandsteak.cz/",
  ],
  mapUrl: "https://www.google.com/maps?q=Belgick%C3%A1+24,+Praha+2,+120+00",
  logoPath: "/images/logo.png",
  ogImagePath: "/images/photos/tbone-grill.jpg",
  ogImageAlt: "Wood & Steak — prémiový steakhouse ve Vinohradech",
} as const;

export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000"
  );
}

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

// Trim a string to a meta-description-friendly length on a word boundary.
export function truncate(text: string, max = 155): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 60 ? slice.slice(0, lastSpace) : slice).trimEnd() + "…";
}

// ── Metadata helper ──────────────────────────────────────────────────────────
// Emits a COMPLETE metadata object. Next.js merges metadata shallowly and
// REPLACES nested objects (openGraph/twitter) from deeper segments, so every
// page must supply the full openGraph/twitter block — this helper does that.

interface PageMetaInput {
  title?: string;
  description?: string;
  path: string;
  image?: { url: string; alt: string; width?: number; height?: number };
  type?: "website" | "article";
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noindex = false,
}: PageMetaInput): Metadata {
  const img = image ?? {
    url: SITE.ogImagePath,
    alt: SITE.ogImageAlt,
    width: 1920,
    height: 1280,
  };
  // Emit an absolute title so the brand suffix is consistent on every page,
  // independent of how intermediate layouts affect title.template inheritance.
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: SITE.locale,
      url: absoluteUrl(path),
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [
        { url: img.url, width: img.width ?? 1200, height: img.height ?? 630, alt: img.alt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img.url],
    },
    ...(noindex
      ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } }
      : {}),
  };
}

// ── JSON-LD builders ─────────────────────────────────────────────────────────

const ORG_ID = () => `${siteUrl()}/#organization`;
const WEBSITE_ID = () => `${siteUrl()}/#website`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID(),
    name: SITE.name,
    legalName: SITE.legalName,
    url: siteUrl(),
    logo: absoluteUrl(SITE.logoPath),
    image: absoluteUrl(SITE.ogImagePath),
    email: SITE.email,
    telephone: SITE.telephone,
    foundingDate: "2018",
    sameAs: [...SITE.sameAs],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID(),
    url: siteUrl(),
    name: SITE.name,
    inLanguage: "cs-CZ",
    publisher: { "@id": ORG_ID() },
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl()}/#restaurant`,
    name: SITE.name,
    image: absoluteUrl(SITE.ogImagePath),
    logo: absoluteUrl(SITE.logoPath),
    url: siteUrl(),
    telephone: SITE.telephone,
    email: SITE.email,
    priceRange: SITE.priceRange,
    servesCuisine: [...SITE.servesCuisine],
    currenciesAccepted: SITE.currenciesAccepted,
    paymentAccepted: SITE.paymentAccepted,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    hasMap: SITE.mapUrl,
    // openingHoursSpecification intentionally omitted for now: the three sources
    // in the codebase (OpenStatus.tsx, Footer.tsx, o-restauraci) disagree. Re-add
    // once the real hours are confirmed — data is already shaped in SITE.openingHours.
    sameAs: [...SITE.sameAs],
    parentOrganization: { "@id": ORG_ID() },
  };
}

function availabilityFor(status: Product["stock_status"]): string {
  switch (status) {
    case "in_stock":
      return "https://schema.org/InStock";
    case "on_order":
      return "https://schema.org/PreOrder";
    case "out_of_stock":
    default:
      return "https://schema.org/OutOfStock";
  }
}

export function productLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(`/produkt/${product.slug}`),
    name: product.name,
    description: product.description ?? product.short_description ?? product.name,
    sku: product.id,
    ...(product.image_url ? { image: [absoluteUrl(product.image_url)] } : {}),
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/produkt/${product.slug}`),
      price: String(product.price),
      priceCurrency: "CZK",
      priceValidUntil: "2026-12-31",
      availability: availabilityFor(product.stock_status),
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORG_ID() },
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListLd(products: Product[], opts?: { name?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(opts?.name ? { name: opts.name } : {}),
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/produkt/${p.slug}`),
      name: p.name,
    })),
  };
}

export function faqPageLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// Shared metadata for non-indexable utility pages (cart, checkout, account, auth).
export function noindexMetadata(title?: string): Metadata {
  return {
    ...(title ? { title } : {}),
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
  };
}
