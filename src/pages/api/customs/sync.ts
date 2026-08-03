export const prerender = false;

import { del } from "@vercel/blob";
import {
  deleteCustomsOlderThan,
  upsertCustomsDeclaration,
} from "../../../lib/customs/db";
import type { CustomsSyncItem } from "../../../lib/customs/types";

function unauthorized(): Response {
  return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

function requireSyncAuth(request: Request): boolean {
  const key = process.env.CUSTOMS_SYNC_API_KEY;
  if (!key) return false;
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return token === key;
}

export async function POST({ request }: { request: Request }) {
  if (!requireSyncAuth(request)) return unauthorized();

  let body: {
    items?: CustomsSyncItem[];
    purgeDays?: number;
  };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const items = Array.isArray(body.items) ? body.items : [];
  let upserted = 0;
  for (const item of items) {
    if (!item?.expeditionNo || !item?.serialNo || !item?.pinHash || !item?.blobPathname) {
      continue;
    }
    await upsertCustomsDeclaration(item);
    upserted += 1;
  }

  const purgeDays = Number(body.purgeDays ?? 90);
  let purgedPathnames: string[] = [];
  if (purgeDays > 0) {
    purgedPathnames = await deleteCustomsOlderThan(purgeDays);
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (token && purgedPathnames.length) {
      await Promise.allSettled(
        purgedPathnames.map((pathname) => del(pathname, { token })),
      );
    }
  }

  return new Response(
    JSON.stringify({
      ok: true,
      upserted,
      purged: purgedPathnames.length,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}
