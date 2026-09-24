import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader } from "@/components/site/ui";

export const Route = createFileRoute("/soukromi")({
  head: () =>
    pageHead(
      "Ochrana soukromí",
      "Jak Halden v této prezentaci zachází s osobními údaji. Formulář se neukládá a neodesílá.",
    ),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader
        kicker="Soukromí"
        title="Údaje, které od vás nechceme zbytečně."
        lede="Tato stránka popisuje prezentaci webu Halden. Není to právní rada a nenahrazuje informace, které by správce dával v ostrém provozu."
      />
      <div className="mx-auto max-w-3xl space-y-10 px-6 pb-24 text-base leading-relaxed">
        <section>
          <h2 className="text-2xl font-medium tracking-tight">Kdo web provozuje</h2>
          <p className="mt-4 text-muted">
            Prezentaci vede identita {site.legalName}. Kontakt: {site.email}. Neuvádíme číslo zápisu ani
            adresu sídla, protože jde o navržený web, ne o veřejný výpis konkrétní kanceláře.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-medium tracking-tight">Co se děje se zprávou z formuláře</h2>
          <p className="mt-4 text-muted">
            Formulář na stránce Kontakt ověří tvar údajů na serveru a nic neuloží. Jméno, e-mail ani text
            zprávy se nezapisují do databáze, neposílají se e-mailem a neobjevují se v logu aplikace. Po
            odpovědi serveru zůstanou jen v paměti vašeho prohlížeče, dokud stránku neopustíte.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-medium tracking-tight">Co ukládá prohlížeč</h2>
          <p className="mt-4 text-muted">
            Barevný režim a volba cookies jsou v localStorage tohoto prohlížeče. Když povolíte měření,
            přibude místní počítadlo zobrazených stránek. To počítadlo zařízení neopouští. Když zvolíte jen
            nezbytné, počítadlo smažeme. Podrobnosti jsou na stránce{" "}
            <Link to="/cookies" className="text-fg underline decoration-line underline-offset-4">
              Cookies
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-medium tracking-tight">Vaše volby</h2>
          <p className="mt-4 text-muted">
            Volbu cookies změníte kdykoli odkazem Nastavení cookies v patičce. Místní data smažete i
            vyčištěním úložiště prohlížeče pro tento web. Na cokoli dalšího odpovězte na {site.email}.
          </p>
        </section>
        <p className="text-sm text-muted">Platné k 24. září 2026.</p>
      </div>
    </>
  );
}
