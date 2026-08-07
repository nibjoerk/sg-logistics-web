import type {Article} from "./articleTypes";

/**
 * Merge local Astro article stubs with Sanity docs.
 *
 * - Same slug: Sanity wins (canonical migrations).
 * - Extra Sanity docs (including temporary `s-*` mirrors) are included so both
 *   Astro originals and Sanity copies can be reviewed on the site during migration.
 */
export function mergeLocalAndSanityArticles(
  localArticles: Article[],
  sanityArticles: Article[],
): Article[] {
  const sanityBySlug = new Map(sanityArticles.map((article) => [article.slug, article]));
  const localSlugs = new Set(localArticles.map((article) => article.slug));

  const mergedLocal = localArticles.map((local) => sanityBySlug.get(local.slug) ?? local);

  const extras = sanityArticles.filter((article) => !localSlugs.has(article.slug));

  return [...mergedLocal, ...extras];
}
