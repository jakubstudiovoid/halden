import { useRouterState } from "@tanstack/react-router";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const THEME_KEY = "halden-theme";
const CONSENT_KEY = "halden-consent";
const VIEWS_KEY = "halden-views";
const SEEN_KEY = "halden-seen";

export type ThemeName = "dark" | "light";

export type Consent = {
  necessary: true;
  measure: boolean;
  at: string;
};

type PrefsContextValue = {
  ready: boolean;
  consent: Consent | null;
  accept: (measure: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  views: number;
};

const PrefsContext = createContext<PrefsContextValue | null>(null);

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (typeof parsed.measure !== "boolean") return null;
    return { necessary: true, measure: parsed.measure, at: parsed.at };
  } catch {
    return null;
  }
}

function applyTheme(theme: ThemeName) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f7f4ee" : "#05080f");
}

export function toggleTheme() {
  const next: ThemeName = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

export function ThemeSync() {
  useLayoutEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    applyTheme(saved === "light" ? "light" : "dark");
  }, []);
  return null;
}

function Measure() {
  const { consent } = usePrefs();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (!consent?.measure) return;
    let seen: string[] = [];
    try {
      seen = JSON.parse(sessionStorage.getItem(SEEN_KEY) || "[]") as string[];
      if (!Array.isArray(seen)) seen = [];
    } catch {
      seen = [];
    }
    if (seen.includes(pathname)) return;
    seen.push(pathname);
    sessionStorage.setItem(SEEN_KEY, JSON.stringify(seen));
    const views = Number(localStorage.getItem(VIEWS_KEY) || "0") + 1;
    localStorage.setItem(VIEWS_KEY, String(Number.isFinite(views) ? views : 1));
  }, [pathname, consent?.measure]);

  return null;
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setViews(Number(localStorage.getItem(VIEWS_KEY) || "0") || 0);
    setReady(true);
  }, []);

  const value = useMemo<PrefsContextValue>(
    () => ({
      ready,
      consent,
      views,
      settingsOpen,
      setSettingsOpen,
      accept: (measure: boolean) => {
        const next: Consent = {
          necessary: true,
          measure,
          at: new Date().toISOString(),
        };
        localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
        if (!measure) {
          localStorage.removeItem(VIEWS_KEY);
          sessionStorage.removeItem(SEEN_KEY);
          setViews(0);
        }
        setConsent(next);
        setSettingsOpen(false);
      },
    }),
    [ready, consent, views, settingsOpen],
  );

  return (
    <PrefsContext.Provider value={value}>
      <ThemeSync />
      <Measure />
      {children}
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  const value = useContext(PrefsContext);
  if (!value) throw new Error("usePrefs must be used inside PrefsProvider");
  return value;
}
