/**
 * Flatten nested Portable Text inside callout.text to plain strings.
 *
 * Nested PTE in callouts made Sanity Studio remount object dialogs on each
 * keystroke (focus loss in caption / timeline title fields).
 *
 * Usage:
 *   $env:SANITY_API_WRITE_TOKEN="..."
 *   npx tsx scripts/migrate-callout-text.ts
 */
import {createClient} from "@sanity/client";

const PROJECT_ID = process.env.PUBLIC_SANITY_PROJECT_ID || "r781ar4i";
const DATASET = process.env.PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

type Span = {_type?: string; text?: string};
type Block = {_type?: string; children?: Span[]};

function portableToPlain(value: unknown): string | null {
  if (typeof value === "string") return null; // already migrated
  if (!Array.isArray(value)) return null;
  const parts: string[] = [];
  for (const block of value as Block[]) {
    if (!block || block._type !== "block") continue;
    const text = (block.children ?? [])
      .map((child) => (typeof child?.text === "string" ? child.text : ""))
      .join("");
    if (text.trim()) parts.push(text.trim());
  }
  return parts.length ? parts.join("\n\n") : "";
}

async function main() {
  if (!TOKEN) {
    console.error("Missing SANITY_API_WRITE_TOKEN (Editor).");
    process.exit(1);
  }

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2025-01-01",
    token: TOKEN,
    useCdn: false,
  });

  const docs = await client.fetch<
    Array<{_id: string; title?: string; body?: Array<{_key?: string; _type?: string; text?: unknown}>}>
  >(`*[_type=="article" && defined(body)]{_id,title,body}`);

  let patched = 0;
  for (const doc of docs) {
    const body = doc.body ?? [];
    let changed = false;
    const nextBody = body.map((block) => {
      if (block?._type !== "callout") return block;
      const plain = portableToPlain(block.text);
      if (plain === null) return block;
      changed = true;
      return {...block, text: plain};
    });
    if (!changed) continue;

    await client.patch(doc._id).set({body: nextBody}).commit({autoGenerateArrayKeys: false});
    patched += 1;
    console.log(`Patched ${doc._id} (${doc.title || "untitled"})`);
  }

  console.log(`Done. Updated ${patched} article(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
