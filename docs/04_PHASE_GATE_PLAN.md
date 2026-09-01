# Phase, Checkpoint and Gate Plan

## Gate states

`PENDING → IN REVIEW → APPROVED / REJECTED / CONDITIONAL / BLOCKED`

Technical validators may produce PASS/FAIL and eligibility. The user alone approves UI gates and is final authority for G-ARCH-01/G-REL-02 after technical eligibility.

| Gate | Phase | Pass authority | Required outcome | Advancement blocked until |
|---|---|---|---|---|
| G-HANDOFF-00 | P00 | Validation Codex | Complete, consistent, machine-readable handoff | PASS report committed |
| G-ARCH-01 | P01 | User after validator eligibility | Domain, scheduling, ownership and decision model accepted | explicit approval record |
| UI-00 | P01/P02 | User only | Information architecture and visual direction accepted | explicit approval record |
| UI-01 | P02 | User only | Desktop shell/navigation accepted | explicit approval record |
| G-ENG-02 | P03 | Validation Codex | Calendar/dependency/constraint/full scheduler correct | PASS report |
| UI-02 | P04 | User only | Schedule View structure accepted | explicit approval record |
| UI-03 | P05 | User only | Tools/linking/direct manipulation accepted | explicit approval record |
| G-ENG-03 | P06 | Validation Codex | Tracking/baselines/summaries/CPM correct | PASS report |
| UI-06 | P06 | User only | Tracking/baseline visuals accepted | explicit approval record |
| UI-04 | P07 | User only | All Projects workflow accepted | explicit approval record |
| G-ENG-04 | P08 | Validation Codex | Resource/work/cost engine correct | PASS report |
| UI-05 | P08 | User only | Resource View accepted | explicit approval record |
| UI-07 | P09 | User only | Calendar View accepted | explicit approval record |
| UI-08 | P10 | User only | Reporting/print accepted | explicit approval record |
| G-REL-01 | P11 | Validation Codex | Interoperability guarantees proven | PASS report |
| UI-09 | P12 | User only | Integrated experience accepted | explicit approval record |
| G-REL-02 | P12 | User after validator eligibility | Release candidate accepted | explicit release approval |

## Mandatory checkpoint contents

Every checkpoint record must include:

- phase and gate;
- exact commit SHA and clean-worktree confirmation;
- requirements addressed and matrix updates;
- design/decision changes;
- commands and results;
- validator report;
- screenshots/recording/fixtures where applicable;
- defects and known deviations;
- open questions affected;
- next permitted action.

## Gate failure behavior

- Do not continue into later phase work.
- Open defects with severity and reproduction.
- Produce a bounded remediation packet.
- Re-run only after a new commit.
- Never overwrite the failed report; append a new report tied to the new SHA.
