export const site = {
  name: "Halden",
  legalName: "Halden advokátní kancelář",
  email: "atelier@halden.cz",
  description:
    "Halden je advokátní kancelář v Praze a ve Vídni. Zastupujeme vlastníky, vedení a rodiny v rozhodnutích, kde záleží na formulaci stejně jako na výsledku.",
  founded: "2009",
  lawyers: "28",
} as const;

export const nav = [
  { to: "/oblasti", label: "Oblasti" },
  { to: "/pristup", label: "Přístup" },
  { to: "/atelier", label: "Ateliér" },
  { to: "/lide", label: "Lidé" },
  { to: "/poznamky", label: "Poznámky" },
] as const;

export type Practice = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  lead: string;
  when: string[];
  work: string[];
  decline: string;
  people: string[];
};

export const practices: Practice[] = [
  {
    slug: "transakce",
    index: "01",
    title: "Transakce a korporát",
    summary: "Prodej, vstup investora a smlouva, která přežije první spor.",
    lead: "Vedeme prodeje podílů, vstupy investorů a úpravy společenských smluv. Partner, který věc přijme, je u stolu až do closingu.",
    when: [
      "Prodáváte většinový podíl a kupující už má svého poradce.",
      "Do firmy vstupuje investor a stávající vlastník má zůstat.",
      "Společenská smlouva vznikla v klidu a teď se o ni hádáte.",
    ],
    work: [
      "Struktura transakce dřív, než se otevře datová místnost.",
      "Smlouvy, ve kterých je riziko pojmenované, ne rozptýlené v přílohách.",
      "Jednání, na která chodí člověk oprávněný říct ne.",
      "Closing bez nočního překvapení v záručních prohlášeních.",
    ],
    decline:
      "Nepřebíráme aukce, jejichž jediným zadáním je srazit cenu právní práce.",
    people: ["klara-holan"],
  },
  {
    slug: "spory",
    index: "02",
    title: "Spory a rozhodčí řízení",
    summary: "Soud, arbitráž, nebo dohoda, která skončí dřív než řízení.",
    lead: "Bereme spory, ve kterých už byla řečena věta, která se nedá vzít zpět. Nejdřív řekneme, jestli se vůbec má podávat.",
    when: [
      "Protistrana odmítá jednat a lhůta se krátí.",
      "Jste členem orgánu a firma vás chce nést jako viníka.",
      "Rozhodčí doložka je ve smlouvě, kterou jste nepodepisovali vy.",
    ],
    work: [
      "Posouzení, jestli žaloba zlepší pozici, nebo jen utratí čas.",
      "Písemná strategie na jednu stránku, ne na deset.",
      "Zastoupení u soudu a v rozhodčím řízení v Česku a v Rakousku.",
      "Dohoda, která se dá splnit, ne jen vyhlásit.",
    ],
    decline: "Neděláme spory vedené pro princip, pokud nám to klient neřekne nahlas a dopředu.",
    people: ["marek-voss"],
  },
  {
    slug: "majetek",
    index: "03",
    title: "Majetek a nástupnictví",
    summary: "Předání, které nerozbije firmu ani vztahy.",
    lead: "Skládáme vlastnictví tak, aby přežilo lidi, kteří ho dnes drží. Většinou česky a německy, často přes hranici.",
    when: [
      "Druhá generace má vstoupit a nikdo nechce otevřít první větu.",
      "Majetek je ve firmě, ve vídeňské nemovitosti a v jedné hlavě.",
      "Chcete svěřenskou strukturu, které za deset let porozumí i ten, kdo ji nepsal.",
    ],
    work: [
      "Mapa majetku bez eufemismů.",
      "Řád nástupnictví, který rozlišuje vlastnictví a řízení.",
      "Svěřenské a společenské struktury v Česku a v Rakousku.",
      "Dokument, který rodina unese přečíst nahlas.",
    ],
    decline: "Neskládáme struktury, jejichž jediný účel je schovat se před někým z rodiny.",
    people: ["elena-susicka"],
  },
  {
    slug: "regulace",
    index: "04",
    title: "Regulace a dohled",
    summary: "Odpověď má být v dokumentu, ne v paměti jednoho člověka.",
    lead: "Připravujeme regulované subjekty na otázku, která ještě nepřišla. AML, finanční dohled, vnitřní předpisy, které někdo opravdu vede.",
    when: [
      "Blíží se kontrola a složka „governance“ je složka jen podle názvu.",
      "Licence, ohlášení nebo změna ovládající osoby.",
      "Vnitřní předpis existuje, ale neodpovídá tomu, jak firma skutečně pracuje.",
    ],
    work: [
      "Mezera mezi předpisem a praxí, napsaná bez alibismu.",
      "Odpovědi dohledu, které se drží otázky.",
      "AML a vnitřní řídicí dokumenty, které unese provoz.",
      "Příprava statutárů na ústní jednání.",
    ],
    decline: "Nepíšeme politiky, které mají viset na zdi a nikdy se neotevřít.",
    people: ["tomas-lind"],
  },
  {
    slug: "nemovitosti",
    index: "05",
    title: "Nemovitosti",
    summary: "Riziko bývá v definici plochy, ne v úvodním článku.",
    lead: "Akvizice, development a nájmy. Čteme přílohy. Držíme vývojáře, vlastníky a nájemce, kteří staví nebo drží na dlouho.",
    when: [
      "Kupujete areál a prodávající spěchá na podpis.",
      "Nájem klíčového nájemce nese celý model.",
      "Územní rozhodnutí, věcné břemeno nebo soused má větší váhu než cena.",
    ],
    work: [
      "Prověrka titulu a smluv, které na titulu visí.",
      "Smlouvy o dílo a nájmy s definicemi, které se dají změřit.",
      "Jednání s financující bankou bez dvou paralelních pravd.",
      "Klidný closing pozemku, ne jen budovy.",
    ],
    decline: "Nevedeme spekulativní nákupy, u kterých klient nechce znát vadu před podpisem.",
    people: ["adam-riha"],
  },
  {
    slug: "prace-vedeni",
    index: "06",
    title: "Práce vedení",
    summary: "Smlouva statutára, odchod a odpovědnost. Diskrétně a včas.",
    lead: "Držíme hranici mezi zájmem společnosti a zájmem člověka, který ji vede. Dřív, než se ta hranice začne hledat u soudu.",
    when: [
      "Nastupujete do představenstva a smlouva přišla „standardní“.",
      "Odcházíte a konkurence, odstupné a mlčenlivost jsou v jedné větě.",
      "Firma chce, abyste nesli odpovědnost, kterou nemáte z čeho řídit.",
    ],
    work: [
      "Smlouvy o výkonu funkce a manažerské smlouvy.",
      "Odchody, uvolnění a konkurenční doložky, které obstojí.",
      "Oddělení poradenství společnosti a poradenství člověku.",
      "Ticho tam, kde ticho patří, a papír tam, kde bez něj není ochrana.",
    ],
    decline: "Nezastupujeme zároveň společnost a jejího statutáře ve stejné věci.",
    people: ["nils-berg"],
  },
];

