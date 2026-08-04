const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 254;
}

export async function sendCustomsPreferenceEmail(opts: {
  orgNo: string;
  customerEmail: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "E-post er ikke konfigurert." };
  }

  const to = process.env.CUSTOMS_NOTIFY_EMAIL || "import@sglogistics.no";
  const from =
    process.env.RESEND_FROM_EMAIL || "SG Logistics <onboarding@resend.dev>";

  const orgDigits = opts.orgNo.replace(/\D/g, "");
  const text = `Kunde med org.nr. ${orgDigits} ønsker at fremtidige tolldeklarasjoner sendes til ${opts.customerEmail}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Ønske om automatisk utsending av tolldeklarasjoner",
      text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Resend error", response.status, detail);
    return { ok: false, error: "Kunne ikke sende e-post. Prøv igjen senere." };
  }

  return { ok: true };
}
