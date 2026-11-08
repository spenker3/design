---
name: design
description: The user's personal design language. Monochrome, {{sans}} with {{mono}}, nearly square corners, 1px lines instead of shadows, gray for structure, color only for meaning, and the inverted block (fg and bg swapped) as the one signal for the current, chosen or primary thing. Includes the house style for interface text. Use whenever building, restyling or reviewing any interface or visual output for the user's own projects, such as web pages and apps, React components, HTML artifacts, native GUIs (GPUI, Qt/QML), TUIs, charts, diagrams, dashboards and docs sites, and whenever writing the labels, buttons, errors and other text inside them. Skip it when a project already follows a different design system or brand.
---

# Design

The user's design language, distilled from their living style guide at {{repo}}. That repo is the source of truth. `src/design/` is the reference implementation, and the showcase runs at `http://localhost:5180` while the user's dev server is up. This file and everything in `references/` are generated from the repo whenever it changes, with every value filled in from the tokens. To change the language, change the repo, not this skill.

## The idea

Two values, ink (`--fg`) and paper (`--bg`), carry the interface. A short ladder of grays draws its structure. Color appears only when it says something true. Swapping ink and paper, the inverted block, is the single signal for "this one": the current page, the chosen row, the pressed tool, the primary action, the text you selected.

Everything else follows from keeping those four jobs apart. The interface stays quiet, dense and easy to read. Nothing competes with the inverted block, so it's always clear where you are and what to do.

## Principles

{{principles}}

## Roles

Every visual decision fills one of these roles. Learn the roles rather than the class names, because the roles carry over to any medium.

| Role | Tokens | Job |
| --- | --- | --- |
| Paper and ink | `--bg`, `--fg` | Pure white and black, the two poles. Everything else sits between them. |
| Surface | `--surface`, `--surface-2`, `--surface-3` | A step toward ink for areas that are grouped, raised or nested: fields, cards, sidebars, code. One step per level. |
| Edge | `--line`, `--line-strong` | {{border}} boundaries. `line-strong` when the edge must hold up beside a surface, for persistent floating chrome, and for the secondary button. |
| Text | `--text`, `--muted`, `--faint` | Three levels of importance: content, secondary, and receding (placeholders, axis labels, group labels, disabled). |
| Selection | `--sel-bg`, `--sel-fg` | The inverted block. Never an accent color. |
| Interaction | `--hover`, `--press` | Faint gray fills. Things with a border darken the border to fg on hover instead. |
| Meaning | `--good`, `--warn`, `--bad`, `--info`, each with `-tint` | Status. The tint is the background behind it. |
| Category | `--c-red` … `--c-magenta` | Tags, groups and categories, always in palette order so a category keeps its color everywhere. |
| Series | `--series-1` … `--series-4` | Chart series in a color-blind-safe order: {{series}}. One series alone is fg. |
| Overlay | `--overlay-border`, `--scrim` | Transient layers: fg border, plus a light scrim when modal. |

## Deriving anything new

The catalog won't cover everything. For a new element, answer these in order and the look follows:

1. **Is it the current, selected, on, or primary thing?** Use the inverted block. Keep one or two per region, because inversion is loud.
2. **Is it a boundary between things?** Draw a {{border}} line. Never a shadow, glow or gradient.
3. **Does it float above the page?** A transient layer (menu, dialog, toast, popover, chart tooltip) is bg with a {{border}} fg border, plus `--scrim` when modal. A persistent one (toolbar, inspector, dock) is bg with `line-strong`.
4. **Is it grouped or raised content?** Step to the next surface. Don't add a shadow or a colored panel.
5. **Does color say something true about it?** For status, use a meaning color with its tint. For a category, use the palette in order. For a data series, use the series order. A language name in a code block's head takes that language's palette hue, never green or red, which mean good and bad. Otherwise it's gray. Color never identifies something alone, so pair it with a label, icon, position or end label.
6. **Is it read by a machine, a key, or a number compared down a column (a table figure, a price)?** Set it in mono. Other numbers (counts, page and step numbers, axis labels, deltas, citations) stay in the sans with tabular figures and no leading zeros. Everything else uses the one sans, with hierarchy from size and weight only, never from a new face or from color alone.
7. **Is it unavailable or empty?** Disabled drops to about 45% opacity, and empty or unused items to 50%. Don't use a new color.
8. **Is it round by nature?** Avatars, status dots, radios and data points are round. Everything else gets {{radius}} corners, or {{radius-sm}} for small parts inside a control.
9. **How big is it?** Snap to the control sizes ({{control}}, {{control-sm}} small, {{control-lg}} large, {{touch.control}} on touch) and the spacing scale. Use {{space-3}}–{{space-4}} inside groups, {{space-5}}–{{space-6}} between groups, and {{space-8}}+ between page sections. Default to dense.
10. **Does it move?** Only to show a change of state, in {{dur-fast}}–{{dur}}, and not at all under reduced motion.
11. **Where does its state live?** In the component's state: selected, current, pressed, checked, invalid, busy, sorted. The style follows from that state and never comes from a separate styled variant. (On the web: `aria-*` and native attributes, not modifier classes.)
12. **Who spaces it?** The parent does. Components carry no outer margin, and layouts set the gap.

