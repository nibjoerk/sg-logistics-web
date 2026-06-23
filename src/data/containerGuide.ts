export type ContainerSpecGroup = {
  title: string;
  rows: Array<{ label: string; value: string }>;
};

export type ContainerGuideItem = {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  badge: string;
  intro: string;
  image: string;
  drawing: string;
  specs: ContainerSpecGroup[];
  useCases: Array<{ title: string; text: string }>;
};

export const containerGuideItems: ContainerGuideItem[] = [
  {
    id: "20-dc",
    title: "20' DC – 20 fot Dry Container",
    shortTitle: "20' DC",
    subtitle: "20 fot Dry Container",
    badge: "20 fot",
    intro: "Den mest brukte containeren for tørr last. Ideell for gods som ikke krever temperaturkontroll, særlig når vekt er viktigere enn volum.",
    image: "/images/containers/20-dc.webp",
    drawing: "/images/container-drawings/20-dc-dim.webp",
    specs: [
      { title: "Utvendige mål", rows: [
        { label: "Lengde", value: "6 058 mm" },
        { label: "Bredde", value: "2 438 mm" },
        { label: "Høyde", value: "2 591 mm" },
      ]},
      { title: "Innvendige mål", rows: [
        { label: "Lengde", value: "5 898 mm" },
        { label: "Bredde", value: "2 352 mm" },
        { label: "Høyde", value: "2 393 mm" },
      ]},
      { title: "Kapasitet", rows: [
        { label: "Innvendig volum", value: "ca. 33,2 m³" },
        { label: "Maks. totalvekt", value: "30 480 kg" },
        { label: "Tara vekt", value: "ca. 2 200–2 300 kg" },
        { label: "Maks. nyttelast", value: "ca. 28 180–30 200 kg" },
      ]},
      { title: "Døråpning", rows: [
        { label: "Bredde", value: "2 340 mm" },
        { label: "Høyde", value: "2 280–2 292 mm" },
      ]},
    ],
    useCases: [
      { title: "Tungt gods", text: "Godt valg når sendingen har høy vekt, men begrenset volum." },
      { title: "Mindre partier", text: "Passer ofte når en 40' container gir unødvendig mye plass." },
      { title: "Industrivarer", text: "Egnet for maskindeler, råvarer, verktøy og pakket gods." },
      { title: "Kostnadskontroll", text: "Kan være rimeligere når volumbehovet er begrenset." },
    ],
  },
  {
    id: "40-dc",
    title: "40' DC – 40 fot Dry Container",
    shortTitle: "40' DC",
    subtitle: "40 fot Dry Container",
    badge: "40 fot",
    intro: "Standardløsningen for større tørrlastforsendelser. Gir vesentlig mer volum enn 20' DC, men omtrent samme maksimale totalvekt.",
    image: "/images/containers/40-dc.webp",
    drawing: "/images/container-drawings/40-dc-dim.webp",
    specs: [
      { title: "Utvendige mål", rows: [
        { label: "Lengde", value: "12 192 mm" },
        { label: "Bredde", value: "2 438 mm" },
        { label: "Høyde", value: "2 591 mm" },
      ]},
      { title: "Innvendige mål", rows: [
        { label: "Lengde", value: "12 032 mm" },
        { label: "Bredde", value: "2 352 mm" },
        { label: "Høyde", value: "2 393 mm" },
      ]},
      { title: "Kapasitet", rows: [
        { label: "Innvendig volum", value: "ca. 67,7 m³" },
        { label: "Maks. totalvekt", value: "30 480–32 500 kg" },
        { label: "Tara vekt", value: "ca. 3 700–3 850 kg" },
        { label: "Maks. nyttelast", value: "ca. 26 600–28 800 kg" },
      ]},
      { title: "Døråpning", rows: [
        { label: "Bredde", value: "2 340 mm" },
        { label: "Høyde", value: "2 280–2 292 mm" },
      ]},
    ],
    useCases: [
      { title: "Større volum", text: "Godt valg for større partier og gods med lavere vekt per kubikk." },
      { title: "Pallgods", text: "Egnet for handelsvarer, kartonger og standardisert pallgods." },
      { title: "Lavere kubikkpris", text: "Ofte gunstig når du fyller store deler av containeren." },
      { title: "Tørrlast", text: "For gods som ikke krever kjøl, frys eller spesialhåndtering." },
    ],
  },
  {
    id: "40-hc",
    title: "40' HC – 40 fot High Cube",
    shortTitle: "40' HC",
    subtitle: "40 fot High Cube",
    badge: "40 fot HC",
    intro: "En 40' container med ekstra høyde. Brukes når godset er høyt, eller når ekstra innvendig volum gir bedre utnyttelse.",
    image: "/images/containers/40-hc.webp",
    drawing: "/images/container-drawings/40-hc-dim.webp",
    specs: [
      { title: "Utvendige mål", rows: [
        { label: "Lengde", value: "12 192 mm" },
        { label: "Bredde", value: "2 438 mm" },
        { label: "Høyde", value: "2 896 mm" },
      ]},
      { title: "Innvendige mål", rows: [
        { label: "Lengde", value: "12 032 mm" },
        { label: "Bredde", value: "2 352 mm" },
        { label: "Høyde", value: "2 698 mm" },
      ]},
      { title: "Kapasitet", rows: [
        { label: "Innvendig volum", value: "ca. 76,3 m³" },
        { label: "Maks. totalvekt", value: "30 480–32 500 kg" },
        { label: "Tara vekt", value: "ca. 3 850–4 300 kg" },
        { label: "Maks. nyttelast", value: "ca. 28 200–28 650 kg" },
      ]},
      { title: "Døråpning", rows: [
        { label: "Bredde", value: "2 340 mm" },
        { label: "Høyde", value: "ca. 2 585–2 597 mm" },
      ]},
    ],
    useCases: [
      { title: "Høyt gods", text: "Passer når standard høyde gir for lite klaring." },
      { title: "Volumvarer", text: "Godt egnet for lett gods som tar mye plass." },
      { title: "Møbler og interiør", text: "Ekstra høyde gir bedre stabling og utnyttelse." },
      { title: "Effektiv fylling", text: "Mer kubikk uten at grunnflaten øker." },
    ],
  },
  {
    id: "20-flat-rack",
    title: "20' Flat Rack",
    shortTitle: "20' Flat Rack",
    subtitle: "20 fot Flat Rack",
    badge: "20 fot",
    intro: "Flat rack brukes for tungt eller bredt gods som ikke passer i en lukket container. Lasten sikres på åpen plattform med endegavler.",
    image: "/images/containers/20-flat-rack.webp",
    drawing: "/images/container-drawings/20-flat-rack-dim.webp",
    specs: [
      { title: "Utvendige mål", rows: [
        { label: "Lengde", value: "6 058 mm" },
        { label: "Bredde", value: "2 438 mm" },
        { label: "Høyde", value: "2 591 mm" },
      ]},
      { title: "Lastemål", rows: [
        { label: "Lastelengde", value: "ca. 5 658 mm" },
        { label: "Innvendig bredde", value: "ca. 2 235 mm" },
        { label: "Fri høyde", value: "åpen konstruksjon" },
      ]},
      { title: "Kapasitet", rows: [
        { label: "Maks. totalvekt", value: "34 000–45 000 kg" },
        { label: "Tara vekt", value: "ca. 2 740–2 940 kg" },
        { label: "Maks. nyttelast", value: "ca. 31 260–42 100 kg" },
        { label: "Sikring", value: "kraftige surrepunkter" },
      ]},
    ],
    useCases: [
      { title: "Tung last", text: "Egnet for maskiner, stål og konsentrert industrilast." },
      { title: "Bred last", text: "Brukes når godset ikke passer innenfor veggene på en standardcontainer." },
      { title: "Kranlasting", text: "Last kan løftes på ovenfra eller fra siden." },
      { title: "Prosjektlast", text: "Ofte brukt i prosjekt- og spesialtransport." },
    ],
  },
  {
    id: "40-flat-rack",
    title: "40' Flat Rack",
    shortTitle: "40' Flat Rack",
    subtitle: "40 fot Flat Rack",
    badge: "40 fot",
    intro: "For langt, tungt eller bredt gods som krever åpen lasteflate. En 40' flat rack gir større lasteflate enn 20' varianten.",
    image: "/images/containers/40-flat-rack.webp",
    drawing: "/images/container-drawings/40-flat-rack-dim.webp",
    specs: [
      { title: "Utvendige mål", rows: [
        { label: "Lengde", value: "12 192 mm" },
        { label: "Bredde", value: "2 438 mm" },
        { label: "Høyde", value: "2 591 mm" },
      ]},
      { title: "Lastemål", rows: [
        { label: "Lastelengde", value: "ca. 11 786 mm" },
        { label: "Innvendig bredde", value: "ca. 2 235 mm" },
        { label: "Fri høyde", value: "åpen konstruksjon" },
      ]},
      { title: "Kapasitet", rows: [
        { label: "Maks. totalvekt", value: "50 000–60 000 kg" },
        { label: "Tara vekt", value: "ca. 5 800–5 950 kg" },
        { label: "Maks. nyttelast", value: "ca. 44 050–54 200 kg" },
        { label: "Sikring", value: "kraftige surrepunkter" },
      ]},
    ],
    useCases: [
      { title: "Lang last", text: "For gods som er for langt for 20' flat rack." },
      { title: "Tungt gods", text: "Brukes ofte til maskiner, konstruksjoner og industriprosjekter." },
      { title: "OOG", text: "Aktuell ved out-of-gauge last som krever spesialplanlegging." },
      { title: "Kran og sikring", text: "Krever god plan for løft, sikring og vektfordeling." },
    ],
  },
  {
    id: "20-open-top",
    title: "20' Open Top",
    shortTitle: "20' OT",
    subtitle: "20 fot Open Top",
    badge: "20 fot",
    intro: "Open Top har åpen topp og brukes når godset må lastes med kran eller er for høyt for vanlig døråpning.",
    image: "/images/containers/20-open-top.webp",
    drawing: "/images/container-drawings/20-open-top-dim.webp",
    specs: [
      { title: "Utvendige mål", rows: [
        { label: "Lengde", value: "6 058 mm" },
        { label: "Bredde", value: "2 438 mm" },
        { label: "Høyde", value: "2 591 mm" },
      ]},
      { title: "Innvendige mål", rows: [
        { label: "Lengde", value: "5 898 mm" },
        { label: "Bredde", value: "2 352 mm" },
        { label: "Høyde", value: "ca. 2 311 mm" },
      ]},
      { title: "Kapasitet", rows: [
        { label: "Innvendig volum", value: "ca. 32–33 m³" },
        { label: "Maks. totalvekt", value: "30 480–32 500 kg" },
        { label: "Maks. nyttelast", value: "ca. 30 000 kg" },
        { label: "Tak", value: "åpen topp / presenning" },
      ]},
      { title: "Døråpning", rows: [
        { label: "Bredde", value: "2 340 mm" },
        { label: "Høyde", value: "2 280 mm" },
      ]},
    ],
    useCases: [
      { title: "Kranlasting", text: "Gods kan løftes direkte inn ovenfra." },
      { title: "Overhøy last", text: "Egnet når høyden gjør standard container uaktuell." },
      { title: "Tungt gods", text: "Brukes for maskiner og industrigods." },
      { title: "Fleksibel lasting", text: "Nyttig når godset er vanskelig å laste gjennom dører." },
    ],
  },
  {
    id: "40-open-top",
    title: "40' Open Top",
    shortTitle: "40' OT",
    subtitle: "40 fot Open Top",
    badge: "40 fot",
    intro: "40' Open Top gir lang lasteflate og åpen topp. Brukes for langt eller høyt gods som må lastes ovenfra.",
    image: "/images/containers/40-open-top.webp",
    drawing: "/images/container-drawings/40-open-top-dim.webp",
    specs: [
      { title: "Utvendige mål", rows: [
        { label: "Lengde", value: "12 192 mm" },
        { label: "Bredde", value: "2 438 mm" },
        { label: "Høyde", value: "2 591 mm" },
      ]},
      { title: "Innvendige mål", rows: [
        { label: "Lengde", value: "12 032 mm" },
        { label: "Bredde", value: "2 352 mm" },
        { label: "Høyde", value: "ca. 2 311 mm" },
      ]},
      { title: "Kapasitet", rows: [
        { label: "Innvendig volum", value: "ca. 66 m³" },
        { label: "Maks. totalvekt", value: "30 480–32 500 kg" },
        { label: "Maks. nyttelast", value: "ca. 26 600–28 500 kg" },
        { label: "Tak", value: "åpen topp / presenning" },
      ]},
      { title: "Døråpning", rows: [
        { label: "Bredde", value: "2 340 mm" },
        { label: "Høyde", value: "2 280 mm" },
      ]},
    ],
    useCases: [
      { title: "Langt gods", text: "For lengre enheter som krever åpen topp." },
      { title: "Kranlasting", text: "Lastes effektivt ovenfra på terminal eller havn." },
      { title: "Høyt gods", text: "Aktuell når lasten er høyere enn standard container." },
      { title: "Prosjektlast", text: "Ofte brukt for spesielle industriforsendelser." },
    ],
  },
  {
    id: "20-reefer",
    title: "20' Reefer",
    shortTitle: "20' Reefer",
    subtitle: "20 fot kjølecontainer",
    badge: "20 fot",
    intro: "Temperaturkontrollert container for mindre partier med kjøle- eller frysebehov.",
    image: "/images/containers/20-reefer.webp",
    drawing: "/images/container-drawings/20-reefer-dim.webp",
    specs: [
      { title: "Utvendige mål", rows: [
        { label: "Lengde", value: "6 058 mm" },
        { label: "Bredde", value: "2 438 mm" },
        { label: "Høyde", value: "2 591 mm" },
      ]},
      { title: "Innvendige mål", rows: [
        { label: "Lengde", value: "ca. 5 458 mm" },
        { label: "Bredde", value: "ca. 2 286–2 294 mm" },
        { label: "Høyde", value: "ca. 2 259 mm" },
      ]},
      { title: "Kapasitet", rows: [
        { label: "Innvendig volum", value: "ca. 28 m³" },
        { label: "Temperatur", value: "typisk -40 °C til +30 °C" },
        { label: "Maks. totalvekt", value: "30 480–32 000 kg" },
        { label: "Maks. nyttelast", value: "ca. 27 500–29 000 kg" },
      ]},
      { title: "Døråpning", rows: [
        { label: "Bredde", value: "ca. 2 294 mm" },
        { label: "Høyde", value: "ca. 2 261 mm" },
      ]},
    ],
    useCases: [
      { title: "Kjølevarer", text: "For mindre partier som krever stabil temperatur." },
      { title: "Frysevarer", text: "Egnet for frossen last ved riktig temperaturinnstilling." },
      { title: "Mat og pharma", text: "Brukes ofte for næringsmidler og temperaturfølsomme varer." },
      { title: "Kontroll", text: "Krever korrekt temperatur, pre-trip inspection og strømtilgang." },
    ],
  },
  {
    id: "40-reefer",
    title: "40' Reefer",
    shortTitle: "40' Reefer",
    subtitle: "40 fot kjølecontainer",
    badge: "40 fot",
    intro: "Temperaturkontrollert container for større partier med kjøle-, fryse- eller temperaturkrav.",
    image: "/images/containers/40-reefer.webp",
    drawing: "/images/container-drawings/40-reefer-dim.webp",
    specs: [
      { title: "Utvendige mål", rows: [
        { label: "Lengde", value: "12 192 mm" },
        { label: "Bredde", value: "2 438 mm" },
        { label: "Høyde", value: "2 591–2 896 mm" },
      ]},
      { title: "Innvendige mål", rows: [
        { label: "Lengde", value: "ca. 11 556 mm" },
        { label: "Bredde", value: "ca. 2 294 mm" },
        { label: "Høyde", value: "ca. 2 261–2 545 mm" },
      ]},
      { title: "Kapasitet", rows: [
        { label: "Innvendig volum", value: "ca. 67 m³" },
        { label: "Temperatur", value: "typisk -40 °C til +30 °C" },
        { label: "Maks. totalvekt", value: "ca. 34 000 kg" },
        { label: "Maks. nyttelast", value: "ca. 29 000 kg" },
      ]},
      { title: "Døråpning", rows: [
        { label: "Bredde", value: "ca. 2 294 mm" },
        { label: "Høyde", value: "ca. 2 261 mm" },
      ]},
    ],
    useCases: [
      { title: "Større kjølepartier", text: "For høyt volum med temperaturkrav." },
      { title: "Ferskvarer", text: "Aktuell for matvarer, frukt, fisk og andre følsomme produkter." },
      { title: "Fryselast", text: "Kan brukes for frossen last ved korrekt innstilling." },
      { title: "Planlegging", text: "Krever temperaturdata, strømtilgang og riktig lastemønster." },
    ],
  },
];
