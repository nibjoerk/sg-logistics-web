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
  "farlig-gods-pa-vei",
  "hvor-tung-kan-en-container-vaere-pa-vei",
  "skade-pa-gods",
] as const;

export type AstroOnlySlug = (typeof ASTRO_ONLY_SLUGS)[number];

export const ASTRO_ONLY_SLUG_SET = new Set<string>(ASTRO_ONLY_SLUGS);

/** Content pages fully migrated to Sanity (canonical URL = article slug, no s- prefix). */
export const SANITY_CANONICAL_SLUGS = [
  "farlig-gods",
  "farlig-gods-flyfrakt",
  "farlig-gods-sjofrakt",
] as const;

export const SANITY_CANONICAL_SLUG_SET = new Set<string>(SANITY_CANONICAL_SLUGS);

export function isAstroOnlySlug(slug: string): boolean {
  return ASTRO_ONLY_SLUG_SET.has(slug);
}

export function isSanityCanonicalSlug(slug: string): boolean {
  return SANITY_CANONICAL_SLUG_SET.has(slug);
}
