# Specialty

<!-- Generated from https://github.com/spenker3/design by `npm run skill`. Edit the repo, not this file. -->

Documents (prose, code, figures, math, papers) and charts and graphs (line, scatter and small charts, note graphs, node editors, Mermaid diagrams).

## Classes

Each file's header, from [`src/design/`](https://github.com/spenker3/design/tree/main/src/design). Read the file itself for exact values before porting a component.

### documents.css

```text
Documents: long-form content blocks. Prose itself is .prose (layout.css).
code            inline code: mono on surface-2 (in base.css). code.path drops the fill.
.codeblock      a block whose optional head (file name, then language) is its first row, unnumbered, from the gutter's left edge.
                The language name is colored by language (data-lang).
  .lines        line numbers in the gutter.
  .line.hl      a highlighted line: fg bar in the gutter.
  .line.add/.del  diff lines: tinted, with +/- in the gutter.
.codeblock.terminal  shell session: .prompt is faint and unselectable, output is muted.
.tk-*           syntax tokens: kw, str, num, fn, type, com, punct. Colors are --code-* tokens.
Code is never wrapped: blocks scroll sideways, so indentation stays honest.
.figure         numbered figure: content, then a figcaption that opens with .figure-num.
                .figure-row lays subfigures side by side. .figure-credit is the source line.
                .figure.framed for content with no edge of its own.
.equation       display math centered, its number (.eq-num) at the right. Math itself is <Tex>.
.theorem        definition / theorem / lemma: bold label, 2px rule at the left.
                .theorem.soft for definitions and remarks. .proof ends with a ∎.
.abstract       summary block at the top of a paper, titled with an h4.
.cite / .refs   inline citation [1] and the numbered reference list. A targeted ref inverts its number.
```

### charts.css

```text
Charts and graphs: data drawn as marks, and things drawn as nodes and links.
.bars           simple single-series bar chart in fg. .bars-axis labels its ends.
.chart          SVG chart (<LineChart> or hand-written): .chart-grid, .chart-axis, .chart-line,
                .chart-dot, .chart-cross, and an HTML .chart-tip tooltip.
.legend         series key: swatch + name. Present whenever there are 2+ series.
.spark          inline sparkline, sized to the text.
.heat           heatmap: cells mix fg into surface by --v (0 to 1). One hue, never a rainbow.
.force          Obsidian-style force graph (<ForceGraph>): .force-node dots, .force-link lines.
.nodes          node editor (<NodeEditor>) on a .canvas: .node cards, .node-port dots, .wire curves.
                .nodes-view holds them and takes the pan/zoom transform.
                Port color (--c) is the data type. A selected node's header inverts.
.diagram        Mermaid syntax rendered to SVG by Pele (<Diagram>). Maps --pele-* onto the tokens, so it
                follows the theme with no re-render, and shows syntax errors in place. For flowcharts,
                trees, networks, sequence, state, class, ER, gantt, git and mind maps.
```

## Usage rules

From the showcase pages (`#/<page>` on the dev site). Each rule says when and how to use the piece.

### Documents

Long-form pieces reuse the prose type and add as little as possible.

- **Prose**: Long text uses .prose: 16px, 1.65 leading, a 68ch measure. Links underline with a quiet line that darkens on hover. Quotes are marked with a solid fg rule, not italics.
- **Code**:
  - 13px Geist Mono at 1.65 leading on a surface, 1px line, never wrapped: long lines scroll.
  - The head names the file when there is one, then the language in its own palette hue, as an unnumbered first row starting where the line numbers do: no divider, no buttons. A bare pre is for short output with nothing to name.
  - Syntax color is quiet: keywords are bold fg, and color only marks strings, numbers, functions and types.
  - Number lines when the text refers to them. Highlight a few lines at most, with a bar in the gutter.
- **Diff and terminal**: Added lines get the good tint and a + in the gutter, removed lines the bad tint and a −. A terminal block starts commands with a faint, unselectable $ and mutes the output. The $ can't be selected, so a selected command pastes cleanly.
- **Figures**:
  - Caption below, never above. Start with the bold number, then one sentence on what the reader should see, not what the image is. Credit goes on its own faint line.
  - Subfigures share one number. Label each (a), (b), (c) and keep the shared point in the figure's caption. Keep panels the same size so they compare.
  - Add .framed when the content has no edge of its own, like a chart on bg. Photos already have one.
  - Tables get the same treatment with their own counter, in a caption element so it stays attached.
  - Refer to figures by number and link it. Write “Figure 1”, not “the figure above”, since the layout can change.
- **Math**:
  - LaTeX rendered with KaTeX. Math keeps its own serif faces, the one place the system leaves Helvetica.
  - Inline math sits on the baseline at 1.1em. Keep it short: anything with a fraction or a sum goes on its own line.
  - Display math is centered with its number at the right. Number only what you refer to, as Equation (1).
  - Align derivations on the relation sign, one step per line, and say what changed in the text.
  - Math inherits the text color, so it inverts with a selected row. Bad TeX shows its source in mono and --bad instead of breaking the page.
