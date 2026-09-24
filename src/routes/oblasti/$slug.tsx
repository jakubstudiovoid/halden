import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPractice, peopleFor } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { Crumbs } from "@/components/site/ui";

export const Route = createFileRoute("/oblasti/$slug")({
  loader: ({ params }) => {
    const practice = getPractice(params.slug);
    if (!practice) throw notFound();
    return practice;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.title, loaderData.summary)
      : pageHead("Oblast", "Oblast právní praxe kanceláře Halden."),
  component: PracticePage,
});

function PracticePage() {
  const practice = Route.useLoaderData();
  const lawyers = peopleFor(practice.people);

  return (
    <article className="pb-24">
      <Crumbs
        items={[
          { to: "/", label: "Halden" },
          { to: "/oblasti", label: "Oblasti" },
          { label: practice.title },
        ]}
      />
      <header className="mx-auto w-full max-w-6xl px-6 pt-10 pb-12 md:px-10">
        <p className="text-sm text-muted tabular-nums">{practice.index}</p>
        <h1 className="mt-6 max-w-3xl text-4xl font-medium tracking-tight md:text-6xl">{practice.title}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{practice.lead}</p>
      </header>
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:px-10">
        <section aria-labelledby="kdy">
          <h2 id="kdy" className="text-sm text-muted">
            Kdy přijít
          </h2>
          <ul className="mt-6 space-y-4 border-t border-line pt-6">
            {practice.when.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="prace">
          <h2 id="prace" className="text-sm text-muted">
            Co děláme
          </h2>
          <ul className="mt-6 space-y-4 border-t border-line pt-6">
            {practice.work.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className="mx-auto mt-16 max-w-6xl px-6 text-muted md:px-10">{practice.decline}</p>
      <section className="mx-auto mt-16 max-w-6xl px-6 md:px-10" aria-labelledby="vede">
        <h2 id="vede" className="text-sm text-muted">
          Vede
        </h2>
        <ul className="mt-6 border-t border-line">
          {lawyers.map((person) => (
            <li key={person.slug}>
              <Link
                to="/lide/$slug"
                params={{ slug: person.slug }}
                className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="text-xl font-medium">{person.name}</span>
                <span className="text-sm text-muted">
                  {person.role} · {person.city}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <div className="mx-auto mt-16 max-w-6xl px-6 md:px-10">
        <Link
          to="/kontakt"
          className="press inline-flex min-h-11 items-center bg-field px-5 text-sm text-field-fg"
        >
          Napsat k této věci
        </Link>
      </div>
    </article>
  );
}