export type Person = {
  slug: string;
  name: string;
  given: string;
  role: string;
  focus: string;
  city: string;
  languages: string;
  bio: string[];
  matters: string[];
};

export const people: Person[] = [
  {
    slug: "klara-holan",
    name: "Klára Holan",
    given: "KH",
    role: "Řídící partnerka",
    focus: "Transakce a korporát",
    city: "Praha",
    languages: "Česky, anglicky",
    bio: [
      "Vede kancelář a transakce, ve kterých má zůstat jeden hlas od prvního hovoru po closing.",
      "Než vznikl Halden, byla interní právníčkou průmyslové skupiny. Odtud nechuť k radám, které nejdou podepsat.",
    ],
    matters: ["transakce"],
  },
  {
    slug: "marek-voss",
    name: "Marek Voss",
    given: "MV",
    role: "Partner",
    focus: "Spory a rozhodčí řízení",
    city: "Praha",
    languages: "Česky, anglicky",
    bio: [
      "Vede spory a vyjednávání, které má spor nahradit. Píše krátce. Na jednání mluví ještě méně.",
      "Klienti ho volají, když už byla řečena věta, která se nedá vzít zpět, a zbývá rozhodnout, co s ní.",
    ],
    matters: ["spory"],
  },
  {
    slug: "elena-susicka",
    name: "Elena Sušická",
    given: "ES",
    role: "Partnerka",
    focus: "Majetek a nástupnictví",
    city: "Vídeň",
    languages: "Česky, německy, anglicky",
    bio: [
      "Skládá vlastnictví tak, aby přežilo lidi, kteří ho dnes drží.",
      "Pracuje s rodinami, které mají firmu na obou stranách hranice, a trvá na tom, aby dokument unesly přečíst nahlas.",
    ],
    matters: ["majetek"],
  },
  {
    slug: "tomas-lind",
    name: "Tomáš Lind",
    given: "TL",
    role: "Partner",
    focus: "Regulace a dohled",
    city: "Praha",
    languages: "Česky, anglicky",
    bio: [
      "Připravuje regulované subjekty na otázku, která ještě nepřišla.",
      "Dohlíží na to, aby odpověď byla v dokumentu, ne v paměti jednoho člověka, který zrovna odchází na dovolenou.",
    ],
    matters: ["regulace"],
  },
  {
    slug: "adam-riha",
    name: "Adam Říha",
    given: "AŘ",
    role: "Counsel",
    focus: "Nemovitosti",
    city: "Praha",
    languages: "Česky, anglicky",
    bio: [
      "Čte přílohy. Development, akvizice a nájmy, ve kterých je riziko schované ve definici plochy, ne v úvodním článku.",
      "Na prohlídku jezdí dřív, než se otevře smlouva. Papír a pozemek musejí popisovat totéž.",
    ],
    matters: ["nemovitosti"],
  },
  {
    slug: "nils-berg",
    name: "Nils Berg",
    given: "NB",
    role: "Counsel",
    focus: "Práce vedení",
    city: "Vídeň",
    languages: "Německy, česky, anglicky",
    bio: [
      "Smlouvy statutárů, odchody a odpovědnost.",
      "Drží hranici mezi zájmem společnosti a zájmem člověka, který ji vede, a řekne nahlas, když tu hranici ve stejné věci držet nejde.",
    ],
    matters: ["prace-vedeni"],
  },
];

