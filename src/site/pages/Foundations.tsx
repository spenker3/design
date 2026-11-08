import { Page, Demo } from "../Demo";

const gap = (v: string) => ({ "--gap": v }) as React.CSSProperties;

function Swatches({ names }: { names: string[] }) {
  return (
    <div className="swatches">
      {names.map((n) => (
        <div className="swatch" key={n}>
          <div className="chip" style={{ background: `var(--${n})` }} />
          <code>--{n}</code>
        </div>
      ))}
    </div>
  );
}

const scale: [string, React.CSSProperties][] = [
  ["3xl / 56", { fontSize: "var(--text-3xl)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }],
  ["2xl / 36", { fontSize: "var(--text-2xl)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }],
  ["xl / 26", { fontSize: "var(--text-xl)", fontWeight: 700, letterSpacing: "-0.02em" }],
  ["lg / 20", { fontSize: "var(--text-lg)", fontWeight: 600 }],
  ["md / 16", { fontSize: "var(--text-md)" }],
  ["base / 14", { fontSize: "var(--text-base)" }],
  ["sm / 12.5", { fontSize: "var(--text-sm)" }],
  ["xs / 11", { fontSize: "var(--text-xs)" }],
];

const space = [2, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96];

export function Foundations() {
  return (
    <Page
      title="Foundations"
      lede="Color, type and space. Every value is a token in tokens.css, set for light and dark together. Switch the theme in the top bar to check both."
    >
      <Demo
        title="Ground and text"
        rules={
          <ul>
            <li>bg and fg are pure white and black. Surfaces step toward fg for raised or grouped areas, one step per level.</li>
            <li>line for edges, line-strong for edges that must hold up next to a surface.</li>
            <li>text for body, muted for secondary, faint for disabled, placeholders and labels that should recede.</li>
          </ul>
        }
      >
        <Swatches names={["bg", "surface", "surface-2", "surface-3", "line", "line-strong", "fg"]} />
        <div className="stack" style={gap("6px")}>
          <p style={{ color: "var(--text)" }}>--text: The quick brown fox jumps over the lazy dog.</p>
          <p style={{ color: "var(--muted)" }}>--muted: The quick brown fox jumps over the lazy dog.</p>
          <p style={{ color: "var(--faint)" }}>--faint: The quick brown fox jumps over the lazy dog.</p>
        </div>
      </Demo>
      <Demo
        title="Selection"
        rules="sel-bg and sel-fg are fg and bg swapped. Anything current or chosen uses them instead of an accent color. Empty or unused items drop to 50%."
      >
        <div className="row wrap">
          <span className="sel-sample">Selected</span>
          <span className="muted">Not selected</span>
          <span style={{ opacity: 0.5 }}>Empty / unused (50%)</span>
        </div>
      </Demo>
      <Demo
        title="Meaning and palette"
        rules={
          <ul>
            <li>good, warn, bad and info carry status. Each has a tint for the background behind it. Dark values are lighter so they hold contrast on black.</li>
            <li>The palette is for categories and tags, always in this order so a category keeps its color across views. Chart series use their own order.</li>
          </ul>
        }
      >
        <Swatches names={["good", "warn", "bad", "info", "good-tint", "warn-tint", "bad-tint", "info-tint"]} />
        <Swatches names={["c-red", "c-orange", "c-yellow", "c-green", "c-cyan", "c-blue", "c-violet", "c-magenta"]} />
      </Demo>
      <Demo
        title="Type"
        rules={
          <ul>
            <li>Helvetica (Nimbus Sans or TeX Gyre Heros on Linux) for everything. 14px is the UI base and 16px is for reading.</li>
            <li>Large sizes tighten their tracking. Hierarchy comes from size and weight, never color alone.</li>
            <li>h1–h3 step down by size, and h4 is the small muted section label.</li>
            <li>400 for body, 500 for controls, 600 for emphasis and headings, 700 for display.</li>
          </ul>
        }
      >
        <div>
          {scale.map(([name, style]) => (
            <div className="specimen" key={name}>
              <code>{name}</code>
              <span style={style}>Monochrome by default</span>
            </div>
          ))}
        </div>
      </Demo>
      <Demo
        title="Mono"
        rules="Geist Mono for anything typed or read by a machine: commands, file names, tokens, values. Keys are kbd, joined by a space. Numbers that must line up are mono and tabular. Paths can drop the background with code.path."
      >
        <div className="stack" style={gap("10px")}>
          <p>
            Run <code>npm run build</code>, then open <code className="path">src/design/tokens.css</code> and change{" "}
            <code className="token">--radius</code>.
          </p>
          <p>
            Press <kbd>Ctrl</kbd> <kbd>K</kbd> for the palette, <kbd>/</kbd> to search, <kbd>Esc</kbd> to close.
          </p>
          <div className="mono num">
            1,204.00
            <br />
            &nbsp;&nbsp;&nbsp;87.50
            <br />
            12,990.25
          </div>
        </div>
      </Demo>
      <Demo
        title="Space and size"
        rules={
          <ul>
            <li>A 4px rhythm, with 2 and 6 for tight UI. Components carry no outer margin, and layouts (.stack, .row, .grid) set --gap.</li>
            <li>Use 8–12 inside controls and groups, 16–24 between groups, 48+ between page sections.</li>
            <li>Controls are 32px (26 small, 40 large), and 44px on touch screens. Pages max out at 1120px and reading text at 68ch.</li>
          </ul>
        }
      >
        <div className="row wrap" style={{ ...gap("12px"), alignItems: "flex-end" }}>
          {space.map((px) => (
            <div className="stack" style={{ ...gap("6px"), alignItems: "center" }} key={px}>
              <span style={{ width: Math.min(px, 48), height: px, background: "var(--fg)" }} />
              <span className="mono faint" style={{ fontSize: 11 }}>
                {px}
              </span>
            </div>
          ))}
        </div>
      </Demo>
      <Demo
        title="Shape and elevation"
        rules={
          <ul>
            <li>4px corners everywhere, 2px for small parts inside controls (checkboxes, badges, kbd). Round only for avatars, dots and radios.</li>
            <li>No shadows. Raised areas use a surface fill. Overlays get a 1px fg border, and modals add a light scrim.</li>
          </ul>
        }
      >
        <div className="row wrap" style={gap("16px")}>
          <div className="card plain" style={{ width: 160 }}>
            <strong>Flat</strong>
            <span className="muted">bg + line</span>
          </div>
          <div className="card" style={{ width: 160 }}>
            <strong>Raised</strong>
            <span className="muted">surface + line</span>
          </div>
          <div className="card plain" style={{ width: 160, borderColor: "var(--fg)" }}>
            <strong>Overlay</strong>
            <span className="muted">bg + fg border</span>
          </div>
          <div className="card inverted" style={{ width: 160 }}>
            <strong>Inverted</strong>
            <span className="muted">fg fill</span>
          </div>
          <div className="row" style={gap("12px")}>
            <span className="badge">2px</span>
            <span className="avatar">mc</span>
          </div>
        </div>
      </Demo>
    </Page>
  );
}
