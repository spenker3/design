import { useState } from "react";
import { marked, type Token } from "marked";
import { Tabs } from "../../components/Choice";
import { CodeBlock } from "../../components/CodeBlock";
import { Page } from "../Demo";

/* The generated skill as it is on disk. Vite reloads it whenever the generator rewrites a file. */
const raw = import.meta.glob("../../../skill/**/*", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const files = Object.entries(raw)
  .map(([k, text]) => ({ path: k.replace("../../../skill/", ""), text }))
  .sort((a, b) => (a.path === "SKILL.md" ? -1 : b.path === "SKILL.md" ? 1 : a.path.localeCompare(b.path)));

function Markdown({ text }: { text: string }) {
  const front = text.match(/^---\n([\s\S]*?)\n---\n/);
  const tokens = marked.lexer(front ? text.slice(front[0].length) : text);
  const html = (t: Token) => marked.parser(Object.assign([t], { links: tokens.links }));
  return (
    <div className="prose skill-doc">
      {front && (
        <dl className="dl card plain skill-block">
          {front[1].split("\n").map((line) => {
            const [key, ...rest] = line.split(": ");
            return [<dt key={key}>{key}</dt>, <dd key={`${key}-v`}>{rest.join(": ")}</dd>];
          })}
        </dl>
      )}
      {tokens.map((t, i) =>
        t.type === "code" ? (
          <CodeBlock key={i} code={t.text} lang={t.lang} />
        ) : t.type === "space" ? null : (
          <div key={i} className={t.type === "table" ? "skill-table" : "skill-block"} dangerouslySetInnerHTML={{ __html: html(t) }} />
        ),
      )}
    </div>
  );
}

export function Skill() {
  const [path, setPath] = useState(files[0]?.path ?? "");
  const file = files.find((f) => f.path === path) ?? files[0];
  return (
    <Page title="Skill" lede="The generated files in skill/, as Claude reads them. They update as the generator rewrites them.">
      <Tabs variant="lined" value={file.path} onChange={setPath} options={files.map((f) => ({ value: f.path, label: f.path.replace("references/", "") }))} />
      {file.path.endsWith(".md") ? <Markdown text={file.text} /> : <CodeBlock code={file.text} lang="json" file={file.path} lines />}
    </Page>
  );
}
