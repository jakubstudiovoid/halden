import type { ErrorComponentProps } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "Došlo k neočekávané chybě. Zkuste stránku načíst znovu.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-bg px-6 text-fg">
      <p className="text-sm text-muted">Halden</p>
      <h1 className="mt-6 max-w-xl text-4xl font-medium tracking-tight">Něco se nepovedlo</h1>
      <p className="mt-6 max-w-xl text-base break-words text-muted">{errorMessage(error)}</p>
      <a
        href="/"
        className="press mt-10 inline-flex min-h-11 items-center bg-field px-5 text-sm text-field-fg"
      >
        Zpět na úvod
      </a>
    </main>
  );
}
