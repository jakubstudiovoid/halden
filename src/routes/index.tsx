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
        <div className="mx-auto flex min-h-svh max-w-6xl flex-col px-6 pt-28 pb-28 md:px-16 md:pt-32 md:pb-14">
          <div className="flex items-center justify-between gap-6 text-xs tracking-widest text-field-muted uppercase">
            <p>Advokátní kancelář</p>
            <p className="text-right">Praha · Vídeň</p>
          </div>
          <div className="mt-auto max-w-5xl pt-28">
            <h1 className="wordmark">Halden</h1>
            <p className="mt-10 max-w-md text-xl leading-snug font-normal md:mt-12 md:text-2xl">
              Klid v rozhodnutích, která mají váhu.
            </p>
            <Link
              to="/kontakt"
              className="link-draw mt-8 inline-flex min-h-11 items-center text-sm text-field-fg"
            >
              Domluvit rozhovor
            </Link>
          </div>
          <p className="mt-20 text-xs tracking-widest text-field-muted uppercase">
            {facts[0]?.value} · {facts[1]?.value} · {facts[3]?.value}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-32 md:px-16 md:py-48">
        <div className="max-w-3xl">
          <Photo
            src="/media/atrium.jpg"
            alt="Klidné kamenné atrium s vysokým oknem a kobaltovým stínem na jedné stěně."
            width={1600}
            height={900}
            priority
            caption="Prostor bez recepčního divadla. Světlo stačí."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-16 md:pb-24">
        <Reveal>
          <h2 className="display max-w-4xl text-4xl md:text-6xl">
            Halden není síť. Je to kancelář, ve které partner, který věc přijme, ji také vede.
          </h2>
        </Reveal>
        <Reveal className="mt-16 max-w-sm" delay={160}>
          <p className="text-sm leading-relaxed text-muted">
            Klienti přicházejí, když už nechtějí další prezentaci. Chtějí formulaci, na které se dá stát,
            a člověka, který za ni odpovídá i po podpisu.
          </p>
          <Link to="/atelier" className="link-draw mt-8 inline-flex min-h-11 items-center text-sm">
            O ateliéru
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-16 md:py-40" aria-labelledby="oblasti-nadpis">
        <div className="mb-16 flex items-end justify-between gap-6">
          <h2 id="oblasti-nadpis" className="kicker">
            Šest oblastí
          </h2>
          <Link to="/oblasti" className="link-draw hidden text-sm sm:inline">
            Všechny
          </Link>
        </div>
        <ul>
          {practices.map((item) => (
            <li key={item.slug} className="border-t border-line">
              <Link
                to="/oblasti/$slug"
                params={{ slug: item.slug }}
                className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
              >
                <span className="text-xs tracking-widest text-muted tabular-nums md:col-span-1">{item.index}</span>
                <span className="display text-3xl transition-colors duration-700 group-hover:text-muted md:col-span-6 md:text-4xl">
                  {item.title}
                </span>
                <span className="text-sm leading-relaxed text-muted md:col-span-5">{item.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-12 md:grid-cols-12 md:px-16 md:py-28">
        <div className="md:col-span-4">
          <h2 className="display text-3xl md:text-4xl">S kým pracujeme</h2>
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-muted">
            Jména klientů nevydáváme. Referenci domluví partner, který věc vedl, a jen s jejich souhlasem.
          </p>
        </div>
        <ul className="md:col-span-6 md:col-start-7">
          {clients.map((client) => (
            <li key={client} className="border-t border-line py-5 text-lg font-normal last:border-b">
              {client}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28 md:px-16 md:py-40">
        <p className="display max-w-3xl text-4xl md:text-6xl">Práce končí, až věc žije bez nás.</p>
        <p className="mt-10 max-w-sm text-sm leading-relaxed text-muted">
          Neúčtujeme přítomnost. Zůstáváme, dokud je to potřeba, a pak odejdeme.
        </p>
        <Link to="/pristup" className="link-draw mt-8 inline-flex min-h-11 items-center text-sm">
          Přístup ke každé věci
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-16 md:py-20" aria-labelledby="lide-nadpis">
        <div className="flex items-end justify-between gap-6">
          <h2 id="lide-nadpis" className="kicker">
            Lidé, kteří věc povedou
          </h2>
          <Link to="/lide" className="link-draw text-sm">
            Všichni
          </Link>
        </div>
        <ul className="mt-12 border-t border-line">
          {people.map((person) => (
            <li key={person.slug} className="border-b border-line">
              <Link
                to="/lide/$slug"
                params={{ slug: person.slug }}
                className="group grid items-baseline gap-y-2 py-7 md:grid-cols-12 md:py-8"
              >
                <span className="text-xs tracking-widest text-muted md:col-span-2">{person.given}</span>
                <span className="display text-2xl transition-colors duration-700 group-hover:text-muted md:col-span-6 md:text-3xl">
                  {person.name}
                </span>
                <span className="text-sm text-muted md:col-span-4">
                  {person.role} · {person.city}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-16 md:py-36" aria-labelledby="poznamky-nadpis">
        <h2 id="poznamky-nadpis" className="kicker">
          Poznámky
        </h2>
        <ul className="mt-12 border-t border-line">
          {notes.map((note) => (
            <li key={note.slug} className="border-b border-line">
              <Link
                to="/poznamky/$slug"
                params={{ slug: note.slug }}
                className="group grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:py-8"
              >
                <time dateTime={note.date} className="text-xs tracking-widest text-muted uppercase md:col-span-3">
                  {note.displayDate}
                </time>
                <span className="text-xl font-normal tracking-tight transition-colors duration-700 group-hover:text-muted md:col-span-8 md:text-2xl">
                  {note.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-28 md:px-16 md:py-44">
          <h2 className="display max-w-3xl text-4xl md:text-6xl">
            Napište, až budete chtít mluvit s partnerem.
          </h2>
          <Link to="/kontakt" className="link-draw mt-10 inline-flex min-h-11 items-center text-sm">
            Kontakt
          </Link>
        </div>
      </section>
    </>
  );
}
