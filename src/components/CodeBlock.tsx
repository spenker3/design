import { highlightLine } from "./highlight";

/*
  Code block. Pass the code as a string.
  - file / lang: shown as an unnumbered first row inside the code, at the gutter's left edge. The language takes its color. No head when both are missing.
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
}: {
  code: string;
  lang?: string;
  file?: string;
  lines?: boolean;
  highlight?: number[];
  diff?: boolean;
  terminal?: boolean;
}) {
  const rows = code.replace(/\n$/, "").split("\n");

  return (
    <div className={terminal ? "codeblock terminal" : "codeblock"}>
      <pre>
        <code
          className={lines ? "lines" : undefined}
          style={lines ? ({ "--digits": String(rows.length).length } as React.CSSProperties) : undefined}
        >
          {(file || lang) && (
            <span className="line codeblock-head">
              {file && <span className="file">{file}</span>}
              {file && lang && " "}
              {lang && <span className="lang" data-lang={lang}>{lang}</span>}
            </span>
          )}
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
