# Components

<!-- Generated from https://github.com/spenker3/design by `npm run skill`. Edit the repo, not this file. -->

Every component class and the rules for using it, in four families: controls, navigation, content, and overlays (including floating chrome).

## Classes

Each file's header, from [`src/design/`](https://github.com/spenker3/design/tree/main/src/design). Read the file itself for exact values before porting a component.

### controls.css

```text
Controls: everything you press, type into, or pick from.
.btn            secondary: bg fill, strong line. The default.
.btn.primary    the inverted block: fg fill, bg text. One per view region.
.btn.ghost      no chrome until hovered. Toolbars, dense rows.
.btn.danger     destructive; red text, red fill on hover.
.btn.icon       square, icon only. Give it aria-label.
.btn.sm / .lg   sizes. .btn.block fills its row. .btn-group joins buttons edge to edge.
Color is allowed on buttons when it carries meaning: .btn.good, .btn.info.
.link           a button that reads as a text link. kbd is a key.
.field          label + control + help/error, stacked.
.input          text input, textarea, select. Surface fill, 1px line. .input-group holds icons and affixes.
.check / .radio native inputs restyled; checked = inverted block.
.switch         a checkbox with role="switch". Square thumb that inverts.
.segmented      a small exclusive choice; selected segment inverts.
.range          slider; --fill sets the filled part.
.cells          grid of choice cells (sizes, dates); selected inverts.
.swatches-pick  color swatch radios; selected gets an fg ring.
.mini-field     compact labeled number ("X 120") for inspectors.
.otp            one-time-code boxes.
.dropzone       dashed area for files.
.form-grid      label column beside the controls; stacks on phones.
```

### navigation.css

```text
Navigation. The current place is always the inverted block.
.tabs           a row of cells; the selected cell inverts. Like the workspace bar.
.tabs.strip     full-width and flush, cells share the width. Like the browser tabs.
.nav            vertical list of links (sidebar); current item inverts.
.topbar         app header: wordmark, nav, actions. 1px line under it.
.workspaces     numbered square cells, flush, like the desktop's workspace bar. The current cell
                inverts (aria-current="true"); [data-empty] cells drop to 50%.
.breadcrumbs, .pagination, .steps
.shell          sidebar + main, full height. Sidebar slides over on phones (.open).
```

### content.css

```text
Content: what a screen shows, in the flow of the page.
.card           surface box with 1px line. .card.plain sits on bg instead.
.badge          small label. Gray by default; .good/.warn/.bad/.info, or a palette color via --c.
.tag            removable filter. .dot is a status dot. .avatar is round initials or an image.
.table          dense data table; selected row inverts (like the TUI).
.list           rows separated by lines; selected row inverts.
.stat           big number with label and delta.
.progress / .meter / .spinner / .skeleton / .empty / .dl / .divider
.accordion      <details> rows separated by lines.
.callout        inline message in the flow; colored left rule + tint.
.banner         full-width message under a topbar.
.msg            chat message; .msg.user sits right on a surface. .composer is the message input.
```

### overlays.css

```text
Overlays: everything that floats above the page. No shadow anywhere.
Transient layers are bg with a 1px fg border, over a light scrim when modal:
.toast          transient message, bottom-right stack.
.dialog         native <dialog>, modal. .palette is a dialog with a search and results.
.sheet          native <dialog> pinned to an edge (side panel).
.menu           popover list of actions; keyboard cursor inverts.
.popover        popover with arbitrary content.
[data-tip]      tooltip on hover/focus, CSS only.
Persistent floating chrome is bg with line-strong:
.toolbar        floating strip of icon buttons (.vertical for a rail). Pressed tool inverts.
.panel          floating inspector with labeled sections.
.dock           floating bar: .dock-page cells (current inverts), .dock-sep, tools.
.canvas         the dotted work surface that floating chrome sits over. Its dots move with the content
                on pan and zoom (canvasGrid in NodeEditor.tsx), never stay fixed under it.
```

## Usage rules

From the showcase pages (`#/<page>` on the dev site). Each rule says when and how to use the piece.

### Controls

Secondary is the default. Only the main action and whatever is chosen invert.

- **Buttons**:
  - **Primary**: the one thing to do here. Inverted block, once per region, rightmost.
  - **Secondary** (default): everything else. bg with a strong line.
  - **Ghost**: toolbars and dense rows, where chrome would be noise.
  - **Danger**: destructive. Red until hovered, then filled.
  - **Colored**: when color carries meaning, like Approve or Info.
  - Disabled drops to 45%. Never disable without saying why nearby.
- **Sizes, icons and busy**:
  - sm in dense rows and toolbars, default everywhere else, lg for page-level calls to action. Touch screens raise all of them.
  - Icons are 16px lucide at 1.75 stroke, before the label. The shortcut sits in a kbd after it. Icon-only buttons need aria-label and a tooltip.
  - Busy keeps the button's width and swaps the label for a spinner.
- **Groups, toggles and links**: Joined buttons sit flush, edge to edge. A pressed ghost toggle inverts, like any selection. Text links underline with a quiet line that darkens on hover, and .link makes a button look like one.
- **Text fields**:
  - Fields sit on a surface fill and turn bg with a fg border when focused.
  - Bold label above, help below, and an error replaces the help in red. Mark optional fields, not required ones.
  - Icons, prefixes and keys go inside the border. Search shows its shortcut until you type, then a clear button.
- **Checks, radios, switches**: Checked is the inverted block. Use a switch for settings that apply at once, a checkbox for choices submitted with a form, and radios for one of a few options with room to explain each.
- **Picking a value**:
  - Segmented for 2–5 exclusive options that change a view.
  - Range for continuous values, with the number beside it in mono.
  - Cells for a grid of discrete options like sizes or dates. The chosen cell inverts and unavailable ones are disabled.
  - Swatches pick a color. The chosen one gets an fg ring, since its fill is already the color.
