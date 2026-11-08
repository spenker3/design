import { useEffect, useRef, useState, type ReactNode } from "react";

export type Port = { id: string; label: string; dir: "in" | "out"; type?: string; value?: string };
export type EditorNode = { id: string; title: string; icon?: ReactNode; x: number; y: number; ports: Port[] };
/* from/to are "nodeId.portId" */
export type Wire = { from: string; to: string };

/* Style for a pannable .canvas: the dot grid moves and scales with the content, so dots and nodes
   pan as one surface. (x, y) is where the content's origin sits on screen and k is the zoom.
   Zoomed out, the grid doubles its spacing rather than packing dots closer than 12px. */
export function canvasGrid(x: number, y: number, k: number) {
  let grid = 16 * k;
  while (grid < 12) grid *= 2;
  return { backgroundSize: `${grid}px ${grid}px`, backgroundPosition: `${x}px ${y}px` };
}

const W = 180;
const HEAD = 28;
const PAD = 6;
const ROW = 24;

/* Node editor: drag a node by its header, click to select. Drag the background to pan, scroll to
   zoom. Ports are rows, with an in port on the left edge, an out port on the right. `types` maps a
   port type to its color (wires take it too). */
export function NodeEditor({
  nodes: initial,
  wires,
  types = {},
  label,
}: {
  nodes: EditorNode[];
  wires: Wire[];
  types?: Record<string, string>;
  label: string;
}) {
  const [nodes, setNodes] = useState(initial);
  const [selected, setSelected] = useState<string>();
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const drag = useRef<{ id?: string; x: number; y: number }>(null);
  const box = useRef<HTMLDivElement>(null);

  /* Wheel zoom needs a non-passive listener to stop the page from scrolling. Zooms around the cursor. */
  useEffect(() => {
    const el = box.current!;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      setView((v) => {
        const k = Math.min(2, Math.max(0.4, v.k * Math.exp(-e.deltaY * 0.0015)));
        return { k, x: px - ((px - v.x) * k) / v.k, y: py - ((py - v.y) * k) / v.k };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const linked = new Set(wires.flatMap((w) => [w.from, w.to]));

  function anchor(ref: string) {
    const [nid, pid] = ref.split(".");
    const n = byId[nid];
    const i = n.ports.findIndex((p) => p.id === pid);
    const p = n.ports[i];
    return { x: p.dir === "out" ? n.x + W : n.x, y: n.y + HEAD + PAD + i * ROW + ROW / 2, type: p.type };
  }

  /* Without an id the drag pans the view; with one it moves that node. */
  function down(e: React.PointerEvent, id?: string) {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id, x: e.clientX, y: e.clientY };
    if (id) setSelected(id);
  }

  function move(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    d.x = e.clientX;
    d.y = e.clientY;
    if (d.id) setNodes((ns) => ns.map((n) => (n.id === d.id ? { ...n, x: n.x + dx / view.k, y: n.y + dy / view.k } : n)));
    else setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
  }

  return (
    <div
      className="nodes canvas"
      ref={box}
      role="group"
      aria-label={label}
      style={canvasGrid(view.x, view.y, view.k)}
      onPointerDown={(e) => down(e)}
      onPointerMove={move}
      onPointerUp={() => (drag.current = null)}
    >
      <div className="nodes-view" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})` }}>
        <svg className="wires" aria-hidden>
          {wires.map((w) => {
            const a = anchor(w.from);
            const b = anchor(w.to);
            const dx = Math.max(40, Math.abs(b.x - a.x) / 2);
            const c = a.type ? types[a.type] : undefined;
            return (
              <path
                key={w.from + w.to}
                className="wire"
                style={c ? ({ "--c": c } as React.CSSProperties) : undefined}
                d={`M${a.x} ${a.y} C${a.x + dx} ${a.y} ${b.x - dx} ${b.y} ${b.x} ${b.y}`}
              />
            );
          })}
        </svg>
        {nodes.map((n) => (
          <div
            key={n.id}
            className="node"
            aria-selected={selected === n.id}
            style={{ transform: `translate(${n.x}px, ${n.y}px)` }}
            onPointerDown={(e) => {
              e.stopPropagation();
              setSelected(n.id);
            }}
          >
            <div className="node-head" onPointerDown={(e) => down(e, n.id)}>
              {n.icon}
              {n.title}
            </div>
            <div className="node-body">
              {n.ports.map((p) => (
                <div
                  key={p.id}
                  className={`node-port ${p.dir}`}
                  data-linked={linked.has(`${n.id}.${p.id}`) || undefined}
                  style={p.type && types[p.type] ? ({ "--c": types[p.type] } as React.CSSProperties) : undefined}
                >
                  {p.label}
                  {p.value && <span className="node-value">{p.value}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
