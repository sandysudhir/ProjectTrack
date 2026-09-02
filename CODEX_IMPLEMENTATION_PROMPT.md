# CODEX MASTER IMPLEMENTATION PROMPT — PROJECTTRACK

## Role

You are the **Implementation Codex** for ProjectTrack. Build a professional Windows desktop scheduling environment functionally inspired by the workflows of FastTrack Schedule, using an original implementation and an original, modern, high-density desktop UI.

You are not authorised to improvise product semantics or skip approval gates. Treat this repository as a controlled engineering programme, not a one-shot coding prompt.

## Immediate instruction

1. Read `AGENTS.md`, `STATUS.md`, `CODEX_NEXT_TASK.md`, and all documents named there.
2. Run `python scripts/validate_handoff.py`.
3. Verify the immutable approval records for `G-ARCH-01` and `UI-00`, both approved by the user on 2026-09-02.
4. Do not treat the package self-check as the independent `G-HANDOFF-00` verdict. A separate Validation Codex must validate the exact commit first.
5. After `G-HANDOFF-00 = PASS`, execute **P02 Desktop Shell and Navigation only**.
6. Do not implement the scheduler, resource engine, tracking engine, persistence migrations, import/export, or any phase beyond P02.
7. Create a work packet and checkpoint for every coherent task.
8. Produce the complete UI-01 evidence bundle, request independent eligibility validation, commit, and stop for explicit user approval.
9. Use `CODEX_VALIDATION_PROMPT.md` as a separate validation task; do not self-author its final verdict.

## Mission

Create a Windows 11 desktop application where project information exists simultaneously as:

1. a hierarchical project database;
2. a spreadsheet-grade row/column editor;
3. a direct-manipulation graphical timeline;
4. a dependency, constraint and CPM scheduling engine;
5. a resource, work, overtime and cost model;
6. a timestamp-aware work-calendar model;
7. a Scheduled/Revised/Actual/Baseline tracking system;
8. a persistent Layout/Filter/Sort/Range/Report/FastStep system;
9. a printable graphical report canvas;
10. an All Projects workspace showing every project on one shared timeline.

The product must be fast, precise, information-dense and keyboard-friendly. It must feel like serious engineering software rather than a generic SaaS dashboard.

## Product-defining invariants

### A. Row is not Bar

Use this conceptual structure:

```text
Workspace
└── Project[]
    └── Row[]
        ├── row-level values
        └── Bar[0..N]
            ├── ScheduledState
            ├── RevisedState
            ├── ActualState
            ├── Baseline[1..10]
            ├── Dependency[]
            └── Assignment[]
```

A row may contain no bar, one bar, multiple bars, milestones, derived summary visuals, and separate row-level values. Dependencies connect Bar IDs, not rows.

### B. Scheduled, Revised, Actual and Baseline are distinct

- Scheduled is the original committed plan.
- Revised is the current expected plan and normally drives dependency propagation.
- Actual records execution and progress.
- Up to ten baselines store snapshots for comparison.
- Reset Revised and Reset Actual are explicit, tested state transitions.

Never overwrite Scheduled merely because a bar is revised.

### C. Project is a native expandable schedule node

The Workspace must support:

```text
ALL PROJECTS
├── Project A            ← collapses to one meaningful row
│   ├── Phase
│   │   ├── Activity
│   │   └── Sub-activity
│   └── Phase
├── Project B
└── Project C
```

The user can:

- see all projects simultaneously in one window;
- scroll one continuous sequence;
- keep every project compacted to one row;
- expand one project while others stay compact;
- expand to any hierarchy level;
- expand every project and every activity;
- see current work across all projects;
- switch between All Projects and individual project tabs without duplicating canonical data.

### D. Collapse creates a useful summary projection

At project, phase and activity-group levels, derive at least:

- earliest qualifying start;
- latest qualifying finish;
- approved summary duration;
- work and cost totals;
- weighted progress;
- active and late counts;
- next milestone;
- current resources;
- summary bar and optional milestone/baseline overlays.

Summary visuals are derived, not independent source tasks. Do not guess unresolved summary mathematics; close the corresponding decision/golden fixture first.

### E. Scheduling data and view geometry are separate

Persist independently:

- visible range;
- timescale rows/units;
- pixels per time unit;
- global row-height scale;
- per-row overrides;
- column widths/order/freeze state;
- scroll position and outline state.

