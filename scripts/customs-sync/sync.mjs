/**
 * Local Timpex → Cloudflare R2 + customs sync API
 *
 * Usage (from scripts/customs-sync):
 *   npm install
 *   copy .env.example .env   # fill in values
 *   npm run dry-run
 *   npm run sync             # incremental (new/changed only)
 *   npm run sync:seed        # build local state from existing R2 (no upload)
 *   npm run sync:full        # force re-upload everything
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHmac } from "node:crypto";
import sql from "mssql";
import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const RETENTION_DAYS = Number(process.env.CUSTOMS_RETENTION_DAYS ?? 90);
const DRY_RUN = process.argv.includes("--dry-run");
const FORCE_FULL = process.argv.includes("--full");
const SEED_STATE = process.argv.includes("--seed-state");
const BATCH_SIZE = Number(process.env.CUSTOMS_SYNC_BATCH ?? 25);
const STATE_PATH = path.join(__dirname, "sync-state.json");

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

function loadState() {
  try {
    if (!fs.existsSync(STATE_PATH)) return {};
    const raw = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
    return raw && typeof raw === "object" ? raw : {};
  } catch {
    return {};
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}

function getR2Client() {
  const accountId = requireEnv("R2_ACCOUNT_ID");
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    },
  });
}

function getR2Bucket() {
  return requireEnv("R2_BUCKET_NAME");
}

async function r2Put(client, key, body) {
  const bucket = getR2Bucket();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: "application/pdf",
    }),
  );
  return { pathname: key, url: `r2://${bucket}/${key}` };
}

async function r2Head(client, key) {
  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: getR2Bucket(),
        Key: key,
      }),
    );
    return { pathname: key, url: `r2://${getR2Bucket()}/${key}` };
  } catch (err) {
    const status = err?.$metadata?.httpStatusCode;
    if (status === 404 || err?.name === "NotFound" || err?.Code === "NotFound") {
      return null;
    }
    throw err;
  }
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
  console.log(
    `Customs sync starting (R2). Retention ${RETENTION_DAYS}d, from ${fromYmd}, dryRun=${DRY_RUN}, full=${FORCE_FULL}, seed=${SEED_STATE}`,
  );

  const rows = await fetchRows(fromYmd);
  console.log(`SQL returned ${rows.length} rows`);

  const pepper = requireEnv("CUSTOMS_PIN_PEPPER");
  const prevState = FORCE_FULL ? {} : loadState();
  const nextState = {};
  const r2Client = DRY_RUN && !SEED_STATE ? null : getR2Client();

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
    const expeditionNo = String(row.Ekspedisjonsnummer)
      .replace(/\D/g, "")
      .padStart(6, "0")
      .slice(-6);
    const serialNo = String(row.Lopenummer)
      .replace(/\D/g, "")
      .padStart(10, "0")
      .slice(-10);
    const pinHash = hashCustomsPin(row.OrgNr, row.U_TOTVERDI, pepper);
    const blobPathname = `customs/${expeditionNo}-${serialNo}.pdf`;
    const stat = fs.statSync(filePath);
    prepared.push({
      row,
      filePath,
      pinHash,
      blobPathname,
      expeditionNo,
      serialNo,
      size: stat.size,
      mtimeMs: Math.trunc(stat.mtimeMs),
    });
  }

  console.log(
    `Prepared ${prepared.length} (skipped filter ${skippedFilter}, missing file ${skippedMissing})`,
  );

  if (DRY_RUN) {
    let wouldUpload = 0;
    let wouldSkip = 0;
    let wouldMeta = 0;
    for (const p of prepared) {
      const prev = prevState[p.blobPathname];
      const fileSame =
        prev &&
        prev.size === p.size &&
        prev.mtimeMs === p.mtimeMs &&
        prev.blobPathname &&
        prev.blobUrl;
      if (!FORCE_FULL && fileSame && prev.pinHash === p.pinHash) wouldSkip += 1;
      else if (!FORCE_FULL && fileSame) wouldMeta += 1;
      else wouldUpload += 1;
    }
    console.log(
      `Dry-run plan: upload=${wouldUpload} metadata-only=${wouldMeta} skip=${wouldSkip}`,
    );
    console.log("First 15:");
    for (const p of prepared.slice(0, 15)) {
      console.log(
        `  ${p.blobPathname}  ${toIsoDate(p.row.Dato) ?? "-"}  ${p.row.ImportEksport}  ${(p.size / 1024).toFixed(0)} KB`,
      );
    }
    return;
  }

  if (SEED_STATE) {
    let found = 0;
    let missing = 0;
    for (const p of prepared) {
      const meta = await r2Head(r2Client, p.blobPathname);
      if (meta) {
        nextState[p.blobPathname] = {
          size: p.size,
          mtimeMs: p.mtimeMs,
          pinHash: p.pinHash,
          blobPathname: meta.pathname,
          blobUrl: meta.url,
          sourcePath: p.filePath,
          storage: "r2",
        };
        found += 1;
      } else {
        missing += 1;
      }
      if ((found + missing) % 100 === 0) {
        console.log(`Seed progress: found=${found} missing=${missing}`);
      }
    }
    saveState(nextState);
    console.log(`Seed done. found=${found} missing=${missing} → ${STATE_PATH}`);
    console.log("Next: npm run sync  (uploads only missing/changed)");
    return;
  }

  const syncItems = [];
  let uploaded = 0;
  let skippedUnchanged = 0;
  let metadataOnly = 0;

  for (const p of prepared) {
    const prev = prevState[p.blobPathname];
    const fileSame =
      !FORCE_FULL &&
      prev &&
      prev.storage === "r2" &&
      prev.size === p.size &&
      prev.mtimeMs === p.mtimeMs &&
      prev.blobPathname &&
      prev.blobUrl;

    const direction =
      p.row.ImportEksport === "E" || p.row.ImportEksport === "I"
        ? p.row.ImportEksport
        : null;

    let blobPathname = p.blobPathname;
    let blobUrl = null;

    if (fileSame && prev.pinHash === p.pinHash) {
      skippedUnchanged += 1;
      nextState[p.blobPathname] = {
        size: p.size,
        mtimeMs: p.mtimeMs,
        pinHash: p.pinHash,
        blobPathname: prev.blobPathname,
        blobUrl: prev.blobUrl,
        sourcePath: p.filePath,
        storage: "r2",
      };
      continue;
    }

    if (fileSame) {
      blobPathname = prev.blobPathname;
      blobUrl = prev.blobUrl;
      metadataOnly += 1;
    } else {
      const body = fs.readFileSync(p.filePath);
      const blob = await r2Put(r2Client, p.blobPathname, body);
      blobPathname = blob.pathname;
      blobUrl = blob.url;
      uploaded += 1;
      if (uploaded % 25 === 0) {
        console.log(
          `Uploaded ${uploaded} so far (${skippedUnchanged} unchanged, ${metadataOnly} metadata)`,
        );
      }
    }

    syncItems.push({
      expeditionNo: p.expeditionNo,
      serialNo: p.serialNo,
      declarationDate: toIsoDate(p.row.Dato),
      orderNo: String(p.row.Oppdragsnr ?? ""),
      sequenceNo: String(p.row.Sekvensnummer ?? ""),
      direction,
      orgNo: normalizeOrgNo(p.row.OrgNr),
      pinHash: p.pinHash,
      blobPathname,
      blobUrl,
      sourcePath: p.filePath,
    });

    nextState[p.blobPathname] = {
      size: p.size,
      mtimeMs: p.mtimeMs,
      pinHash: p.pinHash,
      blobPathname,
      blobUrl,
      sourcePath: p.filePath,
      storage: "r2",
    };
  }

  let upserted = 0;
  let purged = 0;

  if (syncItems.length === 0) {
    const result = await postSyncBatch([], RETENTION_DAYS);
    purged = result.purged;
  } else {
    for (let i = 0; i < syncItems.length; i += BATCH_SIZE) {
      const chunk = syncItems.slice(i, i + BATCH_SIZE);
      const purgeDays = i + BATCH_SIZE >= syncItems.length ? RETENTION_DAYS : 0;
      const result = await postSyncBatch(chunk, purgeDays);
      upserted += result.upserted;
      purged += result.purged;
    }
  }

  saveState(nextState);

  console.log(
    `Done. uploaded=${uploaded} metadataOnly=${metadataOnly} unchanged=${skippedUnchanged} upserted=${upserted} purged=${purged}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
