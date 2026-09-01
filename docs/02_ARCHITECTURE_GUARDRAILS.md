# Architecture Guardrails

## Hard invariants

1. **Row is not Bar:** `Row` owns `Bar[0..N]`; custom fields declare storage scope.
2. **State separation:** Scheduled, Revised, Actual and Baseline are independently persisted.
3. **Native workspace tree:** Workspace owns Projects; Project owns Rows; All Projects is a projection of canonical data.
4. **Derived summaries:** summary/project bars and metrics derive from descendants.
5. **Stable identity:** immutable UUIDs are separate from row numbers and visible bar IDs.
6. **Timestamp scheduling:** calendar arithmetic operates on timestamps, shifts and exceptions.
7. **View-state separation:** layout geometry never mutates schedule data.
8. **Core isolation:** domain, calendar, scheduler, resource and persistence packages do not depend on React.
9. **Correctness first:** deterministic full scheduler before dirty-graph optimisation.
10. **Transactional edits:** pointer operations commit one reversible domain command.
11. **Single source of truth:** views never maintain divergent project copies.
12. **Evidence before parity claims:** undocumented FastTrack behavior remains open or becomes an approved ProjectTrack decision.

## Proposed module boundaries

```text
apps/desktop                  Tauri/React composition only
packages/domain               entities, commands, invariants
packages/calendar-engine      timestamp and working-time arithmetic
packages/scheduler            dependencies, constraints, CPM, summaries
packages/resource-engine      assignments, work, contours, overtime, cost
packages/persistence          SQLite, migrations, autosave, recovery
packages/ui-grid              virtualized grid and canonical row geometry client
packages/ui-timeline          timeline transforms, renderer and tools
packages/reporting            views, visual objects, pagination, PDF
packages/import-export        format adapters and compatibility reports
```

## Canonical entities

Workspace, Project, Row, Bar, ScheduleState, Baseline, Dependency, Constraint, Resource, Assignment, WorkCalendar, CalendarException, FieldDefinition, Layout, Filter, SortDefinition, RangeDefinition, ReportDefinition, FastStep, Dateline, BarStyle, VisualObject.

## Decisions required before code

Close or explicitly defer all P0 questions in `docs/10_OPEN_QUESTIONS.md`, especially summary mathematics, tracking transitions, linking gestures/type selection, resource identity and consolidation ownership.

## Rejection conditions at G-ARCH-01

- one-task-per-row schema;
- Scheduled and Revised sharing the same mutable fields;
- All Projects implemented through copied records;
- summary rows stored as unrelated manual tasks;
- UI components containing scheduling mathematics;
- optimisation before a reference full solver;
- no conflict/undo/atomicity model;
- unresolved P0 semantics hidden as implementation assumptions.
