# FastTrack-Class Scheduler — Master Requirements, Evidence & Open-Issues Ledger

**Document status:** Capture and structure only — no implementation authorised  
**Version:** 0.1  
**Date:** 1 September 2026  
**Working product name:** ProjectTrack  
**Scope:** Consolidates the full conversation from the original FastTrack recreation request through the latest screenshots and clarifications  
**Primary purpose:** Preserve every discovered requirement, observed interaction, architectural correction, uncertainty, proposed extension, and validation need in one traceable Markdown document

---

## 0. How to use this document

This is **not yet the final Codex build prompt**. It is the structured source of truth from which a later specification, implementation plan, acceptance matrix, and Codex prompt can be derived.

No feature should be treated as fully understood merely because its name appears here. Each item is marked by evidence and confidence.

### 0.1 Evidence classes

| Code | Meaning | Authority |
|---|---|---|
| **U** | Explicit user requirement or clarification in this conversation | Highest |
| **S** | Directly visible in a user-provided screenshot | Very high |
| **D** | Previously reviewed official FastTrack product page, manual, release notes, or training catalogue | High |
| **V** | Functional note inferred from training-video titles/supporting material, not a verbatim transcript | Medium |
| **I** | Assistant inference from observed behaviour or standard scheduling practice | Must be verified |
| **P** | Proposed ProjectTrack design decision or enhancement beyond FastTrack | Requires user approval |

### 0.2 Confidence states

| State | Meaning |
|---|---|
| **Confirmed** | Directly stated by the user or demonstrated in screenshots/documentation |
| **Strongly supported** | Multiple evidence sources agree, but one interaction detail may remain |
| **Partially understood** | Broad function is known; exact workflow or mathematics remains unclear |
| **Open** | Additional screenshot, experiment, or decision is required |
| **Conditional** | Technically possible but dependent on third-party format/library/platform behaviour |
| **Deliberate deviation** | ProjectTrack should intentionally behave differently from FastTrack |

### 0.3 Authority order when sources conflict

1. Explicit user requirement  
2. User-provided screenshots and controlled observations  
3. Current official FastTrack documentation/training  
4. Conventional project-management semantics  
5. Assistant inference

---

# 1. Product intent

Build a professional Windows desktop project-scheduling application functionally inspired by FastTrack Schedule, while using an original interface and original implementation.

The product is not:

- a static Gantt viewer;
- a generic SaaS dashboard;
- a superficial visual clone;
- a one-row-equals-one-task database;
- a marketing website;
- a cloud collaboration product in its first release.

The product is simultaneously:

1. a hierarchical project database;
2. a spreadsheet-like activity editor;
3. a direct-manipulation graphical timeline;
4. a dependency and scheduling engine;
5. a resource and cost model;
6. a work-calendar model;
7. a tracking and baseline system;
8. a saved layout/filter/range/report system;
9. a printable visual-document canvas;
10. a multi-project master workspace.

The central requirement is **bidirectional synchronization**:

- editing a date moves the corresponding bar;
- dragging a bar changes the correct schedule state;
- changing duration recalculates finish;
- creating a link reschedules affected successors;
- changing a work calendar recalculates affected work periods;
- revising a plan preserves the original Scheduled state;
- changing progress updates Actual information;
- editing an assignment changes resource utilisation;
- collapsing a hierarchy produces a meaningful summary schedule;
- the same underlying data can be projected into Schedule, Resource, Calendar, and All Projects views.

---

# 2. Critical architectural corrections discovered during the conversation

## 2.1 Row is not Bar

The original architecture was too close to:

```text
Project → Task → Dependency
```

The required architecture is closer to:

```text
Workspace
└── Project
    └── Row
        ├── Row-level data
        └── 0..N Bars
            ├── Scheduled state
            ├── Revised state
            ├── Actual state
            ├── Baselines
            ├── Links
            └── Assignments
```

A row may contain:

- no bar;
- one ordinary activity bar;
- multiple activity bars;
- one or more milestones;
- a derived summary bar;
- graphical/report objects;
- row-level custom data that is distinct from bar-level custom data.

**Evidence:** D, S, U  
**Status:** Confirmed and non-negotiable.

## 2.2 Scheduled, Revised, and Actual are distinct states

Every schedulable bar must preserve:

- **Scheduled:** original intended plan;
- **Revised:** current forecast or changed plan;
- **Actual:** what has physically happened.

The screenshots confirm separate date/time/duration fields for all three inside Bar Information. The Revise and Percent tools further confirm that Revised and Actual are operated through distinct workflows.

**Evidence:** S, D, U  
**Status:** Confirmed and non-negotiable.

## 2.3 Project is also an expandable scheduling node

The user requires a second level above an individual project:

```text
Workspace / All Projects
├── Project A
│   ├── Phase
│   │   ├── Activity
│   │   └── Sub-activity
│   └── Phase
├── Project B
└── Project C
```

A complete project must be collapsible into one meaningful row, while any selected project may be expanded down to phases, activities, sub-activities, and individual bars without leaving the same master window.

**Evidence:** U  
**Status:** Confirmed and non-negotiable.

## 2.4 Collapse is not merely hide

The compacted screenshot shows non-contiguous row numbers, proving descendants remain real rows with stable identity while hidden by outline state. Parent rows continue showing rolled-up dates, durations, and summary bars.

Collapse therefore means:

- hide descendants from the current view;
- preserve descendant identity and row numbers;
- derive and display parent/project summary information;
- preserve ability to re-expand at the same point;
- optionally show summary milestones, current work, progress, and variance.

**Evidence:** S, U  
**Status:** Confirmed.

## 2.5 Timeline density is a first-class view state

The user explicitly demonstrated that dragging spacing between timeline header cells such as M–T–W proportionally expands or contracts the complete timeline. The same concept applies vertically to rows.

This is different from:

- changing visible date range;
- changing displayed units;
- changing underlying schedule dates.

The view needs independent geometry:

```text
visibleRange
timescaleRows
timelineUnits
pixelsPerTimeUnit
globalRowHeight
perRowHeightOverride
columnWidths
scrollOffsets
```

**Evidence:** U, S  
**Status:** Confirmed.

---

# 3. Proposed canonical domain model

## 3.1 Workspace and projects

```text
Workspace
- id
- name
- projects[]
- projectOrder[]
- globalResourcePool?
- masterViewDefinitions[]
- workspaceLayouts[]
- tabState
```

```text
Project
- id
- name
- description
- projectCalendarId
- projectStartTimestamp
- calculatedFinishTimestamp
- statusDate
- rows[]
- resources[]
- calendars[]
- fieldDefinitions[]
- layouts[]
- filters[]
- sorts[]
- ranges[]
- reports[]
- fastSteps[]
- consolidationMetadata
- fileReference
```

## 3.2 Row

```text
Row
- id
- stableRowNumber
- projectId
- parentRowId
- childRowIds[]
- hierarchyLevel
- outlineOrder
- rowData
- collapsed
- hidden
- rowStyle
- explicitHeight?
- derivedAutoFitHeight?
```

Important rules:

- row number is stable and is not reissued merely because children are collapsed;
- row order is not identity;
- hierarchy depth should have no artificial low limit;
- row and timeline use one canonical row height;
- row data can be separate from bar data.

## 3.3 Bar

```text
Bar
- id
- userVisibleBarId
- rowId
- barType
- name?
- scheduledState
- revisedState
- actualState
- baselines[1..10]
- percentComplete
- priority
- fixedDuration
- hidden
- calendarId?
- ignoreResourceCalendars
- constraint
- styleId
- notes
- assignments[]
- links[]
- customFieldValues
```

Possible `barType` values:

- Activity
- Milestone
- Summary
- BaselineVisual
- ActualVisual
- ReferenceVisual

A summary bar should normally be a **derived object**, not an ordinary manually scheduled task.

## 3.4 Schedule state

```text
ScheduleState
- startDate
- startTime
- finishDate
- finishTime
- durationValue
- durationUnit
- workValue?
- workUnit?
```

Time of day is first-class. Dates must not be reduced to date-only values.

## 3.5 Baseline

Support up to ten baselines.

