import { Bookmark, Menu as MenuIcon, Share } from "lucide-react";
import { Menu } from "../../components/Menu";

export function Article() {
  return (
    <div className="tpl-article">
      <header className="topbar">
        <a className="wordmark" href="#/">
          margin
        </a>
        <nav className="tabs article-tabs">
          <a href="#/t/article" aria-current="page">
            Essays
          </a>
          <a href="#/t/article">Notes</a>
          <a href="#/t/article">Archive</a>
        </nav>
        <span className="spacer" />
        <button className="btn primary sm">Subscribe</button>
        <Menu
          align="end"
          trigger={(p) => (
            <button className="btn ghost icon sm article-menu" aria-label="Sections" {...p}>
              <MenuIcon />
            </button>
          )}
        >
          {["Essays", "Notes", "Archive"].map((l) => (
            <a key={l} href="#/t/article">
              {l}
            </a>
          ))}
        </Menu>
      </header>

      <article className="article">
        <header className="stack" style={{ "--gap": "16px" } as React.CSSProperties}>
          <ol className="breadcrumbs">
            <li>
              <a href="#/t/article">Essays</a>
            </li>
            <li aria-current="page">Planning</li>
          </ol>
          <h1 className="article-title">Smaller milestones</h1>
          <p className="article-dek">
            What happened when we split every long deadline into two-week pieces.
          </p>
          <div className="row between wrap">
            <div className="row">
              <span className="avatar">mc</span>
              <div>
                <div style={{ fontWeight: 600 }}>Mira Chen</div>
                <div className="muted" style={{ fontSize: "var(--text-sm)" }}>
                  Nov 5 · 6 min read
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
          <figcaption className="muted">Open tasks per milestone over one year. The count drops once milestones shrink to two weeks.</figcaption>
        </figure>

        <div className="prose">
          <p>
            A milestone is a date with a list of tasks under it. When the list is long, the date stops meaning much. Work
            slips a little at a time, and nobody notices until the last week.
          </p>
          <p>
            Last year we split every milestone longer than a month into pieces of about two weeks. The total work stayed the
            same. What changed was how early we saw a problem.
          </p>
          <h2>What changed</h2>
          <p>
            Each short milestone ended with a review. Late tasks moved to the next milestone or were cut, and we made that
            call every two weeks instead of once a quarter.
          </p>
          <blockquote>Most of the late work was visible a month before the old deadlines.</blockquote>
          <h2>What it costs</h2>
          <p>
            More milestones mean more reviews. We kept each one to fifteen minutes and three questions: what's done, what's
            late, and what moves.
          </p>
          <pre>{`$ atlas milestone split "Beta" --every 2w\nCreated Beta 1 (Nov 3–14) and Beta 2 (Nov 17–28)`}</pre>
          <p>Splitting a milestone takes a minute. Keeping the review short takes longer to learn.</p>
        </div>

        <hr />
        <section className="stack">
          <h4>Read next</h4>
          <div className="grid" style={{ "--min": "220px" } as React.CSSProperties}>
            {["Writing a project brief", "Naming tasks well", "Planning a launch week"].map((t, i) => (
              <a key={t} className="card plain" href="#/t/article">
                <span className="muted" style={{ fontSize: "var(--text-sm)" }}>
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
