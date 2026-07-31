export type TrackingMode = "flyfrakt" | "ups" | "ltl" | "fcl" | "lcl";

export type FclReferenceType = "booking" | "bl" | "container";

export type OceanCarrier = "maersk" | "msc" | "hapag" | "cma";

/** Major container lessors with public unit-inquiry tools. */
export type ContainerLessor = "triton" | "textainer" | "seaco";


export const trackingModes: {
  id: TrackingMode;
  title: string;
  description: string;
  placeholder: string;
  inputLabel: string;
}[] = [
  {
    id: "ltl",
    title: "LTL",
    description: "Stykkgods / samlast – spor med fraktbrevnummer.",
    placeholder: "f.eks. 70703070123456789",
    inputLabel: "Fraktbrevnummer",
  },
  {
    id: "flyfrakt",
    title: "Flyfrakt",
    description: "Spor med AWB-nummer. De tre første sifrene forteller flyselskapet.",
    placeholder: "f.eks. 117-12345675",
    inputLabel: "AWB-nummer",
  },
  {
    id: "ups",
    title: "UPS",
    description: "Spor UPS-sending med sendingsnummer (tracking number).",
    placeholder: "f.eks. 1Z7962FW1234567890",
    inputLabel: "UPS-sendingsnummer",
  },
  {
    id: "fcl",
    title: "FCL",
    description: "Full container – spor booking, B/L eller containernummer hos rederiet.",
    placeholder: "f.eks. MSKU1234567",
    inputLabel: "Referanse",
  },
  {
    id: "lcl",
    title: "LCL",
    description: "Partload / LCL – spor med bookingnummer hos ECU Worldwide.",
    placeholder: "f.eks. NON-HPH-NO123456",
    inputLabel: "Bookingnummer",
  },
];

export const oceanCarriers: { id: OceanCarrier; name: string }[] = [
  { id: "maersk", name: "Maersk" },
  { id: "msc", name: "MSC" },
  { id: "hapag", name: "Hapag-Lloyd" },
  { id: "cma", name: "CMA CGM" },
];

export const fclReferenceOptions: {
  id: FclReferenceType;
  label: string;
  inputLabel: string;
  placeholder: string;
  hint: string;
}[] = [
  {
    id: "container",
    label: "Containernummer",
    inputLabel: "Containernummer",
    placeholder: "f.eks. MSKU1234567",
    hint: "Containernummer består av 4 bokstaver og 7 siffer (f.eks. MSKU1234567 / HLCU1234567).",
  },
  {
    id: "booking",
    label: "Bookingnummer",
    inputLabel: "Bookingnummer",
    placeholder: "f.eks. MAEU123456789",
    hint: "Bookingnummeret står på bookingbekreftelsen. Hos Maersk er det ofte MAEU + 9 siffer. Hos Hapag-Lloyd og MSC er booking et eget sporingsvalg.",
  },
  {
    id: "bl",
    label: "B/L-nummer",
    inputLabel: "B/L-nummer (MBL)",
    placeholder: "f.eks. 123456789",
    hint: "Maersk: B/L er 9 tegn (uten MAEU i sporingsfeltet). MSC: container og B/L i samme søk (ofte MEDU…). Hapag-Lloyd: B/L starter ofte med HLCU. CMA CGM: samme søkefelt som container (f.eks. ABCD1234567).",
  },
];

/** ISO owner codes (4 letters) often seen for the four main carriers SG uses. */
const containerOwnerToCarrier: Record<string, OceanCarrier> = {
  MAEU: "maersk",
  MSKU: "maersk",
  MRKU: "maersk",
  MRSU: "maersk",
  MVIU: "maersk",
  MNBU: "maersk",
  SEJU: "maersk",
  HASU: "maersk",
  MSCU: "msc",
  MEDU: "msc",
  MSMU: "msc",
  MSDU: "msc",
  HLCU: "hapag",
  HLXU: "hapag",
  HLBU: "hapag",
  CMAU: "cma",
  CGMU: "cma",
  ECMU: "cma",
  TCNU: "cma",
};

/**
 * Common lessor owner codes (3 letters). BIC API remains source of truth;
 * this is a fast path for well-known prefixes.
 */
