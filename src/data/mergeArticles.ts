import type {Article} from "./articleTypes";
import {handteringssymbolerMirror} from "./articles/handteringssymboler";
import {seaworthyPackingMirror} from "./articles/seaworthy-packing";
import {isSanityMirrorSlug} from "./astroOnlyArticles";

/** Local full-content overlays for thin Sanity s-* stubs during migration. */
const MIRROR_OVERLAYS: Record<string, Article> = {
  "s-handteringssymboler": handteringssymbolerMirror,
  "s-seaworthy-packing": seaworthyPackingMirror,
};

function applyMirrorOverlay(article: Article, localBySlug: Map<string, Article>): Article {
  const overlay = MIRROR_OVERLAYS[article.slug];
  const baseSlug = isSanityMirrorSlug(article.slug) ? article.slug.slice(2) : article.slug;
  const local = localBySlug.get(baseSlug);

  const withOverlay = overlay
    ? {
        ...overlay,
        // Prefer live Sanity title if already prefixed, else use overlay.
        title: article.title?.startsWith("#") ? article.title : overlay.title,
        image: article.image ?? overlay.image,
      }
    : article;

  // Keep listing categories aligned with the Astro originals even if an older
  // Sanity seed mapped e.g. "Skade og avvik" → "Annet".
  if (local?.category && withOverlay.category !== local.category) {
    return {...withOverlay, category: local.category};
  }

  return withOverlay;
}

/**
 * Merge local Astro article stubs with Sanity docs.
 *
 * - Same slug: Sanity wins (canonical migrations).
 * - Extra Sanity docs (including temporary `s-*` mirrors) are included so both
 *   Astro originals and Sanity copies can be reviewed on the site during migration.
 * - Known thin mirrors (e.g. handteringssymboler) get a full local body overlay so
 *   the site matches Astro even before Sanity has been re-seeded.
 */
export function mergeLocalAndSanityArticles(
  localArticles: Article[],
  sanityArticles: Article[],
): Article[] {
  const sanityBySlug = new Map(sanityArticles.map((article) => [article.slug, article]));
  const localBySlug = new Map(localArticles.map((article) => [article.slug, article]));
  const localSlugs = new Set(localArticles.map((article) => article.slug));

  const mergedLocal = localArticles.map((local) => sanityBySlug.get(local.slug) ?? local);

  const extras = sanityArticles
    .filter((article) => !localSlugs.has(article.slug))
    .map((article) => applyMirrorOverlay(article, localBySlug));

  // Ensure important mirrors appear even if Sanity is empty / unreachable.
  for (const [slug, overlay] of Object.entries(MIRROR_OVERLAYS)) {
    if (!extras.some((article) => article.slug === slug) && !localSlugs.has(slug)) {
      extras.push(overlay);
    }
  }

  return [...mergedLocal, ...extras];
}

export function isOverlayMirrorSlug(slug: string): boolean {
  return Boolean(MIRROR_OVERLAYS[slug]) || isSanityMirrorSlug(slug);
}
