# Work Packet P00–P01 — Validate Handoff and Prepare Approval Evidence

- **Authorised phases:** P00 and P01 only
- **Base state:** structured handoff package, no product implementation
- **Primary gates:** G-HANDOFF-00, G-ARCH-01, UI-00
- **Requirement scope:** all P0 architecture/governance requirements; no production feature implementation
- **Explicit non-goal:** no Tauri/React/Rust product scaffolding beyond a disposable low-fidelity UI-00 review artifact

## Required sequence

1. Run `python scripts/validate_handoff.py`.
2. Create an independent validation task using `CODEX_VALIDATION_PROMPT.md` for G-HANDOFF-00.
3. Inventory every P0 requirement and open question.
4. Produce the six P01 documents named in `CODEX_IMPLEMENTATION_PROMPT.md`.
5. Create low-fidelity UI-00 evidence for the information architecture and original visual direction.
6. Run independent architecture and UI eligibility validation.
7. Update the matrices and `STATUS.md`.
8. Commit with a clean worktree.
9. Stop and request explicit user decisions for G-ARCH-01 and UI-00.

## Evidence required

- G-HANDOFF-00 validator report tied to commit SHA;
- domain and ownership diagrams;
- scheduling/state/summary decision tables;
- open-question disposition list;
- UI-00 evidence bundle with 1920×1080 and 1440×900 layouts;
- validator eligibility report;
- exact user approval tokens requested.

## Completion condition

P01 is not complete until the user records explicit approvals. Product code remains prohibited until then.

## Closure update — 2026-09-02

The user explicitly approved `G-ARCH-01` and `UI-00`. Those human decisions are recorded under `governance/approvals/`. The independent `G-HANDOFF-00` verdict is still pending. This packet is superseded for forward execution by `P00_VALIDATION_THEN_P02_DESKTOP_SHELL.md`.
