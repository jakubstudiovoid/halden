import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader, Photo } from "@/components/site/ui";
import { RouteLink, useCopy, useLinks } from "@/i18n/locale";

export const Route = createFileRoute("/pristup")({
  head: () => pageHead("Přístup", ui.metaApproach),
  component: ApproachPage,
});

export function ApproachPage() {
  const { ui: copy, steps, principles, questions } = useCopy();
  const links = useLinks();
  return (
    <>
      <PageHeader kicker={copy.kickerApproach} title={copy.approachTitle} lede={copy.approachLede} />
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <Photo src="/media/paper.jpg" alt={copy.paperAlt} width={1400} height={934} caption={copy.paperCaption} />
      </div>
      <ol className="mx-auto mt-20 max-w-6xl border-b border-line px-6 md:px-16">
        {steps.map((step) => (
          <li key={step.index} className="grid gap-4 border-t border-line py-8 md:grid-cols-12">
            <span className="text-sm text-muted tabular-nums md:col-span-2">{step.index}</span>
            <h2 className="text-2xl font-normal tracking-tight md:col-span-3">{step.title}</h2>
            <p className="leading-relaxed text-muted md:col-span-7">{step.text}</p>
          </li>
        ))}
      </ol>
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-16" aria-labelledby="zasady">
        <h2 id="zasady" className="text-3xl font-normal tracking-tight">
          {copy.principlesTitle}
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-2">
          {principles.map((item) => (
            <li key={item.title} className="border-t border-line pt-6">
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-16" aria-labelledby="otazky">
        <h2 id="otazky" className="text-sm text-muted">
          {copy.questionsTitle}
        </h2>
        <dl className="mt-8 border-b border-line">
          {questions.map((item) => (
            <div key={item.q} className="grid gap-3 border-t border-line py-7 md:grid-cols-12">
              <dt className="font-medium md:col-span-5">{item.q}</dt>
              <dd className="leading-relaxed text-muted md:col-span-7">{item.a}</dd>
            </div>
          ))}
        </dl>
        <RouteLink to={links.contact} className="press btn btn-solid mt-12">
          {copy.write}
        </RouteLink>
      </section>
    </>
  );
}
