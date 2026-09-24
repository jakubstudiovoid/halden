import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { PrefsProvider } from "@/components/site/prefs";
import { Shell } from "@/components/site/shell";
import { Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";

const BOOT = `(function(){try{document.documentElement.classList.add("js");var t=localStorage.getItem("halden-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Halden — advokátní kancelář" },
      {
        name: "description",
        content:
          "Halden je advokátní kancelář v Praze a ve Vídni. Přesná právní práce pro vlastníky, vedení a rodiny.",
      },
      { name: "theme-color", content: "#08101c" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  shellComponent: RootShell,
  component: () => (
    <PrefsProvider>
      <Shell>
        <Outlet />
      </Shell>
    </PrefsProvider>
  ),
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>{children}</AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center px-6 pt-24 md:px-10">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-6 max-w-xl text-4xl font-medium tracking-tight md:text-6xl">
        Tahle stránka tu není.
      </h1>
      <p className="mt-6 max-w-lg text-muted">
        Adresa nesedí. Vraťte se na úvod, nebo napište, pokud hledáte konkrétní věc.
      </p>
      <div className="mt-10 flex flex-wrap gap-6">
        <Link
          to="/"
          className="press inline-flex min-h-11 items-center bg-field px-5 text-sm text-field-fg"
        >
          Úvod
        </Link>
        <Link
          to="/kontakt"
          className="inline-flex min-h-11 items-center text-sm underline decoration-line underline-offset-4"
        >
          Kontakt
        </Link>
      </div>
    </div>
  );
}