```text
BarBaseline
- baselineIndex
- startTimestamp
- finishTimestamp
- duration
- work
- cost
- capturedAt
```

## 3.6 Dependency

```text
Dependency
- id
- predecessorBarId
- successorBarId
- dependencyType
- lagValue
- lagUnit
- style
- hidden
```

Dependency types:

- Finish-to-Start
- Start-to-Start
- Finish-to-Finish
- Start-to-Finish

## 3.7 Resource and assignment

```text
Resource
- id
- name
- category
- initials
- code
- group
- fullName
- jobTitle
- employeeId
- company
- department
- standardRate
- overtimeRate
- perUseCost
- totalResourceCostDerived
- materialLabel
- notes
- businessAddress
- homeAddress
- phoneNumbers
- emails
- URLs
- IMAddresses
- workCalendarId
- customFieldValues
```

```text
Assignment
- id
- resourceId
- barId
- assignedUnits
- work
- effort
- contour
- spotAllocations[]
- standardRateOverride?
- overtimeRateOverride?
- perUseCostOverride?
- regularWork
- overtimeWork
```

## 3.8 Calendars

```text
WorkCalendar
- id
- name
- baseCalendarId?
- typicalWeek
- dateExceptions[]
- shifts[]
- type: Project | Resource | Bar
```

```text
CalendarException
- dateOrRange
- description
- shifts[]
- nonWorking
- sourceType
```

A separate future `ColorCalendar` may visually shade events without changing scheduling arithmetic.

## 3.9 Typed fields / Column Map

The screenshot confirms a column catalogue filterable by:

- Calculation
- Cost
- Date
- Duration
- Flag
- Hyperlink
- ID/Code
- Image
- Number
- Text
- Time
- Work

It also confirms a storage scope such as **Per Bar**.

```text
FieldDefinition
- id
- defaultName
- displayName
- dataType
- storageScope: PerRow | PerBar | PerProject | PerResource
- defaultValue
- displayFormat
- formula?
- valueListId?
```

## 3.10 Persistent view objects

First-class view configuration entities:

- Layout
- Filter
- SortDefinition
- RangeDefinition
- ReportDefinition
- FastStep
- Dateline
- BarStyle
- VisualObject
- HeaderFooterDefinition
- GridlineDefinition
- TimelineScaleDefinition

---

# 4. Required application views

## 4.1 Schedule View

The principal working view combines:

- hierarchical spreadsheet grid on the left;
- graphical timeline/Gantt on the right;
- draggable divider;
- synchronized vertical scrolling;
- independent horizontal scrolling of timeline;
- multi-row timescale headers;
- direct bar drawing, moving, resizing, revising, progress entry, linking, annotations, and formatting.

Observed core columns:

- Activity Name
- Duration
- Start Date
- Finish Date

Additional expected columns include:

- WBS
- Scheduled Start/Finish/Duration
- Revised Start/Finish/Duration
- Actual Start/Finish/Duration
- % Complete
- Predecessors
- Successors
- Resources
- Work
- Cost
- Baseline values
- Variance
- Notes
- custom fields.

## 4.2 Resource View

Confirmed base spreadsheet columns:

- Resource Name
- Standard Rate
- Overtime Rate
- Per Use Cost
- Total Resource Cost
- Category

The View ribbon also exposes:

- Percent Work Usage
- Work Usage
- Assignments

This implies a richer resource projection beneath or beside each resource. Exact expanded rendering remains unverified.

Resource Information contains tabs:

- Information
- Work Calendar
- Other Columns

## 4.3 Calendar View

Confirmed as a continuous wall-calendar projection across weeks and months, not an Outlook-style appointment application.

Observed behaviour:

- task bars can span one or several calendar cells;
- milestones appear as symbols on dates;
- labels can include full hierarchy/path text;
- the same project data is projected into calendar cells;
- months can continue vertically across the view.

Still to verify:

- direct dragging/editing in Calendar View;
- collision and stacking rules;
- hierarchy/filter interaction;
- whether Revised or another state is shown by default.

## 4.4 All Projects / Master View

This is a user-required extension and must be a core product view, not a late dashboard.

### Compact mode

```text
▸ On2Cook B2C
▸ On2Cook Commercial
▸ Altimeter
▸ Water Flosser
▸ Copper Bottle
```

Each project appears as one row with:

- project name;
- project start;
- revised or calculated finish;
- overall duration;
- weighted progress;
- active activities;
- late activities;
- next milestone;
- current resources;
- cost/budget/variance where enabled;
- project summary bar;
- baseline and milestone overlays where enabled.

### Selective expansion

```text
▼ On2Cook B2C
    ▸ Industrial Design
    ▼ Electronics
        PCB Architecture
        PCB Rev 1
        Firmware Integration
        EMC Testing
    ▸ Tooling
▸ Altimeter
▸ Water Flosser
```

Other projects remain collapsed.

### Global outline controls

Required commands:

- Projects Only
- Projects + Phases
- Projects + Phases + Activities
- Expand All Projects
- Collapse All Projects
- Expand Selected Project
- Collapse Selected Project
- Expand to Level N
- Expand Everything

### Combined sequence

The user explicitly requires all projects to be viewable “in one particular sequence” and all elements to be expandable. The safest confirmed interpretation is:

- one chronological master timeline;
- project hierarchy preserved;
- all rows from all projects may be expanded into one scrollable sequence.

A further proposed projection, not yet explicitly confirmed, is grouping by:

- workstream;
- resource;
- department;
- status;
- phase;
- chronological order independent of project.

These alternative groupings remain **P / proposed** rather than confirmed.

## 4.5 Tabs and windows

The user requires another tab for All Projects while individual projects remain available.

Expected workspace:

- one or more individual project tabs;
- one All Projects tab;
- optional separate Resource/Calendar projections;
- tab workspace;
- switch-window commands;
- cascade/tile support or a modern equivalent.

---

# 5. Main user interface inventory

The screenshots show a ribbon-based interface. ProjectTrack does not need to copy the visual style, but it must preserve equivalent capability and discoverability.

## 5.1 Home tab

Observed or previously visible groups/functions:

### View

- Schedule view selector
- Resource view selector
- Calendar view selector
- keyboard shortcuts shown in dropdown, e.g. Schedule Ctrl+1, Calendar Ctrl+2, Resource Ctrl+3

### Clipboard

- Cut
- Copy
- Paste

### Font / cell presentation

- font family
- font size
- bold
- italic
- underline
- alignment and related formatting

### Outline

- Show Level dropdown
- collapse/expand hierarchy by level

### Tools

Dedicated tool palette:

- Arrow
- Bar
- Link
- Revise
- Percent
- Text Box

Also:

- Lock Tool

### Link

- link/unlink or link-related commands shown as chain icons
- exact secondary icon semantics remain unverified

### Bar Styles

- style gallery/dropdown
- multiple activity, summary, outline, arrow, and milestone styles

### Timeline Range / bar numeric controls

- Start
- Finish
- Duration fields for selected bar
- direct numeric/date editing

### Editing

- Find
- Go To
- Select

## 5.2 Insert tab

### Rows & Columns

- Row
- Column

### Timeline Elements

- Text Box
- Legend
- Picture
- Pointer
- Object
- Summary Graph
- Timescale
- Datelines

### Page

- Header & Footer
- Page Break

Observed tooltips:

- Picture opens an Insert Picture dialog and can use a file or Clipboard source.
- Text Box allows click-drag creation of floating timeline text.
- Pointer/Object exact semantics remain open.

## 5.3 Format tab

Observed functions:

- Bar Style
- Critical Path
- Link
- Datelines
- Gridlines
- Header & Footer
- Format Selected

### Gridline format dialog

Confirmed options:

- Optimize
- Custom Setting
- Style
- Color
- Size
- show Column horizontal gridlines
- show Column vertical gridlines
- show Timeline horizontal gridlines
- show Timeline vertical gridlines
- Gridline Divisions per Timeline Unit

### Header and Footer dialog

Confirmed:

- choose Header or Footer
- left, centre, and right cells
- insert Auto Text
- display options such as All Pages
- font settings
- Copy All
- Paste All

## 5.4 View tab

### Action Columns dropdown

Confirmed entries:

- Row Number / Select Row
- Page Break
- Information
- Expand/Collapse
- Show All
- Hide All

### Show/Hide

- Summary Bars
- Datelines
- Links
- Critical Paths
- Alignment Grid

### Resource overlays

- Percent Work Usage
- Work Usage
- Assignments

These are context-sensitive and appear enabled or disabled depending on view.

## 5.5 Project tab

### Details

- Project Information
- Activity Information
- Resource Information
- Work Calendars
- WBS

### Timeline

- All Bars Range
- Timeline Ranges
- Timeline Units

Observed Timeline Units menu:

- Hours
- Days
- Weeks
- Months
- Quarters
- Years

### Layout

- Layouts

### Sort & Filter

- Sorts
- Filters
- Restore All

Observed Resource View sort presets:

- By Resource Name
- By Category
- By Total Assigned Units
- By Standard Rate
- By Per Use Cost
- By Total Resource Cost
- Define custom sort

## 5.6 Tools tab

### Proofing

- Spelling

### Macro / FastSteps

Menu confirms:

- Define
- Restore Master Schedule
- Autofit Schedule – Activity Names
- Milestones
- Completed Tasks
- Upcoming Tasks
- Incomplete Tasks
- Cost Report
- Resource Cost Report

FastSteps are saved command/report workflows, not arbitrary scripting.

### Consolidation

- Define
- Get Updates

### Tracking

- Save Baseline
- Clear Baseline
- Reset Revised
- Reset Actual
- Column Map

### Shift

- Items
- Schedule

### Arrange

- Bring to Front
- Send to Back
- Arrange
- Autofit

Observed Autofit menu:

- Autofit Row Height
- Autofit Column Width
- Autofit View
- Autofit Options

### Shift Items dialog

Confirmed:

- Forward/Backward
- quantity
- unit such as Work Day(s)
- apply optionally to Pictures & Legends
- apply optionally to Text Boxes
- Shift
- Done

### Shift Schedule dialog

Confirmed:

- Forward/Backward
- quantity
- unit such as Work Day(s)
- Shift
- Done

ProjectTrack additionally needs **Shift Project** in All Projects view.

## 5.7 Application tab

Observed:

### Product / Help

- On the Web
- About
- Keyboard Shortcuts
- Example Files
- Tutorial

### Workspace

- Tab Workspace
- Status Bar
- Themes
- Toolbars

### Window

- Switch Windows
- Cascade
- Tile Horizontally
- Tile Vertically

---

# 6. Schedule grid and outline behaviour

## 6.1 Hierarchy

Confirmed levels visible in screenshots:

- complete project;
- major phase;
- activity group;
- activity;
- sub-activity;
- milestone.

Required operations:

- indent;
- outdent;
- drag/reorder;
- expand/collapse;
- expand to a selected level;
- show all;
- hide all;
- preserve stable row numbers;
- preserve custom expanded state;
- collapse entire project to one row.

## 6.2 Compacted view

The compacted screenshot confirms:

- parent rows remain visible;
- hidden descendant row numbers are skipped rather than renumbered;
- parent duration/start/finish remain populated;
- summary bars span child schedule;
- milestone remains visible at high level;
- phases can each remain one row.

## 6.3 Summary calculations

The following are required, but some exact mathematics remain to be fixed:

```text
Summary Start = earliest qualifying descendant start
Summary Finish = latest qualifying descendant finish
Summary Cost = sum of qualifying descendant costs
Summary Work = sum of qualifying descendant work
Summary Active Count = descendant bars active at status date
Summary Late Count = qualifying late descendants
```

Open calculations:

- whether Summary Duration is working span, elapsed span, or another FastTrack-specific quantity;
- which calendar controls the summary working span;
- whether gaps appear as one continuous summary bar or segmented bars;
- weighting basis for summary % complete;
- behaviour when child calendars differ;
- whether moving a summary shifts all descendants;
- whether editing parent Start/Finish/Duration propagates.

These must not be guessed.

## 6.4 Row heights

Required:

- compact default rows;
- wrapped activity names;
- global proportional vertical scaling;
- individual row-height override;
- Autofit Row Height;
- one canonical height shared by grid and timeline;
- persistence in Layout/Report;
- support for rows tall enough to hold multiple bars/labels.

Recommended precedence:

```text
manual per-row height
    > calculated autofit height
    > global default × global scale factor
```

## 6.5 Columns

Required:

- resizable;
- reorderable;
- hide/show;
- frozen left;
- potentially frozen right;
- typed;
- row-level or bar-level storage;
- configurable display formats;
- summaries at bottom;
- copy/paste from spreadsheets;
- persistent layouts.

---

# 7. Timeline and Gantt behaviour

## 7.1 Three independent timeline dimensions

The application must separate:

1. **Visible range** — what dates are currently in view;
2. **Timescale structure** — Year/Quarter/Month/Week/Day/Hour header rows;
3. **Physical density** — pixels per time unit.

Changing physical density must not change scheduling data.

## 7.2 Continuous horizontal scaling

Confirmed user workflow:

- drag a spacing boundary in the M/T/W/date header;
- all time cells expand or contract proportionally;
- bars, links, gridlines, labels, datelines, and milestones move consistently;
- dates and durations remain unchanged.

Required interactions:

- direct header drag;
- smooth wheel/keyboard zoom as an additional convenience;
- keep cursor position or selected bar anchored during zoom;
- minimum and maximum density;
- persist in Layout/Report;
- undo/restore view geometry separately from schedule edits.

## 7.3 Timescales

Support multiple simultaneous rows, e.g.:

- Year
- Quarter
- Month
- Week
- Day
- Hour

The screenshots show Month plus day-of-week/date rows.

## 7.4 Non-working time

Screenshots show shaded vertical bands, likely weekends or non-working periods.

Required:

- shade non-working periods based on active calendar;
- distinguish project calendar, resource exception, and custom visual/calendar shading where appropriate;
- optionally show non-working portions inside bars;
- preserve scheduling arithmetic separately from display shading.

## 7.5 Datelines

Required:

- current date/time;
- project start;
- calculated project finish;
- status date;
- custom date;
- live or static;
- labels and formatting.

A red vertical line is visible in screenshots and is likely a dateline; exact type is not confirmed.

## 7.6 Bar types and styles

Observed style gallery includes:

- filled blue and green bars;
- grey summary bars;
- outlined bars;
- beige bars;
- directional arrow bars;
- line/connector-like styles;
- diamond milestones;
- circular milestones;
- upward/downward symbols.

Required style definition:

- fill;
- border;
- thickness;
- height;
- vertical offset;
- start cap;
- finish cap;
- milestone symbol;
- progress fill;
- labels;
- components;
- image/emoji if supported;
- summary style.

## 7.7 Bar labels

Observed:

- resource names placed beside bars;
- comma-separated resource names;
- labels can become long;
- Calendar View may show a full hierarchy path.

Required:

- configurable label fields;
- labels at start/middle/finish/above/below;
- collision handling;
- clipping/ellipsis/wrap options;
- hover QuickLook for complete information.

## 7.8 QuickLook / hover card

Confirmed fields visible:

- Activity Name
- Start Date
- Start Time
- Finish Date
- Finish Time
- Duration
- Constraint Type
- Constraint Date
- Resources Assigned
- Edit link

Required:

- configurable field set;
- available on bar hover;
- optional similar cards for links, milestones, calendar items, and resource assignments.

---

# 8. Tool-state interaction model

The timeline must use a formal tool controller, not unrelated ad hoc event handlers.

## 8.1 Arrow tool

Observed tooltip:

- select;
- move and resize bars;
- select/move pictures;
- manipulate columns, timescales, and rows.

Required:

- single selection;
- multi-selection;
- drag move;
- left/right resize;
- row/column/timescale resizing;
- picture/text/object manipulation.

## 8.2 Bar tool

Observed tooltip:

- click and drag to draw bars in the timeline graph.

Required:

- choose bar style;
- click-drag exact start/finish;
- live Start/Finish/Duration tracking;
- snap to timeline grid;
- create bar in selected row;
- optionally lock tool for repeated creation.

## 8.3 Link tool and linking process

