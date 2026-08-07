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

/**
 * Content pages fully migrated to Sanity (canonical URL = article slug, no s- prefix).
 * Empty during migration review: Astro/local keeps the bare slug, Sanity copies use s-* + #.
 * Add a slug here only when the Sanity version replaces Astro permanently.
 */
export const SANITY_CANONICAL_SLUGS = [] as const;

export const SANITY_CANONICAL_SLUG_SET = new Set<string>(SANITY_CANONICAL_SLUGS);

export function isAstroOnlySlug(slug: string): boolean {
  return ASTRO_ONLY_SLUG_SET.has(slug);
}

export function isSanityCanonicalSlug(slug: string): boolean {
  return SANITY_CANONICAL_SLUG_SET.has(slug);
}

/**
 * Temporary seed docs use "# " titles (all Sanity articles during migration).
 * Non-canonical mirrors also use s-<slug>. When a Sanity version is good enough:
 * rename slug (drop s- if present), remove "# " from the title, add the slug to
 * SANITY_CANONICAL_SLUGS, and delete the local Astro article stub / dedicated page.
 */
export function isSanityMirrorSlug(slug: string): boolean {
  return slug.startsWith("s-");
}

export function withHashTitle(title: string): string {
  const trimmed = title.trim();
  return trimmed.startsWith("#") ? trimmed : `# ${trimmed}`;
}

export function toMirrorSlug(slug: string): string {
  return isSanityMirrorSlug(slug) ? slug : `s-${slug}`;
}
