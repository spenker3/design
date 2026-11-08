import { useEffect, useRef, useState } from "react";

/* Width of an element, kept current. For SVG charts that keep text at real pixel size. */
export function useWidth<T extends HTMLElement>(initial = 600) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(initial);
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(ref.current!);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

export type Series = { name: string; values: number[]; color?: string };

const PAD = { top: 8, right: 0, bottom: 22, left: 36 };

function ticks(max: number) {
  const step = 10 ** Math.floor(Math.log10(max / 4));
  const nice = [1, 2, 5, 10].map((m) => m * step).find((s) => max / s <= 5)!;
  return Array.from({ length: Math.ceil(max / nice) + 1 }, (_, i) => i * nice);
}

/* Line chart. One series is fg. For 2-4, pass color: var(--series-N) in order. Lines are labeled at
   their end and in the legend, so identity is never color alone. Hover shows a crosshair and every
   series' value. Width follows the container and height is fixed. */
export function LineChart({
  series,
  labels,
  height = 220,
  format = (v) => String(v),
  area,
  label,
}: {
  series: Series[];
  labels: string[];
  height?: number;
  format?: (v: number) => string;
  area?: boolean;
  label: string;
}) {
  const [box, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);

  const multi = series.length > 1;
  const right = multi ? 72 : 8;
  const ys = ticks(Math.max(...series.flatMap((s) => s.values)));
  const top = ys[ys.length - 1];
  const iw = Math.max(1, width - PAD.left - right);
  const ih = height - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (i / (labels.length - 1)) * iw;
  const y = (v: number) => PAD.top + ih - (v / top) * ih;
  /* End labels: pushed apart so they never overlap. */
  const ends = series.map((s) => y(s.values[s.values.length - 1]));
  const order = ends.map((_, i) => i).sort((a, b) => ends[a] - ends[b]);
  order.forEach((i, k) => k && (ends[i] = Math.max(ends[i], ends[order[k - 1]] + 14)));
  const every = Math.ceil(labels.length / Math.max(2, Math.floor(iw / 56)));

  function onMove(e: React.PointerEvent) {
    const r = e.currentTarget.getBoundingClientRect();
    const i = Math.round(((e.clientX - r.left - PAD.left) / iw) * (labels.length - 1));
    setHover(i >= 0 && i < labels.length ? i : null);
  }

  return (
    <div className="stack" style={{ "--gap": "var(--space-3)" } as React.CSSProperties}>
      {multi && (
        <div className="legend">
          {series.map((s) => (
            <span key={s.name} style={{ "--c": s.color } as React.CSSProperties}>
              {s.name}
            </span>
          ))}
        </div>
      )}
      <div className="chart" ref={box}>
        <svg
          height={height}
          role="img"
          aria-label={label}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          {ys.map((t) => (
            <g key={t}>
              <line className={t ? "chart-grid" : "chart-base"} x1={PAD.left} x2={PAD.left + iw} y1={y(t)} y2={y(t)} />
              <text className="chart-axis" x={PAD.left - 8} y={y(t)} textAnchor="end" dominantBaseline="central">
                {format(t)}
              </text>
            </g>
          ))}
          {labels.map(
            (l, i) =>
              i % every === 0 && (
                <text key={l} className="chart-axis" x={x(i)} y={height - 6} textAnchor="middle">
                  {l}
                </text>
              ),
          )}
          {hover !== null && <line className="chart-cross" x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={PAD.top + ih} />}
          {series.map((s, si) => {
            const pts = s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
            const last = s.values.length - 1;
            return (
              <g key={s.name} style={{ "--c": s.color } as React.CSSProperties}>
                {area && <polygon className="chart-area" points={`${x(0)},${y(0)} ${pts} ${x(last)},${y(0)}`} />}
                <polyline className="chart-line" points={pts} />
                {multi && (
                  <text className="chart-end" x={x(last) + 8} y={ends[si]}>
                    {s.name}
                  </text>
                )}
                {hover !== null && <circle className="chart-dot" cx={x(hover)} cy={y(s.values[hover])} r={4.5} />}
              </g>
            );
          })}
        </svg>
        {hover !== null && (
          <div
            className="chart-tip"
            style={x(hover) > width / 2 ? { right: width - x(hover) + 12 } : { left: x(hover) + 12 }}
          >
            <b>{labels[hover]}</b>
            {series.map((s) => (
              <span key={s.name} style={{ display: "contents" }}>
                <span className="legend" style={{ "--c": s.color } as React.CSSProperties}>
                  <span />
                </span>
                <span>{s.name}</span>
                <span className="n">{format(s.values[hover])}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
