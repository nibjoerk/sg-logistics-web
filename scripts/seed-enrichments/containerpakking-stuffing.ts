/**
 * Full-body enrichment for the containerpakking-stuffing mirror.
 * Source: src/pages/kjekt-a-vite/sjofrakt/containerpakking-stuffing/index.astro
 */

type Block = Record<string, unknown>;

function key() {
  return Math.random().toString(16).slice(2, 14);
}

function textBlock(text: string, style: "normal" | "h2" | "h3" = "normal"): Block {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{_type: "span", _key: key(), text, marks: []}],
  };
}

function paragraphsToBlocks(text: string): Block[] {
  return text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => textBlock(part.replace(/\n/g, " "), "normal"));
}

const quickRules = [
  "Fordel vekten jevnt over containerbunnen og unngå tunge punktlaster.",
  "Legg tungt gods lavt og sentrert. Ikke stable tungt gods oppå lett eller svakt gods.",
  "Unngå hulrom. Fyll mellomrom med egnet stuvemateriale, airbags eller treverk.",
  "Sikre lasten mot bevegelse i alle retninger, også sideveis og bakover mot dørene.",
  "Hold vått, luktende, støvende eller skarpt gods adskilt fra sensitivt gods.",
  "Kontroller containeren før lasting og etter at den er ferdig lastet.",
  "Dokumenter lastingen med bilder før, under og etter stuffing.",
];

const preCheck = [
  "Containeren skal være tørr, ren, luktfri og uten rester fra tidligere last.",
  "Sjekk at vegger, tak, gulv og dører ikke har hull, sprekker eller skader.",
  "Lukk dørene fra innsiden-testen: kommer det lys inn, kan det også komme vann inn.",
  "Fjern gamle merker og faresedler som ikke gjelder den nye lasten.",
  "Kontroller at dører, låsestenger og pakninger fungerer som de skal.",
  "For spesialcontainer, sjekk også presenning, takbuer, flatrack-ender eller reefer-innstillinger.",
];

const ctuChoices = [
  "Standard dry container passer for tørt stykkgods som tåler lukket container og normal ventilasjon.",
  "LCL brukes når godset sendes sammen med andre avsendere. Da må hvert kolli tåle terminalhåndtering, konsolidering og stuing sammen med annet gods.",
  "Open top kan være riktig når godset må lastes ovenfra eller er for høyt for dørene.",
  "Flatrack brukes ofte til tungt, bredt eller høyt gods som ikke passer i en vanlig container.",
  "Reefer brukes når temperaturen må kontrolleres under transport.",
  "Breakbulk eller prosjektlast kan være bedre enn container hvis godset er svært tungt, langt, skjørt eller vanskelig å sikre forsvarlig.",
];

const protectionMethods = [
  "Bruk robust ytre emballasje: trekasse, kraftig kartong, pallekarm, komposittkasse eller spesialbygget ramme.",
  "Beskytt mot fukt med plastliner, barrierefolie, krympefolie, vanntett dekke eller annen egnet fuktsperre.",
  "Bruk tørremiddel når kondens eller høy luftfuktighet kan skade godset.",
  "Beskytt metall og maskiner mot korrosjon med VCI, olje, voks, overflatebehandling eller annen konservering.",
  "Bygg innvendig avstiving, blokkering, bracing eller skum slik at varen ikke kan bevege seg i emballasjen.",
  "Sørg for at emballasjen tåler surring, stempling, løft og håndtering uten å kollapse.",
];

const markings = [
  "Mottaker, avsender, kollinummer og referanse må være tydelig.",
  "Håndteringssymboler bør brukes for skjørt gods, rett side opp, tørrholdes, tyngdepunkt eller løftepunkter.",
  "Treemballasje til eksport må vurderes mot ISPM 15-krav.",
  "Farlig gods må merkes etter IMDG, ADR eller IATA der dette er relevant.",
  "Vekt, tyngdepunkt og løfteanvisninger bør fremgå på tungt eller uvanlig gods.",
];

