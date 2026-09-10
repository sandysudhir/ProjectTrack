# UI-01R Evidence — Screenshot-to-Interface Reconciliation

- Branch: `ui/ui-01r-reference-reconciliation`
- Scope: P02 shell reconciliation only; P03+ blocked
- Original screenshots reviewed: **41**
- Manifest files reviewed: **52**
- Unmapped original screenshots: **0**
- Unmapped visible commands: **0**

## Evidence captures

- `01-01-schedule-expanded.png` — running ProjectTrack shell capture
- `01-schedule-expanded.png` — running ProjectTrack shell capture
- `02-02-schedule-compacted.png` — running ProjectTrack shell capture
- `02-schedule-compacted.png` — running ProjectTrack shell capture
- `03-03-insert-ribbon.png` — running ProjectTrack shell capture
- `03-insert-ribbon.png` — running ProjectTrack shell capture
- `04-04-format-ribbon.png` — running ProjectTrack shell capture
- `04-format-ribbon.png` — running ProjectTrack shell capture
- `05-05-view-ribbon.png` — running ProjectTrack shell capture
- `05-view-ribbon.png` — running ProjectTrack shell capture
- `06-06-project-ribbon.png` — running ProjectTrack shell capture
- `06-project-ribbon.png` — running ProjectTrack shell capture
- `07-07-tools-ribbon.png` — running ProjectTrack shell capture
- `07-tools-ribbon.png` — running ProjectTrack shell capture
- `08-08-application-ribbon.png` — running ProjectTrack shell capture
- `08-application-ribbon.png` — running ProjectTrack shell capture
- `09-09-faststeps-menu.png` — running ProjectTrack shell capture
- `09-faststeps-menu.png` — running ProjectTrack shell capture
- `10-10-autofit-menu.png` — running ProjectTrack shell capture
- `10-autofit-menu.png` — running ProjectTrack shell capture
- `11-11-shift-items.png` — running ProjectTrack shell capture
- `11-shift-items.png` — running ProjectTrack shell capture
- `12-12-shift-schedule.png` — running ProjectTrack shell capture
- `12-shift-schedule.png` — running ProjectTrack shell capture
- `13-13-column-map.png` — running ProjectTrack shell capture
- `13-column-map.png` — running ProjectTrack shell capture
- `14-14-activity-information.png` — running ProjectTrack shell capture
- `14-activity-information.png` — running ProjectTrack shell capture
- `15-15-activity-information-milestone.png` — running ProjectTrack shell capture
- `15-activity-information-milestone.png` — running ProjectTrack shell capture
- `16-16-quicklook.png` — running ProjectTrack shell capture
- `16-quicklook.png` — running ProjectTrack shell capture
- `17-17-bar-styles.png` — running ProjectTrack shell capture
- `17-bar-styles.png` — running ProjectTrack shell capture
- `18-18-project-information.png` — running ProjectTrack shell capture
- `18-project-information.png` — running ProjectTrack shell capture
- `19-19-resource-view.png` — running ProjectTrack shell capture
- `19-resource-view.png` — running ProjectTrack shell capture
- `20-20-resource-information.png` — running ProjectTrack shell capture
- `20-resource-information.png` — running ProjectTrack shell capture
- `21-21-work-calendars.png` — running ProjectTrack shell capture
- `21-work-calendars.png` — running ProjectTrack shell capture
- `22-22-calendar-view.png` — running ProjectTrack shell capture
- `22-calendar-view.png` — running ProjectTrack shell capture
- `23-23-consolidation.png` — running ProjectTrack shell capture
- `23-consolidation.png` — running ProjectTrack shell capture
- `24-24-summary-graph.png` — running ProjectTrack shell capture
- `24-summary-graph.png` — running ProjectTrack shell capture
- `25-25-gridlines.png` — running ProjectTrack shell capture
- `25-gridlines.png` — running ProjectTrack shell capture
- `26-26-header-footer.png` — running ProjectTrack shell capture
- `26-header-footer.png` — running ProjectTrack shell capture
- `27-27-all-projects-compact.png` — running ProjectTrack shell capture
- `27-all-projects-compact.png` — running ProjectTrack shell capture
- `28-28-all-projects-selective.png` — running ProjectTrack shell capture
- `28-all-projects-selective.png` — running ProjectTrack shell capture
- `29-29-all-projects-expand-everything.png` — running ProjectTrack shell capture
- `29-all-projects-expand-everything.png` — running ProjectTrack shell capture
- `30-integrated-1440x900.png` — running ProjectTrack shell capture
- `31-integrated-1920x1080.png` — running ProjectTrack shell capture

## Interaction evidence

- Project tabs: All Projects, Orion Program, Atlas Program and Delta Release switch the active workspace context.
- View navigation: Schedule, Resource and Calendar switch structured working views.
- Ribbon tabs: Home, Insert, Format, View, Project, Tools and Application replace the contextual command group.
- Menus/dialogs: Project Information, Resource Information, Work Calendars, Column Map, Shift Items, Shift Schedule, Consolidation, Summary Graph, Gridlines, Header & Footer, FastSteps and Autofit open reusable shell dialogs.
- Schedule density: Compact/Comfortable/Expanded row selector, timeline zoom slider and grid/timeline splitter are interactive shell controls.
- Hierarchy: Collapse hides descendants while retaining project/summary/milestone rows; Expand restores the expanded fixture.
- QuickLook: deterministic preview card is visible in the Schedule working surface.
- Future commands: later-phase actions remain disabled with `Available after UI-03 / G-ENG-02` tooltip.

## Validation

- `npm run build` — PASS (Vite production build).
- `python scripts/validate_handoff.py` — PASS on approved handoff baseline.
- Package versions pinned in `apps/desktop/package.json` and lockfile.

## Known deviations

- The 41 source screenshots are workflow and density references; ProjectTrack uses original branding, icons and styling.
- Shell dialogs expose presentation fixture fields only; domain calculations, persistence, import/export, reporting and consolidation synchronization remain blocked.
- The evidence set includes actual running-app captures for integrated, ribbon, navigation, compact and dialog states; no AI-generated image is used.

## Final UI-01 approval evidence

- `32-final-1440x900.png` â€” final approved shell capture at 1440Ã—900.
- `33-final-1920x1080.png` â€” final approved shell capture at 1920Ã—1080.
- Graphical date revision: drag a task start/finish handle; the original bar remains visible and a revised outlined line appears. Release opens the rationale dialog; double-click reopens it; hover exposes the saved rationale.
- Graphical completion: drag the vertical completion marker on the bar; the filled segment and `% Complete` grid cell update live.
- Verified live interaction: Architecture changed from 62% to 93%, with status-bar feedback.
