type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

/**
 * Verify a Cloudflare Turnstile token.
 * If TURNSTILE_SECRET_KEY is unset, verification is skipped (local/dev).
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteIp?: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { ok: true };
  }

  if (!token || typeof token !== "string" || token.length < 10) {
    return { ok: false, error: "Bekreft at du ikke er en robot, og prøv igjen." };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as TurnstileVerifyResponse;
    if (!data.success) {
      console.error("Turnstile failed", data["error-codes"] ?? []);
      return { ok: false, error: "Sikkerhetssjekk feilet. Oppdater siden og prøv igjen." };
    }
    return { ok: true };
  } catch (err) {
    console.error("Turnstile verify error", err);
    return { ok: false, error: "Sikkerhetssjekk er midlertidig utilgjengelig. Prøv igjen." };
  }
}
