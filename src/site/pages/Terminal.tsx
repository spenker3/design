import { Page, Demo } from "../Demo";
import { Tty, box, beside, fit, hints, row, spread, type Line } from "../Tty";

/* ---------- basics ---------- */

const roles: Line[] = [
  [["Text", ""], "  ", ["Dim", "dim"], "  ", ["Bright black", "dark"], "    ", [" Reverse ", "rev"], "    ", ["● ", "green"], "good  ", ["● ", "yellow"], "warn  ", ["● ", "red"], "bad  ", ["● ", "blue"], "info"],
  [["──────────────────────────────────────────────────────────────────────", "dark"]],
  [["Tags   ", "dim"], ["red", "red"], " ", ["yellow", "yellow"], " ", ["green", "green"], " ", ["cyan", "cyan"], " ", ["blue", "blue"], " ", ["magenta", "magenta"], ["    Series  ", "dim"], ["━━ ", "blue"], ["━━ ", "yellow"], ["━━ ", "magenta"], ["━━", "cyan"]],
];

const glyphs: Line[] = [
  [["Bold", "b"], "          titles, headers, keys in hints, the current item"],
  [["Dim", "dim"], "           secondary text, hint labels, units"],
  [["Bright black", "dark"], "  lines, placeholders, disabled, empty"],
  [[" Reverse ", "rev"], "     the inverted block"],
  [["Underline", "u"], "     links only"],
  [],
  [["Lines     ", "dim"], ["┌─┬─┐ ├─┼─┤ └─┴─┘ │", "dark"]],
  [["Status    ", "dim"], ["● ", "green"], "ok  ", ["● ", "yellow"], "slow  ", ["● ", "red"], "down  ", ["○ ", "dark"], "off"],
  [["Choice    ", "dim"], "[x] [ ] (•) ( )"],
  [["Progress  ", "dim"], "━━━━━━━━━━", ["──────", "dark"], "  ⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏"],
  [["Data      ", "dim"], "▁▂▃▄▅▆▇█  ▏▎▍▌▋▊▉█"],
  [["Text      ", "dim"], "… · › ▌   ↑ ↓ ← → ↵ ⇥ esc ctrl-k"],
  [["Never     ", "dim"], ["╭─╮ rounded  ═══ double  ┏━┓ heavy  emoji  icon fonts", "dark"]],
];

/* The focused pane's cursor is reversed, and the other pane keeps its place in bold. */
const list = (items: [string, string][], at: number, focused: boolean, w: number): Line[] =>
  items.map(([name, n], i) => {
    const l = spread([name], [[n, i === at ? "" : "dim"]], w);
    if (i !== at) return l;
    return focused ? row(l, w, "rev") : row(l, w, "b");
  });

const panes = beside(
  2,
  box(list([["Inbox", "12"], ["Drafts", "3"], ["Sent", "248"], ["Archive", "1,024"]], 0, false, 18), 22, { title: "Folders" }),
  box(
    [
      ...list(
        [
          ["Mira Chen  Draft for Friday", "09:41"],
          ["Ops  Deploy finished in 4m", "09:12"],
          ["Billing  Receipt for October", "Sun"],
        ],
        1,
        true,
        40,
      ),
      [["Calendar  Nothing new this week", "dark"]],
    ],
    44,
    { title: "Inbox", edge: "" },
  ),
);

/* ---------- components ---------- */

const W = 64;
/* Name and status left-aligned, dates and numbers right-aligned, two cells apart. */
const cells = (name: string, status: Line, deployed: string, p50: string, a = ""): Line => [
  [name.padEnd(22), a],
  "  ",
  ...fit(status, 14),
  "  ",
  [deployed.padStart(8), a || "dim"],
  "  ",
  [p50.padStart(8), a],
];
const table: Line[] = [
  [[" 1 Services ", "rev"], "  ", ["2 ", "dim"], "Deploys  ", ["3 ", "dim"], "Logs"],
  [["─".repeat(W), "dark"]],
  row(["Service".padEnd(24), "Status".padEnd(16), "Deployed".padStart(8), "  ", "p50".padStart(8)], W, "b dim"),
  fit(cells("api-gateway", [["● ", "green"], "running"], "14 Oct", "38 ms"), W),
  row(cells("billing", ["● deploying"], "12 Oct", "61 ms", " "), W, "rev"),
  fit(cells("search", [["● ", "yellow"], "degraded"], "11 Oct", "412 ms"), W),
  fit(cells("legacy-sync", [["○ stopped", "dark"]], "09 Oct", "—", "dark"), W),
];

