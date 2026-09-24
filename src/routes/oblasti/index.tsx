import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader } from "@/components/site/ui";
import { RouteLink, useCopy, useLinks } from "@/i18n/locale";

export const Route = createFileRoute("/oblasti/")({
  head: () => pageHead("Oblasti", ui.metaPractices),
  component: PracticesPage,
});

export function PracticesPage() {
  const { ui: copy, practices } = useCopy();
  const links = useLinks();
  return (
    <>
      <PageHeader kicker={copy.kickerPractices} title={copy.practicesTitle} lede={copy.practicesLede} />
      <ul className="mx-auto max-w-6xl border-b border-line px-6 pb-24 md:px-16">
        {practices.map((item) => (
          <li key={item.slug} className="reveal">
            <RouteLink
              to={links.practice(item.slug)}
              className="group grid gap-3 border-t border-line py-8 md:grid-cols-12 md:items-baseline"
            >
              <span className="text-sm text-muted tabular-nums md:col-span-1">{item.index}</span>
              <span className="text-2xl font-normal tracking-tight md:col-span-4">{item.title}</span>
              <span className="text-muted md:col-span-6">{item.summary}</span>
              <span aria-hidden="true" className="text-sm text-muted md:col-span-1 md:text-right">
                →
              </span>
            </RouteLink>
          </li>
        ))}
      </ul>
    </>
  );
}
