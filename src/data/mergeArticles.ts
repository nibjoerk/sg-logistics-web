import type {Article} from "./articleTypes";
import {ASTRO_ONLY_SLUG_SET, SANITY_CANONICAL_SLUG_SET} from "./astroOnlyArticles";

/** Prefer Sanity docs when they share a slug with local stubs (canonical migrations). */
export function mergeLocalAndSanityArticles(
  localArticles: Article[],
  sanityArticles: Article[],
): Article[] {
  const sanityBySlug = new Map(sanityArticles.map((article) => [article.slug, article]));
  const localSlugs = new Set(localArticles.map((article) => article.slug));

  const mergedLocal = localArticles.map((local) => sanityBySlug.get(local.slug) ?? local);
  const extras = sanityArticles.filter((article) => {
    if (localSlugs.has(article.slug)) return false;
    if (article.slug.startsWith("s-") && ASTRO_ONLY_SLUG_SET.has(article.slug.slice(2))) {
      return false;
    }
    // Hide legacy s-* mirrors after a page was migrated to a canonical Sanity slug.
    if (article.slug.startsWith("s-") && SANITY_CANONICAL_SLUG_SET.has(article.slug.slice(2))) {
      return false;
    }
    return true;
  });

  return [...mergedLocal, ...extras];
}
