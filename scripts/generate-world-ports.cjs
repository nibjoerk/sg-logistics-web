const fs = require("fs");
const path = require("path");

const WPI_URL =
  "https://msi.nga.mil/api/publications/download?type=view&key=16920959/SFH00000/UpdatedPub150.csv";
const SMDG_TCL_URL =
  "https://raw.githubusercontent.com/smdg-org/Terminal-Code-List/master/SMDG%20Terminal%20Code%20List.csv";

const outFile = path.join(__dirname, "..", "src", "data", "world-ports.ts");
const verificationFile = path.join(__dirname, "sources", "container-port-verification.json");
const verification = JSON.parse(fs.readFileSync(verificationFile, "utf8"));

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        value += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        value += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(value);
      value = "";
    } else if (char === "\n") {
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else if (char !== "\r") {
      value += char;
    }
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  return rows;
}

function headerIndex(header) {
  return Object.fromEntries(header.map((name, idx) => [String(name).replace(/^\uFEFF/, "").trim(), idx]));
}

function broadRegion(country, lat, lng) {
  const middleEast = new Set([
    "Bahrain",
    "Iran",
    "Iraq",
    "Israel",
    "Jordan",
    "Kuwait",
    "Lebanon",
    "Oman",
    "Qatar",
    "Saudi Arabia",
    "Syria",
    "United Arab Emirates",
    "Yemen",
  ]);

  if (middleEast.has(country)) return "Middle East";
  if (lng >= -25 && lng <= 45 && lat >= 34 && lat <= 72) return "Europe";
  if (lng >= -170 && lng <= -50 && lat >= 5 && lat <= 75) return "North America";
  if (lng >= -90 && lng <= -30 && lat >= -60 && lat <= 15) return "South America";
  if (lng >= -20 && lng <= 55 && lat >= -35 && lat <= 38) return "Africa";
  if (lng >= 95 && lng <= 180 && lat >= -50 && lat <= 5) return "Oceania";
  if (lng >= 25 && lng <= 180 && lat >= -15 && lat <= 75) return "Asia";
  return "Other";
}

function cleanUnlocode(value) {
  const cleaned = value.trim().replace(/\s+/g, "");
  return cleaned || null;
}

function numberOrNull(value) {
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : null;
}

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

function sourceLabel(sourceId) {
  return verification.sources[sourceId]?.label || sourceId;
}

const confirmedByUnlocode = new Map(
  verification.confirmedByUnlocode.map((entry) => [
    entry.unlocode,
    { sources: entry.sources || [], note: entry.note || null },
  ])
);

const excludedByUnlocode = new Map(
  verification.excludedByUnlocode.map((entry) => [
    entry.unlocode,
    { sources: entry.sources || [], note: entry.note || null },
  ])
);

const terminalCoordinateOverrides = new Map(
  verification.terminalCoordinateOverrides.map((entry) => [
    entry.unlocode,
    {
      lat: entry.lat,
      lng: entry.lng,
      terminalName: entry.terminalName || null,
      facilityCode: entry.facilityCode || null,
      sources: entry.sources || [],
      sourceLabels: (entry.sources || []).map(sourceLabel),
      terminalCount: 1,
    },
  ])
);

const confirmedByNameAndCountry = new Map(
  verification.confirmedByName.map((entry) => [
    `${normalizeText(entry.country)}::${normalizeText(entry.name)}`,
    { sources: entry.sources || [], note: entry.note || null },
  ])
);

function collectEvidence(port, smdgTerminalsByUnlocode) {
  const evidenceSources = new Set();
  const evidenceNotes = [];

  const addEvidence = (entry) => {
    if (!entry) return;
    entry.sources.forEach((source) => evidenceSources.add(source));
    if (entry.note) evidenceNotes.push(entry.note);
  };

  addEvidence(confirmedByUnlocode.get(port.unlocode));

  if (smdgTerminalsByUnlocode.has(port.unlocode)) {
    evidenceSources.add("bicSmdg");
  }

  [port.name, port.alternateName].filter(Boolean).forEach((name) => {
    addEvidence(confirmedByNameAndCountry.get(`${normalizeText(port.country)}::${normalizeText(name)}`));
  });

  return {
    sources: Array.from(evidenceSources),
    sourceLabels: Array.from(evidenceSources).map(sourceLabel),
    notes: evidenceNotes,
  };
}

function addTerminal(terminalsByUnlocode, unlocode, terminal) {
  if (!unlocode) return;
  const terminals = terminalsByUnlocode.get(unlocode) || [];
  terminals.push(terminal);
  terminalsByUnlocode.set(unlocode, terminals);
}

