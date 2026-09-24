export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} — Halden` },
      { name: "description", content: description },
    ],
  };
}
