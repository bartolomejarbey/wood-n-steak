import type { Category, Product } from "./types";

// Static data for development without Supabase connection
// Will be replaced with Supabase queries when connected

export const categories: Category[] = [
  {
    id: "a1000000-0000-0000-0000-000000000001",
    name: "Steaky",
    slug: "steaky",
    description: "Prémiové kusy hovězích steaků — dry-aged, Black Angus, Wagyu",
    image_url: null,
    parent_id: null,
    sort_order: 1,
    is_active: true,
    created_at: "",
  },
  {
    id: "a1000000-0000-0000-0000-000000000002",
    name: "Hovězí maso",
    slug: "hovezi-maso",
    description: "Kvalitní hovězí maso pro pečlivě připravená jídla",
    image_url: null,
    parent_id: null,
    sort_order: 2,
    is_active: true,
    created_at: "",
  },
  {
    id: "a1000000-0000-0000-0000-000000000003",
    name: "Domácí omáčky",
    slug: "domaci-omacky",
    description: "Autentické omáčky přímo z naší restaurační kuchyně",
    image_url: null,
    parent_id: null,
    sort_order: 3,
    is_active: true,
    created_at: "",
  },
  {
    id: "a1000000-0000-0000-0000-000000000004",
    name: "Doplňky",
    slug: "doplnky",
    description: "Grilovací nářadí, prémiové nože a dárkové předměty Wood & Steak",
    image_url: null,
    parent_id: null,
    sort_order: 4,
    is_active: true,
    created_at: "",
  },
];

