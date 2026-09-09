# Work Packet — P02 Desktop Shell / UI-01

- **Packet ID:** P02-UI-01-2026-09-09
- **Source of truth:** `ProjectTrack_Codex_Handoff_Approved_2026-09-02.zip`
- **Prerequisites:** `G-ARCH-01 = APPROVED`, `UI-00 = APPROVED`, `G-HANDOFF-00 = PASS`
- **Scope:** Desktop shell and navigation only
- **Out of scope:** scheduler, calendar arithmetic, dependencies, resources, tracking, baselines, reports, import/export and persistence
- **Stop gate:** UI-01

## Requirement mapping

- UI-01 shell: All Projects and project tabs, Schedule/Resource/Calendar switching, ribbon commands, split grid/timeline, status bar, search, layout and focus states.
- UI-14: tabbed workspace shell and native All Projects navigation projection.
- GOV-01/GOV-02: evidence and independent validation are required before requesting the user gate.

## Implementation decisions

- Use a deterministic fixture rendered entirely in the UI shell; no fake scheduler or backend is presented as complete.
- Keep the visual language light, dense and professional with a grid/timeline primary workspace.
- Resource and Calendar are structured placeholders that preserve the approved information architecture.
- All commands report their shell action in the status bar and do not mutate domain data.

## Validation plan

- `python scripts/validate_handoff.py`
- `npm install` and `npx vite build` under `apps/desktop`
- browser smoke path for tabs, Schedule/Resource/Calendar switching, ribbon selection, search, zoom and loading state
- screenshots at 1920×1080 and 1440×900
