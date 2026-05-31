import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, itemListLd, breadcrumbLd } from "@/lib/seo";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return { title: "Kategorie nenalezena", robots: { index: false, follow: true } };
  }
  return buildMetadata({
    title: category.name,
    description: category.description
      ? `${category.description}. Rozvoz po Praze, doprava zdarma od 500 Kč.`
      : `${category.name} — sortiment Wood & Steak. Rozvoz po Praze.`,
    path: `/sortiment/${category.slug}`,
  });
}

export default async function CategoryLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const ld: object[] = [
    breadcrumbLd([
      { name: "Produkty", path: "/sortiment" },
      { name: category.name, path: `/sortiment/${category.slug}` },
    ]),
  ];
  const products = getProductsByCategory(category.id);
  if (products.length > 0) {
    ld.push(itemListLd(products, { name: category.name }));
  }
  return (
    <>
      <JsonLd data={ld} />
      {children}
    </>
  );
}
