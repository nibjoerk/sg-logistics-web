import {createClient} from "@sanity/client";
import {createImageUrlBuilder, type SanityImageSource} from "@sanity/image-url";

export const sanityProjectId = "r781ar4i";
export const sanityDataset = "production";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2025-01-01",
  // Avoid stale CDN reads during webhook-triggered builds right after publish.
  useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