const bicOwnerToLessor: Record<string, ContainerLessor> = {
  TCK: "triton",
  TRU: "triton",
  TAL: "triton",
  TEX: "textainer",
  MAG: "textainer",
  TXG: "textainer",
  TGH: "textainer",
};

/**
 * First three letters of a container number = BIC owner code.
 * Fourth letter is equipment category (usually U).
 */
const bicOwnerToCarrier: Record<string, OceanCarrier> = {
  MAE: "maersk",
  MSK: "maersk",
  MRK: "maersk",
  MRS: "maersk",
  MVI: "maersk",
  MNB: "maersk",
  SEJ: "maersk",
  SUD: "maersk",
  HAS: "maersk",
  MSC: "msc",
  MED: "msc",
  MSM: "msc",
  MSD: "msc",
  HLC: "hapag",
  HLX: "hapag",
  HLB: "hapag",
  CMA: "cma",
  CGM: "cma",
  ECM: "cma",
  TCN: "cma",
  TEM: "cma",
};

export type AirlineTracker = {
  prefix: string;
  name: string;
  /** Build tracking URL from digits-only 11-char AWB, or null if unknown portal. */
  buildUrl: ((awbDigits: string) => string) | null;
  /** Portal has no deep link; user must paste AWB manually on the opened page. */
  manualEntry?: boolean;
};

/**
 * Airline AWB prefixes used by SG the last ~2.5 years.
 * buildUrl with AWB in the URL = verified deep-link.
 * buildUrl + manualEntry = opens the airline portal; user pastes AWB (copied to clipboard).
 * buildUrl null = airline identified only; user is asked to contact us.
 */
