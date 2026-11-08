import { useEffect, useState } from "react";

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

export function useRoute() {
  const read = () => location.hash.replace(/^#\/?/, "") || routes[0].path;
  const [path, setPath] = useState(read);
  useEffect(() => {
    const on = () => {
      setPath(read());
      window.scrollTo(0, 0);
    };
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  return path;
}
