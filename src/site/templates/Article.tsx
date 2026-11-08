import { Bookmark, Share } from "lucide-react";

export function Article() {
  return (
    <div className="tpl-article">
      <header className="topbar">
        <a className="wordmark" href="#/t/article">
          margin
        </a>
        <nav className="tabs">
          <a href="#/t/article" aria-current="page">
            Essays
          </a>
          <a href="#/t/article">Notes</a>
          <a href="#/t/article">Archive</a>
        </nav>
        <span className="spacer" />
        <button className="btn primary sm">Subscribe</button>
      </header>

      <article className="article">
        <header className="stack" style={{ "--gap": "16px" } as React.CSSProperties}>
          <ol className="breadcrumbs">
            <li>
              <a href="#/t/article">Essays</a>
            </li>
            <li aria-current="page">Design</li>
          </ol>
          <h1 className="article-title">The inverted block</h1>
          <p className="article-dek">
            Why a single rule for selection does more for an interface than any accent color could.
          </p>
          <div className="row between wrap">
            <div className="row">
              <span className="avatar">mc</span>
              <div>
                <div style={{ fontWeight: 600 }}>Mira Chen</div>
                <div className="muted" style={{ fontSize: "var(--text-sm)" }}>
                  Nov 5, 2026 · 6 min read
                </div>
              </div>
            </div>
            <div className="row" style={{ "--gap": "2px" } as React.CSSProperties}>
              <button className="btn ghost icon" aria-label="Save" data-tip="Save">
                <Bookmark />
              </button>
              <button className="btn ghost icon" aria-label="Share" data-tip="Share">
                <Share />
              </button>
            </div>
          </div>
        </header>

        <figure className="article-hero">
          <div className="media" style={{ "--ratio": "16/9" } as React.CSSProperties}>
            <span className="media-label">hero 16:9</span>
          </div>
          <figcaption className="muted">The workspace bar: five cells, one inverted.</figcaption>
        </figure>

        <div className="prose">
          <p>
            Most interfaces mark the current thing with a color: a blue tab, a tinted row, an outline in the brand's
            accent. It works, but every surface ends up inventing its own version, and the accent stops meaning anything
            in particular.
          </p>
          <p>
            Swapping foreground and background is the oldest selection there is. Terminals have done it for fifty years.
            It needs no new color, it reads in both themes, and it survives a grayscale print.
          </p>
          <h2>One rule, everywhere</h2>
          <p>
            Once selection is the inverted block, the same rule covers tabs, sidebar items, table rows, the menu cursor,
            checked boxes and selected text. A new component follows the same rule without a new decision.
          </p>
          <blockquote>Color is then free to mean something: paid, failed, due, live.</blockquote>
          <h2>What it costs</h2>
          <p>
            Inverted blocks are loud, so there can only be one or two per region. A list with ten selected rows becomes
            a wall. Multi-select uses checkboxes instead and leaves the block for the cursor.
          </p>
          <pre>{`.tabs > [aria-selected="true"] {\n  background: var(--sel-bg);\n  color: var(--sel-fg);\n}`}</pre>
          <p>
            That's the whole implementation. The rest is grays for structure, a 4px corner, and nothing
            that moves unless it has to.
          </p>
        </div>

        <hr />
        <section className="stack">
          <h4>Read next</h4>
          <div className="grid" style={{ "--min": "220px" } as React.CSSProperties}>
            {["Lines instead of shadows", "One typeface is enough", "Dense and calm"].map((t, i) => (
              <a key={t} className="card plain" href="#/t/article">
                <span className="muted" style={{ fontSize: 12 }}>
                  {i + 2}
                </span>
                <h3>{t}</h3>
                <span className="muted" style={{ fontSize: "var(--text-sm)" }}>
                  {4 + i} min read
                </span>
              </a>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
