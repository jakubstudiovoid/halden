import { createFileRoute } from "@tanstack/react-router";
import { notes, practices, questions, site } from "@/content/site";
import * as en from "@/content/en";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const lines = [
          `# ${site.legalName}`,
          "",
          `> ${site.description}`,
          "",
          "Texty nejsou právní radou a nezakládají vztah advokát–klient.",
          "Texts are not legal advice and do not create a lawyer–client relationship.",
          "",
          "## Stránky",
          "",
          `- [Úvod](${origin}/)`,
          `- [Oblasti](${origin}/oblasti)`,
          ...practices.map((item) => `- [${item.title}](${origin}/oblasti/${item.slug}): ${item.summary}`),
          `- [Přístup](${origin}/pristup)`,
          `- [Ateliér](${origin}/atelier)`,
          `- [Lidé](${origin}/lide)`,
          `- [Poznámky](${origin}/poznamky)`,
          ...notes.map((item) => `- [${item.title}](${origin}/poznamky/${item.slug}): ${item.excerpt}`),
          `- [Kontakt](${origin}/kontakt)`,
          `- [Soukromí](${origin}/soukromi)`,
          `- [Cookies](${origin}/cookies)`,
          "",
          "## Pages in English",
          "",
          `- [Home](${origin}/en)`,
          `- [Practices](${origin}/en/practices)`,
          ...en.practices.map((item) => `- [${item.title}](${origin}/en/practices/${item.slug}): ${item.summary}`),
          `- [Approach](${origin}/en/approach)`,
          `- [Studio](${origin}/en/studio)`,
          `- [People](${origin}/en/people)`,
          `- [Notes](${origin}/en/notes)`,
          ...en.notes.map((item) => `- [${item.title}](${origin}/en/notes/${item.slug}): ${item.excerpt}`),
          `- [Contact](${origin}/en/contact)`,
          `- [Privacy](${origin}/en/privacy)`,
          `- [Cookies](${origin}/en/cookies)`,
          "",
          "## Časté otázky",
          "",
          ...questions.flatMap((item) => [`### ${item.q}`, item.a, ""]),
          "## Questions",
          "",
          ...en.questions.flatMap((item) => [`### ${item.q}`, item.a, ""]),
          `Kontakt: ${site.email}`,
          "Města: Praha a Vídeň, schůzka po potvrzení. Cities: Prague and Vienna, a meeting once confirmed.",
          "Jazyky: čeština, angličtina, němčina. Languages: Czech, English, German.",
          "",
        ];
        return new Response(lines.join("\n"), {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});