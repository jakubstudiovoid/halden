import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader } from "@/components/site/ui";
import { RouteLink, useCopy, useLinks } from "@/i18n/locale";

export const Route = createFileRoute("/soukromi")({
  head: () => pageHead("Ochrana soukromí", ui.metaPrivacy),
  component: PrivacyPage,
});

export function PrivacyPage() {
  const { ui: copy, site } = useCopy();
  const links = useLinks();
  return (
    <>
      <PageHeader kicker={copy.privacyKicker} title={copy.privacyTitle} lede={copy.privacyLede} />
      <div className="mx-auto max-w-3xl space-y-10 px-6 pb-24 text-base leading-relaxed">
        <section>
          <h2 className="text-2xl font-normal tracking-tight">{copy.whoTitle}</h2>
          <p className="mt-4 text-muted">
            {copy.whoBefore} {site.legalName}. {copy.whoAfter} {site.email}. {copy.whoNote}
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-normal tracking-tight">{copy.formTitle}</h2>
          <p className="mt-4 text-muted">{copy.formBody}</p>
        </section>
        <section>
          <h2 className="text-2xl font-normal tracking-tight">{copy.browserTitle}</h2>
          <p className="mt-4 text-muted">
            {copy.browserBody}{" "}
            <RouteLink to={links.cookies} className="text-fg underline decoration-line underline-offset-4">
              {copy.cookies}
            </RouteLink>
            .
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-normal tracking-tight">{copy.choicesTitle}</h2>
          <p className="mt-4 text-muted">
            {copy.choicesBody} {site.email}.
          </p>
        </section>
        <p className="text-sm text-muted">{copy.privacyDate}</p>
      </div>
    </>
  );
}
