# Open Questions and Decision Register

No P0 behavior may be silently implemented while its question is OPEN.

| ID | Question | Impact | Decision gate | Evidence/action required | Status |
|---|---|---|---|---|---|
| Q-001 | What exact pointer gesture selects FS/SS/FF/SF during graphical linking? | Core interaction and dependency semantics | UI-03 | Record a controlled link-creation experiment for every endpoint combination. | OPEN |
| Q-002 | How is lag/lead entered and which unit/calendar governs it? | Scheduler correctness | G-ENG-02 | Capture Links tab/editor and run lag/lead experiments. | OPEN |
| Q-003 | What happens when a summary bar is moved or resized? | Roll-up and edit semantics | G-ARCH-01 | Controlled parent-summary experiment. | OPEN |
| Q-004 | Can parent Start/Finish/Duration cells be edited, and how do descendants respond? | Hierarchy scheduling | G-ARCH-01 | Controlled parent-cell experiment. | OPEN |
| Q-005 | How exactly is summary Duration calculated when child calendars differ? | Summary mathematics | G-ENG-03 | Golden schedules with mixed calendars. | OPEN |
| Q-006 | What is the weighting basis for summary and project percent complete? | Portfolio status | G-ENG-03 | Define and approve work/duration/manual weighting rules. | OPEN |
| Q-007 | How are Scheduled, Revised, Actual and baselines placed visually? | Tracking UX | UI-06 | Capture source examples or approve original ProjectTrack visual language. | OPEN |
| Q-008 | Does Reset Revised also clear Actual and percent complete? | State transition correctness | G-ENG-03 | Controlled reset experiment and transition table. | OPEN |
| Q-009 | How does the Percent tool derive Actual dates at partial completion? | Tracking mathematics | G-ENG-03 | Controlled 25/50/100 percent experiments. | OPEN |
| Q-010 | What are the expanded Resource View rows for Percent Work Usage, Work Usage and Assignments? | Resource UX and data model | UI-05 | Capture expanded resource view. | OPEN |
| Q-011 | What fields and controls exist in the assignment editor? | Resource engine | G-ENG-04 | Capture Assignments tab/dialog. | OPEN |
| Q-012 | What exact normalized curves define each work contour? | Resource allocation | G-ENG-04 | Document source curves or approve ProjectTrack-owned curves. | OPEN |
| Q-013 | What precedence do spot allocations have over contour-distributed work? | Resource allocation | G-ENG-04 | Controlled assignment fixture. | OPEN |
| Q-014 | How is overtime thresholded and distributed? | Cost correctness | G-ENG-04 | Formal overtime policy and fixtures. | OPEN |
| Q-015 | What is the exact variable-locking matrix for Fixed Duration and effort-driven tasks? | Scheduler-resource coupling | G-ENG-04 | Before/after resource experiments. | OPEN |
| Q-016 | Can activities be dragged and revised directly in Calendar View? | Calendar UX | UI-07 | Controlled calendar drag experiment. | OPEN |
| Q-017 | How are overlapping bars stacked in Calendar View? | Calendar readability | UI-07 | Dense collision fixture. | OPEN |
| Q-018 | Is a consolidated master directly editable or refreshed from child files? | Multi-project ownership | G-ARCH-01 | Define ProjectTrack canonical ownership before implementation. | OPEN |
| Q-019 | How are conflicts handled when a child project and master projection both change? | Data integrity | G-ARCH-01 | Choose source-of-truth and conflict policy. | OPEN |
| Q-020 | Can cross-project dependencies be created? | Portfolio scheduler | G-ARCH-01 | User decision plus scheduler impact analysis. | OPEN |
| Q-021 | Are resources global, project-local, or both, and how are duplicates matched? | Cross-project workload | G-ARCH-01 | Approve resource identity strategy. | OPEN |
| Q-022 | What does common-finish consolidation do mathematically? | Consolidation parity | G-ENG-03 | Controlled two-project consolidation experiment. | OPEN |
| Q-023 | Which alternative master groupings beyond By Project are required for V1? | Scope and UX | UI-00 | User selects among workstream/resource/department/status/chronological. | OPEN |
| Q-024 | What is the exact FastSteps command vocabulary and rollback behavior? | Automation | UI-08 | Capture Define dialog or approve ProjectTrack safe command list. | OPEN |
| Q-025 | What exact state is retained by Layouts, Reports, Filters, Sorts and Ranges? | View persistence | UI-08 | Capture definition dialogs and persistence tests. | OPEN |
| Q-026 | Which MPP library, if any, is reliable and legally suitable? | Interoperability | G-REL-01 | Technical/library assessment; XML fallback remains mandatory. | OPEN |


## UI-01R reconciliation note

The shell exposes screenshot-confirmed commands and dialog locations while preserving unresolved behavior. No question in this register was converted into a scheduling, resource, tracking, persistence, import/export, report, or consolidation rule during UI-01R.
