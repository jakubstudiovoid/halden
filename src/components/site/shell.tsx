import { Link, useRouterState } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Mark } from "@/components/site/ui";
import { toggleTheme, usePrefs } from "@/components/site/prefs";

function ThemeButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Přepnout barevný režim"
      onClick={toggleTheme}
      className={cn(
        "press inline-flex size-11 items-center justify-center text-fg transition-colors duration-1000 hover:text-muted",
        className,
      )}
    >
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
    </button>
  );
}

function BrandLink({ className, children }: { className?: string; children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  return (
    <Link
      to="/"
      aria-label="Halden, úvod"
      className={className}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (window.scrollY > 8) {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
          return;
        }
        if (path === "/") event.preventDefault();
      }}
    >
      {children}
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });
  const overField = path === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-1000",
        overField ? "border-transparent bg-transparent" : "border-line bg-bg",
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-8 px-6 md:px-16">
        <BrandLink
          className={cn("flex items-center gap-3", overField ? "text-field-fg" : "text-fg")}
        >
          <Mark tone={overField ? "on-field" : "default"} className="size-6" />
          <span className="text-xs tracking-widest">HALDEN</span>
        </BrandLink>
        <nav aria-label="Hlavní" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => {
            const active = path === item.to || path.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-xs tracking-widest uppercase transition-colors duration-1000",
                  overField
                    ? active
                      ? "text-field-fg"
                      : "text-field-muted hover:text-field-fg"
                    : active
                      ? "text-fg"
                      : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1">
          <Link
            to="/kontakt"
            aria-current={path === "/kontakt" ? "page" : undefined}
            className={cn(
              "hidden min-h-11 items-center text-xs tracking-widest uppercase transition-colors duration-1000 sm:inline-flex",
              overField
                ? path === "/kontakt"
                  ? "text-field-fg"
                  : "text-field-muted hover:text-field-fg"
                : path === "/kontakt"
                  ? "text-fg"
                  : "text-muted hover:text-fg",
            )}
          >
            Kontakt
          </Link>
          <ThemeButton className={overField ? "text-field-fg hover:text-field-muted" : undefined} />
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className={cn(
                  "press inline-flex size-11 items-center justify-center lg:hidden",
                  overField ? "text-field-fg" : "text-fg",
                )}
                aria-label="Otevřít menu"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-bg" />
              <Dialog.Content
                aria-describedby={undefined}
                className="fixed inset-0 z-50 flex flex-col bg-bg px-6 pt-5 text-fg outline-none"
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-sm tracking-widest">HALDEN</Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="press inline-flex size-11 items-center justify-center"
                      aria-label="Zavřít menu"
                    >
                      <X className="size-5" aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>
                <nav aria-label="Mobilní" className="mt-20 flex flex-col">
                  {nav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="border-t border-line py-6 text-4xl tracking-tight"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    to="/kontakt"
                    onClick={() => setOpen(false)}
                    className="border-t border-line py-6 text-4xl tracking-tight"
                  >
                    Kontakt
                  </Link>
                </nav>
                <div className="mt-auto flex items-center justify-between border-t border-line py-6">
                  <p className="text-sm text-muted">Praha · Vídeň</p>
                  <ThemeButton />
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { setSettingsOpen } = usePrefs();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:grid-cols-12 md:px-16">
        <div className="md:col-span-5">
          <BrandLink className="brand-lockup text-fg">
            <Mark />
            <span>HALDEN</span>
          </BrandLink>
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-muted">
            Advokátní kancelář pro rozhodnutí, která mají váhu. Praha a Vídeň, jeden standard psaní.
          </p>
        </div>
        <nav aria-label="Patička" className="grid grid-cols-2 gap-8 text-sm md:col-span-4">
          <ul className="space-y-3">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted transition-colors duration-1000 hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            <li>
              <Link to="/kontakt" className="text-muted transition-colors duration-1000 hover:text-fg">
                Kontakt
              </Link>
            </li>
            <li>
              <Link to="/soukromi" className="text-muted transition-colors duration-1000 hover:text-fg">
                Soukromí
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="text-muted transition-colors duration-1000 hover:text-fg">
                Cookies
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="text-left text-muted transition-colors duration-1000 hover:text-fg"
              >
                Nastavení cookies
              </button>
            </li>
          </ul>
        </nav>
        <div className="text-sm text-muted md:col-span-3">
          <p>Praha — schůzka po potvrzení</p>
          <p className="mt-2">Vídeň — schůzka po potvrzení</p>
          <a href={`mailto:${site.email}`} className="mt-6 inline-flex min-h-11 items-center text-fg">
            {site.email}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-line px-6 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-16">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <a
          href="https://studiovoid.cz"
          target="_blank"
          rel="noreferrer"
          className="text-xs tracking-widest uppercase transition-colors duration-1000 hover:text-fg"
        >
          Koncept k prodeji vytvořilo studiovoid.cz
        </a>
        <p className="max-w-xl">
          Texty na tomto webu nejsou právní radou a nezakládají vztah advokát–klient.
        </p>
      </div>
    </footer>
  );
}

