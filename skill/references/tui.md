# TUI

<!-- Generated from https://github.com/spenker3/design by `npm run skill`. Edit the repo, not this file. -->

The language in a terminal: how each role maps to cells and attributes, the glyph set, the components rebuilt in cells, and full-terminal layouts and keys.

## Usage rules

From the showcase pages (`#/<page>` on the dev site). Each rule says when and how to use the piece.

### Terminal

Ink and paper are the terminal's own colors, and selection is reverse video.

- **Roles in a terminal**:
  - **Paper and ink**: the terminal's default bg and fg (reset). Never paint a background on the screen or a pane.
  - **Surface**: none. Cells can't promise a gray, so group with a line or a blank row instead.
  - **Edge**: bright black lines. The focused pane and overlays take the default fg.
  - **Text**: default for content, dim for secondary, bright black for receding (placeholders, disabled, empty).
  - **Selection**: reverse video, for the cursor row, the current tab and the primary action.
  - **Meaning**: green, yellow, red and blue, for status only, always with a word or glyph.
  - **Category**: red, yellow, green, cyan, blue, magenta, in that order everywhere.
  - **Series**: blue, yellow, magenta, cyan. One series alone is the default fg.
  - **Overlay**: a default fg edge. A modal dims everything behind it to bright black, the way the scrim does.
  - Use the 16 named colors, never RGB, so the app follows the terminal's theme in light and dark. Truecolor is only for data that needs a ramp, such as a heatmap, and then in one hue.
- **Attributes and glyphs**:
  - Hierarchy comes from bold and dim, never from color alone. One bold thing per line at most. No blink, no strikethrough except for removed items, and no ALL CAPS headers.
  - A small fixed set of glyphs that every terminal font draws. Square single-line box drawing only. Words and these glyphs replace icons: no emoji, no Nerd Font icons, no rounded, double or heavy lines.
- **Panes and lists**:
  - A cell is about twice as tall as it is wide, so space runs in whole cells: one cell of padding inside a box, two between columns, one blank row between groups and none inside a list.
  - Titles sit in the top edge. The focused pane's edge is the default fg and its cursor row is reversed across the full width. Other panes keep dim edges and show their cursor in bold.
  - Counts sit right-aligned and dim. Empty or unused rows are bright black.
- **Tabs and tables**:
  - The current tab is reversed with a space each side, the others plain with their number key dim in front, over a bright black rule. Number keys switch tabs, and tab and shift-tab cycle.
  - Table headers are bold and dim, with no rules between rows. Numbers and dates are right-aligned, columns two cells apart, the cursor row reversed. Status is a colored dot plus a word.
- **Fields and choices**:
  - A field is a box with its label in the top edge. The focused field's edge is the default fg and its cursor is a reversed block. Placeholders are bright black.
  - [x] and [ ] for checkboxes, (•) and ( ) for radios, a bold label over each group. The focused option is reversed. Space toggles and enter confirms.
  - Search opens on / as a line at the bottom, with the result count above it.
- **Progress and messages**:
  - A progress bar is heavy lines in fg over a light-line track in bright black, the percent dim on the right. A braille spinner at 80ms sits before the label while work runs. It's the only motion a TUI has.
  - Messages are the toast of a TUI: one replaces the key hints in the footer for 4s, led by a colored dot and written as a sentence. Errors stay until the next key. Offer undo with its key instead of asking to confirm.
- **Menus and dialogs**:
  - A menu opens under its trigger as a box with an fg edge. The cursor row is reversed and each key sits dim on the right. Destructive items go last in red, under a rule.
  - Apps with many actions get a palette on ctrl-k or :, filtered as you type.
  - Dialogs are only for what can't be undone: a centered box with an fg edge, the title in the edge, and actions on the last line, primary rightmost and reversed (red when it destroys). Everything behind dims to bright black. Esc cancels, enter confirms.
- **Charts**: One series is the default fg with no legend. Several series use blue, yellow, magenta, cyan in that order, each bar labeled on the left and valued on the right. Eighth blocks give partial cells. No axes unless the reader needs exact values.
- **App layout**:
  - Top line: the app name in bold, then tabs, then status on the right (a colored dot and a word, then the time, dim).
  - Middle: panes side by side, list on the left, detail on the right. Only the focused pane has an fg edge.
  - Bottom line: key hints under a bright black rule, the key bold and its verb dim, two cells apart, most used first.
  - Fill the terminal and redraw on resize. As it narrows, drop the detail pane first, then the least important columns, then the tab names. Cut long text with … rather than wrapping. Below the minimum size, show only the size needed and the size you have.
- **Keys**:
  - Every action has a key, and the footer shows the ones that matter on this screen.
  - Arrows and vim keys both move. Esc goes back or closes, q quits from the top level, / searches, ? lists every key.
  - Name keys with glyphs where they exist (↵ ⇥ ↑↓) and lowercase words otherwise (esc, ctrl-k). Verbs in hints are lowercase and one word when possible.
  - The mouse can scroll and select, but every action also works from the keyboard.
