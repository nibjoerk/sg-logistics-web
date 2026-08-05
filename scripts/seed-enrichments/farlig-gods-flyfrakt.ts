import {
  callout,
  checklist,
  infoCards,
  linkCards,
  paragraphsToBlocks,
  textBlock,
  type Block,
} from "./_blocks";

export const farligGodsFlyMeta = {
  title: "Farlig gods med fly: hva må vareeier vite?",
  intro:
    "Flytransport har egne og strenge regler for farlig gods. For vareeier er det viktigste å avklare om varen kan flys, hvordan den skal klassifiseres, og hvilken dokumentasjon flyselskapet trenger.",
  seoTitle: "Farlig gods med fly for vareeiere | SG Logistics AS",
  seoDescription:
    "Praktisk guide for vareeiere som skal sende farlig gods med fly: ICAO-TI, Doc 9284, Shipper's Declaration, emballasje, merking og batterier.",
  category: "Flyfrakt",
  hero: {
    src: "/images/articles/farlig-gods-fly-batterier.png",
    alt: "Illustrasjon av batterier og farlig gods i flyfrakt",
  },
};

export function farligGodsFlyEnrichment(): Block[] {
  return [
    callout(
      "Viktig",
      "Denne artikkelen er en praktisk oppsummering for vareeiere, basert på Forskrift om transport av gods i luftfartøy (BSL D 1-7) og ICAO Technical Instructions, Doc 9284, 2025-2026-utgaven. Den erstatter ikke ICAO-TI, IATA DGR, sikkerhetsdatablad eller konkret vurdering av sendingen.",
      "warning",
    ),
    textBlock("Hvilket regelverk gjelder?", "h2"),
    ...paragraphsToBlocks(
      "I Norge viser forskrift om transport av gods i luftfartøy til ICAOs Technical Instructions for the Safe Transport of Dangerous Goods by Air, Doc 9284, ofte kalt ICAO-TI. I praksis brukes også IATA Dangerous Goods Regulations av flyselskaper, speditører og handlingselskaper fordi denne bygger på ICAO-TI og brukes operativt i flyfrakt.\n\nForskriften sier blant annet at farlig gods skal transporteres i samsvar med ICAO-TI, at emballasje skal være produsert, merket og testet etter relevante FN-krav, og at avsender må sørge for korrekt klassifisering, emballering og merking før innlevering.",
    ),
    textBlock("Vareeiers ansvar før flyfrakt", "h2"),
    ...paragraphsToBlocks(
      "Flyselskapet kontrollerer sendingen ved aksept, men det er avsender og vareeier som må vite hva produktet er. Feil klassifisering kan bety at sendingen blir stoppet, at den må pakkes om, eller at den i verste fall utgjør en sikkerhetsrisiko i luftfartøyet.",
    ),
    infoCards(
      [
        {
          title: "Sjekke om varen kan flys",
          text:
            "Noe farlig gods er helt forbudt med fly, og noe kan bare sendes som fraktfly eller etter særskilt godkjenning. Dette må avklares før booking.",
        },
        {
          title: "Klassifisere etter luftregelverket",
          text:
            "UN-nummer, proper shipping name, fareklasse, emballasjegruppe, packing instruction og eventuelle special provisions må være riktige.",
        },
        {
          title: "Bruke flygodkjent emballasje",
          text:
            "Emballasje for flytransport må tåle kravene i ICAO-TI/IATA DGR. Lufttransport stiller ofte strengere krav enn vei og sjø.",
        },
        {
          title: "Merke og label riktig",
          text:
            "Kolli må ha korrekte faresedler, merker, håndteringsetiketter og eventuell Cargo Aircraft Only-merking der dette kreves.",
        },
        {
          title: "Levere korrekt dokumentasjon",
          text:
            "Ved ordinært farlig gods kreves normalt Shipper's Declaration for Dangerous Goods, i tillegg til korrekt informasjon på fraktdokumentene.",
        },
        {
          title: "Ha opplært personell",
          text:
            "Regelmessige avsendere av farlig gods med fly skal ha relevant opplæring. Dette gjelder også når en speditør brukes til innleveringen.",
        },
      ],
      undefined,
      2,
    ),
    textBlock("Dokumentasjon og Shipper's Declaration", "h2"),
    ...paragraphsToBlocks(
      "Ordinært farlig gods med fly krever normalt en Shipper's Declaration for Dangerous Goods. Dette er avsenders erklæring om at godset er fullstendig og presist beskrevet, korrekt klassifisert, pakket, merket og egnet for flytransport.\n\nErklæringen skal normalt være på engelsk. Informasjonen må stemme med kollimerking, etiketter, air waybill, sikkerhetsdatablad og selve varen.",
    ),
    checklist(
      [
        "UN-nummer og proper shipping name",
        "Fareklasse, emballasjegruppe der relevant og eventuell tilleggsfare",
        "Packing instruction og eventuelle special provisions",
        "Antall kolli, emballasjetype og netto mengde",
        "Om kolliet er tillatt på passasjerfly eller bare på fraktfly",
        "Shipper's Declaration der dette kreves",
        "Air waybill-informasjon og eventuell henvisning til farlig gods",
        "Test summary eller teknisk batteridokumentasjon når dette er relevant",
      ],
      "Opplysninger som bør avklares",
    ),
    textBlock("Batterier: den vanligste fallgruven", "h2"),
    ...paragraphsToBlocks(
      "Batterier er blant de vanligste farlig gods-forsendelsene med fly. De er også en av de vanligste årsakene til avvik, fordi batterier ofte er skjult inne i produkter eller blir omtalt som vanlige reservedeler, elektronikk eller reklameartikler.\n\nLithium- og natriumionbatterier ligger i klasse 9, men reglene varierer mye etter batteritype, størrelse, energimengde, om batteriet er sendt alene, pakket sammen med utstyr eller montert i utstyr, og om sendingen skal med passasjerfly eller fraktfly.",
    ),
    infoCards(
      [
        {
          title: "UN 3480",
          label: "Lithium ion batteries",
          text:
            "Oppladbare lithium-ion-/lithium-polymer-batterier sendt alene, for eksempel løse batteripakker. Disse er underlagt strenge krav, blant annet Cargo Aircraft Only-merking og krav til lav ladetilstand.",
        },
        {
          title: "UN 3481",
          label: "Packed with / contained in equipment",
          text:
            "Lithium-ion-batterier pakket sammen med utstyr eller montert i utstyr, for eksempel PC, verktøy, måleinstrumenter eller reservedeler med batteri.",
        },
        {
          title: "UN 3090",
          label: "Lithium metal batteries",
          text:
            "Ikke-oppladbare lithium metal-batterier sendt alene. Slike batterier sendt alene er normalt ikke tillatt som ordinær last på passasjerfly.",
        },
        {
          title: "UN 3091",
          label: "Packed with / contained in equipment",
          text:
            "Lithium metal-batterier pakket sammen med eller montert i utstyr. Reglene avhenger blant annet av lithiuminnhold, antall celler/batterier og emballering.",
        },
        {
          title: "UN 3551 / UN 3552",
          label: "Sodium ion batteries",
          text:
            "Natriumionbatterier er tatt inn i det nyere regelverket. De må vurderes særskilt, og skal ikke automatisk behandles som vanlige lithiumbatterier.",
        },
      ],
      undefined,
      2,
    ),
    checklist(
      [
        "Alle lithium- og natriumionceller/-batterier må normalt ha bestått UN Manual of Tests and Criteria, subsection 38.3.",
        "Lithium-ion: grensen mellom små og større celler/batterier går typisk ved 20 Wh per celle og 100 Wh per batteri.",
        "Lithium metal: grensen mellom små og større celler/batterier går typisk ved 1 g lithium per celle og 2 g lithium per batteri.",
        "UN 3480 lithium-ion-batterier sendt alene: ikke ordinært tillatt som cargo på passasjerfly. På fraktfly er typisk pakkegrense 35 kg for Section IA og 10 kg for Section IB, og ladetilstand skal normalt ikke overstige 30%.",
        "UN 3090 lithium metal-batterier sendt alene: ikke ordinært tillatt som cargo på passasjerfly.",
        "UN 3551 natriumionbatterier sendt alene: ikke ordinært tillatt som cargo på passasjerfly, og skal normalt sendes med ladetilstand på maksimalt 30%.",
        "Batterier pakket med eller montert i utstyr har egne packing instructions.",
        "Fra 2026 er redusert ladetilstand særlig viktig for lithium-ion-batterier pakket med utstyr.",
      ],
      "Praktiske batterigrenser",
    ),
    checklist(
      [
        "Avklar om batteriet er lithium-ion, lithium metal eller natriumion.",
        "Finn riktig UN-nummer: sendt alene, pakket med utstyr eller montert i utstyr.",
        "Kontroller Wh-rating for lithium-ion, lithiuminnhold for lithium metal og relevant testdokumentasjon.",
        "Sørg for at celler og batterier har bestått UN 38.3, og at test summary kan fremskaffes.",
        "Beskytt poler mot kortslutning og pakk slik at batterier ikke kan bevege seg eller aktiveres utilsiktet.",
        "Ikke send skadde, defekte eller tilbakekalte batterier uten særskilt faglig avklaring.",
        "Avklar om sendingen kan gå med passasjerfly, må gå som Cargo Aircraft Only, eller ikke kan sendes med fly.",
        "For lithium-ion-batterier: avklar krav til state of charge.",
      ],
      "Batterisjekk før booking",
    ),
    textBlock("Skadde eller defekte batterier", "h3"),
    ...paragraphsToBlocks(
      "Batterier som er skadet, defekte, tilbakekalt eller mistenkt å kunne utvikle varme, brann eller kortslutning, må ikke sendes som vanlig batterigods. Slike sendinger krever særskilt vurdering, spesialemballasje og ofte godkjenninger. Er du i tvil, skal sendingen stoppes før den kommer til terminal eller flyplass.",
    ),
    textBlock("Flytype og Cargo Aircraft Only", "h2"),
    ...paragraphsToBlocks(
      "Ikke alt farlig gods kan sendes med passasjerfly. Noe kan bare sendes på fraktfly, og noe er forbudt med fly under normale omstendigheter. Dette gjelder særlig enkelte batterier, kjemikalier, gasser og produkter med høy risiko.\n\nNår en sending er begrenset til fraktfly, må kolliet merkes riktig og ruten må planlegges deretter. Dette kan påvirke pris, ledetid og tilgjengelige destinasjoner.",
    ),
    textBlock("Opplæring og akseptkontroll", "h2"),
    ...paragraphsToBlocks(
      "Luftregelverket stiller tydelige krav til opplæring. Avsendere som regelmessig sender farlig gods med fly, skal ha relevant opplæring. Speditør og operatør har egne kontrollplikter, men de overtar ikke ansvaret for at vareeiers produktinformasjon er riktig.\n\nOperatøren skal blant annet bruke akseptsjekkliste, kontrollere dokumentasjon, se etter skade eller lekkasje og gi fartøysjefen nødvendig informasjon om farlig gods om bord.",
    ),
    textBlock("Før du booker flytransport", "h2"),
    ...paragraphsToBlocks(
      "Flyfrakt er ofte tidskritisk. Nettopp derfor bør farlig gods avklares tidlig. Hvis informasjonen kommer for sent, kan sendingen miste flyavgang selv om varen i utgangspunktet kan flys.",
    ),
    checklist([
      "Send sikkerhetsdatablad og transportklassifisering før booking.",
      "Oppgi om varen inneholder batterier, aerosoler, gass, væske, magnetisert materiale, tørris eller kjemikalier.",
      "Legg ved bilde av produkt, batterimerking og emballasje hvis det er tvil.",
      "Ikke anta at en vare som er lovlig på vei også kan flys.",
      "Vent med innlevering til speditør eller flyselskap har bekreftet at sendingen kan aksepteres.",
      "Husk at skjult eller feildeklarert farlig gods kan bli stoppet, returnert eller rapportert.",
    ]),
    callout(
      "SG Logistics kan hjelpe",
      "Vi kan bistå med praktisk avklaring før booking, dialog med flyselskap og kontroll av hvilken informasjon som trengs. Klassifisering og produktdata må likevel komme fra vareeier, produsent eller fagkyndig rådgiver.",
    ),
    linkCards([
      {title: "Farlig gods på vei og jernbane", href: "/kjekt-a-vite/farlig-gods-pa-vei"},
      {title: "Hvordan pakke gods riktig", href: "/kjekt-a-vite/pakking-av-gods"},
      {title: "Fortolling ved import", href: "/kjekt-a-vite/fortolling"},
    ]),
  ];
}
