# Writing

<!-- Generated from https://github.com/spenker3/design by `npm run skill`. Edit the repo, not this file. -->

The house style for every kind of text, from [`src/design/writing.ts`](https://github.com/spenker3/design/blob/main/src/design/writing.ts). Lengths are maximums, not targets: shorter is better. `check(text, element)` in that file tests length, case, ending punctuation, exclamation marks, filler words and `...`; it can't judge wording, so read the rules too.


## Voice

1. **Plain and direct.** Use short words and short sentences. Say what happens and leave it there.
2. **Sentence case everywhere.** Capitalize the first word and names only. Never Title Case, never ALL CAPS, in source or through CSS.
3. **Talk to the reader as you.** The interface doesn't say I or we. It says what you can do and what happened.
4. **Name things the same way everywhere.** If the button says Delete, the dialog says Delete and the toast says Deleted. One word per idea.
5. **Lead with the point.** Put the outcome or the action first, the explanation after.
6. **No filler or cheer.** No please, simply, just, easily, oops or exclamation marks.
7. **Don't blame.** Errors say what happened and how to fix it, never what the reader did wrong.
8. **No slogans.** State each rule plainly, in one sentence. Avoid punchy two-part lines such as X, not Y or It's X; Y.
9. **Let the UI carry structure.** If a heading or label already says it, the body doesn't repeat it.

## Mechanics

| Topic | Rule | Example |
| --- | --- | --- |
| Numbers | Digits, always: 3 files, not three. Thousands separator from 1,000. | 41 tasks due |
| Units | A space before the unit, symbol form. | 50 MB · 120 ms · 4 px |
| Ranges | En dash, no spaces. | Pages 3–4 · 9:00–11:30 |
| Dates | Month abbreviated, no ordinals. Add the year only when it isn't this year. | Nov 5 · Oct 28, 2025 |
| Times | 12-hour in prose, 24-hour or relative in dense UI. | 9:41 · 2m ago |
| Separators | Middle dot with spaces between meta fragments. | 24 pages · slides |
| Ellipsis | The single character …, for work in progress and for actions that ask for more input. | Uploading… · Share… |
| Quotes | Curly quotes and apostrophes in prose, straight in code. | “Saved” · it's |
| Lists | Fragments without periods, full sentences with them. Don't mix in one list. |  |
| Abbreviations | Avoid them. Spell out on first use if they must appear. | Single sign-on (SSO) |
| Emphasis | Bold for the one thing to notice. No italics for emphasis, no underlines except links. |  |

## Limits

| Element | Where | Max | Case | Ends |
| --- | --- | --- | --- | --- |
| Page title | h1 of a page or screen | 32 chars | sentence | none |
| Section heading | h2/h3 inside a page | 40 chars | sentence | none |
| Section label | h4 / nav-label / small group label | 24 chars | sentence | none |
| Lede | Intro under a page title | 2 sentences | sentence | period |
| Body paragraph | Prose, docs, descriptions | 80 words | sentence | period |
| Button | Buttons and primary actions | 24 chars | sentence | none |
| Link | Inline links and text actions | 6 words | sentence | none |
| Field label | Above a form control | 24 chars | sentence | none |
| Placeholder | Inside an empty field | 32 chars | sentence | none |
| Help text | Under a field or setting | 80 chars | sentence | period |
| Error message | Field errors, failed actions | 100 chars | sentence | period |
| Empty state title | Bold line of an empty state | 32 chars | sentence | none |
| Empty state body | Line under the empty title | 80 chars | sentence | period |
| Toast | Transient confirmation | 48 chars | sentence | none |
| Dialog title | Head of a dialog | 40 chars | sentence | question mark for confirmations, otherwise none |
| Dialog body | Text in a dialog | 2 sentences | sentence | period |
| Tooltip | Hover label for icon buttons | 24 chars | sentence | none |
| Menu item | Rows in a menu or palette | 24 chars | sentence | ellipsis when it opens more |
| Badge | Status and category labels | 12 chars | lowercase | none |
| Table header | Column headings | 16 chars | sentence | none |
| Meta line | Small text under titles, list sub-lines | 48 chars | sentence | none |
| Callout title | Bold first line of a callout or banner | 48 chars | sentence | none |

## Elements

### Page title

h1 of a page or screen. At most 32 chars, sentence case, ends: none.

- A noun phrase naming what's here
- 1–4 words

- ✓ Recent orders
- ✓ Settings
- ✓ Q3 roadmap
- ✗ Welcome to Your Orders Dashboard! (a greeting in Title Case, with an exclamation mark)
- ✗ Here you can manage all of your settings (describes the page instead of naming it)

### Section heading

h2/h3 inside a page. At most 40 chars, sentence case, ends: none.

- Names the section's content, not its purpose
- Can be a short statement in long-form writing

- ✓ Notifications
- ✓ Revenue per day
- ✓ What it costs
- ✗ Configure Your Notification Preferences Below (Title Case, and an instruction instead of a name)
- ✗ Section 2: Overview of Revenue (numbering and filler words)

### Section label

h4 / nav-label / small group label. At most 24 chars, sentence case, ends: none.

- 1–3 words
- Sentence case on screen too, never uppercased or letter-spaced

- ✓ On this page
- ✓ Workspace
- ✓ Read next
- ✗ THINGS YOU MIGHT ALSO LIKE TO READ (all caps in the source, and too long)

### Lede

Intro under a page title. At most 2 sentences, sentence case, ends: period.

- Says what the page is for or the one rule that matters
- Under 160 characters

- ✓ Everything in the system on one page. The other pages explain when to use each one.
- ✗ This page is a comprehensive overview that will help you understand all of the various components. It includes many examples. We hope you find it useful! (filler, three sentences, and cheer)

### Body paragraph

Prose, docs, descriptions. At most 80 words, sentence case, ends: period.

- One idea per paragraph
- Sentences under about 25 words
- 4 sentences at most

- ✓ Swapping foreground and background is the oldest selection there is. It needs no new color, reads in both themes, and survives a grayscale print.

### Button

Buttons and primary actions. At most 24 chars, sentence case, ends: none.

- Starts with a verb
- Says what happens, matching the title it confirms
- No OK, Yes or Submit when a verb fits

- ✓ Save changes
- ✓ Delete project
- ✓ Start free
- ✓ Add to cart
- ✗ OK (no verb: OK to what?)
- ✗ Click here to save your changes (describes the click, and too long)
- ✗ Submit (too generic to say what gets sent)

### Link

Inline links and text actions. At most 6 words, sentence case, ends: none.

- Names where it goes or what it does
- Makes sense read alone

- ✓ Read the docs
- ✓ full changelog
- ✓ Size guide
- ✗ click here (means nothing out of context)
- ✗ this link (means nothing out of context)
- ✗ Learn more (doesn't say about what)

### Field label

Above a form control. At most 24 chars, sentence case, ends: none.

- A noun, no colon
- Mark optional fields, never required ones

- ✓ Email
- ✓ Display name
- ✓ Bio
- ✗ Please Enter Your Email Address: (an instruction in Title Case, with a colon)
- ✗ Name* (mark optional fields, not required ones)

### Placeholder

Inside an empty field. At most 32 chars, sentence case, ends: none.

- An example value, not an instruction
- Never the only label

- ✓ you@example.com
- ✓ Beta launch
- ✓ Search orders
- ✗ Enter your email address here (an instruction, not an example)
- ✗ Type something... (an instruction, with three dots)

### Help text

Under a field or setting. At most 80 chars, sentence case, ends: period.

- One sentence
- Adds what the label can't say: format, effect, limits

- ✓ At least 12 characters.
- ✓ As it should appear on invoices.
- ✗ This is the field where you enter the name that you would like to use. (repeats the label)

### Error message

Field errors, failed actions. At most 100 chars, sentence case, ends: period.

- What happened, then how to fix it
- No Error:, Oops or blame
- Specific: name the field or file

- ✓ Enter a full email address.
- ✓ Transcription failed on 2 pages. Retry, or upload a clearer scan.
- ✗ Error: invalid input! (a label prefix, vague, with an exclamation mark)
- ✗ Oops! Something went wrong. (cheer, and no fix)
- ✗ You entered an invalid email. (blames the reader, and gives no fix)

### Empty state title

Bold line of an empty state. At most 32 chars, sentence case, ends: none.

- Says what's empty, plainly

- ✓ Nothing in your inbox
- ✓ No commands match
- ✗ Wow, such empty! (a joke where information should be)

### Empty state body

Line under the empty title. At most 80 chars, sentence case, ends: period.

- What will appear here, or the next step

- ✓ Comments on your files show up here.
- ✗ There is currently no data available to display at this time. (filler, and no next step)

### Toast

Transient confirmation. At most 48 chars, sentence case, ends: none.

- Past tense, with the count or object
- Offer Undo instead of asking first

- ✓ Saved
- ✓ Deleted 3 files
- ✓ Exported 24 rows
- ✗ Your changes have been successfully saved! (filler and cheer)

### Dialog title

Head of a dialog. At most 40 chars, sentence case, ends: question mark for confirmations, otherwise none.

- Confirmations ask the exact question, naming the object
- The confirm button repeats the verb

- ✓ Delete Atlas?
- ✓ New milestone
- ✗ Are you sure? (doesn't name the action)
- ✗ Warning (names a mood, not the action)

### Dialog body

Text in a dialog. At most 2 sentences, sentence case, ends: period.

- The consequence, especially what can't be undone

- ✓ Every file, task and comment goes, including the project's history. This can't be undone.

### Tooltip

Hover label for icon buttons. At most 24 chars, sentence case, ends: none.

- The action's name, plus its key
- Nothing essential lives only in a tooltip

- ✓ Copy link
- ✓ Archive  E
- ✗ Click this button to copy the link to your clipboard. (a sentence, not a name)

### Menu item

Rows in a menu or palette. At most 24 chars, sentence case, ends: ellipsis when it opens more.

- Starts with a verb
- Ends with … when it opens a dialog or asks for more

- ✓ Rename
- ✓ Share…
- ✓ Open settings
- ✗ Rename This File (Title Case, and the object is redundant)
- ✗ Sharing options (a noun, not a verb, and no ellipsis)

### Badge

Status and category labels. At most 12 chars, lowercase case, ends: none.

- 1–2 words, lowercase
- A state or category, not a sentence

- ✓ paid
- ✓ due
- ✓ in 5 days
- ✓ draft
- ✗ Successfully Paid (filler in Title Case)

### Table header

Column headings. At most 16 chars, sentence case, ends: none.

- 1–2 words
- Unit in the header, not every cell, when it's the same for all

- ✓ Price
- ✓ Days
- ✓ Size (MB)
- ✗ Total price of the order (a phrase where Total is enough)

### Meta line

Small text under titles, list sub-lines. At most 48 chars, sentence case, ends: none.

- Fragments joined by a middle dot
- Most specific first

- ✓ 24 pages · slides
- ✓ Nov 5, 2026 · 6 min read
- ✗ This document has 24 pages and contains slides. (a sentence where fragments fit)

### Callout title

Bold first line of a callout or banner. At most 48 chars, sentence case, ends: none.

- States the situation as a fact
- Detail goes on the second line, one sentence

- ✓ Section 9 has no owner
- ✓ 3 files are still uploading
- ✗ Important Notice! (says nothing about the situation)
- ✗ Warning: please read this carefully (a label prefix and filler)
