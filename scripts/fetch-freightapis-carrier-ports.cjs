const fs = require("fs");
const path = require("path");

const API_BASE_URL = "https://freightapis.dev/api/ports/by-company";
const DEFAULT_COMPANY = "MAERSK";
const DEFAULT_MAX_PAGES = 1;

function loadLocalEnv() {
  const envFile = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(envFile)) return;

  fs.readFileSync(envFile, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .forEach((line) => {
      const separatorIndex = line.indexOf("=");
      if (separatorIndex === -1) return;

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");

      if (key && value && !process.env[key]) {
        process.env[key] = value;
      }
    });
}

function parseArgs(argv) {
  const args = {
    company: DEFAULT_COMPANY,
    startPage: 1,
    maxPages: DEFAULT_MAX_PAGES,
    outFile: null,
  };

  argv.forEach((arg) => {
    if (arg.startsWith("--start-page=")) {
      args.startPage = Number.parseInt(arg.split("=")[1], 10);
      return;
    }

    if (arg.startsWith("--max-pages=")) {
      args.maxPages = Number.parseInt(arg.split("=")[1], 10);
      return;
    }

    if (arg.startsWith("--out=")) {
      args.outFile = arg.split("=")[1];
      return;
    }

    if (!arg.startsWith("--")) {
      args.company = arg;
    }
  });

  if (!Number.isInteger(args.maxPages) || args.maxPages < 1) {
    throw new Error("--max-pages must be a positive integer");
  }

  if (!Number.isInteger(args.startPage) || args.startPage < 1) {
    throw new Error("--start-page must be a positive integer");
  }

  if (args.startPage > args.maxPages) {
    throw new Error("--start-page cannot be higher than --max-pages");
  }

  return args;
}

function pageRange(start, end) {
  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);
}

function uniquePorts(ports) {
  const seen = new Set();
  return ports.filter((port) => {
    const key = port.unlocode || `${port.name}-${port.countryCode}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchCompanyPage({ apiKey, company, page }) {
  const url = new URL(API_BASE_URL);
  url.searchParams.set("company", company);
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const text = await response.text();
  let payload;

  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error(`FreightAPIs returned non-JSON response on page ${page}: ${text.slice(0, 200)}`);
  }

  if (!response.ok || payload.success === false) {
    throw new Error(
      `FreightAPIs request failed on page ${page}: ${response.status} ${response.statusText} ${JSON.stringify(payload)}`
    );
  }

  return payload;
}

async function main() {
  loadLocalEnv();

  const apiKey = process.env.FREIGHTAPIS_API_KEY;
  if (!apiKey) {
    throw new Error("Missing FREIGHTAPIS_API_KEY environment variable");
  }

  const { company, startPage, maxPages, outFile } = parseArgs(process.argv.slice(2));
  const normalizedCompany = company.trim().toUpperCase();
  const targetFile =
    outFile ||
    path.join(
      __dirname,
      "..",
      "src",
      "data",
      `freightapis-${normalizedCompany.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-ports.json`
    );

  let ports = [];
  const fetchedPageNumbers = new Set();
  let total = null;
  let totalPages = null;

  if (fs.existsSync(targetFile)) {
    const existing = JSON.parse(fs.readFileSync(targetFile, "utf8"));
    if (existing.company === normalizedCompany && Array.isArray(existing.ports)) {
      ports = existing.ports;
      total = existing.total ?? total;
      totalPages = existing.totalPages ?? totalPages;
      const existingPages = Array.isArray(existing.fetchedPageNumbers)
        ? existing.fetchedPageNumbers
        : pageRange(1, existing.fetchedPages || 0);
      existingPages.forEach((page) => fetchedPageNumbers.add(page));
      console.log(`Loaded ${ports.length} existing ports from ${targetFile}`);
    }
  }

  for (let page = startPage; page <= maxPages; page += 1) {
    const payload = await fetchCompanyPage({
      apiKey,
      company: normalizedCompany,
      page,
    });

    total = payload.total ?? total;
    totalPages = payload.totalPages ?? totalPages ?? 1;
    ports.push(...(payload.ports || []));
    fetchedPageNumbers.add(payload.currentPage ?? page);

    console.log(
      `Fetched ${normalizedCompany} page ${payload.currentPage ?? page}/${totalPages}; ${ports.length}/${total ?? "?"} ports collected`
    );

    if (!totalPages || page >= totalPages) break;
  }

  const unique = uniquePorts(ports);
  const generatedAt = new Date().toISOString();
  const expectedPages = totalPages ? pageRange(1, totalPages) : [];
  const isComplete =
    expectedPages.length > 0 && expectedPages.every((page) => fetchedPageNumbers.has(page));
  const output = {
    source: "FreightAPIs",
    endpoint: "/api/ports/by-company",
    company: normalizedCompany,
    generatedAt,
    requestedStartPage: startPage,
    requestedMaxPages: maxPages,
    total,
    totalPages,
    fetchedPages: fetchedPageNumbers.size,
    fetchedPageNumbers: Array.from(fetchedPageNumbers).sort((a, b) => a - b),
    isComplete,
    ports: unique,
  };

  fs.writeFileSync(targetFile, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(`Wrote ${unique.length} unique ports to ${targetFile}`);
  if (!isComplete) {
    console.warn(
      `WARNING: Dataset is incomplete. FreightAPIs reports ${totalPages} page(s), but only ${fetchedPageNumbers.size} page(s) are stored. Increase --max-pages if you have enough API calls.`
    );
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
