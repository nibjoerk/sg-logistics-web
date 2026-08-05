import {createClient} from "@sanity/client";
import {createImageUrlBuilder, type SanityImageSource} from "@sanity/image-url";

export const sanityProjectId = "r781ar4i";
export const sanityDataset = "production";

function readEnv(name: string): string | undefined {
  // Astro/Vite may expose vars via import.meta.env; Vercel build/runtime uses process.env.
  const fromProcess =
    typeof process !== "undefined" ? process.env?.[name]?.trim() : undefined;
  const fromImportMeta = (import.meta as ImportMeta & {env?: Record<string, string | undefined>})
    .env?.[name]
    ?.trim();
  return fromProcess || fromImportMeta || undefined;
}

const sanityToken =
  readEnv("SANITY_API_READ_TOKEN") ||
  readEnv("SANITY_API_TOKEN") ||
  readEnv("SANITY_API_WRITE_TOKEN") ||
  undefined;

if (!sanityToken && (readEnv("VERCEL") === "1" || readEnv("CI") === "true")) {
  console.warn(
    "[sanity] SANITY_API_READ_TOKEN mangler. Datasetet er privat — CMS-artikler blir ikke hentet under build. " +
      "Sett tokenet i Vercel (Production + Preview) og redeploy.",
  );
}

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

export function hasSanityReadToken() {
  return Boolean(sanityToken);
}
