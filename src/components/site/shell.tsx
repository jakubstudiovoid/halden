import { Link, useRouterState } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useEffect, useLayoutEffect, useState, type MouseEvent, type ReactNode } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Mark } from "@/components/site/ui";
import { toggleTheme, usePrefs } from "@/components/site/prefs";
import { localeFromPath, RouteLink, swapLocale, useCopy, useLinks, useLocale } from "@/i18n/locale";

function ThemeWord() {
  const { ui } = useCopy();
  const [light, setLight] = useState(false);
  useLayoutEffect(() => {
    setLight(document.documentElement.dataset.theme === "light");
  }, []);
  return (
    <button
      type="button"
      onClick={() => {
        toggleTheme();
        setLight((value) => !value);
      }}
      className="inline-flex min-h-11 items-center text-xs tracking-widest text-muted uppercase transition-colors duration-1000 hover:text-fg"
    >
      {light ? ui.themeDark : ui.themeLight}
    </button>
  );
}

function LocaleSwitch({ overField }: { overField?: boolean }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const locale = localeFromPath(path);
  const href = swapLocale(path, locale === "cs" ? "en" : "cs");
  const { ui } = useCopy();
  return (
    <Link
      to={href as never}
      hrefLang={locale === "cs" ? "en" : "cs"}
      lang={locale === "cs" ? "en" : "cs"}
      aria-label={locale === "cs" ? ui.toEnglish : ui.toCzech}
      className={cn(
        "inline-flex min-h-11 items-center px-2 text-xs tracking-widest uppercase transition-colors duration-1000",
        overField ? "text-field-muted hover:text-field-fg" : "text-muted hover:text-fg",
      )}
    >
      {locale === "cs" ? ui.toEnglish : ui.toCzech}
    </Link>
  );
}

