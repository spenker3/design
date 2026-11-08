# design

A monochrome design language. Helvetica with Geist Mono, 4px corners, 1px lines instead of shadows, gray for structure, and color only where it means something. One signal marks the current, chosen or primary thing: the **inverted block**, where foreground and background swap.

The repo holds three things built from the same source:

- **CSS** in `src/design/`: tokens and components in plain CSS, with no framework and no build step.
- **React wrappers** in `src/components/`, only for parts with behavior: dialog, menu, toast, tabs, code block, math, charts, the note graph, the node editor and diagrams.
- **A Claude skill** in `skill/`: the same rules written for an agent, so it can apply the language anywhere, including native apps (GPUI, Qt) and terminals.

A showcase site documents every token, component and screen, along with the rules for using it.

## Run the showcase

```sh
npm install
npm run dev     # http://localhost:5180
npm run build   # regenerate the skill, type-check, build to dist/
```

The sidebar has ten pages in three groups: the language (principles, foundations, writing), the components (controls, navigation, content, overlays), and specialty work (documents, charts and graphs, the terminal), plus six full-screen screens.

## Use the CSS

Copy `src/design/` into a project and import it once:

```ts
import "./design/index.css";
```

Then write semantic HTML with the classes. State lives in ARIA attributes (`aria-selected`, `aria-current`, `aria-pressed`, `aria-invalid`, `aria-busy`), not in modifier classes:

```html
<button class="btn primary">Save</button>

<div class="tabs" role="tablist">
  <button aria-selected="true">Files</button>
  <button>Tasks</button>
</div>
```

- **Layout**: `.stack`, `.row` and `.grid` set spacing with a `--gap` variable. Components carry no outer margin.
- **Theme**: follows the system. Set `data-theme="light"` or `"dark"` on `<html>` to force one.
- **Fonts**: the sans is the system Helvetica stack. Install `@fontsource-variable/geist-mono` for the mono.
- **Reference**: each CSS file opens with a comment listing its classes and when to use them. `tokens.css` holds every color, size and timing, with both themes on one line via `light-dark()`.

## Use the skill

`skill/` is a Claude Code skill. Link it into your skills folder so every project picks it up:

```sh
ln -s "$PWD/skill" ~/.claude/skills/design
```

Don't edit `skill/` by hand, because everything in it is generated. The prose lives in `src/design/skill.md`. The rest comes from the tokens, the CSS header comments, the usage rules on each showcase page, and the writing guide in `src/design/writing.ts`. `npm run skill` rebuilds it, and so do the dev server and `npm run build`.

## Layout

| Path | What |
| --- | --- |
| `src/design/` | The system: `tokens.css`, then one CSS file per family (controls, navigation, content, overlays, documents, charts) |
| `src/design/writing.ts` | The writing guide as data: voice, mechanics, and limits for each text element |
| `src/components/` | React wrappers for components with behavior |
| `src/site/` | The showcase site and templates, which aren't part of the system |
| `scripts/skill.ts` | The skill generator |
| `skill/` | The generated Claude skill |
