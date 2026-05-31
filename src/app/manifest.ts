import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wood & Steak",
    short_name: "Wood & Steak",
    description:
      "Prémiové maso, domácí omáčky a vybavení pro přípravu dokonalého steaku. E-shop steakhouse z Vinohrad — rozvoz po Praze.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "cs",
    icons: [
      { src: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
