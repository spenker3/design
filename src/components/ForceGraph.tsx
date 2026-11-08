import { useEffect, useMemo, useRef, useState } from "react";
import { canvasGrid } from "./NodeEditor";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";

export type FNode = { id: string; label: string; group?: string };
export type FLink = { source: string; target: string };

type N = FNode & SimulationNodeDatum & { r: number; degree: number };
type L = SimulationLinkDatum<N>;

/* Obsidian-style graph: a force layout of notes and links. Dots grow with their link count,
   and unlinked notes are faint. Hover lights a note and its neighbors and dims the rest; click
   selects (the label inverts). Drag a dot to move it, drag the background to pan, scroll to
   zoom. Labels show for hubs (6+ links), the lit notes, and every note once zoomed in.
   `groups` maps a group name to a color, and ungrouped notes are muted gray. */
export function ForceGraph({
  nodes: input,
  links: linkInput,
  groups = {},
  height = 440,
  label,
}: {
  nodes: FNode[];
  links: FLink[];
  groups?: Record<string, string>;
  height?: number;
  label: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [, setFrame] = useState(0);
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const [hover, setHover] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const drag = useRef<{ node?: N; x: number; y: number; vx: number; vy: number; moved: boolean }>(null);

  const { nodes, links, sim, neighbors } = useMemo(() => {
    const degree: Record<string, number> = {};
    for (const l of linkInput) {
      degree[l.source] = (degree[l.source] ?? 0) + 1;
      degree[l.target] = (degree[l.target] ?? 0) + 1;
    }
    const nodes: N[] = input.map((n) => ({ ...n, degree: degree[n.id] ?? 0, r: 3 + Math.sqrt(degree[n.id] ?? 0) * 1.8 }));
    const links: L[] = linkInput.map((l) => ({ ...l }));
    const neighbors = new Map<string, Set<string>>(nodes.map((n) => [n.id, new Set([n.id])]));
    for (const l of linkInput) {
      neighbors.get(l.source)!.add(l.target);
      neighbors.get(l.target)!.add(l.source);
    }
    const sim = forceSimulation(nodes)
      .force("link", forceLink<N, L>(links).id((n) => n.id).distance(56))
      .force("charge", forceManyBody().strength(-200))
      .force("center", forceCenter(0, 0))
      .force("collide", forceCollide<N>((n) => n.r + 3))
      .stop();
    return { nodes, links, sim, neighbors };
  }, [input, linkInput]);

  useEffect(() => {
    sim.on("tick", () => setFrame((f) => f + 1)).restart();
    return () => void sim.stop();
  }, [sim]);

  /* Wheel zoom needs a non-passive listener to stop the page from scrolling. */
  useEffect(() => {
    const el = box.current!;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const px = e.clientX - r.left - r.width / 2;
      const py = e.clientY - r.top - r.height / 2;
      setView((v) => {
        const k = Math.min(4, Math.max(0.3, v.k * Math.exp(-e.deltaY * 0.0015)));
        return { k, x: px - ((px - v.x) * k) / v.k, y: py - ((py - v.y) * k) / v.k };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const lit = hover ? neighbors.get(hover) : undefined;
  const showAll = view.k > 1.6;

  function down(e: React.PointerEvent, node?: N) {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { node, x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, moved: false };
    if (node) {
      node.fx = node.x;
      node.fy = node.y;
      sim.alphaTarget(0.3).restart();
    }
  }

  function move(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
    if (d.node) {
      d.node.fx! += e.movementX / view.k;
      d.node.fy! += e.movementY / view.k;
    } else setView((v) => ({ ...v, x: d.vx + dx, y: d.vy + dy }));
  }

  function up() {
    const d = drag.current;
    if (!d) return;
    if (d.node) {
      d.node.fx = d.node.fy = null;
      sim.alphaTarget(0);
      if (!d.moved) setSelected((s) => (s === d.node!.id ? undefined : d.node!.id));
    } else if (!d.moved) setSelected(undefined);
    drag.current = null;
  }

  const w = box.current?.clientWidth ?? 600;

  return (
    <div
      className="force canvas"
      ref={box}
      style={{ height, ...canvasGrid(w / 2 + view.x, height / 2 + view.y, view.k) }}
      onPointerDown={(e) => down(e)}
      onPointerMove={move}
      onPointerUp={up}
    >
      <svg role="img" aria-label={label} width="100%" height="100%">
        <g transform={`translate(${w / 2 + view.x} ${height / 2 + view.y}) scale(${view.k})`}>
          {links.map((l, i) => {
            const s = l.source as N;
            const t = l.target as N;
            const on = hover && (s.id === hover || t.id === hover);
            return (
              <line
                key={i}
                className="force-link"
                data-on={on || undefined}
                data-dim={(hover && !on) || undefined}
                x1={s.x}
                y1={s.y}
                x2={t.x}
                y2={t.y}
                strokeWidth={1 / view.k}
              />
            );
          })}
          {nodes.map((n) => (
            <g
              key={n.id}
              className="force-node"
              data-dim={(lit && !lit.has(n.id)) || undefined}
              data-on={hover === n.id || undefined}
              data-orphan={n.degree === 0 || undefined}
              aria-selected={selected === n.id}
              style={n.group && groups[n.group] ? ({ "--c": groups[n.group] } as React.CSSProperties) : undefined}
              onPointerEnter={() => !drag.current && setHover(n.id)}
              onPointerLeave={() => !drag.current && setHover(undefined)}
              onPointerDown={(e) => down(e, n)}
            >
              <circle cx={n.x} cy={n.y} r={n.r} />
              {(showAll || n.degree >= 6 || lit?.has(n.id) || selected === n.id) && (
                <text x={n.x} y={(n.y ?? 0) + n.r + 4} style={{ fontSize: 12 / Math.max(1, view.k * 0.8) }}>
                  {n.label}
                </text>
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
