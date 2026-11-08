import { useState } from "react";
import { Check, X } from "lucide-react";
import { Page, Demo } from "../Demo";
import { CodeBlock } from "../../components/CodeBlock";
import { check, elements, measure, mechanics, voice, type TextElement } from "../../design/writing";

function Example({ text, el, why }: { text: string; el: TextElement; why?: string }) {
  const good = why === undefined;
  const issues = check(text, el);
  const n = measure(text, el.unit);
  return (
    <li className={good ? "ex good" : "ex bad"}>
      {good ? <Check size={14} /> : <X size={14} />}
      <span className="grow">{text}</span>
      <span className={n > el.max ? "ex-n over" : "ex-n"}>
        {n}/{el.max}
      </span>
      {!good && <span className="ex-issues">{why}</span>}
      {good && issues.length > 0 && <span className="ex-issues warn">fails its own check: {issues.join(", ")}</span>}
    </li>
  );
}

function Checker() {
  const [id, setId] = useState("button");
  const [text, setText] = useState("Click here to save your changes!");
  const el = elements.find((e) => e.id === id)!;
  const n = measure(text, el.unit);
  const issues = text.trim() ? check(text, el) : [];
  const pct = Math.min(100, (n / el.max) * 100);
  return (
    <div className="stack">
      <div className="grid" style={{ "--min": "220px" } as React.CSSProperties}>
        <div className="field">
          <label htmlFor="w-el">Element</label>
          <select id="w-el" className="input" value={id} onChange={(e) => setId(e.target.value)}>
            {elements.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="w-text">Text</label>
          <input id="w-text" className="input" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
      <div className="stack" style={{ "--gap": "8px" } as React.CSSProperties}>
        <div className="row between">
          <span className="mono num" style={{ fontSize: 12 }}>
            {n} / {el.max} {el.unit}
          </span>
          <span className="muted" style={{ fontSize: "var(--text-sm)" }}>
            {el.case} case · ends: {el.ends}
          </span>
        </div>
        <div
          className={n > el.max ? "progress bad" : issues.length ? "progress warn" : "progress good"}
          style={{ "--value": `${pct}%` } as React.CSSProperties}
        />
        {text.trim() &&
          (issues.length ? (
            <div className="callout warn">
              <X />
              <div>
                <strong>{issues.length === 1 ? "1 problem" : `${issues.length} problems`}</strong>
                {issues.join(", ")}
              </div>
            </div>
          ) : (
            <div className="callout good">
              <Check />
              <div>
                <strong>Fits the {el.name.toLowerCase()} style</strong>Read it against the rules too: the checks can't judge wording.
              </div>
            </div>
          ))}
        <ul className="w-rules">
          {el.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Writing() {
  return (
    <Page
      title="Writing"
      lede="Every kind of text has a length limit and a style, kept in src/design/writing.ts."
    >
      <Demo title="Voice" bare>
        <ol className="principles">
          {voice.map(([t, b], i) => (
            <li key={t}>
              <span className="mono faint">{String(i + 1).padStart(2, "0")}</span>
              <div className="stack" style={{ "--gap": "4px" } as React.CSSProperties}>
                <h3>{t}</h3>
                <p className="muted">{b}</p>
              </div>
            </li>
          ))}
        </ol>
      </Demo>

      <Demo
        title="Text elements"
        rules="Lengths are maximums, and shorter is better."
        bare
      >
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Element</th>
                <th>Where</th>
                <th className="n">Max</th>
                <th>Case</th>
                <th>Ends</th>
              </tr>
            </thead>
            <tbody>
              {elements.map((e) => (
                <tr key={e.id}>
                  <td>
                    <a href={`#/writing`} onClick={(ev) => {
                      ev.preventDefault();
                      document.getElementById(`w-${e.id}`)?.scrollIntoView({ block: "start" });
                    }}>
                      {e.name}
                    </a>
                  </td>
                  <td className="muted">{e.where}</td>
                  <td className="n">
                    {e.max} <span className="muted">{e.unit}</span>
                  </td>
                  <td>{e.case}</td>
                  <td className="muted">{e.ends}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Demo>

      <Demo title="Check a string" rules="Checks length, case, ending punctuation, exclamation marks and filler words.">
        <Checker />
      </Demo>

      <Demo title="Examples" rules="A good example that fails its own check shows a warning." bare>
        <div className="w-elements">
          {elements.map((e) => (
            <section className="w-element" id={`w-${e.id}`} key={e.id}>
              <div className="w-spec">
                <h3>{e.name}</h3>
                <div className="muted" style={{ fontSize: "var(--text-sm)" }}>
                  {e.where}
                </div>
                <div className="row wrap" style={{ "--gap": "4px" } as React.CSSProperties}>
                  <span className="badge">
                    ≤ {e.max} {e.unit}
                  </span>
                  <span className="badge">{e.case}</span>
                </div>
                <ul className="w-rules">
                  {e.rules.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              <ul className="w-examples">
                {e.good.map((t) => (
                  <Example key={t} text={t} el={e} />
                ))}
                {e.bad.map(([t, why]) => (
                  <Example key={t} text={t} el={e} why={why} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Demo>

      <Demo title="Mechanics" rules="Decided once, so text reads the same everywhere." bare>
        <div className="table-wrap">
          <table className="table">
            <tbody>
              {mechanics.map(([k, rule, ex]) => (
                <tr key={k}>
                  <td style={{ fontWeight: 600, width: 1 }}>{k}</td>
                  <td style={{ whiteSpace: "normal" }}>{rule}</td>
                  <td className="mono muted" style={{ fontSize: 12 }}>
                    {ex}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Demo>

      <Demo title="Typography in use" rules="Long text always sits in .prose.">
        <div className="prose">
          <p className="eyebrow">Guide · 4 min read</p>
          <h2 style={{ marginTop: 0 }}>Writing for the inverted block</h2>
          <p className="lede">
            A short guide to text in a monochrome interface. It covers voice, length, and the marks that hold it together.
          </p>
          <p>
            Interface text is read in passing. Most people see a <strong>button label</strong> for well under a second, so
            the verb has to come first. Read the <a href="#/writing">text element limits</a> before writing a new screen,
            and keep the <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> contrast rule in mind.
            <sup>
              <a href="#fn1">1</a>
            </sup>
          </p>
          <p>
            Mark what changed with <ins>an insertion</ins> and <del>a deletion</del>, highlight a phrase with{" "}
            <mark>a marker</mark>, and use <code>inline code</code> for anything a machine reads. Press <kbd>Ctrl</kbd>{" "}
            <kbd>K</kbd> to search. Chemistry needs H<sub>2</sub>O; footnotes need x<sup>2</sup>.{" "}
            <small>Small text is for fine print only.</small>
          </p>
          <h3>Lists</h3>
          <ul>
            <li>Fragments without periods</li>
            <li>
              One idea per item
              <ul>
                <li>Nested items stay rare</li>
              </ul>
            </li>
          </ul>
          <ol>
            <li>Steps are numbered.</li>
            <li>Each step is a full sentence, so each one ends with a period.</li>
          </ol>
          <ul className="tasks">
            <li>
              <input type="checkbox" className="check" defaultChecked aria-label="Done" /> Write the button label first
            </li>
            <li>
              <input type="checkbox" className="check" aria-label="Done" /> Cut the help text to one sentence
            </li>
          </ul>
          <h3>Quotes</h3>
          <blockquote>
            Inverted blocks are loud, so there can only be one or two per region.
            <cite>— The inverted block</cite>
          </blockquote>
          <p className="pullquote">Color is free to mean something.</p>
          <p>
            Short quotes stay inline: the toast said <q>Deleted 3 files</q> and offered Undo.
          </p>
          <h3>Figures and tables</h3>
          <figure>
            <div className="media" style={{ "--ratio": "16/7" } as React.CSSProperties}>
              <span className="media-label">figure</span>
            </div>
            <figcaption>The workspace bar: five cells, one inverted.</figcaption>
          </figure>
          <table>
            <caption>Lengths for the three most common elements.</caption>
            <thead>
              <tr>
                <th>Element</th>
                <th>Max</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Button</td>
                <td>24 chars</td>
              </tr>
              <tr>
                <td>Toast</td>
                <td>48 chars</td>
              </tr>
              <tr>
                <td>Help text</td>
                <td>80 chars</td>
              </tr>
            </tbody>
          </table>
          <h3>Definitions</h3>
          <dl className="dl">
            <dt>Lede</dt>
            <dd>The one or two sentences under a title.</dd>
            <dt>Meta line</dt>
            <dd>Fragments joined by middle dots.</dd>
          </dl>
          <h3>Code</h3>
          <CodeBlock
            file="writing.ts"
            lang="ts"
            code={`export function check(text: string, el: TextElement) {
  const n = measure(text, el.unit);
  return n > el.max ? [\`\${n} \${el.unit}, over \${el.max}\`] : [];
}`}
          />
          <div className="accordion">
            <details>
              <summary>Why sentence case?</summary>
              <p>It reads faster, and it never makes you decide whether “to” gets a capital.</p>
            </details>
          </div>
          <div className="footnotes">
            <ol>
              <li id="fn1">Body text needs a contrast ratio of at least 4.5:1, and large text 3:1.</li>
            </ol>
          </div>
        </div>
      </Demo>
    </Page>
  );
}
