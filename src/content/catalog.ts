import * as cs from "@/content/site";
import * as en from "@/content/en";

export type Locale = "cs" | "en";

export function catalog(locale: Locale) {
  return locale === "en" ? en : cs;
}

export function allPublicPaths() {
  const practice = cs.practices.map((item) => item.slug);
  const people = cs.people.map((item) => item.slug);
  const notes = cs.notes.map((item) => item.slug);
  const czech = [
    "/",
    "/oblasti",
    ...practice.map((slug) => `/oblasti/${slug}`),
    "/pristup",
    "/atelier",
    "/lide",
    ...people.map((slug) => `/lide/${slug}`),
    "/poznamky",
    ...notes.map((slug) => `/poznamky/${slug}`),
    "/kontakt",
    "/soukromi",
    "/cookies",
  ];
  const english = [
    "/en",
    "/en/practices",
    ...practice.map((slug) => `/en/practices/${slug}`),
    "/en/approach",
    "/en/studio",
    "/en/people",
    ...people.map((slug) => `/en/people/${slug}`),
    "/en/notes",
    ...notes.map((slug) => `/en/notes/${slug}`),
    "/en/contact",
    "/en/privacy",
    "/en/cookies",
  ];
  return [...czech, ...english];
}
