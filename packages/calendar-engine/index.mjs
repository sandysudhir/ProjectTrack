import { freeze, toDate } from '../domain/index.mjs';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
// Calendar arithmetic is deliberately UTC based. Persisted timestamps carry their
// timezone/offset, while the project calendar itself stays deterministic across hosts.
const isoDay = (date) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())).toISOString().slice(0, 10);
const dayOfWeek = (date) => date.getUTCDay();
const asMinutes = (value) => {
  if (typeof value === 'number') return value;
  const [hours, minutes = '0'] = String(value).split(':').map(Number);
  return hours * 60 + minutes;
};
const shiftsForDay = (shifts) => (shifts ?? []).map(([start, finish]) => [asMinutes(start), asMinutes(finish)]).filter(([start, finish]) => finish > start).sort((a, b) => a[0] - b[0]);

export function createCalendar(input = {}) {
  const weekly = input.weekly ?? {
    0: [], 1: [['09:00', '12:00'], ['13:00', '17:00']], 2: [['09:00', '12:00'], ['13:00', '17:00']],
    3: [['09:00', '12:00'], ['13:00', '17:00']], 4: [['09:00', '12:00'], ['13:00', '17:00']],
    5: [['09:00', '12:00'], ['13:00', '17:00']], 6: []
  };
  const exceptions = Object.fromEntries(Object.entries(input.exceptions ?? {}).map(([day, value]) => [day, value === null ? null : shiftsForDay(value)]));
  return freeze({ id: String(input.id ?? 'project'), name: String(input.name ?? input.id ?? 'Project Calendar'), baseCalendarId: input.baseCalendarId ?? null, weekly: Object.fromEntries(Object.entries(weekly).map(([day, shifts]) => [day, shiftsForDay(shifts)])), exceptions });
}

