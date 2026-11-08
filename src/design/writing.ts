/*
  Writing guide: the house style for every kind of text, kept as data so the
  showcase can check examples against it and the skill can read it directly.

  Each element sets a length limit (chars, words or sentences), the case it uses,
  its ending punctuation, rules, and good/bad examples. The Writing page measures
  every example against its limit, so a bad limit or a bad example shows up there.
*/

export type Unit = "chars" | "words" | "sentences";
export type Case = "sentence" | "lowercase" | "as written";

export type TextElement = {
  id: string;
  name: string;
  where: string;
  max: number;
  unit: Unit;
  case: Case;
  /** How it ends: "none", "period", "question mark", "ellipsis when it opens more". */
  ends: string;
  rules: string[];
  good: string[];
  /** [text, why it's wrong] */
  bad: [string, string][];
};

/* General voice. These hold for every element below. */
export const voice: [string, string][] = [
  ["Plain and direct", "Use short words and short sentences. Say what happens and leave it there."],
  ["Sentence case everywhere", "Capitalize the first word and names only. Never Title Case, never ALL CAPS, in source or through CSS."],
  ["Talk to the reader as you", "The interface doesn't say I or we. It says what you can do and what happened."],
  ["Name things the same way everywhere", "If the button says Delete, the dialog says Delete and the toast says Deleted. One word per idea."],
  ["Lead with the point", "Put the outcome or the action first, the explanation after."],
  ["No filler or cheer", "No please, simply, just, easily, oops or exclamation marks."],
  ["Don't blame", "Errors say what happened and how to fix it, never what the reader did wrong."],
  ["No slogans", "State each rule plainly, in one sentence. Avoid punchy two-part lines such as X, not Y or It's X; Y. A headline says what the product does, since Launch faster or Build without limits could sell anything."],
  ["Let the UI carry structure", "If a heading or label already says it, the body doesn't repeat it."],
];

/* Mechanics: the small typographic choices, so they're made once. */
export const mechanics: [string, string, string][] = [
  ["Numbers", "Digits, always: 3 files, not three. Thousands separator from 1,000.", "41 tasks due"],
  ["Units", "A space before the unit, symbol form.", "50 MB · 120 ms · 4 px"],
  ["Ranges", "En dash, no spaces.", "Pages 3–4 · 9:00–11:30"],
  ["Dates", "Month abbreviated, no ordinals. Add the year only when it isn't this year.", "Nov 5 · Oct 28, 2025"],
  ["Times", "12-hour in prose, 24-hour or relative in dense UI.", "9:41 · 2m ago"],
  ["Separators", "Middle dot with spaces between meta fragments.", "24 pages · slides"],
  ["Ellipsis", "The single character …, for work in progress and for actions that ask for more input.", "Uploading… · Share…"],
  ["Quotes", "Curly quotes and apostrophes in prose, straight in code.", "“Saved” · it's"],
  ["Lists", "Fragments without periods, full sentences with them. Don't mix in one list.", ""],
  ["Semicolons", "Rarely. Use a period, or join with a comma and and. Keep one only when the two halves mean little apart.", "Toasts leave after 4s. Errors stay."],
  ["Abbreviations", "Avoid them. Spell out on first use if they must appear.", "Single sign-on (SSO)"],
  ["Emphasis", "Bold for the one thing to notice. No italics for emphasis, no underlines except links.", ""],
];

