import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { readFileSync } from "node:fs";

export default function (eleventyConfig) {
  // Auf GitHub Pages liegt die Vorschau unter /anwaeltinnen-berlin/, später auf der Domain unter /
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/bilder": "bilder" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  // Nur veröffentlichte Personen bekommen eine eigene Seite
  eleventyConfig.addGlobalData("people", () =>
    JSON.parse(readFileSync("src/_data/team.json", "utf8")).filter((p) => p.published)
  );

  // Hilfsfilter für Team und Rechtsgebiete
  eleventyConfig.addFilter("published", (team) => team.filter((p) => p.published));
  eleventyConfig.addFilter("area", (areas, slug) => areas.find((a) => a.slug === slug));
  eleventyConfig.addFilter("membersOf", (team, slug) =>
    team.filter((p) => p.published && (p.areas || []).includes(slug))
  );
  // Gleichmäßig verteilte Startzeitpunkte für die "atmenden" Farbpunkte (6s-Zyklus)
  eleventyConfig.addFilter("breath", (i) => ((i * 1.7) % 6).toFixed(1) + "s");

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    pathPrefix: process.env.PATH_PREFIX || "/",
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
  };
}
