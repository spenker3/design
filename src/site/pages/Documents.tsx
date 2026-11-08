import { Page, Demo } from "../Demo";
import { CodeBlock } from "../../components/CodeBlock";
import { Tex } from "../../components/Tex";

const gap = (v: string) => ({ "--gap": v }) as React.CSSProperties;
const ratio = (r: string) => ({ "--ratio": r }) as React.CSSProperties;

export function Documents() {
  return (
    <Page
      title="Documents"
      lede="Long-form content: prose, code, figures, math and the parts of a paper. They reuse the prose type and add as little as possible."
    >
      <Demo title="Prose" rules="Long text uses .prose: 16px, 1.65 leading, a 68ch measure. Links underline with a quiet line that darkens on hover. Quotes are marked with a solid fg rule, not italics.">
        <div className="prose">
          <h2>Reading width matters</h2>
          <p>
            Long-form text is set larger and looser than the interface around it. Lines stay under about seventy characters so
            the eye finds the next one. <a href="#/documents">Links</a> stay quiet until hovered.
          </p>
          <ul>
            <li>Lists keep the same rhythm as paragraphs.</li>
            <li>
              Inline <code>code</code> sits on a gray surface.
            </li>
          </ul>
          <blockquote>Color is free to mean something.</blockquote>
        </div>
      </Demo>
      <Demo
        title="Code"
        rules={
          <ul>
            <li>13px Geist Mono at 1.65 leading on a surface, 1px line, never wrapped: long lines scroll.</li>
            <li>The head names the file when there is one, then the language, then Copy. A bare pre is for short output with nothing to name.</li>
            <li>Syntax color is quiet: keywords are bold fg, and color only marks strings, numbers, functions and types.</li>
            <li>Number lines when the text refers to them. Highlight a few lines at most, with a bar in the gutter.</li>
          </ul>
        }
        bare
      >
        <CodeBlock
          file="src/heap.rs"
          lang="rust"
          lines
          highlight={[7, 8]}
          code={`/// A binary min-heap.
pub struct Heap<T: Ord> {
    items: Vec<T>,
}

impl<T: Ord> Heap<T> {
    pub fn push(&mut self, x: T) {
        self.items.push(x);
        self.sift_up(self.items.len() - 1);
    }
}`}
        />
      </Demo>
      <Demo
        title="Diff and terminal"
        rules="Added lines get the good tint and a + in the gutter, removed lines the bad tint and a −. A terminal block starts commands with a faint, unselectable $ and mutes the output. Copy takes the result: no removed lines, no output."
        bare
      >
        <CodeBlock
          file="Button.tsx"
          lang="tsx"
          diff
          code={` export function Save({ busy }: Props) {
-  return <button className="btn btn-blue">Save</button>;
+  return <button className="btn primary" aria-busy={busy}>Save</button>;
 }`}
        />
        <CodeBlock
          terminal
          lang="sh"
          code={`$ npm run build
✓ built in 480ms
$ git push`}
        />
      </Demo>
      <Demo
        title="Figures"
        rules={
          <ul>
            <li>Caption below, never above. Start with the bold number, then one sentence on what the reader should see, not what the image is. Credit goes on its own faint line.</li>
            <li>Subfigures share one number. Label each (a), (b), (c) and keep the shared point in the figure's caption. Keep panels the same size so they compare.</li>
            <li>Add .framed when the content has no edge of its own, like a chart on bg. Photos already have one.</li>
            <li>Tables get the same treatment with their own counter, in a caption element so it stays attached.</li>
            <li>Refer to figures by number and link it. Write “Figure 1”, not “the figure above”, since the layout can change.</li>
          </ul>
        }
      >
        <figure className="figure" id="fig-1">
          <div className="figure-row">
            {["Before", "During", "After"].map((t, i) => (
              <figure className="figure" key={t}>
                <div className="media" style={ratio("4 / 3")}>
                  <span className="media-label">{t.toLowerCase()}.png</span>
                </div>
                <figcaption>
                  ({String.fromCharCode(97 + i)}) {t}
                </figcaption>
              </figure>
            ))}
          </div>
          <figcaption>
            <span className="figure-num">Figure 1.</span>The same field across one season. Growth stalls in (b) when irrigation stops.
            <span className="figure-credit">Photo: Field Survey Office, 2025.</span>
          </figcaption>
        </figure>
        <figure className="figure framed">
          <div>
            <div className="bars" style={{ height: 100 }}>
              {[30, 42, 38, 55, 61, 58, 72, 80, 76, 88, 92, 97].map((h, i) => (
                <span key={i} style={{ "--h": `${h}%` } as React.CSSProperties} data-tip={String(h)} />
              ))}
            </div>
            <div className="bars-axis">
              <span>Jan</span>
              <span>Dec</span>
            </div>
          </div>
          <figcaption>
            <span className="figure-num">Figure 2.</span>Monthly signups tripled over the year, unlike the stalled growth in{" "}
            <a href="#fig-1">Figure 1b</a>.
          </figcaption>
        </figure>
      </Demo>
      <Demo
        title="Math"
        rules={
          <ul>
            <li>LaTeX rendered with KaTeX. Math keeps its own serif faces, the one place the system leaves Helvetica.</li>
            <li>Inline math sits on the baseline at 1.1em. Keep it short: anything with a fraction or a sum goes on its own line.</li>
            <li>Display math is centered with its number at the right in mono. Number only what you refer to, as Equation (1).</li>
            <li>Align derivations on the relation sign, one step per line, and say what changed in the text.</li>
            <li>Math inherits the text color, so it inverts with a selected row. Bad TeX shows its source in mono and --bad instead of breaking the page.</li>
          </ul>
        }
      >
        <p className="prose">
          For a circle of radius <Tex>r</Tex>, the area is <Tex>\pi r^2</Tex> and the circumference is <Tex>2\pi r</Tex>.
        </p>
        <div className="equation">
          <Tex display>{String.raw`\begin{aligned}
(a + b)^2 &= (a + b)(a + b) \\
&= a^2 + 2ab + b^2
\end{aligned}`}</Tex>
          <span className="eq-num">(1)</span>
        </div>
      </Demo>
      <Demo
        title="Papers"
        rules={
          <ul>
            <li>An abstract is an h4 title on a surface, slightly smaller text with looser leading, one paragraph.</li>
            <li>Theorems and lemmas get a 2px fg rule, and definitions and remarks a soft one. The label is bold with an optional name in normal weight. A proof has no rule and ends with ∎ at the right.</li>
            <li>Citations are numbered, in mono brackets, muted until hovered. Each links to its reference, whose number inverts when targeted. Titles in italics, everything else plain.</li>
          </ul>
        }
      >
        <div className="stack prose" style={gap("var(--space-5)")}>
          <div className="abstract">
            <h4>Abstract</h4>
            <p>
              A two-color interface with one inverted selection state is learned faster than an accent-colored one{" "}
              <a className="cite" href="#ref-1">
                [1]
              </a>
              .
            </p>
          </div>
          <div className="theorem">
            <span className="theorem-label">
              Theorem 1 <span>(Euclid)</span>
            </span>
            <p>There are infinitely many primes.</p>
          </div>
          <div className="proof">
            <p>
              <em>Proof.</em> Suppose <Tex>{String.raw`p_1, \dots, p_n`}</Tex> are all of them. Then{" "}
              <Tex>{String.raw`p_1 \cdots p_n + 1`}</Tex> has a prime factor not on the list.
            </p>
          </div>
          <ol className="refs">
            <li id="ref-1">
              <span>
                A. Rivera and K. Moss. <i>Contrast and the speed of selection.</i> CHI, 2019, pp. 112–120.
              </span>
            </li>
          </ol>
        </div>
      </Demo>
    </Page>
  );
}