export type NoteSection = { heading: string; paragraphs: string[] };

export type Note = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  minutes: number;
  excerpt: string;
  sections: NoteSection[];
};

export const notes: Note[] = [
  {
    slug: "ticho-ve-smlouve",
    title: "Ticho ve smlouvě",
    date: "2026-03-12",
    displayDate: "12. března 2026",
    minutes: 6,
    excerpt:
      "Chybějící věta se tři roky tváří jako elegance. Pak se stane výkladem, který nikdo nechtěl.",
    sections: [
      {
        heading: "Co chybějící věta udělá za tři roky",
        paragraphs: [
          "Smlouva, která je krátká, není automaticky dobrá. Krátká je tehdy, když každá věta, která v ní není, chybí schválně. Většina smluv, které čteme po sporu, je krátká omylem. Strany si v den podpisu rozuměly. Rozuměly si v místnosti. Místnost se za tři roky nedá předvolat.",
          "Ticho ve smlouvě má cenu jen tam, kde právo mezeru vyplní způsobem, který obě strany unesou. Když ji vyplní zvykem odvětví, pamětí jednoho manažera nebo tím, kdo má v tu chvíli silnějšího advokáta, ticho nebylo elegantní. Bylo lenivé.",
        ],
      },
      {
        heading: "Definice, ne úvod",
        paragraphs: [
          "Úvodní prohlášení o partnerství a důvěře spor nerozhodnou. Rozhodne definice plochy, EBITDA, ovládání, nebo věty „podstatné nepříznivé změny“, kterou nikdo neumí použít na konkrétní číslo.",
          "Když nás klient žádá o kratší smlouvu, neškrtáme definice. Škrtáme přídavná jména. Dobrá definice je kratší než odstavec ujištění, a dá se o ni opřít bez toho, aby se obě strany musely vrátit do e-mailu z května.",
        ],
      },
      {
        heading: "Kdy mlčení patří",
        paragraphs: [
          "Mlčení patří k tomu, co zákon říká jasně a co nechcete ve smlouvě omylem zhoršit. Patří k obchodnímu tajemství, které do smlouvy nepatří vůbec. Nepatří k ceně, k tomu, kdo nese vadu, a k tomu, jak se věc skončí, když si přestanete rozumět.",
          "Než smlouvu pošleme, ptáme se na jednu věc: kterou větu by za tři roky hledal člověk, který u podpisu nebyl. Když odpověď ve smlouvě není, buď ji dopíšeme, nebo napíšeme klientovi, proč ji tam schválně nemáme.",
        ],
      },
    ],
  },
  {
    slug: "due-diligence-bez-archivu",
    title: "Due diligence bez archivu",
    date: "2026-01-20",
    displayDate: "20. ledna 2026",
    minutes: 7,
    excerpt:
      "Prověrka nemá skončit složkou. Má skončit stránkou, podle které se dá rozhodnout.",
    sections: [
      {
        heading: "Co číst první",
        paragraphs: [
          "Datová místnost umí předstírat úplnost. Čtyři sta souborů není totéž co znalost. Čteme nejdřív to, co nese peníze a co nese odpovědnost: vlastnictví, klíčové smlouvy, spory, dluh a lidi, bez kterých firma není firmou.",
          "Zbytek řadíme podle toho, co by změnilo cenu nebo rozhodnutí nejít dál. Ne podle abecedy složek, kterou připravil prodávající.",
        ],
      },
      {
        heading: "Co nechat být",
        paragraphs: [
          "Necháváme být historii, která už nemá nositele. Starou obchodní značku, smlouvu ukončenou před lety, politiku, kterou nikdo nepoužívá. Napíšeme, že jsme ji nechali být, a proč. Ticho v prověrce je stejné jako ticho ve smlouvě: buď je schválně, nebo je díra.",
          "Nehoníme se za formální úplností tam, kde klient kupuje konkrétní riziko a ví o něm. Prověrka není sběr známek. Je to filtr.",
        ],
      },
      {
        heading: "Jedna stránka pro toho, kdo rozhoduje",
        paragraphs: [
          "Výstupem není zpráva, kterou unese jen její autor. Výstupem je stránka: co drží, co je podmínka podpisu, co je sleva, co je důvod odejít. Za ní teprve přílohy pro toho, kdo bude věc žít operativně.",
          "Když se stránka nevejde na stránku, ještě nerozumíme věci dost na to, abychom ji poslali dál.",
        ],
      },
    ],
  },
  {
    slug: "kdy-nepodavat",
    title: "Kdy nepodávat žalobu",
    date: "2025-11-04",
    displayDate: "4. listopadu 2025",
    minutes: 5,
    excerpt:
      "Žaloba je nástroj. Není důkaz, že máte pravdu, a není náhrada za větu, kterou jste neřekli včas.",
    sections: [
      {
        heading: "Cena, která není v sazebníku",
        paragraphs: [
          "Soud stojí peníze, které jdou vyčíslit, a pozornost, která nejde. Vedení, které dva roky žije sporem, nevede firmu. To není důvod spor nevést. Je to důvod vědět, že se vede.",
          "Než doporučíme podat žalobu, napíšeme, co se stane, když ji nevyhrajeme, a co se stane, když ji vyhrajeme a protistrana nezaplatí. Rozsudek není úhrada.",
        ],
      },
      {
        heading: "Když protistrana chce totéž",
        paragraphs: [
          "Část sporů je o větě, kterou obě strany chtějí, jen ji nechtějí říct první. Tam je žaloba způsob, jak ztratit měsíc. Dohoda, která pojmenuje vadu a způsob nápravy, bývá kratší než žalobní petit a dá se splnit v úterý.",
          "Jednáme tehdy, když má jednání mandát. Schůzka bez možnosti říct ne je divadlo. To klientovi řekneme dřív, než ji přijmeme.",
        ],
      },
      {
        heading: "Písemný odchod",
        paragraphs: [
          "Někdy je správné nepodat a odejít. Pak to má být na papíře: proč nejdeme k soudu, co tím klient přijímá a do kdy se rozhodnutí dá vzít zpět. Bez toho se za rok „nepodali jsme“ změní v „zapomněli jsme“.",
          "Halden raději napíše krátké ne než dlouhou žalobu, která měla zakrýt, že neexistuje zadání.",
        ],
      },
    ],
  },
];

