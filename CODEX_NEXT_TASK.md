# CODEX NEXT TASK — VALIDATE HANDOFF, THEN EXECUTE P02 ONLY

## Recorded user decisions

The user explicitly approved both gates on 2026-09-02:

```text
APPROVE G-ARCH-01
APPROVE UI-00 both are approved
```

Immutable records:

- `governance/approvals/G-ARCH-01_2026-09-02.md`
- `governance/approvals/UI-00_2026-09-02.md`

## Mandatory sequence

### A. Validation Codex

1. Read `AGENTS.md`, `STATUS.md`, and `CODEX_VALIDATION_PROMPT.md`.
2. Validate the exact current commit for `G-HANDOFF-00`.
3. Re-run package checks and inspect instruction consistency, approval records, matrices and manifests.
4. Commit the independent report.
5. Return PASS or FAIL. Do not approve any UI gate.

### B. Implementation Codex — only after PASS

1. Read `AGENTS.md`, `STATUS.md`, `CODEX_IMPLEMENTATION_PROMPT.md`, and `governance/work_packets/P00_VALIDATION_THEN_P02_DESKTOP_SHELL.md`.
2. Execute P02 Desktop Shell and Navigation only.
3. Do not implement P03 or any scheduling/resource/tracking logic.
4. Create UI-01 evidence and obtain an independent eligibility report.
5. Commit and stop.

## Required stop

The next user decision must be requested exactly as:

```text
APPROVE UI-01
```

No later frontend or scheduler phase is authorised before that decision.
