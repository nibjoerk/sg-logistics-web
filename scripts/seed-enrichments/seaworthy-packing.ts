/**
 * Sanity enrichment for seaworthy-packing.
 * Generated from the article source so content stays identical to Astro.
 */
import {seaworthyPacking} from "../../src/data/articles/seaworthy-packing";
import {articleBlocksToSanity} from "./from-article";
import type {Block} from "./_blocks";

export const seaworthyPackingMeta = {
  title: seaworthyPacking.title,
  intro: seaworthyPacking.intro,
  seoTitle: seaworthyPacking.seoTitle,
  seoDescription: seaworthyPacking.seoDescription,
  category: seaworthyPacking.category,
};

export function seaworthyPackingEnrichment(): Block[] {
  return articleBlocksToSanity(seaworthyPacking.body);
}
