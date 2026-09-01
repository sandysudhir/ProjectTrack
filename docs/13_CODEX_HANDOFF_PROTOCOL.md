# Codex Handoff Protocol

## Recommended task separation

1. **Implementation task:** receives `CODEX_IMPLEMENTATION_PROMPT.md`, works on one authorised packet and commits.
2. **Validation task:** receives `CODEX_VALIDATION_PROMPT.md` plus the exact implementation SHA, performs read-only-first independent validation and commits only its report/test harness where necessary.
3. **User review:** receives the UI evidence bundle and validator eligibility report; approval is recorded verbatim.

Do not ask one long-running agent to implement, validate and approve its own work.

## Repository setup

Use a dedicated private GitHub repository for ProjectTrack. Configure the Codex environment with the expected Windows/Tauri/Rust/Node toolchain or a compatible CI cross-build setup. Keep setup reproducible in repository scripts.

## First implementation task message

```text
Read AGENTS.md and CODEX_IMPLEMENTATION_PROMPT.md. Execute only P00 and P01. Do not write product code. Validate the handoff, create the required architecture/decision/UI-00 evidence, request independent validation, commit, and stop at G-ARCH-01/UI-00 for human approval.
```

## First validation task message

```text
Read AGENTS.md and CODEX_VALIDATION_PROMPT.md. Validate G-HANDOFF-00 against the exact latest commit. Do not implement product functionality. Commit the independent validation report and stop.
```

## UI review response format

```text
APPROVE UI-00
```

or

```text
REJECT UI-00: <specific changes>
```

or

```text
CONDITIONAL APPROVAL UI-00: <conditions>
```
