/*
  Builds the design skill in skill/ from the repo, so the skill always matches the system.

    npm run skill        (or: node scripts/skill.ts [-q])

  It also runs on its own: from the Vite dev server when anything in src/ changes, from a
  Claude Code hook after an edit in src/, and before every build.

  Generated: everything in skill/. skill/SKILL.md is rendered from the prose in
  src/design/skill.md with its {{placeholders}} filled in (see renderSkill).
  Sources: tokens.css, each CSS file's header comment, the title/rules of every <Demo> in the
  showcase pages, writing.ts, routes.ts and the templates, and the comments in src/components.
*/
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { check, elements, mechanics, voice } from "../src/design/writing.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel: string) => readFileSync(join(root, rel), "utf8");
/* The repo on GitHub, from package.json's "repository" ("github:owner/name"). The skill links
   there instead of to a local path, so it works on any machine. Paths ending in / are folders. */
const repo = `https://github.com/${JSON.parse(read("package.json")).repository.replace(/^github:/, "")}`;
const link = (path: string) => `[\`${path}\`](${repo}/${path.endsWith("/") ? "tree" : "blob"}/main/${path.replace(/\/$/, "")})`;
const quiet = process.argv.includes("-q");
const warnings: string[] = [];
const changed: string[] = [];

const banner = (title: string, about: string) =>
  `# ${title}\n\n<!-- Generated from ${repo} by \`npm run skill\`. Edit the repo, not this file. -->\n\n${about}\n`;

function write(rel: string, text: string) {
  const path = join(root, rel);
  if (existsSync(path) && readFileSync(path, "utf8") === text) return;
  writeFileSync(path, text);
  changed.push(rel);
}

/* ---------- text helpers ---------- */

function dedent(s: string) {
  const lines = s.replace(/^\s*\n/, "").replace(/\s+$/, "").split("\n");
  const pad = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length));
  return lines.map((l) => l.slice(pad)).join("\n");
}

const clean = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const cell = (s: string) => s.replace(/\|/g, "\\|");

