import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPerson, ui } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { Crumbs, JsonLd } from "@/components/site/ui";
import { RouteLink, useCopy, useLinks, useSlug } from "@/i18n/locale";

export const Route = createFileRoute("/lide/$slug")({
  loader: ({ params }) => {
    const person = getPerson(params.slug);
    if (!person) throw notFound();
    return person;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.name, `${loaderData.role}. ${loaderData.focus}. ${loaderData.city}.`)
      : pageHead("Lidé", ui.metaPersonFallback),
  component: PersonPage,
});

export function PersonPage() {
  const slug = useSlug();
  const { ui: copy, people, practices } = useCopy();
  const links = useLinks();
  const person = people.find((item) => item.slug === slug);
  if (!person) return null;
  const matters = person.matters
    .map((id) => practices.find((item) => item.slug === id))
    .filter((item) => Boolean(item));

  return (
    <article className="pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: person.name,
          jobTitle: person.role,
          worksFor: { "@type": "LegalService", name: "Halden" },
          knowsLanguage: person.languages.split(", "),
        }}
      />
      <Crumbs
        items={[
          { to: links.home, label: "Halden" },
          { to: links.people, label: copy.kickerPeople },
          { label: person.name },
        ]}
      />
      <header className="mx-auto grid w-full max-w-6xl gap-10 px-6 pt-12 md:grid-cols-12 md:px-16">
        <p className="reveal text-5xl font-normal tracking-tight text-muted tabular-nums md:col-span-3">{person.given}</p>
        <div className="md:col-span-9">
          <h1 className="reveal text-4xl font-normal tracking-tight md:text-6xl">{person.name}</h1>
          <p className="reveal mt-4 text-muted">
            {person.role} · {person.focus}
          </p>
          <p className="reveal mt-2 text-sm text-muted">
            {person.city} · {person.languages}
          </p>
          <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed">
            {person.bio.map((paragraph) => (
              <p key={paragraph} className="reveal">{paragraph}</p>
            ))}
          </div>
        </div>
      </header>
      <section className="mx-auto mt-16 max-w-6xl px-6 md:px-16" aria-labelledby="oblast">
        <h2 id="oblast" className="reveal text-sm text-muted">
          {copy.area}
        </h2>
        <ul className="mt-4 border-t border-line">
          {matters.map((practice) =>
            practice ? (
              <li key={practice.slug} className="reveal">
                <RouteLink
                  to={links.practice(practice.slug)}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-5"
                >
                  <span className="text-xl font-medium">{practice.title}</span>
                  <span className="text-sm text-muted">{practice.index}</span>
                </RouteLink>
              </li>
            ) : null,
          )}
        </ul>
      </section>
      <div className="reveal mx-auto mt-12 max-w-6xl px-6 md:px-16">
        <RouteLink to={links.contact} className="press btn btn-solid">
          {copy.writeTo} {person.name.split(" ")[0]}
        </RouteLink>
      </div>
    </article>
  );
}
