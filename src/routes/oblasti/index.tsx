import { createFileRoute, Link } from "@tanstack/react-router";
import { practices } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader } from "@/components/site/ui";

export const Route = createFileRoute("/oblasti/")({
  head: () =>
    pageHead(
      "Oblasti",
      "Šest oblastí Haldenu: transakce, spory, majetek, regulace, nemovitosti a práce vedení.",
    ),
  component: PracticesPage,
});

function PracticesPage() {
  return (
    <>
      <PageHeader
        kicker="Oblasti"
        title="Šest věcí, které umíme vést."
        lede="Žádná není vedlejší a žádnou nedržíme jen proto, aby web vypadal úplně. Když se věc nehodí, řekneme to."
      />
      <ul className="mx-auto max-w-6xl border-b border-line px-6 pb-24 md:px-10">
        {practices.map((item) => (
          <li key={item.slug}>
            <Link
              to="/oblasti/$slug"
              params={{ slug: item.slug }}
              className="group grid gap-3 border-t border-line py-8 md:grid-cols-12 md:items-baseline"
            >
              <span className="text-sm text-muted tabular-nums md:col-span-1">{item.index}</span>
              <span className="text-2xl font-normal tracking-tight md:col-span-4">{item.title}</span>
              <span className="text-muted md:col-span-6">{item.summary}</span>
              <span aria-hidden="true" className="text-sm text-muted md:col-span-1 md:text-right">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
