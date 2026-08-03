/**
 * Local Timpex → Vercel Blob + customs sync API
 *
 * Usage (from scripts/customs-sync):
 *   npm install
 *   copy .env.example .env   # fill in values
 *   npm run dry-run
 *   npm run sync
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHmac } from "node:crypto";
import sql from "mssql";
import { put } from "@vercel/blob";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const RETENTION_DAYS = Number(process.env.CUSTOMS_RETENTION_DAYS ?? 90);
const DRY_RUN = process.argv.includes("--dry-run");
const BATCH_SIZE = Number(process.env.CUSTOMS_SYNC_BATCH ?? 25);

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function normalizeOrgNo(orgNo) {
  return String(orgNo ?? "").replace(/\D/g, "");
}

function normalizeTotalValue(value) {
  const n = Number(String(value).replace(/\s+/g, "").replace(",", "."));
  if (!Number.isFinite(n)) return "";
  return String(Math.round(n));
}

function hashCustomsPin(orgNo, totalValue, pepper) {
  const payload = `${normalizeOrgNo(orgNo)}|${normalizeTotalValue(totalValue)}`;
  const [org, val] = payload.split("|");
  if (!org || !val) throw new Error(`Invalid PIN inputs for ${orgNo}/${totalValue}`);
  return createHmac("sha256", pepper).update(payload).digest("hex");
}

function yyyymmddDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return Number(`${y}${m}${day}`);
}

function toIsoDate(value) {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  const s = String(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  return null;
}

function isSadPdf(filePath) {
  const base = path.basename(filePath).toLowerCase();
  return base.startsWith("0000") && base.endsWith("sad.pdf");
}

async function fetchRows(fromYmd) {
  const pool = await sql.connect({
    server: requireEnv("TIMPEX_SQL_SERVER"),
    database: process.env.TIMPEX_SQL_DATABASE ?? "TIMPEX_SGL",
    user: requireEnv("TIMPEX_SQL_USER"),
    password: requireEnv("TIMPEX_SQL_PASSWORD"),
    options: {
      encrypt: process.env.TIMPEX_SQL_ENCRYPT === "1",
      trustServerCertificate: true,
    },
    connectionTimeout: 30_000,
    requestTimeout: 180_000,
  });

  const result = await pool.request().input("fromDate", sql.Int, fromYmd).query(`
    SELECT
      CASE
        WHEN HD.U_SADDATO NOT IN (0, 99999999)
        THEN CONVERT(date, CONVERT(char(8), HD.U_SADDATO), 112)
        ELSE NULL
      END AS Dato,
      HD.U_OPPDRAG AS Oppdragsnr,
      HD.U_S28FSK AS OrgNr,
      HD.U_TVSEKV AS Sekvensnummer,
      HD.U_TOTVERDI AS U_TOTVERDI,
      HD.U_OPPDTYP AS ImportEksport,
      DOK.U_FILNAVN AS Deklarasjon,
      SUBSTRING(TVN.U_FEIL, 5, 6) AS Ekspedisjonsnummer,
      RIGHT(TVN.U_FEIL, 10) AS Lopenummer
    FROM TIMPEX_SGL.dbo.U_SAD AS HD
    JOIN TIMPEX_SGL.dbo.U_TVINNSAD AS TVN
      ON TVN.U_OPPDRAG = HD.U_OPPDRAG
     AND TVN.U_SEKVENS = HD.U_TVSEKV
     AND LEFT(TVN.U_FEIL, 2) = 'TK'
    CROSS APPLY (
      SELECT TOP (1) S.U_FILNAVN
      FROM TIMPEX_SGL.dbo.U_SCANFRB AS S
      WHERE S.U_OPPDRAG = HD.U_OPPDRAG
        AND S.U_DOKTYPE = 'SA'
      ORDER BY S.U_FILNAVN
    ) AS DOK
    WHERE HD.U_SADDATO >= @fromDate
      AND LOWER(DOK.U_FILNAVN) LIKE '%.pdf'
      AND LOWER(DOK.U_FILNAVN) LIKE '%sad.pdf'
    ORDER BY HD.U_SADDATO DESC, HD.U_OPPDRAG DESC
  `);

  await pool.close();
  return result.recordset;
}

async function postSyncBatch(items, purgeDays) {
  const base = requireEnv("CUSTOMS_SYNC_URL").replace(/\/$/, "");
  const key = requireEnv("CUSTOMS_SYNC_API_KEY");
  const res = await fetch(`${base}/api/customs/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ items, purgeDays }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Sync API ${res.status}: ${text}`);
  return JSON.parse(text);
}

async function main() {
  const fromYmd = yyyymmddDaysAgo(RETENTION_DAYS);
  console.log(`Customs sync starting. Retention ${RETENTION_DAYS}d, from ${fromYmd}, dryRun=${DRY_RUN}`);

  const rows = await fetchRows(fromYmd);
  console.log(`SQL returned ${rows.length} rows`);

  const pepper = requireEnv("CUSTOMS_PIN_PEPPER");
  const blobToken = DRY_RUN ? process.env.BLOB_READ_WRITE_TOKEN : requireEnv("BLOB_READ_WRITE_TOKEN");

  const prepared = [];
  let skippedMissing = 0;
  let skippedFilter = 0;

  for (const row of rows) {
    const filePath = String(row.Deklarasjon ?? "").trim();
    if (!isSadPdf(filePath)) {
      skippedFilter += 1;
      continue;
    }
    if (!fs.existsSync(filePath)) {
      skippedMissing += 1;
      continue;
    }
    const expeditionNo = String(row.Ekspedisjonsnummer).replace(/\D/g, "").padStart(6, "0").slice(-6);
    const serialNo = String(row.Lopenummer).replace(/\D/g, "").padStart(10, "0").slice(-10);
    const pinHash = hashCustomsPin(row.OrgNr, row.U_TOTVERDI, pepper);
    const blobPathname = `customs/${expeditionNo}-${serialNo}.pdf`;
    prepared.push({ row, filePath, pinHash, blobPathname, expeditionNo, serialNo });
  }

  console.log(
    `Prepared ${prepared.length} (skipped filter ${skippedFilter}, missing file ${skippedMissing})`,
  );

  if (DRY_RUN) {
    console.log("First 15:");
    for (const p of prepared.slice(0, 15)) {
      const size = fs.statSync(p.filePath).size;
      console.log(
        `  ${p.blobPathname}  ${toIsoDate(p.row.Dato) ?? "-"}  ${p.row.ImportEksport}  ${(size / 1024).toFixed(0)} KB`,
      );
    }
    return;
  }

  if (!blobToken) throw new Error("Missing env: BLOB_READ_WRITE_TOKEN");

  const syncItems = [];
  let uploaded = 0;

  for (const p of prepared) {
    const body = fs.readFileSync(p.filePath);
    const blob = await put(p.blobPathname, body, {
      access: "private",
      token: blobToken,
      contentType: "application/pdf",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    const direction =
      p.row.ImportEksport === "E" || p.row.ImportEksport === "I" ? p.row.ImportEksport : null;

    syncItems.push({
      expeditionNo: p.expeditionNo,
      serialNo: p.serialNo,
      declarationDate: toIsoDate(p.row.Dato),
      orderNo: String(p.row.Oppdragsnr ?? ""),
      sequenceNo: String(p.row.Sekvensnummer ?? ""),
      direction,
      orgNo: normalizeOrgNo(p.row.OrgNr),
      pinHash: p.pinHash,
      blobPathname: blob.pathname,
      blobUrl: blob.url,
      sourcePath: p.filePath,
    });
    uploaded += 1;
    if (uploaded % 25 === 0) console.log(`Uploaded ${uploaded}/${prepared.length}`);
  }

  let upserted = 0;
  let purged = 0;
  for (let i = 0; i < syncItems.length; i += BATCH_SIZE) {
    const chunk = syncItems.slice(i, i + BATCH_SIZE);
    const purgeDays = i + BATCH_SIZE >= syncItems.length ? RETENTION_DAYS : 0;
    const result = await postSyncBatch(chunk, purgeDays);
    upserted += result.upserted;
    purged += result.purged;
  }

  console.log(`Done. uploaded=${uploaded} upserted=${upserted} purged=${purged}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
