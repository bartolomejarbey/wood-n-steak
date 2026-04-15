-- Wood & Steak E-shop Schema
-- Run this in Supabase SQL Editor

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  unit TEXT DEFAULT 'ks',
  weight_info TEXT,
  image_url TEXT,
  gallery TEXT[] DEFAULT '{}',
  stock_status TEXT DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'on_order', 'out_of_stock')),
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  badge TEXT,
  sort_order INTEGER DEFAULT 0,
  ts_vector TSVECTOR,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Full-text search trigger
CREATE OR REPLACE FUNCTION products_ts_trigger() RETURNS TRIGGER AS $$
BEGIN
  NEW.ts_vector := to_tsvector('simple', COALESCE(NEW.name, '') || ' ' || COALESCE(NEW.description, '') || ' ' || COALESCE(NEW.short_description, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_ts_update
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION products_ts_trigger();

CREATE INDEX products_ts_idx ON products USING GIN(ts_vector);
CREATE INDEX products_category_idx ON products(category_id);
CREATE INDEX products_slug_idx ON products(slug);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Customers
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID UNIQUE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  company_name TEXT,
  ico TEXT,
  dic TEXT,
  newsletter BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer addresses
CREATE TABLE customer_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'shipping' CHECK (type IN ('billing', 'shipping')),
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  zip TEXT NOT NULL,
  country TEXT DEFAULT 'CZ',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  ico TEXT,
  dic TEXT,
  shipping_street TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_zip TEXT NOT NULL,
  shipping_country TEXT DEFAULT 'CZ',
  billing_same BOOLEAN DEFAULT true,
  billing_street TEXT,
  billing_city TEXT,
  billing_zip TEXT,
  billing_country TEXT,
  subtotal NUMERIC(10,2) NOT NULL,
  shipping_cost NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  payment_method TEXT DEFAULT 'comgate' CHECK (payment_method IN ('comgate', 'cod', 'bank_transfer')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  order_status TEXT DEFAULT 'new' CHECK (order_status IN ('new', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled')),
  note TEXT,
  comgate_transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Order items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL
);

CREATE INDEX order_items_order_idx ON order_items(order_id);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS Policies

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read for categories and products
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Site settings viewable by everyone" ON site_settings FOR SELECT USING (true);

-- Authenticated users can manage their own data
CREATE POLICY "Users can view own customer record" ON customers FOR SELECT USING (auth.uid() = auth_user_id);
CREATE POLICY "Users can update own customer record" ON customers FOR UPDATE USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can view own addresses" ON customer_addresses FOR SELECT
  USING (customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid()));
CREATE POLICY "Users can manage own addresses" ON customer_addresses FOR ALL
  USING (customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can view own orders" ON orders FOR SELECT
  USING (customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can view own order items" ON order_items FOR SELECT
  USING (order_id IN (
    SELECT id FROM orders WHERE customer_id IN (
      SELECT id FROM customers WHERE auth_user_id = auth.uid()
    )
  ));

-- Service role has full access (for admin and API routes)
CREATE POLICY "Service role full access categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access customers" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access addresses" ON customer_addresses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access order_items" ON order_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access newsletter" ON newsletter_subscribers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- Anyone can subscribe to newsletter
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
