import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader } from "@/components/site/ui";
import { usePrefs } from "@/components/site/prefs";
import { useCopy } from "@/i18n/locale";

export const Route = createFileRoute("/cookies")({
  head: () => pageHead("Cookies", ui.metaCookies),
  component: CookiesPage,
});

export function CookiesPage() {
  const { setSettingsOpen, consent, views } = usePrefs();
  const { ui: copy } = useCopy();
  return (
    <>
      <PageHeader kicker={copy.cookies} title={copy.cookiesTitle} lede={copy.cookiesLede} />
      <div className="mx-auto max-w-3xl space-y-10 px-6 pb-16 leading-relaxed">
        <section>
          <h2 className="text-2xl font-normal tracking-tight">{copy.necessaryTitle}</h2>
          <p className="mt-4 text-muted">{copy.necessaryBody}</p>
        </section>
        <section>
          <h2 className="text-2xl font-normal tracking-tight">{copy.measureTitle}</h2>
          <p className="mt-4 text-muted">
            {copy.measureBody}{" "}
            {consent?.measure ? copy.measureOn.replace("{n}", String(views)) : copy.measureOff}
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-normal tracking-tight">{copy.changeTitle}</h2>
          <p className="mt-4 text-muted">{copy.changeBody}</p>
          <button type="button" onClick={() => setSettingsOpen(true)} className="press btn btn-solid mt-6">
            {copy.openSettings}
          </button>
        </section>
      </div>
    </>
  );
}
