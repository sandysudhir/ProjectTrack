# Step-by-Step Execution Plan

Every phase starts with a work packet and ends with a checkpoint, independent validation and a clean commit. No phase may start until all prerequisite gates are satisfied.

## P00 — Handoff validation

1. Run the repository integrity validator.
2. Confirm all required files, 52 references and machine-readable matrices.
3. Check instruction consistency and current gate state.
4. Create independent `G-HANDOFF-00` report.
5. Fix packaging defects only; do not design or code product behavior.
6. Commit and stop if FAIL; proceed to P01 only after PASS.

## P01 — Architecture and decision closure

1. Extract P0 requirements and questions.
2. Produce canonical domain model and database ownership diagram.
3. Define calendar arithmetic and unit policy.
4. Define dependency, constraint and conflict semantics.
5. Define Scheduled/Revised/Actual/Baseline transition table.
6. Define summary/project roll-up equations.
7. Define consolidation/master ownership and resource identity.
8. Define command/undo/transaction model.
9. Create low-fidelity information architecture and original visual direction.
10. Validate against every architectural invariant.
11. Submit `G-ARCH-01` and `UI-00` evidence.
12. Stop for explicit user approval.

## P02 — Desktop shell and navigation

1. Scaffold Tauri/React workspace and core package boundaries only after approvals.
2. Implement tab workspace: All Projects and individual project tabs.
3. Implement Schedule/Resource/Calendar switching and contextual command regions.
4. Add split panes, status bar, focus model, shortcut framework and empty/loading/error states.
5. Use a deterministic sample fixture; no fake backends hidden as complete features.
6. Run E2E/visual/keyboard checks.
7. Submit UI-01 evidence and stop.

## P03 — Calendar and deterministic scheduler core

1. Implement immutable domain entities and commands.
2. Implement calendar engine with split shifts, exceptions and inheritance.
3. Implement FS/SS/FF/SF, lag/lead and cycle detection.
4. Implement eight constraint types and explicit conflicts.
5. Implement deterministic full rescheduling.
6. Build golden fixtures and at least the scheduled core subset of test catalog.
7. Add persistence round trip for core states.
8. Independent validation at G-ENG-02; stop on failure.

## P04 — Static Schedule View and geometry

1. Implement virtualized hierarchical grid and timeline viewport.
2. Implement one canonical variable-row geometry service.
3. Add stable row numbers, outline controls, Show Level and compact summary projection.
4. Add multi-row timescales, separate visible range/units/density and direct header scaling.
5. Render bars, milestones, summary bars, links, labels, non-working shading, datelines and QuickLook.
6. Implement typed cells/columns and resize/reorder/hide/freeze basics.
7. Run 10k-row scroll/zoom/expand benchmarks.
8. Submit UI-02 evidence and stop.

## P05 — Direct manipulation and tools

1. Implement central ToolController and Lock Tool.
2. Implement Arrow selection/move/resize and Bar drawing.
3. Close Q-001/Q-002, then implement graphical link creation and routing.
4. Implement Revise, Percent and Text Box according to approved transitions.
5. Add transactional previews, invalid-target feedback and compound undo.
6. Add keyboard equivalents and accessibility/focus behavior.
7. Run E2E, regression and visual tests.
8. Submit UI-03 evidence and stop.

## P06 — Tracking, baselines, summaries and CPM

1. Implement approved state transitions and status date.
2. Implement ten baselines and variance.
3. Implement summary/project roll-ups and summary milestones.
4. Implement CPM, float, critical formatting and priority rule.
5. Add baseline/tracking persistence and resets.
6. Validate calculations at G-ENG-03.
7. Submit UI-06 visual-language evidence and stop for user approval.

## P07 — All Projects workspace

1. Implement native Workspace project tree over canonical projects.
2. Add project-only compact mode and project summary rows.
3. Add selective expansion, level controls and Expand Everything.
4. Add Active Now/current-work projection.
5. Add shared timeline and independent/common-finish modes as approved.
6. Add missing-source, refresh and ownership feedback.
7. Benchmark many projects/10k total rows.
8. Submit UI-04 evidence and stop.

## P08 — Resources, work and cost

1. Implement resource profiles and resource calendars.
2. Implement assignments, units, work and approved lock-variable matrix.
3. Implement usage buckets, over-allocation and cross-project aggregation.
4. Implement contours, spot allocations, overtime and rate overrides after decisions.
5. Implement resource/cost roll-ups and baseline/actual variance.
6. Validate calculation engine at G-ENG-04.
7. Submit UI-05 evidence and stop.

## P09 — Calendar View

1. Implement continuous wall-calendar projection.
2. Render spanning bars, milestones and approved labels.
3. Implement collision/stacking and filtering.
4. Add direct inspection/editing only after semantics are approved.
5. Verify bidirectional synchronization and persistence.
6. Submit UI-07 evidence and stop.

## P10 — Saved views, reporting and print

1. Implement versioned Layouts, Filters, Sorts and Ranges.
2. Implement Reports as complete view snapshots and safe FastSteps.
3. Implement typed field/formula/value-list enhancements and column summaries.
4. Implement bar-style/component editor and visual object layer.
5. Implement Summary Graphs.
6. Implement print preview, pagination, headers/footers, page breaks, PDF and wall chart.
7. Submit UI-08 evidence and stop.

## P11 — Interoperability

1. Implement CSV and XLSX with mapping previews/reports.
2. Implement Microsoft Project XML.
3. Implement ICS and HTML/table exchange.
4. Implement high-resolution image and supported vector clipboard/export.
5. Assess MPP library separately; never block XML route.
6. Run round-trip and malformed-input suites.
7. Independent validation at G-REL-01.

## P12 — Integrated release candidate

1. Execute complete user journeys from All Projects to detailed editing and reports.
2. Run full regression, visual, accessibility/keyboard, performance and resilience suites.
3. Validate autosave/recovery, archive and migration.
4. Resolve all S0/S1 and gate-blocking S2 defects.
5. Submit UI-09 integrated experience.
6. Independent release validation.
7. Submit G-REL-02 and stop for user release decision.
