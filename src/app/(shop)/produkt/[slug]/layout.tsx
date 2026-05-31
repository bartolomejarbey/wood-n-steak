import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, productLd, breadcrumbLd, truncate } from "@/lib/seo";
import { getProductBySlug, getCategories } from "@/lib/data";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Produkt nenalezen", robots: { index: false, follow: true } };
  }
  return buildMetadata({
    title: product.name,
    description: truncate(
      product.description ?? product.short_description ?? product.name
    ),
    path: `/produkt/${product.slug}`,
    image: product.image_url
      ? { url: product.image_url, alt: product.name, width: 1024, height: 1024 }
      : undefined,
  });
}

export default async function ProductLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const category = getCategories().find((c) => c.id === product.category_id);
  const ld: object[] = [
    productLd(product),
    breadcrumbLd([
      { name: "Produkty", path: "/sortiment" },
      ...(category
        ? [{ name: category.name, path: `/sortiment/${category.slug}` }]
        : []),
      { name: product.name, path: `/produkt/${product.slug}` },
    ]),
  ];
  return (
    <>
      <JsonLd data={ld} />
      {children}
    </>
  );
}
