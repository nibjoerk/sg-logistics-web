import type {Article} from "./articleTypes";
import {handteringssymbolerMirror} from "./articles/handteringssymboler";
import {seaworthyPackingMirror} from "./articles/seaworthy-packing";
import {isSanityMirrorSlug} from "./astroOnlyArticles";
import {
  isSanityCanonicalSlug,
  isSanityMirrorSlug,
  toMirrorSlug,
  withHashTitle,
} from "./astroOnlyArticles";

/** Local full-content overlays for thin Sanity s-* stubs during migration. */
const MIRROR_OVERLAYS: Record<string, Article> = {
  "s-handteringssymboler": handteringssymbolerMirror,
  "s-seaworthy-packing": seaworthyPackingMirror,
};

function asMigrationMirror(article: Article): Article {
  const mirrorSlug = toMirrorSlug(article.slug);
  return {
    ...article,
    title: withHashTitle(article.title),
    slug: mirrorSlug,
    href: `/kjekt-a-vite/${mirrorSlug}`,
    seoTitle: withHashTitle(article.seoTitle),
  };
}

function applyMirrorOverlay(article: Article, localBySlug: Map<string, Article>): Article {
  const mirrored = isSanityMirrorSlug(article.slug) ? article : asMigrationMirror(article);
  const overlay = MIRROR_OVERLAYS[mirrored.slug];
  const baseSlug = isSanityMirrorSlug(mirrored.slug) ? mirrored.slug.slice(2) : mirrored.slug;
  const local = localBySlug.get(baseSlug);

  const withOverlay = overlay
    ? {
        ...overlay,
        title: mirrored.title?.startsWith("#") ? mirrored.title : overlay.title,
        image: mirrored.image ?? overlay.image,
      }
    : mirrored;

  if (local?.category && withOverlay.category !== local.category) {
    return {...withOverlay, category: local.category};
  }

  return withOverlay;
}

/**
 * Merge local Astro article stubs with Sanity docs.
 *
 * During migration:
 * - Local/Astro keeps the bare slug (unless the slug is in SANITY_CANONICAL_SLUGS).
 * - Sanity copies that share a local slug are shown as s-* mirrors with "# " titles.
 * - Other Sanity docs (already s-*) are included as extras.
 */
export function mergeLocalAndSanityArticles(
  localArticles: Article[],
  sanityArticles: Article[],
): Article[] {
  const sanityBySlug = new Map(sanityArticles.map((article) => [article.slug, article]));
  const localBySlug = new Map(localArticles.map((article) => [article.slug, article]));
  const localSlugs = new Set(localArticles.map((article) => article.slug));
  const extrasBySlug = new Map<string, Article>();

  const mergedLocal = localArticles.map((local) => {
    const sanity = sanityBySlug.get(local.slug);
    if (sanity && isSanityCanonicalSlug(local.slug)) return sanity;
    return local;
  });

  for (const article of sanityArticles) {
    if (localSlugs.has(article.slug)) {
      // Same slug as a local article: only overwrite when canonical; otherwise
      // expose Sanity as an s-* review mirror so Astro stays on the bare URL.
      if (isSanityCanonicalSlug(article.slug)) continue;
      const mirror = applyMirrorOverlay(article, localBySlug);
      extrasBySlug.set(mirror.slug, mirror);
      continue;
    }

    if (isSanityMirrorSlug(article.slug) && localSlugs.has(article.slug.slice(2))) {
      const mirror = applyMirrorOverlay(article, localBySlug);
      extrasBySlug.set(mirror.slug, mirror);
      continue;
    }

    if (!localSlugs.has(article.slug)) {
      const mirror = applyMirrorOverlay(article, localBySlug);
      extrasBySlug.set(mirror.slug, mirror);
    }
  }

  // Ensure important mirrors appear even if Sanity is empty / unreachable.
  for (const [slug, overlay] of Object.entries(MIRROR_OVERLAYS)) {
    if (!extrasBySlug.has(slug) && !localSlugs.has(slug)) {
      extrasBySlug.set(slug, overlay);
    }
  }

  return [...mergedLocal, ...extrasBySlug.values()];
}

export function isOverlayMirrorSlug(slug: string): boolean {
  return Boolean(MIRROR_OVERLAYS[slug]) || isSanityMirrorSlug(slug);
}
