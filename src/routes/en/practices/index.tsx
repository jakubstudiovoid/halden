import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/en";
import { pageHead } from "@/lib/meta";
import { PracticesPage } from "../../oblasti/index";

export const Route = createFileRoute("/en/practices/")({
  head: () => pageHead("Practices", ui.metaPractices),
  component: PracticesPage,
});
