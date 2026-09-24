import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader } from "@/components/site/ui";
import { RouteLink, useCopy, useLinks } from "@/i18n/locale";

export const Route = createFileRoute("/poznamky/")({
  head: () => pageHead("Poznámky", ui.metaNotes),
  component: NotesPage,
});

export function NotesPage() {
  const { ui: copy, notes } = useCopy();
  const links = useLinks();
  return (
    <>
      <PageHeader kicker={copy.notesKicker} title={copy.notesTitle} lede={copy.notesLede} />
      <ul className="mx-auto max-w-6xl border-b border-line px-6 pb-24 md:px-16">
        {notes.map((note) => (
          <li key={note.slug}>
            <RouteLink
              to={links.note(note.slug)}
              className="group grid gap-3 border-t border-line py-8 md:grid-cols-12"
            >
              <time dateTime={note.date} className="text-sm text-muted md:col-span-3">
                {note.displayDate}
              </time>
              <span className="text-2xl font-normal tracking-tight md:col-span-4">{note.title}</span>
              <span className="text-muted md:col-span-4">{note.excerpt}</span>
              <span className="text-sm text-muted md:col-span-1 md:text-right">
                {note.minutes} {copy.min}
              </span>
            </RouteLink>
          </li>
        ))}
      </ul>
    </>
  );
}
