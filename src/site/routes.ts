import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export type Route = { path: string; label: string; group: string };

export const routes: Route[] = [
  { path: "principles", label: "Principles", group: "Language" },
  { path: "foundations", label: "Foundations", group: "Language" },
  { path: "writing", label: "Writing", group: "Language" },
  { path: "controls", label: "Controls", group: "Components" },
  { path: "navigation", label: "Navigation", group: "Components" },
  { path: "content", label: "Content", group: "Components" },
  { path: "overlays", label: "Overlays", group: "Components" },
  { path: "documents", label: "Documents", group: "Specialty" },
  { path: "charts", label: "Charts & graphs", group: "Specialty" },
  { path: "terminal", label: "Terminal", group: "Specialty" },
];

/* Full-screen example UIs, one per kind of screen. Opened outside the showcase chrome. */
export const templates: { path: string; label: string; about: string }[] = [
  { path: "t/chat", label: "Chat", about: "App shell: conversation sidebar, messages, centered composer." },
  { path: "t/dashboard", label: "Dashboard", about: "Data: stats, a bar chart, recent activity and a table." },
  { path: "t/settings", label: "Settings", about: "Forms: sectioned settings, billing, and a danger zone." },
  { path: "t/canvas", label: "Canvas", about: "Work surface: tool rail, inspector, dock, selection on a canvas." },
  { path: "t/article", label: "Article", about: "Reading: title, byline, hero, prose, related." },
  { path: "t/landing", label: "Landing", about: "Marketing: hero, features, pricing, FAQ, footer." },
];

const isScreen = (path: string) => path.startsWith("t/");
const read = () => location.hash.replace(/^#\/?/, "") || routes[0].path;

/* The showcase page a screen was opened from, and where it was scrolled to. */
let opener: { path: string; scroll: number } | null = null;

/* Leave a screen: back through history when it was opened from the showcase, else home. */
export function leaveScreen() {
  if (opener) history.back();
  else location.hash = `#/${routes[0].path}`;
}

export function useRoute() {
  const [path, setPath] = useState(read);
  const current = useRef(path);
  useEffect(() => {
    history.scrollRestoration = "manual";
    const on = () => {
      const prev = current.current;
      const next = read();
      current.current = next;
      const entering = !isScreen(prev) && isScreen(next);
      const leaving = isScreen(prev) && !isScreen(next);
      if (entering) opener = { path: prev, scroll: scrollY };
      const top = leaving && opener?.path === next ? opener.scroll : 0;
      if (leaving) opener = null;
      flushSync(() => setPath(next));
      window.scrollTo(0, top);
    };
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  return path;
}
