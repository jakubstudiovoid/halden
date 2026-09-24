import { createFileRoute, notFound } from "@tanstack/react-router";
import { practices, ui } from "@/content/en";
import { pageHead } from "@/lib/meta";
import { PracticePage } from "../../oblasti/$slug";

export const Route = createFileRoute("/en/practices/$slug")({
  loader: ({ params }) => {
    const practice = practices.find((item) => item.slug === params.slug);
    if (!practice) throw notFound();
    return practice;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.title, loaderData.summary)
      : pageHead("Practice", ui.metaPracticeFallback),
  component: PracticePage,
});
