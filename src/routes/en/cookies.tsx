import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/en";
import { pageHead } from "@/lib/meta";
import { CookiesPage } from "../cookies";

export const Route = createFileRoute("/en/cookies")({
  head: () => pageHead("Cookies", ui.metaCookies),
  component: CookiesPage,
});
