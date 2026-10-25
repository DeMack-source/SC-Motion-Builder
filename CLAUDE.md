# CLAUDE.md

Guidance for Claude/AI assistants working in this repository.

## What this is

**Second Chance Legal Tools / FL Motion Builder** — a static, client-side-only
web app that helps Florida defendants and post-conviction litigants draft
legal motions (Rule 3.850, 3.800, Seal/Expunge, appeals, federal habeas,
etc.), calculate filing deadlines, search charges/statutes, and look up a
legal glossary. No backend, no build step, no package manager — just HTML,
vanilla JS, and CSS deployed as a GitHub Pages PWA.

## File map

| File | Role |
|---|---|
| `index.html` | The actual entry point. Tiny — sets `window.APP_VERSION`, loads `styles.css`, `charges.js` (blocking), and `app.js` (deferred). Body is just `<div id="app-root">`. |
| `app.js` | The entire application (~8650 lines). Defines motion `FLOWS`, all UI rendering, the deadline calculator, charge/case "intelligence" engines, the procedural case-state machine, search, drafts/autosave, and `bootstrapApp()` (~line 8598) which boots everything. |
| `app-shell.html` | The real UI markup (tabs, panels, inputs, modals — ~950 lines). **Not loaded via `<script>` or `<link>`** — `bootstrapApp()` `fetch()`s it at runtime and injects it into `#app-root`. This is why the app cannot run from `file://`; it needs an HTTP server (even a local one) for the fetch to succeed. |
| `charges.js` | Static data: the `CHARGES` array (per-charge sentencing/bond/procedural/collateral data) and `countyProfiles`. Loaded non-deferred, before `app.js`, so its data exists first. |
| `sw.js` | Service worker. Tiered caching: network-first for navigations, cache-first for fonts and same-origin assets, network-first-with-fallback for everything else. |
| `styles.css` | All styling, loaded directly by `index.html`. |
| `fl-motion-builder.html` | Legacy/standalone self-contained build (own inline `<style>`, ~2000 lines). Not linked from `index.html` or `app.js`; only referenced in `sw.js`'s precache list. Treat as a fossil unless told otherwise — don't assume it's kept in sync with `app.js`/`app-shell.html`.
| `motion-manifest.json`, `app.json` | PWA manifest and app metadata. |
| `tests/smoke.spec.js` | Playwright smoke tests (app boot, charge search hit/no-results, quick search) — see "Automated tests" below. |
| `playwright.config.js` | Serves the static site via `python3 -m http.server 4173` for tests (the app needs HTTP, not `file://`, same reason as local dev). |
| `package.json` / `package-lock.json` | Only used for the Playwright dev dependency and `npm test`. The app itself still has no build step / bundler. |
| `.github/workflows/smoke-test.yml` | Runs the Playwright suite on every PR into `main` and every push to `main`. |
| `.github/workflows/deploy-gh-pages.yml` | Auto-syncs `gh-pages` to `main` on every push to `main` — see the `gh-pages` gotcha below. |

## Critical gotcha: classic scripts don't auto-attach to `window`

`charges.js` and `app.js` are plain (non-module) scripts. A top-level
`const CHARGES = [...]` lives in the *global lexical environment*, not on
`window`. Code in `app.js` that does `window.CHARGES` will get `undefined`
unless `charges.js` explicitly does `window.CHARGES = CHARGES;` (it does,
at the end of the array/object — see `charges.js` near the closing `];`/`};`
of `CHARGES` and `countyProfiles`). If you add new top-level data structures
that other scripts need to read, mirror this pattern explicitly — don't rely
on bare-identifier fallback across script-file boundaries.

## Critical gotcha: GitHub Pages deploys from `gh-pages`, not `main`

This repo's GitHub Pages source is the **`gh-pages` branch**, not `main`.
Merging a fix into `main` does **not** by itself make it live. Confirmed by
inspecting the "pages build and deployment" workflow runs via the GitHub
API — Pages only rebuilds when `gh-pages` itself receives a new commit.

**As of `.github/workflows/deploy-gh-pages.yml`, this is now automatic** —
every push to `main` fast-forwards `gh-pages` via `peaceiris/actions-gh-pages@v4`
(requires `permissions: contents: write` in the workflow). Before that
workflow existed, this required a manual PR (`head=main`, `base=gh-pages`).
If the live site ever shows stale behavior again, check this workflow's run
history first — confirm it actually ran and succeeded on the latest `main`
push — before assuming the code fix itself is wrong. Also check
`window.APP_VERSION` / the `app.js?v=...` query string in the browser
console against what's actually on `main`.

## Three layers of caching to bust together

