import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/en";
import { pageHead } from "@/lib/meta";
import { PeoplePage } from "../../lide/index";

export const Route = createFileRoute("/en/people/")({
  head: () => pageHead("People", ui.metaPeople),
  component: PeoplePage,
});