const cargoTypes = [
  {
    title: "Kartonger, kasser og trekasser",
    text:
      "Stuv så tett og jevnt som mulig. Ved lavere fyllingsgrad bør godset bygges opp i stabile blokker og sikres rad for rad. Svake kartonger må ikke stå nederst under høy belastning.",
  },
  {
    title: "Palletert gods",
    text:
      "Paller bør være stabile, surret eller plastet og helst dekke pallens flate. Europaller fyller ikke alltid containerbredden perfekt, så hulrom må ofte fylles eller sikres.",
  },
  {
    title: "Fat, kanner og IBC",
    text:
      "Last ikke lekkende kolli. Fat bør normalt stå oppreist, tett mot hverandre og med sikring i dørområdet. Mellomlegg kan være nødvendig mellom lag.",
  },
  {
    title: "Sekker og baller",
    text:
      "Sekker må stables slik at de låser hverandre og ikke sklir ved sjøbevegelse. Plastsekker har lav friksjon og bør ofte sikres ekstra.",
  },
  {
    title: "Ruller, coils og stål",
    text:
      "Kontroller punktbelastning og bruk egnet bedding, anti-skli og sikring. Tunge coils og stålplater krever ofte spesialvurdering og kan måtte gå på flatrack.",
  },
  {
    title: "Væsker og fuktig gods",
    text:
      "Væsker bør som hovedregel gå i tank eller egnet emballasje. Fuktig gods må skilles fra tørt gods, og containeren må beskyttes mot lekkasje og lukt.",
  },
];