export const steps = [
  {
    index: "01",
    title: "Poslech",
    text: "Jeden partner. Žádný předávací řetězec. Nejdřív zjistíme, jestli jsme pro věc správná kancelář.",
  },
  {
    index: "02",
    title: "Rámec",
    text: "Napíšeme, co je jisté, co je volba a co je riziko. Rozsah a strop honoráře jsou součástí rámce, ne dodatku.",
  },
  {
    index: "03",
    title: "Práce",
    text: "Malý tým. Psaný postup. Žádné překvapení v hodinách a žádná zpráva, kterou unese jen její autor.",
  },
  {
    index: "04",
    title: "Po podpisu",
    text: "Zůstáváme, dokud věc nežije sama. Pak odejdeme. Neúčtujeme přítomnost.",
  },
] as const;

export const principles = [
  {
    title: "Jeden hlas",
    text: "Partner, který věc přijme, ji vede. Asociát píše. Partner odpovídá za větu, která odejde ven.",
  },
  {
    title: "Psaný rozsah",
    text: "Než začneme, je na papíře, co děláme a co neděláme. Změna rozsahu je nové rozhodnutí, ne tichý růst faktury.",
  },
  {
    title: "Strop",
    text: "Honorář je dohodnutý rozsah. Hodinová sazba jen tam, kde rozsah nejde uzavřít — a i tehdy se stropem, který znáte předem.",
  },
  {
    title: "Odmítnutí",
    text: "Věci, které se k nám nehodí, nepřevlékneme. Řekneme to do dvou pracovních dnů, stejně rychle jako ano.",
  },
] as const;

