# Feature Compliance Matrix

A feature is DONE only when design, implementation, validation and any required human approval are complete.

| ID | Capability | Priority | Understanding | Achievability | Target phase/gate | Implementation | Validation | User approval | Gap / closure plan |
|---|---|---:|---|---|---|---|---|---|---|
| ARC-01 | Row separate from Bar | P0 | Confirmed | A | P01 Architecture and governance / G-ARCH-01 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | Risk of UI flattening model → Schema invariants and N-bars-per-row tests |
| ARC-02 | Multiple bars per row | P0 | Strongly supported | B | P01 Architecture and governance / G-ARCH-01 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | Exact selection and display not yet shown → Obtain multi-bar screenshot/workflow |
| ARC-03 | Scheduled/Revised/Actual | P0 | Confirmed | B | P01 Architecture and governance / G-ARCH-01 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | State transitions need rules → Formal transition table |
| ARC-04 | Ten baselines | P0 | Strongly supported | A | P01 Architecture and governance / G-ARCH-01 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | Visual comparison not shown → Baseline-view evidence and tests |
| ARC-05 | Stable row number and Bar ID | P0 | Confirmed | A | P01 Architecture and governance / G-ARCH-01 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | Renumbering rules open → Separate immutable IDs and display numbers |
| UI-01 | Spreadsheet + timeline | P0 | Confirmed | A/B | P04 Schedule View structure / UI-02 | NOT STARTED | NOT VALIDATED | PENDING | Many edge cases → Grid and timeline interaction spec |
| UI-02 | Global Show Level | P0 | Confirmed | A | P04 Schedule View structure / UI-02 | NOT STARTED | NOT VALIDATED | PENDING | Persistence rules → Outline-state model |
| UI-03 | Compact summary view | P0 | Confirmed | B | P05 Direct manipulation / UI-03 | NOT STARTED | NOT VALIDATED | PENDING | Summary mathematics → Golden summary schedules |
| UI-04 | Continuous timeline density | P0 | Confirmed | B | P05 Direct manipulation / UI-03 | NOT STARTED | NOT VALIDATED | PENDING | Anchor/zoom behaviour → Coordinate-transform tests |
| UI-05 | Global and per-row height | P0 | Confirmed | B | P04 Schedule View structure / UI-02 | NOT STARTED | NOT VALIDATED | PENDING | Autofit precedence → Canonical row geometry model |
| UI-06 | Tool-state machine | P0 | Confirmed | A/B | P05 Direct manipulation / UI-03 | NOT STARTED | NOT VALIDATED | PENDING | Input conflicts → Central ToolController |
| UI-07 | Lock Tool | P0 | Confirmed | A | P05 Direct manipulation / UI-03 | NOT STARTED | NOT VALIDATED | PENDING | One-shot vs repeat rules → Explicit state transitions |
| UI-08 | Bar styles/components | P0 | Confirmed | B | P05 Direct manipulation / UI-03 | NOT STARTED | NOT VALIDATED | PENDING | Full editor not yet shown → Finite primitive style engine |
| UI-09 | Floating report objects | P0 | Confirmed | B | P05 Direct manipulation / UI-03 | NOT STARTED | NOT VALIDATED | PENDING | Pointer/Object semantics → Observe dialogs; separate overlay layer |
| UI-10 | QuickLook | P0 | Confirmed | A | P04 Schedule View structure / UI-02 | NOT STARTED | NOT VALIDATED | PENDING | Configurability → Hover-card field definition |
| LNK-01 | Graphical Link tool | P0 | Confirmed | B | P05 Direct manipulation / UI-03 | NOT STARTED | NOT VALIDATED | PENDING | Exact endpoint gesture → Controlled linking experiment |
| LNK-02 | FS/SS/FF/SF | P0 | Strongly supported | B | P05 Direct manipulation / UI-03 | NOT STARTED | NOT VALIDATED | PENDING | Editing dialog unseen → Links-tab screenshot/test |
| LNK-03 | Lag/lead | P0 | Strongly supported | B | P05 Direct manipulation / UI-03 | NOT STARTED | NOT VALIDATED | PENDING | Unit rules → Dependency schema/tests |
| LNK-04 | Cycle rejection | P0 | Required | A | P05 Direct manipulation / UI-03 | NOT STARTED | NOT VALIDATED | PENDING | UI explanation → Graph validation + highlight cycle |
| SCH-01 | Work calendars | P0 | Confirmed | B | P03 Calendar and scheduler core / G-ENG-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | Precedence rules → Independent calendar engine |
| SCH-02 | Time-of-day scheduling | P0 | Confirmed | B | P03 Calendar and scheduler core / G-ENG-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | DST/timezone → Timestamp policy |
| SCH-03 | Fractional duration | P0 | Confirmed | B | P03 Calendar and scheduler core / G-ENG-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | precision/rounding → Normalized time units |
| SCH-04 | Constraints | P0 | Confirmed | B | P03 Calendar and scheduler core / G-ENG-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | conflict precedence → Scheduling rules document |
| SCH-05 | Fixed Duration | P0 | Confirmed | B | P03 Calendar and scheduler core / G-ENG-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | interaction with work/resources → Lock-variable matrix |
| SCH-06 | Ignore Resource Calendars | P0 | Confirmed | B | P03 Calendar and scheduler core / G-ENG-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | inheritance → Calendar-precedence matrix |
| SCH-07 | Critical path and float | P0 | Strongly supported | B | P03 Calendar and scheduler core / G-ENG-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | calendars/constraints complexity → CPM conformance tests |
| SCH-08 | Bar Priority | P0 | Confirmed field | B | P03 Calendar and scheduler core / G-ENG-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | exact semantics → Define ProjectTrack rule if undocumented |
| SCH-09 | Incremental scheduler | P0 | Required | B/C | P03 Calendar and scheduler core / G-ENG-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | correctness/performance → Full solver first, dirty graph later |
| TRK-01 | Revise tool | P0 | Confirmed | B | P06 Tracking and baselines / UI-06 | NOT STARTED | NOT VALIDATED | PENDING | visual and downstream rules → Controlled experiment |
| TRK-02 | Percent tool / Actual | P0 | Confirmed | B | P06 Tracking and baselines / UI-06 | NOT STARTED | NOT VALIDATED | PENDING | percent-to-actual maths → Tracking rules specification |
| TRK-03 | Reset Revised/Actual | P0 | Confirmed | B | P06 Tracking and baselines / UI-06 | NOT STARTED | NOT VALIDATED | PENDING | cascade semantics → State-transition tests |
| TRK-04 | Save/Clear Baseline | P0 | Confirmed | A/B | P06 Tracking and baselines / UI-06 | NOT STARTED | NOT VALIDATED | PENDING | multi-baseline UX → Baseline selector and tests |
| RES-01 | Resource master table | P0 | Confirmed | A | P08 Resource and cost engine / UI-05 | NOT STARTED | NOT VALIDATED | PENDING | Low → Implement directly |
| RES-02 | Detailed resource record | P0 | Confirmed | A | P08 Resource and cost engine / UI-05 | NOT STARTED | NOT VALIDATED | PENDING | Field optionality → Normalized contact/profile model |
| RES-03 | Resource calendar | P0 | Confirmed | B | P08 Resource and cost engine / UI-05 | NOT STARTED | NOT VALIDATED | PENDING | inheritance → Same calendar engine |
| RES-04 | Percent Work Usage | P0 | Partially understood | B | P08 Resource and cost engine / UI-05 | NOT STARTED | NOT VALIDATED | PENDING | rendering/editing unseen → Expanded Resource View capture |
| RES-05 | Work Usage | P0 | Partially understood | B | P08 Resource and cost engine / UI-05 | NOT STARTED | NOT VALIDATED | PENDING | time-bucket semantics → Resource fixture and capture |
| RES-06 | Assignments subrow | P0 | Partially understood | B | P08 Resource and cost engine / UI-05 | NOT STARTED | NOT VALIDATED | PENDING | direct editing unseen → Assignment workflow capture |
| RES-07 | Contours | P1 | Strongly supported | B | P08 Resource and cost engine / UI-05 | NOT STARTED | NOT VALIDATED | PENDING | exact curves → Define normalized functions |
| RES-08 | Spot allocation | P1 | Strongly supported | B | P08 Resource and cost engine / UI-05 | NOT STARTED | NOT VALIDATED | PENDING | precedence with contours → Deterministic allocation rules |
| RES-09 | Overtime | P1 | Confirmed fields; model partial | B | P08 Resource and cost engine / UI-05 | NOT STARTED | NOT VALIDATED | PENDING | threshold rules → Resource overtime policy |
| RES-10 | Effort-driven schedule | P1 | Strongly supported | B | P08 Resource and cost engine / UI-05 | NOT STARTED | NOT VALIDATED | PENDING | variable locking → Formal equations |
| CAL-01 | Calendar wall view | P0 | Confirmed | B | P09 Calendar View / UI-07 | NOT STARTED | NOT VALIDATED | PENDING | direct manipulation unseen → Calendar drag/edit capture |
| CAL-02 | Calendar exceptions/shifts | P0 | Confirmed | B | P09 Calendar View / UI-07 | NOT STARTED | NOT VALIDATED | PENDING | inheritance precedence → Calendar tests |
| MPR-01 | File consolidation | P0 | Confirmed | B | P07 All Projects workspace / UI-04 | NOT STARTED | NOT VALIDATED | PENDING | update ownership → Consolidation rules |
| MPR-02 | Common finish projects | P0 | Confirmed option | B | P07 All Projects workspace / UI-04 | NOT STARTED | NOT VALIDATED | PENDING | exact alignment → Controlled consolidation test |
| MPR-03 | Separate finish projects | P0 | Confirmed option | A/B | P07 All Projects workspace / UI-04 | NOT STARTED | NOT VALIDATED | PENDING | Low → Preserve independent timelines |
| MPR-04 | Native All Projects tab | P0 | Confirmed requirement | B | P07 All Projects workspace / UI-04 | NOT STARTED | NOT VALIDATED | PENDING | workspace architecture → Build into domain from Phase 0 |
| MPR-05 | Project collapses to one row | P0 | Confirmed | B | P07 All Projects workspace / UI-04 | NOT STARTED | NOT VALIDATED | PENDING | roll-up calculations → Project summary engine |
| MPR-06 | Expand all projects/all rows | P0 | Confirmed | A/B | P07 All Projects workspace / UI-04 | NOT STARTED | NOT VALIDATED | PENDING | performance → Virtualized master tree |
| MPR-07 | Combined sequential steps | P0 | Confirmed concept | B | P07 All Projects workspace / UI-04 | NOT STARTED | NOT VALIDATED | PENDING | exact ordering → Define sort/group semantics |
| MPR-08 | Cross-project grouping | P0 | Proposed | A/B | P07 All Projects workspace / UI-04 | NOT STARTED | NOT VALIDATED | PENDING | User approval → Keep optional |
| REP-01 | Layouts | P1 | Confirmed | A/B | P10 Reporting and print / UI-08 | NOT STARTED | NOT VALIDATED | PENDING | state-versioning → Versioned ViewState |
| REP-02 | Filters | P1 | Confirmed | B | P10 Reporting and print / UI-08 | NOT STARTED | NOT VALIDATED | PENDING | multiple-bar semantics → Filter AST |
| REP-03 | Sorts | P1 | Confirmed | A/B | P10 Reporting and print / UI-08 | NOT STARTED | NOT VALIDATED | PENDING | hierarchy behaviour → explicit mode |
| REP-04 | Timeline Ranges | P1 | Confirmed | A | P10 Reporting and print / UI-08 | NOT STARTED | NOT VALIDATED | PENDING | Low → persist definitions |
| REP-05 | Reports as saved view states | P1 | Strongly supported | B | P10 Reporting and print / UI-08 | NOT STARTED | NOT VALIDATED | PENDING | breadth of captured state → reusable ViewStateSnapshot |
| REP-06 | FastSteps | P1 | Confirmed | A/B | P10 Reporting and print / UI-08 | NOT STARTED | NOT VALIDATED | PENDING | exact commands → safe command vocabulary |
| REP-07 | Summary Graphs | P1 | Confirmed | B | P10 Reporting and print / UI-08 | NOT STARTED | NOT VALIDATED | PENDING | aggregation semantics → graph engine after core |
| REP-08 | Header/Footer/Page Break | P1 | Confirmed | B | P10 Reporting and print / UI-08 | NOT STARTED | NOT VALIDATED | PENDING | pagination → print-layout engine |
| INT-01 | CSV/XLSX/XML/ICS/HTML/PDF | P1 | Required | B | P11 Interoperability / G-REL-01 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | mapping loss → compatibility report |
| INT-02 | Native MPP | P1 | Conditional | C/D | P11 Interoperability / G-REL-01 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | proprietary format/library → XML fallback |
| INT-03 | Vector clipboard | P1 | Conditional | C | P11 Interoperability / G-REL-01 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | Windows/Tauri integration → PNG → SVG → EMF stages |
| NFR-01 | 10k-row performance | P0 | Required | B | P12 Release hardening / G-REL-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | actual latency → automated benchmarks |
| NFR-02 | 100-step undo | P0 | Required | B | P12 Release hardening / G-REL-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | large commands → reversible domain commands |
| NFR-03 | Autosave/recovery | P0 | Required | A/B | P12 Release hardening / G-REL-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | corruption → atomic snapshots/WAL |
| NFR-04 | Background jobs | P0 | Required | B | P12 Release hardening / G-REL-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | safe cancellation → staging and rollback |
| NFR-05 | Exact FastTrack visual clone | P2 | Not targeted | D by design | P12 Release hardening / G-REL-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | Copyright and unnecessary parity → Original UI, workflow equivalence |
| NFR-06 | Exact undocumented FastTrack semantics | P2 | Not promiseable | D | P12 Release hardening / G-REL-02 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | unavailable evidence → compatibility ledger |
| ARC-06 | Workspace contains native project nodes, not only file references | P0 | Confirmed | B | P01 Architecture and governance / G-ARCH-01 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | Risk of bolting portfolio on late → Model Workspace and Project from Phase 0 |
| ARC-07 | Derived summary nodes at project, phase and activity-group levels | P0 | Confirmed | B | P01 Architecture and governance / G-ARCH-01 | NOT STARTED | NOT VALIDATED | NOT REQUIRED | Exact roll-up mathematics → Formal summary equations and golden fixtures |
| UI-11 | Canonical row height shared by grid and timeline | P0 | Confirmed | B | P04 Schedule View structure / UI-02 | NOT STARTED | NOT VALIDATED | PENDING | Variable wrapped rows can desynchronise → Single geometry service and visual tests |
| UI-12 | Direct proportional timeline-header scaling | P0 | Confirmed | B | P04 Schedule View structure / UI-02 | NOT STARTED | NOT VALIDATED | PENDING | Physical zoom can be confused with date range → Separate range, units and pixels-per-unit state |
| UI-13 | Global and local Expand/Collapse and Show Level controls | P0 | Confirmed | A/B | P04 Schedule View structure / UI-02 | NOT STARTED | NOT VALIDATED | PENDING | Outline state persistence → Tree projection tests at project and row level |
| UI-14 | All Projects and individual project tabs in one workspace | P0 | Confirmed | B | P04 Schedule View structure / UI-02 | NOT STARTED | NOT VALIDATED | PENDING | Tab and projection ownership → Workspace shell approved at UI-00/UI-01 |
| MPR-09 | See current work across every project in one window | P0 | Confirmed | B | P07 All Projects workspace / UI-04 | NOT STARTED | NOT VALIDATED | PENDING | Definition of active work and roll-up → Status-date rules and Active Now fixture |
| MPR-10 | Expand every project and every step into one continuous scrollable sequence | P0 | Confirmed | B | P07 All Projects workspace / UI-04 | NOT STARTED | NOT VALIDATED | PENDING | Scale and performance → Virtualised master tree benchmark |
| GOV-01 | Human approval required at each front-end UI/UX gate | P0 | Confirmed | A | P01 Architecture and governance / G-ARCH-01 | NOT STARTED | PASS | NOT REQUIRED | Agent may continue without approval → Hard stop and signed approval record; `governance/validation_reports/G-HANDOFF-00_b5df2a6198305d6cc49e946af35e8bb97ab3a0b3.md` |
| GOV-02 | Independent validation task separate from implementation task | P0 | Confirmed | A | P01 Architecture and governance / G-ARCH-01 | NOT STARTED | PASS | NOT REQUIRED | Self-validation bias → Separate validation prompt and reports; `governance/validation_reports/G-HANDOFF-00_b5df2a6198305d6cc49e946af35e8bb97ab3a0b3.md` |
| GOV-03 | No phase advances without evidence-backed checkpoint | P0 | Confirmed | A | P01 Architecture and governance / G-ARCH-01 | NOT STARTED | PASS | NOT REQUIRED | Status drift → Checkpoint record linked to commit SHA; `governance/validation_reports/G-HANDOFF-00_b5df2a6198305d6cc49e946af35e8bb97ab3a0b3.md` |
