import type { Category, Product } from "./types";

// Static data for development without Supabase connection
// Will be replaced with Supabase queries when connected

export const categories: Category[] = [
  {
    id: "a1000000-0000-0000-0000-000000000001",
    name: "Steaky",
    slug: "steaky",
    description: "Premiove kusy hovezich steaku - dry-aged, Black Angus, Wagyu",
    image_url: null,
    parent_id: null,
    sort_order: 1,
    is_active: true,
    created_at: "",
  },
  {
    id: "a1000000-0000-0000-0000-000000000002",
    name: "Hovezi maso",
    slug: "hovezi-maso",
    description: "Kvalitni hovezi maso pro peclive pripravena jidla",
    image_url: null,
    parent_id: null,
    sort_order: 2,
    is_active: true,
    created_at: "",
  },
  {
    id: "a1000000-0000-0000-0000-000000000003",
    name: "Domaci omacky",
    slug: "domaci-omacky",
    description: "Autenticke omacky primo z nasi restauracni kuchyne",
    image_url: null,
    parent_id: null,
    sort_order: 3,
    is_active: true,
    created_at: "",
  },
  {
    id: "a1000000-0000-0000-0000-000000000004",
    name: "Marinady a koreni",
    slug: "marinady-a-koreni",
    description: "Steak rubs, soli a marinady pro dokonalou chut",
    image_url: null,
    parent_id: null,
    sort_order: 4,
    is_active: true,
    created_at: "",
  },
  {
    id: "a1000000-0000-0000-0000-000000000005",
    name: "Noze a vybaveni",
    slug: "noze-a-vybaveni",
    description: "Steakove noze, prkenka a grilovaci prislusenstvi",
    image_url: null,
    parent_id: null,
    sort_order: 5,
    is_active: true,
    created_at: "",
  },
  {
    id: "a1000000-0000-0000-0000-000000000006",
    name: "Doplnky",
    slug: "doplnky",
    description: "Maslo na steak, oleje, sul Maldon a dalsi",
    image_url: null,
    parent_id: null,
    sort_order: 6,
    is_active: true,
    created_at: "",
  },
];

