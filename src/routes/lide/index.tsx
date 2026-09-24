import { createFileRoute, Link } from "@tanstack/react-router";
import { people } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader } from "@/components/site/ui";

export const Route = createFileRoute("/lide/")({
  head: () =>
    pageHead(
      "Lidé",
      "Partneři a counsel kanceláře Halden. Jedna věc má jednoho člověka, který ji vede.",
    ),
  component: PeoplePage,
});

function PeoplePage() {
  return (
    <>
      <PageHeader
        kicker="Lidé"
        title="Kdo věc povede, je jasné dřív, než začneme."
        lede="Čtyři partneři a dva counsel. Žádné anonymní týmy a žádné předání po první schůzce."
      />
      <ul className="mx-auto grid max-w-6xl gap-x-10 gap-y-14 px-6 pb-28 sm:grid-cols-2 md:px-16 lg:grid-cols-3">
        {people.map((person) => (
          <li key={person.slug} className="border-t border-line pt-6">
            <Link to="/lide/$slug" params={{ slug: person.slug }} className="group block">
              <span className="text-xs tracking-widest text-muted">{person.given}</span>
              <span className="mt-8 block text-2xl font-normal tracking-tight transition-colors duration-1000 group-hover:text-muted">
                {person.name}
              </span>
              <span className="mt-2 block text-sm text-muted">{person.role}</span>
              <span className="mt-8 block text-sm">{person.focus}</span>
              <span className="mt-1 block text-sm text-muted">
                {person.city} · {person.languages}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
