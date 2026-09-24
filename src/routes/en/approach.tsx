import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/en";
import { pageHead } from "@/lib/meta";
import { ApproachPage } from "../pristup";

export const Route = createFileRoute("/en/approach")({
  head: () => pageHead("Approach", ui.metaApproach),
  component: ApproachPage,
});
