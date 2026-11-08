# design

A monochrome design language. Helvetica with Geist Mono, 4px corners, 1px lines in place of shadows, gray for structure, and color only where it means something. The **inverted block**, where foreground and background swap, marks the current, chosen or primary thing.

The repo holds 3 things built from the same source:

- **CSS** in `src/design/`: tokens and components in plain CSS, with no framework and no build step.
- **React wrappers** in `src/components/`, only for parts with behavior: dialog, menu, toast, tabs, code block, math, charts, the note graph, the node editor and diagrams.
- **A Claude skill** in `skill/`: the same rules written for an agent, so it can apply the language anywhere, including native apps (GPUI, Qt) and terminals.

A showcase site documents every token, component and screen, with the rules for using each one.

## Run the showcase

```sh
npm install
npm run dev     # http://localhost:5180
npm run build   # type-check and build to dist/
```

The sidebar has 10 pages in 3 groups: the language (principles, foundations, writing), the components (controls, navigation, content, overlays) and specialty work (documents, charts and graphs, the terminal). Below them are 6 full-screen templates: chat, dashboard, settings, canvas, article and landing.

## Use the CSS

Copy `src/design/` into a project and import it once:

```ts
import "./design/index.css";
```

Then write semantic HTML with the classes. Components read their state from ARIA attributes (`aria-selected`, `aria-current`, `aria-pressed`, `aria-invalid`, `aria-busy`), so there are no modifier classes to learn:

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
- **Reference**: each CSS file opens with a comment listing its classes and when to use them. `tokens.css` holds every color, size and timing, with both themes on one line through `light-dark()`.

## Use the skill

`skill/` is a Claude Code skill. Link it into your skills folder so every project picks it up:

```sh
ln -s "$PWD/skill" ~/.claude/skills/design
```

Everything in `skill/` is generated, so edit the sources instead:

- **Prose**: `src/design/skill.md`
- **Tokens**: `src/design/tokens.css`
- **Component reference**: the header comment of each CSS file, and the usage rules on each showcase page
- **Writing guide**: `src/design/writing.ts`

The pre-commit hook regenerates the skill and stages it, so the skill always matches the last commit. Run `npm run skill` to preview it before then.

## Layout

| Path | What |
| --- | --- |
| `src/design/` | The system: `tokens.css`, then 1 CSS file per family (controls, navigation, content, overlays, documents, charts) |
| `src/design/writing.ts` | The writing guide as data: voice, mechanics and limits for each text element |
| `src/components/` | React wrappers for components with behavior |
| `src/site/` | The showcase site and templates, which aren't part of the system |
| `scripts/skill.ts` | The skill generator |
| `skill/` | The generated Claude skill |

## License

MIT. See [LICENSE](LICENSE).
