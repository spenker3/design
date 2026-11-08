import { useState } from "react";
import { Box, Image, Palette, Sigma, SlidersHorizontal } from "lucide-react";
import { Page, Demo } from "../Demo";
import { LineChart, useWidth } from "../../components/LineChart";
import { ForceGraph } from "../../components/ForceGraph";
import { NodeEditor, type EditorNode, type Wire } from "../../components/NodeEditor";
import { Diagram } from "../../components/Diagram";
import { CodeBlock } from "../../components/CodeBlock";
import { Tabs } from "../../components/Choice";
import { vaultGroups, vaultLinks, vaultNodes } from "./vault";

const gap = (v: string) => ({ "--gap": v }) as React.CSSProperties;
const swatch = (c: string) => ({ "--c": c }) as React.CSSProperties;

/* ---------- charts ---------- */

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const visits = [1200, 1350, 1280, 1620, 1810, 1750, 2100, 2380, 2290, 2650, 2900, 3120];
const regions = [
  { name: "Europe", values: [40, 44, 47, 52, 55, 61, 64, 70, 72, 78, 83, 90], color: "var(--series-1)" },
  { name: "Americas", values: [32, 35, 33, 38, 42, 41, 47, 50, 55, 54, 60, 63], color: "var(--series-2)" },
  { name: "Asia", values: [12, 15, 19, 22, 28, 31, 36, 38, 45, 49, 52, 58], color: "var(--series-3)" },
];

/* Deterministic noise so the demo doesn't change on reload. */
const rand = (i: number) => (Math.sin(i * 12.9898) * 43758.5453) % 1;
const points = Array.from({ length: 48 }, (_, i) => {
  const x = Math.abs(rand(i)) * 100;
  return { x, y: Math.max(2, x * 0.7 + 10 + rand(i + 99) * 18), group: i % 3 === 0 ? 1 : 0 };
});
const days = Array.from({ length: 7 * 26 }, (_, i) => Math.max(0, Math.min(1, 0.45 + rand(i + 7) * 0.6)));

