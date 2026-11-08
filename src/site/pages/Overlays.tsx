import { useEffect, useState } from "react";
import { ChevronDown, Circle, Copy, FileText, Hand, Minus, MousePointer2, Pencil, Plus, Search, Settings, Share, Square, Trash2, Type } from "lucide-react";
import { Page, Demo } from "../Demo";
import { Dialog } from "../../components/Dialog";
import { Menu } from "../../components/Menu";
import { useToast } from "../../components/Toast";

const commands = [
  { icon: FileText, label: "New document", key: "N" },
  { icon: Search, label: "Search everything", key: "/" },
  { icon: Share, label: "Share…" },
  { icon: Settings, label: "Open settings", key: "," },
];

export function Overlays() {
  const toast = useToast();
  const [dialog, setDialog] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [palette, setPalette] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const [tool, setTool] = useState("select");
  const [page, setPage] = useState(0);
  const found = commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPalette(true);
      }
    };
    addEventListener("keydown", on);
    return () => removeEventListener("keydown", on);
  }, []);

  return (
    <Page
      title="Overlays"
      lede="Transient layers take an fg border, and chrome that stays on screen takes the strong line. No shadows."
    >
      <Demo title="Menu" rules="Destructive items go last, under a rule."
        spec="Opens under its trigger. The hover or keyboard cursor is the inverted block. Shortcuts sit on the right, and destructive items go last, in red, under a rule.">
        <div className="row wrap">
          <Menu
            trigger={(p) => (
              <button className="btn" {...p}>
                Actions <ChevronDown />
              </button>
            )}
          >
            <button>
              <Pencil /> Rename <kbd>R</kbd>
            </button>
            <button>
              <Copy /> Duplicate <kbd>D</kbd>
            </button>
            <div className="menu-label">Share</div>
            <button>
              <Share /> Copy link
            </button>
            <hr />
            <button className="danger">
              <Trash2 /> Delete <kbd>⌫</kbd>
            </button>
          </Menu>
        </div>
      </Demo>
      <Demo
        title="Dialog and sheet"
        rules="Confirm only what can't be undone, and focus the safe choice. Otherwise act and offer Undo. A sheet keeps the list behind it in place."
        spec={
          <ul>
            <li>A dialog has a title, a body, and actions on a line at the bottom with the primary rightmost. Esc or a click outside closes.</li>
            <li>Confirm only what can't be undone, and focus the safe choice. Otherwise act and offer Undo.</li>
            <li>A sheet is a side panel over the page for details or settings, so the list behind stays in place.</li>
          </ul>
        }
      >
        <div className="row wrap">
          <button className="btn" onClick={() => setDialog(true)}>
            Open dialog
          </button>
          <button className="btn danger" onClick={() => setConfirm(true)}>
            Delete project
          </button>
          <button className="btn" onClick={() => setSheet(true)}>
            Open sheet
          </button>
        </div>
        <Dialog
          open={dialog}
          onClose={() => setDialog(false)}
          title="New milestone"
          footer={
            <>
              <button className="btn" onClick={() => setDialog(false)}>
                Cancel
              </button>
              <button className="btn primary" onClick={() => setDialog(false)}>
                Create
              </button>
            </>
          }
        >
          <div className="field">
            <label htmlFor="d-name">Name</label>
            <input id="d-name" className="input" placeholder="Beta launch" autoFocus />
          </div>
        </Dialog>
        <Dialog
          open={confirm}
          onClose={() => setConfirm(false)}
          title="Delete Atlas?"
          footer={
            <>
              <button className="btn" onClick={() => setConfirm(false)} autoFocus>
                Keep it
              </button>
              <button className="btn danger" onClick={() => setConfirm(false)}>
                Delete forever
              </button>
            </>
          }
        >
          <p className="muted">Every file, task and comment goes, including the project's history. This can't be undone.</p>
        </Dialog>
        <Dialog open={sheet} onClose={() => setSheet(false)} title="Launch plan" className="sheet">
          <dl className="dl">
            <dt>Phase</dt>
            <dd>Beta</dd>
            <dt>Files</dt>
            <dd>3</dd>
            <dt>Tasks</dt>
            <dd>14</dd>
          </dl>
        </Dialog>
      </Demo>
      <Demo title="Command palette" rules="Opens with Ctrl/⌘ K from anywhere."
        spec="Ctrl/⌘+K anywhere. Search field on top, results below with the cursor inverted, key hints in the footer.">
        <div>
          <button className="btn" onClick={() => setPalette(true)}>
            <Search /> Open palette <kbd>Ctrl K</kbd>
          </button>
        </div>
        <Dialog open={palette} onClose={() => setPalette(false)} className="dialog palette">
          <label className="input input-group">
            <Search />
            <input
              autoFocus
              placeholder="Type a command"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setCursor(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") setCursor((cursor + 1) % Math.max(found.length, 1));
                if (e.key === "ArrowUp") setCursor((cursor - 1 + found.length) % Math.max(found.length, 1));
                if (e.key === "Enter") setPalette(false);
              }}
            />
          </label>
          <div className="results menu" style={{ position: "static", border: "none" }}>
            {found.map((c, i) => (
              <button key={c.label} aria-selected={i === cursor} onMouseEnter={() => setCursor(i)} onClick={() => setPalette(false)}>
                <c.icon /> {c.label} {c.key && <kbd>{c.key}</kbd>}
              </button>
            ))}
            {!found.length && <div className="empty">No commands match.</div>}
          </div>
          <div className="palette-foot">
            <span>
              <kbd>↑</kbd> <kbd>↓</kbd> move
            </span>
            <span>
              <kbd>↵</kbd> run
            </span>
            <span>
              <kbd>esc</kbd> close
            </span>
          </div>
        </Dialog>
      </Demo>
      <Demo
        title="Toasts and tooltips"
        rules="Toasts leave after 4s and offer Undo instead of asking to confirm. Never put anything needed only in a tooltip."
        spec={
          <ul>
            <li>Toasts sit bottom right (full width on phones), four at most, gone after 4s. A dot gives the tone. Offer Undo instead of asking to confirm.</li>
            <li>Tooltips are for icon-only buttons and truncated text. Inverted, small, after a short delay. Never put anything needed only in a tooltip.</li>
          </ul>
        }
      >
        <div className="row wrap">
          <button className="btn" onClick={() => toast("Exported 24 rows", { tone: "good" })}>
            Success
          </button>
          <button className="btn" onClick={() => toast("Deleted 3 files", { action: { label: "Undo", run: () => toast("Restored") } })}>
            With undo
          </button>
          <button className="btn" onClick={() => toast("Upload failed: file too large", { tone: "bad" })}>
            Error
          </button>
          <button className="btn icon" aria-label="Copy" data-tip="Copy link">
            <Copy />
          </button>
        </div>
      </Demo>
      <Demo
        title="Floating chrome"
        rules="For work surfaces. The canvas dots pan and zoom with the content."
        spec={
          <ul>
            <li>Work surfaces put their chrome over a dotted canvas, whose dots pan and zoom with the content: a tool rail, an inspector panel and a page dock. All are bg with line-strong, since they stay on screen.</li>
            <li>The pressed tool and the current page invert. The panel splits into labeled sections divided by lines.</li>
          </ul>
        }
        pad={false}
      >
        <div className="canvas" style={{ position: "relative", height: 260 }}>
          <div className="toolbar vertical" style={{ position: "absolute", left: 12, top: 12 }}>
            {(
              [
                ["select", MousePointer2],
                ["hand", Hand],
                ["rect", Square],
                ["ellipse", Circle],
                ["text", Type],
              ] as const
            ).map(([k, I]) => (
              <button key={k} className="btn ghost icon" aria-label={k} aria-pressed={tool === k} onClick={() => setTool(k)}>
                <I />
              </button>
            ))}
          </div>
          <div className="panel" style={{ position: "absolute", right: 12, top: 12, width: 200 }}>
            <div className="panel-section">
              <h4>Fill</h4>
              <div className="swatches-pick">
                {["--fg", "--c-blue", "--c-orange"].map((c, i) => (
                  <button key={c} aria-label={c} aria-pressed={i === 1} style={{ "--c": `var(${c})` } as React.CSSProperties} />
                ))}
              </div>
            </div>
            <div className="panel-section">
              <h4>Layers</h4>
              <div className="nav">
                <button aria-current="page">Card</button>
                <button>Title</button>
              </div>
            </div>
          </div>
          <div className="dock" style={{ position: "absolute", left: "50%", bottom: 12, transform: "translateX(-50%)" }}>
            {[1, 2, 3].map((n, i) => (
              <button key={n} className="dock-page" aria-pressed={page === i} onClick={() => setPage(i)}>
                {n}
              </button>
            ))}
            <hr className="dock-sep" />
            <button className="btn ghost icon sm" aria-label="Zoom out">
              <Minus />
            </button>
            <span className="num" style={{ fontSize: 12 }}>
              100%
            </span>
            <button className="btn ghost icon sm" aria-label="Zoom in">
              <Plus />
            </button>
          </div>
        </div>
      </Demo>
    </Page>
  );
}
