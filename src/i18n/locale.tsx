import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { catalog, type Locale } from "@/content/catalog";

export type { Locale };

export function localeFromPath(path: string): Locale {
  return path === "/en" || path.startsWith("/en/") ? "en" : "cs";
}

const exact: [string, string][] = [
  ["/oblasti", "/en/practices"],
  ["/pristup", "/en/approach"],
  ["/atelier", "/en/studio"],
  ["/lide", "/en/people"],
  ["/poznamky", "/en/notes"],
  ["/kontakt", "/en/contact"],
  ["/soukromi", "/en/privacy"],
  ["/cookies", "/en/cookies"],
  ["/", "/en"],
];

export function swapLocale(path: string, to: Locale): string {
  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  const beforeHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const queryIndex = beforeHash.indexOf("?");
  const search = queryIndex >= 0 ? beforeHash.slice(queryIndex) : "";
  let pathname = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
  if (pathname.length > 1 && pathname.endsWith("/")) pathname = pathname.slice(0, -1);
  const tail = search + hash;

  if (to === "en") {
    const practice = pathname.match(/^\/oblasti\/([^/]+)$/);
    if (practice) return `/en/practices/${practice[1]}${tail}`;
    const person = pathname.match(/^\/lide\/([^/]+)$/);
    if (person) return `/en/people/${person[1]}${tail}`;
    const note = pathname.match(/^\/poznamky\/([^/]+)$/);
    if (note) return `/en/notes/${note[1]}${tail}`;
    const hit = exact.find(([cs]) => cs === pathname);
    return (hit ? hit[1] : "/en") + tail;
  }

  const practice = pathname.match(/^\/en\/practices\/([^/]+)$/);
  if (practice) return `/oblasti/${practice[1]}${tail}`;
  const person = pathname.match(/^\/en\/people\/([^/]+)$/);
  if (person) return `/lide/${person[1]}${tail}`;
  const note = pathname.match(/^\/en\/notes\/([^/]+)$/);
  if (note) return `/poznamky/${note[1]}${tail}`;
  const hit = exact.find(([, enPath]) => enPath === pathname);
  return (hit ? hit[0] : "/") + tail;
}

export function useLocale(): Locale {
  const path = useRouterState({ select: (state) => state.location.pathname });
  return localeFromPath(path);
}

export function useCopy() {
  return catalog(useLocale());
}

export function useLinks() {
  const locale = useLocale();
  const en = locale === "en";
  return {
    locale,
    home: en ? "/en" : "/",
    practices: en ? "/en/practices" : "/oblasti",
    practice: (slug: string) => (en ? `/en/practices/${slug}` : `/oblasti/${slug}`),
    approach: en ? "/en/approach" : "/pristup",
    studio: en ? "/en/studio" : "/atelier",
    people: en ? "/en/people" : "/lide",
    person: (slug: string) => (en ? `/en/people/${slug}` : `/lide/${slug}`),
    notes: en ? "/en/notes" : "/poznamky",
    note: (slug: string) => (en ? `/en/notes/${slug}` : `/poznamky/${slug}`),
    contact: en ? "/en/contact" : "/kontakt",
    privacy: en ? "/en/privacy" : "/soukromi",
    cookies: en ? "/en/cookies" : "/cookies",
  };
}

export function useSlug() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const parts = path.split("/").filter(Boolean);
  return parts.at(-1) ?? "";
}

export function RouteLink({
  to,
  className,
  children,
  onClick,
  ariaCurrent,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  ariaCurrent?: boolean;
}) {
  return (
    <Link to={to as never} className={className} onClick={onClick} aria-current={ariaCurrent ? "page" : undefined}>
      {children}
    </Link>
  );
}
