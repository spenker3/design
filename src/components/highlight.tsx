import type { ReactNode } from "react";

/*
  A small highlighter that emits the .tk-* classes. Good enough for docs and
  examples in ts/js, rust, css, shell and toml. Real apps can use any highlighter
  (Shiki, tree-sitter) mapped onto the same classes or --code-* tokens.
*/
const keywords = new Set(
  (
    "as async await break const continue crate else enum export extends false fn for from function if impl import in " +
    "interface let loop match mod mut new null pub return self Self static struct super switch this trait true type " +
    "undefined use var where while yield default case of void"
  ).split(" "),
);

const patterns: Record<string, RegExp> = {
  hash: /(#.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d[\d_.]*\b)|([A-Za-z_][\w-]*)|([{}()[\];:,.=<>+\-*/&|!?@$]+)/g,
  slash:
    /(\/\/.*$|\/\*.*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(#[0-9a-fA-F]{3,8}\b|\b\d[\d_.]*(?:px|em|rem|ms|%)?\b)|(--[\w-]+|[A-Za-z_]\w*)|([{}()[\];:,.=<>+\-*/&|!?@]+)/g,
};

const hashLangs = new Set(["sh", "bash", "shell", "toml", "py", "python", "yaml"]);

export function highlightLine(line: string, lang: string): ReactNode[] {
  const re = new RegExp(patterns[hashLangs.has(lang) ? "hash" : "slash"]);
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const [text, com, str, num, word, punct] = m;
    let cls = "";
    if (com) cls = "tk-com";
    else if (str) cls = "tk-str";
    else if (num) cls = "tk-num";
    else if (punct) cls = "tk-punct";
    else if (word) {
      const next = line.slice(m.index + text.length).trimStart()[0];
      if (keywords.has(word)) cls = "tk-kw";
      else if (word.startsWith("--") || /^[A-Z]/.test(word)) cls = "tk-type";
      else if (next === "(" || next === "!") cls = "tk-fn";
    }
    out.push(cls ? <span key={k++} className={cls}>{text}</span> : text);
    last = m.index + text.length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}
