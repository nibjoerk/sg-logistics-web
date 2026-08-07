import { farligGodsFly } from "./articles/farlig-gods-flyfrakt";
import { farligGodsSjo } from "./articles/farlig-gods-sjofrakt";

export const articles = [
  {
    title: "Incoterms forklart",
    slug: "incoterms",
    href: "/kjekt-a-vite/incoterms",
    category: "Import og eksport",
    intro:
      "Incoterms® 2020 avklarer levering, risikoovergang, transport, forsikring og fortolling mellom selger og kjøper. Bruk veiviseren for å snevre inn riktig term, og termvelgeren for detaljer.",
    seoTitle: "Incoterms forklart | SG Logistics AS",
    seoDescription:
      "Incoterms 2020: interaktiv veiviser, termvelger, risiko vs kostnad, forsikring CIF/CIP og vanlige fallgruver ved import og eksport.",
    body: [
      {
        heading: "Hva er Incoterms?",
        text:
          "Incoterms er internasjonale leveringsbetingelser fra International Chamber of Commerce (ICC). De er ikke lovpålagte, og må tas inn i kontrakten uttrykkelig. De regulerer praktiske plikter som levering, risiko, transport, forsikring, dokumenter, eksport/import, emballasje og kostnader – men ikke pris, betaling, eiendomsrett eller konsekvenser av kontraktsbrudd.",
        items: [
          "11 regler i Incoterms® 2020: EXW, FCA, FAS, FOB, CFR, CIF, CPT, CIP, DAP, DPU og DDP.",
          "Sju kan brukes for alle transportmidler. FAS, FOB, CFR og CIF er bare for sjø- og innlandsvanntransport.",
          "Ved containerfrakt er FCA, CPT eller CIP ofte mer treffsikkert enn FOB/CIF.",
        ],
      },
      {
        heading: "Skriv alltid sted og versjon",
        text:
          "En Incoterms-klausul bør være presis. Bruk alltid riktig term, navngitt sted eller havn, og henvis til Incoterms® 2020. Ved C-termer er dette ekstra viktig, fordi kostnadspunkt og risikopunkt ikke ligger samme sted.",
        items: [
          "Eksempel: FCA Breivika Industriveg 63, Ålesund, Norway, Incoterms® 2020.",
          "Eksempel: DAP mottakers adresse, Marseille, France, Incoterms® 2020.",
          "Unngå bare å skrive FOB, CIF eller DAP uten sted.",
        ],
      },
      {
        heading: "Risiko og kostnader er ikke alltid samme punkt",
        text:
          "Den som betaler frakten har ikke nødvendigvis risikoen hele veien. Ved C-termer betaler selger transporten til avtalt bestemmelsessted, mens risikoen går over tidligere – når godset leveres til transportør eller lastes om bord.",
        items: [
          "CFR og CIF: selger betaler sjøfrakt til bestemmelseshavn, risiko går over i avgangshavn.",
          "CPT og CIP: selger betaler frakt til avtalt sted, risiko går over ved overlevering til transportør.",
          "DAP, DPU og DDP: risiko ligger normalt hos selger frem til godset er gjort tilgjengelig på avtalt sted.",
        ],
        image: {
          src: "/images/articles/incoterms-ansvarsmatrise.png",
          alt: "Ansvarsmatrise for Incoterms 2020",
          caption: "Klikk på matrisen for å se ansvar og kostnadsfordeling i full størrelse.",
        },
      },
      {
        heading: "Forsikring: CIF og CIP skiller seg ut",
        text:
          "Bare CIF og CIP pålegger selger å tegne transportforsikring. CIF krever normalt minimumsdekning etter Institute Cargo Clauses (C). CIP krever bredere dekning etter Institute Cargo Clauses (A), normalt minst kontraktspris pluss 10 %. Ved andre termer må partene selv avklare forsikring.",
        image: {
          src: "/images/articles/marine-cargo-clauses.png",
          alt: "Oversikt over risikoer dekket av Institute Cargo Clauses A, B og C",
          caption: "Klikk for å se forskjellen mellom Institute Cargo Clauses (A), (B) og (C) i full størrelse.",
        },
      },
      {
        heading: "Vanlige fallgruver",
        text:
          "Mange konflikter oppstår fordi leveringssted, risikopunkt eller kostnadsfordeling er uklart. Avklar derfor term før pris gis og før transport bestilles.",
        items: [
          "Å bruke FOB eller CIF på containerforsendelser uten å vurdere FCA, CPT eller CIP.",
          "Å velge EXW når kjøper ikke kan eksportklarere i selgers land.",
          "Å velge DDP uten å avklare hvem som skal stå som importør, og hvordan innførsels-mva. skal håndteres.",
          "Å tro at «frakt inkludert» betyr at selger har risikoen helt frem.",
          "Å glemme terminalkostnader, lossing eller importklarering i avtalen.",
        ],
        image: {
          src: "/images/articles/incoterms-veiviser.png",
          alt: "Incoterms-veiviser oversikt fra SG Logistics",
          caption: "Oversikt over veiviserlogikken. Klikk for å se bildet i full størrelse.",
        },
      },
    ],
  },
  {
    title: "CMR-fraktbrev",
    slug: "cmr",
    href: "/kjekt-a-vite/cmr",
    category: "Dokumenter",
    intro:
      "CMR er et sentralt transportdokument ved internasjonal veitransport, og viser hvem som sender, hvem som mottar, hva som fraktes og hvilke vilkår som gjelder.",
    image: { src: "/images/articles/cmr-fraktbrev.png", alt: "Eksempel på utfylt CMR-fraktbrev" },
    seoTitle: "CMR-fraktbrev | SG Logistics AS",
    seoDescription:
      "Hva CMR-fraktbrev er, når det brukes, hvilke opplysninger som må med og hvordan vareeier bør kontrollere dokumentet før internasjonal veitransport.",
    body: [
      {
        heading: "Hva er CMR?",
        text:
          "CMR-fraktbrev brukes ved internasjonal veitransport. Dokumentet bygger på CMR-konvensjonen og er tatt inn i norsk rett gjennom vegfraktloven. Fraktbrevet dokumenterer transportavtalen og følger normalt godset fra avsender til mottaker.",
      },
      {
        heading: "Når brukes CMR-fraktbrev?",
        text:
          "CMR er særlig aktuelt når gods sendes med bil mellom land. Det brukes også ofte som praktisk transportdokument når en sending inngår i en større transportkjede, for eksempel der veitransport kombineres med sjø eller fly.",
        items: [
          "Ved internasjonal biltransport.",
          "Når avsender, mottaker, transportør og vareinformasjon må dokumenteres tydelig.",
          "Når toll, terminaler eller mottaker trenger et transportdokument som følger godset.",
        ],
      },
      {
        heading: "Hvilke opplysninger skal med?",
        text:
          "Vegfraktloven beskriver hvilke opplysninger et internasjonalt bilfraktbrev skal inneholde. NDLA viser blant annet til at CMR-formularet dekker de obligatoriske opplysningene gjennom faste rubrikker.",
        items: [
          "Sted og dato for utfylling.",
          "Navn og adresse til avsender, mottaker og fraktfører.",
          "Sted og dato for overtakelse av godset, samt bestemmelsessted.",
          "Godsbeskrivelse, pakningsmåte, antall kolli, merker og nummer.",
          "Bruttovekt eller annen mengdeangivelse, for eksempel volum.",
          "Instrukser om tollbehandling, kostnader, vedlegg og eventuelle særskilte vilkår.",
        ],
      },
      {
        heading: "Slik fylles de viktigste feltene ut",
        text:
          "CMR-skjema kan variere noe i layout, men hovedinnholdet er det samme. Bruk rubrikkene som en sjekkliste og kontroller at opplysningene samsvarer med faktura, pakkliste, booking og faktisk gods.",
        items: [
          "Rubrikk 1 - avsender: skriv fullt firmanavn, adresse og land. Dette bør stemme med faktura og eksportdokumenter.",
          "Rubrikk 2 - mottaker: skriv mottakers navn, adresse og land. Hvis leveringsadressen er en annen enn mottakeradressen, må leveringsadressen komme tydelig frem.",
          "Rubrikk 3 og 4 - henting og levering: oppgi sted og dato for overtakelse av godset, samt utleveringssted/bestemmelsessted.",
          "Rubrikk 5 - merker og nummer: fyll inn kollimerking, referanser, pallnummer eller andre merker som gjør godset identifiserbart.",
          "Rubrikk 6-8 - kolli, emballasje og godsbeskrivelse: oppgi antall kolli, emballasjetype og vanlig betegnelse på varen. Ved farlig gods må korrekt transportbetegnelse brukes.",
          "Rubrikk 9 og 10 - mengde: oppgi mål, volum eller annen mengdeangivelse der det er relevant, og bruttovekt i kg per varelinje.",
          "Rubrikk 11 - avsenders instrukser: bruk feltet til nødvendige opplysninger om tollbehandling, leveringsvilkår, referanser eller andre praktiske instrukser.",
          "Rubrikk 12 og 13 - særlige avtaler eller forbehold: fylles ut dersom det finnes spesielle vilkår, vedlegg eller forbehold fra transportør.",
          "Rubrikk 14 - frakt og kostnader: brukes der fraktbeløp, tillegg, etterkrav eller kostnadsfordeling skal fremgå.",
          "Rubrikk 15 - fraktfører: skriv navn og adresse på transportør/fraktfører.",
          "Rubrikk 16-18 - sted, dato og signaturer: avsender og fraktfører signerer ved overtakelse. Mottaker kvitterer ved levering og bør notere dato og eventuelle synlige avvik.",
        ],
      },
      {
        heading: "Hvorfor må informasjonen være riktig?",
        text:
          "Feil eller mangelfull informasjon kan gi forsinkelser, problemer ved grensepassering, feil fortolling eller uklarhet ved skade og avvik. Ved farlig gods er korrekt godsbetegnelse, UN-nummer, merking og nødvendig dokumentasjon ekstra viktig.",
      },
      {
        heading: "Hvem fyller ut CMR?",
        text:
          "Avsender, transportør eller speditør kan bidra med utfylling, men avsender må sikre at informasjonen om godset er korrekt. Transportøren kan kontrollere synlige forhold ved overtakelse, men kan ikke vite om varebeskrivelse, vekt eller klassifisering er feil dersom opplysningene fra vareeier er mangelfulle.",
      },
      {
        heading: "Praktisk kontroll før henting",
        text:
          "En enkel kontroll før bilen kommer kan spare mye tid. Sammenlign CMR med booking, faktura, pakkliste og eventuell tolldokumentasjon før godset leveres til transport.",
        items: [
          "Er mottaker og leveringsadresse korrekt skrevet?",
          "Stemmer antall kolli, vekt, volum og merking med godset?",
          "Er leveringsbetingelser og tollinstrukser tydelige?",
          "Er eventuelle vedlegg, for eksempel faktura, pakkliste eller farlig gods-dokumentasjon, klare?",
          "Er dokumentet signert og datert der det skal være signatur?",
        ],
      },
    ],
  },
  {
    title: "Farlig gods: hva må vareeier vite?",
    slug: "farlig-gods",
    href: "/kjekt-a-vite/farlig-gods",
    category: "Regelverk",
    layout: "guide",
    intro:
      "Farlig gods er varer eller stoffer som kan medføre risiko for mennesker, miljø, materiell eller transportmiddel. For vareeier er det viktigste å vite hva varen er, og å gi riktig informasjon før transporten bestilles.",
    seoTitle: "Farlig gods for vareeiere | SG Logistics AS",
    seoDescription:
      "Generell guide til farlig gods for vareeiere: hva som må avklares før transport, og forskjellen på regelverk for vei, sjø og fly.",
    image: {
      src: "/images/articles/farlig-gods-transportformer.png",
      alt: "Illustrasjon av farlig gods på vei, sjø og fly",
    },
    body: [
      {
        _type: "callout",
        tone: "info",
        label: "Kort fortalt",
        html:
          "<p>Det finnes ikke ett regelverk som dekker alt på samme måte. Vei/jernbane, fly og sjø har egne regler. Samme vare kan derfor kreve ulik dokumentasjon, emballasje eller merking avhengig av hvordan den skal transporteres.</p>",
      },
      {
        heading: "Start med produktet, ikke transporten",
        text:
          "Mange feil oppstår fordi farlig gods først oppdages når transporten allerede er booket. Start heller med produktet: Hva er varen? Har den et UN-nummer? Hvilken fareklasse har den? Er den miljøfarlig? Inneholder den batterier, gass, væske, kjemikalier eller trykkbeholdere?\n\nSikkerhetsdatabladet er ofte første sted å se, men det må være oppdatert og relevant for transport. Produktinformasjon fra produsent eller leverandør er viktig, særlig når varen er en blanding, en prøve, avfall eller utstyr med innebygde batterier.",
      },
      {
        heading: "Velg riktig regelverk etter transportform",
        text:
          "Når farlig gods skal sendes internasjonalt, går det ofte gjennom flere transportledd. En sending kan for eksempel hentes med bil, sendes med sjø eller fly, og leveres videre med bil. Da må alle relevante regelverk vurderes.",
      },
      {
        _type: "linkCards",
        heading: "Gå videre til riktig guide",
        cards: [
          {
            title: "Vei og jernbane",
            label: "ADR/RID",
            href: "/kjekt-a-vite/farlig-gods-pa-vei",
            text:
              "For gods som skal hentes eller leveres med bil, eller gå videre med jernbane. Her er transportdokument, merking, emballasje og mengderegler sentralt.",
          },
          {
            title: "Flyfrakt",
            label: "ICAO-TI / IATA",
            href: "/kjekt-a-vite/farlig-gods-flyfrakt",
            text:
              "For hasteforsendelser og flyfrakt. Fly har strengere krav, særlig for batterier, godkjent emballasje og Shipper's Declaration.",
          },
          {
            title: "Sjøfrakt",
            label: "IMDG",
            href: "/kjekt-a-vite/farlig-gods-sjofrakt",
            text:
              "For farlig gods i container, på pall, i fat, IBC eller annen emballasje som sendes med skip. Containerpakking, marine pollutants og pakkeerklæring er viktig.",
          },
        ],
      },
      {
        heading: "Felles sjekkliste for vareeier",
        text:
          "Detaljene varierer mellom transportformene, men grunnarbeidet er ofte det samme. Dette bør avklares før du ber om pris eller booker transport:",
      },
      {
        _type: "checklist",
        items: [
          "Sjekk sikkerhetsdatabladet, særlig transportinformasjonen.",
          "Finn korrekt UN-nummer, varenavn, fareklasse og eventuell emballasjegruppe.",
          "Avklar om varen er miljøfarlig, temperaturfølsom, avfall, batteri eller tom ikke-rengjort emballasje.",
          "Bruk emballasje som er tillatt for varen, mengden og transportmåten.",
          "Merk kolli, pall, container eller annen lastbærer slik regelverket krever.",
          "Gi speditør eller transportør informasjonen før booking, ikke først ved henting.",
        ],
      },
      {
        heading: "Vanlige feil som gir forsinkelser",
        text:
          "Farlig gods trenger ikke være vanskelig, men det må være riktig fra starten. Dette er feil som ofte gir stopp, ompakking eller ny dokumentasjon:",
      },
      {
        _type: "warning",
        heading: "Vanlige feil",
        items: [
          "Varen bookes som vanlig gods selv om den er farlig gods.",
          "Sikkerhetsdatabladet er gammelt eller mangler transportinformasjon.",
          "UN-nummer, klasse eller emballasjegruppe er feil.",
          "Batterier, aerosoler, kjemikalier eller væsker blir oversett fordi de er innebygd i produktet.",
          "Kolli er skadet, lekk eller mangler fareseddel.",
          "Man antar at regler for vei også gjelder uendret for sjø eller fly.",
        ],
      },
      {
        heading: "Hvordan SG Logistics kan hjelpe",
        text:
          "Vi kan hjelpe med å avklare hvilken transportform som passer, hvilken informasjon transportør eller rederi trenger, og hvordan sendingen bør forberedes. Selve klassifiseringen må likevel bygge på korrekt produktinformasjon fra vareeier, produsent eller fagkyndig rådgiver.",
      },
      {
        _type: "linkCards",
        heading: "Relaterte artikler",
        cards: [
          { title: "Hvordan pakke gods riktig", href: "/kjekt-a-vite/pakking-av-gods" },
          { title: "CMR-fraktbrev", href: "/kjekt-a-vite/cmr" },
          {
            title: "Containerpakking: stuffing og sikring",
            href: "/kjekt-a-vite/sjofrakt/containerpakking-stuffing",
          },
        ],
      },
    ],
  },
  { title: "Farlig gods på vei og jernbane", slug: "farlig-gods-pa-vei", href: "/kjekt-a-vite/farlig-gods-pa-vei", category: "Veitransport", intro: "Hva vareeier må ha kontroll på før farlig gods sendes på vei eller jernbane etter ADR/RID.", seoTitle: "Farlig gods på vei og jernbane ADR/RID | SG Logistics AS", seoDescription: "Praktisk ADR/RID-guide for vareeiere: klassifisering, emballasje, merking, dokumentasjon, unntak og ansvar før farlig gods sendes.", body: [{ heading: "Vareeiers ansvar", text: "Artikkelen forklarer hva avsender og vareeier må avklare før farlig gods bookes for transport på vei eller jernbane." }, { heading: "Riktig klassifisering", text: "UN-nummer, fareklasse, emballasjegruppe og korrekt godsbeskrivelse må være på plass før transport bestilles." }, { heading: "Merking og dokumentasjon", text: "Godset må være pakket og merket korrekt, og nødvendige dokumenter må følge sendingen." }] },
  farligGodsFly,
  farligGodsSjo,
  {
    title: "Kapelltralle: dimensjoner, paller og volumvekt",
    slug: "kapelltralle-dimensjoner-volumvekt-kalkulator",
    href: "/kjekt-a-vite/kapelltralle-dimensjoner-volumvekt-kalkulator",
    category: "Veitransport",
    intro:
      "Innvendige mål for kapelltralle til semitrailer, kapasitet på 34 Europaller og kalkulator for volum, lastemeter, paller og fraktberegningsvekt.",
    seoTitle: "Kapelltralle dimensjoner, paller og volumvekt | SG Logistics AS",
    seoDescription:
      "Se dimensjoner for kapelltralle/semitrailer, kapasitet på 34 Europaller og bruk kalkulator for omregning mellom m3, lastemeter, paller og kg.",
    body: [
      {
        heading: "Kapelltralle til semitrailer",
        text:
          "Artikkelen viser innvendige mål, pallkapasitet og en praktisk kalkulator for fraktberegning.",
      },
    ],
  },
  {
    title: "Fortolling ved import",
    slug: "fortolling",
    href: "/kjekt-a-vite/fortolling",
    category: "Toll",
    intro: "Fortolling krever riktig dokumentasjon, varebeskrivelse, verdi og opprinnelse.",
    seoTitle: "Fortolling ved import | SG Logistics AS",
    seoDescription: "Hva du bør ha klart ved importfortolling, og hvordan du unngår forsinkelser.",
    body: [
      {
        heading: "Hva trengs ved import?",
        text:
          "Vanligvis trenger man handelsfaktura, pakkliste, fraktdokument og informasjon om varetype, verdi og opprinnelse.",
      },
      {
        heading: "Hvor oppstår feil ofte?",
        text:
          "Feil varebeskrivelse, manglende opprinnelsesinformasjon, uklar verdi eller feil varenummer/HS-kode kan forsinke tollbehandlingen og gi feil avgift.",
        links: [{ href: "/kjekt-a-vite/hs-koder", label: "Les mer om HS-koder og varenummer" }],
      },
      {
        heading: "Kommer varene under transittering?",
        text:
          "Hvis sendingen er under transittering, må prosedyren avsluttes korrekt før eller i forbindelse med fortolling. Da trengs blant annet MRN og klarhet om T1/T2-status.",
        links: [{ href: "/kjekt-a-vite/transittering", label: "Les mer om transittering" }],
      },
      {
        heading: "Hvordan kan vi hjelpe?",
        text:
          "SG Logistics kan bistå med dokumentkontroll, tollbehandling og praktisk oppfølging mot involverte parter.",
      },
    ],
  },
  {
    title: "HS-koder og varenummer",
    slug: "hs-koder",
    href: "/kjekt-a-vite/hs-koder",
    category: "Toll",
    intro:
      "HS-koder, også kalt varenummer, er det internasjonale systemet for å klassifisere varer i tollbehandlingen. Riktig kode styrer toll, avgifter, restriksjoner og om frihandelsavtaler kan brukes – og henger tett sammen med opprinnelsesregler.",
    seoTitle: "HS-koder, varenummer og opprinnelsesregler | SG Logistics AS",
    seoDescription:
      "Hva HS-koder og varenummer er, hvorfor de er viktige, konsekvenser av feil kode, opprinnelsesregler, godkjent eksportør og nyttige verktøy.",
    body: [
      {
        heading: "Hva er en HS-kode?",
        text:
          "HS står for Harmonized System – det harmoniserte systemet for vareklassifisering utviklet av Verdens tollorganisasjon (WCO). Systemet er et felles «språk» for tollmyndigheter og næringsliv i det meste av verden. Når du importerer eller eksporterer, må varen plasseres under riktig nummer i tolltariffen. I Norge kalles dette vanligvis varenummer.",
        items: [
          "Tolltariffen er basert på HS-nomenklaturen og går normalt fra kapittel 1 (levende dyr) til kapittel 97 (antikviteter).",
          "De seks første sifrene er internasjonale HS-siffer og skal i utgangspunktet være like på tvers av land.",
          "I Norge brukes normalt åtte siffer. De to siste er nasjonale og kan påvirke tollsatser, statistikk og reguleringer.",
          "De fire første sifrene kalles posisjon, de to neste underposisjon. Alle åtte til sammen er varenummeret.",
        ],
      },
      {
        heading: "HS vs. norsk varenummer",
        text:
          "Mange snakker om «HS-kode» når de egentlig mener det fullstendige varenummeret i nasjonal tolltariff. I praksis:",
        items: [
          "HS-kode: ofte de seks første sifrene (internasjonalt nivå).",
          "Varenummer i Norge: normalt åtte siffer i tolltariffen.",
          "EU og andre land kan ha flere siffer utover HS-nivået. Oppgi alltid det nummeret som kreves der deklarasjonen gjøres.",
          "Eksempel fra Tolletaten: 61.09.1000 – t-skjorter av bomull.",
        ],
      },
      {
        heading: "Hvorfor er riktig varenummer viktig?",
        text:
          "Varenummeret er nøkkelen til hvordan sendingen behandles. Med riktig nummer får du korrekte toll- og avgiftsopplysninger, og du ser om det gjelder restriksjoner, lisenser, kvoter eller frihandelsfordeler. Feil nummer gir feil beslutningsgrunnlag videre i hele kjeden.",
        items: [
          "Tollavgiftssats og ofte også andre avgifter.",
          "Om varen krever tillatelse, lisens eller er underlagt eksport-/importrestriksjoner.",
          "Om frihandelsavtaler eller tollnedsettelser kan brukes.",
          "Statistikk og dokumentasjon som må stemme med faktura, pakkliste og opprinnelsesbevis.",
        ],
      },
      {
        heading: "Hvordan finner du riktig varenummer?",
        text:
          "Start med en nøyaktig varebeskrivelse: hva varen er, materialer, bruksområde, om den er komplett eller en del, og for næringsmidler også sammensetning. Deretter velger du posisjonen som beskriver varen best, og går systematisk ned i underoppdelingene. Fritekst-søk i tolltariffen er en inngang, ikke en fasit – noter til avsnitt, kapittel og posisjon må sjekkes.",
        items: [
          "Ikke kopier blindt HS-kode fra leverandørfaktura uten å kontrollere mot norsk tolltariff.",
          "Ved tvil kan du søke bindende forhåndsuttalelse (BKU) hos Tolletaten. Den er gratis og som hovedregel bindende i tre år for fremtidige sendinger.",
          "Muntlig veiledning fra Tolletaten er ikke bindende.",
        ],
      },
      {
        heading: "Hva kan skje ved feil HS-kode / varenummer?",
        text:
          "Feil klassifisering kan gi både økonomiske og operative konsekvenser. Ved bokettersyn eller kontroll kan Tolletaten etterberegne manglende toll, vurdere tilleggstollavgift eller overtredelsesgebyr, og sendingen kan bli forsinket eller stanset.",
        items: [
          "For lite toll betalt: etterberegning av differansen, eventuelt med tillegg.",
          "For mye toll betalt: unødvendige kostnader inntil feilen rettes.",
          "Feil restriksjonsvurdering: varer sendes uten nødvendig tillatelse, eller stoppes i tollkontroll.",
          "Feil bruk av frihandelsavtale: preferansetoll avslås, eller opprinnelsesdokumentasjon stemmer ikke med klassifiseringen.",
          "Forsinkelse: deklarasjonen må korrigeres, varer blir stående, og leveranse og kostnader påvirkes.",
        ],
      },
      {
        heading: "Praktiske eksempler",
        text:
          "Konsekvensene blir ofte tydeligst når to nærliggende varenummer har ulik tollsats, ulike restriksjoner eller ulik behandling under frihandelsavtaler.",
        items: [
          "Import med for lav tollsats: En vare klassifiseres under et nummer med 0 % toll, mens riktig nummer har høyere sats. Differansen kan kreves inn senere.",
          "Eksport med feil restriksjonskode: En komponent plasseres under feil posisjon og unngår lisenskrav som egentlig gjelder. Sendingen kan bli stoppet.",
          "Elektronikk vs. reservedeler: Et komplett produkt og løse deler kan høre under ulike posisjoner.",
          "Mat/landbruk: Små forskjeller i sammensetning eller bearbeiding kan gi annet varenummer og andre satser.",
          "Frihandelsfordel går tapt: Varen har riktig opprinnelse, men feil varenummer gjør at preferansetoll ikke kan brukes.",
        ],
      },
      {
        heading: "Opprinnelsesregler – mer enn «laget i»",
        text:
          "For å få lavere eller null toll under en frihandelsavtale er det ikke nok at varen er sendt fra et avtaleland. Varen må også oppfylle avtalens opprinnelsesregler. Disse reglene knyttes ofte til HS-posisjon og kan kreve at varen er helt fremstilt i avtalelandet, at ikke-opprinnelsesmaterialer er tilstrekkelig bearbeidet, eller at et bestemt verdi-/vekttap er oppfylt.",
        items: [
          "Preferanseopprinnelse dokumenteres typisk med EUR.1 / EUR-MED eller en opprinnelseserklæring på faktura eller annet handelsdokument.",
          "Uten status som godkjent eksportør kan opprinnelseserklæring normalt bare brukes når verdien av opprinnelsesproduktene i sendingen ikke overstiger 65 000 kroner.",
          "Over denne verdien må du vanligvis bruke varesertifikat EUR.1, med mindre du er godkjent eksportør.",
          "Feil HS-kode kan gjøre at du bruker feil opprinnelsesregel – og dermed utsteder et ugyldig opprinnelsesbevis.",
        ],
        links: [
          {
            href: "https://findrulesoforigin.org/en?culture=en",
            label: "Rules of Origin Facilitator – finn opprinnelsesregler",
          },
        ],
      },
      {
        heading: "Godkjent eksportør",
        text:
          "Godkjent eksportør er en autorisasjon fra Tolletaten som lar virksomheter med tilstrekkelig kunnskap om opprinnelsesreglene selv utferdige opprinnelseserklæringer uten hensyn til verdien på sendingen. Ordningen finnes i frihandelsavtalene Norge er part i, og er særlig nyttig ved jevnlig eksport av opprinnelsesvarer.",
        items: [
          "Du må ha jevnlig eksport og kunne dokumentere opprinnelsesstatus med lager-/regnskapssystem og underlagsdokumentasjon.",
          "Virksomheten må utpeke ansvarlige personer for opprinnelsesregelverket og holde seg oppdatert.",
          "Godkjente eksportører påfører autorisasjonsnummer i erklæringen og kan få fritak fra krav om fysisk signatur.",
          "Første autorisasjon gis normalt med prøveperiode. Oppbevaringsplikt for dokumentasjon er typisk fem år.",
          "Feilaktige opprinnelseserklæringer kan gi verifikasjon, tilbaketrekking av autorisasjon og at importør blir krevd for toll.",
        ],
      },
      {
        heading: "Slik reduserer du risikoen",
        text:
          "Behandle klassifisering og opprinnelse som to koblede vurderinger: først riktig varenummer, deretter riktig opprinnelsesregel og riktig bevis for den aktuelle avtalen.",
        items: [
          "Beskriv varen nøyaktig før du klassifiserer.",
          "Kontroller noter i tolltariffen, ikke bare søketreff.",
          "Sjekk om frihandelsavtale gjelder for både land og varenummer.",
          "Avklar om du trenger EUR.1 eller kan bruke opprinnelseserklæring – og om godkjent eksportør er aktuelt.",
          "Ved usikker klassifisering: vurder BKU hos Tolletaten.",
        ],
        links: [
          { href: "/kjekt-a-vite/fortolling", label: "Fortolling ved import" },
          { href: "/kjekt-a-vite/transittering", label: "Transittering" },
          { href: "/kjekt-a-vite/ata-carnet", label: "ATA-carnet" },
        ],
      },
      {
        heading: "Nyttige kilder",
        text:
          "Bruk offisielle kilder når du klassifiserer eller vurderer preferansetoll. Verktøyene under er et godt utgangspunkt, men erstatter ikke konkret vurdering av din vare og avtale.",
        items: [
          "Tolletaten: Finn riktig varenummer i tolltariffen, BKU og veiledning om frihandel/opprinnelse.",
          "WCO Harmonized System: internasjonal struktur og nomenklatur bak HS-kodene.",
          "ITC Rules of Origin Facilitator: oversikt over frihandelsavtaler, tollsatser og opprinnelsesregler per vare og landpar.",
        ],
        links: [
          {
            href: "https://www.toll.no/no/bedrift/tolltariffen-og-klassifisering/finn-riktig-varenummer-i-tolltariffen",
            label: "Tolletaten – finn riktig varenummer",
          },
          {
            href: "https://www.wcotradetools.org/en/harmonized-system",
            label: "WCO – Harmonized System",
          },
          {
            href: "https://findrulesoforigin.org/en?culture=en",
            label: "Rules of Origin Facilitator",
          },
          {
            href: "https://www.toll.no/no/bedrift/eksport/frihandel-ved-eksport/godkjende-eksportorar/",
            label: "Tolletaten – godkjent eksportør",
          },
        ],
      },
      {
        heading: "Hvordan kan vi hjelpe?",
        text:
          "SG Logistics kan bistå med praktisk dokumentkontroll, fortolling og oppfølging når varenummer, opprinnelse og restriksjoner må avklares før sendingen går.",
      },
    ],
  },
  {
    title: "Transittering",
    slug: "transittering",
    href: "/kjekt-a-vite/transittering",
    category: "Toll",
    intro:
      "Transittering lar varer transporteres mellom land med et minimum av tollbehandling underveis. Toll og innførselsavgifter beregnes ikke under selve transporten, men garanti, deklarasjon og korrekt avslutning må være på plass.",
    seoTitle: "Transittering T1 T2 NCTS og TIR | SG Logistics AS",
    seoDescription:
      "Praktisk guide til transittering: Transitteringskonvensjonen, T1 og T2, NCTS, MRN, hovedansvarlig, grensepassering og TIR-carnet.",
    body: [
      {
        heading: "Hva er transittering?",
        text:
          "Transittering er en tollprosedyre for forsendelse av varer gjennom eller til et tollområde etter Transitteringskonvensjonen eller TIR-konvensjonen. Hensikten er å gjøre grensepassering enklere og raskere: varene kan kjøre gjennom flere land med begrenset tollbehandling underveis. Under prosedyren beregnes ikke tollavgift eller andre innførselsavgifter. Når varene er fremme, må de underlegges en annen prosedyre, for eksempel fortolling eller tollager.",
      },
      {
        heading: "Transitteringskonvensjonen",
        text:
          "Regelverket for felles transittering følger Konvensjonen om en felles transitteringsprosedyre. Prosedyren kan bare brukes mellom land som er avtaleparter. Norge er tilknyttet det felles elektroniske systemet NCTS (New Computerised Transit System), og alle som transporterer varer under felles transittering må være knyttet til NCTS.",
        items: [
          "EU-landene.",
          "EFTA-landene Island, Norge og Sveits, inkludert Liechtenstein.",
          "I tillegg blant annet Storbritannia, Tyrkia, Nord-Makedonia, Serbia, Ukraina, Georgia, Moldova og Montenegro.",
        ],
      },
      {
        heading: "Hvordan foregår en transittering?",
        text:
          "Før transporten starter, varsles tollmyndighetene i avgangslandet. Deklaranten eller den hovedansvarlige sender en elektronisk transitteringsdeklarasjon i NCTS. Når deklarasjonen er frigitt, får sendingen et referansenummer, MRN (Movement Reference Number). Ved grensepassering inn i en ny avtalepart skal MRN registreres. Når sendingen er fremme i bestemmelseslandet, registreres ankomst hos tollmyndighetene eller hos en autorisert mottaker. Deretter må varene fortolles eller plasseres under annen prosedyre før de kan tas i bruk.",
        items: [
          "Oppstart: deklarasjon i NCTS og frigivelse med MRN.",
          "Underveis: registrering av grensepassering ved innpassering i ny avtalepart. Grensepasseringer mellom EU-land skal normalt ikke registreres.",
          "Avslutning: ankomstregistrering ved bestemmelsestollsted eller autorisert mottaker, deretter fortolling eller annen prosedyre.",
          "Følgedokument er en utskrift fra NCTS. Det er ikke lenger et absolutt krav at papirutskriften følger varene, men Tolletaten anbefaler fortsatt bruk i praksis.",
        ],
      },
      {
        heading: "Hovedansvarlig, garanti og tidsfrist",
        text:
          "Den som får tillatelse til å transittere varene, kalles hovedansvarlig for prosedyren. Hovedansvarlig skal sørge for at transporten skjer i samsvar med regelverket, og kan holdes ansvarlig for toll og andre avgifter hvis noe går galt. Derfor må det stilles garanti som dekker mulige krav. Avgangstollstedet fastsetter også en tidsfrist for når varene skal legges frem ved bestemmelsesstedet.",
        items: [
          "Autoriserte avsendere og mottakere kan bruke forenklet prosedyre etter tillatelse fra Tolletaten.",
          "Uten forenklet tillatelse må varer og MRN normalt fremlegges ved avgangstollstedet i ekspedisjonstiden.",
          "Feil i en innsendt deklarasjon korrigeres ikke direkte. Da må det sendes ny deklarasjon, og den gamle kanselleres hos avgangstollstedet.",
        ],
      },
      {
        heading: "T1, T2 og blandet sending",
        text:
          "Ved oppstart må varenes tollmessige status oppgis. Dette handler om avgiftsmessig status, ikke nødvendigvis opprinnelsesland. T2 betyr at varene har status som EU-varer, enten fordi de er produsert i EU eller fordi de er fortollet inn i EU. T1 betyr at varene ikke har slik EU-status.",
        items: [
          "T2: varer med tollmessig status som EU-varer.",
          "T1: varer uten EU-status. Ved eksport fra Norge brukes ofte T1.",
          "Blandet sending med både T1- og T2-varer på samme deklarasjon merkes med kode T.",
          "Ved import til Norge har statusen som hovedregel liten betydning for fortollingen. Krav til deklarering og avgiftsberegning er det samme for T1 og T2.",
          "T2 fra Norge kan bare startes i begrensede tilfeller, for eksempel når varene ankom som T2 og har vært under Tolletatens kontroll på tollager eller utstilling, uten annen behandling enn nødvendig bevaring eller oppdeling.",
        ],
      },
      {
        heading: "Grensepassering og fullføring",
        text:
          "Transportøren skal legge frem MRN ved hvert transitteringstollsted der grensepassering skal registreres. Ved innpassering til Norge kan dette skje automatisk via Digitoll. Når varene er fremme, skal ankomst bekreftes i NCTS. Bestemmelsestollstedet eller autorisert mottaker utsteder ankomstbevis, men ankomstbeviset er ikke i seg selv bekreftelse på at hele transitteringen er avsluttet i systemet.",
        items: [
          "Omlasting til annet kjøretøy krever normalt tillatelse fra tollmyndighetene i landet der omlastingen skjer.",
          "Splittes lasten på flere kjøretøy, må opprinnelig transittering avsluttes og erstattes med nye deklarasjoner.",
          "Kommer ikke sendingen frem innen fristen, starter etterlysning. Hovedansvarlig kan da bli bedt om forklaring eller alternativt bevis for at transporten er korrekt avsluttet.",
        ],
      },
      {
        heading: "TIR-konvensjonen",
        text:
          "Når transporten går til, fra eller gjennom land utenfor Transitteringskonvensjonen, kan TIR-ordningen være aktuell. TIR er en FN-konvensjon for internasjonal transport av varer i veikjøretøy, kombinasjon av kjøretøy eller containere over en eller flere grenser. En del av reisen må være på vei. I stedet for vanlig fellestransittering i NCTS brukes TIR-carnet.",
        items: [
          "Tollsikre lasteenheter: kjøretøy eller containere må være TIR-godkjente og kunne forsegles uten skjult tilgang.",
          "Internasjonal garanti: nasjonale forbund tilknyttet IRU stiller garanti. I Norge er NLF (Norges Lastebileier-Forbund) nasjonalt garanterende forbund.",
          "TIR-carnet: dokumentet fungerer som transport-, toll- og garantidokument for den enkelte transporten.",
          "Gjensidig aksept: kontrolltiltak fra avgangstollstedet skal i utgangspunktet aksepteres av øvrige land, men kontrollrett består.",
          "Kontrollert tilgang: bare autoriserte forbund og transportører kan bruke TIR-ordningen.",
        ],
      },
      {
        heading: "Vanlige fallgruver",
        text:
          "De fleste forsinkelser skyldes mangelfull planlegging, feil status eller at transporten ikke avsluttes korrekt i systemet.",
        items: [
          "Å starte transport uten gyldig MRN, garanti eller riktig hovedansvarlig.",
          "Å blande T1 og T2 uten å bruke kode T, eller å anta at T2 alltid kan startes fra Norge.",
          "Å glemme registrering av grensepassering ved innpassering i ny avtalepart.",
          "Å omlaste eller splitte sending uten å avklare tollkonsekvensene.",
          "Å tro at ankomstbevis eller levering hos mottaker automatisk avslutter alle tollmessige forpliktelser.",
          "Å bruke TIR uten TIR-godkjent lasteenhet, gyldig carnet eller autorisasjon.",
        ],
      },
      {
        heading: "Hva bør du ha klart?",
        text:
          "Avklar tidlig om sendingen skal gå under felles transittering eller TIR, og hvem som er hovedansvarlig. Da blir grensepassering og fortolling enklere for både transportør og vareeier.",
        items: [
          "Hvilke land inngår i ruten, og er de avtaleparter til Transitteringskonvensjonen?",
          "Skal varene gå som T1, T2 eller blandet sending?",
          "Hvem stiller garanti, og hvem er hovedansvarlig i NCTS?",
          "Hvor skal ankomst registreres, og hvem fortoller når sendingen er fremme?",
          "Stemmer varebeskrivelse, kolliantall, vekt og dokumenter med faktisk gods?",
        ],
        links: [
          { href: "/kjekt-a-vite/fortolling", label: "Fortolling ved import" },
          { href: "/kjekt-a-vite/cmr", label: "CMR-fraktbrev" },
          { href: "/kjekt-a-vite/ata-carnet", label: "ATA-carnet" },
        ],
      },
      {
        heading: "Hvordan kan vi hjelpe?",
        text:
          "SG Logistics kan bistå med praktisk planlegging av transport under transittering, dokumentkontroll, oppfølging av MRN/grensepassering og fortolling når sendingen er fremme.",
      },
    ],
  },

  {
    title: "ATA-carnet",
    slug: "ata-carnet",
    href: "/kjekt-a-vite/ata-carnet",
    category: "Toll",
    intro:
      "ATA-carnet er et internasjonalt tolldokument for midlertidig inn- og utførsel av varer. Det fungerer som et tollpass: du slipper vanlig fortolling og depositum for toll og avgifter, så lenge varene føres tilbake innen fristen.",
    seoTitle: "ATA-carnet midlertidig eksport og import | SG Logistics AS",
    seoDescription:
      "Praktisk guide til ATA-carnet: hva det er, typiske varer, hvordan det brukes ved grensen, digital QR-løsning, gyldighet og vanlige fallgruver.",
    body: [
      {
        heading: "Hva er ATA-carnet?",
        text:
          "ATA er en forkortelse for Admission Temporaire / Temporary Admission. Carnetet er et forenklet alternativ til vanlig tolldeklarering når varer skal tas midlertidig inn eller ut av et land. Ett og samme carnet kan brukes for hele reisen, også gjennom flere land, og erstatter normalt egne eksport-, import- og transitteringsdokumenter for den midlertidige forsendelsen.",
        items: [
          "Du slipper å betale toll og avgifter så lenge varene returneres innen fristen.",
          "Du slipper å fylle ut nasjonale tolldokumenter ved hver grensepassering.",
          "Du slipper å deponere for toll og avgifter i hvert land du besøker.",
          "Samme carnet kan brukes til én eller flere reiser innen gyldighetsperioden.",
        ],
      },
      {
        heading: "Når brukes ATA-carnet?",
        text:
          "Ordningen passer når utstyr eller vareprøver skal brukes midlertidig i utlandet og deretter returneres i samme stand. Typiske brukere er bedrifter på messe, teknikere med yrkesutstyr, idrettsutøvere, kultur- og filmteam, og selgere med vareprøver.",
        items: [
          "Vareprøver til kundemøter eller demonstrasjon.",
          "Yrkesutstyr, verktøy og testutstyr.",
          "Utstyr til messer, utstillinger og shows.",
          "Kamerautstyr, sceneutstyr og lignende for midlertidige oppdrag.",
          "Personlige effekter og sportsutstyr i forbindelse med konkurranse eller arrangement.",
        ],
      },
      {
        heading: "Når kan du ikke bruke ATA-carnet?",
        text:
          "ATA-carnet er ikke en generell midlertidig eksportordning for alle formål. Det brukes ikke når hensikten er reparasjon eller bearbeiding. For dyr gjelder det heller ikke paring, trening eller veterinærbehandling. Skal varene bli værende i utlandet, selges eller endres, er vanlig midlertidig eksport/import eller annen tollprosedyre mer aktuell.",
      },
      {
        heading: "Hvem utsteder carnetet?",
        text:
          "ATA-carnet utstedes av handelskamrene. I Norge er det handelskamrene som står som garantist for toll og avgifter i landene du besøker. Som sikkerhet kreves normalt et depositum. Depositumet tilbakebetales når carnetet returneres og er korrekt brukt. Pris, behandlingstid og hvilke varer som godtas avklarer du med handelskammeret før avreise.",
        items: [
          "Gyldighet er normalt ett år fra utstedelse.",
          "Carnetet skal følge varene hele tiden.",
          "Ordningen er knyttet til ATA-konvensjonen og brukes i et stort antall land og tollområder.",
          "Sjekk alltid at reiselandene dine aksepterer ATA-carnet før du bestiller.",
        ],
      },
      {
        heading: "Slik brukes carnetet ved grensen",
        text:
          "Når du reiser med varer dekket av ATA-carnet, må du stoppe hos tollmyndighetene ved grensepassering. Carnetet skal brukes både ved utreise og innreise. Fordi EU er ett tollområde, stempler du normalt bare inn i første EU-land og ut av siste EU-land.",
        items: [
          "Papircarnet: legg frem carnetet og få aktuelle innførsels- eller utførselsark attestert av Tolletaten.",
          "Digitalt ATA-carnet: vis QR-kode, slik at inn- og utførsel kan registreres digitalt.",
          "Fra 1. juni 2026 er digitalt ATA-carnet tatt i bruk i Norge og flere europeiske land. I en overgangsperiode brukes både papir og digital løsning, og kravene kan variere mellom land.",
          "Carnetet har fargede ark for eksport, midlertidig innførsel og eventuell transitt. Vouchere beholdes av tollmyndighetene, mens motfolier/stempel bekrefter dine passeringer.",
        ],
      },
      {
        heading: "Viktige regler underveis",
        text:
          "For å unngå krav om toll, avgifter eller erstatning må carnetet brukes riktig. Feil bruk, manglende stempling eller varer som ikke returneres kan utløse krav mot depositumet eller handelskammerets garanti.",
        items: [
          "Ta varene tilbake i samme stand som de forlot landet.",
          "Ikke etterlat, selg eller endre varene i utlandet uten at dette er avklart på forhånd.",
          "Respekter carnetets utløpsdato og frister for gjenutførsel og gjeninnførsel satt av tollmyndighetene.",
          "Følg instruksjonene fra utstedende handelskammer.",
          "Ved mistet carnet, eller hvis varene blir igjen i utlandet, kontakt handelskammeret og tollmyndighetene raskt.",
        ],
      },
      {
        heading: "ATA-carnet eller vanlig fortolling/transittering?",
        text:
          "ATA-carnet erstatter ikke alle andre tolldokumenter i alle situasjoner. Det er et spesialverktøy for midlertidig inn- og utførsel av bestemte varetyper. Ved vanlig import, eksport eller forsendelse under felles transittering brukes andre prosedyrer.",
        links: [
          { href: "/kjekt-a-vite/fortolling", label: "Fortolling ved import" },
          { href: "/kjekt-a-vite/transittering", label: "Transittering" },
        ],
      },
      {
        heading: "Vanlige fallgruver",
        text:
          "De fleste problemer oppstår fordi carnetet ikke fremvises, ikke stemplés, eller fordi varene ikke kommer tilbake som planlagt.",
        items: [
          "Å reise uten å stoppe hos Tolletaten for attestering eller digital registrering.",
          "Å anta at ATA-carnet kan brukes til reparasjon, bearbeiding eller permanent leveranse.",
          "Å stemple ved hver intern EU-grense i stedet for bare inn i første og ut av siste EU-land.",
          "Å glemme at papir og digital løsning kan gjelde parallelt i overgangsperioden.",
          "Å returnere carnetet for sent, ufullstendig eller uten riktige attesteringer.",
        ],
      },
      {
        heading: "Hva bør du ha klart før avreise?",
        text:
          "Planlegg carnetet tidlig, særlig ved messe, turné eller flere land. Handelskammeret trenger tid til utstedelse, og varelisten må være korrekt.",
        items: [
          "Hvilke land skal varene innom, og aksepterer de ATA-carnet?",
          "Er formålet midlertidig bruk, ikke salg, reparasjon eller bearbeiding?",
          "Er varelisten komplett med beskrivelse, antall, verdi og identifikasjon?",
          "Skal du bruke papir- eller digitalt carnet i landene du besøker?",
          "Når skal varene være tilbake, og hvem returnerer carnetet til handelskammeret?",
        ],
      },
      {
        heading: "Hvordan kan vi hjelpe?",
        text:
          "SG Logistics kan bistå med praktisk planlegging rundt midlertidig eksport og import, dokumentkontroll og samspill mellom ATA-carnet, transport og øvrig tollbehandling.",
      },
    ],
  },

  {
    title: "Hvordan pakke gods riktig",
    slug: "pakking-av-gods",
    href: "/kjekt-a-vite/pakking-av-gods",
    category: "Pakking",
    intro:
      "Riktig emballering gjør at godset tåler lasting, omlasting, terminalhåndtering, flyfrakt, sjøtransport og levering uten skade, forsinkelse eller ekstra kontroll.",
    seoTitle: "Hvordan pakke gods riktig | SG Logistics AS",
    seoDescription:
      "Praktisk guide til pakking av gods: pall, emballasje, merking, flyfrakt, sjø/container, væsker, temperaturfølsomt gods og kontroll før henting.",
    body: [
      {
        heading: "Start med transportmåten",
        text:
          "Gods som sendes med bil, fly, sjø eller via flere terminaler blir utsatt for ulike belastninger. Emballasjen må tåle truckhåndtering, sortering, omlasting, vibrasjoner, trykk fra annet gods, fukt og normal transportbelastning.",
        items: [
          "Velg emballasje etter vekt, verdi, form, skjørhet og transportmåte.",
          "Pakk slik at godset kan håndteres sammen med annet gods uten å skade eller bli skadet.",
          "Tenk gjennom hele transportkjeden, ikke bare første henting.",
        ],
      },
      {
        heading: "Ytre emballasje og innvendig beskyttelse",
        text:
          "Ytteremballasjen skal beskytte selve varen, mens innvendig beskyttelse skal hindre at varen beveger seg inne i emballasjen. En overlastet kartong kan sprekke, mens tomrom i esken kan føre til støt- og klemskader.",
        items: [
          "Bruk solid bølgepapp, trekasse, pallekarm eller annen emballasje som er tilpasset vekt og innhold.",
          "Fyll tomrom med papir, skum, luftputer, bobleplast eller annen støtdemping.",
          "Beskytt hjørner, kanter og utsatte flater med kantbeskyttelse eller hard emballasje.",
          "Forsegl alle åpninger og skjøter med egnet pakketape, ikke svak kontor- eller maskeringstape.",
        ],
      },
      {
        heading: "Pakking på pall",
        text:
          "Pall er ofte riktig løsning når godset er tungt, består av flere kolli eller skal håndteres med truck. Pallen må være hel, stabil og egnet for godsets vekt.",
        items: [
          "Hold godset innenfor pallens ytterkant. Utstikkende gods er en vanlig skadeårsak.",
          "Legg tyngdepunktet lavt og så sentrert som mulig.",
          "Sikre godset til pallen med strekkfilm, krympeplast, bånd eller stropper.",
          "Bruk mellomlegg eller friksjonsmatter hvis godset kan gli.",
          "Hvis pallen ikke tåler at annet gods stables oppå, må den merkes og bookes som ikke-stablebar.",
        ],
      },
      {
        heading: "Merking av gods",
        text:
          "Gods som ikke er tydelig merket kan bli forsinket eller feilsortert. Merkingen må være lett synlig og tåle håndtering gjennom hele transporten.",
        items: [
          "Fest transportetiketten på en flat og synlig side av kolliet.",
          "Sørg for at avsender, mottaker, referanse og kollinummer stemmer med booking og dokumenter.",
          "Fjern eller dekk til gamle etiketter og strekkoder.",
          "Merk skjørt gods med tydelige symboler, piler for riktig side opp og eventuell informasjon om temperatur eller forsiktig håndtering.",
        ],
        links: [
          {
            href: "/kjekt-a-vite/handteringssymboler",
            label: "Les mer om håndteringssymboler på gods",
          },
        ],
      },
      {
        heading: "Flyfrakt: godset må være ready for carriage",
        text:
          "Flyfrakt stiller ekstra krav fordi godset ofte skal sikkerhetskontrolleres før avgang. Emballasje som gjør kontroll vanskelig kan gi forsinkelser, åpning av kolli, ekstra kostnader eller avvisning.",
        items: [
          "Bruk tett og ubrutt ytteremballasje slik at uvedkommende ikke kan legge noe inn i forsendelsen uten synlige spor.",
          "Ved pall bør også undersiden være lukket, for eksempel med plate under pallens grunnflate.",
          "Gods med høy tetthet, mye metall, væsker eller lukket trekasse kan være vanskelig å røntgenkontrollere.",
          "Større eller tette kolli kan kreve ETD-kontroll, visuell kontroll eller inspeksjonshull.",
          "Vurder flere mindre kolli fremfor én stor pall hvis ulike godstyper og tettheter gjør sikkerhetskontroll vanskelig.",
        ],
      },
      {
        heading: "Størrelse, vekt og volumvekt ved flyfrakt",
        text:
          "Flyfrakt begrenses av flytype, rute, lasterom og sikkerhetskontroll. Det er derfor viktig å avklare mål og vekt før booking, spesielt ved store kolli, lange varer eller tungt gods.",
        items: [
          "Oppgi alltid nøyaktig lengde, bredde, høyde og bruttovekt per kolli.",
          "Prisen beregnes ofte etter faktisk vekt eller volumvekt, avhengig av hva som er høyest.",
          "Innenriks flyfrakt kan ha strengere kollimål enn internasjonal cargo, avhengig av flytype og rute.",
          "Store, tunge eller uvanlig formede kolli bør avklares med speditør før de leveres til terminal.",
        ],
      },
      {
        heading: "Væsker, lekkasje og temperatur",
        text:
          "Væsker og temperaturfølsomt gods krever ekstra planlegging. Dårlig pakket flytende gods kan skade annet gods og utstyr, og avsender kan bli ansvarlig for følgeskader.",
        items: [
          "Bruk emballasje som er egnet for væske og tåler normal transporthåndtering.",
          "Legg inn absorberende materiale der lekkasje kan oppstå.",
          "Sikre lokk, korker og beholdere slik at de ikke åpner seg ved vibrasjon eller trykkendringer.",
          "Kuldesensitivt gods bør beskyttes med thermohette, isolasjon eller temperaturregulert transport når dette er nødvendig.",
        ],
      },
      {
        heading: "Sjøfrakt og container: tenk sikring",
        text:
          "Gods som skal med sjø eller i container må tåle lengre transporttid, bevegelser, fukt, omlasting og løft. Containeren bør kontrolleres før lasting, og godset må sikres slik at det ikke kan forskyve seg.",
        items: [
          "Kontroller at container eller lasteenhet er ren, tørr, hel og egnet før lasting.",
          "Fordel vekten jevnt og unngå tung last høyt oppe eller bare i én ende.",
          "Sikre godset mot glidning, tipping og forskyvning med stengning, surring, kiler, luftputer eller annet egnet utstyr.",
          "Fjern løse deler, avkapp, emballasjerester og annet som kan bli liggende som fremmedlegemer.",
          "Pass på at gods ikke stikker ut eller kan hekte seg fast i løfteutstyr, dører, tak eller annet gods.",
        ],
        links: [
          {
            href: "/kjekt-a-vite/sjofrakt/containerpakking-stuffing",
            label: "Les mer om containerpakking og stuffing",
          },
        ],
      },
      {
        heading: "Seaworthy packing: når vanlig emballasje ikke er nok",
        text:
          "Ved sjøtransport kan godset utsettes for fukt, salt luft, kondens, temperatursvingninger, lang transporttid og røff håndtering. Seaworthy packing betyr at emballasjen er valgt og bygget for disse belastningene, enten godset sendes som FCL, LCL eller annen sjøfrakt.",
        items: [
          "Bruk robuste ytre materialer, for eksempel trekasser, kraftig kartong, kompositt eller spesialkasser.",
          "Beskytt mot fukt og korrosjon med plastliner, barrierefolie, tørremiddel eller korrosjonsbeskyttelse der det trengs.",
          "Sørg for innvendig avstiving, skum, bracing eller blokkering slik at varen ikke beveger seg.",
          "Bruk kraftig lukking, stropping og forsegling som tåler lang transport og omlasting.",
          "Ved treemballasje må krav som ISPM 15 vurderes ved eksport.",
        ],
        links: [
          {
            href: "/kjekt-a-vite/sjofrakt/seaworthy-packing",
            label: "Les den omfattende guiden til seaworthy packing",
          },
        ],
      },
      {
        heading: "Farlig gods må pakkes etter eget regelverk",
        text:
          "Hvis varen er farlig gods, holder det ikke med vanlig god emballasje. Avsender må sikre korrekt klassifisering, godkjent emballasje, merking, dokumentasjon og eventuelle begrensninger for transportmåten.",
        items: [
          "Kontroller sikkerhetsdatabladets punkt 14 før booking.",
          "Bruk korrekt UN-nummer, fareseddel, emballeringsgruppe og godsbetegnelse der dette kreves.",
          "Avklar om varen kan sendes med bil, sjø eller fly før den pakkes og leveres.",
          "Ikke book farlig gods som ordinært gods.",
        ],
        links: [
          {
            href: "/kjekt-a-vite/farlig-gods",
            label: "Les mer om farlig gods",
          },
        ],
      },
      {
        heading: "Sjekkliste før henting",
        text:
          "En enkel kontroll før sjåføren kommer reduserer risikoen for skade, stopp på terminal og ekstra kostnader.",
        items: [
          "Er emballasjen hel, lukket og tilpasset godsets vekt og form?",
          "Er tomrom fylt, og er varen beskyttet mot støt, trykk, fukt og temperatur?",
          "Er pall stabil, innenfor pallkant og sikret mot forskyvning?",
          "Er alle kolli tydelig merket med riktig mottaker, referanse og kollinummer?",
          "Er mål, vekt og antall kolli likt i booking, fraktbrev og pakkliste?",
          "Er det avklart om godset er farlig gods, flyrestriksjon, ikke-stablebart eller temperaturfølsomt?",
        ],
      },
    ],
  },
  {
    title: "Skade på gods: hva gjør du?",
    slug: "skade-pa-gods",
    href: "/kjekt-a-vite/skade-pa-gods",
    category: "Skade og avvik",
    intro:
      "Skade på gods skjer heldigvis veldig sjelden, men når det skjer er rask kontroll, tydelig dokumentasjon og riktig reklamasjon viktig.",
    seoTitle: "Skade på gods: hva gjør du? | SG Logistics AS",
    seoDescription:
      "Praktisk guide ved transportskade: hva mottaker bør gjøre, hvordan synlig og skjult skade meldes, hvilken dokumentasjon som trengs og hva transportforsikring betyr.",
    body: [
      {
        heading: "Skade skjer heldigvis veldig sjelden",
        text:
          "De aller fleste sendinger kommer frem slik de skal. Likevel kan skade, manko eller avvik oppstå i en transportkjede med lasting, terminalhåndtering, omlasting og levering. Da er det viktigste å reagere raskt og dokumentere godt.",
      },
      {
        heading: "Kontroller godset ved mottak",
        text:
          "Mottaker bør kontrollere antall kolli, emballasje og synlige skader mens sjåføren fortsatt er til stede. Synlig skade eller manko bør noteres på fraktbrev, PDA eller leveringskvittering før kvittering gis.",
        items: [
          "Skriv konkret hva som er skadet eller mangler.",
          "Ta bilder av emballasje, skade, pall, merking og eventuell skade på container eller bil.",
          "Behold både skadet gods og emballasje til saken er avklart.",
        ],
      },
      {
        heading: "Synlig skade og skjult skade",
        text:
          "Synlig skade er skade som kan oppdages ved mottak. Skjult skade er skade som først oppdages etter utpakking, selv om emballasje eller gods så helt ut ved levering.",
        items: [
          "Synlig skade bør noteres med en gang ved mottak.",
          "Skjult skade bør meldes skriftlig så raskt som mulig.",
          "Ved innenlands sendinger bør skjult skade normalt meldes uten ugrunnet opphold.",
          "Ved internasjonal veitransport må skjult skade normalt meldes skriftlig innen 7 dager, søndager og helligdager ikke medregnet.",
          "Ved sjøtransport gjelder ofte enda kortere frist: ikke-synlig tap eller skade må normalt meldes skriftlig senest tre dager etter utlevering.",
        ],
      },
      {
        heading: "Dokumentasjon som vanligvis trengs",
        text:
          "Jo bedre dokumentasjon som sendes inn, desto enklere er det å behandle saken. Målet er å vise hva som ble sendt, hva som ble mottatt, og hvordan skaden ser ut.",
        items: [
          "Handelsfaktura eller annen dokumentasjon på verdi.",
          "Pakkliste, ordrebekreftelse eller varelinjer som viser hva sendingen inneholdt.",
          "Kopi av fraktbrev, leveringskvittering eller POD.",
          "Bilder av emballasje før åpning, skadet gods, ytre emballasje, pall og merking.",
          "Kort skriftlig beskrivelse av skade, tidspunkt for oppdagelse og hvem som mottok godset.",
        ],
      },
      {
        heading: "Ikke kast emballasje eller skadet gods for tidlig",
        text:
          "Skadet gods og emballasje bør normalt oppbevares til saken er avklart. Emballasjen kan være viktig for å vurdere om skaden skyldes transport, håndtering, mangelfull emballering eller andre forhold.",
      },
      {
        heading: "Transportøransvar er ikke det samme som vareforsikring",
        text:
          "Mange tror at transportørens ansvar dekker varens fulle verdi, men transportør- og speditøransvar er ofte et begrenset erstatningsansvar. Det kan være knyttet til regelverk, transporttype, vekt, skyld og dokumentasjon.",
        items: [
          "Transportørens ansvar kan være lavere enn varens faktiske verdi.",
          "Ansvarsforsikring dekker transportørens ansvar, ikke nødvendigvis vareeiers økonomiske tap.",
          "Transportforsikring er en egen vareforsikring som normalt må kjøpes av den som har risikoen for varen.",
        ],
        links: [
          {
            href: "/kjekt-a-vite/incoterms",
            label: "Les mer om Incoterms og risikoovergang",
          },
        ],
      },
      {
        heading: "Kort om regelverket for vei, sjø og fly",
        text:
          "Hvilket regelverk som gjelder avhenger av transportmåten. Dette er en praktisk oversikt, ikke juridisk rådgivning, men den viser hvorfor reklamasjon og dokumentasjon må gjøres raskt.",
        items: [
          "Vei: Etter vegfraktloven er fraktfører ansvarlig for tap og skade fra overtakelse til utlevering, men ansvaret kan begrenses og kan falle bort ved blant annet mangelfull pakking eller forhold fraktfører ikke kunne unngå.",
          "Vei: Ansvarsgrensen er normalt 17 SDR per kg ved innenriks transport og 8,33 SDR per kg ved internasjonal transport. Ved forsinkelse er erstatningen normalt begrenset til fraktbeløpet.",
          "Sjø: Etter sjøloven er transportøren ansvarlig mens godset er i transportørens varetekt i lastehavn, under transport og i lossehavn, men også her finnes ansvarsgrenser og unntak.",
          "Sjø: Ansvarsgrensen er normalt 667 SDR per kolli/enhet eller 2 SDR per kg, avhengig av hva som gir høyest ansvar. Ved innenriks sjøtransport er grensen normalt 17 SDR per kg.",
          "Fly: Forskrift om transport av gods i luftfartøy handler særlig om at gods skal være forsvarlig stuet og surret, og at farlig gods skal håndteres etter egne regler. Skadet eller lekkende farlig gods skal ikke aksepteres for flytransport.",
        ],
      },
      {
        heading: "Hvem skal melde skaden?",
        text:
          "Det er normalt den som eier varen eller har den økonomiske risikoen som må fremme krav. Mottaker bør likevel reagere ved mottak og sørge for at skade eller manko blir notert og dokumentert.",
        items: [
          "Kontakt speditør eller transportør så raskt som mulig.",
          "Meld også saken til eget forsikringsselskap dersom varen er transportforsikret.",
          "Oppgi referansenummer, fraktbrevnummer, kollinummer og bilder når saken meldes.",
        ],
      },
      {
        heading: "Slik kan SG Logistics hjelpe",
        text:
          "Ved skade eller avvik kan vi hjelpe med å samle riktig dokumentasjon, avklare transportløpet og gi råd om videre fremgangsmåte. Jo tidligere vi får beskjed, desto enklere er det å følge opp saken mot involverte parter.",
      },
    ],
  },
  {
    title: "Håndteringssymboler på gods",
    slug: "handteringssymboler",
    href: "/kjekt-a-vite/handteringssymboler",
    category: "Pakking",
    intro:
      "Håndteringssymboler gjør at viktige instruksjoner kan forstås på tvers av språk, transportmåter og terminaler. De er relevante for bilfrakt, sjøfrakt, flyfrakt og lagring.",
    seoTitle: "Håndteringssymboler på gods | SG Logistics AS",
    seoDescription:
      "Guide til ISO 780-symboler på emballasje: hva symbolene betyr, når de bør brukes, og hvordan de bør plasseres på kolli.",
    body: [
      {
        heading: "ISO 780-symboler",
        text:
          "Se den fullstendige guiden for ISO 780-symboler, praktisk bruk og symboloversikt.",
      },
    ],
  },
  { title: "Containerguide", slug: "containerguide", href: "/kjekt-a-vite/containerguide", category: "Sjøfrakt", intro: "Praktisk oversikt over vanlige containertyper, metriske mål, volum, nyttelast og bruksområder.", seoTitle: "Containerguide | SG Logistics AS", seoDescription: "Oversikt over vanlige containertyper med metriske mål, volum, nyttelast og praktiske råd.", body: [{ heading: "Containerguide", text: "Se den interaktive containerguiden for detaljerte mål, tegninger og spesifikasjoner." }] },
  {
    title: "Seaworthy packing: sjødyktig emballering",
    slug: "seaworthy-packing",
    href: "/kjekt-a-vite/sjofrakt/seaworthy-packing",
    category: "Sjøfrakt",
    intro:
      "Sjødyktig emballering handler om å beskytte godset mot lang transporttid, fukt, kondens, korrosjon, omlasting og håndtering, enten sendingen går som FCL, LCL eller annen sjøfrakt.",
    seoTitle: "Seaworthy packing og sjødyktig emballering | SG Logistics AS",
    seoDescription:
      "Omfattende guide til sjødyktig emballering: emballasjetyper, innvendig beskyttelse, materialvalg, ISPM 15, merking og håndteringssymboler.",
    body: [
      {
        heading: "Sjødyktig emballering",
        text:
          "Se den fullstendige guiden for seaworthy packing, emballasjetyper, innvendig beskyttelse, ISPM 15 og merking.",
      },
    ],
  },
  {
    title: "Interaktivt kart over havner i verden",
    slug: "containerhavner",
    href: "/kjekt-a-vite/sjofrakt/containerhavner",
    category: "Sjøfrakt",
    intro:
      "Søk i et globalt havnekart basert på NGA World Port Index, med UN/LOCODE der tilgjengelig og markering av containerfasiliteter.",
    seoTitle: "Interaktivt kart over havner i verden | SG Logistics AS",
    seoDescription:
      "Utforsk havner globalt med data fra NGA World Port Index, UN/LOCODE der tilgjengelig og filter for registrerte containerfasiliteter.",
    body: [
      {
        heading: "Globalt havnekart",
        text:
          "Kartet viser havner fra NGA World Port Index og markerer hvor WPI har registrert containerfasiliteter.",
      },
    ],
  },
  {
    title: "En guide til havnene i og rundt Bangkok",
    slug: "havner-i-bangkok",
    href: "/kjekt-a-vite/sjofrakt/havner-i-bangkok",
    category: "Sjøfrakt",
    intro:
      "Oversikt over Laem Chabang, PAT Bangkok, Lat Krabang ICD og private terminaler i Bangkok-regionen, med ledetider, transport mellom havnene og interaktivt kart.",
    seoTitle: "Havner i og rundt Bangkok | SG Logistics AS",
    seoDescription:
      "Guide til havnene i Bangkok-regionen: Laem Chabang, PAT Bangkok, Lat Krabang ICD, private terminaler, ledetider og interaktivt kart.",
    body: [
      {
        heading: "Havner og terminaler i Bangkok-regionen",
        text:
          "Artikkelen forklarer hovedknutepunktene rundt Bangkok, hva CIF/FOB Bangkok betyr i praksis, og hvordan jernbane, lekter og vei binder havnene sammen.",
      },
    ],
  },
  {
    title: "Hvor tung kan en container være på vei?",
    slug: "hvor-tung-kan-en-container-vaere-pa-vei",
    href: "/kjekt-a-vite/sjofrakt/hvor-tung-kan-en-container-vaere-pa-vei",
    category: "Sjøfrakt",
    intro:
      "En container kan være lovlig lastet for sjøtransport, men likevel være for tung til å kjøres på vei. Her forklarer vi forskjellen mellom containerkapasitet, totalvekt, akseltrykk og lokale vektgrenser.",
    seoTitle: "Hvor tung kan en container være på vei? | SG Logistics AS",
    seoDescription:
      "Praktisk guide til vektgrenser for containertransport på vei, forskjellen mellom containerens maksvekt og lovlig veitransport.",
    body: [
      {
        heading: "Containerens kapasitet er ikke det samme som lovlig veitransport",
        text:
          "En container kan være innenfor sin tekniske maksvekt, men likevel overskride tillatt vogntogvekt, akseltrykk eller lokale veibegrensninger.",
      },
    ],
  },
  {
    title: "Containerpakking og seaworthy packing",
    slug: "containerpakking-stuffing",
    href: "/kjekt-a-vite/sjofrakt/containerpakking-stuffing",
    category: "Sjøfrakt",
    intro:
      "Praktiske råd for seaworthy packing ved FCL, LCL og containerlasting: vektfordeling, fukt, sikring og bildedokumentasjon.",
    seoTitle: "Containerpakking og seaworthy packing | SG Logistics AS",
    seoDescription:
      "Slik pakker og sikrer du gods for sjøtransport: seaworthy packing for FCL og LCL, containerlasting, fukt, korrosjon, vektfordeling og sikring.",
    body: [
      {
        heading: "Riktig stuffing reduserer risiko",
        text:
          "Artikkelen forklarer hovedprinsippene for trygg containerpakking og hva som bør kontrolleres før containeren lukkes.",
      },
    ],
  },
] as const;

export type Article = (typeof articles)[number];
export const getArticleBySlug = (slug: string) => articles.find((article) => article.slug === slug);
