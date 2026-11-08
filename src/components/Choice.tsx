import type { ReactNode } from "react";

type Option<T> = { value: T; label: ReactNode; count?: number };

/* Segmented control: a small exclusive choice. Selected segment inverts. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  block,
}: {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  block?: boolean;
}) {
  return (
    <div className={block ? "segmented block" : "segmented"} role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* Tabs: switch between views. Selected tab inverts. Arrow keys move. */
export function Tabs<T extends string>({
  options,
  value,
  onChange,
  variant = "",
}: {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  variant?: "" | "lined" | "strip";
}) {
  return (
    <div
      className={`tabs ${variant}`}
      role="tablist"
      onKeyDown={(e) => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!step) return;
        const i = options.findIndex((o) => o.value === value);
        const n = options[(i + step + options.length) % options.length];
        onChange(n.value);
        (e.currentTarget.children[options.indexOf(n)] as HTMLElement).focus();
      }}
    >
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={o.value === value}
          tabIndex={o.value === value ? 0 : -1}
          onClick={() => onChange(o.value)}
        >
          {o.label}
          {o.count !== undefined && <span className="count">{o.count}</span>}
        </button>
      ))}
    </div>
  );
}