function BrandLink({ className, children }: { className?: string; children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const { home } = useLinks();
  const { ui } = useCopy();
  return (
    <Link
      to={home as never}
      aria-label={ui.homeAria}
      className={className}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (window.scrollY > 8) {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
          return;
        }
        if (path === home) event.preventDefault();
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
  const overField = path === "/" || path === "/en" ? !scrolled : false;
  const { ui, nav } = useCopy();

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
        <nav aria-label={ui.navMain} className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => {
            const active = path === item.to || path.startsWith(`${item.to}/`);
            return (
              <RouteLink
                key={item.to}
                to={item.to}
                ariaCurrent={active}
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
              </RouteLink>
            );
          })}
        </nav>
        <div className="flex items-center">
          <LocaleSwitch overField={overField} />
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className={cn(
                  "press inline-flex size-11 items-center justify-center lg:hidden",
                  overField ? "text-field-fg" : "text-fg",
                )}
                aria-label={ui.openMenu}
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
                      aria-label={ui.closeMenu}
                    >
                      <X className="size-5" aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>
                <nav aria-label={ui.navMobile} className="mt-20 flex flex-col">
                  {nav.map((item) => (
                    <RouteLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="border-t border-line py-6 text-4xl tracking-tight"
                    >
                      {item.label}
                    </RouteLink>
                  ))}
                </nav>
                <div className="mt-auto flex items-center justify-between border-t border-line py-6">
                  <p className="text-sm text-muted">{ui.citiesLine}</p>
                  <div className="flex items-center">
                    <LocaleSwitch />
                  </div>
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
  const { ui, nav } = useCopy();
  const links = useLinks();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:grid-cols-12 md:px-16">
        <div className="reveal md:col-span-5">
          <BrandLink className="brand-lockup text-fg">
            <Mark />
            <span>HALDEN</span>
          </BrandLink>
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-muted">{ui.footerBlurb}</p>
          <p className="mt-5 max-w-xs text-xs leading-relaxed text-muted/45">{ui.disclaimer}</p>
        </div>
        <nav aria-label={ui.navFooter} className="reveal grid grid-cols-2 gap-8 text-sm md:col-span-4">
          <ul className="space-y-3">
            {nav.map((item) => (
              <li key={item.to}>
                <RouteLink to={item.to} className="text-muted transition-colors duration-1000 hover:text-fg">
                  {item.label}
                </RouteLink>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            <li>
              <RouteLink to={links.privacy} className="text-muted transition-colors duration-1000 hover:text-fg">
                {ui.privacy}
              </RouteLink>
            </li>
            <li>
              <RouteLink to={links.cookies} className="text-muted transition-colors duration-1000 hover:text-fg">
                {ui.cookies}
              </RouteLink>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="text-left text-muted transition-colors duration-1000 hover:text-fg"
              >
                {ui.cookieSettings}
              </button>
            </li>
          </ul>
        </nav>
        <div className="reveal text-sm text-muted md:col-span-3">
          <p>{ui.meetPrague}</p>
          <p className="mt-2">{ui.meetVienna}</p>
          <a href={`mailto:${site.email}`} className="mt-6 inline-flex min-h-11 items-center text-fg">
            {site.email}
          </a>
        </div>
      </div>
      <div className="reveal mx-auto flex max-w-6xl flex-col gap-3 border-t border-line px-6 py-8 md:flex-row md:items-center md:justify-between md:px-16">
        <p className="text-xs tracking-widest text-muted uppercase">
          © {new Date().getFullYear()} {site.name}
        </p>
        <ThemeWord />
        <a
          href="https://studiovoid.cz"
          target="_blank"
          rel="noreferrer"
          className="text-xs tracking-widest uppercase text-muted transition-colors duration-1000 hover:text-fg"
        >
          {ui.creditBefore} · {ui.creditAfter}
        </a>
      </div>
    </footer>
  );
}

function CookieBar() {
  const { ready, consent, accept, settingsOpen, setSettingsOpen, views } = usePrefs();
  const { ui } = useCopy();
  const links = useLinks();
  const showBar = ready && consent === null;

  return (
    <>
      {showBar ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg px-6 py-3 md:px-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="max-w-lg text-xs leading-relaxed text-muted">
              {ui.cookieBar}{" "}
              <RouteLink to={links.cookies} className="text-fg underline decoration-line underline-offset-4">
                {ui.cookieMore}
              </RouteLink>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => setSettingsOpen(true)} className="press btn">
                {ui.cookieSettingsBtn}
              </button>
              <button type="button" onClick={() => accept(false)} className="press btn">
                {ui.cookieEssentialOnly}
              </button>
              <button type="button" onClick={() => accept(true)} className="press btn">
                {ui.cookieAllow}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <Dialog.Root open={settingsOpen} onOpenChange={setSettingsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,36rem)] -translate-x-1/2 -translate-y-1/2 bg-bg p-6 text-fg outline-none md:p-8">
            <Dialog.Title className="text-2xl font-normal tracking-tight">{ui.cookieTitle}</Dialog.Title>
            <Dialog.Description className="mt-4 text-sm leading-relaxed text-muted">
              {ui.cookieDialog}
            </Dialog.Description>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              <li className="flex items-start justify-between gap-6 py-4">
                <div>
                  <p className="text-sm text-fg">{ui.cookieNecessary}</p>
                  <p className="mt-1 text-sm text-muted">{ui.cookieNecessaryText}</p>
                </div>
                <span className="text-sm text-muted">{ui.cookieOn}</span>
              </li>
              <li className="flex items-start justify-between gap-6 py-4">
                <div>
                  <p className="text-sm text-fg">{ui.cookieMeasure}</p>
                  <p className="mt-1 text-sm text-muted">
                    {ui.cookieMeasureText}
                    {consent?.measure ? ` ${ui.cookieViews.replace("{n}", String(views))}` : ""}
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => accept(false)} className="press btn btn-line">
                {ui.cookieEssentialOnly}
              </button>
              <button type="button" onClick={() => accept(true)} className="press btn btn-solid">
                {ui.cookieAllow}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function inView(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return false;
  const view = window.innerHeight;
  const visible = Math.min(rect.bottom, view) - Math.max(rect.top, 0);
  return visible > 24;
}

function useContentReveal() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let batch = 0;
    let last = 0;

    const collect = () =>
      Array.from(document.querySelectorAll<HTMLElement>("#obsah .reveal, footer .reveal"));

    const mark = (el: HTMLElement, index: number) => {
      if (el.dataset.in != null) return;
      if (!reduced) el.style.transitionDelay = `${Math.min(index, 5) * 180}ms`;
      el.dataset.in = "";
    };

    const flush = () => {
      const now = performance.now();
      if (now - last > 240) batch = 0;
      last = now;
      const visible = collect()
        .filter((el) => el.dataset.in == null && (reduced || inView(el)))
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
      for (const el of visible) {
        mark(el, batch);
        batch += 1;
      }
    };

    if (reduced) {
      for (const el of collect()) mark(el, 0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .filter((el) => el.dataset.in == null);
        if (hit.length === 0) return;
        const now = performance.now();
        if (now - last > 240) batch = 0;
        last = now;
        hit.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        for (const el of hit) {
          mark(el, batch);
          batch += 1;
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px" },
    );

    for (const el of collect()) observer.observe(el);

    const frame = requestAnimationFrame(flush);
    const soon = window.setTimeout(flush, 90);
    const afterFade = window.setTimeout(flush, 760);
    const onScroll = () => flush();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(soon);
      window.clearTimeout(afterFade);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [path]);
}

export function Shell({ children }: { children: ReactNode }) {
  const { ready, consent } = usePrefs();
  const locale = useLocale();
  const pad = ready && consent === null;
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  useContentReveal();
  const { ui } = useCopy();
  return (
    <>
      <a
        href="#obsah"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-field focus:px-4 focus:py-3 focus:text-sm focus:text-field-fg"
      >
        {ui.skip}
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
