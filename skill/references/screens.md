# Screens

<!-- Generated from ~/Projects/design by `npm run skill`. Edit the repo, not this file. -->

Full-screen example UIs, each built only from the system. Open one at `http://localhost:5180/#/<path>` when the dev server runs, or read its source for the arrangement. `src/site/templates/templates.css` holds only layout; every look comes from the system.

"Built from" lists the system components each screen uses, most used first (modifiers like `.ghost` or `.sm` left out), then the React wrappers it imports.


| Screen | Path | What it shows | Built from | Source |
| --- | --- | --- | --- | --- |
| Chat | `#/t/chat` | App shell: conversation sidebar, messages, centered composer. | .btn .row .grow .input .nav .nav-label .truncate .msg .composer .composer-actions .faint .shell .wordmark .input-group .avatar .badge .shell-main .topbar .shell-toggle .spacer .prose .msg-actions .muted .spinner | `~/Projects/design/src/site/templates/Chat.tsx` |
| Dashboard | `#/t/dashboard` | Data: stats, a bar chart, recent activity and a table. | .card .muted .n .btn .grow .row .mono .shell .wordmark .nav .count .nav-label .progress .shell-main .topbar .shell-toggle .input .input-group .spacer .avatar .grid .stat .label .value .card-head .bars .bars-axis .list .title .sub .stack .table-wrap .table <Segmented> | `~/Projects/design/src/site/templates/Dashboard.tsx` |
| Settings | `#/t/settings` | Forms: sectioned settings, billing, and a danger zone. | .muted .btn .stack .row .field .input .label .choice .switch .card .shell .wordmark .nav .shell-main .topbar .shell-toggle .avatar .grid .input-group .affix .optional .form-grid .help .table-wrap .table .badge .n .link .danger .grow <Segmented> <useToast> | `~/Projects/design/src/site/templates/Settings.tsx` |
| Canvas | `#/t/canvas` | Work surface: tool rail, inspector, dock, selection on a canvas. | .btn .row .avatar .mini-field .panel-section .toolbar .faint .canvas .wordmark .avatars .panel .badge .panel-row .swatches-pick .range .nav .dock .dock-page .dock-sep .mono .num | `~/Projects/design/src/site/templates/Canvas.tsx` |
| Article | `#/t/article` | Reading: title, byline, hero, prose, related. | .muted .btn .row .stack .topbar .wordmark .tabs .spacer .breadcrumbs .avatar .prose .grid .card .mono | `~/Projects/design/src/site/templates/Article.tsx` |
| Landing | `#/t/landing` | Marketing: hero, features, pricing, FAQ, footer. | .container .btn .row .muted .stack .wordmark .badge .grid .topbar .spacer .faint .grow .accordion <Segmented> | `~/Projects/design/src/site/templates/Landing.tsx` |
