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
    description: "Spor med AWB (11 siffer) eller JetPak (JET-…).",
    placeholder: "f.eks. 117-12345675 eller JET-12345678",
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
  /** When manualEntry: copy only the 8-digit serial (without airline prefix). */
  manualCopySerialOnly?: boolean;
  /** Portal requires CAPTCHA after opening (AWB may still need pasting). */
  manualCaptcha?: boolean;
  /**
   * When set: open portal via POST (AWB prefilled server-side).
   * Only works if the carrier accepts cross-site POST (include ASP.NET fields when needed).
   */
  buildManualPostFields?: (awbDigits: string) => Record<string, string>;
  /**
   * Optional URL to open first (same window) before POST – e.g. set Language cookie.
   */
  manualPrepareUrl?: string;
};

/**
 * Airline AWB prefixes: SG history + carriers supported via pakkesporing.no tracking templates.
 * Names aligned with IATA Current Airline Members (3-digit code) where available.
 * buildUrl with AWB in the URL = deep-link (GET).
 * buildUrl + buildManualPostFields = open portal via POST with AWB prefilled.
 * buildUrl + manualEntry = opens portal; user pastes AWB (copied to clipboard).
 * buildUrl null = airline identified only; user is asked to contact us.
 */
export const airlinePrefixes: AirlineTracker[] = [
  { prefix: "001", name: "American Airlines", buildUrl: (awb) => `https://www.aacargo.com/mobile/tracking-details.html?awb=${awb}` },
  { prefix: "006", name: "Delta Air Lines", buildUrl: (awb) => `https://www.deltacargo.com/Cargo/trackShipment?awbNumber=${awb}` },
  { prefix: "014", name: "Air Canada", buildUrl: (awb) => `https://www.aircanada.com/cargo/tracking?awbnb=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "016", name: "United Airlines", buildUrl: (awb) => `https://www.unitedcargo.com/en/us/track/awb/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "018", name: "Juneyao Airlines", buildUrl: (awb) => `http://cargo.juneyaoair.com/NewWeb/NQueryFrameAwben.aspx?Billid=${awb}` },
  { prefix: "020", name: "Lufthansa Cargo", buildUrl: (awb) => `https://www.lufthansa-cargo.com/en/eservices/etracking/tracking/-/awb/${awb.slice(0, 3)}/${awb.slice(3)}` },
  { prefix: "023", name: "FedEx Express", buildUrl: (awb) => `https://www.fedex.com/fedextrack/?trknbr=${awb}` },
  { prefix: "027", name: "Alaska Airlines", buildUrl: (awb) => `https://alaska-icargo.ibsplc.aero/icargoportal/portal/trackshipments?&trkTxnValue=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "030", name: "Vueling", buildUrl: (awb) => `https://ui.tracking.iagcargo.com/en/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "038", name: "Hungary Airlines", buildUrl: (awb) => `https://utlink.com/waybill?reqData=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "044", name: "Aerolineas Argentinas", buildUrl: (awb) => `https://aerolineas.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=${awb.slice(0, 3)}&AWBNo=${awb.slice(3)}` },
  { prefix: "045", name: "LATAM Airlines Group", buildUrl: (awb) => `https://www.latamcargo.com/en/trackshipment?docNumber=${awb.slice(3)}&docPrefix=${awb.slice(0, 3)}` },
  { prefix: "047", name: "TAP Air Portugal", buildUrl: (awb) => `https://www.tapcargo.com/en/e-tracking-results?ciaCode=${awb.slice(0, 3)}&awb=${awb.slice(3)}` },
  { prefix: "053", name: "Aer Lingus", buildUrl: (awb) => `https://ui.tracking.iagcargo.com/en/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "055", name: "ITA Airways", buildUrl: (awb) => `https://booking.ita-airways-cargo.com/trackAndTrace?awbno=${awb}` },
  { prefix: "057", name: "Air France", buildUrl: (awb) => `https://www.afklcargo.com/mycargo/shipment/detail/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "061", name: "Air Seychelles", buildUrl: () => "https://fly.airseychelles.com/portals/cargotracker/", buildManualPostFields: (awb) => ({ "action": "track", "awb": awb, "UCCargoTracker1:btnTrace": "Track" }) },
  { prefix: "065", name: "Saudi Arabian Airlines", buildUrl: null },
  { prefix: "068", name: "LAM", buildUrl: () => "https://lam.margo.aero/MargoAWB/awb/tracking/mainPage?locale=en", buildManualPostFields: (awb) => ({ "issuingAirline": awb.slice(0, 3), "airwaybillNo": awb.slice(3) }) },
  { prefix: "071", name: "Ethiopian Airlines", buildUrl: (awb) => `https://cargo.ethiopianairlines.com/my-cargo/track-your-shipment?awbnumber=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "072", name: "Gulf Air", buildUrl: () => "https://ebooking.champ.aero/webtracking/gf/tracking.asp", buildManualPostFields: (awb) => ({ "Carrier": "GF", "Pfx": awb.slice(0, 3), "Shipment": awb.slice(3) }) },
  { prefix: "074", name: "KLM", buildUrl: (awb) => `https://www.afklcargo.com/mycargo/shipment/detail/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "075", name: "IBERIA", buildUrl: (awb) => `https://ui.tracking.iagcargo.com/en/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "076", name: "MEA", buildUrl: (awb) => `https://mea-icargo.ibsplc.aero/icargoportal/portal/trackshipments?trkTxnValue=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "077", name: "Egyptair", buildUrl: (awb) => `https://msres.cargoflash.com/Tracking/AWB/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "079", name: "Philippine Airlines", buildUrl: (awb) => `https://cargo.pal.com.ph/HtmlFiles/AWBTracking/AWBTracking.html?BasedOn=0&AWBNo=${awb.slice(3)}&CarrierCode=${awb.slice(0, 3)}` },
  { prefix: "080", name: "LOT Polish Airlines", buildUrl: null },
  { prefix: "081", name: "Qantas", buildUrl: (awb) => `https://freight.qantas.com/online-tracking.html?detailsAwb=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "083", name: "South African Airways", buildUrl: null },
  { prefix: "086", name: "Air New Zealand", buildUrl: (awb) => `https://www.airnewzealandcargo.com/self-service/track-and-trace?awb=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "098", name: "Air India", buildUrl: null },
  { prefix: "105", name: "Finnair", buildUrl: (awb) => `https://cargo.finnair.com/api/offerandorder/#/shipments/list?type=D&values=${awb}` },
  { prefix: "106", name: "Caribbean Airlines", buildUrl: null },
  { prefix: "108", name: "Icelandair", buildUrl: () => "https://track.champ.aero/fi", manualEntry: true },
  { prefix: "109", name: "Uganda Airlines", buildUrl: (awb) => `https://beta.fr8booking.com/trackAndTrace?userSchema=gsatier3&urlConfig=https%3A//fr8manage.app/&awbno=${awb}` },
  { prefix: "112", name: "China Cargo Airlines", buildUrl: (awb) => `https://www.eal-ceair.com/cargo-tracking.html?waybillNum=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "114", name: "EL AL", buildUrl: (awb) => `https://www.elalextra.net/info/awb.asp?aid=${awb.slice(0, 3)}&awb=${awb.slice(3)}` },
  { prefix: "115", name: "Air Serbia", buildUrl: (awb) => `https://cargo.airserbia.com/en/Track%20your%20shipment?airline-prefix=${awb.slice(0, 3)}&serial-number=${awb.slice(3)}` },
  { prefix: "117", name: "SAS", buildUrl: (awb) => `https://booking.sascargo.com/app/offerandorder/#/shipments/list?type=D&values=${awb}` },
  { prefix: "123", name: "Nauru Airlines", buildUrl: () => "https://nauruair.margo.aero/MargoAWB/awb/tracking/mainPage?locale=en", buildManualPostFields: (awb) => ({ "issuingAirline": awb.slice(0, 3), "airwaybillNo": awb.slice(3) }) },
  { prefix: "124", name: "Air Algérie", buildUrl: (awb) => `https://www.freight.aero/tracking.asp?carrier_dropdown_1=AH-124&prefix_1=${awb.slice(0, 3)}&awb_1=${awb.slice(3)}` },
  { prefix: "125", name: "British Airways", buildUrl: (awb) => `https://ui.tracking.iagcargo.com/en/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "126", name: "Garuda Indonesia", buildUrl: (awb) => `https://icms.garuda-indonesia.com/HtmlFiles/AWBTracking/AWBTracking.html?BasedOn=0&CarrierCode=${awb.slice(0, 3)}&AWBNo=${awb.slice(3)}` },
  { prefix: "127", name: "GOL Linhas Aereas", buildUrl: (awb) => `https://servicos.gollog.com.br/app/site/tracking?code=${awb}` },
  { prefix: "128", name: "Hong Kong Express Airways", buildUrl: null },
  { prefix: "131", name: "Japan Airlines", buildUrl: () => "https://www.cargoweb.jal.co.jp/JalCargoWeb/en/intlTracingResult.do", buildManualPostFields: (awb) => ({ searchType: "00", awbNoPrefix1: awb.slice(0, 3), awbNoSuffix1: awb.slice(3), houseNo: "" }) },
  { prefix: "141", name: "flydubai", buildUrl: (awb) => `https://prdonofz.accelya.io/app/offerandorder/#/shipments/list?type=D&values=${awb}` },
  { prefix: "145", name: "LATAM Cargo Chile", buildUrl: (awb) => `https://www.latamcargo.com/en/trackshipment?docNumber=${awb.slice(3)}&docPrefix=${awb.slice(0, 3)}` },
  { prefix: "146", name: "Air Corsica", buildUrl: (awb) => `https://www.wfs.aero/tracking-page/?trackingID=${awb.slice(0, 3)}-${awb.slice(3)}#tracking` },
  { prefix: "147", name: "Royal Air Maroc", buildUrl: (awb) => `https://ebooking.champ.aero/trace/trace.asp?Carrier=AT&Shipment_text=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "154", name: "Trust Forwarding", buildUrl: (awb) => `https://gfx.gln.com/tru-cph/ShipmentDetailPublic.aspx?OrgId=306928859&AWN=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "157", name: "Qatar Airways", buildUrl: (awb) => `https://www.qrcargo.com/s/track-your-shipment?documentType=MAWB&documentNumber=${awb.slice(3)}&documentPrefix=${awb.slice(0, 3)}` },
  { prefix: "160", name: "Cathay Pacific", buildUrl: null },
  { prefix: "161", name: "BidAir Cargo", buildUrl: () => "https://bidaircargo.co.za/tracking/", buildManualPostFields: (awb) => ({ "subject": awb }) },
  { prefix: "172", name: "Cargolux", buildUrl: (awb) => `https://www.cargolux.com/track-and-trace/#numbers=${awb.slice(0, 3)}-${awb.slice(3)}%2C` },
  { prefix: "175", name: "IBC Airways", buildUrl: () => "http://transtrackingsetup.magaya.net/AppServerSource/GetTransactionByNumber.ashx", buildManualPostFields: (awb) => ({ "NetworkId": "14534", "Type": "SHS", "Number": `${awb.slice(0, 3)}-${awb.slice(3)}`, "Username": "null", "Password": "null" }) },
  { prefix: "176", name: "Emirates", buildUrl: (awb) => `https://eskycargo.emirates.com/app/offerandorder/#/shipments/list?type=D&values=${awb}` },
  { prefix: "180", name: "Korean Air", buildUrl: () => "https://cargo.koreanair.com/en/tracking", manualEntry: true, manualCopySerialOnly: true },
  { prefix: "185", name: "Air Vance / Amadeus IT", buildUrl: null },
  { prefix: "189", name: "STARLUX Airlines", buildUrl: null },
  { prefix: "196", name: "Bridges Air Cargo", buildUrl: null },
  { prefix: "197", name: "Air Tanzania", buildUrl: (awb) => `https://cargocustomerportal.swissport.com/AgentAwbTracking?awb=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "198", name: "Afcom Cargo", buildUrl: (awb) => `https://booking.afcomcargo.com/FrmAWBTracking.aspx?AWBPrefix=${awb.slice(0, 3)}&AWBNo=${awb.slice(3)}` },
  { prefix: "199", name: "Tunisair", buildUrl: (awb) => `http://prdcgotu.mercator.com/skychain/app?PID=WEB01-10&doc_typ=AWB&awb_pre=${awb.slice(0, 3)}&awb_no=${awb.slice(3)}` },
  { prefix: "203", name: "Cebu Pacific", buildUrl: () => "https://cebu.smartkargo.com/FrmAWBTracking.aspx", buildManualPostFields: (awb) => ({ __EVENTTARGET: "", __EVENTARGUMENT: "", __VIEWSTATE: "", "txtPrefix": awb.slice(0, 3), "TextBoxAWBno": awb.slice(3), "ButtonGO": "Track" }) },
  { prefix: "205", name: "ANA", buildUrl: () => "https://www.anacargo.jp/en/int/", manualEntry: true, manualCopySerialOnly: true },
  { prefix: "214", name: "Pakistan International Airlines", buildUrl: (awb) => `https://www.freight.aero/tracking.asp?carrier_dropdown_1=PK-214&prefix_1=${awb.slice(0, 3)}&awb_1=${awb.slice(3)}` },
  { prefix: "216", name: "Nordwind Airlines", buildUrl: null },
  { prefix: "217", name: "Thai Airways International", buildUrl: (awb) => `https://chorus.thaicargo.com/skychain/app?PID=WEB01-10&doc_typ=AWB&awb_pre=${awb.slice(0, 3)}&awb_no=${awb.slice(3)}` },
  { prefix: "226", name: "Air Burkina", buildUrl: null },
  { prefix: "229", name: "Kuwait Airways", buildUrl: null },
  { prefix: "230", name: "COPA Airlines", buildUrl: (awb) => `https://copa.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=${awb.slice(0, 3)}&AWBNo=${awb.slice(3)}` },
  { prefix: "232", name: "Malaysia Airlines", buildUrl: (awb) => `https://www.maskargo.com/en/shipment-tracking.html?prefixNumber=${awb.slice(0, 3)}&awbNumber=${awb.slice(3)}` },
  { prefix: "233", name: "MSC Air Cargo", buildUrl: null },
  { prefix: "235", name: "Turkish Airlines", buildUrl: (awb) => `https://www.turkishcargo.com/en/cargo-tracking?awbPrefix=${awb.slice(0, 3)}&awbNumber=${awb.slice(3)}` },
  { prefix: "239", name: "Air Mauritius", buildUrl: (awb) => `https://www.freight.aero/tracking.asp?Carrier=MK&Pfx=${awb.slice(0, 3)}&Shipment=${awb.slice(3)}&Site=CargoWeb&Portlet=yes&userID=89df17cc1f9d` },
  { prefix: "242", name: "Stabo Air", buildUrl: (awb) => `https://www.freight.aero/tracking.asp?Shipment=${awb.slice(3)}&Carrier=4E&Pfx=${awb.slice(0, 3)}&Site=CargoWeb&Portlet=yes&userID=7f789e1f` },
  { prefix: "244", name: "Air Tahiti Nui", buildUrl: (awb) => `https://us.airtahitinui.com/tracking-results?awbs=${awb}` },
  { prefix: "250", name: "Uzbekistan Airways", buildUrl: (awb) => `https://ebooking.champ.aero/trace/trace.asp?Carrier=HY&Shipment_text=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "258", name: "Madagascar Airlines", buildUrl: null },
  { prefix: "260", name: "Fiji Airways", buildUrl: null },
  { prefix: "262", name: "Ural Airlines", buildUrl: null },
  { prefix: "268", name: "Allegiant Air", buildUrl: null },
  { prefix: "270", name: "Trans Mediterranean Airways", buildUrl: null },
  { prefix: "272", name: "Kalitta Air", buildUrl: () => "https://kalitta-cnm.com/tracktrace/", buildManualPostFields: (awb) => ({ "txtAWB": `${awb.slice(0, 3)}-${awb.slice(3)}`, "cmdSubmit": "Search", "txtSupportsdst": "true", "txtHemisphere": "n", "txtOffset": "60", "txtDstoffset": "120", "txtTZName": "Europe%2FBerlin" }) },
  { prefix: "273", name: "Rimbun Air", buildUrl: (awb) => `https://sales.rimbunapps.com/trace?awb=${awb}` },
  { prefix: "279", name: "JetBlue", buildUrl: null },
  { prefix: "281", name: "TAROM", buildUrl: (awb) => `https://www.freight.aero/tracking.asp?carrier_dropdown_1=RO-281&prefix_1=${awb.slice(0, 3)}&awb_1=${awb.slice(3)}` },
  { prefix: "282", name: "GFS", buildUrl: (awb) => `https://sww.enxt.solutions/enxt/iframe/track-and-trace/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "283", name: "Greater Bay Airlines", buildUrl: null },
  { prefix: "288", name: "Air Hong Kong", buildUrl: null },
  { prefix: "297", name: "China Airlines", buildUrl: () => "https://icargowebportal.china-airlines.com/icargoneoportal/app/main/#/app", manualEntry: true },
  { prefix: "309", name: "Red Wings Airlines", buildUrl: null },
  { prefix: "310", name: "Thai Lion Air", buildUrl: null },
  { prefix: "312", name: "IndiGo", buildUrl: () => "https://6ecargo.goindigo.in/FrmAWBTracking.aspx", buildManualPostFields: (awb) => ({ "txtPrefix": awb.slice(0, 3), "TextBoxAWBno": awb.slice(3), "ButtonGO": "Track" }) },
  { prefix: "319", name: "Fits Cargo", buildUrl: null },
  { prefix: "323", name: "Ukraine International Airlines", buildUrl: null },
  { prefix: "325", name: "Nile Air", buildUrl: null },
  { prefix: "328", name: "Norwegian Air Shuttle", buildUrl: () => "https://dy.smartkargo.com/FrmAWBTracking.aspx", buildManualPostFields: (awb) => ({ __EVENTTARGET: "", __EVENTARGUMENT: "", __VIEWSTATE: "", txtPrefix: awb.slice(0, 3), TextBoxAWBno: awb.slice(3), ButtonGO: "Track" }) },
  { prefix: "330", name: "Airline GEO SKY", buildUrl: null },
  { prefix: "344", name: "Lynden Air Cargo", buildUrl: (awb) => `https://ezc.lynden.com/tracking/#/shipmentinfo/results/LNBR/${awb.slice(3)}` },
  { prefix: "345", name: "Northern Air Cargo", buildUrl: null },
  { prefix: "350", name: "Air Premia", buildUrl: (awb) => `https://cargo.airpremia.com/en/track?awb=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "355", name: "Estafeta Cargo", buildUrl: () => "https://cargaareasitecorecms.azurewebsites.net/Rastreo-carga-aerea/", buildManualPostFields: (awb) => ({ "prefixAirTracking": awb.slice(0, 3), "serialAirTracking": awb.slice(3) }) },
  { prefix: "356", name: "Cargolux Italia", buildUrl: (awb) => `https://www.cargolux.com/track-and-trace/#numbers=${awb.slice(0, 3)}-${awb.slice(3)}%2C` },
  { prefix: "365", name: "FlexFlight", buildUrl: null },
  { prefix: "367", name: "Badr Airlines", buildUrl: null },
  { prefix: "369", name: "Atlas Air", buildUrl: (awb) => `https://jumpseat.atlasair.com/aa/tracktracehtml/TrackTrace.html?pe=${awb.slice(0, 3)}&se=${awb.slice(3)}` },
  { prefix: "378", name: "Cayman Airways", buildUrl: (awb) => `https://caymancargo.cargovision.ca/Tracking.aspx?cco=${awb.slice(0, 3)}&awb=${awb.slice(3)}` },
  { prefix: "381", name: "Air Cairo", buildUrl: (awb) => `https://mnctracking.awery.aero/#${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "390", name: "Aegean Airlines", buildUrl: (awb) => `https://en.about.aegeanair.com/sys/System/CargoTrack?prefix=${awb.slice(0, 3)}&number=${awb.slice(3)}` },
  { prefix: "395", name: "Corendon Airlines", buildUrl: null },
  { prefix: "396", name: "French Bee", buildUrl: (awb) => `https://www.wfs.aero/tracking-page/?trackingID=${awb.slice(0, 3)}-${awb.slice(3)}#tracking` },
  { prefix: "399", name: "Uniworld", buildUrl: (awb) => `https://uniworldtrack.cargolink.aero/tracking.html?awb=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "403", name: "Polar Air Cargo", buildUrl: (awb) => `https://www.polaraircargo.com/track-and-trace/?pe=${awb.slice(0, 3)}&se=${awb.slice(3)}` },
  { prefix: "406", name: "UPS Airlines", buildUrl: (awb) => `https://www.aircargo.ups.com/en-US/Tracking?awbPrefix=${awb.slice(0, 3)}&awbNumber=${awb.slice(3)}` },
  { prefix: "415", name: "PopulAir", buildUrl: null },
  { prefix: "417", name: "Bringer Air Cargo", buildUrl: (awb) => `https://bringer.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=${awb.slice(0, 3)}&AWBno=${awb.slice(3)}` },
  { prefix: "418", name: "Al Haya Aviation", buildUrl: (awb) => `https://alhayaaviation.logistaas.app/shipments/tracking?doc_no=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "421", name: "S7 Airlines", buildUrl: null },
  { prefix: "459", name: "RwandAir", buildUrl: () => "https://www.rwandair.com/cargotracking/cargo.php", buildManualPostFields: (awb) => ({ awb_code: awb.slice(0, 3), awb_number: awb.slice(3), btncargosubmit: "1" }) },
  { prefix: "463", name: "Silk Way Airlines", buildUrl: (awb) => `https://sww.enxt.solutions/enxt/iframe/track-and-trace/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "465", name: "Air Astana", buildUrl: (awb) => `https://www.freight.aero/tracking.asp?carrier_dropdown_1=KC-465&prefix_1=${awb.slice(0, 3)}&awb_1=${awb.slice(3)}` },
  { prefix: "466", name: "Air Inuit", buildUrl: (awb) => `https://www.airinuit.com/en/cargo/follow-up/shipment-tracking/your-shipment?id=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "474", name: "Binter Canarias", buildUrl: (awb) => `https://tracking.atlantiscargo.es/User/TrackView?AWB1=${awb.slice(0, 3)}&AWB=${awb.slice(3)}` },
  { prefix: "479", name: "Shenzhen Airlines", buildUrl: null },
  { prefix: "480", name: "Awesome Cargo", buildUrl: null },
  { prefix: "483", name: "Air Côte d’Ivoire", buildUrl: () => "https://aci.margo.aero/MargoAWB/awb/tracking/mainPage?locale=en", buildManualPostFields: (awb) => ({ "issuingAirline": awb.slice(0, 3), "airwaybillNo": awb.slice(3) }) },
  { prefix: "485", name: "Astral Aviation", buildUrl: null },
  { prefix: "486", name: "Jazeera Airways", buildUrl: null },
  { prefix: "488", name: "My Freighter", buildUrl: () => "https://parse.track-trace.com/", buildManualPostFields: (awb) => ({ "p_action": "https%3A%2F%2Ftracing.myfreighter.uz%2Fapi-track%2Fget_mawb%2F", "p_method": "get", "p_input": `waybill-code%3D${awb.slice(0, 3)}%26waybill-number%3D${awb.slice(3)}%26get_mawb%3Dok`, "p_parser": "myfreighter", "p_token": "a6b951362dad388b6b39f1039265c9efa9dc391c59879b0860db6b021556108d" }) },
  { prefix: "489", name: "Cargojet Airways", buildUrl: () => "https://km.cargojet.com/ords/f?p=102:857", manualEntry: true, manualCopySerialOnly: true },
  { prefix: "490", name: "Air Senegal", buildUrl: () => "https://airsenegal.smartkargo.com/FrmAWBTracking.aspx", buildManualPostFields: (awb) => ({ "txtPrefix": awb.slice(0, 3), "TextBoxAWBno": awb.slice(3), "ButtonGO": "Track" }) },
  { prefix: "501", name: "Silk Way West Airlines", buildUrl: (awb) => `https://sww.enxt.solutions/enxt/iframe/track-and-trace/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "503", name: "Corendon Dutch Airlines", buildUrl: (awb) => `https://pathfinder.digitalfactory.aero/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "506", name: "Norse Atlantic Airways", buildUrl: (awb) => `https://norsetracking.awery.com/#${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "512", name: "Royal Jordanian", buildUrl: null },
  { prefix: "516", name: "Akasa Air", buildUrl: (awb) => `https://cargo.akasaair.com/FrmAWBTracking.aspx?AWBPrefix=${awb.slice(0, 3)}&AWBNo=${awb.slice(3)}` },
  { prefix: "518", name: "Canadian North", buildUrl: null },
  { prefix: "526", name: "Southwest Airlines", buildUrl: (awb) => `https://www.swacargo.com/swacargo_com_ui/tracking-details?trackingId=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "533", name: "Air Sunshine", buildUrl: null },
  { prefix: "542", name: "Turkmenistan Airlines", buildUrl: null },
  { prefix: "543", name: "Aercaribe Cargo", buildUrl: (awb) => `https://pathfinder.digitalfactory.aero/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "559", name: "Overland Airways", buildUrl: null },
  { prefix: "560", name: "flyadeal", buildUrl: null },
  { prefix: "567", name: "7Air Cargo", buildUrl: (awb) => `https://clinkdms.cargolink.aero/track7Air/index.asp?awbno=${awb}` },
  { prefix: "570", name: "Air Comores", buildUrl: null },
  { prefix: "574", name: "AlliedAir", buildUrl: (awb) => `https://network-airline.com/track-and-trace/?consignment-number=${awb}` },
  { prefix: "575", name: "Coyne Aviation", buildUrl: (awb) => `https://beta.fr8booking.com/trackAndTrace?userSchema=gsatier3&urlConfig=${encodeURIComponent("https://coyne.fr8manage.app/")}&awbno=${awb}` },
  { prefix: "577", name: "Azul Brazilian Airlines", buildUrl: (awb) => `https://azulcargoexpress.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=${awb.slice(0, 3)}&AWBno=${awb.slice(3)}` },
  { prefix: "581", name: "Chair Airlines", buildUrl: null },
  { prefix: "598", name: "Aurora Airlines", buildUrl: (awb) => `https://www.flyaurora.ru/static/services/additional/trucking/ajax.php?number=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "603", name: "SriLankan Airlines", buildUrl: null },
  { prefix: "605", name: "SKY Airline", buildUrl: (awb) => `https://sky.icargotrk.com/iCargo/SKY/Core/WebPages/Tracking/UI_TrackingClient.aspx?awbnumber=${awb.slice(3)}&airlineprefix=${awb.slice(0, 3)}&lang=es` },
  { prefix: "607", name: "Etihad Airways", buildUrl: (awb) => `https://www.etihadcargo.com/en/e-services/shipment-tracking?awb=${awb}` },
  { prefix: "610", name: "Air Astra", buildUrl: null },
  { prefix: "615", name: "European Air Transport", buildUrl: (awb) => `https://aviationcargo.dhl.com/track/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "617", name: "TUIfly", buildUrl: (awb) => `https://pathfinder.digitalfactory.aero/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "618", name: "Singapore Airlines", buildUrl: () => "https://www.siacargo.com/e-services/quicksearch_public/", manualEntry: true },
  { prefix: "622", name: "Calm Air", buildUrl: null },
  { prefix: "624", name: "Pegasus Airlines", buildUrl: null },
  { prefix: "626", name: "PNG Air", buildUrl: null },
  { prefix: "630", name: "Sunclass Airlines", buildUrl: (awb) => `https://pathfinder.digitalfactory.aero/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "631", name: "Air Greenland", buildUrl: () => "https://parse.track-trace.com/", buildManualPostFields: (awb) => ({ "p_action": "https%3A%2F%2Fwww.airgreenland.com%2Fumbraco%2Fapi%2FCalculator%2Ftrack", "p_method": "get", "p_input": `awbNumber%3D${awb}%26cargoLanguageId%3Den%26action%3Dget`, "p_parser": "airgreenland¤https://www.airgreenland.com/fragt/tracking-awb/", "p_token": "8c7ee4decdc6ad8dc794eb5861f108f63063bef13810a8c05b93631a1a67dcef" }) },
  { prefix: "632", name: "Perimeter", buildUrl: null },
  { prefix: "643", name: "KM Malta Airlines", buildUrl: (awb) => `https://network-airline.com/track-and-trace/?consignment-number=${awb}` },
  { prefix: "645", name: "SAC (K) Limited", buildUrl: null },
  { prefix: "649", name: "Air Transat", buildUrl: null },
  { prefix: "656", name: "Air Niugini", buildUrl: () => "https://prdcgopx.mercator.com/skychain/app", buildManualPostFields: (awb) => ({ "service": "direct/1/nwp:Trackshipmt/trackForm", "sp": "S1", "Form1": "selectDoctype,txtPrefix,txtNumber,txtJrn,txtAWBPrefix,txtAWBNumber,txtAWBPrefix$0,txtAWBNumber$0,txtAWBPrefix$1,txtAWBNumber$1,txtAWBPrefix$2,txtAWBNumber$2,txtAWBPrefix$3,txtAWBNumber$3,txtAWBPrefix$4,txtAWBNumber$4,txtAWBPrefix$5,txtAWBNumber$5,txtAWBPrefix$6,txtAWBNumber$6,txtAWBPrefix$7,txtAWBNumber$7,$JSubmit,$JSubmit$0,$JSubmit$1,$JSubmit$2,$FormConditional,$FormConditional$0,pageSize,listSize,advSearch,trackViewHdn", "trackForm_hdnLastPermissionCheck": "Y", "hdnFormID": "trackForm", "excludeServerValidation": "true", "$FormConditional": "F", "$FormConditional$0": "F", "pageSize": "10", "listSize": "0", "advSearch": "F", "trackViewHdn": "tableRadio", "selectDoctype": "AWB", "txtPrefix": awb.slice(0, 3), "txtNumber": awb.slice(3), "txtAWBPrefix": "105", "txtAWBPrefix$0": "105", "txtAWBPrefix$1": "105", "txtAWBPrefix$2": "105", "txtAWBPrefix$3": "105", "txtAWBPrefix$4": "105", "txtAWBPrefix$5": "105", "txtAWBPrefix$6": "105", "txtAWBPrefix$7": "105", "trackView": "tableRadio", "$JSubmit$0": "Track" }) },
  { prefix: "657", name: "Air Baltic", buildUrl: (awb) => `https://cargotrack.airbaltic.com/?p=${awb.slice(0, 3)}&s=${awb.slice(3)}` },
  { prefix: "658", name: "Airmax Cargo", buildUrl: null },
  { prefix: "663", name: "Plus Ultra", buildUrl: (awb) => `https://swgsatracking.awery.com/#${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "666", name: "Fuzhou Airlines", buildUrl: () => "https://www.hnacargo.com/Portal2/AwbSearch.aspx", buildManualPostFields: (awb) => ({ "hdAwbCode": `${awb.slice(0, 3)}-${awb.slice(3)},` }) },
  { prefix: "672", name: "Royal Brunei", buildUrl: () => "https://www.flyroyalbrunei.com/rba/cargospot/index.php", buildManualPostFields: (awb) => ({ "awb": awb.slice(3), "button": "Search", "cd": awb.slice(0, 3) }) },
  { prefix: "675", name: "Air Macau", buildUrl: (awb) => `https://www.infoccsp.com/iportal/servicecenter/cargotracking.aspx?ID=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "687", name: "Aloha Air Cargo", buildUrl: () => "https://www.alohaaircargo.com/wp-content/themes/avantage-aac/awb.php", buildManualPostFields: (awb) => ({ "airwaybillnumber": awb }) },
  { prefix: "692", name: "LATAM Airlines Paraguay", buildUrl: null },
  { prefix: "695", name: "EVA Air", buildUrl: (awb) => `https://www.brcargo.com/NEC_WEB/Tracking/QuickTracking/IndexJump?Prefix=${awb.slice(0, 3)}&AWBNo=${awb.slice(3)}` },
  { prefix: "696", name: "Cabo Verde Airlines", buildUrl: (awb) => `https://www.wfs.aero/tracking-page/?trackingID=${awb.slice(0, 3)}-${awb.slice(3)}#tracking` },
  { prefix: "700", name: "Challenge Airlines (IL)", buildUrl: () => "https://www.challenge-group.com/tracking/", buildManualPostFields: (awb) => ({ "id[1][Pre]": awb.slice(0, 3), "id[1][AWB]": awb.slice(3), "send-tracking": "Track" }) },
  { prefix: "701", name: "Widerøe", buildUrl: (awb) => `https://wf.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=${awb.slice(0, 3)}&AWBNo=${awb.slice(3)}` },
  { prefix: "702", name: "Jambojet", buildUrl: (awb) => `https://jmcargo.cargoflash.com/Tracking/AWB/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "703", name: "Neos", buildUrl: () => "https://world-cs.com/en#tracking-form", manualEntry: true },
  { prefix: "706", name: "Kenya Airways", buildUrl: (awb) => `https://www.kqcargo.com/en/track-and-trace/?awb=${awb}` },
  { prefix: "716", name: "MNG Airlines", buildUrl: (awb) => `https://www.mngairlines.com/api/externalrequest/freighttrack?mawbNumber=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "718", name: "Jin Air", buildUrl: null },
  { prefix: "719", name: "Benin Golf Air", buildUrl: null },
  { prefix: "722", name: "Trinity Airways", buildUrl: null },
  { prefix: "724", name: "SWISS", buildUrl: (awb) => `https://offerandorder.swissworldcargo.com/app/offerandorder/#/shipments/list?type=D&values=${awb}` },
  { prefix: "729", name: "Avianca Cargo", buildUrl: (awb) => `https://cargoapps.aviancacargo.com/#/e-tracking/details/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "738", name: "Vietnam Airlines", buildUrl: null },
  { prefix: "743", name: "Air Do", buildUrl: null },
  { prefix: "744", name: "Challenge Airlines (BE)", buildUrl: () => "https://www.challenge-group.com/tracking/", buildManualPostFields: (awb) => ({ "id[1][Pre]": awb.slice(0, 3), "id[1][AWB]": awb.slice(3), "send-tracking": "Track" }) },
  { prefix: "749", name: "Airlink", buildUrl: null },
  { prefix: "752", name: "Challenge Airlines MT", buildUrl: () => "https://www.challenge-group.com/tracking/", buildManualPostFields: (awb) => ({ "id[1][Pre]": awb.slice(0, 3), "id[1][AWB]": awb.slice(3), "send-tracking": "Track" }) },
  { prefix: "756", name: "ASL Airlines Belgium", buildUrl: null },
  { prefix: "759", name: "Vietravel Airlines", buildUrl: (awb) => `https://cargo.vietravelairlines.vn/trackawb?billno=${awb}` },
  { prefix: "767", name: "Atlantic Airways", buildUrl: null },
  { prefix: "771", name: "Azerbaijan Airlines", buildUrl: null },
  { prefix: "772", name: "Fly Jinnah", buildUrl: null },
  { prefix: "775", name: "SpiceJet", buildUrl: (awb) => `https://www.spicexpress.com/track-shipment?trackingData=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "778", name: "Pelita air", buildUrl: null },
  { prefix: "783", name: "Iberojet Airlines", buildUrl: (awb) => `https://swgsatracking.awery.com/#${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "784", name: "China Southern Airlines", buildUrl: (awb) => `https://tang.csair.com/EN/WebFace/Tang.WebFace.Cargo/AgentAwbBrower.aspx?AwbPrefix=${awb.slice(0, 3)}&AwbNo=${awb.slice(3)}&menuID=1&imgid=4708f7bd8ac94dec8993132f7903845` },
  { prefix: "795", name: "Virgin Australia", buildUrl: (awb) => `https://va-icargo.ibsplc.aero/icargoportal/portal/trackshipments?trkTxnValue=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "797", name: "Smartwings", buildUrl: null },
  { prefix: "805", name: "Mercury Americas", buildUrl: (awb) => `https://gsaforce.com/tracking/?awbprefix=${awb.slice(0, 3)}&awbnumber=${awb.slice(3)}#trackForm` },
  { prefix: "806", name: "Jeju Air", buildUrl: (awb) => `https://cargo.jejuair.net/cargo/rsvflight/newTrackFlightList.do?routeType=I&airlinePfx=${awb.slice(0, 3)}&awbSn=${awb.slice(3)}` },
  { prefix: "810", name: "Amerijet International", buildUrl: null },
  { prefix: "814", name: "AirBridgeCargo", buildUrl: null },
  { prefix: "816", name: "Batik Air Malaysia", buildUrl: null },
  { prefix: "817", name: "South American Airw.", buildUrl: () => "https://tracker.southamericanairways.com/process/track.php", buildManualPostFields: (awb) => ({ "mawb1": awb.slice(0, 3), "mawb2": "1234", "mawb3": "5675" }) },
  { prefix: "825", name: "World2Fly", buildUrl: null },
  { prefix: "826", name: "Tianjin Airlines", buildUrl: () => "https://www.hnacargo.com/Portal2/AwbSearch.aspx", buildManualPostFields: (awb) => ({ "hdAwbCode": `${awb.slice(0, 3)}-${awb.slice(3)},` }) },
  { prefix: "827", name: "Atlantis ACI", buildUrl: (awb) => `https://pathfinder.digitalfactory.aero/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "829", name: "Bangkok Airways", buildUrl: (awb) => `https://pg-icargo.ibsplc.aero/icargoportal/portal/trackshipments?trkTxnValue=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "831", name: "Croatia Airlines", buildUrl: (awb) => `https://ebooking.champ.aero/trace/trace.asp?Carrier=OU&Shipment_text=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "838", name: "WestJet", buildUrl: (awb) => `https://westjet.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=${awb.slice(0, 3)}&AWBNo=${awb.slice(3)}` },
  { prefix: "839", name: "Eastar Jet", buildUrl: (awb) => `https://pathfinder.digitalfactory.aero/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "840", name: "Everts Air", buildUrl: (awb) => `https://apps1.tflite.com/Public/EVT/Freight/Tracking/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "847", name: "West Air", buildUrl: () => "https://www.hnacargo.com/Portal2/AwbSearch.aspx", buildManualPostFields: (awb) => ({ "hdAwbCode": `${awb.slice(0, 3)}-${awb.slice(3)},` }) },
  { prefix: "856", name: "Air Changan", buildUrl: () => "https://www.hnacargo.com/Portal2/AwbSearch.aspx", buildManualPostFields: (awb) => ({ "hdAwbCode": `${awb.slice(0, 3)}-${awb.slice(3)},` }) },
  { prefix: "859", name: "Lucky Air", buildUrl: () => "https://www.hnacargo.com/Portal2/AwbSearch.aspx", buildManualPostFields: (awb) => ({ "hdAwbCode": `${awb.slice(0, 3)}-${awb.slice(3)},` }) },
  { prefix: "860", name: "YTO Cargo Airlines", buildUrl: () => "https://parse.track-trace.com/", buildManualPostFields: (awb) => ({ "p_action": "https%3A%2F%2Fwww.ytoglobal.com%2Fapi%2FytoApi%2FgetPlan", "p_method": "get", "p_input": `shipmentId%3D${awb.slice(0, 3)}-${awb.slice(3)}%26transportMode%3Dair`, "p_parser": "yto¤https://www.ytoglobal.com/service/flight/", "p_token": "1fb87ec5512d20e7957224a546291d88363b710565bbc3c939a141a242f377f1" }) },
  { prefix: "863", name: "Thai Vietjet Air", buildUrl: (awb) => `https://pathfinder.digitalfactory.aero/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "865", name: "MasAir", buildUrl: (awb) => `https://masair.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=${awb.slice(0, 3)}&AWBNo=${awb.slice(3)}` },
  { prefix: "871", name: "Suparna Airlines", buildUrl: () => "https://www.hnacargo.com/Portal2/AwbSearch.aspx", buildManualPostFields: (awb) => ({ "hdAwbCode": `${awb.slice(0, 3)}-${awb.slice(3)},` }) },
  { prefix: "872", name: "GX Airlines", buildUrl: () => "https://www.hnacargo.com/Portal2/AwbSearch.aspx", buildManualPostFields: (awb) => ({ "hdAwbCode": `${awb.slice(0, 3)}-${awb.slice(3)},` }) },
  { prefix: "873", name: "Avianca Cargo Mexico", buildUrl: (awb) => `https://aerounion-icargo.ibsplc.aero/icargoauportal/portal/trackshipments?&trkTxnValue=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "876", name: "Sichuan Airlines", buildUrl: null },
  { prefix: "880", name: "Hainan Airlines", buildUrl: () => "https://www.hnacargo.com/UpdateLang.aspx?lang=en-US&url=%2FPortal2%2FAwbSearch.aspx", manualEntry: true, manualCaptcha: true },
  { prefix: "881", name: "Condor", buildUrl: (awb) => `https://pathfinder.digitalfactory.aero/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "898", name: "Capital Airlines", buildUrl: () => "https://www.hnacargo.com/UpdateLang.aspx?lang=en-US&url=%2FPortal2%2FAwbSearch.aspx", manualEntry: true, manualCaptcha: true },
  { prefix: "901", name: "TAB Cargo", buildUrl: () => "https://tabairlines.com/track.php", buildManualPostFields: (awb) => ({ awb }) },
  { prefix: "905", name: "Pacific Coastal Airlines", buildUrl: null },
  { prefix: "910", name: "Oman Air", buildUrl: (awb) => `https://omanair.smartkargo.com/FrmAWBTracking.aspx?AWBPrefix=${awb.slice(0, 3)}&AWBno=${awb.slice(3)}` },
  { prefix: "920", name: "Super Air Jet", buildUrl: null },
  { prefix: "921", name: "SF Airlines", buildUrl: () => "https://www.sf-airlines.com/en/track/index.html", manualEntry: true },
  { prefix: "923", name: "Corsair International", buildUrl: (awb) => `https://pathfinder.digitalfactory.aero/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "932", name: "Virgin Atlantic", buildUrl: (awb) => `https://myvs.virginatlanticcargo.com/app/offerandorder/#/shipments/list?type=D&values=${awb}` },
  { prefix: "933", name: "Nippon Cargo Airlines", buildUrl: (awb) => `https://www.nca.aero/icargoportal/portal/trackshipments?trkTxnValue=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "938", name: "Batik Air", buildUrl: null },
  { prefix: "959", name: "Central Airlines", buildUrl: (awb) => `https://track.yunfreight.com/shipment-tracking?id=${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "967", name: "PAL Airlines", buildUrl: (awb) => `https://palairlines.ca/waybill/?awb_no=${awb.slice(3)}&Lang=en` },
  { prefix: "978", name: "Vietjet", buildUrl: () => "https://cargo.vietjetair.com/FrmAWBTracking.aspx", buildManualPostFields: (awb) => ({ __EVENTTARGET: "", __EVENTARGUMENT: "", __VIEWSTATE: "", txtPrefix: awb.slice(0, 3), TextBoxAWBno: awb.slice(3), ButtonGO: "Track" }) },
  { prefix: "986", name: "Maldivian", buildUrl: (awb) => `https://cargo.maldivian.aero/Tracking/AWB/${awb.slice(0, 3)}-${awb.slice(3)}` },
  { prefix: "988", name: "Asiana Airlines", buildUrl: null },
  { prefix: "990", name: "Lion Air", buildUrl: null },
  { prefix: "991", name: "Daallo Express", buildUrl: null },
  { prefix: "994", name: "AIRZETA", buildUrl: null },
  { prefix: "996", name: "Air Europa", buildUrl: () => "https://www.uxtracking.com/tracking.asp", buildManualPostFields: (awb) => ({ "prefix": awb.slice(0, 3), "Serial": awb.slice(3) }) },
  { prefix: "997", name: "Biman Bangladesh Airlines", buildUrl: (awb) => `https://www.freight.aero/tracking.asp?carrier_dropdown_1=BG-997&prefix_1=${awb.slice(0, 3)}&awb_1=${awb.slice(3)}` },
  { prefix: "999", name: "Air China", buildUrl: (awb) => `https://www.airchinacargo.com/cargo_en/gzcx/hkyd/list/index_pc.html?waybillPrefix=${awb.slice(0, 3)}&waybillContent=${awb.slice(3)}` },
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

/** JetPak AWB: JET-12345678 (hyphen optional). */
export function parseJetpakAwb(input: string): string | null {
  const normalized = input.trim().toUpperCase().replace(/\s+/g, "");
  const match = /^JET-?(\d{6,12})$/.exec(normalized);
  if (!match) return null;
  return `JET-${match[1]}`;
}

export function buildJetpakUrl(jetpakAwb: string): string {
  return `https://my.jetpak.com/app/nb-no/track/awb/${encodeURIComponent(jetpakAwb)}`;
}

export function buildFlyfraktResult(awbInput: string): {
  ok: boolean;
  airlineName?: string;
  url?: string;
  message?: string;
  manualEntry?: boolean;
  awbDisplay?: string;
  awbCopyValue?: string;
  manualCopySerialOnly?: boolean;
  manualPostFields?: Record<string, string>;
  manualPrepareUrl?: string;
  manualCaptcha?: boolean;
} {
  const jetpakAwb = parseJetpakAwb(awbInput);
  if (jetpakAwb) {
    return {
      ok: true,
      airlineName: "JetPak",
      url: buildJetpakUrl(jetpakAwb),
      awbDisplay: jetpakAwb,
      awbCopyValue: jetpakAwb,
    };
  }

  const digits = awbDigitsOnly(awbInput);
  if (digits.length < 11) {
    return {
      ok: false,
      message:
        "Oppgi AWB med 11 siffer (3 + 8), eller JetPak-nummer som JET-12345678.",
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
  const serialOnly = airline.manualCopySerialOnly === true;
  const awbDisplay = formatAwbDisplay(awb);
  const manualPostFields = airline.buildManualPostFields?.(awb);
  return {
    ok: true,
    airlineName: airline.name,
    url: airline.buildUrl(awb),
    manualEntry: airline.manualEntry === true,
    awbDisplay,
    awbCopyValue: serialOnly ? awb.slice(3) : awbDisplay,
    manualCopySerialOnly: serialOnly,
    manualPostFields,
    manualPrepareUrl: airline.manualPrepareUrl,
    manualCaptcha: airline.manualCaptcha === true,
  };
}
