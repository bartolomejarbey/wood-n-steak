#!/usr/bin/env node
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE || "http://localhost:3100";
const OUT = process.argv[2] || "screenshots/after";
const ROUTES_FILE = process.argv[3];

const DEFAULT_ROUTES = [
  "/",
  "/sortiment",
  "/produkt/rib-eye-black-angus",
  "/kosik",
  "/pokladna",
  "/ucet",
  "/jak-nakupovat",
  "/o-restauraci",
  "/kontakt",
  "/admin",
  "/admin/produkty",
  "/admin/kategorie",
  "/admin/objednavky",
  "/admin/zakaznici",
  "/admin/newsletter",
  "/admin/nastaveni",
];

const routes = ROUTES_FILE
  ? fs.readFileSync(ROUTES_FILE, "utf8").split("\n").map(s => s.trim()).filter(Boolean)
  : DEFAULT_ROUTES;

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const mobile = await browser.newContext({
  viewport: { width: 375, height: 812 },
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});

for (const route of routes) {
  const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
  for (const [label, ctx] of [["desktop", desktop], ["mobile", mobile]]) {
    const file = path.join(OUT, `${slug}-${label}.png`);
    try {
      const page = await ctx.newPage();
      await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 20000 });
      await page.waitForTimeout(800);
      await page.screenshot({ path: file, fullPage: false });
      await page.close();
      console.log(`OK  ${label.padEnd(7)} ${route} -> ${file}`);
    } catch (err) {
      console.log(`ERR ${label.padEnd(7)} ${route} -> ${err.message.split("\n")[0]}`);
    }
  }
}

await browser.close();
console.log("DONE");
