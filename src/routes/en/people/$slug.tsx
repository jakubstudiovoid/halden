import { createFileRoute, notFound } from "@tanstack/react-router";
import { people, ui } from "@/content/en";
import { pageHead } from "@/lib/meta";
import { PersonPage } from "../../lide/$slug";

export const Route = createFileRoute("/en/people/$slug")({
  loader: ({ params }) => {
    const person = people.find((item) => item.slug === params.slug);
    if (!person) throw notFound();
    return person;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.name, `${loaderData.role}. ${loaderData.focus}. ${loaderData.city}.`)
      : pageHead("People", ui.metaPersonFallback),
  component: PersonPage,
});
