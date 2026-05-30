// One-off generator for Wood & Steak accessory product photos.
// Uses OpenAI gpt-image-1. Run with the key in the environment, never commit it:
//   OPENAI_API_KEY=sk-... node scripts/generate-product-images.mjs [slug ...]
//
// Saves 1024x1024 JPEGs to public/images/products/<slug>.jpg.
// Prompts are tuned to the Wood & Steak palette: premium black + charcoal slate,
// warm golden rim light, NO rustic brown / forest tones, no text, no people.

import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Missing OPENAI_API_KEY in environment.");
  process.exit(1);
}

const OUT_DIR = join(process.cwd(), "public", "images", "products");

const PRODUCTS = [
  {
    slug: "steakove-noze-set-4ks",
    prompt:
      "Premium e-commerce product photograph of a matching set of exactly four identical steak knives, " +
      "arranged in a neat fanned-out diagonal row. Each knife has a sleek matte-black handle with three small " +
      "brass-toned rivets and a polished mirror-finish stainless-steel blade with a fine micro-serrated edge. " +
      "The knives rest on a dark charcoal slate surface against a near-black background. Dramatic soft side " +
      "lighting with a warm golden rim highlight running along the blades, deep shadows, luxurious and moody. " +
      "Slight top-down three-quarter angle, razor-sharp focus, high detail. No text, no logos, no hands, no people. " +
      "Square composition.",
  },
  {
    slug: "bbq-grilovaci-set-pro",
    prompt:
      "Premium e-commerce product photograph of a professional barbecue grilling tool set laid out in a neat " +
      "parallel row: a wide slotted stainless-steel grill spatula, a pair of long locking grill tongs, and a " +
      "two-pronged stainless meat fork. All three tools have matte-black handles and polished stainless-steel heads. " +
      "Arranged on a dark charcoal slate surface against a near-black background. Moody dramatic studio lighting with " +
      "a subtle warm golden rim light on the steel, deep shadows, luxurious premium feel. Slight top-down angle, " +
      "sharp focus, high detail. No text, no logos, no hands, no people. Square composition.",
  },
  {
    slug: "sefkucharsky-nuz-20cm",
    prompt:
      "Premium e-commerce product photograph of a single large chef's knife lying diagonally across the frame. " +
      "The wide blade is forged stainless steel with a rippling Damascus watered-steel pattern, and the ergonomic " +
      "handle is matte black with two brass pins. It rests on a dark charcoal slate surface against a near-black " +
      "background. Dramatic side lighting with a warm golden highlight tracing the spine of the blade, deep shadows, " +
      "moody luxurious atmosphere. Macro sharp focus on the blade pattern, high detail. No text, no logos, no hands, " +
      "no people. Square composition.",
  },
  {
    slug: "kozena-klicenka-logo",
    prompt:
      "Premium e-commerce product photograph of a luxury keychain: a black full-grain leather fob with neat edge " +
      "stitching attached to a polished brass key ring, plus a round polished brass medallion embossed in relief with " +
      "a minimalist bull's-head emblem. The keychain rests on a dark charcoal slate surface against a near-black " +
      "background. Soft dramatic lighting with warm golden reflections on the brass, deep shadows, elegant and premium. " +
      "Close-up, sharp focus, high detail. No readable words, no text, no hands, no people. Square composition.",
  },
  {
    slug: "litinova-grilovaci-panev",
    prompt:
      "Premium e-commerce product photograph, top-down view, of a single round black cast-iron grill skillet, empty " +
      "and clean, with raised parallel ridge grill lines across the cooking surface and one sturdy cast handle. " +
      "Centered on a dark charcoal slate surface against a near-black background. Dramatic studio lighting with a " +
      "subtle warm golden rim light along the pan's edge, deep shadows, matte black cast-iron texture, premium feel. " +
      "Sharp focus, high detail. No text, no logos, no food, no hands, no people. Square composition.",
  },
];

async function generate(prompt) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "high",
      output_format: "jpeg",
      output_compression: 92,
    }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.error?.message || `HTTP ${res.status}`);
  }
  return json.data[0].b64_json;
}

async function withRetry(slug, prompt, attempts = 2) {
  for (let i = 1; i <= attempts; i++) {
    try {
      console.log(`[${slug}] generating (attempt ${i})...`);
      const b64 = await generate(prompt);
      const file = join(OUT_DIR, `${slug}.jpg`);
      await writeFile(file, Buffer.from(b64, "base64"));
      console.log(`[${slug}] saved -> ${file} (${Math.round(b64.length * 0.75 / 1024)} KB)`);
      return { slug, ok: true };
    } catch (e) {
      console.error(`[${slug}] attempt ${i} failed: ${e.message}`);
      if (i === attempts) return { slug, ok: false, error: e.message };
    }
  }
}

const onlySlugs = process.argv.slice(2);
const targets = onlySlugs.length
  ? PRODUCTS.filter((p) => onlySlugs.includes(p.slug))
  : PRODUCTS;

await mkdir(OUT_DIR, { recursive: true });
console.log(`Generating ${targets.length} image(s) -> ${OUT_DIR}\n`);

const results = await Promise.allSettled(targets.map((p) => withRetry(p.slug, p.prompt)));

console.log("\n=== Summary ===");
for (const r of results) {
  const v = r.status === "fulfilled" ? r.value : { ok: false, error: r.reason?.message };
  console.log(`${v.ok ? "OK  " : "FAIL"}  ${v.slug ?? "?"}${v.error ? "  — " + v.error : ""}`);
}
const failed = results.filter((r) => r.status !== "fulfilled" || !r.value.ok).length;
process.exit(failed ? 1 : 0);
