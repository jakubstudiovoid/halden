import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPractice, ui } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { Crumbs } from "@/components/site/ui";
import { RouteLink, useCopy, useLinks, useSlug } from "@/i18n/locale";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/oblasti/$slug")({
  loader: ({ params }) => {
    const practice = getPractice(params.slug);
    if (!practice) throw notFound();
    return practice;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.title, loaderData.summary)
      : pageHead("Oblast", ui.metaPracticeFallback),
  component: PracticePage,
});

function PagerArrow({ direction }: { direction: "back" | "next" }) {
  return (
    <svg
      viewBox="0 0 48 12"
      aria-hidden="true"
      className={cn("pager-arrow", direction === "back" ? "is-back" : "is-next")}
    >
      <path d="M1 6 H46 M40 1.5 L46 6 L40 10.5" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function PracticePage() {
  const slug = useSlug();
  const { ui: copy, practices, people } = useCopy();
  const links = useLinks();
  const practice = practices.find((item) => item.slug === slug);
  if (!practice) return null;
  const lawyers = practice.people
    .map((id) => people.find((person) => person.slug === id))
    .filter((person) => Boolean(person));

  const index = practices.findIndex((item) => item.slug === slug);
  const previous = index > 0 ? practices[index - 1] : null;
  const next = index >= 0 && index < practices.length - 1 ? practices[index + 1] : null;

  return (
    <article className="pb-24">
      <Crumbs
        items={[
          { to: links.home, label: "Halden" },
          { to: links.practices, label: copy.kickerPractices },
          { label: practice.title },
        ]}
      />
      <header className="mx-auto w-full max-w-6xl px-6 pt-10 pb-12 md:px-16">
        <p className="text-sm text-muted tabular-nums">{practice.index}</p>
        <h1 className="mt-6 max-w-3xl text-4xl font-normal tracking-tight md:text-6xl">{practice.title}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{practice.lead}</p>
      </header>
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:px-16">
        <section aria-labelledby="kdy">
          <h2 id="kdy" className="text-sm text-muted">
            {copy.when}
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
            {copy.work}
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
      <p className="mx-auto mt-16 max-w-6xl px-6 text-muted md:px-16">{practice.decline}</p>
      <section className="mx-auto mt-16 max-w-6xl px-6 md:px-16" aria-labelledby="vede">
        <h2 id="vede" className="text-sm text-muted">
          {copy.leads}
        </h2>
        <ul className="mt-6 border-t border-line">
          {lawyers.map((person) =>
            person ? (
              <li key={person.slug}>
                <RouteLink
                  to={links.person(person.slug)}
                  className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="text-xl font-medium">{person.name}</span>
                  <span className="text-sm text-muted">
                    {person.role} · {person.city}
                  </span>
                </RouteLink>
              </li>
            ) : null,
          )}
        </ul>
      </section>
      <div className="mx-auto mt-16 max-w-6xl px-6 md:px-16">
        <RouteLink to={links.contact} className="press btn btn-solid">
          {copy.writeAbout}
        </RouteLink>
      </div>
      <nav aria-label={copy.areaNav} className="mx-auto mt-24 max-w-6xl px-6 md:px-16">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          {previous ? (
            <RouteLink to={links.practice(previous.slug)} className="group flex max-w-md items-center gap-5">
              <PagerArrow direction="back" />
              <span className="min-w-0">
                <span className="block text-sm text-muted">{copy.areaPrev}</span>
                <span className="mt-2 block text-2xl font-normal tracking-tight">{previous.title}</span>
              </span>
            </RouteLink>
          ) : null}
          {next ? (
            <RouteLink
              to={links.practice(next.slug)}
              className="group flex max-w-md items-center justify-end gap-5 text-right sm:ml-auto"
            >
              <span className="min-w-0">
                <span className="block text-sm text-muted">{copy.areaNext}</span>
                <span className="mt-2 block text-2xl font-normal tracking-tight">{next.title}</span>
              </span>
              <PagerArrow direction="next" />
            </RouteLink>
          ) : null}
        </div>
      </nav>
    </article>
  );
}
