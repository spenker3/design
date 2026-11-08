import { useState } from "react";
import { ChevronLeft, ChevronRight, FileText, Inbox, Settings, Star } from "lucide-react";
import { Page, Demo } from "../Demo";
import { Tabs } from "../../components/Choice";

export function Navigation() {
  const [tab, setTab] = useState("tasks");
  const [lined, setLined] = useState("overview");
  const [strip, setStrip] = useState("a");
  const [ws, setWs] = useState(2);
  const [nav, setNav] = useState("inbox");
  const [pg, setPg] = useState(3);
  return (
    <Page title="Navigation" lede="Where you are is always the inverted block: the current tab, page, workspace or step.">
      <Demo
        title="Tabs"
        rules="Arrow keys move between tabs. Lined tabs split a page into sections, and a strip holds document or window tabs."
        spec={
          <ul>
            <li>Cells with no gaps, and the selected cell inverts. Left and right arrows move between them. Counts sit after the label in tabular figures.</li>
            <li>Lined tabs sit on a rule, for sections within a page.</li>
            <li>A strip is full width and flush, and its tabs share the width equally up to half each. For document or window tabs.</li>
            <li>Workspace cells are numbered squares. The current one inverts and empty ones drop to 50%.</li>
          </ul>
        }
      >
        <div className="row wrap" style={{ "--gap": "24px" } as React.CSSProperties}>
          <Tabs
            value={tab}
            onChange={setTab}
            options={[
              { value: "files", label: "Files" },
              { value: "tasks", label: "Tasks", count: 12 },
              { value: "docs", label: "Docs" },
            ]}
          />
          <div className="workspaces">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} aria-current={n === ws ? "true" : undefined} data-empty={n > 3 ? "" : undefined} onClick={() => setWs(n)}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <Tabs
          variant="lined"
          value={lined}
          onChange={setLined}
          options={[
            { value: "overview", label: "Overview" },
            { value: "activity", label: "Activity", count: 4 },
            { value: "settings", label: "Settings" },
          ]}
        />
        <div style={{ border: "var(--border) solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden" }}>
          <Tabs
            variant="strip"
            value={strip}
            onChange={setStrip}
            options={[
              { value: "a", label: "styles.css" },
              { value: "b", label: "App.tsx" },
              { value: "c", label: "README.md" },
            ]}
          />
        </div>
      </Demo>
      <Demo
        title="Sidebar"
        rules="Group labels outrank their items, so they're never small, gray or uppercase. On phones the sidebar slides over the page."
        spec="Icon, label, and a count pushed right. Group labels outrank their items: same size, bold, full text color, sentence case. Never small, gray or uppercase. In an app shell the sidebar sits on a surface beside the main column and slides over the page on phones."
      >
        <nav className="nav" style={{ width: 240 }}>
          {(
            [
              ["inbox", Inbox, "Inbox", 3],
              ["starred", Star, "Starred"],
              ["docs", FileText, "Documents", 128],
            ] as const
          ).map(([k, I, label, n]) => (
            <button key={k} aria-current={nav === k ? "page" : undefined} onClick={() => setNav(k)}>
              <I /> {label}
              {n !== undefined && <span className="count">{n}</span>}
            </button>
          ))}
          <div className="nav-label">Account</div>
          <button aria-current={nav === "settings" ? "page" : undefined} onClick={() => setNav("settings")}>
            <Settings /> Settings
          </button>
        </nav>
      </Demo>
      <Demo title="Top bar" spec="Wordmark, primary tabs, then a spacer, status text and ghost icon actions on the right. One line under it." pad={false}>
        <header className="topbar">
          <span className="wordmark">atlas</span>
          <Tabs
            value={tab}
            onChange={setTab}
            options={[
              { value: "files", label: "Files" },
              { value: "tasks", label: "Tasks" },
              { value: "docs", label: "Docs" },
            ]}
          />
          <span className="spacer" />
          <span className="muted" style={{ fontSize: "var(--text-sm)" }}>
            2 jobs running
          </span>
          <button className="btn ghost icon" aria-label="Settings">
            <Settings />
          </button>
        </header>
        <div style={{ height: 48 }} />
      </Demo>
      <Demo
        title="Breadcrumbs, pagination, steps"
        rules="The last breadcrumb is the current page and isn't a link."
        spec="Breadcrumbs end on the current page, unlinked. Pagination is flush numbered cells with the current one inverted, and an ellipsis for gaps. Steps show done, current and upcoming through a flow."
      >
        <ol className="breadcrumbs">
          <li>
            <a href="#/navigation">Projects</a>
          </li>
          <li>
            <a href="#/navigation">Atlas</a>
          </li>
          <li aria-current="page">Launch plan</li>
        </ol>
        <div className="pagination">
          <button aria-label="Previous" disabled={pg === 1} onClick={() => setPg(pg - 1)}>
            <ChevronLeft />
          </button>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} aria-current={n === pg ? "page" : undefined} onClick={() => setPg(n)}>
              {n}
            </button>
          ))}
          <button disabled>…</button>
          <button onClick={() => setPg(12)} aria-current={pg === 12 ? "page" : undefined}>
            12
          </button>
          <button aria-label="Next" disabled={pg === 12} onClick={() => setPg(pg + 1)}>
            <ChevronRight />
          </button>
        </div>
        <ol className="steps">
          <li data-state="done">Upload</li>
          <li data-state="done">Check</li>
          <li aria-current="step">Review</li>
          <li>Publish</li>
        </ol>
      </Demo>
    </Page>
  );
}