export const products: Product[] = [
  // Steaky
  { id: "p001", name: "Rib Eye Black Angus dry-aged", slug: "rib-eye-black-angus-dry-aged", description: "Skvele mramorovany Rib Eye z Black Angus, zrajici 28 dni v nasi zracim boxu. Intenzivni chut s maslovou texturou. Idealni na gril nebo litinovou panev.", short_description: "Dry-aged 28 dni, intenzivni chut", category_id: "a1000000-0000-0000-0000-000000000001", price: 1890, unit: "kg", weight_info: "1 kg", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: "Bestseller", sort_order: 1, created_at: "", updated_at: "" },
  { id: "p002", name: "Sirloin steak premium", slug: "sirloin-steak-premium", description: "Klasicky svickovy steak s jemnou texturou a vyraznou chuti. Idealni pro ty, kteri preferuji nizsi obsah tuku s maximem chuti.", short_description: "Jemna textura, vyrazna chut", category_id: "a1000000-0000-0000-0000-000000000001", price: 1490, unit: "kg", weight_info: "1 kg", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  { id: "p003", name: "T-bone steak", slug: "t-bone-steak", description: "Dva steaky v jednom - na jedne strane svickova, na druhe rostena. Imponatni kus masa pro opravdove milovniky steaku.", short_description: "Svickova + rostena v jednom", category_id: "a1000000-0000-0000-0000-000000000001", price: 1690, unit: "kg", weight_info: "800 g", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 3, created_at: "", updated_at: "" },
  { id: "p004", name: "Tomahawk steak", slug: "tomahawk-steak", description: "Spektakularni steak s dlouhou kosti, ktery ohuromi na kazdem grilovanim. Mramorovany, stavnaty a vizualne nezapomenutelny.", short_description: "Steak s dlouhou kosti, 1.2 kg", category_id: "a1000000-0000-0000-0000-000000000001", price: 2290, unit: "kg", weight_info: "1.2 kg", image_url: null, gallery: [], stock_status: "on_order", is_active: true, is_featured: true, badge: "Na objednavku", sort_order: 4, created_at: "", updated_at: "" },
  { id: "p005", name: "Picanha", slug: "picanha", description: "Brazilsky specialita s tukovou capickou, ktera pri grilovani vytvari neodolatelnou chut. Oblibeny kus pro reverse sear.", short_description: "Brazilska klasika s tukovou capickou", category_id: "a1000000-0000-0000-0000-000000000001", price: 990, unit: "kg", weight_info: "1 kg", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 5, created_at: "", updated_at: "" },
  { id: "p006", name: "Flank steak", slug: "flank-steak", description: "Libovy a chutny kus z briska. Idealni na marinovanim a rychle opecenym na vysokem zaru. Kraje se proti vlaknum.", short_description: "Libovy, idealni na marinady", category_id: "a1000000-0000-0000-0000-000000000001", price: 890, unit: "kg", weight_info: "1 kg", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 6, created_at: "", updated_at: "" },
  // Hovezi maso
  { id: "p007", name: "Svickova hovezi", slug: "svickova-hovezi", description: "Nejjemnejsi cast hoveziny, idealni na klasickou svickovou na smetane nebo na tatarsky biftek.", short_description: "Nejjemnejsi cast hoveziny", category_id: "a1000000-0000-0000-0000-000000000002", price: 1290, unit: "kg", weight_info: "1 kg", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 1, created_at: "", updated_at: "" },
  { id: "p008", name: "Roast beef", slug: "roast-beef", description: "Premium kus na pomale peceni. Po spravne priprave stavnaty a jemny roast beef jako z anglicke tradice.", short_description: "Na pomale peceni", category_id: "a1000000-0000-0000-0000-000000000002", price: 890, unit: "kg", weight_info: "1 kg", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  { id: "p009", name: "Hovezi mlete premium", slug: "hovezi-mlete-premium", description: "Cerstve mlete hovezi z kvalitniho masa. Idealni na burgery, bolognese nebo steak tartare.", short_description: "Cerstve mlete, 20% tuku", category_id: "a1000000-0000-0000-0000-000000000002", price: 490, unit: "kg", weight_info: "500 g", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 3, created_at: "", updated_at: "" },
  // Domaci omacky
  { id: "p010", name: "BBQ omacka domaci", slug: "bbq-omacka-domaci", description: "Nase autorska BBQ omacka s vyraznou uzenou chuti, medem a hint chipotle. Vyrabena rucne v nasi restauracni kuchyni.", short_description: "Autorska receptura, uzena chut", category_id: "a1000000-0000-0000-0000-000000000003", price: 220, unit: "ks", weight_info: "250 ml", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 1, created_at: "", updated_at: "" },
  { id: "p011", name: "Peppercorn omacka", slug: "peppercorn-omacka", description: "Klasicka smetanova omacka se zelenym peprem. Dokonaly doprovod k jakemukoli steaku.", short_description: "Kremova se zelenym peprem", category_id: "a1000000-0000-0000-0000-000000000003", price: 240, unit: "ks", weight_info: "250 ml", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  { id: "p012", name: "Chimichurri", slug: "chimichurri", description: "Argentinska bylinkova omacka z cerstvé petrzele, oregana, cesneku a olivoveho oleje.", short_description: "Argentinska bylinkova klasika", category_id: "a1000000-0000-0000-0000-000000000003", price: 220, unit: "ks", weight_info: "250 ml", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 3, created_at: "", updated_at: "" },
  { id: "p013", name: "Demi-glace tmava", slug: "demi-glace-tmava", description: "Koncentrovana tmava omacka varena 48 hodin z hovezich kosti. Zaklad francouzske kuchyne.", short_description: "Varena 48 hodin z hovezich kosti", category_id: "a1000000-0000-0000-0000-000000000003", price: 280, unit: "ks", weight_info: "250 ml", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 4, created_at: "", updated_at: "" },
  // Marinady
  { id: "p014", name: "Steak rub Wood & Steak", slug: "steak-rub-wood-and-steak", description: "Nase signaturni koreni smes pro steaky. Hruba sul, cerny pepr, cesnek, cibule a tajne byliny.", short_description: "Signaturni smes pro steaky", category_id: "a1000000-0000-0000-0000-000000000004", price: 180, unit: "ks", weight_info: "100 g", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 1, created_at: "", updated_at: "" },
  { id: "p015", name: "Sul Maldon Smoked", slug: "sul-maldon-smoked", description: "Uzena morska sul Maldon v vlockovite forme. Dokonale finalni dochuceni steaku.", short_description: "Uzena vlockovita morska sul", category_id: "a1000000-0000-0000-0000-000000000004", price: 150, unit: "ks", weight_info: "125 g", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  // Noze
  { id: "p016", name: "Steakovy nuz Wusthof Classic", slug: "steakovy-nuz-wusthof-classic", description: "Nemecky steakovy nuz Wusthof z vysoko legovane oceli. Ostra cepel pro dokonaly rez masem.", short_description: "Nemecka kvalita, ostra cepel", category_id: "a1000000-0000-0000-0000-000000000005", price: 2890, unit: "ks", weight_info: null, image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: true, badge: null, sort_order: 1, created_at: "", updated_at: "" },
  { id: "p017", name: "Sada 4 steakovych nozu", slug: "sada-4-steakovych-nozu", description: "Elegantni sada ctyr steakovych nozu v darkovem baleni. Kvalitni ocel, ergonomicka rukojest z duboveho dreva.", short_description: "Darkova sada, dubova rukojest", category_id: "a1000000-0000-0000-0000-000000000005", price: 4500, unit: "ks", weight_info: null, image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  { id: "p018", name: "Dubove prkenko velke", slug: "dubove-prkenko-velke", description: "Masivni dubove prkenko s drazkou na stavu. Rucne vyrabene v Ceske republice. Rozmer 45x30 cm.", short_description: "Rucne vyrobene, 45x30 cm", category_id: "a1000000-0000-0000-0000-000000000005", price: 1290, unit: "ks", weight_info: null, image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 3, created_at: "", updated_at: "" },
  // Doplnky
  { id: "p019", name: "Steakove maslo s rozmarynem", slug: "steakove-maslo-s-rozmarynem", description: "Domaci slazene maslo s cerstvym rozmarynem a morskou soli.", short_description: "Domaci, s rozmarynem a soli", category_id: "a1000000-0000-0000-0000-000000000006", price: 120, unit: "ks", weight_info: "100 g", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 1, created_at: "", updated_at: "" },
  { id: "p020", name: "Extra panensky olivovy olej", slug: "extra-panensky-olivovy-olej", description: "Italsky extra panensky olivovy olej z Toskanska.", short_description: "Toskansky, cold-pressed", category_id: "a1000000-0000-0000-0000-000000000006", price: 380, unit: "ks", weight_info: "500 ml", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 2, created_at: "", updated_at: "" },
  { id: "p021", name: "Cerstvý rozmaryn svazek", slug: "cerstvý-rozmaryn-svazek", description: "Cerstvý rozmaryn pro aromaticke grilovani.", short_description: "Cerství, na grilovani", category_id: "a1000000-0000-0000-0000-000000000006", price: 45, unit: "ks", weight_info: "1 svazek", image_url: null, gallery: [], stock_status: "in_stock", is_active: true, is_featured: false, badge: null, sort_order: 3, created_at: "", updated_at: "" },
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
