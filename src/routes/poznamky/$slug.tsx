import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getNote } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { Crumbs, JsonLd } from "@/components/site/ui";

export const Route = createFileRoute("/poznamky/$slug")({
  loader: ({ params }) => {
    const note = getNote(params.slug);
    if (!note) throw notFound();
    return note;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.title, loaderData.excerpt)
      : pageHead("Poznámka", "Poznámka kanceláře Halden."),
  component: NotePage,
});

function NotePage() {
  const note = Route.useLoaderData();
  return (
    <article className="pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: note.title,
          datePublished: note.date,
          description: note.excerpt,
          inLanguage: "cs",
          author: { "@type": "Organization", name: "Halden" },
        }}
      />
      <Crumbs
        items={[
          { to: "/", label: "Halden" },
          { to: "/poznamky", label: "Poznámky" },
          { label: note.title },
        ]}
      />
      <header className="mx-auto w-full max-w-6xl px-6 pt-10 md:px-16">
        <div className="max-w-3xl">
          <p className="text-sm text-muted">
            <time dateTime={note.date}>{note.displayDate}</time>
            <span aria-hidden="true"> · </span>
            {note.minutes} minut čtení
          </p>
          <h1 className="mt-6 text-4xl font-normal tracking-tight md:text-6xl">{note.title}</h1>
          <p className="mt-8 text-lg leading-relaxed text-muted">{note.excerpt}</p>
        </div>
      </header>
      <div className="mx-auto mt-12 max-w-6xl px-6 md:px-16">
        <div className="max-w-3xl space-y-12">
          {note.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-normal tracking-tight">{section.heading}</h2>
              <div className="mt-5 space-y-5 leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-16 max-w-6xl px-6 text-sm text-muted md:px-16">
        <span className="block max-w-3xl">
          Text není právní radou. Pokud řešíte podobnou věc,{" "}
          <Link to="/kontakt" className="text-fg underline decoration-line underline-offset-4">
            napište partnerovi
          </Link>
          .
        </span>
      </p>
    </article>
  );
}