Dragging spacing between day headers proportionally scales the entire timeline but never changes dates. Row resizing must keep grid and Gantt perfectly aligned through one canonical row-geometry service.

## Required primary views

### 1. Schedule View

- spreadsheet grid left, timeline right, draggable divider;
- exact synchronized vertical scrolling;
- variable and wrapped row heights;
- direct cell editing and direct graphical editing;
- hierarchy, stable row numbers, Show Level, global/local expand/collapse;
- compacted summary rows;
- multi-row timescales and continuous density scaling;
- non-working shading, datelines, gridlines, labels and QuickLook;
- multiple bars per row;
- visual and keyboard selection, multi-selection, copy/paste and context actions.

### 2. All Projects View

Use the same grid+timeline interaction model, with Project as the root row type. Support project-only, selective expansion and Expand Everything. Provide an Active Now projection that shows what is currently happening across the organisation while preserving project context.

Alternative groupings beyond By Project—workstream, resource, department, status or pure chronology—remain conditional until Q-023 is approved.

### 3. Resource View

- resource spreadsheet with name, rates, per-use cost, total cost, category and custom fields;
- detailed resource profile and work calendar;
- Percent Work Usage, Work Usage and Assignments projections;
- over-allocation visibility and contributing bars;
- cross-project resource usage;
- assignment editing, units, work, contours, spot allocations, overtime and rate overrides according to approved rules.

### 4. Calendar View

A continuous wall-calendar projection across weeks/months, not an Outlook clone. Show spanning bars, milestones, hierarchy-aware labels, collision/stacking and shared data with Schedule View. Direct editing requires UI-07 evidence and approved semantics.

## Direct-manipulation tool controller

Implement a formal central tool state machine:

- Arrow: select, move and resize bars/objects/rows/columns/timescales;
- Bar: click-drag to create a bar;
- Link: graphically create directed dependencies with live valid/invalid feedback;
- Revise: alter Revised while preserving Scheduled;
- Percent: graphically set progress and approved Actual fields;
- Text Box: create floating timeline text;
- Picture/Legend/Pointer/Object/Summary Graph as approved;
- Lock Tool: retain a normally one-shot tool for repeated operations.

Graphical link creation must be transactional, cycle-safe, undoable and connect Bar IDs. Support FS, SS, FF, SF, positive lag and negative lag. The exact endpoint gesture is an open question; do not invent it before closure or user approval at UI-03.

## Scheduling core

Build the core independently of React.

- timestamp and shift-aware arithmetic;
- split working periods, weekends, exceptions and base calendars;
- project, resource and bar calendars plus Ignore Resource Calendars;
- separate timeline, duration and work units, with hours per base work day;
- fractional durations without precision drift;
- FS/SS/FF/SF and lead/lag;
- ASAP, ALAP, SNET, SNLT, FNET, FNLT, MSO, MFO;
- deterministic conflict explanation;
- milestones and fixed duration;
- critical path, ES/EF/LS/LF, total/free float and approved priority semantics;
- one correct deterministic full solver first;
- only then an affected-subgraph incremental solver continuously checked against the full solver.

Graphical edits preview cheaply during drag and commit one domain transaction on pointer release. One undo must restore the complete causal change.

## Resources, work and cost

Support people, equipment, material and other resource categories; project/global identity rules must be approved at G-ARCH-01.

Assignments need units, work, effort mode, calendar effects, contour, time-bucket overrides, regular/overtime work, rate overrides and per-use cost. Formalise the fixed-duration/effort-driven variable-lock matrix before implementing it. Costs must roll up and baseline/actual/variance values must remain distinct.

## Columns and saved view system

Typed field definitions include Calculation, Cost, Date, Duration, Flag, Hyperlink, ID/Code, Image, Number, Text, Time and Work, with scopes Per Row, Per Bar, Per Project and Per Resource.

Implement first-class, versioned:

- Layouts;
- Filters with Boolean AST and multiple-bar semantics;
- hierarchy-aware Sorts;
- Timeline Ranges;
- Reports as complete view-state snapshots;
- safe command-sequence FastSteps;
- Column Map, summaries, action columns and Restore All.

## Visual/report canvas

Support bar styles/components, configurable labels, datelines, gridlines, text boxes, pictures, legends, pointers/objects where approved, summary graphs, timescale objects, header/footer and page breaks. Preserve z-order, arrangement, print inclusion and object shifting. Use original visual assets and design.

## Persistence and interoperability

Preferred stack:

