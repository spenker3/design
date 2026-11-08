# Tokens

<!-- Generated from ~/Projects/design by `npm run skill`. Edit the repo, not this file. -->

Every token in `src/design/tokens.css`, the whole language in one file. Colors are `light-dark(LIGHT, DARK)`; a reference like `--fg` → #000000 shows what it resolves to. Machine-readable values for both themes are in `tokens.json`.

Design tokens. The whole language lives here, and components only reference these.

Colors use light-dark(LIGHT, DARK): both themes sit on one line, so a new
color is always set for both. Theme follows the system, and data-theme="light"
or "dark" on <html> forces one.

The main theme is black and white:
- fg/bg are pure black and white. Selection and primary actions invert them.
- Gray is for structure (surfaces, lines, muted text).
- Color is for meaning (status, data, emphasis), used wherever it helps.


## Ground

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | #ffffff | #000000 |
| `--fg` | #000000 | #ffffff |
| `--surface` | #f7f7f7 | #0d0d0d |
| `--surface-2` | #ececec | #1a1a1a |
| `--surface-3` | #e0e0e0 | #262626 |
| `--line` | #e2e2e2 | #242424 |
| `--line-strong` | #c0c0c0 | #3a3a3a |

## Text

| Token | Light | Dark |
| --- | --- | --- |
| `--text` | #111111 | #ececec |
| `--muted` | #666666 | #9a9a9a |
| `--faint` | #a0a0a0 | #5c5c5c |

## Selection

the inverted block. Nav, tabs, rows, text selection, focused cells.

| Token | Light | Dark |
| --- | --- | --- |
| `--sel-bg` | `--fg` → #000000 | `--fg` → #ffffff |
| `--sel-fg` | `--bg` → #ffffff | `--bg` → #000000 |

## Interaction fills, as subtle grays

| Token | Light | Dark |
| --- | --- | --- |
| `--hover` | #f0f0f0 | #141414 |
| `--press` | #e4e4e4 | #1f1f1f |

## Meaning

| Token | Light | Dark |
| --- | --- | --- |
| `--good` | #1a7f37 | #86d08b |
| `--warn` | #8a5a00 | #e5b454 |
| `--bad` | #c62828 | #f08a75 |
| `--info` | #1565c0 | #7db8f0 |
| `--good-tint` | #e8f5ec | #0d1f10 |
| `--warn-tint` | #fbf3e2 | #221a08 |
| `--bad-tint` | #fcebea | #2a100c |
| `--info-tint` | #e7f0fb | #0b1824 |

## Categorical palette for data, charts, tags

Same order everywhere.

| Token | Light | Dark |
| --- | --- | --- |
| `--c-red` | #d1242f | #f47067 |
| `--c-orange` | #d9620a | #f0883e |
| `--c-yellow` | #a87b00 | #e5b454 |
| `--c-green` | #1a7f37 | #57c66a |
| `--c-cyan` | #0e7c86 | #4fc1cc |
| `--c-blue` | #2563eb | #6ca4f8 |
| `--c-violet` | #7c3aed | #b392f0 |
| `--c-magenta` | #bf3989 | #e275ad |

## Chart series

palette hues in an order that stays apart under color blindness (validated in both themes). One series uses fg, and a 5th+ folds into "Other" (--faint).

| Token | Light | Dark |
| --- | --- | --- |
| `--series-1` | `--c-blue` → #2563eb | `--c-blue` → #6ca4f8 |
| `--series-2` | `--c-orange` → #d9620a | `--c-orange` → #f0883e |
| `--series-3` | `--c-violet` → #7c3aed | `--c-violet` → #b392f0 |
| `--series-4` | `--c-yellow` → #a87b00 | `--c-yellow` → #e5b454 |

## Code

monochrome first. Keywords get weight, and color marks literals and names.

| Token | Light | Dark |
| --- | --- | --- |
| `--code-bg` | `--surface` → #f7f7f7 | `--surface` → #0d0d0d |
| `--code-keyword` | `--fg` → #000000 | `--fg` → #ffffff |
| `--code-string` | `--c-green` → #1a7f37 | `--c-green` → #57c66a |
| `--code-number` | `--c-orange` → #d9620a | `--c-orange` → #f0883e |
| `--code-function` | `--c-blue` → #2563eb | `--c-blue` → #6ca4f8 |
| `--code-type` | `--c-violet` → #7c3aed | `--c-violet` → #b392f0 |
| `--code-comment` | `--faint` → #a0a0a0 | `--faint` → #5c5c5c |
| `--code-punct` | `--muted` → #666666 | `--muted` → #9a9a9a |
| `--code-hl` | #eeeeee | #1c1c1c |
| `--code-add` | `--good-tint` → #e8f5ec | `--good-tint` → #0d1f10 |
| `--code-del` | `--bad-tint` → #fcebea | `--bad-tint` → #2a100c |

## Overlays

| Token | Light | Dark |
| --- | --- | --- |
| `--scrim` | rgb(255 255 255 / 0.6) | rgb(0 0 0 / 0.6) |
| `--overlay-border` | `--fg` → #000000 | `--fg` → #ffffff |

## Type

Helvetica for everything, Geist Mono for code, numbers in tables, keys.

| Token | Value |
| --- | --- |
| `--font-ui` | Helvetica, "Helvetica Neue", "Nimbus Sans", "TeX Gyre Heros", Arial, sans-serif |
| `--font-mono` | "Geist Mono Variable", "GeistMono Nerd Font", ui-monospace, monospace |
| `--text-xs` | 11px |
| `--text-sm` | 12.5px |
| `--text-base` | 14px |
| `--text-md` | 16px |
| `--text-lg` | 20px |
| `--text-xl` | 26px |
| `--text-2xl` | 36px |
| `--text-3xl` | 56px |
| `--weight-normal` | 400 |
| `--weight-medium` | 500 |
| `--weight-bold` | 600 |
| `--weight-heavy` | 700 |
| `--leading-tight` | 1.15 |
| `--leading` | 1.5 |
| `--leading-loose` | 1.65 |
| `--tracking-tight` | -0.02em |

## Space

4px base, with 2 and 6 for tight UI

| Token | Value |
| --- | --- |
| `--space-0` | 2px |
| `--space-1` | 4px |
| `--space-2` | 6px |
| `--space-3` | 8px |
| `--space-4` | 12px |
| `--space-5` | 16px |
| `--space-6` | 24px |
| `--space-7` | 32px |
| `--space-8` | 48px |
| `--space-9` | 64px |
| `--space-10` | 96px |

## Shape

nearly square. Pills only for round things (avatars, dots).

| Token | Value |
| --- | --- |
| `--radius` | 4px |
| `--radius-sm` | 2px |
| `--radius-round` | 999px |
| `--border` | 1px |

## Sizing

| Token | Value |
| --- | --- |
| `--control` | 32px |
| `--control-sm` | 26px |
| `--control-lg` | 40px |
| `--measure` | 68ch |
| `--page` | 1120px |

## Motion

almost none. Short fades for changes of state.

| Token | Value |
| --- | --- |
| `--dur-fast` | 80ms |
| `--dur` | 140ms |
| `--ease` | cubic-bezier(0.2, 0, 0, 1) |

## Overrides

Theme forcing, touch sizes, and reduced motion:

```css
:root[data-theme="light"] {
  color-scheme: light;
}

:root[data-theme="dark"] {
  color-scheme: dark;
}

/* Touch: bigger targets. */
@media (pointer: coarse) {
  :root {
    --control: 44px;
    --control-sm: 36px;
    --control-lg: 48px;
  }
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-fast: 0ms;
    --dur: 0ms;
  }
}
```
