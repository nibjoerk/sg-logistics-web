/**
 * Articles that stay as handcrafted Astro pages (interactive UI / tools).
 * These have dedicated Astro routes under src/pages/kjekt-a-vite/.
 * Sanity mirrors are not seeded for these; listing links to the Astro originals.
 */
export const ASTRO_ONLY_SLUGS = [
  "containerguide",
  "containerhavner",
  "havner-i-bangkok",
  "kapelltralle-dimensjoner-volumvekt-kalkulator",
  "handteringssymboler",
  "farlig-gods-pa-vei",
  "hvor-tung-kan-en-container-vaere-pa-vei",
] as const;

export type AstroOnlySlug = (typeof ASTRO_ONLY_SLUGS)[number];

export const ASTRO_ONLY_SLUG_SET = new Set<string>(ASTRO_ONLY_SLUGS);

/** Content pages fully migrated to Sanity (canonical URL = article slug, no s- prefix). */
export const SANITY_CANONICAL_SLUGS = [
  "incoterms",
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

/**
 * Temporary seed mirrors use s-<slug> + "# " titles.
 * During migration they are shown on the site alongside Astro originals so both
 * can be compared. When a Sanity version is good enough: rename slug (drop s-),
 * remove "# " from the title, add the slug to SANITY_CANONICAL_SLUGS, and delete
 * the local Astro article stub / dedicated page.
 */
export function isSanityMirrorSlug(slug: string): boolean {
  return slug.startsWith("s-");
}