If the answers leave two options, pick the plainer one.

## Never

- An accent color for selection, focus or links. Focus is a 2px fg outline, and links get a quiet underline that darkens on hover.
- Drop shadows, glows, blur, or decorative gradients.
- Pills or large radii on rectangular things.
- A second sans or mono, or a display face. The one exception is math, which keeps KaTeX's own faces.
- Mono as decoration: on step, list or page numbers, counts, dates, or labels, and numbers padded with leading zeros (01, 02).
- Color that carries no meaning: tinted section backgrounds, rainbow icons, a brand hue on every heading.
- Rainbow scales, a second y-axis, or a legend that relies on color alone.
- Title Case, ALL CAPS in source text, exclamation marks, cheer, filler, or emoji as decoration. Small labels are sentence case, bold and muted, never uppercase or letter-spaced.
- Motion for its own sake: bouncing, sliding pages, skeleton shimmer beyond a slow pulse.
- Confirmation dialogs for actions that can be undone. Act, then offer Undo.

## Scale

{{scale}}

## Composing screens

Screens repeat a few arrangements. `references/screens.md` lists {{screens}} full examples, one per arrangement, with their source files. Read the closest one before building a new screen.

- **App shell.** A sidebar on `--surface` (nav with the current item inverted, small faint group labels, counts on the right) beside a main column. The main column starts with a 48px top bar: wordmark or title, tabs, a spacer, status text, then ghost icon actions. On phones the sidebar slides over the page.
- **Reading.** One column at {{measure}}, {{text-md}} at {{leading-loose}} leading (`.prose`). A heavy, tightly tracked title, a muted dek, and figures captioned below with a bold number.
- **Data.** A grid of stat cards (label, big tabular number, delta colored by direction), then a chart, then a dense table. Color appears only in badges, deltas and status dots.
- **Work surface.** A dotted canvas with floating chrome: a tool rail, an inspector panel, and a page dock, all bg with `line-strong`. The pressed tool and the current page invert.
- **Settings and forms.** A label column beside the controls, stacked on phones. Bold labels above fields, help text below, and errors in red that replace the help. One primary action per region, rightmost. A danger zone goes last, with danger buttons.
- **Overlays.** A menu opens under its trigger, and its cursor is the inverted block. A dialog has a title, body, and actions on a line at the bottom with the primary rightmost. A sheet is a side panel. Apps get a Ctrl/⌘K palette.
- **Keyboard.** Every action is reachable, and its shortcut shows in a `kbd`. Arrow keys move through tabs, menus and lists.

## Writing

Interface text follows the same restraint as the visuals. Full rules, mechanics (numbers, dates, ranges, ellipses, quotes) and good and bad examples for every element are in `references/writing.md`.

{{voice}}

## Applying it

### Anywhere

The language doesn't depend on any framework. Build it with whatever the project uses, and keep these ideas. Where the CSS implementation has its own spelling for an idea, it's in parentheses, so you can recognize it when reading the reference files.

- **Two palettes.** Every color has a light and a dark value. Pick one from the system appearance, switch live when it changes, and let a setting force either (`light-dark()`, `data-theme`). `references/tokens.json` has both palettes resolved, ready to turn into a theme in any language.
- **Selection inverts.** Whatever is current, chosen or pressed paints fg as its background and bg as its text. Never use the platform's accent or highlight color for it.
- **Edges are lines.** {{border}} borders. Turn off any default shadows, elevation and ripples.
- **Sizes are logical pixels.** Token values are points, not device pixels. Keep sizes like {{text-sm}} where fractional sizes work, otherwise round to the nearest whole pixel.
- **Touch is bigger.** On touch-first targets, controls grow from {{control}} / {{control-sm}} / {{control-lg}} to {{touch.control}} / {{touch.control-sm}} / {{touch.control-lg}} (`@media (pointer: coarse)`).
- **Motion follows the OS.** State changes animate in {{dur-fast}}–{{dur}}, and not at all when the OS asks for reduced motion.
- **Measure, don't guess.** For heights, paddings and gaps, read the matching component in {{repo:src/design/}}, whatever you're building with.

