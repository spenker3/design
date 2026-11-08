import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { highlightLine } from "./highlight";

/*
  Code block. Pass the code as a string.
  - file / lang: shown in the head. No head when both are missing and copy is off.
  - lines: line numbers.  highlight: 1-based line numbers to mark.
  - diff: lines starting with "+" or "-" become add/del lines (the sign moves to the gutter).
  - terminal: lines starting with "$ " are commands, and the rest is output.
*/
export function CodeBlock({
  code,
  lang = "",
  file,
  lines,
  highlight = [],
  diff,
  terminal,
  copy = true,
}: {
  code: string;
  lang?: string;
  file?: string;
  lines?: boolean;
  highlight?: number[];
  diff?: boolean;
  terminal?: boolean;
  copy?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const rows = code.replace(/\n$/, "").split("\n");

  const plain = terminal
    ? rows.filter((r) => r.startsWith("$ ")).map((r) => r.slice(2)).join("\n")
    : diff
      ? rows.filter((r) => !r.startsWith("-")).map((r) => r.replace(/^[+ ]/, "")).join("\n")
      : code;

  return (
    <div className={terminal ? "codeblock terminal" : "codeblock"}>
      {(file || lang || copy) && (
        <div className="codeblock-head">
          {file && <span className="file">{file}</span>}
          {lang && <span className="lang">{terminal ? "terminal" : lang}</span>}
          <span className="grow" />
          {copy && (
            <button
              className="btn ghost sm"
              onClick={() => {
                navigator.clipboard?.writeText(plain);
                setCopied(true);
                setTimeout(() => setCopied(false), 1400);
              }}
            >
              {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      )}
      <pre>
        <code className={lines ? "lines" : undefined}>
          {rows.map((row, i) => {
            if (terminal) {
              const cmd = row.startsWith("$ ");
              return (
                <span key={i} className="line">
                  {cmd ? (
                    <>
                      <span className="prompt">$ </span>
                      {highlightLine(row.slice(2), "sh")}
                    </>
                  ) : (
                    <span className="out">{row}</span>
                  )}
                </span>
              );
            }
            let cls = "line";
            let mark: string | undefined;
            let text = row;
            if (diff && /^[+-]/.test(row)) {
              cls += row[0] === "+" ? " add" : " del";
              mark = row[0];
              text = row.slice(1);
            } else if (diff) {
              text = row.replace(/^ /, "");
            }
            if (highlight.includes(i + 1)) cls += " hl";
            return (
              <span key={i} className={cls} data-mark={mark}>
                {highlightLine(text, lang)}
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
