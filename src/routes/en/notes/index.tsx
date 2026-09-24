import { createFileRoute } from "@tanstack/react-router";
import { ui } from "@/content/en";
import { pageHead } from "@/lib/meta";
import { NotesPage } from "../../poznamky/index";

export const Route = createFileRoute("/en/notes/")({
  head: () => pageHead("Notes", ui.metaNotes),
  component: NotesPage,
});
