import { useEffect, useRef, useState } from "react";
import { ArrowLeft, FileText, Menu as MenuIcon, Monitor, Moon, Sun } from "lucide-react";
import { Segmented } from "../components/Choice";
import { leaveScreen, routes, templates, useRoute } from "./routes";
import { templatePages } from "./templates";
import { Principles } from "./pages/Principles";
import { Foundations } from "./pages/Foundations";
import { Writing } from "./pages/Writing";
import { Controls } from "./pages/Controls";
import { Navigation } from "./pages/Navigation";
import { Content } from "./pages/Content";
import { Overlays } from "./pages/Overlays";
import { Documents } from "./pages/Documents";
import { Charts } from "./pages/Charts";
import { Terminal } from "./pages/Terminal";
import { Skill } from "./pages/Skill";

const pages: Record<string, () => React.JSX.Element> = {
  principles: Principles,
  foundations: Foundations,
  writing: Writing,
  controls: Controls,
  navigation: Navigation,
  content: Content,
  overlays: Overlays,
  documents: Documents,
  charts: Charts,
  terminal: Terminal,
  skill: Skill,
};

type Theme = "system" | "light" | "dark";

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem("theme") as Theme) || "system";
    } catch {
      return "system";
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* private mode */
    }
  }, [theme]);
  return [theme, setTheme] as const;
}

function ThemeSwitch({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <Segmented
      label="Theme"
      value={theme}
      onChange={setTheme}
      options={[
        { value: "system", label: <Monitor aria-label="System" /> },
        { value: "light", label: <Sun aria-label="Light" /> },
        { value: "dark", label: <Moon aria-label="Dark" /> },
      ]}
    />
  );
}

export function App() {
  const path = useRoute();
  const [theme, setTheme] = useTheme();
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => setNavOpen(false), [path]);

  const Template = templatePages[path];
  const screen = templates.find((x) => x.path === path);
  /* The showcase stays mounted under a screen, so the nav and page come back as they were. */
  const sitePath = useRef(path);
  if (!Template) sitePath.current = path;

  /* Esc leaves a screen, unless it closes something open first or the cursor is in a field. */
  useEffect(() => {
    if (!Template) return;
    const on = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented) return;
      if (document.querySelector("dialog[open], :popover-open")) return;
      const field = (e.target as HTMLElement).closest?.("input, textarea, select, [contenteditable]");
      if (field) (field as HTMLElement).blur();
      else leaveScreen();
    };
    addEventListener("keydown", on);
    return () => removeEventListener("keydown", on);
  }, [Template]);

  useEffect(() => {
    const name = screen?.label ?? routes.find((r) => r.path === sitePath.current)?.label ?? (sitePath.current === "skill" ? "Skill" : routes[0].label);
    document.title = `${name} · design`;
  }, [path, screen]);

  const Page = pages[sitePath.current] ?? Principles;
  const groups = [...new Set(routes.map((r) => r.group))];

  return (
    <>
      {Template && screen && (
        <>
          <div className="screen" key={path}>
            <Template />
          </div>
          <div className="template-bar">
            <button className="btn ghost sm" onClick={leaveScreen}>
              <ArrowLeft /> {screen.label} <kbd>Esc</kbd>
            </button>
            <ThemeSwitch theme={theme} setTheme={setTheme} />
          </div>
        </>
      )}
      <div className="site" hidden={!!Template}>
        <header className="topbar site-top">
          <button className="btn ghost icon site-menu" aria-label="Menu" onClick={() => setNavOpen(!navOpen)}>
            <MenuIcon />
          </button>
          <a className="wordmark" href="#/principles">
            design
          </a>
          <span className="spacer" />
          <ThemeSwitch theme={theme} setTheme={setTheme} />
        </header>
        <aside className={navOpen ? "site-side open" : "site-side"}>
          <nav className="nav site-pin" aria-label="Skill">
            <a href="#/skill" aria-current={sitePath.current === "skill" ? "page" : undefined}>
              <FileText /> Skill
            </a>
          </nav>
          {groups.map((g) => (
            <nav className="nav" key={g} aria-label={g}>
              <div className="nav-label">{g}</div>
              {routes
                .filter((r) => r.group === g)
                .map((r) => (
                  <a key={r.path} href={`#/${r.path}`} aria-current={r.path === sitePath.current ? "page" : undefined}>
                    {r.label}
                  </a>
                ))}
            </nav>
          ))}
          <nav className="nav" aria-label="Screens">
            <div className="nav-label">Screens</div>
            {templates.map((t) => (
              <a key={t.path} href={`#/${t.path}`}>
                {t.label}
              </a>
            ))}
          </nav>
        </aside>
        <main className="site-main">
          <Page />
        </main>
      </div>
    </>
  );
}
