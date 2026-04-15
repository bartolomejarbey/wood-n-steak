export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  category_id: string;
  price: number;
  unit: string;
  weight_info: string | null;
  image_url: string | null;
  gallery: string[];
  stock_status: "in_stock" | "on_order" | "out_of_stock";
  is_active: boolean;
  is_featured: boolean;
  badge: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Customer {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  company_name: string | null;
  ico: string | null;
  dic: string | null;
  newsletter: boolean;
  created_at: string;
}

export interface CustomerAddress {
  id: string;
  customer_id: string;
  type: "billing" | "shipping";
  street: string;
  city: string;
  zip: string;
  country: string;
  is_default: boolean;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string | null;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  company_name: string | null;
  ico: string | null;
  dic: string | null;
  shipping_street: string;
  shipping_city: string;
  shipping_zip: string;
  shipping_country: string;
  billing_same: boolean;
  billing_street: string | null;
  billing_city: string | null;
  billing_zip: string | null;
  billing_country: string | null;
  subtotal: number;
  shipping_cost: number;
  total: number;
  payment_method: "comgate" | "cod" | "bank_transfer";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  order_status: "new" | "confirmed" | "preparing" | "shipped" | "delivered" | "cancelled";
  note: string | null;
  comgate_transaction_id: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  customer?: Customer;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
