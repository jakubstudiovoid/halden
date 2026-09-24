import { createFileRoute, Link } from "@tanstack/react-router";
import { principles, questions, steps } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader, Photo } from "@/components/site/ui";

export const Route = createFileRoute("/pristup")({
  head: () =>
    pageHead(
      "Přístup",
      "Jak Halden vede věc: jeden partner, psaný rozsah, strop honoráře a odchod, když už nás není třeba.",
    ),
  component: ApproachPage,
});

function ApproachPage() {
  return (
    <>
      <PageHeader
        kicker="Přístup"
        title="Nejdřív rámec. Pak práce. Pak odchod."
        lede="Klient má vědět, kdo vede, co je v rozsahu a kdy skončíme. To není procesní schéma. To je podmínka, abychom věc vzali."
      />
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Photo
          src="/media/paper.jpg"
          alt="Stoh silného bavlněného papíru a ocelové pravítko na tmavém stole."
          width={1400}
          height={934}
          caption="Jedna stránka, podle které se dá rozhodnout."
        />
      </div>
      <ol className="mx-auto mt-20 max-w-6xl border-b border-line px-6 md:px-10">
        {steps.map((step) => (
          <li key={step.index} className="grid gap-4 border-t border-line py-8 md:grid-cols-12">
            <span className="text-sm text-muted tabular-nums md:col-span-2">{step.index}</span>
            <h2 className="text-2xl font-normal tracking-tight md:col-span-3">{step.title}</h2>
            <p className="leading-relaxed text-muted md:col-span-7">{step.text}</p>
          </li>
        ))}
      </ol>
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10" aria-labelledby="zasady">
        <h2 id="zasady" className="text-3xl font-normal tracking-tight">
          Čtyři zásady, které se nedají obejít dodatkem.
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-2">
          {principles.map((item) => (
            <li key={item.title} className="border-t border-line pt-6">
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10" aria-labelledby="otazky">
        <h2 id="otazky" className="text-sm text-muted">
          Otázky, které dostáváme dřív než spis
        </h2>
        <dl className="mt-8 border-b border-line">
          {questions.map((item) => (
            <div key={item.q} className="grid gap-3 border-t border-line py-7 md:grid-cols-12">
              <dt className="font-medium md:col-span-5">{item.q}</dt>
              <dd className="leading-relaxed text-muted md:col-span-7">{item.a}</dd>
            </div>
          ))}
        </dl>
        <Link
          to="/kontakt"
          className="press btn btn-solid mt-12"
        >
          Napsat
        </Link>
      </section>
    </>
  );
}
