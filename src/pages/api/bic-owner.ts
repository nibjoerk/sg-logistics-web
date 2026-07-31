export const prerender = false;

import {
  extractBicCode,
  mapBicHolderNameToCarrier,
  mapBicHolderNameToLessor,
  type ContainerLessor,
  type OceanCarrier,
} from "../../data/tracking";

const BIC_API_BASE = "https://app.bic-boxtech.org/api/v2.0";
const BIC_TOKEN_URL = "https://app.bic-boxtech.org/oauth/token";
/** Public client id for BIC BoxTech (base64 of bicapp:bicsecretapp). */
const BIC_CLIENT_BASIC = "YmljYXBwOmJpY3NlY3JldGFwcA==";

type TokenCache = {
  accessToken: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

async function getBicAccessToken(): Promise<string> {
  const username = process.env.BIC_USERNAME;
  const password = process.env.BIC_PASSWORD;

  if (!username || !password) {
    throw new Error("BIC_CREDENTIALS_MISSING");
  }

  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.accessToken;
  }

  const body = new URLSearchParams({
    grant_type: "password",
    username,
    password,
  });

  const response = await fetch(BIC_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${BIC_CLIENT_BASIC}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`BIC_AUTH_FAILED:${response.status}`);
  }

  const data = (await response.json()) as {
    accessToken?: string;
    access_token?: string;
    accessTokenExpiresAt?: string;
  };

  const accessToken = data.accessToken ?? data.access_token;
  if (!accessToken) {
    throw new Error("BIC_AUTH_NO_TOKEN");
  }

  const expiresAt = data.accessTokenExpiresAt
    ? Date.parse(data.accessTokenExpiresAt)
    : Date.now() + 50 * 60_000;

  tokenCache = { accessToken, expiresAt };
  return accessToken;
}

type BicHolder = {
  code?: string;
  name?: string;
};

async function lookupBicHolder(bicCode: string): Promise<BicHolder> {
  const token = await getBicAccessToken();
  const response = await fetch(`${BIC_API_BASE}/codes/${encodeURIComponent(bicCode)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (response.status === 404) {
    throw new Error("BIC_NOT_FOUND");
  }

  if (!response.ok) {
    throw new Error(`BIC_LOOKUP_FAILED:${response.status}`);
  }

  return (await response.json()) as BicHolder;
}

export async function GET({ url }: { url: URL }) {
  const container = url.searchParams.get("container") ?? "";
  const codeParam = url.searchParams.get("code") ?? "";
  const bicCode = (codeParam || extractBicCode(container) || "").toUpperCase();

  if (!/^[A-Z]{4}$/.test(bicCode)) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Ugyldig BIC-kode. Bruk fire bokstaver (f.eks. MAEU) eller et containernummer.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const holder = await lookupBicHolder(bicCode);
    const ownerName = holder.name?.trim() ?? "";
    const carrier: OceanCarrier | null = ownerName
      ? mapBicHolderNameToCarrier(ownerName)
      : null;
    const lessor: ContainerLessor | null = ownerName
      ? mapBicHolderNameToLessor(ownerName)
      : null;

    return new Response(
      JSON.stringify({
        ok: true,
        bicCode: holder.code ?? bicCode,
        ownerName,
        carrier,
        lessor,
        source: "bic",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN";

    if (message === "BIC_CREDENTIALS_MISSING") {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "BIC API er ikke konfigurert (mangler BIC_USERNAME/BIC_PASSWORD).",
          configured: false,
        }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    }

    if (message === "BIC_NOT_FOUND") {
      return new Response(
        JSON.stringify({
          ok: false,
          error: `Fant ingen eier for BIC-kode ${bicCode}.`,
          bicCode,
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        ok: false,
        error: "Kunne ikke slå opp BIC-eier akkurat nå.",
        detail: message,
      }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }
}
