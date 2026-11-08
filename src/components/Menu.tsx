import { useId, useRef, type ReactNode } from "react";

/*
  Popover menu under its trigger. Uses the popover attribute, so outside
  clicks and Esc close it for free. Arrow keys move between items.
*/
export function Menu({
  trigger,
  children,
  align = "start",
  className = "menu",
}: {
  trigger: (props: { popoverTarget: string }) => ReactNode;
  children: ReactNode;
  align?: "start" | "end";
  className?: string;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  function place(e: React.ToggleEvent<HTMLDivElement>) {
    if (e.newState !== "open") return;
    const menu = ref.current!;
    const anchor = document.querySelector(`[popovertarget="${CSS.escape(id)}"]`);
    if (!anchor) return;
    const r = anchor.getBoundingClientRect();
    const m = menu.getBoundingClientRect();
    const below = r.bottom + 4 + m.height <= window.innerHeight;
    const top = below ? r.bottom + 4 : r.top - 4 - m.height;
    let left = align === "end" ? r.right - m.width : r.left;
    left = Math.max(8, Math.min(left, window.innerWidth - m.width - 8));
    menu.style.top = `${Math.max(8, top)}px`;
    menu.style.left = `${left}px`;
    menu.querySelector<HTMLElement>("button, a")?.focus();
  }

  function keys(e: React.KeyboardEvent<HTMLDivElement>) {
    const items = [...e.currentTarget.querySelectorAll<HTMLElement>(":scope > button:not(:disabled), :scope > a")];
    const i = items.indexOf(document.activeElement as HTMLElement);
    const step = { ArrowDown: 1, ArrowUp: -1 }[e.key];
    if (step) {
      e.preventDefault();
      items[(i + step + items.length) % items.length]?.focus();
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      items[e.key === "Home" ? 0 : items.length - 1]?.focus();
    }
  }

  return (
    <>
      {trigger({ popoverTarget: id })}
      <div
        ref={ref}
        id={id}
        popover="auto"
        role="menu"
        className={className}
        onToggle={place}
        onKeyDown={keys}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button, a")) ref.current?.hidePopover();
        }}
      >
        {children}
      </div>
    </>
  );
}
