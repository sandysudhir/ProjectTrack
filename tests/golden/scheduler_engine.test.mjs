import assert from 'node:assert/strict';
import test from 'node:test';
import { createTask, createDependency } from '../../packages/domain/index.mjs';
import { createCalendar, createCalendarEngine } from '../../packages/calendar-engine/index.mjs';
import { scheduleProject } from '../../packages/scheduler/index.mjs';

const iso = (value) => new Date(value).toISOString();
const monday = '2026-09-07T09:00:00Z';

test('split shifts preserve the lunch break', () => {
  const engine = createCalendarEngine([createCalendar()]);
  assert.equal(iso(engine.addWorkingHours('2026-09-07T11:00:00Z', 4)), '2026-09-07T16:00:00.000Z');
});

test('weekends are skipped when adding working time', () => {
  const engine = createCalendarEngine([createCalendar()]);
  assert.equal(iso(engine.addWorkingHours('2026-09-11T16:00:00Z', 2)), '2026-09-14T10:00:00.000Z');
});

test('holiday exceptions are inherited by successors', () => {
  const engine = createCalendarEngine([createCalendar({ exceptions: { '2026-09-08': null } })]);
  assert.equal(iso(engine.addWorkingHours('2026-09-07T16:00:00Z', 2)), '2026-09-09T10:00:00.000Z');
});

test('FS, SS, FF and SF dependency relations schedule deterministically', () => {
  for (const type of ['FS', 'SS', 'FF', 'SF']) {
    const tasks = [createTask({ id: 'a', name: 'A', durationHours: 8, start: monday }), createTask({ id: 'b', name: 'B', durationHours: 8 })];
    const result = scheduleProject({ tasks, dependencies: [createDependency({ predecessorId: 'a', successorId: 'b', type })], projectStart: monday });
    assert.equal(result.status, 'scheduled', type);
    assert.ok(result.tasks.find((task) => task.id === 'b').start instanceof Date, type);
  }
});

test('cycle rejection is atomic and explanatory', () => {
  const result = scheduleProject({ tasks: ['a', 'b', 'c'].map((id) => createTask({ id, durationHours: 1 })), dependencies: [
    createDependency({ predecessorId: 'a', successorId: 'b' }), createDependency({ predecessorId: 'b', successorId: 'c' }), createDependency({ predecessorId: 'c', successorId: 'a' })
  ] });
  assert.equal(result.status, 'conflict');
  assert.equal(result.tasks.length, 0);
  assert.match(result.conflicts[0].message, /cycle/i);
});

test('constraints surface conflicts without silently moving history', () => {
  const result = scheduleProject({ projectStart: monday, tasks: [
    createTask({ id: 'a', durationHours: 8, start: monday }),
    createTask({ id: 'b', durationHours: 8, constraint: { type: 'SNLT', date: '2026-09-07T10:00:00Z' } })
  ], dependencies: [createDependency({ predecessorId: 'a', successorId: 'b', type: 'FS' })] });
  assert.equal(result.status, 'conflict');
  assert.equal(result.conflicts[0].code, 'SNLT_CONFLICT');
});

test('FNET and ALAP constraints are applied to the computed finish', () => {
  const fnet = scheduleProject({ projectStart: monday, tasks: [createTask({ id: 'f', durationHours: 8, constraint: { type: 'FNET', date: '2026-09-10T17:00:00Z' } })] });
  assert.equal(iso(fnet.tasks[0].finish), '2026-09-10T17:00:00.000Z');
  const alap = scheduleProject({ projectStart: monday, projectFinish: '2026-09-11T17:00:00Z', tasks: [createTask({ id: 'l', durationHours: 8, constraint: { type: 'ALAP' } })] });
  assert.equal(iso(alap.tasks[0].finish), '2026-09-11T17:00:00.000Z');
});

test('missing dependency endpoints fail before any task is scheduled', () => {
  const result = scheduleProject({ projectStart: monday, tasks: [createTask({ id: 'a', durationHours: 1 })], dependencies: [createDependency({ predecessorId: 'missing', successorId: 'a' })] });
  assert.equal(result.status, 'conflict');
  assert.equal(result.conflicts[0].code, 'MISSING_ENDPOINT');
});

test('parallel paths identify only the controlling chain as critical', () => {
  const tasks = [
    createTask({ id: 'a', durationHours: 8, start: monday }), createTask({ id: 'b', durationHours: 16 }),
    createTask({ id: 'c', durationHours: 8 }), createTask({ id: 'd', durationHours: 8 })
  ];
  const result = scheduleProject({ projectStart: monday, tasks, dependencies: [
    createDependency({ predecessorId: 'a', successorId: 'b', type: 'FS' }), createDependency({ predecessorId: 'a', successorId: 'c', type: 'FS' }),
    createDependency({ predecessorId: 'b', successorId: 'd', type: 'FS' }), createDependency({ predecessorId: 'c', successorId: 'd', type: 'FS' })
  ] });
  assert.equal(result.status, 'scheduled');
  assert.equal(result.tasks.find((task) => task.id === 'b').critical, true);
  assert.equal(result.tasks.find((task) => task.id === 'c').critical, false);
});

test('summary rows roll up descendant bounds', () => {
  const result = scheduleProject({ projectStart: monday, tasks: [
    createTask({ id: 'summary', type: 'summary', durationHours: 0 }), createTask({ id: 'a', parentId: 'summary', durationHours: 8, start: monday }), createTask({ id: 'b', parentId: 'summary', durationHours: 8 })
  ], dependencies: [createDependency({ predecessorId: 'a', successorId: 'b', type: 'FS' })] });
  const summary = result.tasks.find((task) => task.id === 'summary');
  assert.equal(iso(summary.start), iso(result.tasks.find((task) => task.id === 'a').start));
  assert.equal(iso(summary.finish), iso(result.tasks.find((task) => task.id === 'b').finish));
});