const fields = beside(
  4,
  [...box([[["Mira Chen", ""]]], 30, { title: "Name" }), ...box([["mira@", ["▌", "rev"]]], 30, { title: "Email", edge: "" })],
  [fit([["Sync", "b"]], 20), ["[x] Files"], row(["[ ] Notes"], 20, "rev"), [], [["Theme", "b"]], ["(•) System"], ["( ) Dark"]],
);

const feedback: Line[] = [
  spread([["⠹ ", ""], "Uploading 3 of 12 files"], [["25%", "dim"]], W),
  ["━━━━━━━━━━━━━━━━", ["────────────────────────────────────────────────", "dark"]],
  [],
  [["─".repeat(W), "dark"]],
  fit([["● ", "green"], "Exported 24 rows to ~/report.csv"], W),
  [["─".repeat(W), "dark"]],
  fit(["Deleted 3 files  ", ["u", "b"], " ", ["undo", "dim"]], W),
];

const menu = box(
  [
    spread(["Open"], [["↵", "dim"]], 22),
    row(spread(["Rename"], ["r"], 22), 22, "rev"),
    spread(["Duplicate"], [["d", "dim"]], 22),
    [["─".repeat(22), "dark"]],
    spread([["Delete", "red"]], [["x", "dim"]], 22),
  ],
  26,
  { edge: "" },
);
const dialog = box(
  [["Delete 3 services? Their logs"], ["go with them."], [], spread([], [["esc", "b"], [" Cancel  ", "dim"], [" Delete ", "rev red"]], 32)],
  36,
  { title: "Delete services", edge: "", pad: 1 },
);

const charts: Line[] = [
  spread([["Requests / min", "b"]], [["1,284", ""]], 40),
  ["▂▃▃▄▅▅▆▇▆▅▄▄▅▆▇██▇▆▅▄▃▃▂▂▃▄▅▆▇▇▆▅▄▃▂▂▁▁"],
  [],
  [["api       ", "dim"], ["█████████████████▌", "blue"], ["  412", ""]],
  [["search    ", "dim"], ["██████▊", "yellow"], ["             156", ""]],
  [["billing   ", "dim"], ["███▏", "magenta"], ["                 73", ""]],
];

/* ---------- screens ---------- */

const AW = 92;
const services: [string, string, string, string][] = [
  ["api-gateway", "running", "green", "38 ms"],
  ["search", "degraded", "yellow", "412 ms"],
  ["billing", "deploying", "blue", "61 ms"],
  ["auth", "running", "green", "24 ms"],
  ["webhooks", "down", "red", "—"],
  ["legacy-sync", "stopped", "", "—"],
];
const LW = 48;
const listPane = box(
  [
    row([`${"Service".padEnd(17)}${"Status".padEnd(13)}${"p50".padStart(LW - 34)}`], LW - 4, "b dim"),
    ...services.map(([n, st, c, p], i): Line => {
      const l: Line = [n.padEnd(17), [st === "stopped" ? "○ " : "● ", c || "dark"], [st.padEnd(11), c ? "" : "dark"], p.padStart(LW - 34)];
      return i === 1 ? row([n.padEnd(17), "● ", st.padEnd(11), p.padStart(LW - 34)], LW - 4, "rev") : fit(l, LW - 4);
    }),
  ],
  LW,
  { title: "Services", edge: "", h: 10 },
);
const DW = AW - LW - 2;
const detail = box(
  [
    [["search", "b"]],
    [["3 replicas · eu-west · v2.14.0", "dim"]],
    [],
    spread([["p50", "dim"]], ["412 ms"], DW - 4),
    spread([["Errors", "dim"]], ["2.1%"], DW - 4),
    [],
    ["▁▁▁▁▁▁▂▁▁▁▁▂▂▂▃▃▃▄▄▄▅▅▅▅▆▆▆▆▆▇▇▇▇▇▇▇▇▇"],
  ],
  DW,
  { title: "Detail", h: 10 },
);
const app: Line[] = [
  spread(
    [["ops", "b"], "   ", [" 1 Services ", "rev"], "  ", ["2 ", "dim"], "Deploys  ", ["3 ", "dim"], "Logs  ", ["4 ", "dim"], "Alerts"],
    [["● ", "green"], ["live", "dim"], "  ", ["12:04:31", "dim"]],
    AW,
  ),
  [],
  ...beside(2, listPane, detail),
  [["─".repeat(AW), "dark"]],
  hints(["↑↓", "move"], ["⇥", "pane"], ["↵", "open"], ["/", "search"], ["?", "keys"], ["q", "quit"]),
];

