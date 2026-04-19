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
    name: "Marinády a koření",
    slug: "marinady-a-koreni",
    description: "Steak rubs, soli a marinády pro dokonalou chuť",
    image_url: null,
    parent_id: null,
    sort_order: 4,
    is_active: true,
    created_at: "",
  },
  {
    id: "a1000000-0000-0000-0000-000000000005",
    name: "Nože a vybavení",
    slug: "noze-a-vybaveni",
    description: "Steakové nože, prkénka a grilovací příslušenství",
    image_url: null,
    parent_id: null,
    sort_order: 5,
    is_active: true,
    created_at: "",
  },
  {
    id: "a1000000-0000-0000-0000-000000000006",
    name: "Doplňky",
    slug: "doplnky",
    description: "Máslo na steak, oleje, sůl Maldon a další",
    image_url: null,
    parent_id: null,
    sort_order: 6,
    is_active: true,
    created_at: "",
  },
];

export const products: Product[] = [
  // Steaky
  { id: "p001", name: "Rib Eye Black Angus dry-aged", slug: "rib-eye-black-angus-dry-aged", description: "Skvěle mramorovaný Rib Eye z Black Angus, zrající 28 dní v naší zracím boxu. Intenzivní chuť s máslovou texturou. Ideální na gril nebo litinovou pánev.", short_description: "Dry-aged 28 dní, intenzivní chuť", category_id: "a1000000-0000-0000-0000-000000000001", price: 1890, unit: "kg", weight_info: "1 kg", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: "Bestseller", sort_order: 1, created_at: "", updated_at: "" },
  { id: "p002", name: "Sirloin steak premium", slug: "sirloin-steak-premium", description: "Klasický svíčkový steak s jemnou texturou a výraznou chutí. Ideální pro ty, kteří preferují nižší obsah tuku s maximem chuti.", short_description: "Jemná textura, výrazná chuť", category_id: "a1000000-0000-0000-0000-000000000001", price: 1490, unit: "kg", weight_info: "1 kg", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  { id: "p003", name: "T-bone steak", slug: "t-bone-steak", description: "Dva steaky v jednom – na jedné straně svíčková, na druhé roštěná. Impozantní kus masa pro opravdové milovníky steaků.", short_description: "Svíčková + roštěná v jednom", category_id: "a1000000-0000-0000-0000-000000000001", price: 1690, unit: "kg", weight_info: "800 g", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 3, created_at: "", updated_at: "" },
  { id: "p004", name: "Tomahawk steak", slug: "tomahawk-steak", description: "Spektakulární steak s dlouhou kostí, který ohromí na každém grilování. Mramorovaný, šťavnatý a vizuálně nezapomenutelný.", short_description: "Steak s dlouhou kostí, 1.2 kg", category_id: "a1000000-0000-0000-0000-000000000001", price: 2290, unit: "kg", weight_info: "1.2 kg", image_url: null, gallery: [], stock_status: "on_order", is_active: true, is_featured: true, badge: "Na objednávku", sort_order: 4, created_at: "", updated_at: "" },
  { id: "p005", name: "Picanha", slug: "picanha", description: "Brazilská specialita s tukovou čapičkou, která při grilování vytváří neodolatelnou chuť. Oblíbený kus pro reverse sear.", short_description: "Brazilská klasika s tukovou čapičkou", category_id: "a1000000-0000-0000-0000-000000000001", price: 990, unit: "kg", weight_info: "1 kg", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 5, created_at: "", updated_at: "" },
  { id: "p006", name: "Flank steak", slug: "flank-steak", description: "Libový a chutný kus z břiska. Ideální na marinování a rychlé opečení na vysokém žáru. Krájí se proti vláknům.", short_description: "Libový, ideální na marinády", category_id: "a1000000-0000-0000-0000-000000000001", price: 890, unit: "kg", weight_info: "1 kg", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 6, created_at: "", updated_at: "" },
  // Hovězí maso
  { id: "p007", name: "Svíčková hovězí", slug: "svickova-hovezi", description: "Nejjemnější část hověziny, ideální na klasickou svíčkovou na smetaně nebo na tatarský biftek.", short_description: "Nejjemnější část hověziny", category_id: "a1000000-0000-0000-0000-000000000002", price: 1290, unit: "kg", weight_info: "1 kg", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 1, created_at: "", updated_at: "" },
  { id: "p008", name: "Roast beef", slug: "roast-beef", description: "Premium kus na pomalé pečení. Po správné přípravě šťavnatý a jemný roast beef jako z anglické tradice.", short_description: "Na pomalé pečení", category_id: "a1000000-0000-0000-0000-000000000002", price: 890, unit: "kg", weight_info: "1 kg", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  { id: "p009", name: "Hovězí mleté premium", slug: "hovezi-mlete-premium", description: "Čerstvě mleté hovězí z kvalitního masa. Ideální na burgery, bolognese nebo steak tartare.", short_description: "Čerstvě mleté, 20% tuku", category_id: "a1000000-0000-0000-0000-000000000002", price: 490, unit: "kg", weight_info: "500 g", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 3, created_at: "", updated_at: "" },
  // Domácí omáčky
  { id: "p010", name: "BBQ omáčka domácí", slug: "bbq-omacka-domaci", description: "Naše autorská BBQ omáčka s výraznou uzenou chutí, medem a hint chipotle. Vyráběna ručně v naší restaurační kuchyni.", short_description: "Autorská receptura, uzená chuť", category_id: "a1000000-0000-0000-0000-000000000003", price: 220, unit: "ks", weight_info: "250 ml", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 1, created_at: "", updated_at: "" },
  { id: "p011", name: "Peppercorn omáčka", slug: "peppercorn-omacka", description: "Klasická smetanová omáčka se zeleným pepřem. Dokonalý doprovod k jakémukoli steaku.", short_description: "Krémová se zeleným pepřem", category_id: "a1000000-0000-0000-0000-000000000003", price: 240, unit: "ks", weight_info: "250 ml", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  { id: "p012", name: "Chimichurri", slug: "chimichurri", description: "Argentinská bylinková omáčka z čerstvé petržele, oregana, česneku a olivového oleje.", short_description: "Argentinská bylinková klasika", category_id: "a1000000-0000-0000-0000-000000000003", price: 220, unit: "ks", weight_info: "250 ml", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 3, created_at: "", updated_at: "" },
  { id: "p013", name: "Demi-glace tmavá", slug: "demi-glace-tmava", description: "Koncentrovaná tmavá omáčka vařená 48 hodin z hovězích kostí. Základ francouzské kuchyně.", short_description: "Vařená 48 hodin z hovězích kostí", category_id: "a1000000-0000-0000-0000-000000000003", price: 280, unit: "ks", weight_info: "250 ml", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 4, created_at: "", updated_at: "" },
  // Marinády
  { id: "p014", name: "Steak rub Wood & Steak", slug: "steak-rub-wood-and-steak", description: "Naše signaturní kořenící směs pro steaky. Hrubá sůl, černý pepř, česnek, cibule a tajné byliny.", short_description: "Signaturní směs pro steaky", category_id: "a1000000-0000-0000-0000-000000000004", price: 180, unit: "ks", weight_info: "100 g", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 1, created_at: "", updated_at: "" },
  { id: "p015", name: "Sůl Maldon Smoked", slug: "sul-maldon-smoked", description: "Uzená mořská sůl Maldon ve vločkovité formě. Dokonalé finální dochucení steaku.", short_description: "Uzená vločkovitá mořská sůl", category_id: "a1000000-0000-0000-0000-000000000004", price: 150, unit: "ks", weight_info: "125 g", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  // Nože
  { id: "p016", name: "Steakový nůž Wüsthof Classic", slug: "steakovy-nuz-wusthof-classic", description: "Německý steakový nůž Wüsthof z vysoce legované oceli. Ostrá čepel pro dokonalý řez masem.", short_description: "Německá kvalita, ostrá čepel", category_id: "a1000000-0000-0000-0000-000000000005", price: 2890, unit: "ks", weight_info: null, image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 1, created_at: "", updated_at: "" },
  { id: "p017", name: "Sada 4 steakových nožů", slug: "sada-4-steakovych-nozu", description: "Elegantní sada čtyř steakových nožů v dárkovém balení. Kvalitní ocel, ergonomická rukojeť z dubového dřeva.", short_description: "Dárková sada, dubová rukojeť", category_id: "a1000000-0000-0000-0000-000000000005", price: 4500, unit: "ks", weight_info: null, image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  { id: "p018", name: "Dubové prkénko velké", slug: "dubove-prkenko-velke", description: "Masivní dubové prkénko s drážkou na šťávu. Ručně vyráběné v České republice. Rozměr 45x30 cm.", short_description: "Ručně vyrobené, 45x30 cm", category_id: "a1000000-0000-0000-0000-000000000005", price: 1290, unit: "ks", weight_info: null, image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 3, created_at: "", updated_at: "" },
  // Doplňky
  { id: "p019", name: "Steakové máslo s rozmarýnem", slug: "steakove-maslo-s-rozmarynem", description: "Domácí šlehané máslo s čerstvým rozmarýnem a mořskou solí.", short_description: "Domácí, s rozmarýnem a solí", category_id: "a1000000-0000-0000-0000-000000000006", price: 120, unit: "ks", weight_info: "100 g", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 1, created_at: "", updated_at: "" },
  { id: "p020", name: "Extra panenský olivový olej", slug: "extra-panensky-olivovy-olej", description: "Italský extra panenský olivový olej z Toskánska.", short_description: "Toskánský, cold-pressed", category_id: "a1000000-0000-0000-0000-000000000006", price: 380, unit: "ks", weight_info: "500 ml", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  { id: "p021", name: "Čerstvý rozmarýn svazek", slug: "cerstvý-rozmaryn-svazek", description: "Čerstvý rozmarýn pro aromatické grilování.", short_description: "Čerstvý, na grilování", category_id: "a1000000-0000-0000-0000-000000000006", price: 45, unit: "ks", weight_info: "1 svazek", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 3, created_at: "", updated_at: "" },
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
