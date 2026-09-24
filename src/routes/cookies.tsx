import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/meta";
import { PageHeader } from "@/components/site/ui";
import { usePrefs } from "@/components/site/prefs";

export const Route = createFileRoute("/cookies")({
  head: () =>
    pageHead(
      "Cookies",
      "Jaké údaje si web Halden ukládá v prohlížeči a jak volbu změnit. Žádné cookies třetích stran.",
    ),
  component: CookiesPage,
});

function CookiesPage() {
  const { setSettingsOpen, consent, views } = usePrefs();
  return (
    <>
      <PageHeader
        kicker="Cookies"
        title="Dvě volby. Obě dělají to, co říkají."
        lede="Nepoužíváme reklamní ani analytické nástroje třetích stran. Rozdíl mezi volbami je jen v tom, jestli si prohlížeč pamatuje počet zobrazených stránek."
      />
      <div className="mx-auto max-w-3xl space-y-10 px-6 pb-16 leading-relaxed">
        <section>
          <h2 className="text-2xl font-medium tracking-tight">Nezbytné</h2>
          <p className="mt-4 text-muted">
            Klíč halden-consent si pamatuje, jestli jste volbu už udělali. Klíč halden-theme si pamatuje
            světlý nebo tmavý režim. Bez nich by se lišta ptala při každé návštěvě a režim by se vracel do
            tmavého. Tyto údaje zůstávají v prohlížeči.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-medium tracking-tight">Měření</h2>
          <p className="mt-4 text-muted">
            Když měření povolíte, klíč halden-views zvýší číslo při první návštěvě dané stránky v relaci.
            Číslo nikam neodesíláme. Když měření odmítnete, klíče smažeme.{" "}
            {consent?.measure
              ? `Teď je měření zapnuté a v tomto prohlížeči je ${views} zobrazení.`
              : "Teď měření neběží."}
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-medium tracking-tight">Jak volbu změnit</h2>
          <p className="mt-4 text-muted">
            Otevřete nastavení. Stejné okno je v patičce každé stránky. Prohlížeč můžete také vyčistit ručně.
          </p>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="press mt-6 inline-flex min-h-11 items-center bg-field px-5 text-sm text-field-fg"
          >
            Otevřít nastavení
          </button>
        </section>
      </div>
    </>
  );
}
