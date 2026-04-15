import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import { CartProvider } from "@/context/CartContext";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </CartProvider>
  );
}
