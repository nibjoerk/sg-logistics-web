/**
 * Sanity enrichment for farlig-gods-sjofrakt.
 * Generated from the Astro article source so content stays identical.
 */
import {farligGodsSjo} from "../../src/data/articles/farlig-gods-sjofrakt";
import {articleBlocksToSanity} from "./from-article";
import type {Block} from "./_blocks";

export const farligGodsSjoMeta = {
  title: farligGodsSjo.title,
  intro: farligGodsSjo.intro,
  seoTitle: farligGodsSjo.seoTitle,
  seoDescription: farligGodsSjo.seoDescription,
  category: farligGodsSjo.category,
  hero: farligGodsSjo.image
    ? {src: farligGodsSjo.image.src, alt: farligGodsSjo.image.alt}
    : {
        src: "/images/articles/farlig-gods-sjo-imdg-container.png",
        alt: "Illustrasjon av farlig gods i container for sjøfrakt",
      },
};

export function farligGodsSjoEnrichment(): Block[] {
  return articleBlocksToSanity(farligGodsSjo.body);
}