function splitAlternativeUnlocodes(value) {
  return String(value || "")
    .split(/[;,\s]+/)
    .map((code) => code.trim())
    .filter(Boolean);
}

function parseSmdgTerminals(csv) {
  const rows = parseCsv(csv);
  const index = headerIndex(rows[0]);
  const terminalsByUnlocode = new Map();

  rows.slice(1).forEach((row) => {
    const unlocode = cleanUnlocode(row[index.UNLOCODE] || "");
    const terminalCode = row[index["Terminal Code"]]?.trim();
    const lat = numberOrNull(row[index.Latitude]);
    const lng = numberOrNull(row[index.Longitude]);

    if (!unlocode || !terminalCode || lat === null || lng === null) return;

    const terminal = {
      unlocode,
      terminalCode,
      facilityCode: `${unlocode}${terminalCode}`,
      terminalName: row[index["Terminal Facility Name"]]?.trim() || null,
      terminalCompanyName: row[index["Terminal Company Name"]]?.trim() || null,
      lat,
      lng,
    };

    addTerminal(terminalsByUnlocode, unlocode, terminal);
    splitAlternativeUnlocodes(row[index["Alternative UNLOCODE"]]).forEach((alternativeUnlocode) => {
      addTerminal(terminalsByUnlocode, cleanUnlocode(alternativeUnlocode), terminal);
    });
  });

  return terminalsByUnlocode;
}

function terminalCoordinatesForPort(port, smdgTerminalsByUnlocode) {
  const manualTerminal = terminalCoordinateOverrides.get(port.unlocode);
  if (manualTerminal) return manualTerminal;

  const terminals = smdgTerminalsByUnlocode.get(port.unlocode) || [];
  if (!terminals.length) return null;

  const lat = terminals.reduce((sum, terminal) => sum + terminal.lat, 0) / terminals.length;
  const lng = terminals.reduce((sum, terminal) => sum + terminal.lng, 0) / terminals.length;

  if (terminals.length === 1) {
    const [terminal] = terminals;
    return {
      lat,
      lng,
      terminalName: terminal.terminalName,
      facilityCode: terminal.facilityCode,
      sources: ["bicSmdg"],
      sourceLabels: [sourceLabel("bicSmdg")],
      terminalCount: 1,
    };
  }

  return {
    lat,
    lng,
    terminalName: `${terminals.length} SMDG-terminaler`,
    facilityCode: null,
    sources: ["bicSmdg"],
    sourceLabels: [sourceLabel("bicSmdg")],
    terminalCount: terminals.length,
  };
}

function exclusionEvidence(port) {
  const entry = excludedByUnlocode.get(port.unlocode);
  if (!entry) return null;

  return {
    sources: entry.sources || [],
    sourceLabels: (entry.sources || []).map(sourceLabel),
    notes: entry.note ? [entry.note] : [],
  };
}

function isLikelyContainerPort(port) {
  const isLargeOrMedium = port.harborSize === "Large" || port.harborSize === "Medium";
  const hasDeepCargoPier = (port.cargoPierDepth ?? 0) >= 7;
  const hasVeryDeepCargoPier = (port.cargoPierDepth ?? 0) >= 10;
  const hasDeepChannel = (port.channelDepth ?? 0) >= 9;

  return Boolean(
    port.hasWharves &&
      (
        (isLargeOrMedium && (hasDeepCargoPier || hasDeepChannel)) ||
        (hasDeepCargoPier && hasDeepChannel) ||
        hasVeryDeepCargoPier ||
        (port.hasContainerFacilities && (isLargeOrMedium || hasDeepCargoPier))
      )
  );
}

