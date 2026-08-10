/**
 * Sanity enrichment for var-historie (Om oss).
 * Generated from the article source so content stays identical to Astro.
 */
import {varHistorie} from "../../src/data/articles/var-historie";
import {articleBlocksToSanity} from "./from-article";
import type {Block} from "./_blocks";

export const varHistorieMeta = {
  title: varHistorie.title,
  intro: varHistorie.intro,
  seoTitle: varHistorie.seoTitle,
  seoDescription: varHistorie.seoDescription,
  category: varHistorie.category,
  hero: varHistorie.image!,
};

export function varHistorieEnrichment(): Block[] {
  return articleBlocksToSanity(varHistorie.body);
}