function Spark({ values, color }: { values: number[]; color?: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${30 - ((v - min) / (max - min || 1)) * 30}`).join(" ");
  return (
    <svg className="spark" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden style={swatch(color ?? "")}>
      <polyline points={pts} />
    </svg>
  );
}

function Scatter() {
  const [box, width] = useWidth<HTMLDivElement>();
  const h = 220;
  const px = (v: number) => 36 + (v / 100) * (width - 44);
  const py = (v: number) => h - 20 - (v / 100) * (h - 28);
  return (
    <div className="chart" ref={box}>
      <svg height={h} role="img" aria-label="Time on site against pages viewed">
        {[0, 25, 50, 75, 100].map((t) => (
          <g key={t}>
            <line className={t ? "chart-grid" : "chart-base"} x1={36} x2={width} y1={py(t)} y2={py(t)} />
            <text className="chart-axis" x={28} y={py(t)} textAnchor="end" dominantBaseline="central">
              {t}
            </text>
          </g>
        ))}
        {points.map((p, i) => (
          <circle
            key={i}
            className="chart-dot"
            cx={px(p.x)}
            cy={py(p.y)}
            r={4}
            style={(p.group ? swatch("var(--series-1)") : { opacity: 0.4 }) as React.CSSProperties}
          >
            <title>{`${p.x.toFixed(0)} pages, ${p.y.toFixed(0)} min`}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
}

/* ---------- node editor ---------- */

const types = { image: "var(--c-yellow)", color: "var(--c-violet)", number: "var(--muted)", shader: "var(--c-green)" };

const editorNodes: EditorNode[] = [
  {
    id: "tex",
    title: "Image",
    icon: <Image />,
    x: 24,
    y: 40,
    ports: [
      { id: "color", label: "Color", dir: "out", type: "color" },
      { id: "alpha", label: "Alpha", dir: "out", type: "number" },
    ],
  },
  {
    id: "mix",
    title: "Mix",
    icon: <SlidersHorizontal />,
    x: 270,
    y: 24,
    ports: [
      { id: "out", label: "Result", dir: "out", type: "color" },
      { id: "fac", label: "Factor", dir: "in", type: "number", value: "0.50" },
      { id: "a", label: "A", dir: "in", type: "color" },
      { id: "b", label: "B", dir: "in", type: "color" },
    ],
  },
  {
    id: "rgb",
    title: "Color",
    icon: <Palette />,
    x: 24,
    y: 200,
    ports: [{ id: "out", label: "Color", dir: "out", type: "color" }],
  },
  {
    id: "math",
    title: "Multiply",
    icon: <Sigma />,
    x: 270,
    y: 200,
    ports: [
      { id: "out", label: "Value", dir: "out", type: "number" },
      { id: "a", label: "Value", dir: "in", type: "number" },
      { id: "b", label: "By", dir: "in", type: "number", value: "2.00" },
    ],
  },
  {
    id: "out",
    title: "Material",
    icon: <Box />,
    x: 520,
    y: 90,
    ports: [
      { id: "surface", label: "Surface", dir: "out", type: "shader" },
      { id: "base", label: "Base color", dir: "in", type: "color" },
      { id: "rough", label: "Roughness", dir: "in", type: "number" },
    ],
  },
];

const editorWires: Wire[] = [
  { from: "tex.color", to: "mix.a" },
  { from: "rgb.out", to: "mix.b" },
  { from: "tex.alpha", to: "math.a" },
  { from: "mix.out", to: "out.base" },
  { from: "math.out", to: "out.rough" },
];

/* ---------- diagrams (Mermaid source) ---------- */

const diagrams = {
  flowchart: `flowchart LR
  A[Upload] --> B{Valid?}
  B -- yes --> C[Resize]
  B -- no --> E[Reject]
  C --> D[(Store)]
  subgraph Worker
    C
    D
  end
  D --> F([Notify])`,
  sequence: `sequenceDiagram
  participant U as User
  participant A as App
  participant S as Server
  U->>A: Sign in
  A->>S: POST /session
  S-->>A: 200 token
  Note over A,S: Token kept in memory
  A-->>U: Show inbox`,
  state: `stateDiagram-v2
  [*] --> Draft
  Draft --> Review: submit
  Review --> Draft: changes
  Review --> Approved: approve
  Approved --> Merged: merge
  Merged --> [*]`,
  er: `erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ ITEM : contains
  CUSTOMER {
    int id PK
    string name
  }
  ORDER {
    int id PK
    int customer_id FK
    float total
  }`,
  gantt: `gantt
  title Launch
  dateFormat YYYY-MM-DD
  section Build
  Tokens        :done,    t1, 2026-10-01, 7d
  Components    :active,  c1, after t1, 10d
  section Ship
  Beta          :crit,    s1, after c1, 5d`,
};

type Kind = keyof typeof diagrams;

function Diagrams() {
  const [kind, setKind] = useState<Kind>("flowchart");
  return (
    <>
      <Tabs
        variant="lined"
        value={kind}
        onChange={setKind}
        options={(Object.keys(diagrams) as Kind[]).map((k) => ({ value: k, label: k === "er" ? "ER" : k[0].toUpperCase() + k.slice(1) }))}
      />
      <div className="demo-stage">
        <Diagram code={diagrams[kind]} label={kind} />
      </div>
      <details className="accordion">
        <summary>Source</summary>
        <CodeBlock code={diagrams[kind]} lang="mermaid" />
      </details>
    </>
  );
}

export function Charts() {
  return (
    <Page
      title="Charts & graphs"
      lede="Data drawn as marks, and things drawn as nodes and links. Thin marks, quiet axes, and color only to tell series or groups apart."
    >
      <Demo
        title="Lines"
        rules={
          <ul>
            <li>One series is fg with no legend, since the title names it. 2px line, mono axis labels in faint, gridlines in line. Hover shows a crosshair and the value. The points carry no numbers.</li>
            <li>Two to four series use --series-1 to 4 in order, which stay distinct under color blindness, with a legend above and a label at each line's end so identity never rests on color alone.</li>
            <li>A fifth series folds into Other, or the chart splits into small multiples. Never a second y-axis.</li>
          </ul>
        }
      >
        <LineChart label="Visits per month" series={[{ name: "Visits", values: visits }]} labels={months} area format={(v) => (v >= 1000 ? `${v / 1000}k` : String(v))} />
        <LineChart label="Revenue by region" series={regions} labels={months} format={(v) => `$${v}k`} />
      </Demo>
      <Demo
        title="Scatter"
        rules="8px dots with a 2px bg ring so overlaps stay readable. A highlighted group uses a series color, and the rest stay fg at reduced opacity."
      >
        <div className="stack" style={gap("var(--space-3)")}>
          <div className="legend">
            <span style={swatch("var(--series-1)")}>Returning</span>
            <span style={swatch("color-mix(in srgb, var(--fg) 40%, transparent)")}>New</span>
          </div>
          <Scatter />
        </div>
      </Demo>
      <Demo
        title="Small charts"
        rules={
          <ul>
            <li>A sparkline is a trend without axes, inline at text height next to the number it explains. fg by default, colored only when the trend itself is a status.</li>
            <li>A heatmap is one hue, fg mixed into the surface by value. Never a rainbow. A scale shows what the ends mean, and hover names the cell's value.</li>
            <li>Simple bars are one series in fg with 2px gaps and a flat baseline. Hover shows the value.</li>
          </ul>
        }
      >
        <div className="row wrap" style={gap("var(--space-7)")}>
          <span className="row" style={gap("var(--space-3)")}>
            <span className="mono">3,120</span>
            <Spark values={visits} />
          </span>
          <span className="row" style={gap("var(--space-3)")}>
            <span className="mono">99.2%</span>
            <Spark values={[99.9, 99.8, 99.9, 99.7, 99.1, 98.6, 99.2]} color="var(--bad)" />
          </span>
        </div>
        <div className="stack" style={gap("var(--space-3)")}>
          <div className="heat" style={{ "--cols": 26 } as React.CSSProperties}>
            {days.map((v, i) => (
              <span key={i} style={{ "--v": v } as React.CSSProperties} title={`${Math.round(v * 40)} commits`} />
            ))}
          </div>
          <div className="heat-scale">
            0 <i /> 40
          </div>
        </div>
      </Demo>
      <Demo
        title="Note graph"
        rules="Obsidian-style: a force layout where dots grow with their link count and unlinked notes are faint. Gray by default, colored only for a group the reader chose (folder, tag). Hover lights a note's neighborhood and dims the rest. The selected label inverts. Hubs are always labeled, and other labels appear on hover or once zoomed in."
        bare
      >
        <ForceGraph label="Notes and the links between them" nodes={vaultNodes} links={vaultLinks} groups={vaultGroups} />
        <div className="legend">
          <span style={swatch("var(--series-1)")}>Design</span>
          <span style={swatch("var(--series-2)")}>Code</span>
          <span style={swatch("var(--series-3)")}>Reading</span>
          <span style={swatch("var(--muted)")}>Other</span>
        </div>
      </Demo>
      <Demo
        title="Node editor"
        rules="Cards on a dotted canvas, dragged by the header. Nodes are drawn like controls, and a selected node's header inverts. Ports are rows: inputs on the left edge, outputs on the right, a filled dot when linked. Port and wire color is the data type, kept consistent across the editor."
        bare
      >
        <NodeEditor label="Material nodes" nodes={editorNodes} wires={editorWires} types={types} />
        <div className="legend">
          {Object.entries(types).map(([t, c]) => (
            <span key={t} style={swatch(c)}>
              {t}
            </span>
          ))}
        </div>
      </Demo>
      <Demo
        title="Diagrams"
        rules={
          <ul>
            <li>Write diagrams in Mermaid syntax, rendered by Pele. Its --pele-* colors map onto the tokens, so diagrams follow the theme. Never set colors with style or classDef.</li>
            <li>Nodes look like controls: bg fill, 1px fg border, 4px radius. Edges are muted and labels mono. Subgraphs get a quiet line and a surface fill.</li>
            <li>Flow left to right, loops below. Color only marks an outcome, and a dead end is dashed. Trees go top down; networks use round nodes.</li>
            <li>Sequences run top to bottom, replies dashed, notes on a surface. State transitions are labeled with their action, lowercase.</li>
            <li>Class and ER members are mono so types line up. Label each relation with a verb.</li>
            <li>Gantt: done work recedes, the active task is fg, critical work is --bad. Git graphs and mind maps take the series colors in order.</li>
          </ul>
        }
        bare
      >
        <Diagrams />
      </Demo>
    </Page>
  );
}
