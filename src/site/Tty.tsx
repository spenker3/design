/*
  A terminal mock for the TUI pages: a grid of mono cells, built from lines of
  segments. Showcase only. A real TUI uses its toolkit's own styles.

  A segment is plain text, or [text, attrs] where attrs are space-separated:
  b (bold), dim (half-intensity), dark (bright black), rev (reverse video),
  u (underline), i (italic), and the named colors red yellow green cyan blue magenta.
*/
export type Seg = string | [string, string];
export type Line = Seg[];

const chars = (s: Seg) => [...(typeof s === "string" ? s : s[0])].length;
export const width = (l: Line) => l.reduce((n, s) => n + chars(s), 0);

/* Pad (or cut, with an ellipsis) a line to exactly w cells. fill styles the padding. */
export function fit(l: Line, w: number, fill = ""): Line {
  const n = width(l);
  if (n <= w) return n === w ? l : [...l, [" ".repeat(w - n), fill]];
  const out: Line = [];
  let left = w - 1;
  for (const s of l) {
    const [t, a] = typeof s === "string" ? [s, ""] : s;
    const cut = [...t].slice(0, left).join("");
    if (cut) out.push([cut, a]);
    left -= [...cut].length;
    if (left <= 0) break;
  }
  return [...out, ["…", fill]];
}

/* A full-width row in one style: the cursor row, a header. */
export const row = (l: Line, w: number, attrs: string): Line =>
  fit(l, w).map((s) => (typeof s === "string" ? [s, attrs] : [s[0], `${s[1]} ${attrs}`.trim()]));

/* A square single-line box, w cells wide, with an optional title set into the top edge. */
export function box(body: Line[], w: number, o: { title?: string; edge?: string; h?: number; pad?: number } = {}): Line[] {
  const edge = o.edge ?? "dark";
  const pad = o.pad ?? 1;
  const inner = w - 2 - pad * 2;
  const top: Line = o.title
    ? [["┌─ ", edge], [o.title, "b"], [` ${"─".repeat(Math.max(0, w - 5 - [...o.title].length))}┐`, edge]]
    : [[`┌${"─".repeat(w - 2)}┐`, edge]];
  const rows = [...body];
  while (o.h && rows.length < o.h - 2) rows.push([]);
  const sp = " ".repeat(pad);
  return [
    top,
    ...rows.map((l): Line => [["│", edge], sp, ...fit(l, inner), sp, ["│", edge]]),
    [[`└${"─".repeat(w - 2)}┘`, edge]],
  ];
}

/* Blocks side by side, with gap cells between. Each block keeps its first line's width. */
export function beside(gap: number, ...blocks: Line[][]): Line[] {
  const h = Math.max(...blocks.map((b) => b.length));
  return Array.from({ length: h }, (_, i) =>
    blocks.flatMap((b, j) => [...fit(b[i] ?? [], width(b[0] ?? [])), ...(j < blocks.length - 1 ? [" ".repeat(gap)] : [])]),
  );
}

/* Left and right parts on one line of w cells, like a label and its count. */
export const spread = (left: Line, right: Line, w: number): Line => [
  ...fit(left, Math.max(0, w - width(right) - 1)),
  " ",
  ...right,
];

/* Key hints for the footer: bold key, dim label, two spaces apart. */
export const hints = (...pairs: [string, string][]): Line =>
  pairs.flatMap(([k, label], i): Line => [...(i ? ["  "] : []), [k, "b"], " ", [label, "dim"]]);

export function Tty({ lines, label, cols }: { lines: Line[]; label: string; cols?: number }) {
  return (
    <pre className="tty" role="img" aria-label={label} style={cols ? { width: `calc(${cols}ch + 2 * var(--tty-pad) + 2px)` } : undefined}>
      {lines.map((l, i) => (
        <span className="tty-line" key={i}>
          {l.map((s, j) => (typeof s === "string" ? s : <span className={s[1]} key={j}>{s[0]}</span>))}
          {"\n"}
        </span>
      ))}
    </pre>
  );
}
