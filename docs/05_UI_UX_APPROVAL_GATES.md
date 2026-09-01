# Frontend UI/UX Human Approval Gates

These gates prevent Codex from building a technically functional but operationally wrong interface. **Only the user may approve UI-00 through UI-09.**

## Universal evidence required at every UI gate

1. Exact commit SHA and runnable instructions/build.
2. A deterministic fixture containing hierarchy, long labels, milestones, links and relevant edge cases.
3. Screenshots at 1920×1080 and 1440×900; additional high-DPI capture where scaling is material.
4. A short interaction recording covering every gate journey.
5. State sheet: normal, hover, selected, focused, disabled, empty, loading, error/conflict and large-data state where relevant.
6. Keyboard/focus path and shortcuts demonstrated.
7. Side-by-side behavioural comparison to applicable images in `assets/reference/`—not pixel imitation.
8. Known deviations, unresolved questions and proposed disposition.
9. Independent validator report declaring `ELIGIBLE FOR USER REVIEW`.
10. Approval file containing the exact user response.

## Approval tokens

- `APPROVE UI-XX`
- `REJECT UI-XX: <reason>`
- `CONDITIONAL APPROVAL UI-XX: <conditions>`

Silence is not approval. Conditional approval blocks work outside the stated conditions.

## UI-00 — Information architecture and visual direction

**Must demonstrate before production frontend code:**

- All Projects tab plus individual project tabs;
- Schedule, Resource and Calendar views;
- hierarchy from project→phase→activity→sub-activity→bar;
- contextual command model equivalent in discoverability to the source ribbon without copying it;
- compact and expanded schedules;
- original high-density visual system: typography, spacing, grid, selection, bars, summaries, milestones, links and states;
- how continuous timeline density and row scaling are controlled;
- where details/inspectors and saved views live;
- explicit list of deliberate differences from FastTrack.

**Reject if:** it looks like a generic SaaS dashboard, hides the All Projects hierarchy behind cards, wastes major screen area, or cannot plausibly support the dense source workflow.

## UI-01 — Executable shell and navigation

Must demonstrate tabs, view switching, contextual commands, split panes, status bar, shortcuts, window/panel behavior, empty/loading/error states and restoration of workspace state.

## UI-02 — Schedule View structure

Must demonstrate:

- grid/timeline split and synchronized variable rows;
- stable row numbers, hierarchy controls, Show Level and compact summary rows;
- multi-row timescales, visible range and direct proportional density scaling;
- bars, milestones, summary bars, links, labels, non-working shading, datelines and QuickLook;
- multiple bars in a row;
- column resize/reorder/hide and Autofit;
- large schedule scroll/zoom without visible desynchronisation.

## UI-03 — Direct manipulation and tools

Must demonstrate Arrow, Bar, Link, Revise, Percent, Text Box and Lock Tool; bar draw/move/resize; valid/invalid link feedback; dependency type/lag editing; selection/multi-selection; snapping; transactional preview; keyboard equivalents; one-step compound undo; conflict/cycle explanation.

## UI-04 — All Projects workspace

Must demonstrate:

- every project as one compact summary row;
- selective expansion of one project while others remain compact;
- nested expansion in the same window;
- Projects Only, level controls, Expand All and Expand Everything;
- one shared timeline and continuous vertical sequence;
- Active Now/current-work view across projects;
- independent project identity/dates and approved consolidation behavior;
- no duplicated canonical activity data.

## UI-05 — Resource View

Must demonstrate resource table/profile, Percent Work Usage, Work Usage and Assignments projections, over-allocation and contributing bars, assignment editing, resource calendar, cross-project workload and precise sync back to Schedule/All Projects.

## UI-06 — Tracking and baseline visual language

Must make Scheduled, Revised, Actual, percent complete, active baseline, variance, status date and critical path immediately distinguishable without excessive visual noise. Include partial, completed, late, unstarted, milestone and summary states.

## UI-07 — Calendar View

Must demonstrate continuous wall-calendar layout, spanning bars, milestones, collisions/stacking, long-path labels, inspection/editing behavior, filters/ranges and bidirectional synchronization.

## UI-08 — Reporting and print

Must demonstrate Layout/Filter/Sort/Range/Report workflow, FastSteps, Summary Graph, style/components, text/picture/legend objects, z-order, Header/Footer, page breaks, Print Preview, pagination and PDF output.

## UI-09 — Final integrated experience

Must demonstrate a complete real workflow:

1. open All Projects;
2. identify current work and a delayed project;
3. expand into an activity;
4. revise/link/update progress;
5. inspect resource impact;
6. view on calendar;
7. save a report and export PDF;
8. close/reopen with state preserved;
9. undo/redo and recover from a simulated interrupted operation;
10. remain responsive on the approved large fixture.

No release approval follows automatically from UI-09; G-REL-02 remains separate.
