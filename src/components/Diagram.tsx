import { useEffect, useRef } from "react";
import { mountAsync, type Mounted } from "pele/lazy";

/* A Mermaid-syntax diagram rendered by Pele (pele.run) to SVG. Colors come from the tokens
   through --pele-* variables in charts.css, so theme changes need no re-render. Each diagram
   type loads on first use. Pele re-lays out when the container resizes, and shows syntax
   errors in place. */
export function Diagram({ code, label }: { code: string; label: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted: Mounted | undefined;
    let live = true;
    const font = getComputedStyle(box.current!);
    mountAsync(box.current!, code, {
      fontFamily: font.getPropertyValue("--font-ui"),
      fontFamilyMono: font.getPropertyValue("--font-mono"),
      fontSize: 14,
      monospace: ["members", "attributes"],
    }).then((m) => (live ? (mounted = m) : m.destroy()));
    return () => {
      live = false;
      mounted?.destroy();
    };
  }, [code]);

  return <div className="diagram" ref={box} role="img" aria-label={label} />;
}
