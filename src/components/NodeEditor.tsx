import { useRef, useState, type ReactNode } from "react";

export type Port = { id: string; label: string; dir: "in" | "out"; type?: string; value?: string };
export type EditorNode = { id: string; title: string; icon?: ReactNode; x: number; y: number; ports: Port[] };
/* from/to are "nodeId.portId" */
export type Wire = { from: string; to: string };

const W = 180;
const HEAD = 28;
const PAD = 6;
const ROW = 24;

/* Node editor: drag a node by its header, click to select. Ports are rows, with an in port on the
   left edge, an out port on the right. `types` maps a port type to its color (wires take it too). */
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
  const drag = useRef<{ id: string; dx: number; dy: number }>(null);

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const linked = new Set(wires.flatMap((w) => [w.from, w.to]));

  function anchor(ref: string) {
    const [nid, pid] = ref.split(".");
    const n = byId[nid];
    const i = n.ports.findIndex((p) => p.id === pid);
    const p = n.ports[i];
    return { x: p.dir === "out" ? n.x + W : n.x, y: n.y + HEAD + PAD + i * ROW + ROW / 2, type: p.type };
  }

  function move(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    setNodes((ns) => ns.map((n) => (n.id === d.id ? { ...n, x: e.clientX - d.dx, y: e.clientY - d.dy } : n)));
  }

  return (
    <div className="nodes canvas" role="group" aria-label={label} onPointerMove={move} onPointerUp={() => (drag.current = null)}>
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
          onPointerDown={() => setSelected(n.id)}
        >
          <div
            className="node-head"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              drag.current = { id: n.id, dx: e.clientX - n.x, dy: e.clientY - n.y };
            }}
          >
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
  );
}
