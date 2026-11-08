# Foundations

<!-- Generated from https://github.com/spenker3/design by `npm run skill`. Edit the repo, not this file. -->

Element defaults, inline text and layout, plus the usage rules for color, type, space and shape.

## Classes

Each file's header, from [`src/design/`](https://github.com/spenker3/design/tree/main/src/design). Read the file itself for exact values before porting a component.

### base.css

```text
Reset and element defaults. Plain HTML should already look right.
```

### layout.css

```text
Layout primitives. Gap does the spacing, and components carry no outer margin.
.stack    vertical flow     (--gap, default space-4)
.row      horizontal, centered, wraps with .wrap; .between pushes ends apart
.grid     auto-fit columns  (--min, default 240px)
.grow     takes the remaining space
.container  centered page column (--page); .prose limits to --measure
```

## Usage rules

From the showcase pages (`#/<page>` on the dev site). Each rule says when and how to use the piece.

### Foundations

Every value is a token in tokens.css, set for light and dark together.

- **Ground and text**:
  - bg and fg are pure white and black. Surfaces step toward fg for raised or grouped areas, one step per level.
  - line for edges, line-strong for edges that must hold up next to a surface.
  - text for body, muted for secondary, faint for disabled, placeholders and labels that should recede.
- **Selection**: sel-bg and sel-fg are fg and bg swapped. Anything current or chosen uses them instead of an accent color. Empty or unused items drop to 50%.
- **Meaning and palette**:
  - good, warn, bad and info carry status. Each has a tint for the background behind it. Dark values are lighter so they hold contrast on black.
  - The palette is for categories and tags, always in this order so a category keeps its color across views. Chart series use their own order.
- **Type**:
  - Helvetica (Nimbus Sans or TeX Gyre Heros on Linux) for everything. 14px is the UI base and 16px is for reading.
  - Large sizes tighten their tracking. Hierarchy comes from size and weight, never color alone.
  - h1–h3 step down by size, and h4 is the small muted section label.
  - 400 for body, 500 for controls, 600 for emphasis and headings, 700 for display.
- **Mono**: Geist Mono for anything typed or read by a machine: commands, file names, tokens, values. Keys are kbd, joined by a space. Numbers that must line up are mono and tabular. Paths can drop the background with code.path.
- **Space and size**:
  - A 4px rhythm, with 2 and 6 for tight UI. Components carry no outer margin, and layouts (.stack, .row, .grid) set --gap.
  - Use 8–12 inside controls and groups, 16–24 between groups, 48+ between page sections.
  - Controls are 32px (26 small, 40 large), and 44px on touch screens. Pages max out at 1120px and reading text at 68ch.
- **Shape and elevation**:
  - 4px corners everywhere, 2px for small parts inside controls (checkboxes, badges, kbd). Round only for avatars, dots and radios.
  - No shadows. Raised areas use a surface fill. Overlays get a 1px fg border, and modals add a light scrim.
