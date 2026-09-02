# Codex Handoff Protocol

## Recommended task separation

1. **Implementation task:** receives `CODEX_IMPLEMENTATION_PROMPT.md`, works on one authorised packet and commits.
2. **Validation task:** receives `CODEX_VALIDATION_PROMPT.md` plus the exact implementation SHA, performs read-only-first independent validation and commits only its report/test harness where necessary.
3. **User review:** receives the UI evidence bundle and validator eligibility report; approval is recorded verbatim.

Do not ask one long-running agent to implement, validate and approve its own work.

## Repository setup

Use a dedicated private GitHub repository for ProjectTrack. Configure the Codex environment with the expected Windows/Tauri/Rust/Node toolchain or a compatible CI cross-build setup. Keep setup reproducible in repository scripts.

## Current implementation task message

```text
Read AGENTS.md, STATUS.md, CODEX_NEXT_TASK.md and CODEX_IMPLEMENTATION_PROMPT.md.

The user approved G-ARCH-01 and UI-00 on 2026-09-02.

First, wait for or verify an independent G-HANDOFF-00 PASS tied to the exact commit.
Then execute P02 Desktop Shell and Navigation only.

Required P02 outcome:
- executable Windows-oriented Tauri/React shell;
- All Projects tab and individual-project tabs;
- Schedule/Resource/Calendar view switching;
- contextual command regions;
- split panes, status bar, focus and shortcut framework;
- deterministic empty/loading/error states;
- UI-01 evidence at 1920×1080 and 1440×900;
- independent eligibility report;
- clean commit and stop at UI-01.

Do not begin P03 or implement scheduling logic.
```

## Current validation task message

```text
Read AGENTS.md and CODEX_VALIDATION_PROMPT.md. Validate G-HANDOFF-00 against the exact latest commit. Do not implement product functionality. Commit the independent validation report and stop.
```

## Next UI review response format

```text
APPROVE UI-01
```

or

```text
REJECT UI-01: <specific changes>
```

or

```text
CONDITIONAL APPROVAL UI-01: <conditions>
```
