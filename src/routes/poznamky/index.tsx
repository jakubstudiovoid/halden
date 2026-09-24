import { createFileRoute, Link } from "@tanstack/react-router";
import { notes } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader } from "@/components/site/ui";

export const Route = createFileRoute("/poznamky/")({
  head: () =>
    pageHead(
      "Poznámky",
      "Krátké texty Haldenu o smlouvách, prověrce a o tom, kdy nepodávat žalobu.",
    ),
  component: NotesPage,
});

function NotesPage() {
  return (
    <>
      <PageHeader
        kicker="Poznámky"
        title="Píšeme, jen když je co říct."
        lede="Žádný zpravodaj a žádné převyprávění novely. Texty z věcí, které se opakují."
      />
      <ul className="mx-auto max-w-6xl border-b border-line px-6 pb-24 md:px-16">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              to="/poznamky/$slug"
              params={{ slug: note.slug }}
              className="group grid gap-3 border-t border-line py-8 md:grid-cols-12"
            >
              <time dateTime={note.date} className="text-sm text-muted md:col-span-3">
                {note.displayDate}
              </time>
              <span className="text-2xl font-normal tracking-tight md:col-span-4">{note.title}</span>
              <span className="text-muted md:col-span-4">{note.excerpt}</span>
              <span className="text-sm text-muted md:col-span-1 md:text-right">{note.minutes} min</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
