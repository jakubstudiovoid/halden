import { createFileRoute, Link } from "@tanstack/react-router";
import { clients, facts, notes, people, practices, site } from "@/content/site";
import { JsonLd, Photo, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Halden — advokátní kancelář" },
      { name: "description", content: site.description },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: site.legalName,
          description: site.description,
          email: site.email,
          areaServed: ["CZ", "AT"],
          availableLanguage: ["cs", "en", "de"],
          foundingDate: site.founded,
          knowsAbout: practices.map((item) => item.title),
        }}
      />
      <section className="field-wash">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pt-32 pb-16 md:px-12 md:pt-36 md:pb-20">
          <div className="flex items-center justify-between gap-4 text-xs tracking-widest text-field-muted uppercase">
            <p>Advokátní kancelář</p>
            <p>Praha · Vídeň</p>
          </div>
          <h1 className="display mt-auto pt-24 text-6xl uppercase sm:text-8xl lg:text-9xl">Halden</h1>
          <p className="mt-10 max-w-lg text-2xl leading-snug font-normal md:text-3xl">
            Klid v rozhodnutích, která mají váhu.
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-field-muted">
            Zastupujeme vlastníky, vedení a rodiny. Málo věcí najednou. Každou do konce.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link to="/kontakt" className="press btn btn-line">
              Domluvit rozhovor
            </Link>
            <Link to="/pristup" className="link-draw inline-flex min-h-11 items-center text-sm text-field-fg">
              Jak pracujeme
            </Link>
          </div>
          <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-field-muted/25 pt-10 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs tracking-widest text-field-muted uppercase">{fact.label}</dt>
                <dd className="mt-3 text-xl font-normal tabular-nums">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40">
        <Photo
          src="/media/atrium.jpg"
          alt="Klidné kamenné atrium s vysokým oknem a kobaltovým stínem na jedné stěně."
          width={1600}
          height={900}
          priority
          caption="Prostor bez recepčního divadla. Světlo stačí."
        />
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-12 md:grid-cols-12 md:px-12 md:pb-20">
        <Reveal className="md:col-span-7">
          <h2 className="display text-3xl md:text-5xl">
            Halden není síť. Je to kancelář, ve které partner, který věc přijme, ji také vede.
          </h2>
        </Reveal>
        <Reveal className="md:col-span-4 md:col-start-9 md:pt-6" delay={140}>
          <p className="text-base leading-relaxed text-muted">
            Klienti přicházejí, když už nechtějí další prezentaci. Chtějí formulaci, na které se dá stát,
            a člověka, který za ni odpovídá i po podpisu.
          </p>
          <Link to="/atelier" className="link-draw mt-8 inline-flex min-h-11 items-center text-sm">
            O ateliéru
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-32" aria-labelledby="oblasti-nadpis">
        <div className="mb-14 flex items-end justify-between gap-6">
          <h2 id="oblasti-nadpis" className="kicker">
            Šest oblastí. Žádná není vedlejší.
          </h2>
          <Link to="/oblasti" className="link-draw hidden text-sm sm:inline">
            Všechny oblasti
          </Link>
        </div>
        <ul className="border-b border-line">
          {practices.map((item) => (
            <li key={item.slug}>
              <Link
                to="/oblasti/$slug"
                params={{ slug: item.slug }}
                className="group grid gap-4 border-t border-line py-9 md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <span className="text-xs tracking-widest text-muted tabular-nums md:col-span-1">{item.index}</span>
                <span className="text-2xl font-normal tracking-tight transition-colors duration-700 group-hover:text-muted md:col-span-5">
                  {item.title}
                </span>
                <span className="text-muted md:col-span-5">{item.summary}</span>
                <span className="text-sm text-muted transition-transform duration-700 group-hover:translate-x-1 md:col-span-1 md:text-right">
                  <span className="sr-only">Otevřít</span>
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-12 md:grid-cols-12 md:px-12 md:py-24">
        <div className="md:col-span-4">
          <h2 className="display text-3xl">S kým pracujeme</h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            Jména klientů nevydáváme. Referenci domluví partner, který věc vedl, a jen s jejich souhlasem.
          </p>
        </div>
        <ul className="border-t border-line md:col-span-7 md:col-start-6">
          {clients.map((client, index) => (
            <li key={client} className="grid grid-cols-[3rem_1fr] gap-6 border-b border-line py-6">
              <span className="text-xs tracking-widest text-muted tabular-nums">0{index + 1}</span>
              <span className="text-lg font-normal">{client}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="field-wash">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-28 md:grid-cols-12 md:px-12 md:py-40">
          <p className="display text-3xl md:col-span-8 md:text-5xl">Práce končí, až věc žije bez nás.</p>
          <div className="md:col-span-4 md:pt-4">
            <p className="text-sm leading-relaxed text-field-muted">
              Neúčtujeme přítomnost. Zůstáváme, dokud je to potřeba, a pak odejdeme.
            </p>
            <Link to="/pristup" className="link-draw mt-8 inline-flex min-h-11 items-center text-sm text-field-fg">
              Přístup ke každé věci
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-36" aria-labelledby="lide-nadpis">
        <div className="flex items-end justify-between gap-6">
          <h2 id="lide-nadpis" className="display text-3xl">
            Lidé, kteří věc povedou
          </h2>
          <Link to="/lide" className="link-draw text-sm">
            Všichni
          </Link>
        </div>
        <ul className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <li key={person.slug} className="border-t border-line pt-6">
              <Link to="/lide/$slug" params={{ slug: person.slug }} className="group block">
                <span className="text-xs tracking-widest text-muted">{person.given}</span>
                <span className="mt-8 block text-2xl font-normal tracking-tight transition-colors duration-700 group-hover:text-muted">
                  {person.name}
                </span>
                <span className="mt-2 block text-sm text-muted">{person.role}</span>
                <span className="mt-8 block text-sm">{person.focus}</span>
                <span className="mt-1 block text-sm text-muted">{person.city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28 md:px-12 md:pb-36" aria-labelledby="poznamky-nadpis">
        <h2 id="poznamky-nadpis" className="kicker">
          Poznámky z praxe, ne zpravodaj.
        </h2>
        <ul className="mt-12 grid gap-14 md:grid-cols-3">
          {notes.map((note) => (
            <li key={note.slug} className="border-t border-line pt-6">
              <Link to="/poznamky/$slug" params={{ slug: note.slug }} className="group block">
                <time dateTime={note.date} className="text-xs tracking-widest text-muted uppercase">
                  {note.displayDate}
                </time>
                <h3 className="mt-6 text-2xl font-normal tracking-tight transition-colors duration-700 group-hover:text-muted">
                  {note.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{note.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-28 md:flex-row md:items-end md:justify-between md:px-12 md:py-36">
          <h2 className="display max-w-xl text-3xl md:text-5xl">
            Napište, až budete chtít mluvit s partnerem.
          </h2>
          <Link to="/kontakt" className="press btn btn-solid">
            Kontakt
          </Link>
        </div>
      </section>
    </>
  );
}
