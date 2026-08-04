export const prerender = false;

import {
  countRecentFailures,
  findCustomsDeclaration,
  recordLookupAttempt,
} from "../../../lib/customs/db";
import {
  normalizeExpeditionNo,
  normalizeSerialNo,
  verifyCustomsPin,
} from "../../../lib/customs/pin";
import { getR2ObjectStream, isR2Configured } from "../../../lib/customs/r2";
import { verifyTurnstileToken } from "../../../lib/customs/turnstile";
import { createHash } from "node:crypto";

const MAX_FAILURES_KEY = 5;
const MAX_FAILURES_IP = 20;
const WINDOW_MINUTES = 15;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

/** Generic message — never reveal whether expedition/serial exists or which PIN field failed. */
const GENERIC_MISS = "Fant ikke deklarasjon. Kontroller nummerne og prøv igjen.";

export async function POST({ request }: { request: Request }) {
  const pepper = process.env.CUSTOMS_PIN_PEPPER;
  if (!pepper || !process.env.DATABASE_URL) {
    return json({ ok: false, error: "Service unavailable" }, 503);
  }

  let body: {
    expeditionNo?: string;
    serialNo?: string;
    orgNo?: string;
    totalValue?: string | number;
    turnstileToken?: string;
  };
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const ip = clientIp(request);
  const turnstile = await verifyTurnstileToken(body.turnstileToken, ip);
  if (!turnstile.ok) {
    return json({ ok: false, error: turnstile.error }, 403);
  }

  const expeditionNo = normalizeExpeditionNo(body.expeditionNo ?? "");
  const serialNo = normalizeSerialNo(body.serialNo ?? "");
  const orgNo = body.orgNo ?? "";
  const totalValue = body.totalValue ?? "";

  if (expeditionNo.length !== 6 || serialNo.length !== 10) {
    return json({ ok: false, error: GENERIC_MISS }, 404);
  }

  const ipHash = hashIp(ip);
  const failures = await countRecentFailures({
    expeditionNo,
    serialNo,
    ipHash,
    windowMinutes: WINDOW_MINUTES,
  });

  if (failures.byKey >= MAX_FAILURES_KEY || failures.byIp >= MAX_FAILURES_IP) {
    return json(
      {
        ok: false,
        error: "For mange forsøk. Vent 15 minutter og prøv igjen.",
      },
      429,
    );
  }

  const row = await findCustomsDeclaration(expeditionNo, serialNo);
  if (!row) {
    await recordLookupAttempt({
      expeditionNo,
      serialNo,
      ipHash,
      success: false,
    });
    return json({ ok: false, error: GENERIC_MISS }, 404);
  }

  const okPin = verifyCustomsPin(orgNo, totalValue, String(row.pin_hash), pepper);
  if (!okPin) {
    await recordLookupAttempt({
      expeditionNo,
      serialNo,
      ipHash,
      success: false,
    });
    return json({ ok: false, error: GENERIC_MISS }, 404);
  }

  await recordLookupAttempt({
    expeditionNo,
    serialNo,
    ipHash,
    success: true,
  });

  if (!isR2Configured()) {
    return json({ ok: false, error: "Service unavailable" }, 503);
  }

  const key = String(row.blob_pathname);
  try {
    const stream = await getR2ObjectStream(key);
    if (!stream) {
      return json({ ok: false, error: GENERIC_MISS }, 404);
    }

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="SAD-${expeditionNo}-${serialNo}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("R2 get failed", key, err);
    return json(
      {
        ok: false,
        error: "Kunne ikke hente PDF akkurat nå. Prøv igjen senere.",
      },
      503,
    );
  }
}
