import type {Article} from "../data/articleTypes";
import {articles as localArticles} from "../data/articles";
import {
  ASTRO_ONLY_SLUG_SET,
  OM_OSS_ASTRO_ONLY_SLUG_SET,
  isOmOssCategory,
} from "../data/astroOnlyArticles";
import {mergeLocalAndSanityArticles} from "../data/mergeArticles";
import {getSanityArticles} from "./sanity-articles";

/** Fresh Sanity+local merge for SSR CMS pages (no build-time snapshot). */
export async function getMergedArticles(): Promise<Article[]> {
  const sanityArticles = await getSanityArticles();
  return mergeLocalAndSanityArticles(localArticles as Article[], sanityArticles);
}

export async function getKjektArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getMergedArticles();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return null;
  if (ASTRO_ONLY_SLUG_SET.has(article.slug)) return null;
  if (isOmOssCategory(article.category)) return null;
  if (article.href !== `/kjekt-a-vite/${article.slug}`) return null;
  return article;
}

export async function getOmOssArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getMergedArticles();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return null;
  if (!isOmOssCategory(article.category)) return null;
  if (OM_OSS_ASTRO_ONLY_SLUG_SET.has(article.slug)) return null;
  if (article.href !== `/om-oss/${article.slug}`) return null;
  return article;
}

/** Listing for /kjekt-a-vite — excludes Om oss mirrors. */
export async function getKjektListingArticles(): Promise<Article[]> {
  const articles = await getMergedArticles();
  return articles.filter((article) => !isOmOssCategory(article.category));
}

/** Tell browsers/CDN not to keep a stale HTML snapshot of CMS pages. */
export function setCmsLiveCacheHeaders(headers: Headers) {
  headers.set("Cache-Control", "public, max-age=0, s-maxage=0, must-revalidate");
  headers.set("CDN-Cache-Control", "no-store");
  headers.set("Vercel-CDN-Cache-Control", "no-store");
}