async function main() {
  const [response, smdgResponse] = await Promise.all([fetch(WPI_URL), fetch(SMDG_TCL_URL)]);

  if (!response.ok) {
    throw new Error(`Could not download WPI CSV: ${response.status} ${response.statusText}`);
  }

  if (!smdgResponse.ok) {
    throw new Error(`Could not download SMDG TCL CSV: ${smdgResponse.status} ${smdgResponse.statusText}`);
  }

  const csv = await response.text();
  const smdgCsv = await smdgResponse.text();
  const smdgTerminalsByUnlocode = parseSmdgTerminals(smdgCsv);
  const rows = parseCsv(csv);
  const index = headerIndex(rows[0]);

  const ports = rows
    .slice(1)
    .map((row) => {
      const lat = numberOrNull(row[index.Latitude]);
      const lng = numberOrNull(row[index.Longitude]);
      const name = row[index["Main Port Name"]]?.trim();
      const country = row[index["Country Code"]]?.trim();

      if (!name || !country || lat === null || lng === null) return null;

      const port = {
        id: String(Math.trunc(numberOrNull(row[index["World Port Index Number"]]) ?? rows.indexOf(row))),
        name,
        alternateName: row[index["Alternate Port Name"]]?.trim() || null,
        country,
        unlocode: cleanUnlocode(row[index["UN/LOCODE"]] || ""),
        region: broadRegion(country, lat, lng),
        wpiRegion: row[index["Region Name"]]?.trim() || null,
        waterBody: row[index["World Water Body"]]?.trim() || null,
        harborSize: row[index["Harbor Size"]]?.trim() || "Unknown",
        harborType: row[index["Harbor Type"]]?.trim() || "Unknown",
        harborUse: row[index["Harbor Use"]]?.trim() || "Unknown",
        hasContainerFacilities: row[index["Facilities - Container"]] === "Yes",
        hasWharves: row[index["Facilities - Wharves"]] === "Yes",
        hasRoRo: row[index["Facilities - Ro-Ro"]] === "Yes",
        channelDepth: numberOrNull(row[index["Channel Depth (m)"]]),
        cargoPierDepth: numberOrNull(row[index["Cargo Pier Depth (m)"]]),
        lat,
        lng,
      };

      const evidence = collectEvidence(port, smdgTerminalsByUnlocode);
      const excluded = exclusionEvidence(port);
      const terminalCoordinates = terminalCoordinatesForPort(port, smdgTerminalsByUnlocode);
      const heuristicLikely = isLikelyContainerPort(port);
      const containerStatus = excluded
        ? "excluded"
        : evidence.sources.length
          ? "confirmed"
          : heuristicLikely
            ? "likely"
            : "unverified";

      return {
        ...port,
        containerStatus,
        containerEvidence: excluded?.sources || evidence.sources,
        containerEvidenceLabels: excluded?.sourceLabels || evidence.sourceLabels,
        containerEvidenceNotes: excluded?.notes || evidence.notes,
        displayLat: terminalCoordinates?.lat ?? lat,
        displayLng: terminalCoordinates?.lng ?? lng,
        coordinateSource: terminalCoordinates ? "terminal" : "wpi",
        terminalName: terminalCoordinates?.terminalName ?? null,
        terminalFacilityCode: terminalCoordinates?.facilityCode ?? null,
        terminalCount: terminalCoordinates?.terminalCount ?? 0,
        coordinateEvidenceLabels: terminalCoordinates?.sourceLabels ?? [],
        likelyContainerPort: containerStatus === "confirmed" || containerStatus === "likely",
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name, "en"));

  const containerCount = ports.filter((port) => port.hasContainerFacilities).length;
  const likelyContainerCount = ports.filter((port) => port.likelyContainerPort).length;
  const containerStatusCounts = ports.reduce((counts, port) => {
    counts[port.containerStatus] = (counts[port.containerStatus] || 0) + 1;
    return counts;
  }, {});
  const generatedAt = new Date().toISOString().slice(0, 10);
  const sourceUrl = "https://msi.nga.mil/Publications/WPI";

  const file = `// Generated by scripts/generate-world-ports.cjs from NGA World Port Index (Pub. 150).
// Source: ${sourceUrl}
// Generated: ${generatedAt}

export const worldPortSource = {
  name: "NGA World Port Index (Pub. 150)",
  url: "${sourceUrl}",
  generatedAt: "${generatedAt}",
  portCount: ${ports.length},
  confirmedContainerFacilityCount: ${containerCount},
  likelyContainerPortCount: ${likelyContainerCount},
  containerStatusCounts: ${JSON.stringify(containerStatusCounts, null, 2)},
} as const;

export const worldPorts = ${JSON.stringify(ports, null, 2)} as const;

export type WorldPort = (typeof worldPorts)[number];
`;

  fs.writeFileSync(outFile, file, "utf8");
  console.log(`Wrote ${ports.length} ports to ${outFile}`);
  console.log(`${containerCount} ports have confirmed container facilities in WPI`);
  console.log(`${likelyContainerCount} ports are marked container relevant`);
  console.log(`${containerStatusCounts.confirmed || 0} ports are externally confirmed`);
  console.log(`${containerStatusCounts.likely || 0} ports match the likely container port heuristic`);
  console.log(`${smdgTerminalsByUnlocode.size} UN/LOCODEs have SMDG terminal coordinates`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