When shipping a fix to `app.js`, `app-shell.html`, or `charges.js`, bump
**all** of these in the same change, or stale clients won't see it:

1. `index.html` — `window.APP_VERSION = '<id>'`, `<script src="app.js?v=<id>" defer>`,
   and `<link rel="stylesheet" href="styles.css?v=<id>">` (yes, `styles.css`
   gets its own cache-busting query string too — bump it alongside the others
   whenever `styles.css` itself changes).
2. `app.js` — `const APP_BUILD_ID = '<id>'` (near the top, ~line 656). This is
   also used as the cache-busting query string when `bootstrapApp()`
   `fetch()`es `app-shell.html?v=<id>`.
3. `sw.js` — bump `const CACHE = 'sc-motion-vN'` (forces old cache deletion
   on `activate`) and update the versioned `app.js?v=<id>` entry in `ASSETS`.

After bumping, verify with `grep -rln "<old-id>" index.html app.js sw.js` —
it should return nothing.

`purgeStaleBuildState()` (`app.js` ~line 704) also compares `localStorage`'s
stored build id against `APP_BUILD_ID` to detect stale clients — keep it in
mind if debugging "fix didn't take" reports.

## Critical gotcha: service worker `clients.claim()` vs. the `controllerchange` reload

`sw.js` calls `self.skipWaiting()` on install and `self.clients.claim()` on
activate, so it takes control of any open page immediately. The problem:
`navigator.serviceWorker.addEventListener('controllerchange', ...)` fires
on that *first-ever* claim too, not just when a new SW version replaces an
old one. `registerServiceWorker()` (`app.js`, ~line 719) used to
unconditionally `window.location.reload()` on `controllerchange`, which
meant brand-new visitors (no prior controller) could get a surprise
full-page reload mid-interaction — wiping in-progress form/search input.
This silently broke the Playwright quick-search smoke test (the page
reloaded right after `fill()`, before the debounced search ran, so the
assertion just hung).

Fix in place: capture `hadController = !!navigator.serviceWorker.controller`
*before* calling `register()`, and only attach the reload-on-controllerchange
listener if `hadController` was true — i.e. only reload when an existing SW
is actually being replaced, not on initial install. If you touch
`registerServiceWorker()` or `sw.js`'s activate handler again, preserve this
distinction.

## App boot sequence

1. `index.html` loads `charges.js` (sync) then `app.js` (defer).
2. `app.js` runs `bootstrapApp()` on `DOMContentLoaded` (or immediately if
   the DOM is already ready).
3. `bootstrapApp()` fetches `app-shell.html`, injects it into `#app-root`,
   then runs a long flat sequence of init/render calls (`renderRights()`,
   `initQuickSearch()`, `initChargeSearch()`, `renderEmotionalIntel()`, PWA
   install prompt setup, online/offline listeners, etc.) — see `app.js`
   inside `bootstrapApp()`, ~line 8598.
4. **There is no try/catch around individual init calls.** An uncaught
   synchronous error in any one call aborts the rest of `bootstrapApp()`
   silently, skipping every init that runs after it in the list. This has
   caused real bugs (e.g. an undeclared module-level variable crashing
   `emotionalIntel()` and silently breaking the glossary search and PWA
   prompt that run later in the same function). When adding a new function
   to the boot sequence, make sure module-level variables it reads are
   actually declared (`let`/`const`/`var`) somewhere, not just assigned
   inside other functions.
5. Event wiring is a mix of `addEventListener` (most things) and inline
   `oninput="..."` HTML attributes (the charge search input, mirroring the
   working glossary search) — the inline pattern was adopted deliberately
   for the charge search to eliminate any doubt about listener-attachment
   timing. Prefer it for new search-style inputs if init-timing reliability
   matters.

## Data model (in `app.js` / `charges.js`)

- `FLOWS` (top of `app.js`, line 1) — the motion wizard definitions:
  per-motion-type `steps` (each with `title`/`sub`/`tip`/`fields`), citations.
  Drives the guided Q&A wizard. `buildQuestions()` (~line 4518) flattens
  `flow.steps` into a flat `questions` array, stamping each question with
  `_stepIndex`, `_stepTitle`, `_totalSteps` (`flow.steps.length`), `_fi`,
  `_condition` — this derived metadata is what the step indicator and the
  Journey Map (below) render from, so prefer extending it over adding a
  parallel data structure.
- `CHARGES` (`charges.js`) — per-charge data: `name`, `statute`, `degree`,
  `keywords`/`aliases`, `sentencing`, `bond`, `procedural`, collateral
  consequences. Exposed as `window.CHARGES`. `CHARGE_INDEX` is a derived
  search index built right after.