The user explicitly asked that the linking process be understood even though it is not exposed through a conventional dropdown.

### Confirmed evidence

- a dedicated Link tool exists in the Home tool palette;
- a separate Link ribbon group exists;
- links are visible as routed graphical connectors between bars;
- View can show/hide Links;
- Format contains Link formatting;
- Bar Information contains a Links tab;
- link lines participate in schedule logic;
- Lock Tool can keep the linking tool active for repeated links.

### Required ProjectTrack workflow

1. Activate Link tool.
2. Optionally activate Lock Tool.
3. Point to a source bar or source endpoint.
4. Click-drag or click-connect toward the target bar/endpoint.
5. Show a live connector preview.
6. On valid target, create a directed predecessor/successor relation.
7. Recalculate affected Revised schedule transactionally.
8. Render the routed link and arrow/direction.
9. Allow selection, edit, format, hide/show, and deletion.
10. Reject and explain circular links.

### Dependency-type semantics

Required support:

- Finish→Start = FS
- Start→Start = SS
- Finish→Finish = FF
- Start→Finish = SF
- positive lag
- negative lag/lead

**Open detail:** The exact FastTrack pointer gesture for choosing endpoints and whether type is inferred from endpoint selection or edited immediately afterward has not yet been demonstrated. This must be verified rather than assumed.

## 8.4 Revise tool

Observed tooltip:

- click and drag existing bars to track Revised changes against Scheduled dates.

Required:

- preserve Scheduled;
- alter Revised;
- preview movement;
- commit on pointer release;
- reschedule affected linked bars;
- provide Reset Revised command;
- one compound undo transaction.

## 8.5 Percent tool

Observed tooltip:

- click on a bar to define percentage of work completed and Actual dates.

Required:

- set % complete graphically;
- update Actual Start/Finish/Duration according to defined tracking rules;
- show progress fill;
- provide Reset Actual;
- exact relationship between percent, Actual dates, and work remains to be specified.

## 8.6 Text Box tool

Observed tooltip:

- click-drag to create floating text boxes in timeline.

Required:

- floating position;
- size;
- text formatting;
- z-order;
- move;
- lock;
- include in Shift Items when selected.

## 8.7 Picture, Pointer, Object

Picture is confirmed as file/clipboard insertion.

Pointer and Object exist but exact behaviour is not yet known. Treat as open until documented or demonstrated.

## 8.8 Lock Tool

Required:

- by default, a one-shot tool returns to Arrow after operation;
- Lock Tool retains current tool for repeated operations;
- keyboard and visual state must stay synchronized.

---

# 9. Activity / Bar Information

The screenshots confirm a context-sensitive Information dialog with separate:

- Row tab
- Bars tab

## 9.1 Bar identity and style

Observed:

- Bar ID
- Hidden
- style preview
- Bar Style dropdown
- Duration
- Fixed Duration

Bar IDs are separate from row numbers and can be non-sequential.

## 9.2 Tabs

Observed:

- Tracking
- Columns
- Links
- Assignments

Only Tracking is fully visible so far. The others remain important evidence gaps.

## 9.3 Tracking fields

Confirmed fields:

- Scheduled Start Date
- Scheduled Start Time
- Scheduled Finish Date
- Scheduled Finish Time
- Scheduled Duration
- Revised Start Date
- Revised Start Time
- Revised Finish Date
- Revised Finish Time
- Revised Duration
- Actual Start Date
- Actual Start Time
- Actual Finish Date
- Actual Finish Time
- Actual Duration
- % Complete
- Priority

## 9.4 Constraints and calendars

Confirmed:

- Constraint Type
- Constraint Date
- Constraint Time
- Calendar
- New Calendar
- Edit Calendar
- Ignore Resource Calendars

Observed constraint: As Soon As Possible.

## 9.5 Navigation

Information dialogs include first/previous/next/last navigation buttons, implying movement between bars or entities without closing the dialog.

## 9.6 Milestones

A milestone is shown with:

- zero duration;
- same start and finish timestamp;
- diamond style;
- Scheduled/Revised values;
- Actual empty;
- % complete;
- constraint and calendar fields.

---

# 10. Scheduling engine requirements

## 10.1 Calendar-aware time arithmetic

Required:

- timestamps rather than date-only values;
- split shifts;
- weekends;
- exceptions;
- resource calendars;
- task/bar calendar overrides;
- optional ignore-resource-calendar behaviour;
- duration units distinct from work units;
- fractional days such as 0.06 day;
- configurable base work day.

## 10.2 Three unit systems

Maintain separately:

- Timeline Units
- Schedule Duration Units
- Resource Work Units

Also:

- hours per base work day.

Example:

- timeline shown in weeks;
- task duration in days;
- resource work in hours.

## 10.3 Dependencies

Support all four standard types and lag/lead.

Scheduling should use Revised state for forecast propagation unless a specifically defined tracking rule says otherwise.

## 10.4 Constraints

Required:

- As Soon As Possible
- As Late As Possible
- Start No Earlier Than
- Start No Later Than
- Finish No Earlier Than
- Finish No Later Than
- Must Start On
- Must Finish On

Dependencies and constraints must be separate entities.

## 10.5 Critical path

Required:

- Early Start
- Early Finish
- Late Start
- Late Finish
- Total Float
- Free Float
- configurable critical threshold
- show/hide critical path
- filter to only critical items
- formatting

Bar Priority is present in Bar Information and may be used to resolve equal/similar paths. Exact FastTrack priority semantics remain partially understood.

## 10.6 Fixed Duration

Confirmed per-bar property.

Required rule set must define what changes when:

- resource count changes;
- assigned units change;
- work changes;
- calendar changes;
- effort-driven mode is active.

## 10.7 Ignore Resource Calendars

Confirmed per-bar property.

When enabled, the bar should schedule from its own/project calendar without being constrained by assigned resource calendars.

## 10.8 Incremental recalculation

Preferred architecture:

1. implement a deterministic correct full scheduler;
2. calculate affected dependency subgraph;
3. optimise using dirty graph/incremental recomputation;
4. continuously compare incremental result with full recomputation in tests.

## 10.9 Transactional graphical edits

During drag:

- show visual preview;
- avoid expensive full reschedule on each pixel;
- calculate lightweight preview as needed.

On pointer release:

- commit one domain command;
- recalculate affected bars;
- update links, summaries, resources, costs, and views;
- create one undo entry.

---

# 11. Scheduled, Revised, Actual, progress, and baselines

## 11.1 Scheduled

Original committed schedule.

## 11.2 Revised

Current expected schedule after changes.

The Revise tool specifically modifies existing bars to track Revised changes relative to Scheduled.

## 11.3 Actual

Physical execution.

The Percent tool is used to define work completed and Actual dates.

## 11.4 Reset commands

Confirmed:

- Reset Revised
- Reset Actual

Exact secondary resets, such as whether Reset Revised also clears Actual and percent, need formal verification.

## 11.5 Baselines

Confirmed commands:

- Save Baseline
- Clear Baseline

Prior documentation review indicated up to ten baselines.

Required:

- Baseline 1..10;
- save whole project or selection;
- clear selected baseline;
- choose active baseline;
- display baseline against current state;
- calculate start, finish, duration, work, and cost variance.

Exact visual placement is still unobserved.

---

# 12. Work calendars

The Work Calendars dialog confirms a detailed calendar editor.

## 12.1 Calendar management

- Calendar dropdown
- New
- Delete
- Copy Calendar
- Paste Calendar
- optional Base Calendar

## 12.2 Specific days

- month/year selector;
- calendar grid;
- selected dates;
- exceptions table with Date and Description;
- Create Exception;
- Delete Exception.

## 12.3 Work Shift Details

Confirmed multiple shifts per day. Screenshot example:

- 8:00 AM–12:00 PM = 4.00
- 1:00 PM–5:00 PM = 4.00

## 12.4 Typical week

Confirmed daily totals:

- Sunday 0
- Monday–Friday 8
- Saturday 0

## 12.5 Inheritance and copy operations

- Use typical work day shifts on base calendar
- Copy Day
- Paste Day
- Clear Day

## 12.6 Legend

Confirmed visual categories:

- Typical
- Non Working
- Base Calendar Exception
- Resource Exception

## 12.7 Open calendar rules

Still to establish:

- exception precedence;
- base-calendar inheritance;
- resource exception precedence;
- task/bar override precedence;
- daylight-saving handling;
- timezone rules;
- summary calendar selection;
- immediate rescheduling behaviour after edits.

---

# 13. Project Information

Confirmed fields:

- Project Calendar
- Project Start Date
- Project Start Time
- Project Finish Date
- Project Finish Time

The screenshots suggest:

- project start is editable;
- project finish is calculated/read-only.

Required:

- changing project start may shift or re-anchor As Soon As Possible bars according to defined rules;
- calculated finish derives from project contents;
- All Projects view must preserve independent project start/finish values unless common-finish consolidation is selected.

---

# 14. Resource management

## 14.1 Resource table

Confirmed:

- Resource Name
- Standard Rate
- Overtime Rate
- Per Use Cost
- Total Resource Cost
- Category

## 14.2 Resource Information

Confirmed fields and sections:

- Resource Name
- Category
- Per Use Cost
- Initials
- Resource Notes
- Standard Rate
- Overtime Rate
- Code
- Group
- Full Name
- Job Title
- Employee ID
- Company
- Department
- Material Label
- Business Address
- Home Address
- phone numbers
- fax numbers
- mobile numbers
- email addresses
- business/home URLs
- IM addresses

This supports people, equipment, and materials through category and material label rather than only a simple person record.

## 14.3 Resource calendar

Resource Information has a Work Calendar tab.

Required:

- each resource can inherit or override a base/project calendar;
- resource exceptions influence assigned bars unless ignored;
- assignment and calendar changes recalculate utilisation and, where scheduling mode requires, Revised dates.

## 14.4 Resource projections still missing

The following are known from menus/manual but not yet visually demonstrated:

- Percent Work Usage subrow;
- Work Usage subrow;
- Assignments subrow;
- overload display;
- direct assignment editing;
- work contours;
- spot allocation;
- overtime allocation;
- effort-driven behaviour.

These remain high-priority evidence gaps.

---

# 15. Resource assignment, effort, contour, and cost model

The previous official-document review identified:

- effort-driven scheduling;
- assignment-level work;
- work contours;
- spot allocation by time period;
- assignment-level rate overrides;
- overtime;
- resource over-allocation.

Required mathematical concepts:

```text
Work ≈ Duration × Assigned Capacity
```

but the exact locked variable depends on:

- fixed duration;
- effort-driven setting;
- fixed work or fixed units mode;
- assignment rules.

## 15.1 Contours

Planned contours:

- Flat
- Early Peak
- Late Peak
- Bell
- Double Peak
- Turtle
- Custom

Exact FastTrack curves should be documented or ProjectTrack should define its own normalized curves.

## 15.2 Spot allocation

Manual work entries for individual time buckets override the default contour for those periods.

## 15.3 Overtime

Overtime is not merely a rate field. It needs:

- regular capacity;
- overtime capacity;
- regular work;
- overtime work;
- rate calculations;
- calendar/work-rule thresholds.

## 15.4 Cost

Expected cost components:

- standard resource cost;
- overtime cost;
- per-use cost;
- fixed bar/task cost;
- actual cost;
- baseline cost;
- roll-up cost;
- variance.

---

# 16. Calendar View

Confirmed visual model:

- month heading;
- Sunday–Saturday columns;
- continuous weeks;
- activity bars spanning dates;
- milestone symbol;
- long labels that may include full project/phase/activity path;
- continuation into following month.

Required:

- same bar IDs and states as Schedule View;
- shared filters, ranges, and layouts where appropriate;
- click to inspect;
- likely drag to revise/move, pending evidence;
- collision/stacking logic;
- configurable label content;
- correct display of multi-day and milestone activities.

---

# 17. Summary Graph

The Format Summary Graph dialog confirms a sophisticated timeline-summary object.

Confirmed controls:

- Summary Units
- Starts On
- Left Label
- Right Label
- Mirror Labels
- Insert New Summary
- Duplicate Summary
- Delete Summary
- Data to Summarize
- Summary Operation
- Display As
- Show Labels
- Bar Style to Summarize
- All Bar Styles
- Distribute Column Data Across:
  - Scheduled Duration
  - Revised Duration
  - Actual Duration / % Complete

Observed example:

- data: Scheduled Start Date/Time
- operation: Count
- display: Numeric Text

Required additional supported operations from prior review:

- Total
- Average
- Minimum
- Maximum
- Count
- Standard Deviation
- cumulative display where applicable.

Summary Graphs are timeline/report objects and should be saved with view/report definitions.

---

# 18. Visual document and reporting canvas

FastTrack Schedule is not only a scheduler; it is also a graphical report/document editor.

Required objects:

- text boxes;
- pictures;
- legends;
- pointers;
- embedded objects if supported;
- summary graphs;
- timescale objects;
- datelines;
- headers;
- footers;
- page breaks.

Required object behaviour:

- position;
- resize;
- z-order;
- bring to front;
- send to back;
- arrange;
- copy/paste;
- shift with selected items;
- lock/unlock;
- include/exclude from print.

---

# 19. Layouts, filters, sorts, ranges, and reports

## 19.1 Layouts

A Layout should preserve more than columns:

- visible columns;
- column order;
- widths;
- frozen regions;
- action columns;
- row heights;
- bar styles/components;
- timeline geometry;
- timescale structure;
- view toggles.

## 19.2 Filters

Required predicates can act on:

- row fields;
- bar fields;
- Scheduled state;
- Revised state;
- Actual state;
- resources;
- costs;
- dates;
- progress;
- custom fields.

Temporal predicates:

- Starts In
- Ends In
- Is Contained In
- Spans
- Before
- After

Multiple-bar row semantics must explicitly support:

- Any Bar Matches
- All Bars Match
- First Bar Matches
- Matching Bars Only
- Include Parent Rows
- Include Child Rows

Modes:

- Filter: hide nonmatches
- Highlight: retain context and emphasize matches

## 19.3 Sorts

First-class reusable multi-key sort definitions.

Hierarchy behaviour must be explicit:

- hierarchy-preserving sort;
- flat sort;
- within-parent sort.

Resource View presets are confirmed.

## 19.4 Timeline ranges

First-class saved range definitions:

- All Bars Range
- Entire Project
- Next 30 Days
- Next 90 Days
- Current Quarter
- fiscal period
- selected phase
- custom date span.

## 19.5 Reports

A Report is a saved complete presentation state, potentially preserving:

- Layout
- Filter
- Sort
- Range
- Duration Units
- Work Units
- Active Baseline
- Outline Level
- Zoom
- Autofit
- Summary visibility
- Action Columns
- Critical Path
- Datelines
- Grid/alignment
- pictures
- text boxes
- legends
- bar components
- timescales
- print settings.

## 19.6 Restore All

Confirmed command to remove current sort/filter/hide effects and restore the complete view.

---

# 20. FastSteps

FastSteps are repeatable safe workflows/macros.

Confirmed menu entries:

- Define
- Restore Master Schedule
- Autofit Schedule – Activity Names
- Milestones
- Completed Tasks
- Upcoming Tasks
- Incomplete Tasks
- Cost Report
- Resource Cost Report

Required implementation model:

```text
FastStep
- name
- ordered safe commands[]
- optional parameters
- compound transaction
- error policy
```

Do not allow arbitrary executable code initially.

Open:

- exact Define dialog;
- available command vocabulary;
- whether a FastStep changes data, view state, or both;
- rollback semantics.

---

# 21. Consolidation and multi-project management

## 21.1 Confirmed FastTrack consolidation dialog

The Define Consolidation dialog includes:

- file list;
- Add;
- Remove;
- Locate;
- Update;
- Update All;
- option: files are subprojects and have a common Project Finish Date;
- option: files are projects and have separate Project Finish Dates.

This confirms file-based project consolidation and refresh.

## 21.2 User-required ProjectTrack extension

The user requires a native All Projects tab with:

- all projects visible in one window;
- vertical scrolling through projects;
- project dropdown/expand control;
- each project compactable to one row;
- independent project expansion;
- global expansion of every project and every activity;
- all steps visible in one continuous sequence;
- current work visible across projects;
- project summaries retained in compact mode.

