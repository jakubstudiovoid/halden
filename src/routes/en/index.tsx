import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/content/en";
import { Home } from "../index";

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: [
      { title: "Halden — a law firm" },
      { name: "description", content: site.description },
    ],
  }),
  component: Home,
});