- `countyProfiles` (`charges.js`) — per-county metadata (courts, specialty
  dockets, local rules). Exposed as `window.countyProfiles`. Always read it
  via `window.countyProfiles` (see `getCountyProfile()` in `app.js`), not the
  bare identifier.
- `LEGAL_LEXICON` / `LEGAL_INDEX` — glossary + fuzzy search index used by
  `legalSearch()`, `filterGlossary()`, and quick search. (Not the same as
  `GLOSSARY` below — `LEGAL_LEXICON` backs quick search, `GLOSSARY` backs the
  dedicated Glossary tab.)
- `GLOSSARY` (`app.js` ~line 1588, 37 entries) — `{t, d, key, simple}` per
  term: `d` is the standard legal definition, `simple` is a plain-language
  rephrasing for non-lawyer readers (family members, etc.), `key` flags
  "essential" terms. `glossarySimpleMode` (toggled by
  `toggleGlossarySimpleMode()`) swaps which field `renderGlossaryList()`
  renders. Any new glossary entry needs both `d` and `simple` filled in.
- Procedural case-state machine (`app.js` ~3063–3160) — `CASE_STATES` maps
  each lifecycle stage (`ARREST` → ... → `REENTRY`) to a `label`/`icon`/
  `remedies`/`blocked`/`note`/`actions`; `STATE_ORDERS` defines stage
  sequence; `STATE_FLOW_MAP` maps certain motion IDs directly to a state
  (`'3850'/'3800'` → `POSTCONVICTION`, `'2254'` → `FEDERAL_HABEAS`, etc.).
  `getCaseState(session, answers, motionId, timeline)` derives the current
  state; `getCurrentState()` is the no-args convenience wrapper used
  everywhere in the UI; `getStateContext(state)` adds `progress`/`index`/
  `total`. `filterMotionsByState()` (~line 3606) uses `ctx.blocked` to grey
  out `.motion-tile`s not available yet, and `RECOMMENDED_MOTION_BY_STATE`
  (~line 3152) to badge the single best-first-pick tile for the current
  stage (`.tile-recommended` / `.tile-recommended-badge`) — this is the
  state machine doing double duty, not two separate systems.
- `FIELD_HELP_FALLBACKS` / `getFieldHelpFallback(q)` (~line 3972) — keyword-
  matched (`hay.includes(keyword)`) generic help text for wizard fields that
  don't define their own `help` string. **Gotcha**: substring matching can
  false-positive across similarly-named fields (e.g. a `'community'` keyword
  matched both the intended `community` field and the unrelated
  `community-service` field) — pick the most specific keyword available and
  spot-check every no-help field's resolved text before shipping a new entry.
- Session/draft state persists via the `S` wrapper (`app.js` ~line 660), a
  thin `localStorage` abstraction with a no-`localStorage` fallback.

## Wizard UI conventions

This app's core design tension: it serves both legally-sophisticated users
and family members/laypeople with no legal background. The house style for
closing that gap is to **extend existing rendering paths**, not add new UI
chrome, so the experience stays consistent:

- **Step indicator** — `renderQuestion()` (`app.js` ~line 4728) shows
  "Step N of M" using `_stepIndex`/`_totalSteps` already stamped onto each
  question by `buildQuestions()`.
- **Journey Map** — `renderJourneyMap()` (~line 4715) renders `flow.steps`
  as a horizontal row of "gates" (`#journey-map` in `app-shell.html`, inside
  `#q-wizard`, between the progress bar and the question card) so a user can
  see the whole path from Start to File, not just their current step. Called
  from `renderQuestion()` and `setQuestionIdleState()` — wire any new
  question-render path into it too, or the map will go stale.
- **Field help fallback** — `q-field-help` (the always-visible help div under
  each wizard question) prefers `q.help`, falls back to
  `getFieldHelpFallback(q)` (see `FIELD_HELP_FALLBACKS` above) if the
  question doesn't define its own.
- **Real-time format hints** — `checkCaseNumberFormat(el)` (~line 4920)
  toggles a `.field-warn` border class and fills a `.q-format-hint` div when
  a typed case number doesn't match Florida's `YYYY-CF-XXXXXX`-ish shape.
  Wired via inline `oninput="...checkCaseNumberFormat(this)"` in both the
  wizard's `case-num` question and the case-intake form's
  `#intake-case-num` — it does not block submission, just warns.
