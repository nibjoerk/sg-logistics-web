import type { Article } from "../articleTypes";

export const transittering: Article = {
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
};