const narrow: Line[] = [
  spread([["ops", "b"], "  ", [" 1 Services ", "rev"], "  ", ["2", "dim"], " ", ["3", "dim"], " ", ["4", "dim"]], [["● ", "green"]], 44),
  [],
  row(["Service".padEnd(28) + "p50".padStart(7)], 44, "b dim"),
  fit(["api-gateway".padEnd(28) + "38 ms".padStart(7)], 44),
  row(["search".padEnd(28) + "412 ms".padStart(7)], 44, "rev"),
  fit(["billing".padEnd(28) + "61 ms".padStart(7)], 44),
  [["─".repeat(44), "dark"]],
  hints(["↑↓", "move"], ["↵", "open"], ["?", "keys"], ["q", "quit"]),
];

const keyRows: [string, string, string, string][] = [
  ["↑↓ j k", "Move", "/", "Search"],
  ["← → h l", "Pane or column", "n N", "Next or previous match"],
  ["⇥ ⇧⇥", "Next or previous pane", "ctrl-k :", "Commands"],
  ["1–4", "Go to tab", "u", "Undo"],
  ["esc", "Back or close", "?", "This list"],
  ["g G", "First or last", "q", "Quit"],
];
const help = box(
  keyRows.map(([k1, l1, k2, l2]): Line => [[k1.padEnd(9), "b"], l1.padEnd(24), [k2.padEnd(10), "b"], l2]),
  70,
  { title: "Keys", edge: "", h: 8 },
);

