export const prerender = false;

import {
  findCustomsDeclaration,
  recordLookupAttempt,
  countRecentFailures,
} from "../../../lib/customs/db";
import { isValidEmail, sendCustomsPreferenceEmail } from "../../../lib/customs/email";
import {
  normalizeExpeditionNo,
  normalizeOrgNo,
  normalizeSerialNo,
  verifyCustomsPin,
} from "../../../lib/customs/pin";
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
    email?: string;
  };
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const expeditionNo = normalizeExpeditionNo(body.expeditionNo ?? "");
  const serialNo = normalizeSerialNo(body.serialNo ?? "");
  const orgNo = normalizeOrgNo(body.orgNo ?? "");
  const totalValue = body.totalValue ?? "";
  const email = String(body.email ?? "")
    .trim()
    .toLowerCase();

  if (!isValidEmail(email)) {
    return json({ ok: false, error: "Oppgi en gyldig e-postadresse." }, 400);
  }

  if (expeditionNo.length !== 6 || serialNo.length !== 10 || !orgNo) {
    return json({ ok: false, error: GENERIC_MISS }, 404);
  }

  const ipHash = hashIp(clientIp(request));
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

  const sent = await sendCustomsPreferenceEmail({
    orgNo,
    customerEmail: email,
  });

  if (!sent.ok) {
    return json({ ok: false, error: sent.error }, 503);
  }

  return json({ ok: true });
}