export function containerpakkingStuffingEnrichment(): Block[] {
  return [
    {
      _type: "callout",
      _key: key(),
      tone: "info",
      label: "Kort sagt",
      text: [
        textBlock(
          "Gods til sjøtransport må pakkes slik at det tåler både selve reisen og håndteringen før og etter sjøtransporten. Dette gjelder både full container, LCL og annen sjøfrakt.",
        ),
      ],
    },
    textBlock("Hovedregelen ved stuffing av container", "h2"),
    ...paragraphsToBlocks(
      "Når dørene er lukket, kan lasten normalt ikke kontrolleres eller etterstrammes før containeren er fremme. Derfor må all sikring være riktig utført før avgang. Lasten må tåle både akselerasjon, bremsing, vibrasjoner, løft, krenging og sjøbevegelser.\n\nVed LCL er det ikke avsender som disponerer hele containeren, men emballasjekravet blir ikke mindre av den grunn. Hvert kolli må tåle terminalhåndtering, samlasting, flytting, stabling og sikring sammen med annet gods.\n\nMålet er å oppnå en stabil lastblokk med god vektfordeling, minst mulig hulrom og riktig sikring mot bevegelse i alle retninger.",
    ),
    {
      _type: "checklist",
      _key: key(),
      heading: "Huskeregler",
      items: quickRules,
    },
    textBlock("Hva betyr seaworthy packing?", "h2"),
    ...paragraphsToBlocks(
      "Seaworthy packing betyr at emballasjen er egnet for sjøtransportens belastninger, ikke bare for vanlig lager- eller biltransport. Det finnes ikke én universell produktstandard som alene definerer sjødyktig emballering. I praksis må emballasjen gi tilstrekkelig beskyttelse mot fukt, kondens, salt luft, temperatursvingninger, omlasting, løft, vibrasjoner og lang transporttid.\n\nBegrepet er relevant både ved FCL, LCL, breakbulk, flatrack og prosjektlast. Forskjellen er først og fremst hvem som laster containeren og hvor mye kontroll avsender har over resten av lasten rundt sitt eget gods.\n\nEmballasjen skal beskytte varen, men den skal også gjøre godset mulig å håndtere, stue, sikre, merke og dokumentere på en trygg måte.",
    ),
    {
      _type: "links",
      _key: key(),
      items: [
        {
          _type: "link",
          _key: key(),
          label: "Les mer: seaworthy packing og sjødyktig emballering",
          href: "/kjekt-a-vite/sjofrakt/seaworthy-packing",
        },
      ],
    },
    textBlock("Velg riktig container eller CTU", "h2"),
    ...paragraphsToBlocks(
      "Før emballasje og lastplan bestemmes, må man velge riktig lastbærer. CTU betyr cargo transport unit og kan være container, flatrack, plattform, trailer, vogn eller annen transportenhet.",
    ),
    {
      _type: "checklist",
      _key: key(),
      heading: "Valg av CTU",
      items: ctuChoices,
    },
    {
      _type: "links",
      _key: key(),
      items: [
        {
          _type: "link",
          _key: key(),
          label: "Se containerguiden for typer, mål og nyttelast",
          href: "/kjekt-a-vite/containerguide",
        },
      ],
    },
    textBlock("Begrepene VGM og tara", "h2"),
    ...paragraphsToBlocks(
      "Når en container skal med sjøtransport, er det viktig å skille mellom varens vekt, emballasje, sikringsmateriell og selve containerens egenvekt.",
    ),
    {
      _type: "factTiles",
      _key: key(),
      items: [
        {
          _type: "fact",
          _key: key(),
          label: "VGM",
          value:
            "Verified Gross Mass — verifisert bruttovekt for ferdigpakket container: gods, emballasje, paller, dunnage, sikringsmateriell og containerens egenvekt.",
        },
        {
          _type: "fact",
          _key: key(),
          label: "Tara",
          value:
            "Containerens egenvekt uten last. Den står normalt på containerdøren og brukes når man beregner totalvekt sammen med gods, emballasje og sikring.",
        },
      ],
    },
    textBlock("Hva blir lasten utsatt for?", "h2"),
    ...paragraphsToBlocks(
      "Under transport utsettes containeren for mekaniske, klimatiske, biologiske og kjemiske belastninger. De mekaniske belastningene kommer blant annet fra bremsing, svinger, løfting, terminalhåndtering, vibrasjoner, stamping og rulling til sjøs.\n\nDet betyr at last som virker stabil på lagergulvet, ikke nødvendigvis er stabil i en container. Den må sikres for hele transportkjeden, ikke bare for lastebiltransporten frem til havnen.",
    ),
    textBlock("Vektfordeling og tyngdepunkt", "h2"),
    ...paragraphsToBlocks(
      "Containerbunnen er ikke laget for ubegrenset punktbelastning. Tunge kolli med liten anleggsflate må ofte fordeles med bjelker, planker eller annen bedding slik at vekten overføres over større lengde.",
    ),
    {
      _type: "checklist",
      _key: key(),
      items: [
        "Fordel lasten så jevnt som mulig over containerens lengde.",
        "Tyngdepunktet bør ligge lavt og nær containerens midtlinje.",
        "Unngå at tung last står helt i én ende eller på små støttepunkter.",
        "Vurder flatrack eller spesialutstyr ved svært tung eller konsentrert last.",
      ],
    },
    ...paragraphsToBlocks(
      "Som praktisk tommelfingerregel bør man alltid vurdere både containerens tekniske nyttelast, belastningen på containerbunnen og lovlig vekt på vei til og fra terminal.",
    ),
    textBlock("Sikring: positiv stuv, chocking og lashing", "h2"),
    ...paragraphsToBlocks(
      "Den beste sikringen er ofte positiv stuv: lasten fyller arealet tett slik at den ikke kan bevege seg. Når det oppstår hulrom, må disse fylles eller lasten må sikres med egnet materiale.",
    ),
    {
      _type: "infoCards",
      _key: key(),
      columns: 2,
      cards: [
        {
          _type: "card",
          _key: key(),
          title: "Positiv stuv",
          text: "Godset står tett mot annet gods eller egnet støttemateriale, uten frie hulrom.",
        },
        {
          _type: "card",
          _key: key(),
          title: "Chocking",
          text: "Treverk, klosser eller konstruksjoner hindrer lasten i å gli eller rulle.",
        },
        {
          _type: "card",
          _key: key(),
          title: "Lashing",
          text: "Stropper, wire, kjetting eller bånd holder lasten nede og på plass.",
        },
        {
          _type: "card",
          _key: key(),
          title: "Fyllmateriale",
          text: "Airbags, paller, dunnage eller annet materiale brukes for å fylle mellomrom.",
        },
      ],
    },
    ...paragraphsToBlocks(
      "Containervegger tåler store flatebelastninger, men ikke nødvendigvis harde punktlaster. Når last chockes mot vegger eller dører, må kreftene fordeles over stort nok areal.",
    ),
    textBlock("Fukt, kondens og temperatur", "h2"),
    ...paragraphsToBlocks(
      "Mange transportskader skyldes fukt. Selv om en lukket container beskytter mot regn og sjøsprøyt, kan det oppstå kondens inne i containeren når temperatur og luftfuktighet endrer seg. Kondens kan gi rust, mugg, flekker, svekkede kartonger og kollaps i stabelen.",
    ),
    {
      _type: "checklist",
      _key: key(),
      items: [
        "Last og emballasje bør være så tørr som mulig før stuffing.",
        "Ikke pakk fuktavgivende gods sammen med fuktsensitivt gods uten tydelig separasjon.",
        "Bruk egnet fuktabsorberende materiale ved behov, men ikke som erstatning for tørr last.",
        "Vurder reefer eller ventilert løsning dersom godset krever temperatur eller luftutskifting.",
      ],
    },
    ...paragraphsToBlocks(
      "For metall, maskiner, elektronikk og overflatebehandlet gods bør man også vurdere korrosjonsbeskyttelse og fuktsperre.",
    ),
    {
      _type: "checklist",
      _key: key(),
      heading: "Emballasje og beskyttelse",
      items: protectionMethods,
    },
    textBlock("Sjekkliste før containeren lastes", "h2"),
    {
      _type: "checklist",
      _key: key(),
      items: preCheck,
    },
    textBlock("Kontroll etter lasting", "h2"),
    ...paragraphsToBlocks(
      "Når containeren er ferdig lastet, bør man kontrollere at vekt, sikring, dokumentasjon, faresedler og eventuelle krav til treemballasje er på plass. Sealnummer må noteres, og dørene skal kunne lukkes uten at last presser mot dørbladene.\n\nDersom containeren er overlastet eller lasten er feil sikret, kan transporten bli stoppet. Ved skade kan feil pakking også få betydning for forsikringsoppgjør og ansvar.",
    ),
    textBlock("Merking, symboler og informasjon", "h2"),
    ...paragraphsToBlocks(
      "Riktig merking gjør at godset håndteres riktig gjennom transportkjeden. Dette er særlig viktig når godset er skjørt, tungt, fuktfølsomt, farlig, temperaturfølsomt eller har spesielle løftepunkter.",
    ),
    {
      _type: "checklist",
      _key: key(),
      items: markings,
    },
    textBlock("Dokumenter lastingen med bilder", "h2"),
    ...paragraphsToBlocks(
      "Det er lurt å ta bilder av container og gods gjennom hele lasteprosessen. Bilder kan være nyttige ved skade, avvik, forsikringsspørsmål eller dersom det senere oppstår tvil om hvordan lasten var pakket og sikret.",
    ),
    {
      _type: "checklist",
      _key: key(),
      items: [
        "Ta bilder av tom container før lasting, inkludert gulv, vegger, tak og dører.",
        "Dokumenter godsets tilstand og emballasje før det settes inn i containeren.",
        "Ta bilder underveis som viser vektfordeling, stuv, sikring og eventuelle mellomlegg.",
        "Ta sluttbilder før dørene lukkes, spesielt av sikring mot dør og synlige hulrom.",
        "Ta bilde av lukket container, seal og sealnummer etter lasting.",
      ],
    },
    textBlock("Praktiske råd for ulike godstyper", "h2"),
    {
      _type: "infoCards",
      _key: key(),
      columns: 2,
      cards: cargoTypes.map((item) => ({
        _type: "card",
        _key: key(),
        title: item.title,
        text: item.text,
      })),
    },
    {
      _type: "cta",
      _key: key(),
      heading: "Trenger du hjelp med stuffing?",
      text:
        "SG Logistics kan bistå med vurdering av containerutstyr, vekt, sikring og praktisk gjennomføring før containeren bestilles eller lastes.",
      primaryLabel: "Send e-post",
      primaryHref: "mailto:post@sglogistics.no",
      secondaryLabel: "Ring oss",
      secondaryHref: "tel:+4732178800",
    },
    {
      _type: "linkCards",
      _key: key(),
      heading: "Relaterte artikler",
      cards: [
        {_type: "card", _key: key(), title: "Containerguide", href: "/kjekt-a-vite/containerguide"},
        {
          _type: "card",
          _key: key(),
          title: "Seaworthy packing",
          href: "/kjekt-a-vite/sjofrakt/seaworthy-packing",
        },
        {
          _type: "card",
          _key: key(),
          title: "Hvor tung kan en container være på vei?",
          href: "/kjekt-a-vite/sjofrakt/hvor-tung-kan-en-container-vaere-pa-vei",
        },
        {
          _type: "card",
          _key: key(),
          title: "Farlig gods på sjø",
          href: "/kjekt-a-vite/farlig-gods-sjofrakt",
        },
      ],
    },
  ];
}
