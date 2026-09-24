import { createFileRoute, Link } from "@tanstack/react-router";
import { clients, facts, notes, people, practices, site } from "@/content/site";
import { JsonLd, Mark, Photo, Reveal } from "@/components/site/ui";

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
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pt-28 pb-14 md:px-10 md:pt-32 md:pb-16">
          <div className="flex items-center justify-between gap-4 text-sm text-field-muted">
            <p>Advokátní kancelář</p>
            <p>Praha · Vídeň</p>
          </div>
          <div className="mt-16 flex items-end gap-5 md:mt-24">
            <Mark tone="on-field" className="mb-2 hidden size-16 sm:block md:size-20" />
            <h1 className="text-6xl font-medium tracking-tight uppercase sm:text-8xl lg:text-9xl">
              Halden
            </h1>
          </div>
          <p className="mt-10 max-w-xl text-2xl leading-snug font-normal md:text-3xl">
            Klid v rozhodnutích, která mají váhu.
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-field-muted md:text-lg">
            Zastupujeme vlastníky, vedení a rodiny. Málo věcí najednou. Každou do konce.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              to="/kontakt"
              className="press inline-flex min-h-11 items-center bg-field-fg px-5 text-sm text-field"
            >
              Domluvit rozhovor
            </Link>
            <Link
              to="/pristup"
              className="inline-flex min-h-11 items-center text-sm text-field-fg underline decoration-field-muted underline-offset-4"
            >
              Jak pracujeme
            </Link>
          </div>
          <dl className="mt-auto grid grid-cols-2 gap-8 border-t border-field-muted/30 pt-8 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-field-muted">{fact.label}</dt>
                <dd className="mt-2 text-2xl font-medium tabular-nums">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <Photo
          src="/media/atrium.jpg"
          alt="Klidné kamenné atrium s vysokým oknem a kobaltovým stínem na jedné stěně."
          width={1600}
          height={900}
          priority
          caption="Prostor bez recepčního divadla. Světlo stačí."
        />
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-8 md:grid-cols-12 md:px-10 md:pb-12">
        <Reveal className="md:col-span-7">
          <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
            Halden není síť. Je to kancelář, ve které partner, který věc přijme, ji také vede.
          </h2>
        </Reveal>
        <Reveal className="md:col-span-5 md:pt-4" delay={120}>
          <p className="text-base leading-relaxed text-muted">
            Klienti přicházejí, když už nechtějí další prezentaci. Chtějí formulaci, na které se dá stát,
            a člověka, který za ni odpovídá i po podpisu.
          </p>
          <Link
            to="/atelier"
            className="mt-8 inline-flex min-h-11 items-center text-sm underline decoration-line underline-offset-4"
          >
            O ateliéru
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24" aria-labelledby="oblasti-nadpis">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 id="oblasti-nadpis" className="text-sm text-muted">
            Šest oblastí. Žádná není vedlejší.
          </h2>
          <Link to="/oblasti" className="hidden text-sm underline decoration-line underline-offset-4 sm:inline">
            Všechny oblasti
          </Link>
        </div>
        <ul className="border-b border-line">
          {practices.map((item) => (
            <li key={item.slug}>
              <Link
                to="/oblasti/$slug"
                params={{ slug: item.slug }}
                className="group grid gap-3 border-t border-line py-7 md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <span className="text-sm text-muted tabular-nums md:col-span-1">{item.index}</span>
                <span className="text-2xl font-medium tracking-tight transition-colors duration-500 group-hover:text-muted md:col-span-5">
                  {item.title}
                </span>
                <span className="text-muted md:col-span-5">{item.summary}</span>
                <span className="text-sm text-muted transition-transform duration-500 group-hover:translate-x-1 md:col-span-1 md:text-right">
                  <span className="sr-only">Otevřít</span>
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-8 md:grid-cols-12 md:px-10 md:py-16">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-medium tracking-tight">S kým pracujeme</h2>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Jména klientů nevydáváme. Referenci domluví partner, který věc vedl, a jen s jejich souhlasem.
          </p>
        </div>
        <ul className="border-t border-line md:col-span-8">
          {clients.map((client, index) => (
            <li key={client} className="flex gap-6 border-b border-line py-5">
              <span className="text-sm text-muted tabular-nums">0{index + 1}</span>
              <span>{client}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="field-wash mt-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <p className="text-3xl font-medium tracking-tight md:col-span-8 md:text-5xl">
            Práce končí, až věc žije bez nás.
          </p>
          <div className="md:col-span-4 md:pt-3">
            <p className="text-sm leading-relaxed text-field-muted">
              Neúčtujeme přítomnost. Zůstáváme, dokud je to potřeba, a pak odejdeme.
            </p>
            <Link
              to="/pristup"
              className="mt-8 inline-flex min-h-11 items-center text-sm text-field-fg underline decoration-field-muted underline-offset-4"
            >
              Přístup ke každé věci
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28" aria-labelledby="lide-nadpis">
        <div className="flex items-end justify-between gap-6">
          <h2 id="lide-nadpis" className="text-3xl font-medium tracking-tight">
            Lidé, kteří věc povedou
          </h2>
          <Link to="/lide" className="text-sm underline decoration-line underline-offset-4">
            Všichni
          </Link>
        </div>
        <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <li key={person.slug} className="bg-bg">
              <Link
                to="/lide/$slug"
                params={{ slug: person.slug }}
                className="group flex h-full flex-col px-1 py-8"
              >
                <span className="text-sm text-muted tabular-nums">{person.given}</span>
                <span className="mt-8 text-2xl font-medium tracking-tight group-hover:text-muted">
                  {person.name}
                </span>
                <span className="mt-2 text-sm text-muted">{person.role}</span>
                <span className="mt-6 text-sm">{person.focus}</span>
                <span className="mt-1 text-sm text-muted">{person.city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10 md:pb-28" aria-labelledby="poznamky-nadpis">
        <h2 id="poznamky-nadpis" className="text-sm text-muted">
          Poznámky z praxe, ne zpravodaj.
        </h2>
        <ul className="mt-8 grid gap-10 md:grid-cols-3">
          {notes.map((note) => (
            <li key={note.slug}>
              <Link to="/poznamky/$slug" params={{ slug: note.slug }} className="group block">
                <time dateTime={note.date} className="text-sm text-muted">
                  {note.displayDate}
                </time>
                <h3 className="mt-4 text-2xl font-medium tracking-tight group-hover:text-muted">
                  {note.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{note.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-28">
          <h2 className="max-w-xl text-3xl font-medium tracking-tight md:text-5xl">
            Napište, až budete chtít mluvit s partnerem.
          </h2>
          <Link
            to="/kontakt"
            className="press inline-flex min-h-11 items-center bg-field px-5 text-sm text-field-fg"
          >
            Kontakt
          </Link>
        </div>
      </section>
    </>
  );
}
