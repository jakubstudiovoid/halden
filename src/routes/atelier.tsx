import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader, Photo } from "@/components/site/ui";
import { RouteLink, useCopy, useLinks } from "@/i18n/locale";

export const Route = createFileRoute("/atelier")({
  head: () => pageHead("Ateliér", ui.metaStudio),
  component: StudioPage,
});

export function StudioPage() {
  const { ui: copy, site, cities } = useCopy();
  const links = useLinks();
  return (
    <>
      <PageHeader kicker={copy.kickerStudio} title={copy.studioTitle} lede={copy.studioLede} />
      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-12 md:px-16">
        <div className="md:col-span-7">
          <Photo src="/media/corridor.jpg" alt={copy.corridorAlt} width={1400} height={934} />
        </div>
        <div className="md:col-span-5 md:pt-16">
          <Photo
            src="/media/facade.jpg"
            alt={copy.facadeAlt}
            width={1600}
            height={900}
            caption={copy.facadeCaption}
          />
        </div>
      </div>
      <section className="mx-auto mt-20 grid max-w-6xl gap-12 px-6 md:grid-cols-12 md:px-16">
        <h2 className="reveal text-3xl font-normal tracking-tight md:col-span-5">{copy.whyName}</h2>
        <div className="space-y-5 leading-relaxed text-muted md:col-span-7">
          <p className="reveal">{copy.studioP1.replace("{n}", site.lawyers)}</p>
          <p className="reveal">{copy.studioP2}</p>
          <p className="reveal">{copy.studioP3}</p>
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-6xl px-6 pb-24 md:px-16" aria-labelledby="mesta">
        <h2 id="mesta" className="reveal text-sm text-muted">
          {copy.where}
        </h2>
        <ul className="mt-6 border-b border-line">
          {cities.map((city) => (
            <li key={city.name} className="reveal grid gap-3 border-t border-line py-7 md:grid-cols-12">
              <h3 className="text-2xl font-medium md:col-span-3">{city.name}</h3>
              <p className="leading-relaxed text-muted md:col-span-7">{city.text}</p>
            </li>
          ))}
        </ul>
        <RouteLink
          to={links.people}
          className="reveal mt-10 inline-flex min-h-11 items-center text-sm underline decoration-line underline-offset-4"
        >
          {copy.peopleBoth}
        </RouteLink>
      </section>
    </>
  );
}