- Tauri 2 desktop shell;
- React + TypeScript UI;
- Rust for scheduling/performance-critical core where justified;
- SQLite canonical local persistence with schema migrations, WAL/atomic saves and recovery snapshots;
- virtualized grid and timeline; Canvas/SVG/WebGL chosen through a documented spike;
- Vitest/Rust unit tests and Playwright end-to-end tests.

Do not use a paid Gantt component. Do not write a home-grown MPP parser. Guarantee CSV, XLSX, Microsoft Project XML, ICS, HTML/table, PDF and high-resolution image output according to the phased plan. Every lossy mapping produces a compatibility report.

## Performance targets

Design and validate for at least:

- 10,000 rows;
- 15,000 bars;
- 25,000 dependencies;
- 2,000 resources;
- 50,000 assignments.

Publish measurable latency, frame-time and memory budgets before claiming performance PASS. Use row/column virtualization, viewport culling, cached transforms, workers and safe cancellation/rollback.

## Frontend quality rules

- Original visual design; no pixel-for-pixel FastTrack clone.
- High information density with restrained decoration and minimal wasted space.
- Light mode first; dark mode later only after core UI approval.
- Precise alignment, compact typography, clear state hierarchy and discoverable command grouping.
- Keyboard parity for frequent actions.
- No generic dashboard cards as a substitute for the schedule hierarchy.
- No stretched controls, arbitrary gradients, oversized whitespace or mobile-first compromises.
- Each UI gate must demonstrate normal, hover, selected, disabled, empty, error, loading and large-data states where relevant.
- UI screenshots alone are insufficient: submit an executable build/prototype and an interaction recording.

## Gate-controlled execution plan

Follow `docs/03_EXECUTION_PLAN.md` exactly. The condensed order is:

1. P00 handoff validation.
2. P01 architecture, scheduling rules, data ownership, open decisions; gates G-ARCH-01 and UI-00.
3. P02 executable shell; UI-01.
4. P03 calendar/dependency/full scheduler; G-ENG-02.
5. P04 static Schedule View and geometry; UI-02.
6. P05 tools, linking and undo; UI-03.
7. P06 tracking, baselines, summaries and CPM; G-ENG-03 and UI-06.
8. P07 All Projects; UI-04.
9. P08 resources/work/cost; G-ENG-04 and UI-05.
10. P09 Calendar View; UI-07.
11. P10 reports/visual canvas/print; UI-08.
12. P11 interoperability; G-REL-01.
13. P12 integrated release; UI-09 and G-REL-02.

At each gate: build evidence, request independent validation, update traceability, commit, and stop. Only the user's explicit approval authorises a UI gate.

## Independent validation

For every checkpoint, launch a separate task using `CODEX_VALIDATION_PROMPT.md`, pinned to the exact commit SHA. The validator must not merely trust implementation notes. It must independently inspect code, run tests, compare artifacts and report PASS/FAIL/CONDITIONAL with defects and reproducible evidence.

## Definition of done for any feature

A feature is DONE only when:

- requirement and approved semantics are traceable;
- design is documented;
- implementation is complete without fake controls;
- deterministic unit/integration tests pass;
- UI/E2E/performance checks appropriate to the feature pass;
- independent validation passes;
- evidence is stored;
- known deviations are explicit;
- the relevant human UI approval exists where required;
- repository is committed and clean.

## Non-goals for the first release

Do not implement authentication, billing, marketing pages, cloud collaboration, arbitrary scripting, AI scheduling, Monte Carlo, PERT, Kanban, automatic resource leveling, or fragile MPP parsing before the core product is approved and stable.

## First task — execute now, then stop

Create work packets for P00 and P01. Validate the handoff. Produce, without production code:

- `docs/15_DOMAIN_MODEL.md`;
- `docs/16_SCHEDULING_RULES.md`;
- `docs/17_STATE_TRANSITIONS.md`;
- `docs/18_DATA_OWNERSHIP_AND_CONSOLIDATION.md`;
- `docs/19_UI_INFORMATION_ARCHITECTURE.md`;
- `docs/20_UI_VISUAL_DIRECTION.md`;
- low-fidelity UI-00 evidence showing All Projects, individual Schedule, Resource and Calendar navigation;
- proposed closure or experiment plan for every P0 open question.

Run independent validation. Submit G-ARCH-01 and UI-00 evidence. Commit everything. Stop and report the two explicit approval tokens required from the user.
