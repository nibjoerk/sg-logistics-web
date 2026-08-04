export const prerender = false;

import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

/**
 * Sanity → Vercel rebuild webhook.
 *
 * Setup:
 * 1) Vercel Deploy Hook → VERCEL_DEPLOY_HOOK_URL
 * 2) SANITY_REVALIDATE_SECRET = shared secret
 * 3) Sanity webhook URL: https://<site>/api/cms/rebuild
 *    Secret: same as SANITY_REVALIDATE_SECRET
 *    Filter: _type == "article"
 */

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function isAuthorized(request: Request, bodyText: string): Promise<boolean> {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected) return false;

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (signature) {
    try {
      return await isValidSignature(bodyText, signature, expected);
    } catch (err) {
      console.error("Webhook signature check failed", err);
      return false;
    }
  }

  // Fallback: ?secret= or Authorization Bearer (manual tests)
  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret")?.trim();
  if (querySecret && querySecret === expected) return true;

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  return Boolean(bearer && bearer === expected);
}

async function triggerDeploy(): Promise<{ ok: true } | { ok: false; status: number }> {
  const deployHook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!deployHook) return { ok: false, status: 503 };

  const res = await fetch(deployHook, { method: "POST" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Deploy hook failed", res.status, text);
    return { ok: false, status: 502 };
  }
  return { ok: true };
}

export async function POST({ request }: { request: Request }) {
  if (!process.env.SANITY_REVALIDATE_SECRET || !process.env.VERCEL_DEPLOY_HOOK_URL) {
    return json({ ok: false, error: "Webhook not configured" }, 503);
  }

  const bodyText = await request.text();
  if (!(await isAuthorized(request, bodyText))) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }

  const result = await triggerDeploy();
  if (!result.ok) {
    return json(
      { ok: false, error: result.status === 503 ? "Webhook not configured" : "Deploy hook failed" },
      result.status,
    );
  }

  return json({ ok: true, triggered: true });
}

/** Manual test: GET /api/cms/rebuild?secret=... */
export async function GET({ request }: { request: Request }) {
  if (!process.env.SANITY_REVALIDATE_SECRET || !process.env.VERCEL_DEPLOY_HOOK_URL) {
    return json({ ok: false, error: "Webhook not configured" }, 503);
  }

  if (!(await isAuthorized(request, ""))) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }

  const result = await triggerDeploy();
  if (!result.ok) {
    return json(
      { ok: false, error: result.status === 503 ? "Webhook not configured" : "Deploy hook failed" },
      result.status,
    );
  }

  return json({ ok: true, triggered: true });
}
