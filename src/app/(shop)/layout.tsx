import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import { CartProvider } from "@/context/CartContext";
import JsonLd from "@/components/seo/JsonLd";
import { organizationLd, localBusinessLd, websiteLd } from "@/lib/seo";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <JsonLd data={[organizationLd(), localBusinessLd(), websiteLd()]} />
      <a
        href="#obsah"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-medium focus:text-black"
      >
        Přeskočit na obsah
      </a>
      <Header />
      <main id="obsah" className="flex-1">
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}
