const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const verificationFile = path.join(__dirname, "sources", "container-port-verification.json");
const worldPortsFile = path.join(__dirname, "..", "src", "data", "world-ports.ts");

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " AND ")
    .replace(/\bPORT OF\b/g, "")
    .replace(/[^A-Z0-9]+/gi, " ")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}

function parseArgs(argv) {
  const args = {
    input: path.join(__dirname, "..", "src", "data", "freightapis-maersk-ports.json"),
    out: null,
    maxDistanceKm: 10,
    minDistanceGapKm: 5,
  };

  argv.forEach((arg) => {
    if (arg.startsWith("--input=")) args.input = arg.split("=")[1];
    if (arg.startsWith("--out=")) args.out = arg.split("=")[1];
    if (arg.startsWith("--max-distance-km=")) {
      args.maxDistanceKm = Number.parseFloat(arg.split("=")[1]);
    }
    if (arg.startsWith("--min-distance-gap-km=")) {
      args.minDistanceGapKm = Number.parseFloat(arg.split("=")[1]);
    }
  });

  return args;
}

function distanceKm(a, b) {
  const earthRadiusKm = 6371;
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const deltaLat = toRadians(b.lat - a.lat);
  const deltaLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine));
}

function nearestByDistance({ freightPort, worldPorts, maxDistanceKm, minDistanceGapKm }) {
  if (typeof freightPort.lat !== "number" || typeof freightPort.lng !== "number") return null;

  const candidates = worldPorts
    .filter((port) => port.country === freightPort.countryName)
    .map((port) => ({
      port,
      distanceKm: distanceKm(
        { lat: freightPort.lat, lng: freightPort.lng },
        { lat: port.displayLat ?? port.lat, lng: port.displayLng ?? port.lng }
      ),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);

  const nearbyCandidates = candidates.filter((candidate) => candidate.distanceKm <= maxDistanceKm);
  if (!nearbyCandidates.length) return null;

  if (nearbyCandidates.length > 1) {
    return {
      ambiguous: true,
      candidates: nearbyCandidates.slice(0, 8),
    };
  }

  const nearest = nearbyCandidates[0];
  const secondNearest = candidates.find((candidate) => candidate.port.unlocode !== nearest.port.unlocode);
  const gap = secondNearest ? secondNearest.distanceKm - nearest.distanceKm : Infinity;
  if (gap < minDistanceGapKm) return null;

  return {
    ambiguous: false,
    nearest,
  };
}

function buildUniqueNameCountryMap(worldPorts) {
  const candidates = new Map();

  worldPorts.forEach((port) => {
    [port.name, port.alternateName].filter(Boolean).forEach((name) => {
      const key = `${normalizeText(port.country)}::${normalizeText(name)}`;
      const entries = candidates.get(key) || [];
      entries.push(port);
      candidates.set(key, entries);
    });
  });

  return new Map(
    Array.from(candidates.entries())
      .filter(([, entries]) => entries.length === 1)
      .map(([key, entries]) => [key, entries[0]])
  );
}

function matchFreightPort({
  freightPort,
  worldPorts,
  worldByUnlocode,
  uniqueNameCountry,
  aliases,
  maxDistanceKm,
  minDistanceGapKm,
}) {
  const alias = aliases.get(freightPort.unlocode);
  const normalizedUnlocode = alias?.to || freightPort.unlocode;
  const exact = worldByUnlocode.get(normalizedUnlocode);

  if (exact) {
    return {
      status: "matched",
      method: alias ? "alias" : "unlocode",
      freightUnlocode: freightPort.unlocode,
      normalizedUnlocode,
      worldUnlocode: exact.unlocode,
      worldName: exact.name,
      aliasReason: alias?.reason || null,
    };
  }

  const byName = uniqueNameCountry.get(
    `${normalizeText(freightPort.countryName)}::${normalizeText(freightPort.name)}`
  );

  if (byName) {
    return {
      status: "matched",
      method: "unique-name-country",
      freightUnlocode: freightPort.unlocode,
      normalizedUnlocode,
      worldUnlocode: byName.unlocode,
      worldName: byName.name,
      aliasReason: null,
    };
  }

  const nearest = nearestByDistance({
    freightPort,
    worldPorts,
    maxDistanceKm,
    minDistanceGapKm,
  });

  if (nearest) {
    if (nearest.ambiguous) {
      return {
        status: "unmatched",
        method: "ambiguous-lat-lon",
        freightUnlocode: freightPort.unlocode,
        normalizedUnlocode,
        worldUnlocode: null,
        worldName: null,
        aliasReason: null,
        candidates: nearest.candidates.map((candidate) => ({
          worldUnlocode: candidate.port.unlocode,
          worldName: candidate.port.name,
          distanceKm: Number(candidate.distanceKm.toFixed(2)),
        })),
      };
    }

    return {
      status: "matched",
      method: "lat-lon",
      freightUnlocode: freightPort.unlocode,
      normalizedUnlocode,
      worldUnlocode: nearest.nearest.port.unlocode,
      worldName: nearest.nearest.port.name,
      distanceKm: Number(nearest.nearest.distanceKm.toFixed(2)),
      aliasReason: null,
    };
  }

  return {
    status: "unmatched",
    method: null,
    freightUnlocode: freightPort.unlocode,
    normalizedUnlocode,
    worldUnlocode: null,
    worldName: null,
    aliasReason: null,
  };
}

async function main() {
  const { input, out, maxDistanceKm, minDistanceGapKm } = parseArgs(process.argv.slice(2));
  const verification = JSON.parse(fs.readFileSync(verificationFile, "utf8"));
  const freight = JSON.parse(fs.readFileSync(input, "utf8"));
  const { worldPorts } = await import(pathToFileURL(worldPortsFile).href);

  const aliases = new Map(
    (verification.unlocodeAliases || []).map((entry) => [entry.from, entry])
  );
  const worldByUnlocode = new Map(worldPorts.map((port) => [port.unlocode, port]));
  const uniqueNameCountry = buildUniqueNameCountryMap(worldPorts);

  const results = freight.ports.map((freightPort) => ({
    freight: {
      name: freightPort.name,
      unlocode: freightPort.unlocode,
      countryCode: freightPort.countryCode,
      countryName: freightPort.countryName,
      lat: freightPort.lat,
      lng: freightPort.lng,
    },
    match: matchFreightPort({
      freightPort,
      worldPorts,
      worldByUnlocode,
      uniqueNameCountry,
      aliases,
      maxDistanceKm,
      minDistanceGapKm,
    }),
  }));

  const matched = results.filter((result) => result.match.status === "matched");
  const unmatched = results.filter((result) => result.match.status === "unmatched");
  const byMethod = matched.reduce((counts, result) => {
    counts[result.match.method] = (counts[result.match.method] || 0) + 1;
    return counts;
  }, {});

  const report = {
    source: freight.source,
    company: freight.company,
    freightPorts: freight.ports.length,
    matched: matched.length,
    unmatched: unmatched.length,
    byMethod,
    isFreightDatasetComplete: freight.isComplete,
    freightFetchedPages: freight.fetchedPageNumbers,
    maxDistanceKm,
    minDistanceGapKm,
    generatedAt: new Date().toISOString(),
    results,
  };

  const outFile =
    out ||
    path.join(
      __dirname,
      "..",
      "src",
      "data",
      `freightapis-${freight.company.toLowerCase()}-port-matches.json`
    );

  fs.writeFileSync(outFile, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(
    `Matched ${matched.length}/${freight.ports.length} ${freight.company} ports; ${unmatched.length} need review`
  );
  console.log(`Match methods: ${JSON.stringify(byMethod)}`);
  console.log(`Wrote ${outFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
