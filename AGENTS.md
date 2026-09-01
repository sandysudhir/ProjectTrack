# AGENTS.md — ProjectTrack mandatory agent rules

These instructions apply to the entire repository.

## 1. Authority order

1. Explicit user decisions recorded in `governance/approvals/` or `docs/11_DECISION_LOG.md`.
2. `docs/00_MASTER_REQUIREMENTS_EVIDENCE_LEDGER.md`.
3. `CODEX_IMPLEMENTATION_PROMPT.md` or `CODEX_VALIDATION_PROMPT.md`, according to agent role.
4. Approved architecture and UI evidence.
5. Conventional project-scheduling practice.
6. Agent inference.

Never silently convert an inference into a confirmed requirement.

## 2. Read order before any work

1. `STATUS.md`
2. this file
3. the applicable Codex prompt
4. `docs/01_PRODUCT_DEFINITION.md`
5. `docs/02_ARCHITECTURE_GUARDRAILS.md`
6. `docs/03_EXECUTION_PLAN.md`
7. `docs/04_PHASE_GATE_PLAN.md`
8. `docs/05_UI_UX_APPROVAL_GATES.md`
9. `docs/06_VALIDATION_PLAN.md`
10. requirements and open questions relevant to the work packet

Run `python scripts/validate_handoff.py` before changing anything.

## 3. Gate discipline

- Do not begin a phase unless its prerequisites are approved.
- Do not write product code before `G-ARCH-01` and `UI-00` are approved.
- UI gates `UI-00` through `UI-09` are approved only by the user.
- Valid human records are files in `governance/approvals/` containing one of:
  - `APPROVE UI-XX`
  - `REJECT UI-XX: <reason>`
  - `CONDITIONAL APPROVAL UI-XX: <conditions>`
- When a gate is reached, produce its evidence bundle, update matrices/status, commit, and stop.
- Never infer approval from silence, prior general enthusiasm, or a validator PASS.

## 4. Engineering invariants

- Row is not Bar. A row owns 0..N bars.
- Scheduled, Revised, Actual and Baselines are distinct states.
- Project is a native expandable node in a Workspace.
- Summary rows/bars are derived unless an approved rule says otherwise.
- Domain state and view geometry are separate.
- The core domain/scheduler cannot depend on React.
- Implement a correct deterministic full scheduler before incremental optimisation.
- Use stable UUIDs; row order is never identity.
- Calendar arithmetic is timestamp- and shift-aware.
- All Projects is core architecture, not a late dashboard.
- No paid Gantt dependency and no copied FastTrack assets, code or pixel-identical UI.

## 5. Work packet protocol

For each packet:

1. Create `governance/work_packets/<ID>.md` from the template.
2. Identify requirement IDs, gate and open questions.
3. Write or update the design decision before implementation.
4. Add failing tests first where practical.
5. Implement the smallest coherent slice.
6. Run all required checks.
7. Ask the separate **Validation Codex** task to assess the exact commit SHA.
8. Store evidence and validator report.
9. Update `docs/08_FEATURE_COMPLIANCE_MATRIX.md`, JSON/CSV governance data and `STATUS.md`.
10. Commit with a clean worktree.

## 6. Required reporting

Every completion message must state:

- commit SHA;
- requirements addressed;
- tests/commands run and results;
- evidence paths;
- deviations and unresolved questions;
- current gate status;
- the single next permitted action.

Do not claim a feature is complete because code compiles or a screenshot exists.

## 7. Validation commands

At minimum:

```bash
python scripts/validate_handoff.py
```

As the implementation evolves, maintain one root command for full validation and record it here. Never skip required checks to save time unless the user explicitly authorises it and the omission is recorded.
