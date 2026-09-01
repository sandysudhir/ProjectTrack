# Acceptance Test Catalog

This catalog contains **135** requirement-oriented test seeds. Codex must convert applicable seeds into executable tests and add requirement IDs/evidence links.

| Test ID | Category | Scenario | Action | Expected |
|---|---|---|---|---|
| ARC-001 | ARC | Row with zero bars | Create a row with no bars, save and reopen | Row identity and row-level data persist without a synthetic task. |
| ARC-002 | ARC | Row with multiple bars | Create three bars in one row and edit one | Only the selected bar state changes; row-level data remains shared. |
| ARC-003 | ARC | Stable identities | Collapse, sort, filter and reopen | UUIDs, stable row numbers and visible bar IDs remain stable. |
| ARC-004 | ARC | Project as tree node | Create three projects and expand one | The project is a native expandable node, not duplicated data. |
| ARC-005 | ARC | Derived summary node | Change a descendant start/finish | Project/phase/activity summaries update without becoming editable source bars. |
| CAL-001 | CAL | Typical weekday | Add 8 working hours Monday 09:00 | Finish is Monday 17:00 using split-shift rules. |
| CAL-002 | CAL | Split shift | Start Monday 11:00 with 4h duration | Work skips lunch and finishes at 16:00. |
| CAL-003 | CAL | Weekend skip | Start Friday 16:00 with 2h duration | Finish is Monday 10:00. |
| CAL-004 | CAL | Holiday exception | Mark Monday non-working | Successor and finish dates move to next valid work period. |
| CAL-005 | CAL | Working exception | Mark Saturday working | Calendar arithmetic includes Saturday shift. |
| CAL-006 | CAL | Base calendar inheritance | Override one date in derived calendar | Only derived calendar changes and inheritance remains intact. |
| CAL-007 | CAL | Resource exception | Resource unavailable on a task workday | Bar reschedules unless Ignore Resource Calendars is true. |
| CAL-008 | CAL | Fractional day | Schedule 0.06 day with 8h base day | Duration normalizes consistently and round-trips without drift. |
| CAL-009 | CAL | Timestamp precision | Schedule a task starting 13:30 | Date and time remain exact through save/reopen. |
| CAL-010 | CAL | DST/timezone policy | Open project across DST boundary | Published ProjectTrack timezone policy is applied deterministically. |
| DEP-001 | DEP | FS link | Link A finish to B start | B starts at first valid working instant after A finish. |
| DEP-002 | DEP | SS link | Link A start to B start | B start follows A start plus lag. |
| DEP-003 | DEP | FF link | Link A finish to B finish | B finish follows A finish plus lag. |
| DEP-004 | DEP | SF link | Link A start to B finish | B finish follows A start plus lag. |
| DEP-005 | DEP | Positive lag | Set FS +2 working days | Successor moves by two working days. |
| DEP-006 | DEP | Negative lag | Set FS -1 working day | Successor overlaps predecessor by one working day. |
| DEP-007 | DEP | Multiple predecessors | Attach three predecessors | Successor honors the controlling predecessor. |
| DEP-008 | DEP | Multiple successors | Move one predecessor | All affected successors update. |
| DEP-009 | DEP | Cycle rejection | Attempt A→B→C→A | Cycle is rejected, explained and no partial link remains. |
| DEP-010 | DEP | Graphical link transaction | Create link by pointer and undo | One undo removes link and restores all downstream dates. |
| DEP-011 | DEP | Delete link | Delete a controlling link | Affected Revised dates recalculate under remaining rules. |
| DEP-012 | DEP | Link persistence | Save/reopen linked project | Endpoint IDs, type, lag and route semantics persist. |
| CON-001 | CON | ASAP | Create unconstrained task | Task anchors at earliest allowed date. |
| CON-002 | CON | ALAP | Create ALAP task | Task anchors at latest allowed date from project finish context. |
| CON-003 | CON | SNET | Set Start No Earlier Than | Task never starts before constraint. |
| CON-004 | CON | SNLT | Set Start No Later Than | Conflict is surfaced when dependencies violate constraint. |
| CON-005 | CON | FNET | Set Finish No Earlier Than | Finish honors constraint. |
| CON-006 | CON | FNLT | Set Finish No Later Than | Conflict is surfaced when impossible. |
| CON-007 | CON | MSO | Set Must Start On | Start is fixed and conflict is explained. |
| CON-008 | CON | MFO | Set Must Finish On | Finish is fixed and conflict is explained. |
| CON-009 | CON | Constraint vs dependency | Apply conflicting rules | Deterministic precedence and visible conflict are produced. |
| TRK-001 | TRK | Scheduled/Revised separation | Revise an existing bar | Scheduled remains unchanged; Revised changes. |
| TRK-002 | TRK | Reset Revised | Revise then reset | Revised returns exactly to scheduled per approved transition rules. |
| TRK-003 | TRK | Partial progress | Set 50 percent complete | Actual/progress representation follows approved rules. |
| TRK-004 | TRK | Complete progress | Set 100 percent complete | Actual finish is populated and remaining work is zero. |
| TRK-005 | TRK | Reset Actual | Enter actuals then reset | Actual fields and percent follow approved reset rules. |
| TRK-006 | TRK | Status date | Move status date | Late/active classification updates without altering history. |
| TRK-007 | TRK | Baseline save | Save baseline 1 | All supported baseline fields snapshot atomically. |
| TRK-008 | TRK | Multiple baselines | Save baselines 1, 2 and 10 | Active baseline switches without data loss. |
| TRK-009 | TRK | Clear baseline | Clear baseline 2 | Only baseline 2 is removed. |
| TRK-010 | TRK | Variance | Revise after baseline | Start/finish/duration/work/cost variances compute correctly. |
| TRK-011 | TRK | Tracking persistence | Save/reopen | Scheduled/Revised/Actual/baselines persist exactly. |
| SUM-001 | SUM | Earliest/latest roll-up | Change first and last child dates | Summary start and finish update. |
| SUM-002 | SUM | Progress roll-up | Change child progress | Summary percent follows approved weighting. |
| SUM-003 | SUM | Cost roll-up | Change descendant costs | Summary cost equals qualifying descendant total. |
| SUM-004 | SUM | Work roll-up | Change descendant work | Summary work equals qualifying descendant total. |
| SUM-005 | SUM | Active count | Set status date inside child bars | Summary active count is correct. |
| SUM-006 | SUM | Late count | Delay two descendants | Summary late count is correct. |
| SUM-007 | SUM | Collapse/expand | Collapse and re-expand branch | Stable row numbers and prior expansion state remain intact. |
| SUM-008 | SUM | Show Level | Set levels 1, 2, 3 and All | Visible tree matches requested outline depth. |
| SUM-009 | SUM | Mixed calendars | Use different child calendars | Summary duration follows approved calendar rule. |
| SUM-010 | SUM | Project roll-up | Collapse project to one row | Project summary bar/metrics accurately represent descendants. |
| CPM-001 | CPM | Simple critical chain | Build linear dependency chain | All chain bars have zero total float. |
| CPM-002 | CPM | Parallel paths | Build short and long paths | Only controlling longest path is critical. |
| CPM-003 | CPM | Free float | Add gap before successor | Free float is calculated correctly. |
| CPM-004 | CPM | Constraint impact | Add controlling constraint | Critical path and float update deterministically. |
| CPM-005 | CPM | Mixed calendars | Use path-specific calendars | CPM uses calendar-aware arithmetic. |
| CPM-006 | CPM | Priority tie | Create equal path candidates | Approved bar-priority rule selects deterministically. |
| CPM-007 | CPM | Critical threshold | Set near-zero threshold | Critical display follows threshold. |
| UI-001 | UI | Grid/timeline vertical sync | Scroll variable-height rows | Grid and timeline remain pixel-aligned. |
| UI-002 | UI | Timeline density | Drag date-header spacing to 2x | All geometry scales 2x; schedule dates remain unchanged. |
| UI-003 | UI | Global row scale | Increase row scale | All rows scale proportionally and bar centers remain aligned. |
| UI-004 | UI | Per-row resize | Resize one row | Only that row changes; wrapped text and timeline match. |
| UI-005 | UI | Autofit | Run row/column/view autofit | Content becomes readable without schedule mutation. |
| UI-006 | UI | Draw bar | Use Bar tool to drag on row | Correct timestamps and style are created. |
| UI-007 | UI | Move bar | Use Arrow tool to drag | Correct state changes and dependent preview is clear. |
| UI-008 | UI | Resize bar | Drag left and right edges | Start/finish/duration update according to handle. |
| UI-009 | UI | Lock tool | Lock Bar then create three bars | Tool remains active until unlocked. |
| UI-010 | UI | QuickLook | Hover a bar | Approved fields display without selection change. |
| UI-011 | UI | Keyboard navigation | Use Tab, Shift+Tab and shortcuts | Focus order and commands are predictable. |
| UI-012 | UI | Invalid target feedback | Drag link to invalid target | Target is rejected with clear visual explanation. |
| UI-013 | UI | Undo compound edit | Move predecessor with successors | One undo restores entire transaction. |
| UI-014 | UI | View-state persistence | Save layout and reopen | Density, columns, rows, outline and toggles restore. |
| MPR-001 | MPR | Projects only | Open All Projects compact mode | Every project is one meaningful summary row. |
| MPR-002 | MPR | Selective expansion | Expand one project | Other projects remain collapsed. |
| MPR-003 | MPR | Nested expansion | Expand project, phase and activity | Hierarchy drills down in same window. |
| MPR-004 | MPR | Expand everything | Expand all projects and rows | One continuous virtualized sequence is produced. |
| MPR-005 | MPR | Collapse everything | Collapse all | Returns to project-only rows without identity changes. |
| MPR-006 | MPR | Shared timeline | Display projects with different dates | All align correctly on one timeline. |
| MPR-007 | MPR | Current work | Apply Active Now view | Active activities across all projects are visible in context. |
| MPR-008 | MPR | Separate finishes | Use independent-finish mode | Each project retains its own finish. |
| MPR-009 | MPR | Common finish | Use common-finish mode | Approved alignment semantics are applied. |
| MPR-010 | MPR | Missing child source | Remove referenced project file | Master reports missing source without data corruption. |
| MPR-011 | MPR | Refresh | Change child project then refresh | Master updates according to ownership policy. |
| MPR-012 | MPR | Duplicate resource identity | Consolidate same-named resources | Approved matching policy avoids accidental merging. |
| RES-001 | RES | Resource record | Create people/equipment/material records | Typed profile fields persist. |
| RES-002 | RES | Assignment units | Assign resource at 50 percent | Usage and work buckets reflect 50 percent capacity. |
| RES-003 | RES | Over-allocation | Assign 11h into 8h capacity | Overload is detected and contributing bars are shown. |
| RES-004 | RES | Resource calendar | Add resource exception | Affected schedule/use updates per rule. |
| RES-005 | RES | Ignore resource calendar | Toggle flag | Task switches between resource-constrained and task/project calendar. |
| RES-006 | RES | Fixed duration | Add second resource to fixed-duration task | Duration stays fixed and work/units follow approved lock matrix. |
| RES-007 | RES | Effort driven | Double equivalent resources | Duration changes according to effort-driven rule. |
| RES-008 | RES | Flat contour | Distribute work | Work is uniform across eligible buckets. |
| RES-009 | RES | Early peak contour | Distribute work | Approved curve weights earlier buckets. |
| RES-010 | RES | Spot allocation | Override one day | Manual bucket overrides contour and total reconciles. |
| RES-011 | RES | Overtime | Exceed regular capacity | Regular and overtime work/cost separate correctly. |
| RES-012 | RES | Rate override | Override assignment rate | Only that assignment cost uses override. |
| RES-013 | RES | Per-use cost | Assign resource | Per-use cost is applied exactly once per policy. |
| RES-014 | RES | Cross-project workload | Assign resource in three projects | Global Resource View aggregates all projects. |
| PERSIST-001 | PERSIST | Atomic save | Interrupt save simulation | Original remains valid or new version commits atomically. |
| PERSIST-002 | PERSIST | Autosave recovery | Crash after unsaved edits | Recovery offers the latest consistent snapshot. |
| PERSIST-003 | PERSIST | Schema migration | Open older fixture | Migration is deterministic and creates backup. |
| PERSIST-004 | PERSIST | Serialization round trip | Save/export/import | Canonical fields round-trip exactly. |
| PERSIST-005 | PERSIST | Undo depth | Execute 120 edits | At least 100 operations remain undoable. |
| PERSIST-006 | PERSIST | View vs data undo | Resize view then edit schedule | Undo stacks do not confuse view geometry with domain edits. |
| REP-001 | REP | Saved layout | Save and restore layout | Columns, widths, action columns, geometry and toggles restore. |
| REP-002 | REP | Filter AST | Create compound temporal filter | Correct bars/rows match with hierarchy semantics. |
| REP-003 | REP | Highlight mode | Apply filter in highlight mode | Context remains and matches are emphasized. |
| REP-004 | REP | Multi-key sort | Sort within parent by priority/date | Hierarchy remains valid. |
| REP-005 | REP | Timeline range | Save and apply custom range | Visible period changes without schedule mutation. |
| REP-006 | REP | Report state | Save full report view | All approved view and print properties restore. |
| REP-007 | REP | FastStep | Run multi-command workflow | Commands execute as one recoverable transaction. |
| REP-008 | REP | Summary graph | Aggregate count/work/cost by period | Buckets and operations match source data. |
| REP-009 | REP | Print preview | Paginate wide Gantt | Headers, footers, legends and page breaks are correct. |
| REP-010 | REP | Visual objects | Move, layer and print text/picture/legend | Objects preserve z-order and inclusion settings. |
| IO-001 | IO | CSV round trip | Export/import supported table fields | Supported values preserve; losses appear in report. |
| IO-002 | IO | XLSX round trip | Export/import hierarchy and dates | Supported hierarchy/data preserve. |
| IO-003 | IO | Project XML round trip | Import/export test fixture | Supported tasks, links, resources and calendars preserve. |
| IO-004 | IO | ICS round trip | Export/import calendar events | Supported dates and labels preserve. |
| IO-005 | IO | PDF export | Export approved report | Output is legible and matches preview. |
| IO-006 | IO | Clipboard PNG | Copy visible schedule to PowerPoint/Word | High-resolution image pastes correctly. |
| IO-007 | IO | Clipboard vector | Copy SVG/EMF where supported | Vector output remains sharp or reports platform limitation. |
| IO-008 | IO | Malformed import | Import invalid file | No project corruption; actionable error and report. |
| PERF-001 | PERF | 10k row scroll | Open 10k-row fixture and scroll | Meets published frame-time threshold. |
| PERF-002 | PERF | 15k bar zoom | Zoom/pan large timeline | No full-DOM rendering and interaction remains responsive. |
| PERF-003 | PERF | 25k dependency move | Move controlling predecessor | Affected-subgraph result matches full solver. |
| PERF-004 | PERF | 2k resource aggregation | Open Resource View | Aggregation meets published latency threshold. |
| PERF-005 | PERF | 50k assignment load | Open and filter fixture | Memory and latency remain inside published budget. |
| PERF-006 | PERF | Cancellation | Cancel long import/refresh | Operation rolls back safely. |
| PERF-007 | PERF | Background progress | Run long operation | UI remains responsive and progress is truthful. |
