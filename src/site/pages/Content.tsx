import { useState } from "react";
import { AlertTriangle, ArrowDown, ArrowUp, CheckCircle2, ChevronRight, FileText, Inbox, Info, Paperclip, X, XCircle } from "lucide-react";
import { Page, Demo } from "../Demo";

const gap = (v: string) => ({ "--gap": v }) as React.CSSProperties;

const rows = [
  { id: "#2041", item: "Ridge shell", state: "paid", price: 182.0, days: 2 },
  { id: "#2040", item: "Selvedge jeans", state: "open", price: 44.5, days: 6 },
  { id: "#2037", item: "Trail runners", state: "pending", price: 120.0, days: 1 },
  { id: "#2031", item: "Work jacket", state: "refunded", price: 95.0, days: 14 },
];

const stateTone: Record<string, string> = { paid: "good", open: "info", pending: "warn", refunded: "bad" };

export function Content() {
  const [sel, setSel] = useState("#2037");
  const [pick, setPick] = useState(1);
  const [tags, setTags] = useState(["Outerwear", "Size M", "Under $200"]);
  return (
    <Page title="Content" lede="What a screen shows, in the flow of the page. Dense, aligned and quiet, with color only where it says something about the data.">
      <Demo
        title="Table"
        rules="Small, bold, muted headers in sentence case on a surface, 36px rows (28 compact), mono right-aligned numbers. Sortable headers show an arrow. The selected row inverts, like the TUI's reversed highlight."
        bare
      >
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>State</th>
                <th className="n" aria-sort="descending">
                  <button>
                    Price <ArrowDown />
                  </button>
                </th>
                <th className="n">Days</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} aria-selected={r.id === sel} onClick={() => setSel(r.id)} style={{ cursor: "pointer" }}>
                  <td className="mono muted">{r.id}</td>
                  <td>{r.item}</td>
                  <td>
                    <span className={`badge ${stateTone[r.state]}`}>{r.state}</span>
                  </td>
                  <td className="n">{r.price.toFixed(2)}</td>
                  <td className="n">{r.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Demo>
      <Demo title="List" rules="Rows divided by lines. Title plus a muted sub-line, with meta on the right. The selected row inverts.">
        <div className="list">
          {["Launch plan", "Pricing brief", "Q3 roadmap"].map((t, i) => (
            <button key={t} aria-selected={pick === i} onClick={() => setPick(i)}>
              <FileText size={16} />
              <span className="grow">
                <div className="title">{t}</div>
                <div className="sub muted">{["24 pages · slides", "18 pages · notes", "4 pages · doc"][i]}</div>
              </span>
              <span className="muted mono" style={{ fontSize: 12 }}>
                {["Oct 28", "Oct 30", "Nov 2"][i]}
              </span>
              <ChevronRight size={16} className="muted" />
            </button>
          ))}
        </div>
      </Demo>
      <Demo
        title="Cards and stats"
        rules={
          <ul>
            <li>Cards are a surface fill, 1px line and 16px padding. A card that is one link outlines in fg on hover. Footer actions sit behind a line.</li>
            <li>An inverted card is for the one thing on a page that must stand apart.</li>
            <li>A stat is a label, a big tabular number, and a mono delta colored by direction.</li>
          </ul>
        }
      >
        <div className="grid" style={{ "--min": "160px", "--gap": "24px" } as React.CSSProperties}>
          <div className="stat">
            <span className="label">Revenue</span>
            <span className="value">$12,480</span>
            <span className="delta up">+8.2%</span>
          </div>
          <div className="stat">
            <span className="label">Conversion</span>
            <span className="value">3.1%</span>
            <span className="delta down">−0.2%</span>
          </div>
          <div className="stat">
            <span className="label">Days to ship</span>
            <span className="value">4.5</span>
            <span className="delta">±0</span>
          </div>
        </div>
        <div className="grid" style={{ "--min": "220px" } as React.CSSProperties}>
          <div className="card">
            <div className="card-head">
              <h3>Beta launch</h3>
              <span className="badge warn">in 5 days</span>
            </div>
            <p className="muted">64 tasks · 41 open</p>
            <div className="progress" style={{ "--value": "64%" } as React.CSSProperties} />
            <div className="card-foot">
              <button className="btn sm ghost">Details</button>
              <button className="btn sm primary">Open</button>
            </div>
          </div>
          <a className="card plain" href="#/content">
            <h3>Clickable card</h3>
            <p className="muted">The whole card is the target. The border goes fg on hover.</p>
          </a>
          <div className="card inverted">
            <h3>Inverted card</h3>
            <p className="muted">For the one thing that must stand apart.</p>
          </div>
        </div>
      </Demo>
      <Demo
        title="Badges, tags, dots, avatars"
        rules="Badges are outlined by default and solid for emphasis. A solid badge with no color is the inverted block, and a palette color via --c marks a category. Tags are removable filters. A dot gives status next to a word, never alone. Avatars are round initials."
      >
        <div className="row wrap">
          <span className="badge">draft</span>
          <span className="badge good">paid</span>
          <span className="badge warn">due</span>
          <span className="badge bad">failed</span>
          <span className="badge info">open</span>
          <span className="badge solid">new</span>
          <span className="badge solid good">live</span>
          <span className="badge" style={{ "--c": "var(--c-violet)" } as React.CSSProperties}>
            violet
          </span>
        </div>
        <div className="row wrap" style={gap("16px")}>
          {tags.map((t) => (
            <span className="tag" key={t}>
              {t}
              <button aria-label={`Remove ${t}`} onClick={() => setTags(tags.filter((x) => x !== t))}>
                <X />
              </button>
            </span>
          ))}
          <span className="row" style={gap("6px")}>
            <span className="dot good live" /> Online
          </span>
          <span className="row" style={gap("6px")}>
            <span className="dot bad" /> Down
          </span>
          <span className="avatars">
            <span className="avatar">mc</span>
            <span className="avatar">al</span>
            <span className="avatar">+3</span>
          </span>
        </div>
      </Demo>
      <Demo
        title="Progress, loading, empty"
        rules={
          <ul>
            <li>Progress is a 4px square bar, colored only when the value has a status. Meters are segmented, like a battery.</li>
            <li>Skeletons match the shape of what's coming, with a slow pulse at most.</li>
            <li>Empty states are muted and centered, with one action at most.</li>
          </ul>
        }
      >
        <div className="grid" style={{ "--min": "260px" } as React.CSSProperties}>
          <div className="stack">
            <div className="progress" style={{ "--value": "72%" } as React.CSSProperties} />
            <div className="progress bad" style={{ "--value": "18%" } as React.CSSProperties} />
            <div className="progress indeterminate" />
            <div className="meter" style={{ width: 200 }}>
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} data-on={i < 7 ? "" : undefined} />
              ))}
            </div>
            <div className="row">
              <span className="spinner" />
              <span className="skeleton grow" />
            </div>
          </div>
          <div className="card plain" style={{ padding: 0 }}>
            <div className="empty">
              <Inbox />
              <strong>Nothing in your inbox</strong>
              <span>Comments on your files show up here.</span>
              <button className="btn sm">Upload files</button>
            </div>
          </div>
        </div>
      </Demo>
      <Demo
        title="Details"
        rules="Key/value lists have muted keys and plain values, for detail panes and metadata. An accordion is details rows divided by lines. A divider can carry a short label."
      >
        <div className="grid" style={{ "--min": "240px" } as React.CSSProperties}>
          <dl className="dl" style={{ alignContent: "start" }}>
            <dt>File</dt>
            <dd>launch-plan.pdf</dd>
            <dt>Owner</dt>
            <dd>Mira Chen</dd>
            <dt>Pages</dt>
            <dd className="mono">24</dd>
          </dl>
          <div className="stack">
            <div className="accordion">
              <details open>
                <summary>Details</summary>
                <p>Three-layer shell, 395 g.</p>
              </details>
              <details>
                <summary>Returns</summary>
                <p>Free within 30 days.</p>
              </details>
            </div>
            <div className="divider">or</div>
          </div>
        </div>
      </Demo>
      <Demo
        title="Messages in the flow"
        rules={
          <ul>
            <li>Callouts sit inline: a colored rule and tint, a bold first line for the point, muted detail after. Neutral when nothing is wrong.</li>
            <li>Banners run full width under the top bar, for app-wide state. Inverted for notices, red for problems.</li>
            <li>Inline status is small and muted, next to the thing it describes. Color only for warnings and errors.</li>
          </ul>
        }
      >
        <div className="stack">
          <div className="callout info">
            <Info />
            <div>
              <strong>3 files are still uploading</strong>They'll appear in the list as they finish.
            </div>
          </div>
          <div className="callout warn">
            <AlertTriangle />
            <div>
              <strong>Section 9 has no owner</strong>Nobody is assigned, so it falls to the project lead.
            </div>
          </div>
          <div className="callout bad">
            <XCircle />
            <div>
              <strong>Transcription failed on 2 pages</strong>Retry, or upload a clearer scan.
            </div>
          </div>
        </div>
        <div className="stack" style={{ ...gap("0"), border: "var(--border) solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden" }}>
          <div className="banner">
            <Info /> <span className="grow">A new version is ready.</span>
            <button className="btn sm">Restart</button>
          </div>
          <div className="banner inverted">
            <span className="grow">You're viewing a shared copy. Changes won't be saved.</span>
          </div>
          <div className="banner bad">
            <XCircle /> <span className="grow">Can't reach the server. Retrying in 30s.</span>
          </div>
        </div>
        <div className="row wrap" style={{ ...gap("16px"), fontSize: "var(--text-sm)" }}>
          <span className="row muted">
            <span className="spinner" /> Uploading 3 of 12 files…
          </span>
          <span className="row" style={{ color: "var(--good)" }}>
            <CheckCircle2 size={14} /> Saved just now
          </span>
          <span className="row" style={{ color: "var(--warn)" }}>
            <AlertTriangle size={14} /> 41 tasks due
          </span>
        </div>
      </Demo>
      <Demo
        title="Chat"
        rules="The user's messages sit right on a surface, and replies sit left on bg, as plain prose. The composer is an autosizing field with its actions on a row inside the border, send rightmost as the primary."
      >
        <div className="stack" style={{ ...gap("10px"), maxWidth: 560 }}>
          <div className="msg user">How fast is heap insert?</div>
          <div className="msg">O(log n): it sifts up one level per swap.</div>
          <div className="composer">
            <textarea rows={1} placeholder="Ask anything" aria-label="Message" />
            <div className="composer-actions">
              <button className="btn ghost icon sm" aria-label="Attach">
                <Paperclip />
              </button>
              <span className="grow" />
              <button className="btn primary icon sm" aria-label="Send">
                <ArrowUp />
              </button>
            </div>
          </div>
        </div>
      </Demo>
    </Page>
  );
}
