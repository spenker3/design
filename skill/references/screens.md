# Screens

<!-- Generated from https://github.com/spenker3/design by `npm run skill`. Edit the repo, not this file. -->

Full-screen example UIs, each built only from the system. Open one at `http://localhost:5180/#/<path>` when the dev server runs, or read its source for the arrangement. `src/site/templates/templates.css` holds only layout; every look comes from the system.

"Built from" lists the system components each screen uses, most used first (modifiers like `.ghost` or `.sm` left out), then the React wrappers it imports.


| Screen | Path | What it shows | Built from | Source |
| --- | --- | --- | --- | --- |
| Chat | `#/t/chat` | App shell: conversation sidebar, messages, centered composer. | .btn .row .grow .input .nav .nav-label .truncate .msg .composer .composer-actions .faint .shell .wordmark .input-group .avatar .badge .shell-main .topbar .shell-toggle .spacer .prose .msg-actions .muted .spinner | [`src/site/templates/Chat.tsx`](https://github.com/spenker3/design/blob/main/src/site/templates/Chat.tsx) |
| Dashboard | `#/t/dashboard` | Data: stats, a bar chart, recent activity and a table. | .card .muted .n .btn .grow .row .shell .wordmark .nav .count .nav-label .progress .shell-main .topbar .shell-toggle .input .input-group .spacer .avatar .grid .stat .label .value .card-head .num .bars .bars-axis .list .title .sub .stack .table-wrap .table .mono <Segmented> | [`src/site/templates/Dashboard.tsx`](https://github.com/spenker3/design/blob/main/src/site/templates/Dashboard.tsx) |
| Settings | `#/t/settings` | Forms: sectioned settings, billing, and a danger zone. | .muted .btn .stack .row .field .input .label .choice .switch .card .shell .wordmark .nav .shell-main .topbar .shell-toggle .avatar .grid .input-group .affix .optional .form-grid .help .table-wrap .table .badge .n .link .danger .grow <Segmented> <useToast> | [`src/site/templates/Settings.tsx`](https://github.com/spenker3/design/blob/main/src/site/templates/Settings.tsx) |
| Canvas | `#/t/canvas` | Work surface: tool rail, inspector, dock, selection on a canvas. | .btn .row .avatar .mini-field .panel-section .toolbar .faint .canvas .wordmark .avatars .panel .badge .panel-row .swatches-pick .range .nav .dock .dock-page .dock-sep .num | [`src/site/templates/Canvas.tsx`](https://github.com/spenker3/design/blob/main/src/site/templates/Canvas.tsx) |
| Article | `#/t/article` | Reading: title, byline, hero, prose, related. | .muted .btn .row .stack .topbar .wordmark .tabs .spacer .breadcrumbs .avatar .prose .grid .card | [`src/site/templates/Article.tsx`](https://github.com/spenker3/design/blob/main/src/site/templates/Article.tsx) |
| Landing | `#/t/landing` | Marketing: hero, features, pricing, FAQ, footer. | .container .btn .row .muted .stack .wordmark .badge .grid .topbar .spacer .faint .grow .accordion <Segmented> | [`src/site/templates/Landing.tsx`](https://github.com/spenker3/design/blob/main/src/site/templates/Landing.tsx) |
