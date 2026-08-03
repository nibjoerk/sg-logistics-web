import { neon } from "@neondatabase/serverless";
import type { CustomsSyncItem } from "./types";

export function getCustomsSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing");
  return neon(url);
}

export async function upsertCustomsDeclaration(item: CustomsSyncItem) {
  const sql = getCustomsSql();
  await sql`
    INSERT INTO customs_declarations (
      expedition_no, serial_no, declaration_date, order_no, sequence_no,
      direction, org_no, pin_hash, blob_pathname, blob_url, source_path, synced_at
    ) VALUES (
      ${item.expeditionNo},
      ${item.serialNo},
      ${item.declarationDate},
      ${item.orderNo},
      ${item.sequenceNo},
      ${item.direction},
      ${item.orgNo},
      ${item.pinHash},
      ${item.blobPathname},
      ${item.blobUrl ?? null},
      ${item.sourcePath ?? null},
      NOW()
    )
    ON CONFLICT (expedition_no, serial_no) DO UPDATE SET
      declaration_date = EXCLUDED.declaration_date,
      order_no = EXCLUDED.order_no,
      sequence_no = EXCLUDED.sequence_no,
      direction = EXCLUDED.direction,
      org_no = EXCLUDED.org_no,
      pin_hash = EXCLUDED.pin_hash,
      blob_pathname = EXCLUDED.blob_pathname,
      blob_url = EXCLUDED.blob_url,
      source_path = EXCLUDED.source_path,
      synced_at = NOW()
  `;
}

export async function deleteCustomsOlderThan(days: number): Promise<string[]> {
  const sql = getCustomsSql();
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - days);
  const cutoffDate = cutoff.toISOString().slice(0, 10);
  const rows = await sql`
    DELETE FROM customs_declarations
    WHERE declaration_date IS NOT NULL
      AND declaration_date < ${cutoffDate}::date
    RETURNING blob_url, blob_pathname
  `;
  return rows
    .map((r) => String(r.blob_url || r.blob_pathname || ""))
    .filter(Boolean);
}

export async function findCustomsDeclaration(expeditionNo: string, serialNo: string) {
  const sql = getCustomsSql();
  const rows = await sql`
    SELECT *
    FROM customs_declarations
    WHERE expedition_no = ${expeditionNo}
      AND serial_no = ${serialNo}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function recordLookupAttempt(input: {
  expeditionNo: string;
  serialNo: string;
  ipHash: string | null;
  success: boolean;
}) {
  const sql = getCustomsSql();
  await sql`
    INSERT INTO customs_lookup_attempts (expedition_no, serial_no, ip_hash, success)
    VALUES (${input.expeditionNo}, ${input.serialNo}, ${input.ipHash}, ${input.success})
  `;
}

export async function countRecentFailures(input: {
  expeditionNo: string;
  serialNo: string;
  ipHash: string | null;
  windowMinutes: number;
}): Promise<{ byKey: number; byIp: number }> {
  const sql = getCustomsSql();
  const since = new Date(Date.now() - input.windowMinutes * 60_000).toISOString();
  const keyRows = await sql`
    SELECT COUNT(*)::int AS c
    FROM customs_lookup_attempts
    WHERE expedition_no = ${input.expeditionNo}
      AND serial_no = ${input.serialNo}
      AND success = FALSE
      AND created_at > ${since}::timestamptz
  `;
  let byIp = 0;
  if (input.ipHash) {
    const ipRows = await sql`
      SELECT COUNT(*)::int AS c
      FROM customs_lookup_attempts
      WHERE ip_hash = ${input.ipHash}
        AND success = FALSE
        AND created_at > ${since}::timestamptz
    `;
    byIp = Number(ipRows[0]?.c ?? 0);
  }
  return { byKey: Number(keyRows[0]?.c ?? 0), byIp };
}