/* The comment at the top of a CSS file: its class list and when to use each. */
function header(css: string) {
  const m = css.match(/^\s*\/\*([\s\S]*?)\*\//);
  return m ? dedent(m[1]) : "";
}

/* Splits on commas that aren't inside parentheses. */
function splitTop(s: string) {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  out.push(cur.trim());
  return out;
}

/* ---------- JSX props, without a parser ---------- */

/* Reads the props of the JSX tag whose name ends at `i`. String and {expression} values. */
function props(src: string, i: number) {
  const out: Record<string, string> = {};
  const braces = (j: number) => {
    let d = 0;
    do {
      if (src[j] === "{") d++;
      else if (src[j] === "}") d--;
      j++;
    } while (d > 0 && j < src.length);
    return j;
  };
  while (i < src.length) {
    while (/\s/.test(src[i])) i++;
    if (src[i] === ">" || src.startsWith("/>", i)) break;
    if (src[i] === "{") {
      i = braces(i);
      continue;
    }
    const name = src.slice(i).match(/^[\w-]+/)?.[0];
    if (!name) {
      i++;
      continue;
    }
    i += name.length;
    if (src[i] !== "=") {
      out[name] = "true";
      continue;
    }
    i++;
    if (src[i] === '"') {
      const j = src.indexOf('"', i + 1);
      out[name] = src.slice(i + 1, j);
      i = j + 1;
    } else if (src[i] === "{") {
      const j = braces(i);
      out[name] = src.slice(i, j);
      i = j;
    }
  }
  return out;
}

/* A prop value as markdown: strings as-is, JSX flattened, <li> to bullets, <b> to bold. */
function propText(v: string | undefined): string | undefined {
  if (v === undefined) return undefined;
  if (!v.startsWith("{")) return clean(v);
  const inner = v.slice(1, -1).trim();
  const literal = inner.match(/^(["'`])([\s\S]*)\1$/);
  if (literal) return clean(literal[2]);
  if (!inner.startsWith("<")) return undefined; // an expression like {title}: not a literal
  const s = clean(inner)
    .replace(/\{"([^"]*)"\}/g, "$1")
    .replace(/<\/?(b|strong)>/g, "**")
    .replace(/<\/?code[^>]*>/g, "`")
    .replace(/<li[^>]*>/g, "\u0000")
    .replace(/<[^>]+>/g, " ");
  const items = s.split("\u0000").map(clean).filter(Boolean);
  return s.includes("\u0000") ? items.map((t) => `- ${t}`).join("\n") : items.join(" ");
}

/* Every element in a page that has both a title and rules (Demo, and wrappers like Example). */
function demos(src: string) {
  const out: { title: string; rules: string }[] = [];
  for (const m of src.matchAll(/<([A-Z]\w*)\b/g)) {
    const p = props(src, m.index! + m[0].length);
    const title = propText(p.title);
    const rules = propText(p.rules);
    if (title && rules) out.push({ title, rules });
  }
  return out;
}

/* ---------- tokens ---------- */

type Token = { name: string; light: string; dark: string };
type Section = { title: string; note: string; tokens: Token[] };

function parseTokens() {
  const css = read("src/design/tokens.css");
  const start = css.indexOf(":root {");
  const end = css.indexOf("\n}", start);
  const sections: Section[] = [];
  const re = /\/\*([\s\S]*?)\*\/|(--[\w-]+)\s*:\s*([^;]+);/g;
  for (const m of css.slice(start, end).matchAll(re)) {
    if (m[1] !== undefined) {
      const text = clean(m[1]);
      const i = text.search(/:\s|\.\s/);
      sections.push({ title: i < 0 ? text : text.slice(0, i), note: i < 0 ? "" : text.slice(i + 1).trim(), tokens: [] });
      continue;
    }
    if (!sections.length) sections.push({ title: "Other", note: "", tokens: [] });
    const raw = clean(m[3]);
    const ld = raw.match(/^light-dark\((.*)\)$/);
    const [light, dark] = ld ? splitTop(ld[1]) : [raw, raw];
    sections.at(-1)!.tokens.push({ name: m[2], light, dark });
  }

  const byName = new Map(sections.flatMap((s) => s.tokens).map((t) => [t.name, t]));
  const resolveIn = (v: string, theme: "light" | "dark", depth = 0): string => {
    const ref = v.match(/^var\((--[\w-]+)\)$/);
    return ref && byName.has(ref[1]) && depth < 10 ? resolveIn(byName.get(ref[1])![theme], theme, depth + 1) : v;
  };

  /* Overrides: :root blocks inside @media, e.g. bigger controls on touch. */
  const media: Record<string, Record<string, string>> = {};
  for (const m of css.matchAll(/@media \(([^)]+)\)\s*\{\s*:root\s*\{([^}]*)\}/g)) {
    media[m[1]] = Object.fromEntries([...m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((d) => [d[1].slice(2), clean(d[2])]));
  }

  return { intro: header(css), sections, media, rest: css.slice(end + 2).trim(), resolveIn };
}

const tok = parseTokens();

function tokensMd() {
  const show = (v: string, theme: "light" | "dark") => {
    const ref = v.match(/^var\((--[\w-]+)\)$/);
    return ref ? `\`${ref[1]}\` → ${tok.resolveIn(v, theme)}` : v;
  };
  let md = banner(
    "Tokens",
    `Every token in \`src/design/tokens.css\`, the whole language in one file. Colors are \`light-dark(LIGHT, DARK)\`; a reference like \`--fg\` → #000000 shows what it resolves to. Machine-readable values for both themes are in \`tokens.json\`.\n\n${tok.intro}\n`,
  );
  for (const s of tok.sections) {
    const themed = s.tokens.some((t) => tok.resolveIn(t.light, "light") !== tok.resolveIn(t.dark, "dark"));
    md += `\n## ${s.title}\n\n${s.note ? s.note + "\n\n" : ""}`;
    md += themed ? "| Token | Light | Dark |\n| --- | --- | --- |\n" : "| Token | Value |\n| --- | --- |\n";
    for (const t of s.tokens) {
      md += themed
        ? `| \`${t.name}\` | ${cell(show(t.light, "light"))} | ${cell(show(t.dark, "dark"))} |\n`
        : `| \`${t.name}\` | ${cell(show(t.light, "light"))} |\n`;
    }
  }
  md += `\n## Overrides\n\nTheme forcing, touch sizes, and reduced motion:\n\n\`\`\`css\n${tok.rest}\n\`\`\`\n`;
  return md;
}

function tokensJson() {
  const theme = (t: "light" | "dark") =>
    Object.fromEntries(tok.sections.flatMap((s) => s.tokens).map((x) => [x.name.slice(2), tok.resolveIn(x[t], t)]));
  return JSON.stringify({ source: `${repo}/blob/main/src/design/tokens.css`, light: theme("light"), dark: theme("dark"), media: tok.media }, null, 2) + "\n";
}

/* ---------- pages, CSS and components by group ---------- */

const routes = [...read("src/site/routes.ts").matchAll(/\{ path: "([^"]+)", label: "([^"]+)", group: "([^"]+)" \}/g)].map(
  (m) => ({ path: m[1], label: m[2], group: m[3] }),
);

/* Which reference file a page's rules land in: by nav group, unless the page is named here.
   Writing is left out because writing.md is built from writing.ts. */
const refByGroup: Record<string, string> = { Language: "Foundations", Components: "Components", Specialty: "Specialty" };
const refByTitle: Record<string, string | null> = { Writing: null, Terminal: "TUI" };

const pages = readdirSync(join(root, "src/site/pages"))
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => {
    const src = read(`src/site/pages/${f}`);
    const at = src.search(/<Page\b/);
    const p = at < 0 ? {} : props(src, at + 5);
    const title = propText(p.title) ?? "";
    const route = routes.find((r) => r.label === title);
    const group = route && (title in refByTitle ? refByTitle[title] : refByGroup[route.group]);
    return { file: f, title, lede: propText(p.lede), route, group, order: route ? routes.indexOf(route) : 99, demos: demos(src) };
  })
  .filter((p) => p.demos.length)
  .sort((a, b) => a.order - b.order);

for (const p of pages) {
  if (!p.route) warnings.push(`page ${p.file} ("${p.title}") has no route; its rules are left out`);
  else if (p.group === undefined) warnings.push(`page ${p.file} is in nav group "${p.route.group}", which has no reference file`);
}

/* CSS files in import order. tokens.css has its own file; the rest join a group. */
const cssGroup: Record<string, string> = {
  "base.css": "Foundations",
  "layout.css": "Foundations",
  "documents.css": "Specialty",
  "charts.css": "Specialty",
};
const cssFiles = [...read("src/design/index.css").matchAll(/@import "\.\/([\w-]+\.css)"/g)]
  .map((m) => m[1])
  .filter((f) => f !== "tokens.css");

/* React wrappers: each exported function and the comment above it. */
function componentsMd(specialty: boolean) {
  const special = new Set(["Tex", "NodeEditor", "ForceGraph", "LineChart", "Diagram"]);
  let md = "";
  for (const f of readdirSync(join(root, "src/components")).sort()) {
    const name = f.replace(/\.tsx?$/, "");
    if (special.has(name) !== specialty || name === "highlight") continue;
    const src = read(`src/components/${f}`);
    const exports = [...src.matchAll(/export (?:function|const) (\w+)/g)].map((m) => m[1]);
    const docs = [...src.matchAll(/\/\*((?:(?!\*\/)[\s\S])*)\*\/\s*export (?:function|const) (\w+)/g)].map((m) => {
      const [first, ...more] = dedent(m[1]).split("\n");
      const lead = [first, ...more.filter((l) => !/^\s*-/.test(l))].join(" ");
      const list = more.filter((l) => /^\s*-/.test(l)).map((l) => `  ${l.trim()}`);
      return [`- \`${m[2]}\`: ${clean(lead)}`, ...list].join("\n");
    });
    md += `\n### ${f}\n\nExports ${exports.map((e) => `\`${e}\``).join(", ")}.\n\n${docs.join("\n")}\n`;
  }
  return md;
}

function groupMd(group: string, title: string, about: string) {
  let md = banner(title, about);
  const css = cssFiles.filter((f) => (cssGroup[f] ?? "Components") === group);
  if (css.length) {
    md += `\n## Classes\n\nEach file's header, from ${link("src/design/")}. Read the file itself for exact values before porting a component.\n`;
    for (const f of css) md += `\n### ${f}\n\n\`\`\`text\n${header(read(`src/design/${f}`))}\n\`\`\`\n`;
  }
  const ps = pages.filter((p) => p.group === group);
  if (ps.length) {
    md += `\n## Usage rules\n\nFrom the showcase pages (\`#/<page>\` on the dev site). Each rule says when and how to use the piece.\n`;
    for (const p of ps) {
      md += `\n### ${p.title}\n\n${p.lede ? `${p.lede}\n\n` : ""}`;
      for (const d of p.demos) {
        md += d.rules.includes("\n")
          ? `- **${d.title}**:\n${d.rules.replace(/^/gm, "  ")}\n`
          : `- **${d.title}**: ${d.rules}\n`;
      }
    }
  }
  if (group === "Components" || group === "Specialty") {
    md += `\n## React wrappers\n\nOnly where behavior is needed; everything else is plain HTML with classes. In ${link("src/components/")}.\n`;
    md += componentsMd(group === "Specialty");
  }
  return md;
}

/* ---------- screens (templates) ---------- */

function screensMd() {
  const templates = [...read("src/site/routes.ts").matchAll(/\{ path: "(t\/[^"]+)", label: "([^"]+)", about: "([^"]+)" \}/g)];
  const files = Object.fromEntries([...read("src/site/templates/index.ts").matchAll(/"(t\/[\w-]+)": (\w+)/g)].map((m) => [m[1], m[2]]));
  /* Component classes only: ones that start a selector somewhere. Modifiers like .ghost or .sm
     only ever follow another class, so they're left out of the recipe. */
  const systemClasses = new Set(
    cssFiles.flatMap((f) =>
      [...read(`src/design/${f}`).replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/(?:^|[\s,>+~(])\.([a-z][\w-]*)/gm)].map((m) => m[1]),
    ),
  );
  let md = banner(
    "Screens",
    `Full-screen example UIs, each built only from the system. Open one at \`http://localhost:5180/#/<path>\` when the dev server runs, or read its source for the arrangement. \`src/site/templates/templates.css\` holds only layout; every look comes from the system.\n\n"Built from" lists the system components each screen uses, most used first (modifiers like \`.ghost\` or \`.sm\` left out), then the React wrappers it imports.\n`,
  );
  md += "\n| Screen | Path | What it shows | Built from | Source |\n| --- | --- | --- | --- | --- |\n";
  for (const [, path, label, about] of templates) {
    const name = files[path];
    const file = `src/site/templates/${name}.tsx`;
    if (!name || !existsSync(join(root, file))) {
      warnings.push(`template ${path} has no source file`);
      continue;
    }
    const src = read(file);
    const counts = new Map<string, number>();
    for (const m of src.matchAll(/className="([^"]+)"/g))
      for (const c of m[1].split(/\s+/)) if (systemClasses.has(c)) counts.set(c, (counts.get(c) ?? 0) + 1);
    const used = [...counts].sort((a, b) => b[1] - a[1]).map(([c]) => `.${c}`);
    const wrappers = [...src.matchAll(/import \{([^}]+)\} from "\.\.\/\.\.\/components\/\w+"/g)].flatMap((m) =>
      m[1].split(",").map((s) => s.trim()),
    );
    md += `| ${label} | \`#/${path}\` | ${cell(about)} | ${[...used, ...wrappers.map((w) => `<${w}>`)].join(" ")} | ${link(file)} |\n`;
  }
  return md;
}

/* ---------- writing ---------- */

function writingMd() {
  let md = banner(
    "Writing",
    `The house style for every kind of text, from ${link("src/design/writing.ts")}. Lengths are maximums, not targets: shorter is better. \`check(text, element)\` in that file tests length, case, ending punctuation, exclamation marks, filler words and \`...\`; it can't judge wording, so read the rules too.\n`,
  );
  md += "\n## Voice\n\n" + voice.map(([t, b], i) => `${i + 1}. **${t}.** ${b}`).join("\n") + "\n";
  md += "\n## Mechanics\n\n| Topic | Rule | Example |\n| --- | --- | --- |\n";
  md += mechanics.map(([k, r, e]) => `| ${k} | ${cell(r)} | ${e ? cell(e) : ""} |`).join("\n") + "\n";
  md += "\n## Limits\n\n| Element | Where | Max | Case | Ends |\n| --- | --- | --- | --- | --- |\n";
  md += elements.map((e) => `| ${e.name} | ${cell(e.where)} | ${e.max} ${e.unit} | ${e.case} | ${e.ends} |`).join("\n") + "\n";
  md += "\n## Elements\n";
  for (const e of elements) {
    md += `\n### ${e.name}\n\n${e.where}. At most ${e.max} ${e.unit}, ${e.case} case, ends: ${e.ends}.\n\n`;
    md += e.rules.map((r) => `- ${r}`).join("\n") + "\n\n";
    md += e.good.map((g) => `- ✓ ${g}`).join("\n") + "\n";
    if (e.bad.length) md += e.bad.map(([b, why]) => `- ✗ ${b} (${why})`).join("\n") + "\n";
    for (const g of e.good) {
      const issues = check(g, e);
      if (issues.length) warnings.push(`writing: good ${e.id} example "${g}" fails its check: ${issues.join(", ")}`);
    }
  }
  return md;
}

/* ---------- SKILL.md blocks ---------- */

function principlesBlock() {
  const src = read("src/site/pages/Principles.tsx");
  const list = [...src.matchAll(/\[\s*"([^"]+)",\s*"([^"]+)",?\s*\]/g)];
  if (!list.length) warnings.push("no principles found in Principles.tsx");
  return list.map(([, t, b], i) => `${i + 1}. **${t}.** ${b}`).join("\n");
}

function scaleBlock() {
  const lines = tok.sections.map((s) => {
    const vals = s.tokens.map((t) => {
      const l = tok.resolveIn(t.light, "light");
      const d = tok.resolveIn(t.dark, "dark");
      return `${t.name.slice(2)} ${l === d ? l : `${l} / ${d}`}`;
    });
    return `- **${s.title}**: ${vals.join(" · ")}`;
  });
  const media = Object.entries(tok.media).map(
    ([q, v]) => `- **@media (${q})**: ${Object.entries(v).map(([k, x]) => `${k} ${x}`).join(" · ")}`,
  );
  return `Values as light / dark where they differ. Full tables with notes: \`references/tokens.md\`.\n\n${[...lines, ...media].join("\n")}`;
}

function voiceBlock() {
  const v = voice.map(([t, b], i) => `${i + 1}. **${t}.** ${b}`).join("\n");
  const rows = elements.map((e) => `| ${e.name} | ${e.max} ${e.unit} | ${e.case} | ${e.ends} |`).join("\n");
  return `${v}\n\n| Element | Max | Case | Ends |\n| --- | --- | --- | --- |\n${rows}`;
}

/* SKILL.md is rendered from the prose in src/design/skill.md. Placeholders:
     {{principles}} {{scale}} {{voice}}  generated blocks
     {{NAME}}          a token's value (only tokens that are the same in both themes)
     {{touch.NAME}}    the value under @media (pointer: coarse)
     {{sans}} {{mono}} the first family in --font-ui / --font-mono
     {{series}}        the palette names behind --series-1..N, in order
     {{mono-package}}  the @fontsource package in package.json
     {{screens}}       how many templates there are
     {{repo}}          the repo's GitHub URL
     {{repo:PATH}}     a link to PATH in the repo (end folders with /)
   An unknown placeholder, or a themed token, stops the build. */
function renderSkill() {
  const all = tok.sections.flatMap((s) => s.tokens);
  const family = (name: string) =>
    splitTop(all.find((t) => t.name === name)!.light)[0].replace(/["']/g, "").replace(/ Variable$/, "");
  const deps = Object.keys(JSON.parse(read("package.json")).dependencies ?? {});
  const values: Record<string, string> = {
    principles: principlesBlock(),
    scale: scaleBlock(),
    voice: voiceBlock(),
    sans: family("--font-ui"),
    mono: family("--font-mono"),
    series: all
      .filter((t) => /^--series-\d+$/.test(t.name))
      .map((t) => t.light.match(/var\(--c-([\w-]+)\)/)?.[1] ?? t.name.slice(2))
      .join(", "),
    "mono-package": deps.find((d) => d.startsWith("@fontsource")) ?? "",
    screens: String([...read("src/site/routes.ts").matchAll(/path: "t\//g)].length),
    repo,
  };
  const source = read("src/design/skill.md");
  const body = source.replace(/\{\{([\w.-]+(?::[\w./-]+)?)\}\}/g, (m, key: string) => {
    if (key in values) return values[key];
    if (key.startsWith("repo:")) {
      if (!existsSync(join(root, key.slice(5)))) throw new Error(`src/design/skill.md: ${m} names a missing path`);
      return link(key.slice(5));
    }
    if (key.startsWith("touch.")) {
      const v = tok.media["pointer: coarse"]?.[key.slice(6)];
      if (v) return v;
    }
    const t = all.find((x) => x.name === `--${key}`);
    if (t) {
      const l = tok.resolveIn(t.light, "light");
      if (l !== tok.resolveIn(t.dark, "dark")) throw new Error(`src/design/skill.md: ${m} differs by theme; name the value in prose instead`);
      return l;
    }
    throw new Error(`src/design/skill.md: unknown placeholder ${m}`);
  });
  const end = body.indexOf("\n---\n", 4) + 5;
  return `${body.slice(0, end)}\n<!-- Generated from ${repo}/blob/main/src/design/skill.md by \`npm run skill\`. Edit that file, not this one. -->\n${body.slice(end)}`;
}

/* ---------- write ---------- */

write("skill/references/tokens.md", tokensMd());
write("skill/references/tokens.json", tokensJson());
write(
  "skill/references/foundations.md",
  groupMd("Foundations", "Foundations", "Element defaults, inline text and layout, plus the usage rules for color, type, space and shape."),
);
write(
  "skill/references/components.md",
  groupMd("Components", "Components", "Every component class and the rules for using it, in four families: controls, navigation, content, and overlays (including floating chrome)."),
);
write(
  "skill/references/specialty.md",
  groupMd("Specialty", "Specialty", "Documents (prose, code, figures, math, papers) and charts and graphs (line, scatter and small charts, note graphs, node editors, Mermaid diagrams)."),
);
write(
  "skill/references/tui.md",
  groupMd("TUI", "TUI", "The language in a terminal: how each role maps to cells and attributes, the glyph set, the components rebuilt in cells, and full-terminal layouts and keys."),
);
write("skill/references/screens.md", screensMd());
write("skill/references/writing.md", writingMd());
write("skill/SKILL.md", renderSkill());

for (const w of warnings) console.warn(`skill: ${w}`);
if (!quiet) console.log(changed.length ? `skill: updated ${changed.join(", ")}` : "skill: up to date");