### Where the medium can't follow

- **Terminal.** Cells can't draw a radius or promise black and white. Ink and paper are the terminal's own default fg and bg, so the app fits whatever theme the terminal runs. Selection is reverse video. Borders are plain and square, not rounded box drawing. Muted text and lines are the dim gray. Meaning uses the named green, yellow, red and blue, only for status. Table headers are bold and dim, and numbers are right-aligned. Key hints go in a footer line, the way `kbd` shows them on the web: `↑↓ move  ↵ open  q quit`. Read `references/tui.md` for the full mapping, the glyph set, each component in cells, and the screen layout and keys.
- **Omarchy apps.** Use this design, not the Omarchy theme: the token palettes, no theme accent, and {{radius}} corners whatever Hyprland's rounding is. Take only light or dark from the theme, reading the `mode` line in `~/.local/state/omarchy/current/theme/colors.toml` and watching it to switch live. If the line is missing, fall back to the system color scheme. The `omarchy-app` skill still covers the stack, packaging and behavior.

Check the result in both appearances next to the matching showcase page. Selection, edges and text levels should read the same at a glance.

### On the web

The CSS in {{repo:src/design/}} is a ready-made implementation, so on the web you can use it instead of rebuilding the ideas.

- **A project that can take plain CSS** (React, Vite, plain HTML, most frameworks): copy {{repo:src/design/}} into the project (`git clone --depth 1 {{repo}}` to get it) and import `index.css` once. `tokens.css` holds the language, the other files hold the components, and each file's header lists its classes. Install `{{mono-package}}`. Drop the `katex` import unless the project shows math. React projects can also copy wrappers from {{repo:src/components/}}: `Dialog`, `Menu`, `Toast`, `Choice` (Segmented, Tabs), `CodeBlock` with `highlight.tsx`, and for specialty work `Tex`, `NodeEditor`, `ForceGraph`, `LineChart` and `Diagram`. Then use semantic HTML, the classes, and ARIA for state.
- **A project with its own styling approach** (Tailwind, CSS-in-JS, a component library): don't paste a second system on top. Put the tokens in its theme, using `references/tokens.json` for resolved light and dark values, and rebuild the roles and rules with its tools.
- **A single-file page** (an HTML artifact, a quick prototype): inline `tokens.css` and only the component CSS the page uses. Load {{mono}} from Google Fonts, and keep the system `--font-ui` stack for the sans.
- **Theme**: colors use `light-dark()`, so the page follows the system. Set `data-theme="light"` or `"dark"` on `<html>` to force one, and offer a System / Light / Dark segmented control when the app has settings.
- **Check both themes** before calling a page done. With a server running, use `chromium --headless=new --blink-settings=preferredColorScheme=1 --window-size=1440,900 --screenshot=out.png <url>` (`=0` for dark).

### Charts, diagrams, math and papers

Read `references/specialty.md`. In short:

- One series is drawn in fg with no legend. Two to four series use the series order, with a legend above and a label at each line's end.
- Heatmaps use one hue: fg mixed into the surface. Never a rainbow.
- In Mermaid source, never set colors with `style` or `classDef`, so diagrams follow the theme.
- Figure captions go below, open with a bold number, and say what to notice.

## References

Read the one that matches the job before writing code. For anything visual, also open the real CSS for the classes in use in {{repo:src/design/}}.

| File | Read it when |
| --- | --- |
| `references/tokens.md` | You need a color, size or timing value, or the reasoning behind a token |
| `references/tokens.json` | You're generating a theme in code (Rust, QML, Tailwind config) |
| `references/foundations.md` | You're setting up base styles or layout, or choosing color, type, space or shape |
| `references/components.md` | You're building any control, navigation, content (data, status, chat) or overlay |
| `references/specialty.md` | You're building documents (prose, code, figures, math, papers) or charts, graphs and diagrams |
| `references/screens.md` | You're laying out a whole screen |
| `references/tui.md` | You're building a terminal app (TUI) or terminal output |
| `references/writing.md` | You're writing or reviewing interface text |

## Changing the language

This skill follows the repo. If the user corrects the style while working in another project, apply the correction there and suggest bringing it back to {{repo}} so it reaches every project. In that repo, the prose of this file lives in `src/design/skill.md`, and `npm run skill` rebuilds the skill from it and the rest of the repo. It also runs on its own from the dev server, after Claude edits files in `src/`, and on `npm run build`.
