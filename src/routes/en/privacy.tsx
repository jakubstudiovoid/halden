import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/en";
import { pageHead } from "@/lib/meta";
import { PrivacyPage } from "../soukromi";

export const Route = createFileRoute("/en/privacy")({
  head: () => pageHead("Privacy", ui.metaPrivacy),
  component: PrivacyPage,
});