export function createCalendarEngine(calendars = [createCalendar()]) {
  const registry = new Map(calendars.map((calendar) => [calendar.id, calendar]));
  const resolve = (calendarOrId = 'project') => {
    const calendar = typeof calendarOrId === 'string' ? registry.get(calendarOrId) : calendarOrId;
    if (!calendar) throw new Error(`calendar ${calendarOrId} not found`);
    const parent = calendar.baseCalendarId ? resolve(calendar.baseCalendarId) : null;
    return {
      id: calendar.id,
      shifts(date) {
        const key = isoDay(date);
        if (Object.prototype.hasOwnProperty.call(calendar.exceptions, key)) return calendar.exceptions[key] ?? [];
        if (parent) return calendar.weekly[dayOfWeek(date)]?.length ? calendar.weekly[dayOfWeek(date)] : parent.shifts(date);
        return calendar.weekly[dayOfWeek(date)] ?? [];
      }
    };
  };

  const firstInstant = (date, calendar) => {
    let cursor = new Date(date.getTime());
    for (let guard = 0; guard < 3700; guard += 1) {
      const shifts = calendar.shifts(cursor);
      const startOfDay = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate()));
      const minute = (cursor.getTime() - startOfDay.getTime()) / 60000;
      for (const [start, finish] of shifts) {
        if (minute < finish) return new Date(startOfDay.getTime() + Math.max(minute, start) * 60000);
      }
      cursor = new Date(startOfDay.getTime() + DAY);
    }
    throw new Error('calendar search exceeded 10 years');
  };

  const lastInstant = (date, calendar) => {
    let cursor = new Date(date.getTime());
    for (let guard = 0; guard < 3700; guard += 1) {
      const shifts = calendar.shifts(cursor);
      const startOfDay = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate()));
      const minute = (cursor.getTime() - startOfDay.getTime()) / 60000;
      for (let index = shifts.length - 1; index >= 0; index -= 1) {
        const [start, finish] = shifts[index];
        if (minute >= start) return new Date(startOfDay.getTime() + Math.min(minute, finish) * 60000);
      }
      cursor = new Date(startOfDay.getTime() - 1);
    }
    throw new Error('calendar search exceeded 10 years');
  };

  function addWorkingHours(start, hours, calendarOrId = 'project') {
    const calendar = resolve(calendarOrId); let cursor = firstInstant(toDate(start), calendar); let remaining = Number(hours);
    if (!Number.isFinite(remaining) || remaining < 0) throw new RangeError('working hours must be >= 0');
    if (remaining === 0) return cursor;
    for (let guard = 0; guard < 100000 && remaining > 1e-9; guard += 1) {
      const dayStart = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate()));
      const minute = (cursor.getTime() - dayStart.getTime()) / 60000;
      const shift = calendar.shifts(cursor).find(([startMinute, finishMinute]) => minute >= startMinute && minute < finishMinute);
      if (!shift) { cursor = firstInstant(new Date(dayStart.getTime() + DAY), calendar); continue; }
      const available = (shift[1] - minute) / 60;
      if (remaining <= available) return new Date(cursor.getTime() + remaining * HOUR);
      remaining -= available;
      const nextShift = calendar.shifts(cursor).find(([startMinute]) => startMinute > shift[1]);
      cursor = nextShift ? new Date(dayStart.getTime() + nextShift[0] * 60000) : firstInstant(new Date(dayStart.getTime() + DAY), calendar);
    }
    throw new Error('calendar addition exceeded search limit');
  }

  function subtractWorkingHours(finish, hours, calendarOrId = 'project') {
    const calendar = resolve(calendarOrId); let cursor = lastInstant(toDate(finish), calendar); let remaining = Number(hours);
    if (!Number.isFinite(remaining) || remaining < 0) throw new RangeError('working hours must be >= 0');
    if (remaining === 0) return cursor;
    for (let guard = 0; guard < 100000 && remaining > 1e-9; guard += 1) {
      const dayStart = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate()));
      const minute = (cursor.getTime() - dayStart.getTime()) / 60000;
      const shifts = calendar.shifts(cursor);
      const shift = [...shifts].reverse().find(([startMinute, finishMinute]) => minute > startMinute && minute <= finishMinute);
      if (!shift) { cursor = lastInstant(new Date(dayStart.getTime() - 1), calendar); continue; }
      const available = (minute - shift[0]) / 60;
      if (remaining <= available) return new Date(cursor.getTime() - remaining * HOUR);
      remaining -= available;
      const previousShift = [...shifts].reverse().find(([, finishMinute]) => finishMinute < shift[0]);
      cursor = previousShift ? new Date(dayStart.getTime() + previousShift[1] * 60000) : lastInstant(new Date(dayStart.getTime() - 1), calendar);
    }
    throw new Error('calendar subtraction exceeded search limit');
  }

  function workingHoursBetween(start, finish, calendarOrId = 'project') {
    const calendar = resolve(calendarOrId); let cursor = firstInstant(toDate(start), calendar); const end = toDate(finish); let total = 0;
    while (cursor < end) {
      const dayStart = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate()));
      const minute = (cursor.getTime() - dayStart.getTime()) / 60000;
      const shift = calendar.shifts(cursor).find(([s, f]) => minute >= s && minute < f);
      if (shift) { const stop = Math.min(end.getTime(), dayStart.getTime() + shift[1] * 60000); total += Math.max(0, (stop - cursor.getTime()) / HOUR); cursor = firstInstant(new Date(stop + 1), calendar); }
      else cursor = firstInstant(new Date(dayStart.getTime() + DAY), calendar);
    }
    return total;
  }

  return Object.freeze({ resolve, isWorking: (date, id) => { const calendar = resolve(id); const instant = toDate(date); const start = new Date(Date.UTC(instant.getUTCFullYear(), instant.getUTCMonth(), instant.getUTCDate())); const minute = (instant - start) / 60000; return calendar.shifts(instant).some(([s, f]) => minute >= s && minute < f); }, nextWorkingInstant: (date, id) => firstInstant(toDate(date), resolve(id)), previousWorkingInstant: (date, id) => lastInstant(toDate(date), resolve(id)), addWorkingHours, subtractWorkingHours, workingHoursBetween });
}
