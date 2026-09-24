import { createFileRoute, notFound } from "@tanstack/react-router";
import { notes, ui } from "@/content/en";
import { pageHead } from "@/lib/meta";
import { NotePage } from "../../poznamky/$slug";

export const Route = createFileRoute("/en/notes/$slug")({
  loader: ({ params }) => {
    const note = notes.find((item) => item.slug === params.slug);
    if (!note) throw notFound();
    return note;
  },
  head: ({ loaderData }) =>
    loaderData ? pageHead(loaderData.title, loaderData.excerpt) : pageHead("Note", ui.metaNoteFallback),
  component: NotePage,
});
