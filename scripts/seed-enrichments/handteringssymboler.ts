/**
 * Sanity enrichment for handteringssymboler.
 * Generated from the Astro article source so content stays identical.
 */
import {handteringssymboler} from "../../src/data/articles/handteringssymboler";
import {articleBlocksToSanity} from "./from-article";
import type {Block} from "./_blocks";

export const handteringssymbolerMeta = {
  title: handteringssymboler.title,
  intro: handteringssymboler.intro,
  seoTitle: handteringssymboler.seoTitle,
  seoDescription: handteringssymboler.seoDescription,
  category: handteringssymboler.category,
};

export function handteringssymbolerEnrichment(): Block[] {
  return articleBlocksToSanity(handteringssymboler.body);
}