## 21.3 Project summary row

Recommended fields:

- Project Name
- Project Owner/Manager
- Scheduled Start
- Revised Finish
- Overall Duration
- % Complete
- Active Activities
- Late Activities
- Current Phase
- Next Milestone
- Current Resources
- Budget
- Revised Cost
- Actual Cost
- Variance

## 21.4 Common-finish and separate-finish modes

The consolidated master should support:

- aligned subprojects sharing a common project finish;
- independent projects retaining separate finish dates.

Exact semantics of common-finish alignment remain to be observed.

## 21.5 Ownership and update questions

Still open:

- Is master view directly editable?
- Does editing a child project in master write to its source project immediately?
- Is master a cached projection requiring Get Updates?
- How are conflicts handled when source and master both change?
- Can cross-project links be created?
- Are resources global or project-local?
- How are duplicate resources matched?
- What happens when a source project file is missing?
- Can a project be detached from consolidation?
- Which project calendar controls master summary rows?

## 21.6 Proposed master grouping extensions

Previously proposed but not yet explicitly confirmed:

- By Project
- By Phase
- By Workstream
- By Resource
- By Department
- By Status
- Chronological

These should remain optional until approved.

---

# 22. Shift, arrange, and Autofit

## 22.1 Shift Items

Moves selected schedule objects, with optional inclusion of:

- bars/items;
- pictures and legends;
- text boxes.

## 22.2 Shift Schedule

Moves the complete individual project by work/calendar units.

## 22.3 Shift Project

Required ProjectTrack extension in All Projects view:

- shift only selected project;
- leave other projects unchanged;
- use working or calendar units;
- update links and summaries according to cross-project rules.

## 22.4 Arrange

Includes:

- Bring to Front
- Send to Back
- Arrange

## 22.5 Autofit

Includes:

- Row Height
- Column Width
- View
- Options

Autofit and manual geometry must coexist predictably.

---

# 23. Gridlines, alignment, and snapping

Required:

- separate gridline controls for spreadsheet columns and timeline;
- horizontal and vertical controls;
- optimized defaults;
- custom style, color, size;
- divisions per timeline unit;
- alignment grid visibility;
- bar/object snapping to time units and row geometry;
- modifier key to temporarily disable or refine snapping.

---

# 24. WBS and action columns

## 24.1 WBS

WBS command exists, but exact workflow remains unobserved.

Expected:

- automatic numbering;
- hierarchy-derived codes;
- custom masks;
- renumbering;
- editable or locked modes.

## 24.2 Action columns

Confirmed types:

- Row Number / Select Row
- Page Break
- Information
- Expand/Collapse

Also:

- Show All
- Hide All

Potential additional indicators from prior analysis:

- warning;
- constraint;
- notes;
- resource conflict.

Only observed items should be considered confirmed.

---

# 25. Search, navigation, spelling, and keyboard workflow

Confirmed or expected:

- Find
- Go To
- Select
- Spelling
- Keyboard Shortcuts
- Schedule Ctrl+1
- Calendar Ctrl+2
- Resource Ctrl+3
- Ctrl+N New
- Ctrl+O Open
- Ctrl+S Save
- Ctrl+Shift+S Save As
- Ctrl+Z Undo
- Ctrl+Y Redo
- Ctrl+C Copy
- Ctrl+V Paste
- Ctrl+F Find
- Delete
- Insert
- Tab / Shift+Tab
- indent/outdent shortcuts
- tool shortcuts
- Go To Today
- Go To Row
- Go To Bar.

Find/replace and spell checking were identified in prior review but exact screenshots beyond Spelling are not yet present.

---

# 26. Persistence and file architecture

Preferred internal storage:

- SQLite with schema versioning.

Portable package:

```text
.projecttrack
├── project.json
├── rows.json
├── bars.json
├── resources.json
├── assignments.json
├── calendars.json
├── fields.json
├── layouts.json
├── reports.json
└── metadata.json
```

Important:

- one canonical domain schema;
- serialization round-trip tests;
- atomic save;
- WAL or equivalent for resilience;
- autosave;
- recovery snapshots;
- versioned archive;
- no silent overwrite.

---

# 27. Import, export, clipboard, and printing

Expected:

- CSV
- XLSX
- Microsoft Project XML
- ICS
- HTML/table
- PDF
- high-resolution image
- SVG/vector where feasible
- native clipboard support for Word/PowerPoint
- MPP import only if a reliable legally compatible library is available.

MPP is conditional and should not block the product. Microsoft Project XML is the guaranteed compatibility route.

Printing/report requirements:

- Print Preview
- landscape/portrait
- fit to page
- fit timeline width
- page breaks
- title
- headers/footers
- legends
- project metadata
- wall-chart multi-page output.

---

# 28. Performance and non-functional requirements

Target scale:

- 10,000 rows
- 15,000 bars
- 25,000 dependencies
- 2,000 resources
- 50,000 assignments

Required techniques:

- row virtualization;
- column virtualization where useful;
- timeline viewport culling;
- cached coordinate transforms;
- incremental recalculation;
- background workers;
- progress indicators;
- cancellation for safe long operations;
- staging plus commit/rollback.

Performance tests should include:

- open/save;
- scroll;
- zoom;
- collapse/expand;
- filter/sort;
- baseline save;
- portfolio refresh;
- link recalculation;
- resource aggregation.

---

# 29. Undo and transactional integrity

Minimum goal:

- 100 operations.

Undoable operations:

- row insert/delete;
- indent/outdent;
- bar draw/move/resize;
- revise;
- percent/progress;
- dependency creation/deletion;
- resource assignment changes;
- calendar changes;
- baseline changes where practical;
- shift items/schedule/project;
- object movement;
- layout/view changes where appropriate.

Complex reschedules should be one compound command.

View undo and schedule-data undo should not become confused.

---

# 30. Testing strategy

## 30.1 Scheduler tests

At least 100 deterministic tests covering:

- FS, SS, FF, SF;
- lead and lag;
- multiple predecessors/successors;
- cycle rejection;
- weekends;
- holidays;
- split shifts;
- time of day;
- calendar inheritance;
- resource calendars;
- ignore resource calendars;
- constraints;
- fixed duration;
- effort-driven scheduling;
- Scheduled/Revised/Actual reset;
- milestones;
- summary calculations;
- critical path;
- total/free float;
- priority;
- baselines;
- resource contour;
- spot allocation;
- overtime;
- cost.

## 30.2 UI tests

- draw bar;
- drag;
- resize;
- link;
- revise;
- percent;
- row expand/collapse;
- Show Level;
- timeline density change;
- row scaling;
- Autofit;
- filter;
- sort;
- range;
- resource editing;
- calendar editing;
- baseline display;
- master project expansion;
- open/save;
- undo/redo.

## 30.3 Golden schedules

Create reference fixtures and compare:

- full recomputation vs incremental recomputation;
- project summary values;
- resource totals;
- baseline variances;
- import/export round trips.

---

# 31. Rational achievability matrix

Legend:

- **A:** directly achievable with normal engineering
- **B:** achievable but needs formal rules and rigorous tests
- **C:** conditional on third-party/platform behaviour
- **D:** not fully specified or not responsibly promiseable yet

