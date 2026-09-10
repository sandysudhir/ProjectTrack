import { createDependency, createTask, detectCycles, freeze, topologicalOrder } from '../domain/index.mjs';
import { createCalendar, createCalendarEngine } from '../calendar-engine/index.mjs';

const HOUR = 60 * 60 * 1000;
const maxDate = (a, b) => (a > b ? a : b);
const minDate = (a, b) => (a < b ? a : b);
const cloneDate = (date) => new Date(date.getTime());

export function scheduleProject(input = {}) {
  const tasks = (input.tasks ?? []).map((task) => task.id && task.durationHours !== undefined ? task : createTask(task));
  const dependencies = (input.dependencies ?? []).map((dependency) => dependency.type ? dependency : createDependency(dependency));
  const taskIds = new Set(tasks.map((task) => task.id));
  const missingEndpoint = dependencies.find((dependency) => !taskIds.has(dependency.predecessorId) || !taskIds.has(dependency.successorId));
  if (missingEndpoint) return freeze({ status: 'conflict', tasks: [], dependencies, conflicts: [{ code: 'MISSING_ENDPOINT', message: `Dependency ${missingEndpoint.id} references a missing task` }] });
  const cycle = detectCycles(tasks, dependencies);
  if (cycle) return freeze({ status: 'conflict', tasks: [], dependencies, conflicts: [{ code: 'CYCLE', message: `Dependency cycle rejected: ${cycle.join(' → ')}`, cycle }] });
  const order = topologicalOrder(tasks, dependencies);
  const taskById = new Map(tasks.map((task) => [task.id, task]));
  const calendars = (input.calendars ?? [createCalendar()]).map((calendar) => calendar.weekly ? calendar : createCalendar(calendar));
  const projectCalendar = input.projectCalendarId ?? calendars[0]?.id ?? 'project';
  if (!calendars.some((calendar) => calendar.id === projectCalendar)) calendars.push(createCalendar({ id: projectCalendar }));
  const calendar = createCalendarEngine(calendars);
  const projectStart = calendar.nextWorkingInstant(input.projectStart ?? '2026-09-01T09:00:00', projectCalendar);
  const projectFinish = input.projectFinish ? new Date(input.projectFinish) : null;
  const predecessors = new Map(tasks.map((task) => [task.id, []]));
  const successors = new Map(tasks.map((task) => [task.id, []]));
  for (const dependency of dependencies) { if (predecessors.has(dependency.successorId) && taskById.has(dependency.predecessorId)) { predecessors.get(dependency.successorId).push(dependency); successors.get(dependency.predecessorId).push(dependency); } }
  const scheduled = new Map(); const conflicts = [];

  const addLag = (date, hours, task) => hours >= 0 ? calendar.addWorkingHours(date, hours, task.calendarId) : calendar.subtractWorkingHours(date, -hours, task.calendarId);
  const startFromFinish = (finish, task) => task.durationHours === 0 ? calendar.nextWorkingInstant(finish, task.calendarId) : calendar.subtractWorkingHours(finish, task.durationHours, task.calendarId);
  const finishFromStart = (start, task) => task.durationHours === 0 ? cloneDate(start) : calendar.addWorkingHours(start, task.durationHours, task.calendarId);
  const dependencyBound = (task, dependency) => {
    const predecessor = scheduled.get(dependency.predecessorId); const lagged = (anchor) => addLag(anchor, dependency.lagHours, task);
    if (!predecessor) return { start: null, finish: null };
    if (dependency.type === 'FS') return { start: lagged(predecessor.finish), finish: null };
    if (dependency.type === 'SS') return { start: lagged(predecessor.start), finish: null };
    if (dependency.type === 'FF') return { start: null, finish: lagged(predecessor.finish) };
    return { start: null, finish: lagged(predecessor.start) };
  };

  for (const id of order) {
    const task = taskById.get(id); const bounds = predecessors.get(id).map((dependency) => dependencyBound(task, dependency));
    let earliestStart = task.start ? calendar.nextWorkingInstant(task.start, task.calendarId) : projectStart;
    let earliestFinish = finishFromStart(earliestStart, task);
    for (const bound of bounds) {
      if (bound.start) earliestStart = maxDate(earliestStart, bound.start);
      if (bound.finish) earliestFinish = maxDate(earliestFinish, bound.finish);
    }
    if (bounds.some((bound) => bound.finish)) earliestStart = maxDate(earliestStart, startFromFinish(earliestFinish, task));
    const constraint = task.constraint ?? { type: 'ASAP' };
    const constraintDate = constraint.date ? new Date(constraint.date) : null;
    if (constraint.type === 'SNET' && constraintDate) earliestStart = maxDate(earliestStart, calendar.nextWorkingInstant(constraintDate, task.calendarId));
    let requiredFinish = constraint.type === 'FNET' && constraintDate ? maxDate(earliestFinish, constraintDate) : earliestFinish;
    earliestFinish = requiredFinish;
    if (constraint.type === 'MSO' && constraintDate) {
      const fixed = calendar.nextWorkingInstant(constraintDate, task.calendarId);
      if (earliestStart.getTime() !== fixed.getTime()) { if (earliestStart > fixed) conflicts.push({ code: 'MSO_CONFLICT', taskId: id, message: `${task.name} cannot start on ${fixed.toISOString()} because a dependency requires a later start` }); else earliestStart = fixed; }
    }
    if (constraint.type === 'MFO' && constraintDate) {
      const fixedFinish = calendar.nextWorkingInstant(constraintDate, task.calendarId);
      const fixedStart = startFromFinish(fixedFinish, task);
      if (earliestFinish > fixedFinish) conflicts.push({ code: 'MFO_CONFLICT', taskId: id, message: `${task.name} cannot finish on ${fixedFinish.toISOString()} because a dependency requires a later finish` });
      else { earliestFinish = fixedFinish; earliestStart = fixedStart; }
    }
    if (constraint.type === 'SNLT' && constraintDate && earliestStart > constraintDate) conflicts.push({ code: 'SNLT_CONFLICT', taskId: id, message: `${task.name} starts after its Start No Later Than constraint` });
    if (constraint.type === 'FNLT' && constraintDate && earliestFinish > constraintDate) conflicts.push({ code: 'FNLT_CONFLICT', taskId: id, message: `${task.name} finishes after its Finish No Later Than constraint` });
    if (constraint.type === 'ALAP' && projectFinish && predecessors.get(id).length === 0) { earliestFinish = calendar.previousWorkingInstant(projectFinish, task.calendarId); earliestStart = startFromFinish(earliestFinish, task); }
    earliestStart = calendar.nextWorkingInstant(earliestStart, task.calendarId);
    earliestFinish = finishFromStart(earliestStart, task);
    requiredFinish = bounds.reduce((date, bound) => bound.finish ? maxDate(date, bound.finish) : date, requiredFinish);
    if (requiredFinish > earliestFinish) { earliestFinish = requiredFinish; earliestStart = startFromFinish(earliestFinish, task); }
    scheduled.set(id, { ...task, start: earliestStart, finish: earliestFinish, durationHours: task.durationHours });
  }

  const summaryTasks = tasks.filter((task) => task.type === 'summary' || tasks.some((child) => child.parentId === task.id));
  const isDescendant = (candidateId, ancestorId) => {
    let cursor = taskById.get(candidateId);
    for (let guard = 0; cursor?.parentId && guard < tasks.length; guard += 1) { if (cursor.parentId === ancestorId) return true; cursor = taskById.get(cursor.parentId); }
    return false;
  };
  for (const summary of [...summaryTasks].sort((a, b) => b.id.length - a.id.length)) {
    const descendants = [...scheduled.values()].filter((task) => task.id !== summary.id && isDescendant(task.id, summary.id));
    if (!descendants.length) continue;
    const start = descendants.reduce((date, task) => minDate(date, task.start), descendants[0].start);
    const finish = descendants.reduce((date, task) => maxDate(date, task.finish), descendants[0].finish);
    scheduled.set(summary.id, { ...scheduled.get(summary.id), start, finish, durationHours: calendar.workingHoursBetween(start, finish, summary.calendarId) });
  }

  const projectEnd = projectFinish ?? [...scheduled.values()].reduce((date, task) => maxDate(date, task.finish), projectStart);
  const latestFinish = new Map(); const latestStart = new Map();
  for (const id of [...order].reverse()) {
    const task = taskById.get(id); let lf = projectEnd;
    for (const dependency of successors.get(id)) {
      const successor = scheduled.get(dependency.successorId); if (!successor) continue;
      const successorLs = latestStart.get(dependency.successorId) ?? successor.start; const successorLf = latestFinish.get(dependency.successorId) ?? successor.finish;
      if (dependency.type === 'FS') lf = minDate(lf, calendar.subtractWorkingHours(successorLs, dependency.lagHours, task.calendarId));
      if (dependency.type === 'SS') lf = minDate(lf, calendar.addWorkingHours(calendar.subtractWorkingHours(successorLs, dependency.lagHours, task.calendarId), task.durationHours, task.calendarId));
      if (dependency.type === 'FF') lf = minDate(lf, calendar.subtractWorkingHours(successorLf, dependency.lagHours, task.calendarId));
      if (dependency.type === 'SF') lf = minDate(lf, calendar.addWorkingHours(calendar.subtractWorkingHours(successorLf, dependency.lagHours, task.calendarId), task.durationHours, task.calendarId));
    }
    latestFinish.set(id, lf); latestStart.set(id, startFromFinish(lf, task));
  }
  const resultTasks = [...scheduled.values()].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id)).map((task) => {
    const ls = latestStart.get(task.id) ?? task.start; const floatHours = Math.max(0, (ls.getTime() - task.start.getTime()) / HOUR); return freeze({ ...task, latestStart: ls, latestFinish: latestFinish.get(task.id) ?? task.finish, totalFloatHours: floatHours, critical: floatHours < 1e-6 });
  });
  return freeze({ status: conflicts.length ? 'conflict' : 'scheduled', projectStart, projectFinish: projectEnd, tasks: resultTasks, dependencies, conflicts, order });
}
