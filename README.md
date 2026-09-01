# ProjectTrack — Codex Engineering Handoff

**Status:** Structured handoff complete; product implementation not started  
**Package date:** 2026-09-01  
**Source product reference:** FastTrack Schedule workflow, rebuilt with an original implementation and UI  
**Working product name:** ProjectTrack

This repository is the controlled handoff for building a professional Windows desktop scheduling application. It contains the implementation prompt, an independent validation prompt, the full requirements/evidence ledger, 52 user-supplied visual references, architecture guardrails, phase checkpoints, human UI/UX approval gates, acceptance-test seeds, and machine-readable governance data.

## Start here

1. Read `AGENTS.md`.
2. Read `CODEX_IMPLEMENTATION_PROMPT.md` if acting as the implementation agent.
3. Read `CODEX_VALIDATION_PROMPT.md` if acting as the independent validator.
4. Read `docs/00_MASTER_REQUIREMENTS_EVIDENCE_LEDGER.md` as the historical source of truth.
5. Run `python scripts/validate_handoff.py`.
6. Execute only the currently authorised phase in `STATUS.md`.

## Non-negotiable control

No product code may be written until **G-ARCH-01** and **UI-00** have explicit approval records. Every frontend gate **UI-00 through UI-09** requires the user's written approval before the next UI phase begins. A validator may mark a gate *eligible for approval* but cannot approve it on the user's behalf.

## Main deliverables

- `CODEX_IMPLEMENTATION_PROMPT.md` — final build instruction.
- `CODEX_VALIDATION_PROMPT.md` — independent validation instruction.
- `docs/03_EXECUTION_PLAN.md` — step-by-step delivery order.
- `docs/04_PHASE_GATE_PLAN.md` — technical and release checkpoints.
- `docs/05_UI_UX_APPROVAL_GATES.md` — mandatory user approval gates.
- `docs/06_VALIDATION_PLAN.md` — complete validation method.
- `docs/08_FEATURE_COMPLIANCE_MATRIX.md` and `ProjectTrack_Governance_Matrix.xlsx` — live control matrix.
- `assets/reference/` — 52 visual references.

## Current permitted action

Only **P00 Handoff Validation** and **P01 Architecture/Decision Closure** are authorised. Do not scaffold the production frontend or scheduler until the required approvals exist.
