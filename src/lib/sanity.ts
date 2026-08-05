import {createClient} from "@sanity/client";
import {createImageUrlBuilder, type SanityImageSource} from "@sanity/image-url";

export const sanityProjectId = "r781ar4i";
export const sanityDataset = "production";

const sanityToken =
  process.env.SANITY_API_READ_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_API_WRITE_TOKEN ||
  undefined;

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2025-01-01",
  // Avoid stale CDN reads during webhook-triggered builds right after publish.
  useCdn: false,
  // Private datasets require a server-side token for document reads.
  ...(sanityToken ? {token: sanityToken} : {}),
});

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
