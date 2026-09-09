# UI Evidence Bundle UI-01

## User journeys demonstrated

1. Open All Projects and switch between Orion Program, Atlas Program and Delta Release tabs.
2. Switch Schedule, Resource and Calendar from the left navigation.
3. Switch ribbon command groups, use the workspace search, change row density and timeline zoom.
4. Toggle the deterministic loading state and return to the populated fixture.
5. Resize the grid/timeline split using the divider control.

## Runnable build

```text
cd apps/desktop
npm install
npx vite --host 127.0.0.1 --port 4173
```

## Screenshots

- 1920×1080: `ui-01-1920x1080.png`
- 1440×900: `ui-01-1440x900.png`

## Interaction evidence

Browser smoke evidence verified tab switching, Schedule/Resource/Calendar navigation, Insert ribbon commands, search filtering to Architecture, zoom slider, density selector and loading-state toggle.

## Keyboard/focus evidence

All navigation, tab, ribbon, toolbar and state controls are native buttons/selects/inputs with accessible names. Search is keyboard-focusable and exposes `Ctrl K` as the shortcut affordance.

## State matrix

| State | Evidence |
|---|---|
| Populated | Deterministic 10-row, 3-project fixture with summary bars, milestones and today line |
| Loading | Workspace ready control toggles a visible loading panel |
| Empty | Reserved by shell architecture; no empty fixture is presented as implemented domain behavior |
| Error/conflict | Reserved by shell architecture; no scheduler conflict semantics are claimed in P02 |
| Disabled | Native controls remain available only for shell actions; domain commands are intentionally deferred |

## Reference comparison

The shell follows the approved light, high-density desktop direction: top project tabs, ribbon command bands, left project/navigation rail, synchronized grid and timeline panes, and status bar. It is an original ProjectTrack implementation and does not copy FastTrack branding or assets.

## Known deviations/questions

- Resource and Calendar views are structured P02 placeholders; calculations and direct editing are deferred to later approved phases.
- Schedule bars are deterministic fixture visuals; scheduler semantics and persistence are not implemented in P02.
- Full native Tauri packaging is deferred; the current evidence runs the React/Vite desktop shell.

## Validator eligibility report

Pending independent Validation Codex review against the exact P02 commit.
