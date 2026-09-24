import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader } from "@/components/site/ui";
import { RouteLink, useCopy, useLinks } from "@/i18n/locale";

export const Route = createFileRoute("/lide/")({
  head: () => pageHead("Lidé", ui.metaPeople),
  component: PeoplePage,
});

export function PeoplePage() {
  const { ui: copy, people } = useCopy();
  const links = useLinks();
  return (
    <>
      <PageHeader kicker={copy.kickerPeople} title={copy.peopleTitle} lede={copy.peopleLede} />
      <ul className="mx-auto grid max-w-6xl gap-x-10 gap-y-14 px-6 pb-28 sm:grid-cols-2 md:px-16 lg:grid-cols-3">
        {people.map((person) => (
          <li key={person.slug} className="border-t border-line pt-6">
            <RouteLink to={links.person(person.slug)} className="group block">
              <span className="text-xs tracking-widest text-muted">{person.given}</span>
              <span className="mt-8 block text-2xl font-normal tracking-tight transition-colors duration-1000 group-hover:text-muted">
                {person.name}
              </span>
              <span className="mt-2 block text-sm text-muted">{person.role}</span>
              <span className="mt-8 block text-sm">{person.focus}</span>
              <span className="mt-1 block text-sm text-muted">
                {person.city} · {person.languages}
              </span>
            </RouteLink>
          </li>
        ))}
      </ul>
    </>
  );
}