export function Terminal() {
  return (
    <Page
      title="Terminal"
      lede="The same language on a grid of cells. Ink and paper become the terminal's own colors, selection becomes reverse video, and lines stay square and thin."
    >
      <Demo
        title="Roles in a terminal"
        rules={
          <ul>
            <li><b>Paper and ink</b>: the terminal's default bg and fg (reset). Never paint a background on the screen or a pane.</li>
            <li><b>Surface</b>: none. Cells can't promise a gray, so group with a line or a blank row instead.</li>
            <li><b>Edge</b>: bright black lines. The focused pane and overlays take the default fg.</li>
            <li><b>Text</b>: default for content, dim for secondary, bright black for receding (placeholders, disabled, empty).</li>
            <li><b>Selection</b>: reverse video, for the cursor row, the current tab and the primary action.</li>
            <li><b>Meaning</b>: green, yellow, red and blue, for status only, always with a word or glyph.</li>
            <li><b>Category</b>: red, yellow, green, cyan, blue, magenta, in that order everywhere.</li>
            <li><b>Series</b>: blue, yellow, magenta, cyan. One series alone is the default fg.</li>
            <li><b>Overlay</b>: a default fg edge. A modal dims everything behind it to bright black, the way the scrim does.</li>
            <li>Use the 16 named colors, never RGB, so the app follows the terminal's theme in light and dark. Truecolor is only for data that needs a ramp, such as a heatmap, and then in one hue.</li>
          </ul>
        }
        bare
      >
        <Tty label="Text levels, reverse video, status colors, tag and series order" lines={roles} />
      </Demo>
      <Demo
        title="Attributes and glyphs"
        rules={
          <ul>
            <li>Hierarchy comes from bold and dim, never from color alone. One bold thing per line at most. No blink, no strikethrough except for removed items, and no ALL CAPS headers.</li>
            <li>A small fixed set of glyphs that every terminal font draws. Square single-line box drawing only. Words and these glyphs replace icons: no emoji, no Nerd Font icons, no rounded, double or heavy lines.</li>
          </ul>
        }
        bare
      >
        <Tty label="Text attributes and the glyph set" lines={glyphs} />
      </Demo>
      <Demo
        title="Panes and lists"
        rules={
          <ul>
            <li>A cell is about twice as tall as it is wide, so space runs in whole cells: one cell of padding inside a box, two between columns, one blank row between groups and none inside a list.</li>
            <li>Titles sit in the top edge. The focused pane's edge is the default fg and its cursor row is reversed across the full width. Other panes keep dim edges and show their cursor in bold.</li>
            <li>Counts sit right-aligned and dim. Empty or unused rows are bright black.</li>
          </ul>
        }
        bare
      >
        <Tty label="Two panes: folders and an inbox with a reversed cursor row" lines={panes} />
      </Demo>
      <Demo
        title="Tabs and tables"
        rules={
          <ul>
            <li>The current tab is reversed with a space each side, the others plain with their number key dim in front, over a bright black rule. Number keys switch tabs, and tab and shift-tab cycle.</li>
            <li>Table headers are bold and dim, with no rules between rows. Numbers and dates are right-aligned, columns two cells apart, the cursor row reversed. Status is a colored dot plus a word.</li>
          </ul>
        }
        bare
      >
        <Tty label="Tabs over a table with a reversed cursor row and status dots" lines={table} />
      </Demo>
      <Demo
        title="Fields and choices"
        rules={
          <ul>
            <li>A field is a box with its label in the top edge. The focused field's edge is the default fg and its cursor is a reversed block. Placeholders are bright black.</li>
            <li>[x] and [ ] for checkboxes, (•) and ( ) for radios, a bold label over each group. The focused option is reversed. Space toggles and enter confirms.</li>
            <li>Search opens on / as a line at the bottom, with the result count above it.</li>
          </ul>
        }
        bare
      >
        <Tty label="Two form fields, a checkbox group and a radio group" lines={fields} />
      </Demo>
      <Demo
        title="Progress and messages"
        rules={
          <ul>
            <li>A progress bar is heavy lines in fg over a light-line track in bright black, the percent dim on the right. A braille spinner at 80ms sits before the label while work runs. It's the only motion a TUI has.</li>
            <li>Messages are the toast of a TUI: one replaces the key hints in the footer for 4s, led by a colored dot and written as a sentence. Errors stay until the next key. Offer undo with its key instead of asking to confirm.</li>
          </ul>
        }
        bare
      >
        <Tty label="A running progress bar, then a success and an undo message in the footer" lines={feedback} />
      </Demo>
      <Demo
        title="Menus and dialogs"
        rules={
          <ul>
            <li>A menu opens under its trigger as a box with an fg edge. The cursor row is reversed and each key sits dim on the right. Destructive items go last in red, under a rule.</li>
            <li>Apps with many actions get a palette on ctrl-k or :, filtered as you type.</li>
            <li>Dialogs are only for what can't be undone: a centered box with an fg edge, the title in the edge, and actions on the last line, primary rightmost and reversed (red when it destroys). Everything behind dims to bright black. Esc cancels, enter confirms.</li>
          </ul>
        }
        bare
      >
        <Tty label="A context menu and a delete confirmation" lines={beside(4, menu, dialog)} />
      </Demo>
      <Demo
        title="Charts"
        rules="One series is the default fg with no legend. Several series use blue, yellow, magenta, cyan in that order, each bar labeled on the left and valued on the right. Eighth blocks give partial cells. No axes unless the reader needs exact values."
        bare
      >
        <Tty label="A sparkline and a bar chart" lines={charts} />
      </Demo>
      <Demo
        title="App layout"
        rules={
          <ul>
            <li>Top line: the app name in bold, then tabs, then status on the right (a colored dot and a word, then the time, dim).</li>
            <li>Middle: panes side by side, list on the left, detail on the right. Only the focused pane has an fg edge.</li>
            <li>Bottom line: key hints under a bright black rule, the key bold and its verb dim, two cells apart, most used first.</li>
            <li>Fill the terminal and redraw on resize. As it narrows, drop the detail pane first, then the least important columns, then the tab names. Cut long text with … rather than wrapping. Below the minimum size, show only the size needed and the size you have.</li>
          </ul>
        }
        bare
      >
        <div className="stack">
          <Tty label="A full TUI: title line with tabs, a table pane, a detail pane, and key hints" lines={app} />
          <Tty label="The same app at 44 columns" lines={narrow} />
        </div>
      </Demo>
      <Demo
        title="Keys"
        rules={
          <ul>
            <li>Every action has a key, and the footer shows the ones that matter on this screen.</li>
            <li>Arrows and vim keys both move. Esc goes back or closes, q quits from the top level, / searches, ? lists every key.</li>
            <li>Name keys with glyphs where they exist (↵ ⇥ ↑↓) and lowercase words otherwise (esc, ctrl-k). Verbs in hints are lowercase and one word when possible.</li>
            <li>The mouse can scroll and select, but every action also works from the keyboard.</li>
          </ul>
        }
        bare
      >
        <Tty label="The keys overlay" lines={help} />
      </Demo>
    </Page>
  );
}