export const clients = [
  "Vlastníci průmyslových skupin ve střední Evropě",
  "Rodiny před předáním firmy",
  "Regulované subjekty před kontrolou",
  "Statutáři, kteří potřebují vlastní hlas, ne hlas společnosti",
] as const;

export const facts = [
  { value: "2009", lines: ["Ateliér v Praze", "Založen"] },
  { value: "2018", lines: ["Stůl ve Vídni", "Ne druhá značka"] },
  { value: "28", lines: ["Právníků", "Jeden standard"] },
  { value: "1", lines: ["Partner na věc", "Až do konce"] },
] as const;

export const questions = [
  {
    q: "Pro koho Halden pracuje?",
    a: "Pro vlastníky, vedení a rodiny. Pro firmy, když je zadání přesné. Nevedeme běžnou agendu, která potřebuje velkou síť a směnný provoz.",
  },
  {
    q: "Jak rychle se ozvete?",
    a: "Do dvou pracovních dnů. Když věc nevezmeme, řekneme to stejně rychle a pokud můžeme, řekneme kam se obrátit.",
  },
  {
    q: "Jak účtujete?",
    a: "Dohodnutý rozsah a strop. Hodinově jen tam, kde se rozsah nedá uzavřít předem, a i tehdy s limitem, který znáte dřív, než začneme.",
  },
  {
    q: "V jakých jazycích vedete věc?",
    a: "Česky, anglicky a německy. Smlouvu píšeme v jazyce, ve kterém ji budou strany skutečně číst, ne v jazyce, který lépe zní v prezentaci.",
  },
  {
    q: "Berete jednu otázku, ne celý spor?",
    a: "Ano, pokud je otázka přesná a dá se na ni odpovědět písemně. Ne, pokud hledáte obecný přehled práva nebo druhý názor bez podkladů.",
  },
  {
    q: "Vydáváte jména klientů?",
    a: "Ne. Referenci domluví partner, který věc vedl, a jen se souhlasem klienta. Na webu loga neneseme.",
  },
] as const;

export const cities = [
  {
    name: "Praha",
    text: "Schůzka po potvrzení. První rozhovor může být i písemný, pokud je věc citlivá nebo klient není ve městě.",
  },
  {
    name: "Vídeň",
    text: "Stejný standard psaní, ne pobočka s jiným rukopisem. Schůzka po potvrzení, většinou k věcem přes hranici.",
  },
] as const;

export const topicIds = [
  "transakce",
  "spory",
  "majetek",
  "regulace",
  "nemovitosti",
  "prace-vedeni",
  "nevim",
] as const;

export type TopicId = (typeof topicIds)[number];