- **Papers**:
  - An abstract is an h4 title on a surface, slightly smaller text with looser leading, one paragraph.
  - Theorems and lemmas get a 2px fg rule, and definitions and remarks a soft one. The label is bold with an optional name in normal weight. A proof has no rule and ends with ∎ at the right.
  - Citations are numbered in brackets, muted until hovered. Each links to its reference, whose number inverts when targeted. Titles in italics, everything else plain.

### Charts & graphs

Color only tells series or groups apart.

- **Lines**:
  - One series is fg with no legend, since the title names it. 2px line, faint axis labels in tabular figures, gridlines in line. Hover shows a crosshair and the value. The points carry no numbers.
  - Two to four series use --series-1 to 4 in order, which stay distinct under color blindness, with a legend above and a label at each line's end so identity never rests on color alone.
  - A fifth series folds into Other, or the chart splits into small multiples. Never a second y-axis.
- **Scatter**: 8px dots with a 2px bg ring so overlaps stay readable. A highlighted group uses a series color, and the rest stay fg at reduced opacity.
- **Small charts**:
  - A sparkline is a trend without axes, inline at text height next to the number it explains. fg by default, colored only when the trend itself is a status.
  - Simple bars are one series in fg with 2px gaps and a flat baseline. Hover shows the value.
- **Heatmap**: One hue, fg mixed into the surface by value. Never a rainbow. With one variable darker already reads as more, so it needs no scale. Hover names the cell's value.
- **Note graph**: Obsidian-style: a force layout where dots grow with their link count and unlinked notes are faint. Gray by default, colored only for a group the reader chose (folder, tag). Hover lights a note's neighborhood and dims the rest. The selected label inverts. Hubs are always labeled, and other labels appear on hover or once zoomed in.
- **Node editor**: Cards on a dotted canvas, dragged by the header. Drag the background to pan and scroll to zoom, as in the note graph, so a large graph fits a small window. Nodes are drawn like controls, and a selected node's header inverts. Ports are rows: inputs on the left edge, outputs on the right, a filled dot when linked. Port and wire color is the data type, kept consistent across the editor.
- **Diagrams**:
  - Write diagrams in Mermaid syntax, rendered by Pele. Its --pele-* colors map onto the tokens, so diagrams follow the theme. Never set colors with style or classDef.
  - Nodes look like controls: bg fill, 1px fg border, 4px radius. Edges are muted. Subgraphs get a quiet line and a surface fill.
  - Flow left to right, loops below. Color only marks an outcome, and a dead end is dashed. Trees go top down, and networks use round nodes.
  - Sequences run top to bottom, replies dashed, notes on a surface. State transitions are labeled with their action, lowercase.
  - Class and ER members are mono so types line up. Label each relation with a verb.
  - Gantt: done work recedes, the active task is fg, critical work is --bad. Git graphs and mind maps take the series colors in order.

## React wrappers

Only where behavior is needed; everything else is plain HTML with classes. In [`src/components/`](https://github.com/spenker3/design/tree/main/src/components).

### Diagram.tsx

Exports `Diagram`.

- `Diagram`: A Mermaid-syntax diagram rendered by Pele (pele.run) to SVG. Colors come from the tokens through --pele-* variables in charts.css, so theme changes need no re-render. Each diagram type loads on first use. Pele re-lays out when the container resizes, and shows syntax errors in place.

### ForceGraph.tsx

Exports `ForceGraph`.

- `ForceGraph`: Obsidian-style graph: a force layout of notes and links. Dots grow with their link count, and unlinked notes are faint. Hover lights a note and its neighbors and dims the rest; click selects (the label inverts). Drag a dot to move it, drag the background to pan, scroll to zoom. Labels show for hubs (6+ links), the lit notes, and every note once zoomed in. `groups` maps a group name to a color, and ungrouped notes are muted gray.

### LineChart.tsx

Exports `useWidth`, `LineChart`.

- `useWidth`: Width of an element, kept current. For SVG charts that keep text at real pixel size.
- `LineChart`: Line chart. One series is fg. For 2-4, pass color: var(--series-N) in order. Lines are labeled at their end and in the legend, so identity is never color alone. Hover shows a crosshair and every series' value. Width follows the container and height is fixed.

### NodeEditor.tsx

Exports `canvasGrid`, `NodeEditor`.

- `canvasGrid`: Style for a pannable .canvas: the dot grid moves and scales with the content, so dots and nodes pan as one surface. (x, y) is where the content's origin sits on screen and k is the zoom. Zoomed out, the grid doubles its spacing rather than packing dots closer than 12px.
- `NodeEditor`: Node editor: drag a node by its header, click to select. Drag the background to pan, scroll to zoom. Ports are rows, with an in port on the left edge, an out port on the right. `types` maps a port type to its color (wires take it too).

### Tex.tsx

Exports `Tex`.

- `Tex`: LaTeX via KaTeX. Inline by default; `display` for a centered block. Bad TeX renders as the source in --bad instead of throwing.
