import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/en";
import { pageHead } from "@/lib/meta";
import { ContactPage } from "../kontakt";

export const Route = createFileRoute("/en/contact")({
  head: () => pageHead("Contact", ui.metaContact),
  component: ContactPage,
});