export const elements: TextElement[] = [
  {
    id: "page-title",
    name: "Page title",
    where: "h1 of a page or screen",
    max: 32,
    unit: "chars",
    case: "sentence",
    ends: "none",
    rules: ["A noun phrase naming what's here", "1–4 words"],
    good: ["Recent orders", "Settings", "Q3 roadmap"],
    bad: [["Welcome to Your Orders Dashboard!", "a greeting in Title Case, with an exclamation mark"], ["Here you can manage all of your settings", "describes the page instead of naming it"]],
  },
  {
    id: "heading",
    name: "Section heading",
    where: "h2/h3 inside a page",
    max: 40,
    unit: "chars",
    case: "sentence",
    ends: "none",
    rules: ["Names the section's content, not its purpose", "Can be a short statement in long-form writing"],
    good: ["Notifications", "Revenue per day", "What it costs"],
    bad: [["Configure Your Notification Preferences Below", "Title Case, and an instruction instead of a name"], ["Section 2: Overview of Revenue", "numbering and filler words"]],
  },
  {
    id: "label",
    name: "Section label",
    where: "h4 / nav-label / small group label",
    max: 24,
    unit: "chars",
    case: "sentence",
    ends: "none",
    rules: ["1–3 words", "Sentence case on screen too, never uppercased or letter-spaced"],
    good: ["On this page", "Workspace", "Read next"],
    bad: [["THINGS YOU MIGHT ALSO LIKE TO READ", "all caps in the source, and too long"]],
  },
  {
    id: "lede",
    name: "Lede",
    where: "Intro under a page title",
    max: 2,
    unit: "sentences",
    case: "sentence",
    ends: "period",
    rules: ["Says what the page is for or the one rule that matters", "Under 160 characters"],
    good: ["Everything in the system on one page. The other pages explain when to use each one."],
    bad: [
      ["This page is a comprehensive overview that will help you understand all of the various components. It includes many examples. We hope you find it useful!", "filler, three sentences, and cheer"],
    ],
  },
  {
    id: "body",
    name: "Body paragraph",
    where: "Prose, docs, descriptions",
    max: 80,
    unit: "words",
    case: "sentence",
    ends: "period",
    rules: ["One idea per paragraph", "Sentences under about 25 words", "4 sentences at most"],
    good: [
      "Swapping foreground and background is the oldest selection there is. It needs no new color, reads in both themes, and survives a grayscale print.",
    ],
    bad: [],
  },
  {
    id: "button",
    name: "Button",
    where: "Buttons and primary actions",
    max: 24,
    unit: "chars",
    case: "sentence",
    ends: "none",
    rules: ["Starts with a verb", "Says what happens, matching the title it confirms", "No OK, Yes or Submit when a verb fits"],
    good: ["Save changes", "Delete project", "Start free", "Add to cart"],
    bad: [["OK", "no verb: OK to what?"], ["Click here to save your changes", "describes the click, and too long"], ["Submit", "too generic to say what gets sent"]],
  },
  {
    id: "link",
    name: "Link",
    where: "Inline links and text actions",
    max: 6,
    unit: "words",
    case: "sentence",
    ends: "none",
    rules: ["Names where it goes or what it does", "Makes sense read alone"],
    good: ["Read the docs", "full changelog", "Size guide"],
    bad: [["click here", "means nothing out of context"], ["this link", "means nothing out of context"], ["Learn more", "doesn't say about what"]],
  },
  {
    id: "field-label",
    name: "Field label",
    where: "Above a form control",
    max: 24,
    unit: "chars",
    case: "sentence",
    ends: "none",
    rules: ["A noun, no colon", "Mark optional fields, never required ones"],
    good: ["Email", "Display name", "Bio"],
    bad: [["Please Enter Your Email Address:", "an instruction in Title Case, with a colon"], ["Name*", "mark optional fields, not required ones"]],
  },
  {
    id: "placeholder",
    name: "Placeholder",
    where: "Inside an empty field",
    max: 32,
    unit: "chars",
    case: "sentence",
    ends: "none",
    rules: ["An example value, not an instruction", "Never the only label"],
    good: ["you@example.com", "Beta launch", "Search orders"],
    bad: [["Enter your email address here", "an instruction, not an example"], ["Type something...", "an instruction, with three dots"]],
  },
  {
    id: "help",
    name: "Help text",
    where: "Under a field or setting",
    max: 80,
    unit: "chars",
    case: "sentence",
    ends: "period",
    rules: ["One sentence", "Adds what the label can't say: format, effect, limits"],
    good: ["At least 12 characters.", "As it should appear on invoices."],
    bad: [["This is the field where you enter the name that you would like to use.", "repeats the label"]],
  },
  {
    id: "error",
    name: "Error message",
    where: "Field errors, failed actions",
    max: 100,
    unit: "chars",
    case: "sentence",
    ends: "period",
    rules: ["What happened, then how to fix it", "No Error:, Oops or blame", "Specific: name the field or file"],
    good: ["Enter a full email address.", "Transcription failed on 2 pages. Retry, or upload a clearer scan."],
    bad: [["Error: invalid input!", "a label prefix, vague, with an exclamation mark"], ["Oops! Something went wrong.", "cheer, and no fix"], ["You entered an invalid email.", "blames the reader, and gives no fix"]],
  },
  {
    id: "empty-title",
    name: "Empty state title",
    where: "Bold line of an empty state",
    max: 32,
    unit: "chars",
    case: "sentence",
    ends: "none",
    rules: ["Says what's empty, plainly"],
    good: ["Nothing in your inbox", "No commands match"],
    bad: [["Wow, such empty!", "a joke where information should be"]],
  },
  {
    id: "empty-body",
    name: "Empty state body",
    where: "Line under the empty title",
    max: 80,
    unit: "chars",
    case: "sentence",
    ends: "period",
    rules: ["What will appear here, or the next step"],
    good: ["Comments on your files show up here."],
    bad: [["There is currently no data available to display at this time.", "filler, and no next step"]],
  },
  {
    id: "toast",
    name: "Toast",
    where: "Transient confirmation",
    max: 48,
    unit: "chars",
    case: "sentence",
    ends: "none",
    rules: ["Past tense, with the count or object", "Offer Undo instead of asking first"],
    good: ["Saved", "Deleted 3 files", "Exported 24 rows"],
    bad: [["Your changes have been successfully saved!", "filler and cheer"]],
  },
  {
    id: "dialog-title",
    name: "Dialog title",
    where: "Head of a dialog",
    max: 40,
    unit: "chars",
    case: "sentence",
    ends: "question mark for confirmations, otherwise none",
    rules: ["Confirmations ask the exact question, naming the object", "The confirm button repeats the verb"],
    good: ["Delete Atlas?", "New milestone"],
    bad: [["Are you sure?", "doesn't name the action"], ["Warning", "names a mood, not the action"]],
  },
  {
    id: "dialog-body",
    name: "Dialog body",
    where: "Text in a dialog",
    max: 2,
    unit: "sentences",
    case: "sentence",
    ends: "period",
    rules: ["The consequence, especially what can't be undone"],
    good: ["Every file, task and comment goes, including the project's history. This can't be undone."],
    bad: [],
  },
  {
    id: "tooltip",
    name: "Tooltip",
    where: "Hover label for icon buttons",
    max: 24,
    unit: "chars",
    case: "sentence",
    ends: "none",
    rules: ["The action's name, plus its key", "Nothing essential lives only in a tooltip"],
    good: ["Copy link", "Archive  E"],
    bad: [["Click this button to copy the link to your clipboard.", "a sentence, not a name"]],
  },
  {
    id: "menu-item",
    name: "Menu item",
    where: "Rows in a menu or palette",
    max: 24,
    unit: "chars",
    case: "sentence",
    ends: "ellipsis when it opens more",
    rules: ["Starts with a verb", "Ends with … when it opens a dialog or asks for more"],
    good: ["Rename", "Share…", "Open settings"],
    bad: [["Rename This File", "Title Case, and the object is redundant"], ["Sharing options", "a noun, not a verb, and no ellipsis"]],
  },
  {
    id: "badge",
    name: "Badge",
    where: "Status and category labels",
    max: 12,
    unit: "chars",
    case: "lowercase",
    ends: "none",
    rules: ["1–2 words, lowercase", "A state or category, not a sentence"],
    good: ["paid", "due", "in 5 days", "draft"],
    bad: [["Successfully Paid", "filler in Title Case"]],
  },
  {
    id: "table-header",
    name: "Table header",
    where: "Column headings",
    max: 16,
    unit: "chars",
    case: "sentence",
    ends: "none",
    rules: ["1–2 words", "Unit in the header, not every cell, when it's the same for all"],
    good: ["Price", "Days", "Size (MB)"],
    bad: [["Total price of the order", "a phrase where Total is enough"]],
  },
  {
    id: "meta",
    name: "Meta line",
    where: "Small text under titles, list sub-lines",
    max: 48,
    unit: "chars",
    case: "sentence",
    ends: "none",
    rules: ["Fragments joined by a middle dot", "Most specific first"],
    good: ["24 pages · slides", "Nov 5, 2026 · 6 min read"],
    bad: [["This document has 24 pages and contains slides.", "a sentence where fragments fit"]],
  },
  {
    id: "callout",
    name: "Callout title",
    where: "Bold first line of a callout or banner",
    max: 48,
    unit: "chars",
    case: "sentence",
    ends: "none",
    rules: ["States the situation as a fact", "Detail goes on the second line, one sentence"],
    good: ["Section 9 has no owner", "3 files are still uploading"],
    bad: [["Important Notice!", "says nothing about the situation"], ["Warning: please read this carefully", "a label prefix and filler"]],
  },
];

