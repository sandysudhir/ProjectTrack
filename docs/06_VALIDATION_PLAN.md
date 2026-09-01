# Independent Validation Plan

## Purpose

Prove that ProjectTrack is correct, traceable, resilient and usable—not merely implemented. Validation is performed by a separate Codex task against an exact commit SHA.

## Validation model

| Layer | Focus | Main evidence |
|---|---|---|
| L0 | Handoff/document integrity | validator script, file/ID/manifest checks |
| L1 | Architecture and static invariants | schema/code inspection, dependency rules, decision records |
| L2 | Deterministic unit correctness | requirement-driven unit/golden tests |
| L3 | Integration correctness | cross-module and persistence tests |
| L4 | UI interaction and visual quality | Playwright, visual diffs, recordings, keyboard/focus checks |
| L5 | Performance and resilience | repeatable benchmarks, crash/recovery/cancellation tests |
| L6 | Interoperability | round trips, compatibility reports, malformed input tests |

## Traceability

Every executable test and evidence item must reference requirement IDs. Every requirement row records design, implementation, unit, integration/UI, performance, validator and user-approval status.

## Test oracle strategy

1. Create small hand-computable golden schedules.
2. Encode expected timestamps, summaries, float, work and cost as fixtures.
3. Compare every incremental result with a clean deterministic full recomputation.
4. Use metamorphic checks: shift entire calendar, scale quantities, reorder unrelated rows, save/reopen, and verify invariant outputs.
5. Use property-based generation for cycle detection, calendar intervals and serialization.
6. Preserve every discovered defect as a regression test.

## Required technical suites

### Calendar

Split shifts, weekends, working/non-working exceptions, base/resource/bar inheritance, Ignore Resource Calendars, fractional units, timestamp precision, timezone policy.

### Dependencies and constraints

FS/SS/FF/SF; positive/negative lag; multiple predecessors/successors; cycles; all eight constraints; impossible/conflicting schedules; graphical command rollback.

### Tracking and summaries

Scheduled/Revised/Actual transitions; Reset commands; status date; baselines 1..10; variance; summary dates/duration/work/cost/progress/counts; mixed calendars; project roll-up.

### CPM

ES/EF/LS/LF, total/free float, parallel paths, constraints, mixed calendars, priority ties and threshold.

### Resources and cost

Units, capacity, overload, calendars, fixed duration, effort-driven mode, contours, spot allocation, overtime, rates, per-use cost, cross-project aggregation.

### Persistence and undo

Atomic save, autosave/recovery, migration, round trip, 100+ undo, compound transactions, view-state vs domain-state undo.

### UI/E2E

Grid/timeline sync, row/timeline scaling, Autofit, drawing/moving/resizing/linking/revising/progress, outline, All Projects, Resource, Calendar, reports, keyboard/focus and error states.

### Performance

10k rows, 15k bars, 25k dependencies, 2k resources and 50k assignments. Measure cold/warm open, scroll/zoom frame time, editing latency, recalculation, filtering/sorting, project expansion, resource aggregation, save and memory. Publish hardware and thresholds.

### Interoperability

CSV/XLSX/Project XML/ICS/HTML/PDF/image/vector paths, supported-field preservation, loss reports, malformed input and large input.

## Severity and gate rules

- S0 or S1 open: automatic FAIL.
- Gate-critical S2 open: technical FAIL or UI not eligible.
- S3 may pass only with explicit documented deferral.
- Test skips count as unverified, not PASS.
- Flaky tests count as FAIL until root cause or approved quarantine with owner/date.
- A validator never changes human approval status.

## Evidence retention

Store immutable reports in `governance/validation_reports/`, UI bundles in `governance/ui_evidence/`, checkpoints in `governance/checkpoints/`, and approval responses in `governance/approvals/`. Tie every filename and report to commit SHA.

## Release validation

G-REL-02 requires:

- all P0/P1 requirements resolved or explicitly deferred by the user;
- no open S0/S1;
- all mandatory suites PASS;
- user approvals UI-00..UI-09 present;
- recovery and migration demonstrated;
- performance thresholds met on declared hardware;
- installable Windows artifact, SBOM/dependency audit and clean release notes;
- final traceability matrix complete.
