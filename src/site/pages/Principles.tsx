import { Page } from "../Demo";

const rules: [string, string][] = [
  [
    "Black and white first",
    "The interface is pure black and white. Primary is the inverted block: black on white in light, white on black in dark. Secondary is the reverse.",
  ],
  [
    "Selection is the inverted block",
    "The current tab, nav item, workspace, table row, menu cursor and text selection all invert fg and bg, so every selection reads the same way.",
  ],
  [
    "Gray for structure, color for meaning",
    "Surfaces, lines and muted text are gray. Color marks status, data and emphasis, and is used anywhere it helps, buttons included.",
  ],
  [
    "Nearly square",
    "Corners are 4px (2px on small parts). Only round things are round: avatars, dots, radios.",
  ],
  [
    "Lines instead of shadows",
    "Edges are 1px lines. Overlays get a fg border and a light scrim instead of a drop shadow.",
  ],
  [
    "One typeface, plus mono",
    "Helvetica for everything, and Geist Mono for code, keys, and numbers compared down a column. Hierarchy comes from size and weight, never from more fonts.",
  ],
  [
    "Dense and calm",
    "14px base, 32px controls (44px on touch), tight spacing and no decoration.",
  ],
  [
    "Almost no motion",
    "Short fades and nudges of 80–140ms at most, and none with reduced motion.",
  ],
  [
    "Keyboard first",
    "Everything is reachable by keyboard and shows its shortcut. Key hints hide on touch.",
  ],
  [
    "Both themes, always",
    "Every color is a token set for light and dark together. Theme follows the system unless the user picks one.",
  ],
];

export function Principles() {
  return (
    <Page
      title="Principles"
      lede="A monochrome, Helvetica-set, nearly square language built around the inverted block. The tokens and components follow from these rules."
    >
      <ol className="principles">
        {rules.map(([title, body], i) => (
          <li key={title}>
            <span className="n faint num">{i + 1}</span>
            <div className="stack" style={{ "--gap": "4px" } as React.CSSProperties}>
              <h3>{title}</h3>
              <p className="muted">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Page>
  );
}
