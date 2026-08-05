/**
 * Articles that stay as handcrafted Astro pages (interactive UI / tools).
 * Sanity mirrors are not seeded for these; listing links to the Astro originals.
 */
export const ASTRO_ONLY_SLUGS = [
  "containerguide",
  "incoterms",
  "containerhavner",
  "kapelltralle-dimensjoner-volumvekt-kalkulator",
  "handteringssymboler",
  "farlig-gods",
  "farlig-gods-pa-vei",
  "farlig-gods-flyfrakt",
  "farlig-gods-sjofrakt",
  "hvor-tung-kan-en-container-vaere-pa-vei",
  "skade-pa-gods",
] as const;

export type AstroOnlySlug = (typeof ASTRO_ONLY_SLUGS)[number];

export const ASTRO_ONLY_SLUG_SET = new Set<string>(ASTRO_ONLY_SLUGS);

export function isAstroOnlySlug(slug: string): boolean {
  return ASTRO_ONLY_SLUG_SET.has(slug);
}