| ID | Capability | Evidence | Status | Achievability | Main gap | Required plan |
|---|---|---|---|---|---|---|
| ARC-01 | Row separate from Bar | D/S/U | Confirmed | A | Risk of UI flattening model | Schema invariants and N-bars-per-row tests |
| ARC-02 | Multiple bars per row | D | Strongly supported | B | Exact selection and display not yet shown | Obtain multi-bar screenshot/workflow |
| ARC-03 | Scheduled/Revised/Actual | S/D | Confirmed | B | State transitions need rules | Formal transition table |
| ARC-04 | Ten baselines | D | Strongly supported | A | Visual comparison not shown | Baseline-view evidence and tests |
| ARC-05 | Stable row number and Bar ID | S | Confirmed | A | Renumbering rules open | Separate immutable IDs and display numbers |
| UI-01 | Spreadsheet + timeline | S | Confirmed | A/B | Many edge cases | Grid and timeline interaction spec |
| UI-02 | Global Show Level | S/U | Confirmed | A | Persistence rules | Outline-state model |
| UI-03 | Compact summary view | S/U | Confirmed | B | Summary mathematics | Golden summary schedules |
| UI-04 | Continuous timeline density | U/S | Confirmed | B | Anchor/zoom behaviour | Coordinate-transform tests |
| UI-05 | Global and per-row height | U/S | Confirmed | B | Autofit precedence | Canonical row geometry model |
| UI-06 | Tool-state machine | S/D | Confirmed | A/B | Input conflicts | Central ToolController |
| UI-07 | Lock Tool | S | Confirmed | A | One-shot vs repeat rules | Explicit state transitions |
| UI-08 | Bar styles/components | S/D | Confirmed | B | Full editor not yet shown | Finite primitive style engine |
| UI-09 | Floating report objects | S/D | Confirmed | B | Pointer/Object semantics | Observe dialogs; separate overlay layer |
| UI-10 | QuickLook | S | Confirmed | A | Configurability | Hover-card field definition |
| LNK-01 | Graphical Link tool | S/U | Confirmed | B | Exact endpoint gesture | Controlled linking experiment |
| LNK-02 | FS/SS/FF/SF | D | Strongly supported | B | Editing dialog unseen | Links-tab screenshot/test |
| LNK-03 | Lag/lead | D | Strongly supported | B | Unit rules | Dependency schema/tests |
| LNK-04 | Cycle rejection | P/conventional | Required | A | UI explanation | Graph validation + highlight cycle |
| SCH-01 | Work calendars | S/D | Confirmed | B | Precedence rules | Independent calendar engine |
| SCH-02 | Time-of-day scheduling | S | Confirmed | B | DST/timezone | Timestamp policy |
| SCH-03 | Fractional duration | S | Confirmed | B | precision/rounding | Normalized time units |
| SCH-04 | Constraints | S/D | Confirmed | B | conflict precedence | Scheduling rules document |
| SCH-05 | Fixed Duration | S | Confirmed | B | interaction with work/resources | Lock-variable matrix |
| SCH-06 | Ignore Resource Calendars | S | Confirmed | B | inheritance | Calendar-precedence matrix |
| SCH-07 | Critical path and float | D/S menu | Strongly supported | B | calendars/constraints complexity | CPM conformance tests |
| SCH-08 | Bar Priority | S/D | Confirmed field | B | exact semantics | Define ProjectTrack rule if undocumented |
| SCH-09 | Incremental scheduler | P | Required | B/C | correctness/performance | Full solver first, dirty graph later |
| TRK-01 | Revise tool | S | Confirmed | B | visual and downstream rules | Controlled experiment |
| TRK-02 | Percent tool / Actual | S | Confirmed | B | percent-to-actual maths | Tracking rules specification |
| TRK-03 | Reset Revised/Actual | S | Confirmed | B | cascade semantics | State-transition tests |
| TRK-04 | Save/Clear Baseline | S | Confirmed | A/B | multi-baseline UX | Baseline selector and tests |
| RES-01 | Resource master table | S | Confirmed | A | Low | Implement directly |
| RES-02 | Detailed resource record | S | Confirmed | A | Field optionality | Normalized contact/profile model |
| RES-03 | Resource calendar | S | Confirmed | B | inheritance | Same calendar engine |
| RES-04 | Percent Work Usage | S menu/D | Partially understood | B | rendering/editing unseen | Expanded Resource View capture |
| RES-05 | Work Usage | S menu/D | Partially understood | B | time-bucket semantics | Resource fixture and capture |
| RES-06 | Assignments subrow | S menu/D | Partially understood | B | direct editing unseen | Assignment workflow capture |
| RES-07 | Contours | D/V | Strongly supported | B | exact curves | Define normalized functions |
| RES-08 | Spot allocation | D | Strongly supported | B | precedence with contours | Deterministic allocation rules |
| RES-09 | Overtime | S/D | Confirmed fields; model partial | B | threshold rules | Resource overtime policy |
| RES-10 | Effort-driven schedule | D/V | Strongly supported | B | variable locking | Formal equations |
| CAL-01 | Calendar wall view | S | Confirmed | B | direct manipulation unseen | Calendar drag/edit capture |
| CAL-02 | Calendar exceptions/shifts | S | Confirmed | B | inheritance precedence | Calendar tests |
| MPR-01 | File consolidation | S/D | Confirmed | B | update ownership | Consolidation rules |
| MPR-02 | Common finish projects | S | Confirmed option | B | exact alignment | Controlled consolidation test |
| MPR-03 | Separate finish projects | S | Confirmed option | A/B | Low | Preserve independent timelines |
| MPR-04 | Native All Projects tab | U | Confirmed requirement | B | workspace architecture | Build into domain from Phase 0 |
| MPR-05 | Project collapses to one row | U | Confirmed | B | roll-up calculations | Project summary engine |
| MPR-06 | Expand all projects/all rows | U | Confirmed | A/B | performance | Virtualized master tree |
| MPR-07 | Combined sequential steps | U | Confirmed concept | B | exact ordering | Define sort/group semantics |
| MPR-08 | Cross-project grouping | P | Proposed | A/B | User approval | Keep optional |
| REP-01 | Layouts | S/D | Confirmed | A/B | state-versioning | Versioned ViewState |
| REP-02 | Filters | S/D | Confirmed | B | multiple-bar semantics | Filter AST |
| REP-03 | Sorts | S/D | Confirmed | A/B | hierarchy behaviour | explicit mode |
| REP-04 | Timeline Ranges | S/D | Confirmed | A | Low | persist definitions |
| REP-05 | Reports as saved view states | D | Strongly supported | B | breadth of captured state | reusable ViewStateSnapshot |
| REP-06 | FastSteps | S/D | Confirmed | A/B | exact commands | safe command vocabulary |
| REP-07 | Summary Graphs | S/D | Confirmed | B | aggregation semantics | graph engine after core |
| REP-08 | Header/Footer/Page Break | S | Confirmed | B | pagination | print-layout engine |
| INT-01 | CSV/XLSX/XML/ICS/HTML/PDF | D/P | Required | B | mapping loss | compatibility report |
| INT-02 | Native MPP | D | Conditional | C/D | proprietary format/library | XML fallback |
| INT-03 | Vector clipboard | D/P | Conditional | C | Windows/Tauri integration | PNG → SVG → EMF stages |
| NFR-01 | 10k-row performance | P | Required | B | actual latency | automated benchmarks |
| NFR-02 | 100-step undo | P | Required | B | large commands | reversible domain commands |
| NFR-03 | Autosave/recovery | P/D | Required | A/B | corruption | atomic snapshots/WAL |
| NFR-04 | Background jobs | D/P | Required | B | safe cancellation | staging and rollback |
| NFR-05 | Exact FastTrack visual clone | U/Policy | Not targeted | D by design | Copyright and unnecessary parity | Original UI, workflow equivalence |
| NFR-06 | Exact undocumented FastTrack semantics | Methodology | Not promiseable | D | unavailable evidence | compatibility ledger |

---

# 32. What is already understood with high confidence

- Schedule/Resource/Calendar are synchronized views.
- Ribbon commands are context-sensitive.
- Row hierarchy can be collapsed by level.
- Parent rows show summary dates/duration/bars.
- Stable row numbers survive collapse.
- Row and Bar are distinct.
- Bar Information has Scheduled, Revised, and Actual states.
- Time of day is first-class.
- Bar ID is separate from row number.
- Fixed Duration, Priority, Calendar, and Ignore Resource Calendars are bar properties.
- Dedicated Arrow, Bar, Link, Revise, Percent, and Text Box tools exist.
- Lock Tool exists.
- Bar drawing is direct click-drag.
- Revise uses direct drag on existing bars.
- Percent sets work completion and Actual data.
- Links are graphical objects and have a dedicated tool, visibility control, format control, and Links tab.
- Timeline physical density is directly resizable.
- Rows are vertically resizable.
- Typed per-bar columns exist.
- Work calendars support multiple shifts, typical week, exceptions, base calendars, and resource exceptions.
- Resource master data and detailed resource profiles exist.
- Calendar View is a wall-calendar projection.
- Consolidation references multiple project files and supports common or independent finish dates.
- Baseline save/clear and revised/actual reset are distinct commands.
- Summary Graphs are configurable data aggregations.
- FastSteps, Layouts, Filters, Sorts, Ranges, Autofit, shifting, and report-canvas elements are core parts of the workflow.
- The user requires a native All Projects tab with full hierarchical drill-down.

