# Work Packet — P00 Validation Then P02 Desktop Shell

- **Packet ID:** P00-P02-2026-09-02
- **Issued:** 2026-09-02
- **Base commit approved by user:** `4a773b4093f9db825a0651de4f436458030bad7d`
- **Human gates already approved:** G-ARCH-01, UI-00
- **Technical prerequisite:** G-HANDOFF-00 must PASS on the exact current commit before product code begins
- **Implementation scope after PASS:** P02 only
- **Stop gate:** UI-01
- **Out of scope:** scheduler, calendar arithmetic, dependencies, resource engine, tracking, baselines, import/export, reports, and later phases

## Stage A — Independent package validation

1. Validation Codex reads `CODEX_VALIDATION_PROMPT.md`.
2. Validate the exact committed repository, including approval records and active instructions.
3. Run `python scripts/validate_handoff.py`.
4. Confirm no active instruction still incorrectly limits work to P00/P01.
5. Commit a formal G-HANDOFF-00 report.
6. If FAIL, stop and create a bounded remediation packet.
7. If PASS, Implementation Codex may begin Stage B.

## Stage B — P02 desktop shell

1. Scaffold the approved Tauri/React desktop workspace and package boundaries.
2. Implement the tab workspace with:
   - All Projects tab;
   - one or more individual-project tabs;
   - Schedule, Resource and Calendar switching.
3. Implement contextual command regions with original, high-density desktop styling.
4. Implement split-pane layout, status bar, command/shortcut framework and predictable focus.
5. Implement deterministic fixture-backed states:
   - empty;
   - loading;
   - populated;
   - disabled;
   - error/conflict.
6. Preserve architecture boundaries: no scheduling logic inside UI components.
7. Add executable smoke tests, keyboard/focus tests and visual-regression capture.
8. Produce UI-01 evidence at 1920×1080 and 1440×900 plus a short interaction recording.
9. Ask Validation Codex for `ELIGIBLE FOR USER REVIEW` against the exact P02 commit.
10. Update governance files, commit with a clean worktree, and stop.

## UI-01 pass conditions

- All Projects and individual-project tabs are obvious and usable.
- Schedule/Resource/Calendar switching is discoverable and keyboard-accessible.
- The shell is dense, precise and professional—not a card-based SaaS dashboard.
- Panes resize without clipping, overlap or focus loss.
- Contextual commands reflect the current view/selection.
- State restoration is demonstrated.
- No fake scheduler functionality is presented as implemented.
- Validator finds no S0/S1 defect and declares the build eligible for user review.

## Required completion report

- commit SHA;
- files changed;
- commands/tests and results;
- evidence paths;
- independent validator result;
- known deviations;
- exact request: `APPROVE UI-01`.
