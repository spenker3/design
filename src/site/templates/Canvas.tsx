import { useEffect, useState } from "react";
import {
  ChevronDown,
  Circle,
  Frame,
  Hand,
  Layers,
  MessageSquare,
  Minus,
  MousePointer2,
  PenTool,
  Plus,
  Square,
  Type,
} from "lucide-react";

const tools = [
  { id: "select", icon: MousePointer2, key: "v", label: "Select" },
  { id: "hand", icon: Hand, key: "h", label: "Hand" },
  { id: "frame", icon: Frame, key: "f", label: "Frame" },
  { id: "rect", icon: Square, key: "r", label: "Rectangle" },
  { id: "ellipse", icon: Circle, key: "o", label: "Ellipse" },
  { id: "pen", icon: PenTool, key: "p", label: "Pen" },
  { id: "text", icon: Type, key: "t", label: "Text" },
  { id: "comment", icon: MessageSquare, key: "c", label: "Comment" },
];

const fills = ["--fg", "--c-blue", "--c-orange", "--c-green", "--c-violet", "--surface-3"];
const pages = ["Cover", "Flows", "Components", "Archive", "Scratch"];

export function Canvas() {
  const [tool, setTool] = useState("select");
  const [fill, setFill] = useState("--c-blue");
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [layer, setLayer] = useState("Card");

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea")) return;
      const t = tools.find((x) => x.key === e.key);
      if (t) setTool(t.id);
    };
    addEventListener("keydown", on);
    return () => removeEventListener("keydown", on);
  }, []);

  return (
    <div className="tpl-canvas canvas">
      <header className="canvas-top">
        <div className="toolbar">
          <a className="wordmark" href="#/" style={{ padding: "0 8px", fontSize: 15 }}>
            frame
          </a>
          <hr />
          <button className="btn ghost sm">
            Onboarding v3 <ChevronDown />
          </button>
        </div>
        <div className="row" style={{ "--gap": "8px" } as React.CSSProperties}>
          <div className="avatars">
            <span className="avatar sm">al</span>
            <span className="avatar sm">gh</span>
          </div>
          <button className="btn primary sm">Share</button>
          <span className="avatar">mc</span>
        </div>
      </header>

      <div className="toolbar vertical canvas-rail" role="toolbar" aria-label="Tools">
        {tools.map((t, i) => (
          <span key={t.id} style={{ display: "contents" }}>
            {i === 2 || i === 7 ? <hr /> : null}
            <button
              className="btn ghost icon"
              aria-label={t.label}
              aria-pressed={tool === t.id}
              data-tip={`${t.label}  ${t.key.toUpperCase()}`}
              onClick={() => setTool(t.id)}
            >
              <t.icon />
            </button>
          </span>
        ))}
      </div>

      <div className="canvas-stage" data-tool={tool}>
        <div className="canvas-frame-label">Signup / Card</div>
        <div className="canvas-frame">
          <div className="shape" style={{ background: `var(${fill})` }}>
            <span className="handle tl" />
            <span className="handle tr" />
            <span className="handle bl" />
            <span className="handle br" />
            <span className="size-tag">320 × 160</span>
          </div>
          <div className="shape-line" />
          <div className="shape-line short" />
        </div>
        <div className="crosshair" />
        <div className="annotation">
          <span className="avatar sm">al</span>
          <span>Can the card be 8px narrower?</span>
        </div>
      </div>

      <aside className="panel canvas-panel">
        <div className="panel-section">
          <div className="row between">
            <h4>Card</h4>
            <span className="badge">Frame</span>
          </div>
          <div className="panel-row">
            <label className="mini-field">
              <span>X</span>
              <input defaultValue="120" />
            </label>
            <label className="mini-field">
              <span>Y</span>
              <input defaultValue="96" />
            </label>
            <label className="mini-field">
              <span>W</span>
              <input defaultValue="320" />
            </label>
            <label className="mini-field">
              <span>H</span>
              <input defaultValue="160" />
            </label>
          </div>
        </div>
        <div className="panel-section">
          <h4>Fill</h4>
          <div className="swatches-pick">
            {fills.map((f) => (
              <button
                key={f}
                aria-label={f}
                aria-pressed={fill === f}
                style={{ "--c": `var(${f})` } as React.CSSProperties}
                onClick={() => setFill(f)}
              />
            ))}
          </div>
          <div className="row">
            <span className="faint" style={{ fontSize: "var(--text-xs)", width: 48 }}>
              Opacity
            </span>
            <input type="range" className="range" defaultValue={100} style={{ "--fill": "100%" } as React.CSSProperties} />
          </div>
        </div>
        <div className="panel-section">
          <div className="row between">
            <h4>Layers</h4>
            <Layers size={14} className="faint" />
          </div>
          <div className="nav">
            {["Card", "Title", "Body", "Button", "Background"].map((l) => (
              <button key={l} aria-current={layer === l ? "page" : undefined} onClick={() => setLayer(l)}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="canvas-dock">
        <div className="dock">
          {pages.map((p, i) => (
            <button key={p} className="dock-page" aria-pressed={page === i} onClick={() => setPage(i)} data-tip={p}>
              {i + 1}
            </button>
          ))}
          <hr className="dock-sep" />
          <button className="btn ghost icon sm" aria-label="Zoom out" onClick={() => setZoom(Math.max(25, zoom - 25))}>
            <Minus />
          </button>
          <span className="num" style={{ width: 44, textAlign: "center", fontSize: 12 }}>
            {zoom}%
          </span>
          <button className="btn ghost icon sm" aria-label="Zoom in" onClick={() => setZoom(Math.min(400, zoom + 25))}>
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}
