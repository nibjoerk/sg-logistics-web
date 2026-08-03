import { createHmac, timingSafeEqual } from "node:crypto";

/** Normalize org.nr to digits only. */
export function normalizeOrgNo(orgNo: string | number): string {
  return String(orgNo ?? "").replace(/\D/g, "");
}

/** Normalize total/statistical value to integer string (no spaces). */
export function normalizeTotalValue(value: string | number): string {
  const n = Number(String(value).replace(/\s+/g, "").replace(",", "."));
  if (!Number.isFinite(n)) return "";
  return String(Math.round(n));
}

export function buildPinPayload(orgNo: string | number, totalValue: string | number): string {
  return `${normalizeOrgNo(orgNo)}|${normalizeTotalValue(totalValue)}`;
}

/** Deterministic PIN hash (HMAC-SHA256) so sync can upsert without new salt each run. */
export function hashCustomsPin(
  orgNo: string | number,
  totalValue: string | number,
  pepper: string,
): string {
  if (!pepper) throw new Error("CUSTOMS_PIN_PEPPER missing");
  const payload = buildPinPayload(orgNo, totalValue);
  const [org, val] = payload.split("|");
  if (!org || !val) throw new Error("Invalid PIN inputs");
  return createHmac("sha256", pepper).update(payload).digest("hex");
}

export function verifyCustomsPin(
  orgNo: string | number,
  totalValue: string | number,
  storedHash: string,
  pepper: string,
): boolean {
  const computed = hashCustomsPin(orgNo, totalValue, pepper);
  const a = Buffer.from(computed, "utf8");
  const b = Buffer.from(storedHash, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function normalizeExpeditionNo(value: string): string {
  return String(value ?? "").replace(/\D/g, "").padStart(6, "0").slice(-6);
}

export function normalizeSerialNo(value: string): string {
  return String(value ?? "").replace(/\D/g, "").padStart(10, "0").slice(-10);
}