export const ui = {
  skip: "Přeskočit na obsah",
  office: "Advokátní kancelář",
  citiesLine: "Praha · Vídeň",
  contact: "Kontakt",
  openMenu: "Otevřít menu",
  closeMenu: "Zavřít menu",
  theme: "Přepnout barevný režim",
  themeLight: "Světlý režim",
  themeDark: "Tmavý režim",
  toEnglish: "English",
  toCzech: "Česky",
  navMain: "Hlavní",
  navMobile: "Mobilní",
  navFooter: "Patička",
  homeAria: "Halden, úvod",
  footerBlurb: "Advokátní kancelář pro rozhodnutí, která mají váhu. Praha a Vídeň, jeden standard psaní.",
  privacy: "Soukromí",
  cookies: "Cookies",
  cookieSettings: "Nastavení cookies",
  meetPrague: "Praha — schůzka po potvrzení",
  meetVienna: "Vídeň — schůzka po potvrzení",
  disclaimer: "Texty na tomto webu nejsou právní radou a nezakládají vztah advokát–klient.",
  creditBefore: "Koncept k prodeji",
  creditAfter: "vytvořilo studiovoid.cz",
  cookieBar:
    "Nezbytné uloží jen volbu a barevný režim v tomto prohlížeči. Měření je místní počítadlo stránek — nic neodesíláme dál.",
  cookieMore: "Více o cookies",
  cookieSettingsBtn: "Nastavení",
  cookieEssentialOnly: "Jen nezbytné",
  cookieAllow: "Povolit měření",
  cookieTitle: "Cookies",
  cookieDialog: "Volba se uloží jen v tomto prohlížeči. Můžete ji kdykoli změnit.",
  cookieNecessary: "Nezbytné",
  cookieNecessaryText: "Uloží souhlas a barevný režim. Vždy zapnuto.",
  cookieOn: "Zapnuto",
  cookieMeasure: "Měření",
  cookieMeasureText:
    "Počítadlo zobrazení stránek v tomto prohlížeči. Žádný externí nástroj, žádné odeslání na server.",
  cookieViews: "Zatím {n} zobrazení.",
  notFoundTitle: "Tahle stránka tu není.",
  notFoundText: "Adresa nesedí. Vraťte se na úvod, nebo napište, pokud hledáte konkrétní věc.",
  notFoundHome: "Úvod",
  crumbs: "Drobečková navigace",
  heroTitle: "Klid v rozhodnutích, která mají váhu.",
  heroLede: "Zastupujeme vlastníky, vedení a rodiny. Málo věcí najednou. Každou do konce.",
  heroCta: "Domluvit konzultaci",
  heroMore: "Naše filosofie",
  heroAlt: "Tým kanceláře Halden.",
  quote: "Halden není síť. Je to kancelář, ve které partner, který věc přijme, ji také vede.",
  quoteText:
    "Klienti přicházejí, když už nechtějí další prezentaci. Chtějí formulaci, na které se dá stát, a člověka, který za ni odpovídá i po podpisu.",
  quoteLink: "O ateliéru",
  practicesKicker: "Šest oblastí",
  kickerPractices: "Oblasti",
  kickerApproach: "Přístup",
  kickerStudio: "Ateliér",
  kickerPeople: "Lidé",
  all: "Všechny",
  clientsTitle: "S kým pracujeme",
  clientsText: "Jména klientů nevydáváme. Referenci domluví partner, který věc vedl, a jen s jejich souhlasem.",
  endQuote: "Práce končí, až věc žije bez nás.",
  endText: "Neúčtujeme přítomnost. Zůstáváme, dokud je to potřeba, a pak odejdeme.",
  endLink: "Přístup ke každé věci",
  peopleKicker: "Lidé, kteří věc povedou",
  everyone: "Všichni",
  notesKicker: "Poznámky",
  closing: "Napište, až budete chtít mluvit s partnerem.",
  practicesTitle: "Šest věcí, které umíme vést.",
  practicesLede: "Žádná není vedlejší a žádnou nedržíme jen proto, aby web vypadal úplně. Když se věc nehodí, řekneme to.",
  metaPractices: "Šest oblastí Haldenu: transakce, spory, majetek, regulace, nemovitosti a práce vedení.",
  when: "Kdy přijít",
  work: "Co děláme",
  leads: "Vede",
  writeAbout: "Napsat k této věci",
  areaNav: "Další oblasti",
  areaPrev: "Předchozí",
  areaNext: "Další",
  metaPracticeFallback: "Oblast právní praxe kanceláře Halden.",
  peopleTitle: "Kdo věc povede, je jasné dřív, než začneme.",
  peopleLede: "Čtyři partneři a dva counsel. Žádné anonymní týmy a žádné předání po první schůzce.",
  metaPeople: "Partneři a counsel kanceláře Halden. Jedna věc má jednoho člověka, který ji vede.",
  area: "Oblast",
  writeTo: "Napsat",
  metaPersonFallback: "Lidé kanceláře Halden.",
  approachTitle: "Nejdřív rámec. Pak práce. Pak odchod.",
  approachLede:
    "Klient má vědět, kdo vede, co je v rozsahu a kdy skončíme. To není procesní schéma. To je podmínka, abychom věc vzali.",
  metaApproach:
    "Jak Halden vede věc: jeden partner, psaný rozsah, strop honoráře a odchod, když už nás není třeba.",
  paperAlt: "Stoh silného bavlněného papíru a ocelové pravítko na tmavém stole.",
  paperCaption: "Jedna stránka, podle které se dá rozhodnout.",
  principlesTitle: "Čtyři zásady, které se nedají obejít dodatkem.",
  questionsTitle: "Otázky, které dostáváme dřív než spis",
  write: "Napsat",
  studioTitle: "Kancelář, ne síť.",
  studioLede:
    "Halden vznikl v Praze v roce 2009. Vídeň přibyla v roce 2018 jako stůl, ne jako druhá značka. Píše se u nás stejně na obou stranách hranice.",
  metaStudio: "Halden vznikl v Praze v roce 2009. Od roku 2018 má stůl ve Vídni. Jedna kancelář, jeden standard psaní.",
  corridorAlt: "Dlouhá prázdná chodba z bledého dubu a modrošedé omítky, na konci denní světlo.",
  facadeAlt: "Noční fasáda z vápence s jedním úzkým oknem a teplým světlem uvnitř.",
  facadeCaption: "Praha a Vídeň. Schůzka až po potvrzení.",
  whyName: "Proč ten název",
  studioP1:
    "Ateliér proto, že věc má autora. Ne proto, že bychom byli méně přísní na paragraf. {n} právníků drží jeden standard: krátký text, pojmenované riziko, partner, který větu podepíše.",
  studioP2:
    "Nevedeme pobočky, které si půjčují logo. Když věc přesáhne to, co umíme, řekneme to a doporučíme někoho, kdo to umí líp. To je součást klidu, ne mezera v nabídce.",
  studioP3:
    "Nejsme na žebříčcích úvodní strany. Důvěra je v tom, kdo věc vede a jak je napsaná. Referenci domluví partner, ne marketing.",
  where: "Kde se potkáváme",
  peopleBoth: "Lidé v obou městech",
  notesTitle: "Píšeme, jen když je co říct.",
  notesLede: "Žádný zpravodaj a žádné převyprávění novely. Texty z věcí, které se opakují.",
  metaNotes: "Krátké texty Haldenu o smlouvách, prověrce a o tom, kdy nepodávat žalobu.",
  min: "min",
  minRead: "minut čtení",
  noteDisclaimer: "Text není právní radou. Pokud řešíte podobnou věc,",
  noteWrite: "napište partnerovi",
  metaNoteFallback: "Poznámka kanceláře Halden.",
  contactTitle: "První zpráva stačí krátká.",
  contactLede:
    "Odpovídáme do dvou pracovních dnů. Když věc nevezmeme, řekneme to stejně rychle. Telefon veřejně nedáváme — první kontakt je písemný.",
  metaContact: "Napište Haldenu. Odpovídáme do dvou pracovních dnů. První kontakt je písemný.",
  sent: "Děkujeme. Zpráva je připravená. V této prezentaci se neukládá ani neodesílá — v provozu odchází partnerovi, který by věc vedl.",
  name: "Jméno",
  email: "E-mail",
  topic: "Čeho se věc týká",
  choose: "Vyberte",
  message: "Zpráva",
  consentBefore: "Chci pokračovat. V této prezentaci se zpráva neukládá ani neodesílá. Více v",
  consentLink: "zásadách soukromí",
  sendError: "Zprávu se nepodařilo připravit. Zkuste to znovu, nebo napište na",
  sending: "Odesílám",
  send: "Odeslat",
  direct: "Přímo",
  errName: "Napište jméno.",
  errNameLong: "Jméno je příliš dlouhé.",
  errEmail: "Zadejte platný e-mail.",
  errEmailLong: "E-mail je příliš dlouhý.",
  errTopic: "Vyberte, čeho se věc týká.",
  errMessage: "Napište aspoň pár vět, ať víme, o čem mluvit.",
  errMessageLong: "Zpráva je příliš dlouhá.",
  errConsent: "Bez souhlasu zprávu nepřijmeme.",
  cookiesTitle: "Dvě volby. Obě dělají to, co říkají.",
  cookiesLede:
    "Nepoužíváme reklamní ani analytické nástroje třetích stran. Rozdíl mezi volbami je jen v tom, jestli si prohlížeč pamatuje počet zobrazených stránek.",
  metaCookies: "Jaké údaje si web Halden ukládá v prohlížeči a jak volbu změnit. Žádné cookies třetích stran.",
  necessaryTitle: "Nezbytné",
  necessaryBody:
    "Klíč halden-consent si pamatuje, jestli jste volbu už udělali. Klíč halden-theme si pamatuje světlý nebo tmavý režim. Bez nich by se lišta ptala při každé návštěvě a režim by se vracel do tmavého. Tyto údaje zůstávají v prohlížeči.",
  measureTitle: "Měření",
  measureOn: "Teď je měření zapnuté a v tomto prohlížeči je {n} zobrazení.",
  measureOff: "Teď měření neběží.",
  measureBody:
    "Když měření povolíte, klíč halden-views zvýší číslo při první návštěvě dané stránky v relaci. Číslo nikam neodesíláme. Když měření odmítnete, klíče smažeme.",
  changeTitle: "Jak volbu změnit",
  changeBody: "Otevřete nastavení. Stejné okno je v patičce každé stránky. Prohlížeč můžete také vyčistit ručně.",
  openSettings: "Otevřít nastavení",
  privacyKicker: "Soukromí",
  privacyTitle: "Údaje, které od vás nechceme zbytečně.",
  privacyLede:
    "Tato stránka popisuje prezentaci webu Halden. Není to právní rada a nenahrazuje informace, které by správce dával v ostrém provozu.",
  metaPrivacy: "Jak Halden v této prezentaci zachází s osobními údaji. Formulář se neukládá a neodesílá.",
  whoTitle: "Kdo web provozuje",
  whoBefore: "Prezentaci vede identita",
  whoAfter: "Kontakt:",
  whoNote:
    "Neuvádíme číslo zápisu ani adresu sídla, protože jde o navržený web, ne o veřejný výpis konkrétní kanceláře.",
  formTitle: "Co se děje se zprávou z formuláře",
  formBody:
    "Formulář na stránce Kontakt ověří tvar údajů na serveru a nic neuloží. Jméno, e-mail ani text zprávy se nezapisují do databáze, neposílají se e-mailem a neobjevují se v logu aplikace. Po odpovědi serveru zůstanou jen v paměti vašeho prohlížeče, dokud stránku neopustíte.",
  browserTitle: "Co ukládá prohlížeč",
  browserBody:
    "Barevný režim a volba cookies jsou v localStorage tohoto prohlížeče. Když povolíte měření, přibude místní počítadlo zobrazených stránek. To počítadlo zařízení neopouští. Když zvolíte jen nezbytné, počítadlo smažeme. Podrobnosti jsou na stránce",
  choicesTitle: "Vaše volby",
  choicesBody:
    "Volbu cookies změníte kdykoli odkazem Nastavení cookies v patičce. Místní data smažete i vyčištěním úložiště prohlížeče pro tento web. Na cokoli dalšího odpovězte na",
  privacyDate: "Platné k 24. září 2026.",
  topics: [
    { id: "transakce", label: "Transakce a korporát" },
    { id: "spory", label: "Spory a rozhodčí řízení" },
    { id: "majetek", label: "Majetek a nástupnictví" },
    { id: "regulace", label: "Regulace a dohled" },
    { id: "nemovitosti", label: "Nemovitosti" },
    { id: "prace-vedeni", label: "Práce vedení" },
    { id: "nevim", label: "Ještě nevím, kam věc patří" },
  ],
} as const;

export function getPractice(slug: string) {
  return practices.find((item) => item.slug === slug);
}

export function getPerson(slug: string) {
  return people.find((item) => item.slug === slug);
}

export function getNote(slug: string) {
  return notes.find((item) => item.slug === slug);
}

export function peopleFor(slugs: string[]) {
  return slugs
    .map((slug) => getPerson(slug))
    .filter((person): person is Person => Boolean(person));
}

export const publicPaths = [
  "/",
  "/oblasti",
  ...practices.map((item) => `/oblasti/${item.slug}`),
  "/pristup",
  "/atelier",
  "/lide",
  ...people.map((item) => `/lide/${item.slug}`),
  "/poznamky",
  ...notes.map((item) => `/poznamky/${item.slug}`),
  "/kontakt",
  "/soukromi",
  "/cookies",
];