- **Progressive disclosure** — the case-intake form reveals its later fields
  only once the county field has a value (`revealIntakeProgressive()`,
  ~line 3683, toggling `#intake-progressive`'s `display`), to avoid
  overwhelming a first-time visitor with the whole form at once.
- **Reuse visual patterns over inventing new ones** — e.g. the glossary's
  "Simple mode" toggle (`#glossary-simple-toggle`) reuses the
  `.charge-plain-toggle`/`.toggle-indicator` markup and CSS from the
  existing charge-intel plain-English toggle verbatim, rather than building
  new toggle chrome.

## Verifying changes without a browser

This sandbox typically can't download Playwright's browser binary (see
"Automated tests" below), so the practical day-to-day verification loop for
logic changes in `app.js` is a throwaway jsdom harness:

1. `npm install --no-save jsdom`
2. Write a `test_*.js` script: build a `JSDOM` instance with minimal HTML
   scaffolding for whatever IDs the code under test touches, set
   `global.window`/`document`/`navigator`/`location` (all three —
   `installMobileDebugPanel()` reads `location.search` and throws
   `ReferenceError: location is not defined` if you skip it) and a stub
   `global.localStorage`, then `fs.readFileSync` both `charges.js` and
   `app.js`, concatenate them with inline test code, and run it all through
   **one** `dom.window.eval()` call (scripts loaded separately won't share
   scope the way classic `<script>` tags do).
3. Call the modified function(s) directly and assert on the resulting DOM/
   state.
4. Delete the test script and `npm uninstall jsdom` immediately after —
   don't leave jsdom in `package.json`/`package-lock.json`.

Also run `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"`
after every edit as a fast syntax check before the jsdom round-trip.

## Development workflow

- No build step, no `npm install`, no bundler. Just edit the files directly.
- **You must serve the app over HTTP to develop it** (e.g. `python3 -m
  http.server` from the repo root) — opening `index.html` via `file://`
  breaks the `fetch('app-shell.html')` call in `bootstrapApp()`.
- Still verify changes manually too: load the app in a real browser and
  exercise the affected feature (search, wizard step, deadline calculator,
  etc.) and watch the console for errors — the smoke suite is narrow (boot,
  charge search, quick search) and won't catch most regressions.
- GitHub Actions: `smoke-test.yml` (Playwright, on PRs/pushes to `main`) and
  `deploy-gh-pages.yml` (auto-sync to `gh-pages`, on pushes to `main`), plus
  GitHub's built-in dynamic `pages-build-deployment` triggered by pushes to
  `gh-pages` itself.

## Automated tests

- `npm install && npx playwright install --with-deps chromium && npm test`
  runs the Playwright suite (`tests/smoke.spec.js`) against the static site
  served by `playwright.config.js`'s `webServer` (`python3 -m http.server
  4173`) — this is real HTTP, so it exercises the same `fetch('app-shell.html')`
  boot path as production, unlike `file://`.
- Coverage is intentionally narrow: app boots without console/page errors,
  charge search returns a hit and a no-results state, quick search opens a
  results panel. These specifically target the failure class this repo has
  shipped before (init-timing bugs, undeclared globals, stale caching, and
  now the SW-reload bug above) — not general feature coverage.
- Sandboxed/offline dev environments may not be able to download Playwright's
  browser binaries (network egress to `cdn.playwright.dev` is commonly
  blocked) — in that case reason about the fix from source and rely on the
  GitHub Actions run (real network access) as the actual first execution.

## Git / PR conventions observed in this repo

- Feature/fix work happens on a dedicated branch (e.g.
  `claude/sc-motionbuilder-search-bars-TvRLM`), not directly on `main`.
- PRs are opened from that branch into `main`, as drafts by default, and
  merged there once CI (`smoke-test.yml`) is green. While a PR from that
  branch is still open, a fresh push of related work lands as an *additional
  commit on the same PR* rather than a new PR — check
  `list_pull_requests`/`get_status` for an open PR on the branch before
  assuming a new one is needed.
- Deploys to `gh-pages` now happen automatically on merge via
  `deploy-gh-pages.yml` — see the gotcha above. No manual sync step needed
  anymore, but it's still worth confirming the workflow actually ran/succeeded
  (`actions_list` → `list_workflow_runs` for `deploy-gh-pages.yml`) if a fix
  doesn't appear live.
- Keep commits small and scoped to one fix each with a descriptive message
  explaining *why*, not just what — this repo's history relies on that to
  reconstruct intent later (see commits like `4f27329`, `099258a`, `6156582`).
- The default working rule has been "enhance existing features, don't add
  new ones" — when a request reads as a new feature, flag the tradeoff and
  confirm before building it. The user can and has explicitly overridden this
  rule for specific features ("they are new but i believe are necessary");
  treat that as authorization for the named items only, not a standing
  blanket exception.
