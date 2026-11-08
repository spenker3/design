import { useMemo } from "react";
import katex from "katex";

/* LaTeX via KaTeX. Inline by default; `display` for a centered block.
   Bad TeX renders as the source in --bad instead of throwing. */
export function Tex({ children, display }: { children: string; display?: boolean }) {
  const html = useMemo(
    () => katex.renderToString(children, { displayMode: display, throwOnError: false, errorColor: "var(--bad)" }),
    [children, display],
  );
  return <span className="math" dangerouslySetInnerHTML={{ __html: html }} />;
}