export const products: Product[] = [
  // Steaky
  { id: "p001", name: "Rib Eye Black Angus dry-aged", slug: "rib-eye-black-angus-dry-aged", description: "Skvěle mramorovaný Rib Eye z Black Angus, zrající 28 dní v naší zracím boxu. Intenzivní chuť s máslovou texturou. Ideální na gril nebo litinovou pánev.", short_description: "Dry-aged 28 dní, intenzivní chuť", category_id: "a1000000-0000-0000-0000-000000000001", price: 1890, unit: "kg", weight_info: "1 kg", image_url: "/images/photos/hero-dryagers.jpg", gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: "Bestseller", sort_order: 1, created_at: "", updated_at: "" },
  { id: "p002", name: "Sirloin steak premium", slug: "sirloin-steak-premium", description: "Klasický svíčkový steak s jemnou texturou a výraznou chutí. Servírovaný s čerstvým pepřem a sezónní oblohou. Ideální pro ty, kteří preferují nižší obsah tuku s maximem chuti.", short_description: "Jemná textura, výrazná chuť", category_id: "a1000000-0000-0000-0000-000000000001", price: 1490, unit: "kg", weight_info: "1 kg", image_url: "/images/photos/couple-dining.jpg", gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  { id: "p003", name: "T-bone steak", slug: "t-bone-steak", description: "Dva steaky v jednom – na jedné straně svíčková, na druhé roštěná. Impozantní kus masa pro opravdové milovníky steaků.", short_description: "Svíčková + roštěná v jednom", category_id: "a1000000-0000-0000-0000-000000000001", price: 1690, unit: "kg", weight_info: "800 g", image_url: "/images/photos/tbone-grill.jpg", gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 3, created_at: "", updated_at: "" },
  { id: "p004", name: "Tomahawk steak", slug: "tomahawk-steak", description: "Spektakulární steak s dlouhou kostí, který ohromí na každém grilování. Mramorovaný, šťavnatý a vizuálně nezapomenutelný.", short_description: "Steak s dlouhou kostí, 1.2 kg", category_id: "a1000000-0000-0000-0000-000000000001", price: 2290, unit: "kg", weight_info: "1.2 kg", image_url: "/images/photos/butcher-ribcage.jpg", gallery: [], stock_status: "on_order", is_active: true, is_featured: true, badge: "Na objednávku", sort_order: 4, created_at: "", updated_at: "" },
  // Hovězí maso
  { id: "p009", name: "Hovězí mleté premium", slug: "hovezi-mlete-premium", description: "Čerstvě mleté hovězí z kvalitního masa. Ideální na burgery, bolognese nebo steak tartare. Šťavnaté, plné chuti.", short_description: "Čerstvě mleté, 20% tuku", category_id: "a1000000-0000-0000-0000-000000000002", price: 490, unit: "kg", weight_info: "500 g", image_url: "/images/photos/food-burger.jpg", gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 5, created_at: "", updated_at: "" },
  { id: "p022", name: "Hovězí špízy marinované", slug: "hovezi-spizy-marinovane", description: "Šťavnaté kousky hovězího masa marinované v aromatických bylinkách a olivovém oleji. Ideální na rychlé grilování. Servírujeme s bylinkovou omáčkou chimichurri.", short_description: "Marinované v bylinkách, na gril", category_id: "a1000000-0000-0000-0000-000000000002", price: 390, unit: "ks", weight_info: "300 g", image_url: "/images/photos/food-skewers-beef.jpg", gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: "Novinka", sort_order: 6, created_at: "", updated_at: "" },
  // Domácí omáčky
  { id: "p010", name: "BBQ omáčka domácí", slug: "bbq-omacka-domaci", description: "Naše autorská BBQ omáčka s výraznou uzenou chutí, medem a hint chipotle. Vyráběna ručně v naší restaurační kuchyni. Skvělá k masu i ke křídlům.", short_description: "Autorská receptura, uzená chuť", category_id: "a1000000-0000-0000-0000-000000000003", price: 220, unit: "ks", weight_info: "250 ml", image_url: "/images/photos/food-wings.jpg", gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 7, created_at: "", updated_at: "" },
  { id: "p012", name: "Chimichurri", slug: "chimichurri", description: "Argentinská bylinková omáčka z čerstvé petržele, oregana, česneku a olivového oleje. Dokonalý doprovod ke každému steaku.", short_description: "Argentinská bylinková klasika", category_id: "a1000000-0000-0000-0000-000000000003", price: 220, unit: "ks", weight_info: "250 ml", image_url: "/images/photos/food-tartare.jpg", gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 8, created_at: "", updated_at: "" },
  // Doplňky — fotografie odpovídají popisu 1:1 (generováno gpt-image-1)
  { id: "p030", name: "Steakové nože — set 4 ks", slug: "steakove-noze-set-4ks", description: "Sada čtyř steakových nožů s matně černými rukojeťmi zdobenými mosazným nýtem a elegantní zlatavě tónovanou čepelí s jemným zoubkovaným ostřím. Hladce nakrojí každý steak a na prostřeném stole působí luxusně.", short_description: "Set 4 ks · černé rukojeti, zlatá čepel", category_id: "a1000000-0000-0000-0000-000000000004", price: 1490, unit: "ks", weight_info: "4 ks v sadě", image_url: "/images/products/steakove-noze-set-4ks.jpg", gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: "Novinka", sort_order: 9, created_at: "", updated_at: "" },
  { id: "p031", name: "BBQ grilovací set — 3 díly", slug: "bbq-grilovaci-set-pro", description: "Třídílná grilovací sada z nerezové oceli — široká obracečka s prořezem, uzamykací kleště a dvojzubá napichovací vidlice. Všechny tři nástroje mají matně černé rukojeti pro pevný a bezpečný úchop. Profesionální výbava ke každému grilu.", short_description: "Obracečka, kleště a vidlice", category_id: "a1000000-0000-0000-0000-000000000004", price: 1290, unit: "ks", weight_info: "3dílná sada", image_url: "/images/products/bbq-grilovaci-set-pro.jpg", gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 10, created_at: "", updated_at: "" },
  { id: "p032", name: "Šéfkuchařský nůž damašek 20 cm", slug: "sefkucharsky-nuz-20cm", description: "Kovaný šéfkuchařský nůž s damaškovou čepelí, jejíž charakteristický vrstvený vzor vzniká skováním mnoha vrstev oceli. Matně černá rukojeť se dvěma mosaznými nýty pohodlně padne do ruky. Ostrý, vyvážený a stvořený pro náročné.", short_description: "Damašková čepel, černá rukojeť", category_id: "a1000000-0000-0000-0000-000000000004", price: 1990, unit: "ks", weight_info: "čepel 20 cm", image_url: "/images/products/sefkucharsky-nuz-20cm.jpg", gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 11, created_at: "", updated_at: "" },
  { id: "p033", name: "Kožená klíčenka s býkem", slug: "kozena-klicenka-logo", description: "Klíčenka z černé kůže s ozdobným prošitím, masivním mosazným kroužkem a kulatým mosazným medailonem s reliéfním znakem býka — symbolem Wood & Steak. Malý dárek s prémiovým detailem.", short_description: "Pravá kůže · mosazný znak býka", category_id: "a1000000-0000-0000-0000-000000000004", price: 290, unit: "ks", weight_info: "pravá kůže", image_url: "/images/products/kozena-klicenka-logo.jpg", gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: "Dárek", sort_order: 12, created_at: "", updated_at: "" },
  { id: "p034", name: "Litinová grilovací pánev", slug: "litinova-grilovaci-panev", description: "Těžká litinová grilovací pánev s vroubkovaným dnem, které na mase vykreslí dokonalé grilovací pruhy a odvede přebytečný tuk. Výborně drží teplo a propálí steak do křupava jako na grilu. Robustní litinová rukojeť s otvorem pro zavěšení.", short_description: "Litina · vroubkované dno na steaky", category_id: "a1000000-0000-0000-0000-000000000004", price: 990, unit: "ks", weight_info: "Ø 26 cm", image_url: "/images/products/litinova-grilovaci-panev.jpg", gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 13, created_at: "", updated_at: "" },
];

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category_id === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.is_featured);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.short_description?.toLowerCase().includes(q)
  );
}
