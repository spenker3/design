import { useState } from "react";
import { Bold, Check, Copy, Download, Italic, Plus, Search, Trash2, Underline, Upload, X } from "lucide-react";
import { Page, Demo } from "../Demo";
import { Segmented } from "../../components/Choice";

const gap = (v: string) => ({ "--gap": v }) as React.CSSProperties;

export function Controls() {
  const [busy, setBusy] = useState(false);
  const [marks, setMarks] = useState({ b: true, i: false, u: false });
  const [q, setQ] = useState("");
  const [view, setView] = useState("list");
  const [range, setRange] = useState(40);
  const [size, setSize] = useState("M");
  const [swatch, setSwatch] = useState(1);
  const [over, setOver] = useState(false);
  return (
    <Page title="Controls" lede="Everything you press, type into, or pick from. Secondary is the default, and whatever is chosen or primary is the inverted block.">
      <Demo
        title="Buttons"
        rules={
          <ul>
            <li>
              <b>Primary</b>: the one thing to do here. Inverted block, once per region, rightmost.
            </li>
            <li>
              <b>Secondary</b> (default): everything else. bg with a strong line.
            </li>
            <li>
              <b>Ghost</b>: toolbars and dense rows, where chrome would be noise.
            </li>
            <li>
              <b>Danger</b>: destructive. Red until hovered, then filled.
            </li>
            <li>
              <b>Colored</b>: when color carries meaning, like Approve or Info.
            </li>
            <li>Disabled drops to 45%. Never disable without saying why nearby.</li>
          </ul>
        }
      >
        <div className="row wrap">
          <button className="btn primary">Save changes</button>
          <button className="btn">Cancel</button>
          <button className="btn ghost">Skip</button>
          <button className="btn danger">
            <Trash2 /> Delete
          </button>
          <button className="btn good">
            <Check /> Approve
          </button>
          <button className="btn info">Details</button>
          <button className="btn" disabled>
            Disabled
          </button>
        </div>
      </Demo>
      <Demo
        title="Sizes, icons and busy"
        rules={
          <ul>
            <li>sm in dense rows and toolbars, default everywhere else, lg for page-level calls to action. Touch screens raise all of them.</li>
            <li>Icons are 16px lucide at 1.75 stroke, before the label. The shortcut sits in a kbd after it. Icon-only buttons need aria-label and a tooltip.</li>
            <li>Busy keeps the button's width and swaps the label for a spinner.</li>
          </ul>
        }
      >
        <div className="row wrap">
          <button className="btn sm">Small</button>
          <button className="btn">Default</button>
          <button className="btn lg">Large</button>
          <button className="btn primary">
            <Plus /> New file <kbd>N</kbd>
          </button>
          <button className="btn">
            <Download /> Export
          </button>
          <button className="btn icon" aria-label="Copy" data-tip="Copy">
            <Copy />
          </button>
          <button
            className="btn primary"
            aria-busy={busy}
            onClick={() => {
              setBusy(true);
              setTimeout(() => setBusy(false), 1500);
            }}
          >
            Submit
          </button>
        </div>
      </Demo>
      <Demo
        title="Groups, toggles and links"
        rules="Joined buttons sit flush, edge to edge. A pressed ghost toggle inverts, like any selection. Text links underline with a quiet line that darkens on hover, and .link makes a button look like one."
      >
        <div className="row wrap" style={gap("16px")}>
          <div className="btn-group">
            <button className="btn">Day</button>
            <button className="btn">Week</button>
            <button className="btn">Month</button>
          </div>
          <div className="row" style={gap("2px")}>
            {(
              [
                ["b", Bold],
                ["i", Italic],
                ["u", Underline],
              ] as const
            ).map(([k, Icon]) => (
              <button
                key={k}
                className="btn ghost icon"
                aria-label={k}
                aria-pressed={marks[k]}
                onClick={() => setMarks({ ...marks, [k]: !marks[k] })}
              >
                <Icon />
              </button>
            ))}
          </div>
          <span>
            Read the <a href="#/controls">changelog</a> or <button className="link">undo</button>.
          </span>
        </div>
      </Demo>
      <Demo
        title="Text fields"
        rules={
          <ul>
            <li>Fields sit on a surface fill and turn bg with a fg border when focused.</li>
            <li>Bold label above, help below, and an error replaces the help in red. Mark optional fields, not required ones.</li>
            <li>Icons, prefixes and keys go inside the border. Search shows its shortcut until you type, then a clear button.</li>
          </ul>
        }
      >
        <div className="grid" style={{ "--min": "240px" } as React.CSSProperties}>
          <div className="field">
            <label htmlFor="f-name">
              Name <span className="optional">optional</span>
            </label>
            <input id="f-name" className="input" placeholder="Mira Chen" />
            <span className="help">As it should appear on invoices.</span>
          </div>
          <div className="field">
            <label htmlFor="f-email">Email</label>
            <input id="f-email" className="input" defaultValue="mira@" aria-invalid="true" />
            <span className="error">Enter a full email address.</span>
          </div>
          <div className="field">
            <label htmlFor="f-sel">Role</label>
            <select id="f-sel" className="input">
              <option>Owner</option>
              <option>Editor</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-dis">Workspace</label>
            <input id="f-dis" className="input" defaultValue="personal" disabled />
          </div>
          <label className="input input-group">
            <Search />
            <input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
            {q ? (
              <button className="btn ghost icon sm" aria-label="Clear" onClick={() => setQ("")}>
                <X />
              </button>
            ) : (
              <kbd>/</kbd>
            )}
          </label>
          <label className="input input-group">
            <span className="affix">https://</span>
            <input placeholder="example.com" />
          </label>
        </div>
        <textarea className="input code" aria-label="Config" defaultValue={'[server]\nport = 4680\nhost = "127.0.0.1"'} />
      </Demo>
      <Demo
        title="Checks, radios, switches"
        rules="Checked is the inverted block. Use a switch for settings that apply at once, a checkbox for choices submitted with a form, and radios for one of a few options with room to explain each."
      >
        <div className="grid" style={{ "--min": "200px" } as React.CSSProperties}>
          <fieldset className="stack" style={gap("10px")}>
            <legend>Notify me about</legend>
            <label className="choice">
              <input type="checkbox" className="check" defaultChecked /> Mentions
            </label>
            <label className="choice">
              <input type="checkbox" className="check" /> All activity
            </label>
            <label className="choice">
              <input type="checkbox" className="check" disabled /> Disabled
            </label>
          </fieldset>
          <fieldset className="stack" style={gap("10px")}>
            <legend>Plan</legend>
            <label className="choice">
              <input type="radio" name="plan" className="radio" defaultChecked />
              <span>
                Personal<span className="help">One user, local only.</span>
              </span>
            </label>
            <label className="choice">
              <input type="radio" name="plan" className="radio" />
              <span>
                Team<span className="help">Shared workspaces and roles.</span>
              </span>
            </label>
          </fieldset>
          <fieldset className="stack" style={gap("10px")}>
            <legend>Settings</legend>
            <label className="choice">
              <input type="checkbox" role="switch" className="switch" defaultChecked /> Sync on launch
            </label>
            <label className="choice">
              <input type="checkbox" role="switch" className="switch" /> Compact rows
            </label>
          </fieldset>
        </div>
      </Demo>
      <Demo
        title="Picking a value"
        rules={
          <ul>
            <li>Segmented for 2–5 exclusive options that change a view.</li>
            <li>Range for continuous values, with the number beside it in mono.</li>
            <li>Cells for a grid of discrete options like sizes or dates. The chosen cell inverts and unavailable ones are disabled.</li>
            <li>Swatches pick a color. The chosen one gets an fg ring, since its fill is already the color.</li>
          </ul>
        }
      >
        <div className="row wrap" style={gap("24px")}>
          <Segmented
            label="View"
            value={view}
            onChange={setView}
            options={[
              { value: "list", label: "List" },
              { value: "board", label: "Board" },
              { value: "graph", label: "Graph" },
            ]}
          />
          <div className="row" style={{ minWidth: 200 }}>
            <input
              type="range"
              className="range"
              value={range}
              aria-label="Amount"
              style={{ "--fill": `${range}%` } as React.CSSProperties}
              onChange={(e) => setRange(+e.target.value)}
            />
            <span className="mono num" style={{ width: 28, textAlign: "right" }}>
              {range}
            </span>
          </div>
          <div className="cells" style={{ width: 300 }}>
            {["S", "M", "L", "XL"].map((s) => (
              <button key={s} aria-pressed={size === s} onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
            <button disabled>XXL</button>
          </div>
          <div className="swatches-pick">
            {["--fg", "--c-blue", "--c-orange", "--c-green", "--c-violet"].map((c, i) => (
              <button
                key={c}
                aria-label={c}
                aria-pressed={swatch === i}
                style={{ "--c": `var(${c})` } as React.CSSProperties}
                onClick={() => setSwatch(i)}
              />
            ))}
          </div>
        </div>
      </Demo>
      <Demo
        title="Special inputs"
        rules={
          <ul>
            <li>A drop zone is a dashed line that turns fg while a file is over it. Always offer a button too.</li>
            <li>A one-time code is one box per digit, in mono.</li>
            <li>Mini fields are compact labeled numbers for inspectors: the label faint inside the box.</li>
          </ul>
        }
      >
        <div
          className={over ? "dropzone over" : "dropzone"}
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
          }}
        >
          <Upload />
          <span>
            <strong>Drop files here</strong> or
          </span>
          <button className="btn sm">Choose files</button>
          <span className="faint" style={{ fontSize: "var(--text-xs)" }}>
            PDF, PNG, JPG up to 50 MB
          </span>
        </div>
        <div className="row wrap" style={gap("24px")}>
          <div className="otp">
            {[4, 8, 1, "", "", ""].map((d, i) => (
              <input key={i} defaultValue={d} maxLength={1} aria-label={`Digit ${i + 1}`} style={{ width: 36, height: 44 }} />
            ))}
          </div>
          <div className="panel-row" style={{ width: 260 }}>
            {[
              ["X", "120"],
              ["Y", "96"],
            ].map(([k, v]) => (
              <label className="mini-field" key={k}>
                <span>{k}</span>
                <input defaultValue={v} />
              </label>
            ))}
          </div>
        </div>
      </Demo>
      <Demo title="Form layout" rules="On wide screens, a label column beside the controls, stacked on phones. One primary action, rightmost, at the end.">
        <div className="form-grid">
          <span className="label">Display name</span>
          <input className="input" defaultValue="mira" />
          <span className="label">Updates</span>
          <label className="choice">
            <input type="checkbox" role="switch" className="switch" defaultChecked /> Install automatically
          </label>
          <span />
          <div className="row end">
            <button className="btn">Reset</button>
            <button className="btn primary">Save</button>
          </div>
        </div>
      </Demo>
    </Page>
  );
}
