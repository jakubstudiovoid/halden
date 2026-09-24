import { createFileRoute } from "@tanstack/react-router";
import { notes, practices, questions, site } from "@/content/site";

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
          "## Časté otázky",
          "",
          ...questions.flatMap((item) => [`### ${item.q}`, item.a, ""]),
          `Kontakt: ${site.email}`,
          "Města: Praha a Vídeň, schůzka po potvrzení.",
          "Jazyky: čeština, angličtina, němčina.",
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
