export const DEPENDENCY_TYPES = Object.freeze(['FS', 'SS', 'FF', 'SF']);
export const CONSTRAINT_TYPES = Object.freeze(['ASAP', 'ALAP', 'SNET', 'SNLT', 'FNET', 'FNLT', 'MSO', 'MFO']);

const isDateLike = (value) => value instanceof Date || typeof value === 'string' || typeof value === 'number';

export function toDate(value, label = 'date') {
  if (!isDateLike(value)) throw new TypeError(`${label} must be a Date, ISO string, or timestamp`);
  const result = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  if (Number.isNaN(result.getTime())) throw new RangeError(`${label} is not a valid timestamp`);
  return result;
}

export function freeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const child of Object.values(value)) freeze(child);
  return value;
}

export function createTask(input) {
  if (!input?.id) throw new TypeError('task.id is required');
  const durationHours = Number(input.durationHours ?? 0);
  if (!Number.isFinite(durationHours) || durationHours < 0) throw new RangeError(`task ${input.id} durationHours must be >= 0`);
  const task = {
    id: String(input.id),
    name: String(input.name ?? input.id),
    parentId: input.parentId == null ? null : String(input.parentId),
    calendarId: input.calendarId == null ? 'project' : String(input.calendarId),
    durationHours,
    start: input.start == null ? null : toDate(input.start, `task ${input.id} start`),
    finish: input.finish == null ? null : toDate(input.finish, `task ${input.id} finish`),
    constraint: input.constraint?.type ? {
      type: String(input.constraint.type).toUpperCase(),
      date: input.constraint.date == null ? null : toDate(input.constraint.date, `task ${input.id} constraint date`)
    } : { type: 'ASAP', date: null },
    priority: Number.isFinite(Number(input.priority)) ? Number(input.priority) : 500,
    type: input.type ?? 'task'
  };
  if (!CONSTRAINT_TYPES.includes(task.constraint.type)) throw new RangeError(`unsupported constraint ${task.constraint.type}`);
  return freeze(task);
}

export function createDependency(input) {
  if (!input?.predecessorId || !input?.successorId) throw new TypeError('dependency endpoints are required');
  const type = String(input.type ?? 'FS').toUpperCase();
  if (!DEPENDENCY_TYPES.includes(type)) throw new RangeError(`unsupported dependency type ${type}`);
  const lagHours = Number(input.lagHours ?? (Number(input.lagDays ?? 0) * 8));
  if (!Number.isFinite(lagHours)) throw new RangeError('dependency lagHours must be finite');
  return freeze({
    id: String(input.id ?? `${input.predecessorId}->${input.successorId}:${type}:${lagHours}`),
    predecessorId: String(input.predecessorId),
    successorId: String(input.successorId),
    type,
    lagHours
  });
}

export function detectCycles(tasks, dependencies) {
  const ids = new Set(tasks.map((task) => task.id));
  const outgoing = new Map([...ids].map((id) => [id, []]));
  for (const dependency of dependencies) {
    if (!ids.has(dependency.predecessorId) || !ids.has(dependency.successorId)) continue;
    outgoing.get(dependency.predecessorId).push(dependency.successorId);
  }
  const state = new Map();
  const stack = [];
  const visit = (id) => {
    if (state.get(id) === 1) return [...stack.slice(stack.indexOf(id)), id];
    if (state.get(id) === 2) return null;
    state.set(id, 1); stack.push(id);
    for (const next of outgoing.get(id)) { const cycle = visit(next); if (cycle) return cycle; }
    stack.pop(); state.set(id, 2); return null;
  };
  for (const id of [...ids].sort()) { const cycle = visit(id); if (cycle) return cycle; }
  return null;
}

export function topologicalOrder(tasks, dependencies) {
  const ids = tasks.map((task) => task.id);
  const indegree = new Map(ids.map((id) => [id, 0]));
  const outgoing = new Map(ids.map((id) => [id, []]));
  for (const dependency of dependencies) {
    if (!indegree.has(dependency.predecessorId) || !indegree.has(dependency.successorId)) continue;
    outgoing.get(dependency.predecessorId).push(dependency.successorId);
    indegree.set(dependency.successorId, indegree.get(dependency.successorId) + 1);
  }
  const ready = ids.filter((id) => indegree.get(id) === 0).sort();
  const result = [];
  while (ready.length) {
    const id = ready.shift(); result.push(id);
    for (const next of outgoing.get(id).sort()) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) { ready.push(next); ready.sort(); }
    }
  }
  if (result.length !== ids.length) throw new Error('dependency graph contains a cycle');
  return result;
}