- **Special inputs**:
  - A drop zone is a dashed line that turns fg while a file is over it. Always offer a button too.
  - A one-time code is one box per digit, in mono.
  - Mini fields are compact labeled numbers for inspectors: the label faint inside the box.
- **Form layout**: On wide screens, a label column beside the controls, stacked on phones. One primary action, rightmost, at the end.

### Navigation

Where you are is always the inverted block: the current tab, page, workspace or step.

- **Tabs**:
  - Cells with no gaps, and the selected cell inverts. Left and right arrows move between them. Counts sit in mono after the label.
  - Lined tabs sit on a rule, for sections within a page.
  - A strip is full width and flush, and its tabs share the width equally up to half each. For document or window tabs.
  - Workspace cells are numbered squares. The current one inverts and empty ones drop to 50%.
- **Sidebar**: Icon, label, and a count pushed right. Group labels outrank their items: same size, bold, full text color, sentence case. Never small, gray or uppercase. In an app shell the sidebar sits on a surface beside the main column and slides over the page on phones.
- **Top bar**: Wordmark, primary tabs, then a spacer, status text and ghost icon actions on the right. One line under it.
- **Breadcrumbs, pagination, steps**: Breadcrumbs end on the current page, unlinked. Pagination is flush numbered cells with the current one inverted, and an ellipsis for gaps. Steps show done, current and upcoming through a flow.

### Content

Color appears only where it says something about the data.

- **Table**: Small, bold, muted headers in sentence case on a surface, 36px rows (28 compact), mono right-aligned numbers. Sortable headers show an arrow. The selected row inverts, like the TUI's reversed highlight.
- **List**: Rows divided by lines. Title plus a muted sub-line, with meta on the right. The selected row inverts.
- **Cards and stats**:
  - Cards are a surface fill, 1px line and 16px padding. A card that is one link outlines in fg on hover. Footer actions sit behind a line.
  - An inverted card is for the one thing on a page that must stand apart.
  - A stat is a label, a big tabular number, and a mono delta colored by direction.
- **Badges, tags, dots, avatars**: Badges are outlined by default and solid for emphasis. A solid badge with no color is the inverted block, and a palette color via --c marks a category. Tags are removable filters. A dot gives status next to a word, never alone. Avatars are round initials.
- **Progress, loading, empty**:
  - Progress is a 4px square bar, colored only when the value has a status. Meters are segmented, like a battery.
  - Skeletons match the shape of what's coming, with a slow pulse at most.
  - Empty states are muted and centered, with one action at most.
- **Details**: Key/value lists have muted keys and plain values, for detail panes and metadata. An accordion is details rows divided by lines. A divider can carry a short label.
- **Messages in the flow**:
  - Callouts sit inline: a colored rule and tint, a bold first line for the point, muted detail after. Neutral when nothing is wrong.
  - Banners run full width under the top bar, for app-wide state. Inverted for notices, red for problems.
  - Inline status is small and muted, next to the thing it describes. Color only for warnings and errors.
- **Chat**: The user's messages sit right on a surface, and replies sit left on bg, as plain prose. The composer is an autosizing field with its actions on a row inside the border, send rightmost as the primary.

### Overlays

Transient layers take an fg border, and chrome that stays on screen takes the strong line. No shadows.

- **Menu**: Opens under its trigger. The hover or keyboard cursor is the inverted block. Shortcuts sit on the right, and destructive items go last, in red, under a rule.
- **Dialog and sheet**:
  - A dialog has a title, a body, and actions on a line at the bottom with the primary rightmost. Esc or a click outside closes.
  - Confirm only what can't be undone, and focus the safe choice. Otherwise act and offer Undo.
  - A sheet is a side panel over the page for details or settings, so the list behind stays in place.
- **Command palette**: Ctrl/⌘+K anywhere. Search field on top, results below with the cursor inverted, key hints in the footer.
- **Toasts and tooltips**:
  - Toasts sit bottom right (full width on phones), four at most, gone after 4s. A dot gives the tone. Offer Undo instead of asking to confirm.
  - Tooltips are for icon-only buttons and truncated text. Inverted, small, after a short delay. Never put anything needed only in a tooltip.
- **Floating chrome**:
  - Work surfaces put their chrome over a dotted canvas, whose dots pan and zoom with the content: a tool rail, an inspector panel and a page dock. All are bg with line-strong, since they stay on screen.
  - The pressed tool and the current page invert. The panel splits into labeled sections divided by lines.

## React wrappers

Only where behavior is needed; everything else is plain HTML with classes. In [`src/components/`](https://github.com/spenker3/design/tree/main/src/components).

### Choice.tsx

Exports `Segmented`, `Tabs`.

- `Segmented`: Segmented control: a small exclusive choice. Selected segment inverts.
- `Tabs`: Tabs: switch between views. Selected tab inverts. Arrow keys move.

### CodeBlock.tsx

Exports `CodeBlock`.

- `CodeBlock`: Code block. Pass the code as a string.
  - file / lang: shown in the head. No head when both are missing and copy is off.
  - lines: line numbers.  highlight: 1-based line numbers to mark.
  - diff: lines starting with "+" or "-" become add/del lines (the sign moves to the gutter).
  - terminal: lines starting with "$ " are commands, and the rest is output.

### Dialog.tsx

Exports `Dialog`.

- `Dialog`: Native modal <dialog>. Esc and a click on the scrim close it.

### Menu.tsx

Exports `Menu`.

- `Menu`: Popover menu under its trigger. Uses the popover attribute, so outside clicks and Esc close it for free. Arrow keys move between items.

### Toast.tsx

Exports `useToast`, `ToastProvider`.


