import type {Article} from "./articleTypes";
import {isSanityMirrorSlug} from "./astroOnlyArticles";

/** Prefer Sanity docs when they share a slug with local stubs (canonical migrations). */
export function mergeLocalAndSanityArticles(
  localArticles: Article[],
  sanityArticles: Article[],
): Article[] {
  const sanityBySlug = new Map(sanityArticles.map((article) => [article.slug, article]));
  const localSlugs = new Set(localArticles.map((article) => article.slug));

  const mergedLocal = localArticles.map((local) => sanityBySlug.get(local.slug) ?? local);

  // Only add Sanity docs that are not temporary s-* mirrors and not already local.
  const extras = sanityArticles.filter((article) => {
    if (localSlugs.has(article.slug)) return false;
    if (isSanityMirrorSlug(article.slug)) return false;
    return true;
  });

  return [...mergedLocal, ...extras];
}