---

# 33. What remains unverified and could still cause future misses

## 33.1 Highest-priority missing evidence

1. Resource View with Percent Work Usage, Work Usage, and Assignments all enabled.
2. Assignment editing dialog.
3. Multiple bars visibly present on one row.
4. Links tab and exact graphical link-creation sequence.
5. Revised/Scheduled/Actual visual comparison on the Gantt.
6. Baseline visual display, including multiple baselines.
7. Consolidated master schedule after real files are added.
8. Get Updates behaviour and conflict handling.
9. Activity Information → Columns tab.
10. Activity Information → Assignments tab.
11. Activity Information → Links tab.
12. Parent summary movement/edit behaviour.
13. Calendar View direct drag/edit.
14. Effort-driven task before/after adding resources.
15. Resource contour and spot allocation screens.
16. Filter definition dialog.
17. Layout definition dialog.
18. Sort definition dialog.
19. Timeline Range definition dialog.
20. WBS setup.
21. FastSteps Define dialog.
22. Bar Style editor.
23. Link formatting/editor.
24. Print Preview and wall-chart pagination.
25. Import/export mapping and round-trip behaviour.

## 33.2 Calculations requiring controlled experiments

1. Move a predecessor and observe Scheduled, Revised, successor movement, and undo.
2. Move a summary bar and observe descendants.
3. Edit parent Start/Finish/Duration and observe children.
4. Add resources to an effort-driven activity.
5. Change a resource calendar.
6. Toggle Ignore Resource Calendars.
7. Enable Fixed Duration and change work/units.
8. Collapse a hierarchy and verify parent duration formula.
9. Save multiple baselines and switch active baseline.
10. Set Actual progress to partial and complete states.
11. Create each dependency type using the Link tool.
12. Add lag/lead and observe dates.
13. Consolidate projects in common-finish mode.
14. Edit a child project from the master and test Get Updates.
15. Test duplicate resources across consolidated files.

---

# 34. Methodological safeguards for the next review

Earlier misses happened because feature names were inventoried without observing every workflow and state transition. Future specification work must use an evidence ledger.

For every command or workflow, record:

| Field | Required content |
|---|---|
| Requirement ID | Stable identifier |
| Source | U / S / D / V / I / P |
| Exact observed behaviour | What was actually seen |
| Entity affected | Row, Bar, Project, Resource, Calendar, View, etc. |
| Input sequence | Clicks, drags, fields, shortcuts |
| Data/state change | Exact domain mutation |
| Visual consequence | What changes on screen |
| Scheduling consequence | What recalculates |
| Undo consequence | One or multiple commands |
| Confidence | Confirmed / partial / open |
| Missing evidence | Required screenshot or experiment |
| ProjectTrack decision | If intentionally different |

No inferred item should silently become “confirmed.”

---

# 35. Training-video research status

The earlier review identified the current training set and produced functional notes for:

- 2026 Walkthrough
- Components
- Task Lists
- Durations & Creating Task Bars
- Links
- Dynamic Resource Filters
- Revising Schedules
- Tracking Progress
- Managing Resource Workloads
- Project Reporting
- Effort-Driven Scheduling Parts 1 and 2
- Consolidating Files
- Project Budgeting
- Customizing Schedules and Templates

Important limitation:

- these were not complete word-for-word transcripts of every video;
- they were functional summaries cross-checked against accessible documentation;
- frame-by-frame interaction details could therefore still be missing.

A true transcript/interaction audit would require:

- audio/captions;
- frame sequence;
- timestamped click/action log;
- dialog contents;
- before/after state comparison.

---

# 36. Lower-priority parity items identified earlier

These have been identified but are not yet central to the present screenshots:

- image and hyperlink columns;
- value lists and calculated fields;
- column totals/average/min/max/count/standard deviation;
- weighted % complete;
- frozen columns on both sides;
- advanced temporal filtering;
- dateline types;
- templates;
- AutoArchive;
- file password;
- batch file conversion;
- non-working time indication inside bars;
- calendar publishing/update semantics;
- HTML export;
- copy schedule to PowerPoint/Word;
- spell checking and replace;
- progress feedback during long operations;
- direct MPP import if viable.

---

# 37. Deliberate non-goals for initial implementation

- pixel-for-pixel FastTrack copy;
- proprietary FastTrack file format cloning;
- copied icons, graphics, or branding;
- authentication/subscriptions before the scheduler works;
- cloud collaboration before the desktop core is stable;
- arbitrary scripting in FastSteps;
- fragile home-grown MPP parser;
- AI scheduling, Monte Carlo, PERT, Kanban, or automatic resource leveling in the first release.

These may be future extensions only after the core model is correct.

---

# 38. Required implementation dependency chain for a future build prompt

This document does not authorise implementation, but the rational order already established is:

```text
Workspace / Project / Row / Bar domain model
        ↓
Timestamp and work-calendar engine
        ↓
Dependency and constraint engine
        ↓
Scheduled / Revised / Actual state transitions
        ↓
Summary and project roll-up engine
        ↓
Critical path and float
        ↓
Interactive grid and timeline geometry
        ↓
Graphical tools, including Link/Revise/Percent
        ↓
Resource assignment and utilisation engine
        ↓
Cost and tracking
        ↓
Layouts / Filters / Sorts / Ranges / Reports
        ↓
Calendar View
        ↓
All Projects / consolidation update semantics
        ↓
Import / Export / Print
```

The All Projects architecture must exist from the beginning even if advanced portfolio editing is implemented later.

---

# 39. Feature-compliance template for the repository

A future repository should maintain:

| Requirement ID | Designed | Implemented | Unit tested | UI tested | Performance tested | Evidence compared | Known deviation | Closure plan |
|---|---:|---:|---:|---:|---:|---:|---|---|
| ARC-01 Row/Bar split |  |  |  |  |  |  |  |  |
| ARC-03 Scheduled/Revised/Actual |  |  |  |  |  |  |  |  |
| LNK-01 Graphical linking |  |  |  |  |  |  |  |  |
| UI-03 Summary view |  |  |  |  |  |  |  |  |
| MPR-04 All Projects tab |  |  |  |  |  |  |  |  |
| RES-04 Resource usage |  |  |  |  |  |  |  |  |
| CAL-01 Calendar View |  |  |  |  |  |  |  |  |
| REP-07 Summary Graphs |  |  |  |  |  |  |  |  |

A feature is not “done” merely because code exists.

---

# 40. Current consolidated product statement

ProjectTrack should be a high-density desktop scheduling environment where a user can:

- manage an individual project with FastTrack-class spreadsheet and graphical controls;
- draw, link, revise, track, style, filter, and report activities directly;
- preserve original, revised, actual, and baseline states;
- model resources, costs, calendars, and dependencies correctly;
- collapse any activity group, phase, or complete project to a meaningful summary row;
- open an All Projects tab and see every project on one shared timeline;
- selectively expand one project while keeping the rest compact;
- expand every project and every activity into one scrollable sequence;
- see what work is currently active across the organisation;
- move smoothly between Schedule, Resource, Calendar, and Master views without duplicating the underlying data.

---

# 41. Immediate status

**Captured:** product intent, major architecture, all visible ribbon elements, direct tools, core dialogs, compact hierarchy, continuous scaling, Resource master data, Calendar View, Work Calendars, consolidation setup, user-required All Projects view, rational achievability, and known gaps.

**Not yet captured sufficiently:** exact linking gesture/type selection, expanded Resource usage, assignments, baseline graphics, Scheduled/Revised/Actual graphics, multi-bar row workflow, consolidation update semantics, and several definition dialogs.

**Implementation status:** none requested; this document is the structured requirements and evidence ledger only.
