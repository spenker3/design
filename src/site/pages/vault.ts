import type { FNode, FLink } from "../../components/ForceGraph";

/* A made-up notes vault for the force graph demo. */
const notes: [string, string?][] = [
  ["Home"],
  ["Design system", "design"], ["Tokens", "design"], ["Color", "design"], ["Typography", "design"], ["Selection", "design"],
  ["Radius", "design"], ["Motion", "design"], ["Icons", "design"], ["Writing guide", "design"], ["Charts", "design"],
  ["Rust", "code"], ["GPUI", "code"], ["Ownership", "code"], ["Traits", "code"], ["Async", "code"], ["Tokio", "code"],
  ["Error handling", "code"], ["Serde", "code"], ["Chess engine", "code"], ["TUI", "code"],
  ["Reading list", "read"], ["Thinking in Systems", "read"], ["The Design of Everyday Things", "read"],
  ["Tufte", "read"], ["Refactoring UI", "read"], ["Gödel, Escher, Bach", "read"],
  ["Daily 2026-11-03"], ["Daily 2026-11-04"], ["Daily 2026-11-05"], ["Ideas"], ["Inbox"],
  ["Helvetica"], ["Geist Mono"], ["Contrast"], ["Color blindness"], ["Feedback loops"],
  ["Untitled"], ["Scratch"],
];

const pairs: [string, string][] = [
  ["Home", "Design system"], ["Home", "Rust"], ["Home", "Reading list"], ["Home", "Ideas"], ["Home", "Inbox"],
  ["Design system", "Tokens"], ["Design system", "Color"], ["Design system", "Typography"], ["Design system", "Selection"],
  ["Design system", "Radius"], ["Design system", "Motion"], ["Design system", "Icons"], ["Design system", "Writing guide"],
  ["Design system", "Charts"], ["Tokens", "Color"], ["Tokens", "Radius"], ["Tokens", "GPUI"], ["Color", "Selection"],
  ["Color", "Contrast"], ["Color", "Color blindness"], ["Charts", "Color blindness"], ["Charts", "Tufte"],
  ["Typography", "Helvetica"], ["Typography", "Geist Mono"], ["Selection", "TUI"], ["Contrast", "Selection"],
  ["Rust", "GPUI"], ["Rust", "Ownership"], ["Rust", "Traits"], ["Rust", "Async"], ["Rust", "Error handling"],
  ["Rust", "Serde"], ["Async", "Tokio"], ["Chess engine", "Tokio"], ["Chess engine", "Serde"], ["Chess engine", "TUI"],
  ["Chess engine", "Error handling"], ["TUI", "Rust"], ["Traits", "Ownership"],
  ["Reading list", "Thinking in Systems"], ["Reading list", "The Design of Everyday Things"], ["Reading list", "Tufte"],
  ["Reading list", "Refactoring UI"], ["Reading list", "Gödel, Escher, Bach"], ["Thinking in Systems", "Feedback loops"],
  ["Refactoring UI", "Design system"], ["The Design of Everyday Things", "Selection"], ["Ideas", "Feedback loops"],
  ["Daily 2026-11-03", "Chess engine"], ["Daily 2026-11-04", "Charts"], ["Daily 2026-11-04", "Color blindness"],
  ["Daily 2026-11-05", "Design system"], ["Daily 2026-11-05", "Ideas"], ["Inbox", "Ideas"], ["Gödel, Escher, Bach", "Feedback loops"],
];

export const vaultNodes: FNode[] = notes.map(([label, group]) => ({ id: label, label, group }));
export const vaultLinks: FLink[] = pairs.map(([source, target]) => ({ source, target }));
export const vaultGroups = { design: "var(--series-1)", code: "var(--series-2)", read: "var(--series-3)" };
