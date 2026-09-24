import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/en";
import { pageHead } from "@/lib/meta";
import { StudioPage } from "../atelier";

export const Route = createFileRoute("/en/studio")({
  head: () => pageHead("Studio", ui.metaStudio),
  component: StudioPage,
});
