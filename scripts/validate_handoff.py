\
#!/usr/bin/env python3
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
required = [
    'README.md','AGENTS.md','CODEX_IMPLEMENTATION_PROMPT.md','CODEX_VALIDATION_PROMPT.md','STATUS.md',
    'docs/00_MASTER_REQUIREMENTS_EVIDENCE_LEDGER.md','docs/01_PRODUCT_DEFINITION.md',
    'docs/02_ARCHITECTURE_GUARDRAILS.md','docs/03_EXECUTION_PLAN.md','docs/04_PHASE_GATE_PLAN.md',
    'docs/05_UI_UX_APPROVAL_GATES.md','docs/06_VALIDATION_PLAN.md','docs/07_ACCEPTANCE_TEST_CATALOG.md',
    'docs/08_FEATURE_COMPLIANCE_MATRIX.md','docs/09_REQUIREMENTS_TRACEABILITY_MATRIX.csv',
    'docs/10_OPEN_QUESTIONS.md','docs/13_CODEX_HANDOFF_PROTOCOL.md','docs/14_SCREENSHOT_MANIFEST.md',
    'governance/requirements.json','governance/gates.json','governance/open_questions.json',
    'governance/test_catalog.json'
]
errors=[]
for rel in required:
    if not (ROOT/rel).is_file(): errors.append(f'missing required file: {rel}')

def load(rel):
    try: return json.loads((ROOT/rel).read_text(encoding='utf-8'))
    except Exception as e:
        errors.append(f'invalid JSON {rel}: {e}')
        return []

reqs=load('governance/requirements.json')
gates=load('governance/gates.json')
questions=load('governance/open_questions.json')
tests=load('governance/test_catalog.json')

def unique(items,key,label):
    vals=[i.get(key) for i in items]
    bad=[v for v in vals if not v]
    dup=sorted({v for v in vals if vals.count(v)>1})
    if bad: errors.append(f'{label}: missing {key}')
    if dup: errors.append(f'{label}: duplicate {key}: {dup}')
unique(reqs,'requirement_id','requirements')
unique(gates,'gate_id','gates')
unique(questions,'id','questions')
unique(tests,'test_id','tests')

gate_ids={g.get('gate_id') for g in gates}
for r in reqs:
    if r.get('target_gate') not in gate_ids:
        errors.append(f"{r.get('requirement_id')}: unknown gate {r.get('target_gate')}")
for q in questions:
    if q.get('decision_gate') not in gate_ids:
        errors.append(f"{q.get('id')}: unknown decision gate {q.get('decision_gate')}")

refs=list((ROOT/'assets/reference').glob('*.png'))
if len(refs)!=52: errors.append(f'expected 52 reference PNGs, found {len(refs)}')
manifest=(ROOT/'docs/14_SCREENSHOT_MANIFEST.md').read_text(encoding='utf-8') if (ROOT/'docs/14_SCREENSHOT_MANIFEST.md').exists() else ''
for p in refs:
    if p.name not in manifest: errors.append(f'reference missing from manifest: {p.name}')

agents=(ROOT/'AGENTS.md').read_text(encoding='utf-8') if (ROOT/'AGENTS.md').exists() else ''
for token in ['Row is not Bar','G-ARCH-01','UI-00','Validation Codex']:
    if token not in agents: errors.append(f'AGENTS.md missing control token: {token}')

if len(reqs)<70: errors.append(f'expected at least 70 requirements, found {len(reqs)}')
if len(tests)<100: errors.append(f'expected at least 100 test seeds, found {len(tests)}')
if len(gates)<15: errors.append(f'expected at least 15 gates, found {len(gates)}')

if errors:
    print('Handoff validation FAIL')
    for e in errors: print('-',e)
    sys.exit(1)
print('Handoff validation PASS')
print(f'Requirements: {len(reqs)}')
print(f'Gates: {len(gates)}')
print(f'Open questions: {len(questions)}')
print(f'Test seeds: {len(tests)}')
print(f'Reference images: {len(refs)}')