export function measure(text: string, unit: Unit): number {
  const t = text.trim();
  if (!t) return 0;
  if (unit === "chars") return [...t].length;
  if (unit === "words") return t.split(/\s+/).length;
  return t.split(/(?<=[.!?])\s+/).filter(Boolean).length;
}

const isLower = (t: string) => t === t.toLowerCase();
const isSentenceCase = (t: string) => {
  const words = t.split(/\s+/).slice(1);
  const capped = words.filter((w) => /^[A-Z][a-z]/.test(w));
  return capped.length <= 1;
};

/* Checks one string against an element. Returns problems; empty means it passes. */
export function check(text: string, el: TextElement): string[] {
  const issues: string[] = [];
  const n = measure(text, el.unit);
  if (n > el.max) issues.push(`${n} ${el.unit}, over ${el.max}`);
  if (/!/.test(text)) issues.push("exclamation mark");
  if (/\b(please|simply|just|oops|easily)\b/i.test(text)) issues.push("filler word");
  if (el.case === "lowercase" && !isLower(text)) issues.push("should be lowercase");
  if (el.case === "sentence" && !isSentenceCase(text)) issues.push("looks like Title Case");
  if (el.ends === "none" && /[.:]$/.test(text.trim())) issues.push("no ending punctuation");
  if (el.ends === "period" && !/[.?]$/.test(text.trim())) issues.push("should end with a period");
  if (/\.\.\./.test(text)) issues.push("use … not ...");
  return issues;
}
