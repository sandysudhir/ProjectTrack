# G-ENG-02 Implementation Checkpoint

- **Gate:** G-ENG-02
- **Phase:** P03 calendar and deterministic scheduler core
- **Implementation date:** 2026-09-11
- **Status:** Implementation checkpoint complete; independent validator PASS is still required
- **Scope:** Domain entities, UTC timestamp calendar arithmetic, dependency graph validation, deterministic full scheduling, constraints, summary bounds and critical-path float

## Delivered

- `packages/domain/index.mjs` defines immutable task and dependency entities, supported dependency/constraint types, stable validation, cycle detection and deterministic topological ordering.
- `packages/calendar-engine/index.mjs` implements split shifts, weekends, working/non-working exceptions, base-calendar inheritance, next/previous working instants and fractional working-hour arithmetic.
- `packages/scheduler/index.mjs` implements FS/SS/FF/SF relations, positive/negative lag, eight constraint types, explicit conflicts, deterministic full scheduling, summary roll-up and CPM total float/critical flags.
- Calendar calculations use UTC timestamps so the same fixture produces the same result on every host; persisted timestamps retain their explicit offset.

## Traceability and validation

| Requirement seeds | Evidence |
|---|---|
| CAL-001, CAL-002, CAL-003, CAL-004 | `tests/golden/scheduler_engine.test.mjs` split shift, weekend and exception tests |
| DEP-001..DEP-009 | dependency relation and cycle tests |
| CON-001, CON-003..CON-009 | constraint and conflict tests |
| SUM-001, SUM-010 | summary roll-up test |
| CPM-001, CPM-002 | critical-path/parallel-path test |

Executed checks:

- `node --test tests/golden/scheduler_engine.test.mjs` — **PASS (10/10)**
- `npm run build` in `apps/desktop` — **PASS**
- `python scripts/validate_handoff.py` — **PASS**

Persistence, resource calculations, tracking/baselines, import/export, reports and UI integration remain outside this checkpoint and are still gated by their later phases.