export const airlinePrefixes: AirlineTracker[] = [
  { prefix: "001", name: "American Airlines", buildUrl: null },
  { prefix: "006", name: "Delta Air Lines", buildUrl: null },
  { prefix: "014", name: "Air Canada Cargo", buildUrl: () => "https://www.aircanada.com/cargo/en/tools-forms/", manualEntry: true },
  { prefix: "016", name: "United Cargo", buildUrl: () => "https://www.unitedcargo.com/en/us/track", manualEntry: true },
  { prefix: "020", name: "Lufthansa Cargo", buildUrl: (awb) => `https://www.lufthansa-cargo.com/en/eservices/etracking/tracking/-/awb/${awb.slice(0, 3)}/${awb.slice(3)}` },
  { prefix: "045", name: "LATAM Airlines", buildUrl: null },
  { prefix: "047", name: "TAP Air Portugal", buildUrl: () => "https://www.tapcargo.com/en", manualEntry: true },
  { prefix: "057", name: "Air France Cargo", buildUrl: (awb) => `https://www.afklcargo.com/mycargo/shipment/detail/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "071", name: "Ethiopian Airlines", buildUrl: (awb) => `https://cargo.ethiopianairlines.com/my-cargo/track-your-shipment?awbnumber=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "074", name: "KLM Cargo", buildUrl: (awb) => `https://www.afklcargo.com/mycargo/shipment/detail/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "086", name: "Air New Zealand", buildUrl: null },
  { prefix: "105", name: "Finnair Cargo", buildUrl: (awb) => `https://cargo.finnair.com/api/offerandorder/#/shipments/list?type=D&values=${awb}` },
  { prefix: "108", name: "Icelandair", buildUrl: null },
  { prefix: "112", name: "China Cargo Airlines", buildUrl: null },
  { prefix: "117", name: "SAS Cargo", buildUrl: (awb) => `https://booking.sascargo.com/app/offerandorder/#/shipments/list?type=D&values=${awb}` },
  { prefix: "124", name: "Air Algérie", buildUrl: null },
  { prefix: "125", name: "British Airways World Cargo", buildUrl: () => "https://www.iagcargo.com/en/home/", manualEntry: true },
  { prefix: "126", name: "Garuda Indonesia", buildUrl: null },
  { prefix: "131", name: "Japan Airlines", buildUrl: null },
  { prefix: "145", name: "LATAM Cargo Chile", buildUrl: null },
  { prefix: "147", name: "Royal Air Maroc", buildUrl: null },
  { prefix: "157", name: "Qatar Airways Cargo", buildUrl: (awb) => `https://www.qrcargo.com/s/track-your-shipment?documentType=MAWB&documentNumber=${awb.slice(3)}&documentPrefix=${awb.slice(0, 3)}` },
  { prefix: "172", name: "Cargolux", buildUrl: (awb) => `https://www.cargolux.com/Track-and-Trace?awb=${awb}` },
  { prefix: "176", name: "Emirates SkyCargo", buildUrl: (awb) => `https://eskycargo.emirates.com/app/offerandorder/#/shipments/list?type=D&values=${awb}` },
  { prefix: "180", name: "Korean Air Cargo", buildUrl: (awb) => `https://cargo.koreanair.com/en/tracking?awbNO=${awb}` },
  { prefix: "185", name: "Air Vance / Amadeus IT", buildUrl: null },
  { prefix: "196", name: "Bridges Air Cargo", buildUrl: null },
  { prefix: "205", name: "All Nippon Airways", buildUrl: null },
  { prefix: "208", name: "Air Transat", buildUrl: null },
  { prefix: "217", name: "Thai Airways", buildUrl: () => "https://chorus.thaicargo.com/skychain/app?service=page/nwp:Trackshipmt", manualEntry: true },
  { prefix: "226", name: "Air Burkina", buildUrl: null },
  { prefix: "232", name: "Malaysia Airlines", buildUrl: null },
  { prefix: "235", name: "Turkish Cargo", buildUrl: (awb) => `https://www.turkishcargo.com/en/services/online-services/track-and-trace?awb=${awb}` },
  { prefix: "268", name: "Allegiant Air", buildUrl: null },
  { prefix: "270", name: "Trans Mediterranean Airways", buildUrl: null },
  { prefix: "297", name: "China Airlines", buildUrl: null },
  { prefix: "309", name: "Red Wings Airlines", buildUrl: null },
  { prefix: "323", name: "Ukraine International Airlines", buildUrl: null },
  { prefix: "328", name: "Norwegian Air Shuttle", buildUrl: null },
  { prefix: "330", name: "Airline Geo Sky", buildUrl: null },
  { prefix: "356", name: "Air India", buildUrl: null },
  { prefix: "365", name: "Air Dynamic", buildUrl: null },
  { prefix: "367", name: "Air Tindi", buildUrl: null },
  { prefix: "378", name: "Cayman Airways", buildUrl: null },
  { prefix: "385", name: "Air Madagascar", buildUrl: null },
  { prefix: "403", name: "Polar Air Cargo", buildUrl: null },
  { prefix: "415", name: "Albatros Airlines", buildUrl: null },
  { prefix: "459", name: "Air Central", buildUrl: null },
  { prefix: "489", name: "Cargojet Airways", buildUrl: null },
  { prefix: "501", name: "Silk Way West Airlines", buildUrl: (awb) => `https://sww.enxt.solutions/enxt/iframe/track-and-trace/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "506", name: "Norse Atlantic Airways", buildUrl: null },
  { prefix: "509", name: "Air Astra", buildUrl: null },
  { prefix: "533", name: "Air Sunshine", buildUrl: null },
  { prefix: "559", name: "Aeroflot Cargo", buildUrl: null },
  { prefix: "560", name: "Air Spain", buildUrl: null },
  { prefix: "570", name: "Air Comores", buildUrl: null },
  { prefix: "575", name: "Coyne Aviation", buildUrl: null },
  { prefix: "581", name: "Air Cargo Carrier", buildUrl: null },
  { prefix: "612", name: "TUI fly Belgium", buildUrl: null },
  { prefix: "615", name: "DHL Aviation", buildUrl: () => "https://aviationcargo.dhl.com/", manualEntry: true },
  { prefix: "618", name: "Singapore Airlines Cargo", buildUrl: () => "https://www.siacargo.com/e-services/quicksearch_public/", manualEntry: true },
  { prefix: "630", name: "Sunclass Airlines", buildUrl: null },
  { prefix: "645", name: "SAC (K) Limited", buildUrl: null },
  { prefix: "657", name: "airBaltic", buildUrl: () => "https://www.airbaltic.com/en/cargo/online-services", manualEntry: true },
  { prefix: "692", name: "Air St. Pierre", buildUrl: null },
  { prefix: "700", name: "CAL Cargo Air Lines", buildUrl: null },
  { prefix: "701", name: "Widerøe", buildUrl: null },
  { prefix: "703", name: "Air Forse / Awooda", buildUrl: null },
  { prefix: "719", name: "Benin Golf Air", buildUrl: null },
  { prefix: "722", name: "Aeromonterrey", buildUrl: null },
  { prefix: "724", name: "Swiss WorldCargo", buildUrl: (awb) => `https://offerandorder.swissworldcargo.com/app/offerandorder/#/shipments/list?type=D&values=${awb}` },
  { prefix: "729", name: "Tampa Cargo", buildUrl: null },
  { prefix: "743", name: "Air Do", buildUrl: null },
  { prefix: "775", name: "Air Niugini", buildUrl: null },
  { prefix: "814", name: "AirBridgeCargo", buildUrl: null },
  { prefix: "880", name: "Hainan Airlines", buildUrl: null },
  { prefix: "898", name: "Beijing Capital Airlines", buildUrl: null },
  { prefix: "901", name: "Taban Air", buildUrl: null },
  { prefix: "921", name: "SF Airlines", buildUrl: null },
  { prefix: "923", name: "Air Cargo Express", buildUrl: null },
  { prefix: "932", name: "Virgin Atlantic", buildUrl: () => "https://www.virginatlanticcargo.com/gb/en/track/track-your-cargo.html", manualEntry: true },
  { prefix: "978", name: "Air Caraïbes", buildUrl: null },
  { prefix: "999", name: "Air China", buildUrl: null },
];

export function normalizeTrackingNumber(value: string): string {
  return value.trim().replace(/\s+/g, "");
}

export function awbDigitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function findAirline(awbDigits: string): AirlineTracker | null {
  if (awbDigits.length < 3) return null;
  const prefix = awbDigits.slice(0, 3);
  return airlinePrefixes.find((a) => a.prefix === prefix) ?? null;
}

export function normalizeContainerNumber(reference: string): string {
  return reference.trim().toUpperCase().replace(/[\s-]/g, "");
}

/** True for ISO 6346 container IDs: 4 letters + 7 digits. */
export function looksLikeContainerNumber(reference: string): boolean {
  return /^[A-Z]{4}\d{7}$/.test(normalizeContainerNumber(reference));
}

/** BIC code on a container = first 4 letters (3-letter owner + category, usually U). */
export function extractBicCode(reference: string): string | null {
  const cleaned = normalizeContainerNumber(reference);
  if (cleaned.length < 4 || !/^[A-Z]{4}/.test(cleaned)) return null;
  return cleaned.slice(0, 4);
}

export function extractBicOwnerCode(reference: string): string | null {
  const bic = extractBicCode(reference);
  return bic ? bic.slice(0, 3) : null;
}

export function detectContainerCarrier(reference: string): OceanCarrier | null {
  const cleaned = normalizeContainerNumber(reference);
  if (!/^[A-Z]{4}\d{7}$/.test(cleaned) && !/^[A-Z]{4}/.test(cleaned)) return null;

  const owner4 = cleaned.slice(0, 4);
  if (containerOwnerToCarrier[owner4]) return containerOwnerToCarrier[owner4];

  const owner3 = cleaned.slice(0, 3);
  return bicOwnerToCarrier[owner3] ?? null;
}

export function detectContainerLessor(reference: string): ContainerLessor | null {
  const cleaned = normalizeContainerNumber(reference);
  if (!/^[A-Z]{4}/.test(cleaned)) return null;
  return bicOwnerToLessor[cleaned.slice(0, 3)] ?? null;
}

/** Map a BIC Code holder company name to one of SG's four ocean carriers. */
export function mapBicHolderNameToCarrier(holderName: string): OceanCarrier | null {
  const name = holderName.toLowerCase();
  if (name.includes("maersk") || name.includes("a.p. moller") || name.includes("apm terminals")) {
    return "maersk";
  }
  if (name.includes("mediterranean shipping") || /\bmsc\b/.test(name)) {
    return "msc";
  }
  if (name.includes("hapag")) {
    return "hapag";
  }
  if (name.includes("cma cgm") || name.includes("cma-cgm") || /\bcgm\b/.test(name)) {
    return "cma";
  }
  return null;
}

export function mapBicHolderNameToLessor(holderName: string): ContainerLessor | null {
  const name = holderName.toLowerCase();
  if (name.includes("triton")) return "triton";
  if (name.includes("textainer")) return "textainer";
  if (name.includes("seaco")) return "seaco";
  return null;
}

export const containerLessors: {
  id: ContainerLessor;
  name: string;
}[] = [
  { id: "triton", name: "Triton" },
  { id: "textainer", name: "Textainer" },
  { id: "seaco", name: "Seaco" },
];

/**
 * Lessor portals show equipment/lease status (on-hire customer, depot, etc.),
 * not ocean shipment milestones. Triton supports deep-link; others open a form.
 */
export function buildLessorUnitInquiryUrl(
  lessor: ContainerLessor,
  containerNumber: string,
): { url: string; manualEntry: boolean } {
  const container = normalizeContainerNumber(containerNumber);

  switch (lessor) {
    case "triton":
      return {
        url: `https://tools.tritoncontainer.com/tritoncontainer/unitStatus/show/${container}`,
        manualEntry: false,
      };
    case "textainer":
      return {
        url: "https://tex.textainer.com/Equipment/StatusAndSpecificationsInquiry.aspx",
        manualEntry: true,
      };
    case "seaco":
      return {
        url: "https://seacoglobal.com/",
        manualEntry: true,
      };
    default:
      return {
        url: "https://tools.tritoncontainer.com/tritoncontainer/unitStatus/list",
        manualEntry: true,
      };
  }
}

export function buildLtlUrl(fraktbrev: string): string {
  const no = encodeURIComponent(normalizeTrackingNumber(fraktbrev));
  return `https://transportsiden.no/ltrdk/Timpex.Server/Js/timpex.js.traffic.trace.client.v2/index.html?id=ltrdk&traceNo=${no}`;
}

export function buildUpsUrl(trackingNo: string): string {
  const no = encodeURIComponent(normalizeTrackingNumber(trackingNo));
  return `https://www.ups.com/track?tracknum=${no}&loc=en_US&requester=ST/trackdetails`;
}

export function buildLclUrl(bookingNo: string): string {
  const no = encodeURIComponent(normalizeTrackingNumber(bookingNo));
  return `https://www.ecuworldwide.com/tracktrace?blrefer=${no}`;
}

export function buildFclUrl(
  carrier: OceanCarrier,
  reference: string,
  refType: FclReferenceType,
): string {
  const ref = normalizeOceanDocumentReference(carrier, reference, refType);
  const encoded = encodeURIComponent(ref);

  switch (carrier) {
    case "maersk":
      // Ocean cargo tracking — avoid /tracking/parcel/... which Maersk picks
      // when the MAEU document prefix is left on booking/B/L numbers.
      return `https://www.maersk.com/tracking/${encoded}`;
    case "msc":
      return `https://www.msc.com/en/track-a-shipment?query=${encoded}`;
    case "hapag":
      if (refType === "container") {
        return `https://www.hapag-lloyd.com/en/online-business/track/track-by-container-solution.html?container=${encoded}`;
      }
      if (refType === "bl") {
        return `https://www.hapag-lloyd.com/en/online-business/track/track-by-booking-solution.html?blno=${encoded}`;
      }
      return `https://www.hapag-lloyd.com/en/online-business/track/track-by-booking-solution.html?booking=${encoded}`;
    case "cma":
      return `https://www.cma-cgm.com/ebusiness/tracking?search=${encoded}`;
    default:
      return `https://www.maersk.com/tracking/${encoded}`;
  }
}

/**
 * Normalize booking/B/L references per carrier MBL conventions.
 * Container numbers (4 letters + 7 digits) are left unchanged.
 *
 * Maersk: 9 digits (strip MAEU). MSC: keep MEDU…. Hapag: keep/ensure HLCU….
 * CMA CGM: 3 letters + 7 digits (strip CMDU if present).
 */
export function normalizeOceanDocumentReference(
  carrier: OceanCarrier,
  reference: string,
  refType: FclReferenceType,
): string {
  const ref = normalizeTrackingNumber(reference).toUpperCase();
  if (refType === "container" && looksLikeContainerNumber(ref)) {
    return ref;
  }

  switch (carrier) {
    case "maersk":
      if (ref.startsWith("MAEU") && ref.length > 4) return ref.slice(4);
      if (ref.startsWith("MAWB") && ref.length > 4) return ref.slice(4);
      return ref;
    case "msc":
      return ref;
    case "hapag": {
      // Hapag B/L field is prefilled with HLCU on their site.
      if (refType === "bl" && !ref.startsWith("HLCU") && !looksLikeContainerNumber(ref)) {
        return `HLCU${ref}`;
      }
      return ref;
    }
    case "cma":
      if (ref.startsWith("CMDU") && ref.length > 4) return ref.slice(4);
      return ref;
    default:
      return ref;
  }
}

/**
 * Detect ocean carrier from booking/B/L patterns used by SG's main lines.
 * Does not treat ISO container numbers as documents.
 */
export function detectOceanCarrierFromDocument(reference: string): OceanCarrier | null {
  const ref = normalizeTrackingNumber(reference).toUpperCase();
  if (looksLikeContainerNumber(ref)) return null;

  // Maersk: MAEU + 9 digits, or bare 9 digits when clearly document context
  if (/^MAEU\d{9}$/.test(ref) || /^MAEU\d+$/.test(ref)) return "maersk";

  // MSC: MEDU + 2 alphanumeric + 6 digits (e.g. MEDUA1234567 / MEDUAB123456)
  if (/^MEDU[A-Z0-9]{2}\d{6}$/.test(ref)) return "msc";
  if (/^MEDU[A-Z0-9]+\d+$/.test(ref)) return "msc";
  if (/^MSCU(?!\d{7}$)/.test(ref) && ref.length > 11) return "msc";

  // Hapag-Lloyd: HLCU + 2 letters + 1 alnum + 9 alnum
  if (/^HLCU[A-Z]{2}[A-Z0-9][A-Z0-9]{9}$/.test(ref)) return "hapag";
  if (/^HLCU[A-Z0-9]{12,}$/.test(ref)) return "hapag";

  // CMA CGM carrier code prefix on documents
  if (/^CMDU[A-Z]{3}\d{7}$/.test(ref) || /^CMDU[A-Z0-9]+$/.test(ref)) return "cma";
  // CMA body: 3 letters + 7 digits (avoid matching random short codes)
  if (/^[A-Z]{3}\d{7}$/.test(ref) && !ref.startsWith("MED") && !ref.startsWith("MAE")) {
    // Too ambiguous alone — only when user already chose CMA, not for auto-detect
  }

  return null;
}

/** @deprecated Use detectOceanCarrierFromDocument */
export function detectMaerskDocumentReference(reference: string): boolean {
  return detectOceanCarrierFromDocument(reference) === "maersk";
}

/** @deprecated Use normalizeOceanDocumentReference */
export function normalizeMaerskTrackingReference(
  reference: string,
  refType: FclReferenceType,
): string {
  return normalizeOceanDocumentReference("maersk", reference, refType);
}

export function formatAwbDisplay(awbDigits: string): string {
  const digits = awbDigitsOnly(awbDigits).slice(0, 11);
  if (digits.length < 11) return digits;
  return `${digits.slice(0, 3)}-${digits.slice(3)}`;
}

export function buildFlyfraktResult(awbInput: string): {
  ok: boolean;
  airlineName?: string;
  url?: string;
  message?: string;
  manualEntry?: boolean;
  awbDisplay?: string;
} {
  const digits = awbDigitsOnly(awbInput);
  if (digits.length < 11) {
    return {
      ok: false,
      message: "AWB-nummer skal normalt være 11 siffer (3 siffer flyselskap + 8 siffer).",
    };
  }

  const airline = findAirline(digits);
  if (!airline) {
    return {
      ok: false,
      message: `Ukjent flyselskap-prefiks (${digits.slice(0, 3)}). Ta kontakt med oss, så hjelper vi deg å spore sendingen.`,
    };
  }

  if (!airline.buildUrl) {
    return {
      ok: false,
      airlineName: airline.name,
      message: `AWB-prefiks ${airline.prefix} tilhører ${airline.name}. Vi har ikke direkte sporingslenke for dette selskapet ennå – ta kontakt med oss for hjelp.`,
    };
  }

  const awb = digits.slice(0, 11);
  return {
    ok: true,
    airlineName: airline.name,
    url: airline.buildUrl(awb),
    manualEntry: airline.manualEntry === true,
    awbDisplay: formatAwbDisplay(awb),
  };
}