function CookieBar() {
  const { ready, consent, accept, settingsOpen, setSettingsOpen, views } = usePrefs();
  const showBar = ready && consent === null;

  return (
    <>
      {showBar ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg px-6 py-3 md:px-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="max-w-lg text-xs leading-relaxed text-muted">
              Nezbytné uloží jen volbu a barevný režim v tomto prohlížeči. Měření je místní počítadlo
              stránek — nic neodesíláme dál.{" "}
              <Link to="/cookies" className="text-fg underline decoration-line underline-offset-4">
                Více o cookies
              </Link>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="press btn"
              >
                Nastavení
              </button>
              <button type="button" onClick={() => accept(false)} className="press btn">
                Jen nezbytné
              </button>
              <button type="button" onClick={() => accept(true)} className="press btn">
                Povolit měření
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <Dialog.Root open={settingsOpen} onOpenChange={setSettingsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,36rem)] -translate-x-1/2 -translate-y-1/2 bg-bg p-6 text-fg outline-none md:p-8">
            <Dialog.Title className="text-2xl font-normal tracking-tight">Cookies</Dialog.Title>
            <Dialog.Description className="mt-4 text-sm leading-relaxed text-muted">
              Volba se uloží jen v tomto prohlížeči. Můžete ji kdykoli změnit.
            </Dialog.Description>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              <li className="flex items-start justify-between gap-6 py-4">
                <div>
                  <p className="text-sm text-fg">Nezbytné</p>
                  <p className="mt-1 text-sm text-muted">Uloží souhlas a barevný režim. Vždy zapnuto.</p>
                </div>
                <span className="text-sm text-muted">Zapnuto</span>
              </li>
              <li className="flex items-start justify-between gap-6 py-4">
                <div>
                  <p className="text-sm text-fg">Měření</p>
                  <p className="mt-1 text-sm text-muted">
                    Počítadlo zobrazení stránek v tomto prohlížeči. Žádný externí nástroj, žádné odeslání
                    na server.
                    {consent?.measure ? ` Zatím ${views} zobrazení.` : ""}
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => accept(false)}
                className="press btn btn-line"
              >
                Jen nezbytné
              </button>
              <button
                type="button"
                onClick={() => accept(true)}
                className="press btn btn-solid"
              >
                Povolit měření
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { ready, consent } = usePrefs();
  const pad = ready && consent === null;
  return (
    <>
      <a
        href="#obsah"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-field focus:px-4 focus:py-3 focus:text-sm focus:text-field-fg"
      >
        Přeskočit na obsah
      </a>
      <Header />
      <main id="obsah">{children}</main>
      <div className={pad ? "pb-28" : undefined}>
        <Footer />
      </div>
      <CookieBar />
    </>
  );
}
