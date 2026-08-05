export const prerender = false;

import {createClient} from "@sanity/client";
import {isValidSignature, SIGNATURE_HEADER_NAME} from "@sanity/webhook";

/**
 * Sanity → Vercel rebuild webhook.
 *
 * Setup:
 * 1) Vercel Deploy Hook → VERCEL_DEPLOY_HOOK_URL
 * 2) SANITY_REVALIDATE_SECRET = shared secret
 * 3) Sanity webhook URL: https://<site>/api/cms/rebuild
 *    Secret: same as SANITY_REVALIDATE_SECRET
 *    Filter: _type == "article"
 *
 * Bulk publishes (e.g. seed) fire one webhook per document. We debounce
 * deploy triggers so a burst only causes one Vercel rebuild.
 */

const DEBOUNCE_MS = Number(process.env.CMS_REBUILD_DEBOUNCE_MS || 5 * 60 * 1000);
const LOCK_ID = "system.cmsRebuildLock";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {"Content-Type": "application/json"},
  });
}

function readEnv(name: string): string | undefined {
  return process.env[name]?.trim() || undefined;
}

async function isAuthorized(request: Request, bodyText: string): Promise<boolean> {
  const expected = readEnv("SANITY_REVALIDATE_SECRET");
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

  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret")?.trim();
  if (querySecret && querySecret === expected) return true;

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  return Boolean(bearer && bearer === expected);
}

function sanityWriteClient() {
  const token =
    readEnv("SANITY_API_WRITE_TOKEN") ||
    readEnv("SANITY_API_TOKEN") ||
    readEnv("SANITY_API_READ_TOKEN");
  if (!token) return null;

  return createClient({
    projectId: readEnv("PUBLIC_SANITY_PROJECT_ID") || "r781ar4i",
    dataset: readEnv("PUBLIC_SANITY_DATASET") || "production",
    apiVersion: "2025-01-01",
    token,
    useCdn: false,
  });
}

async function shouldTriggerDeploy(): Promise<{trigger: boolean; reason?: string}> {
  const client = sanityWriteClient();
  if (!client) {
    // Without a token we cannot coordinate across webhook bursts.
    return {trigger: true, reason: "no-lock-token"};
  }

  const now = Date.now();
  try {
    const lock = await client.fetch<{lastTriggeredAt?: string} | null>(
      `*[_id == $id][0]{lastTriggeredAt}`,
      {id: LOCK_ID},
    );
    const last = lock?.lastTriggeredAt ? Date.parse(lock.lastTriggeredAt) : 0;
    if (last && now - last < DEBOUNCE_MS) {
      return {trigger: false, reason: "debounced"};
    }

    await client.createOrReplace({
      _id: LOCK_ID,
      _type: "cmsRebuildLock",
      lastTriggeredAt: new Date(now).toISOString(),
    });
    return {trigger: true};
  } catch (err) {
    console.error("Rebuild debounce lock failed; triggering deploy anyway", err);
    return {trigger: true, reason: "lock-failed"};
  }
}

async function triggerDeploy(): Promise<{ok: true} | {ok: false; status: number}> {
  const deployHook = readEnv("VERCEL_DEPLOY_HOOK_URL");
  if (!deployHook) return {ok: false, status: 503};

  const res = await fetch(deployHook, {method: "POST"});
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Deploy hook failed", res.status, text);
    return {ok: false, status: 502};
  }
  return {ok: true};
}

async function handleRebuild(request: Request, bodyText: string) {
  if (!readEnv("SANITY_REVALIDATE_SECRET") || !readEnv("VERCEL_DEPLOY_HOOK_URL")) {
    return json({ok: false, error: "Webhook not configured"}, 503);
  }

  if (!(await isAuthorized(request, bodyText))) {
    return json({ok: false, error: "Unauthorized"}, 401);
  }

  const gate = await shouldTriggerDeploy();
  if (!gate.trigger) {
    return json({ok: true, triggered: false, reason: gate.reason || "debounced"});
  }

  const result = await triggerDeploy();
  if (!result.ok) {
    return json(
      {ok: false, error: result.status === 503 ? "Webhook not configured" : "Deploy hook failed"},
      result.status,
    );
  }

  return json({ok: true, triggered: true, reason: gate.reason});
}

export async function POST({request}: {request: Request}) {
  const bodyText = await request.text();
  return handleRebuild(request, bodyText);
}

/** Manual test: GET /api/cms/rebuild?secret=... */
export async function GET({request}: {request: Request}) {
  return handleRebuild(request, "");
}
