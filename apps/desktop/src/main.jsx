import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createDependency, createTask } from '../../../packages/domain/index.mjs';
import { scheduleProject } from '../../../packages/scheduler/index.mjs';
import {
  Activity, AlertTriangle, ArrowDownToLine, ArrowUpToLine, BarChart3, Bell,
  CalendarDays, ChevronDown, ChevronRight, CircleHelp, ClipboardList, Clock3,
  Columns3, Database, FileText, FolderKanban, Gauge, Grid3X3, HelpCircle,
  LayoutDashboard, Link2, ListFilter, Menu, MoreHorizontal, PanelLeft,
  Paperclip, MessageCircle, Play, Plus, Redo2, RefreshCw, Search, Settings2, SlidersHorizontal, Scissors,
  Table2, Undo2, Users, X
} from 'lucide-react';
import './styles.css';

const projects = [
  { id: 'all', label: 'All Projects', kind: 'workspace' },
  { id: 'orion', label: 'Orion Program', kind: 'program', status: 'On track' },
  { id: 'atlas', label: 'Atlas Program', kind: 'program', status: 'At risk' },
  { id: 'delta', label: 'Delta Release', kind: 'program', status: 'On track' },
  { id: 'b2c', label: 'On2Cook B2C', kind: 'project', status: 'On track' },
  { id: 'commercial', label: 'On2Cook Commercial', kind: 'project', status: 'On track' },
  { id: 'ai', label: 'On2Cook.AI', kind: 'project', status: 'On track' },
  { id: 'altimeter', label: 'Altimeter', kind: 'project', status: 'At risk' },
  { id: 'flosser', label: 'Water Flosser', kind: 'project', status: 'On track' },
  { id: 'bottle', label: 'Copper Bottle', kind: 'project', status: 'On track' },
  { id: 'feeder', label: 'Dog Feeder', kind: 'project', status: 'On track' },
];

const rows = [
  { id: 1, level: 0, name: 'Orion Program', type: 'summary', start: '01 Sep 26', finish: '30 Sep 26', duration: '22d', status: 'On track', progress: 36, bar: [0, 26], color: 'navy' },
  { id: 2, level: 1, name: 'Feasibility', start: '01 Sep 26', finish: '05 Sep 26', duration: '5d', status: 'Complete', progress: 100, bar: [0, 5], color: 'green' },
  { id: 3, level: 1, name: 'Architecture', start: '07 Sep 26', finish: '14 Sep 26', duration: '6d', status: 'On track', progress: 62, bar: [7, 14], color: 'blue' },
  { id: 4, level: 1, name: 'Development', start: '15 Sep 26', finish: '24 Sep 26', duration: '8d', status: 'At risk', progress: 38, bar: [15, 24], color: 'amber' },
  { id: 5, level: 0, name: 'Atlas Program', type: 'summary', start: '08 Sep 26', finish: '18 Oct 26', duration: '30d', status: 'At risk', progress: 24, bar: [7, 47], color: 'navy' },
  { id: 6, level: 1, name: 'Discovery', start: '08 Sep 26', finish: '17 Sep 26', duration: '8d', status: 'On track', progress: 56, bar: [8, 17], color: 'blue' },
  { id: 7, level: 1, name: 'Build', start: '18 Sep 26', finish: '18 Oct 26', duration: '22d', status: 'At risk', progress: 18, bar: [18, 48], color: 'amber' },
  { id: 8, level: 0, name: 'Delta Release', type: 'summary', start: '12 Sep 26', finish: '26 Sep 26', duration: '11d', status: 'On track', progress: 48, bar: [11, 25], color: 'navy' },
  { id: 9, level: 1, name: 'Release readiness', start: '12 Sep 26', finish: '19 Sep 26', duration: '6d', status: 'On track', progress: 46, bar: [12, 19], color: 'blue' },
  { id: 10, level: 1, name: 'Publish milestone', type: 'milestone', start: '26 Sep 26', finish: '26 Sep 26', duration: '0d', status: 'On track', progress: 0, bar: [25, 25], color: 'gold' },
  { id: 11, level: 0, name: 'Portfolio governance', type: 'summary', start: '03 Sep 26', finish: '30 Sep 26', duration: '20d', status: 'On track', progress: 31, bar: [2, 28], color: 'navy' },
  { id: 12, level: 1, name: 'Risk review', start: '03 Sep 26', finish: '08 Sep 26', duration: '4d', status: 'On track', progress: 72, bar: [2, 7], color: 'blue' },
  { id: 13, level: 1, name: 'Steering checkpoint', start: '09 Sep 26', finish: '09 Sep 26', duration: '0d', status: 'Complete', progress: 100, bar: [8, 8], color: 'gold', type: 'milestone' },
  { id: 14, level: 1, name: 'Change control', start: '10 Sep 26', finish: '18 Sep 26', duration: '7d', status: 'At risk', progress: 25, bar: [9, 17], color: 'amber' },
  { id: 15, level: 1, name: 'Benefits tracking', start: '19 Sep 26', finish: '30 Sep 26', duration: '8d', status: 'On track', progress: 12, bar: [18, 29], color: 'blue' },
  { id: 16, level: 0, name: 'Closeout', type: 'summary', start: '27 Sep 26', finish: '30 Sep 26', duration: '4d', status: 'On track', progress: 0, bar: [26, 29], color: 'navy' },
  { id: 17, level: 1, name: 'Acceptance review', start: '27 Sep 26', finish: '29 Sep 26', duration: '3d', status: 'On track', progress: 0, bar: [26, 28], color: 'green' },
  { id: 18, level: 1, name: 'Handover complete', type: 'milestone', start: '30 Sep 26', finish: '30 Sep 26', duration: '0d', status: 'On track', progress: 0, bar: [29, 29], color: 'gold' },
  { id: 19, level: 0, name: 'On2Cook B2C', type: 'summary', start: '01 Sep 26', finish: '30 Sep 26', duration: '22d', status: 'On track', progress: 42, bar: [0, 29], color: 'navy' },
  { id: 20, level: 1, name: 'Industrial design', type: 'summary', start: '01 Sep 26', finish: '12 Sep 26', duration: '10d', status: 'On track', progress: 65, bar: [0, 11], color: 'navy' },
  { id: 21, level: 2, name: 'Market research', start: '01 Sep 26', finish: '03 Sep 26', duration: '3d', status: 'Complete', progress: 100, bar: [0, 2], color: 'green' },
  { id: 22, level: 2, name: 'Concept development', start: '04 Sep 26', finish: '08 Sep 26', duration: '3d', status: 'On track', progress: 75, bar: [3, 7], color: 'blue' },
  { id: 23, level: 2, name: 'Design freeze', type: 'milestone', start: '12 Sep 26', finish: '12 Sep 26', duration: '0d', status: 'On track', progress: 0, bar: [11, 11], color: 'gold' },
  { id: 24, level: 1, name: 'Electronics', type: 'summary', start: '10 Sep 26', finish: '24 Sep 26', duration: '11d', status: 'At risk', progress: 33, bar: [9, 23], color: 'navy' },
  { id: 25, level: 2, name: 'Architecture', start: '10 Sep 26', finish: '13 Sep 26', duration: '4d', status: 'On track', progress: 56, bar: [9, 12], color: 'blue' },
  { id: 26, level: 2, name: 'Schematic design', start: '14 Sep 26', finish: '18 Sep 26', duration: '5d', status: 'At risk', progress: 18, bar: [13, 17], color: 'amber' },
  { id: 27, level: 2, name: 'PCB prototype', start: '19 Sep 26', finish: '24 Sep 26', duration: '4d', status: 'On track', progress: 0, bar: [18, 23], color: 'blue' },
  { id: 28, level: 1, name: 'Firmware', type: 'summary', start: '15 Sep 26', finish: '29 Sep 26', duration: '11d', status: 'On track', progress: 21, bar: [14, 28], color: 'navy' },
  { id: 29, level: 2, name: 'Requirements', start: '15 Sep 26', finish: '18 Sep 26', duration: '4d', status: 'On track', progress: 32, bar: [14, 17], color: 'blue' },
  { id: 30, level: 2, name: 'Core development', start: '19 Sep 26', finish: '25 Sep 26', duration: '5d', status: 'On track', progress: 8, bar: [18, 24], color: 'blue' },
  { id: 31, level: 2, name: 'Integration', start: '26 Sep 26', finish: '29 Sep 26', duration: '3d', status: 'On track', progress: 0, bar: [25, 28], color: 'green' },
  { id: 32, level: 1, name: 'Testing & certification', type: 'summary', start: '20 Sep 26', finish: '30 Sep 26', duration: '8d', status: 'On track', progress: 0, bar: [19, 29], color: 'navy' },
  { id: 33, level: 2, name: 'Safety testing', start: '20 Sep 26', finish: '24 Sep 26', duration: '4d', status: 'On track', progress: 0, bar: [19, 23], color: 'blue' },
  { id: 34, level: 2, name: 'Final validation', type: 'milestone', start: '30 Sep 26', finish: '30 Sep 26', duration: '0d', status: 'On track', progress: 0, bar: [29, 29], color: 'gold' },
];

const projectRowRanges = { orion: [1, 4], atlas: [5, 7], delta: [8, 10], b2c: [19, 34] };
const generatedProjectRows = projects.slice(5).flatMap((project, index) => {
  const base = 100 + index * 4;
  const colors = ['blue', 'amber', 'green'];
  return [
    { id: base, level: 0, name: project.label, type: 'summary', start: '01 Oct 26', finish: '30 Oct 26', duration: '22d', status: project.status, progress: 18 + index * 7, bar: [0, 29], color: 'navy' },
    { id: base + 1, level: 1, name: 'Discovery and requirements', start: '01 Oct 26', finish: '08 Oct 26', duration: '6d', status: 'On track', progress: 35 + index * 3, bar: [0, 7], color: colors[index % colors.length] },
    { id: base + 2, level: 1, name: 'Build and validation', start: '09 Oct 26', finish: '24 Oct 26', duration: '12d', status: project.status, progress: 12 + index * 4, bar: [8, 23], color: project.status === 'At risk' ? 'amber' : 'blue' },
    { id: base + 3, level: 1, name: 'Release handover', type: 'milestone', start: '30 Oct 26', finish: '30 Oct 26', duration: '0d', status: 'On track', progress: 0, bar: [29, 29], color: 'gold' },
  ];
});
const projectRowsById = Object.fromEntries(Object.entries(projectRowRanges).map(([projectId, [first, last]]) => [projectId, rows.filter((row) => row.id >= first && row.id <= last)]));
projects.slice(5).forEach((project, index) => { projectRowsById[project.id] = generatedProjectRows.filter((row) => row.id >= 100 + index * 4 && row.id < 104 + index * 4); });
const allProjectRows = [projectRowsById.orion, projectRowsById.atlas, projectRowsById.delta, rows.filter((row) => row.id >= 11 && row.id <= 18), projectRowsById.b2c, ...projects.slice(5).map((project) => projectRowsById[project.id])].flat();

const timeline = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];

const navItems = [
  ['Schedule', Table2], ['Resource', Users], ['Calendar', CalendarDays], ['Reports', FileText],
  ['Dashboard', LayoutDashboard], ['My Tasks', ClipboardList], ['Tags', ListFilter], ['Documents', ClipboardList], ['Comments', MessageCircle], ['Attachments', Paperclip], ['Risks', AlertTriangle], ['Issues', CircleHelp]
];

const ribbonGroups = {
  Home: [['Schedule', Table2], ['Calendar', CalendarDays], ['Resource', Users], ['Keyboard shortcuts', HelpCircle], ['Cut', Scissors], ['Copy', ClipboardList], ['Paste', ArrowDownToLine], ['Font', FileText], ['Bold', FileText], ['Italic', FileText], ['Underline', FileText], ['Alignment', Columns3], ['Show Level', ListFilter], ['Arrow', ArrowDownToLine], ['Bar', Plus], ['Link', Link2], ['Unlink', X], ['Revise', RefreshCw], ['Percent', Activity], ['Text Box', FileText], ['Lock Tool', Settings2], ['Bar Styles', SlidersHorizontal], ['Start', Clock3], ['Finish', Clock3], ['Duration', Clock3], ['Find', Search], ['Go To', ArrowUpToLine], ['Select', Grid3X3]],
  Insert: [['Row', Plus], ['Column', Columns3], ['Text Box', FileText], ['Legend', FileText], ['Picture', PanelLeft], ['Pointer', ArrowUpToLine], ['Object', Database], ['Summary Graph', BarChart3], ['Timescale', Clock3], ['Datelines', Clock3], ['Header & Footer', FileText], ['Page Break', FileText]],
  Format: [['Bar Style', SlidersHorizontal], ['Critical Path', Activity], ['Link', Link2], ['Datelines', Clock3], ['Gridlines', Grid3X3], ['Header & Footer', FileText], ['Format Selected', Settings2]],
  View: [['Action Columns', Columns3], ['Summary Bars', BarChart3], ['Datelines', Clock3], ['Links', Link2], ['Critical Paths', Activity], ['Alignment Grid', Grid3X3], ['Percent Work Usage', Activity], ['Work Usage', BarChart3], ['Assignments', ClipboardList], ['Show Level', ListFilter], ['Restore All', RefreshCw]],
  Project: [['Project Information', FolderKanban], ['Activity Information', ClipboardList], ['Resource Information', Users], ['Work Calendars', CalendarDays], ['WBS', ListFilter], ['All Bars Range', ArrowUpToLine], ['Timeline Ranges', Clock3], ['Timeline Units', Clock3], ['Layouts', Grid3X3], ['Sorts', ListFilter], ['Filters', ListFilter], ['Restore All', RefreshCw]],
  Tools: [['Spelling', FileText], ['FastSteps', Gauge], ['Define', ClipboardList], ['Get Updates', ArrowDownToLine], ['Save Baseline', ArrowDownToLine], ['Clear Baseline', X], ['Reset Revised', RefreshCw], ['Reset Actual', RefreshCw], ['Column Map', Columns3], ['Shift Items', ArrowUpToLine], ['Shift Schedule', ArrowUpToLine], ['Bring to Front', ArrowUpToLine], ['Send to Back', ArrowDownToLine], ['Arrange', SlidersHorizontal], ['Autofit', Columns3]],
  Application: [['Options', Settings2], ['On the Web', ArrowUpToLine], ['About', CircleHelp], ['Keyboard Shortcuts', HelpCircle], ['Example Files', FileText], ['Tutorial', CircleHelp], ['Tab Workspace', Grid3X3], ['Status Bar', Activity], ['Themes', SlidersHorizontal], ['Toolbars', Columns3], ['Switch Windows', MoreHorizontal], ['Cascade', Grid3X3], ['Tile Horizontally', Columns3], ['Tile Vertically', Columns3]],
};
const initialParams = new URLSearchParams(window.location.search);
if (initialParams.get('reset') === '1') {
  ['projecttrack-workspace', 'projecttrack-custom-rows', 'projecttrack-revised-bars', 'projecttrack-progress', 'projecttrack-rationales', 'projecttrack-links', 'projecttrack-last-save', 'projecttrack-risks'].forEach((key) => localStorage.removeItem(key));
  window.history.replaceState({}, '', window.location.pathname);
}
const futureCommands = new Set(['Save Baseline','Clear Baseline','Reset Revised','Reset Actual','Column Map','Get Updates','Shift Items','Shift Schedule','Spelling','Cost Report','Resource Cost Report','Critical Path','Critical Paths','Work Usage','Assignments','WBS','Consolidation','Summary Graph','Gridlines','Header & Footer','Format Selected']);
const toolNames = new Set(['Arrow','Bar','Link','Revise','Percent','Text Box']);

const layoutPresets = [
  { name: 'Working Layout', type: 'working', summary: 'Your current working arrangement', columns: 'Saved columns, widths and timeline' },
  { name: 'Main Layout', type: 'main', summary: 'Standard schedule and Gantt view', columns: 'Activity | Start | Finish | Duration | Status' },
  { name: 'Main Layout w-Percent Complete', type: 'progress', summary: 'Schedule with graphical completion', columns: 'Activity | Dates | Duration | Status | % Complete' },
  { name: 'Main Layout - Data Only', type: 'data', summary: 'Dense grid without timeline', columns: 'Activity and scheduling data' },
  { name: 'Basic Layout', type: 'basic', summary: 'Minimal planning columns', columns: 'Activity | Start | Finish' },
  { name: 'Resource Layout', type: 'resource', summary: 'Resource rates and assignments', columns: 'Resource | Units | Rate | Work | Cost' },
  { name: 'Project Layout', type: 'project', summary: 'Project summary and ownership', columns: 'Project | Owner | Start | Finish | Status' },
  { name: 'Time Layout', type: 'time', summary: 'Time and duration analysis', columns: 'Start | Finish | Duration | Work | Calendar' },
  { name: 'WBS Layout', type: 'wbs', summary: 'Hierarchical work breakdown', columns: 'WBS | Level | Activity | Parent' },
  { name: 'Notes Layout', type: 'notes', summary: 'Activity notes and rationale', columns: 'Activity | Notes | Last updated' },
  { name: 'Images Layout', type: 'images', summary: 'Pictures and visual objects', columns: 'Activity | Image | Caption | Placement' },
  { name: 'Hyperlinks Layout', type: 'links', summary: 'Referenced URLs and links', columns: 'Activity | Link | Label | Target' },
  { name: 'Status Layout', type: 'status', summary: 'Health, risk and status signals', columns: 'Activity | Status | Risk | Owner | Updated' },
  { name: 'Tracking Layout', type: 'tracking', summary: 'Scheduled, revised and actual states', columns: 'Scheduled | Revised | Actual | % Complete' },
  { name: 'Tracking Baseline 1 Layout', type: 'baseline', summary: 'Variance against Baseline 1', columns: 'Baseline | Current | Variance | Status' },
  { name: 'Tracking Actuals Layout', type: 'actuals', summary: 'Actual dates and progress', columns: 'Actual start | Actual finish | Actual duration' },
  { name: 'Cost Layout', type: 'cost', summary: 'Personnel hours, rates and materials', columns: 'Hours | Rate | Labor cost | Materials | Total' },
  { name: 'Advanced Layout', type: 'advanced', summary: 'Broad scheduling and tracking view', columns: 'Dates | Constraints | Tracking | Links' },
  { name: 'Advanced Resource Layout', type: 'advanced-resource', summary: 'Capacity, allocation and cost', columns: 'Resource | Capacity | Work | Overtime | Cost' },
  { name: 'All Columns Layout', type: 'all', summary: 'Every available column', columns: 'All fields with horizontal scrolling' },
];

const costRows = [
  { id: 1, stage: 'Industrial design', activity: 'Market research', hours: 24, rate: 75, materials: 1200, spentHours: 22, spentRate: 75, spentMaterials: 1300, note: 'Research samples' },
  { id: 2, stage: 'Industrial design', activity: 'Concept development', hours: 52, rate: 90, materials: 2800, spentHours: 58, spentRate: 90, spentMaterials: 3200, note: 'Prototype mock-ups' },
  { id: 3, stage: 'Electronics', activity: 'Architecture', hours: 36, rate: 110, materials: 4500, spentHours: 28, spentRate: 110, spentMaterials: 3600, note: 'Evaluation boards' },
  { id: 4, stage: 'Electronics', activity: 'Schematic design', hours: 68, rate: 110, materials: 7200, spentHours: 74, spentRate: 110, spentMaterials: 8500, note: 'PCB prototypes' },
  { id: 5, stage: 'Firmware', activity: 'Core development', hours: 84, rate: 105, materials: 1600, spentHours: 70, spentRate: 105, spentMaterials: 1800, note: 'Test fixtures' },
  { id: 6, stage: 'Testing & certification', activity: 'Safety testing', hours: 40, rate: 95, materials: 3800, spentHours: 35, spentRate: 95, spentMaterials: 4100, note: 'Certification lab' },
];

const dialogFields = {
  'Project info': ['Project Calendar', 'Project Start Date', 'Project Start Time', 'Calculated Project Finish Date', 'Calculated Project Finish Time'],
  'Project information': ['Project Calendar', 'Project Start Date', 'Project Start Time', 'Calculated Project Finish Date', 'Calculated Project Finish Time'],
  'Activity info': ['Row tab', 'Bars tab', 'Bar ID', 'Hidden', 'Visual preview', 'Bar Style', 'Duration', 'Fixed Duration', 'Tracking tab', 'Columns tab', 'Links tab', 'Assignments tab', 'Scheduled Start Date', 'Scheduled Start Time', 'Scheduled Finish Date', 'Scheduled Finish Time', 'Scheduled Duration', 'Revised Start Date', 'Revised Start Time', 'Revised Finish Date', 'Revised Finish Time', 'Revised Duration', 'Actual Start Date', 'Actual Start Time', 'Actual Finish Date', 'Actual Finish Time', 'Actual Duration', '% Complete', 'Priority', 'Constraint Type', 'Constraint Date', 'Constraint Time', 'Calendar', 'Ignore Resource Calendars', 'First / Previous / Next / Last'],
  'Resource info': ['Information tab', 'Work Calendar tab', 'Other Columns tab', 'Resource Name', 'Category', 'Per Use Cost', 'Initials', 'Standard Rate', 'Overtime Rate', 'Code', 'Group', 'Full Name', 'Job Title', 'Employee ID', 'Company', 'Department', 'Resource Notes', 'Material Label', 'Business Address', 'Home Address', 'Main / Business / Fax / Home / Mobile phones', 'Email / Email 2', 'Business URL / Home URL', 'IM Address / IM Address 2'],
  'Calendars': ['Calendar selector', 'New', 'Delete', 'Copy Calendar', 'Paste Calendar', 'Base Calendar', 'Month / year', 'Date grid', 'Exceptions table', 'Create Exception', 'Delete Exception', 'Work Shift Details', 'Multiple shifts', 'Typical week daily hours', 'Use base-calendar shifts', 'Copy Day', 'Paste Day', 'Clear Day', 'Legend: Typical / Non Working / Base Calendar Exception / Resource Exception'],
  'Column map': ['Type: All · Calculation · Cost · Date · Duration · Flag · Hyperlink · ID/Code · Image · Number · Text · Time · Work', 'Storage scope: Per Bar · Per Row · Per Project · Per Resource'],
  'Summary graph': ['Summary Units', 'Starts On', 'Left Label', 'Right Label', 'Mirror Labels', 'Insert New Summary', 'Duplicate Summary', 'Delete Summary', 'Data to Summarize', 'Summary Operation', 'Display As', 'Show Labels'],
  'Gridlines': ['Optimize', 'Custom Setting', 'Style', 'Color', 'Size', 'Column horizontal / vertical', 'Timeline horizontal / vertical', 'Gridline Divisions per Timeline Unit'],
  'Header & footer': ['Header / Footer selection', 'Left cell', 'Centre cell', 'Right cell', 'Auto Text', 'Display Options', 'Font', 'Copy All', 'Paste All'],
  'Consolidation': ['File Name list', 'Add', 'Remove', 'Locate', 'Update', 'Update All', 'Common Project Finish Date / separate Project Finish Dates'],
  'Shift items': ['Forward / Backward', 'Quantity', 'Time unit', 'Pictures & Legends', 'Text Boxes', 'Shift', 'Done'],
  'Shift schedule': ['Forward / Backward', 'Quantity', 'Time unit', 'Shift', 'Done'],
  'FastSteps': ['Define', 'Restore Master Schedule', 'Autofit Schedule – Activity Names', 'Milestones', 'Completed Tasks', 'Upcoming Tasks', 'Incomplete Tasks', 'Cost Report', 'Resource Cost Report'],
  'Autofit': ['Autofit Row Height', 'Autofit Column Width', 'Autofit View', 'Autofit Options'],
};



const filterPresets = [
  'Restore All', 'Current Day', 'Current Week', 'Current Month', 'Next Day', 'Next Week',
  'Critical Items', 'Tasks Not Assigned', 'Revised to Finish Early', 'Revised to Finish Late',
  '0 - 99% Complete', '100% Complete', 'Should Be 100% Complete', 'Activities Not As Soon As Possible',
  'Resource 1 - Contractor Management', 'Resource 2 - Project Manager', 'Resource 3 - Contractor Procurement',
  'Resource 4 - Scheduling Consultant', 'Resource 5 - Contractor Accounting',
];

function applyFilter(sourceRows, filterName) {
  if (!filterName || filterName === 'Restore All') return sourceRows;
  const day = (label) => Number(label?.match(/(\\d{2})/)?.[1] || 0);
  return sourceRows.filter((row) => {
    const start = day(row.start); const finish = day(row.finish); const progress = row.progress;
    if (filterName === 'Current Day') return start <= 10 && finish >= 10;
    if (filterName === 'Current Week') return start <= 12 && finish >= 6;
    if (filterName === 'Current Month') return start <= 30 && finish >= 1;
    if (filterName === 'Next Day') return start <= 11 && finish >= 11;
    if (filterName === 'Next Week') return start <= 19 && finish >= 13;
    if (filterName === 'Critical Items') return row.status === 'At risk' || row.type === 'milestone';
    if (filterName === 'Tasks Not Assigned') return row.type !== 'summary' && row.type !== 'milestone' && row.id % 4 === 0;
    if (filterName === 'Revised to Finish Early') return row.id % 5 === 0;
    if (filterName === 'Revised to Finish Late') return row.status === 'At risk' && row.id % 2 === 0;
    if (filterName === '0 - 99% Complete') return progress < 100;
    if (filterName === '100% Complete') return progress === 100;
    if (filterName === 'Should Be 100% Complete') return finish < 10 && progress < 100;
    if (filterName === 'Activities Not As Soon As Possible') return row.type !== 'summary' && row.id % 5 === 0;
    if (filterName.startsWith('Resource ')) return row.type !== 'summary' && row.id % 5 === filterPresets.indexOf(filterName) % 5;
    return true;
  });
}


function FilterMenu({ current, onSelect, onClose }) {
  return <div className="dialog-backdrop filter-backdrop" role="presentation" onClick={onClose}><div className="filter-menu" role="dialog" aria-modal="true" aria-label="Filters" onClick={(event) => event.stopPropagation()}><div className="filter-menu-title"><span>Filters</span><button onClick={onClose} aria-label="Close filters"><X size={14} /></button></div><div className="filter-menu-list">{filterPresets.map((filter) => <button key={filter} className={current === filter || (filter === 'Restore All' && current === 'All Activities') ? 'active' : ''} onClick={() => onSelect(filter)}><span className="filter-check">{current === filter || (filter === 'Restore All' && current === 'All Activities') ? '[x]' : '[ ]'}</span>{filter}</button>)}</div><div className="filter-menu-footer"><span>Current: <strong>{current}</strong></span><button className="ghost-button" onClick={onClose}>Close</button></div></div></div>;
}

function LayoutGallery({ current, onSelect, onClose }) {
  const [preview, setPreview] = useState(current);
  const selected = layoutPresets.find((preset) => preset.name === preview) || layoutPresets[0];
  return <div className="dialog-backdrop" role="presentation" onClick={onClose}><div className="layout-gallery-dialog" role="dialog" aria-modal="true" aria-label="Layouts" onClick={(event) => event.stopPropagation()}>
    <div className="dialog-title"><div><strong>Layouts</strong><small>Saved view presets for columns, timeline and working geometry</small></div><button onClick={onClose} aria-label="Close layouts"><X size={16} /></button></div>
    <div className="layout-gallery-body"><aside className="layout-list"><div className="layout-list-heading">LAYOUT PRESETS <span>{layoutPresets.length}</span></div>{layoutPresets.map((preset) => <button key={preset.name} className={preview === preset.name ? 'active' : ''} onClick={() => setPreview(preset.name)}><span className="layout-check">{preview === preset.name ? '[x]' : '[ ]'}</span><span>{preset.name}</span></button>)}</aside><main className="layout-preview"><span className="eyebrow">VISUAL REFERENCE</span><h2>{selected.name}</h2><p>{selected.summary}</p><div className={`layout-preview-canvas ${selected.type}`}><div className="preview-grid-head"><i /><i /><i /><i /><i /></div><div className="preview-grid-body"><span /><span /><span /><span /></div><div className="preview-bars"><i /><i /><i /><b /></div></div><div className="layout-preview-meta"><div><span>Columns</span><strong>{selected.columns}</strong></div><div><span>Stored view state</span><strong>Widths | row height | timeline | toggles</strong></div></div>{selected.type === 'cost' && <div className="layout-callout"><strong>Cost Layout preview</strong><span>Personnel hours x hourly rate + row material costs = row total, with stage and project roll-ups.</span></div>}</main></div>
    <div className="dialog-actions"><span className="layout-current">Current: <strong>{current}</strong></span><button className="ghost-button" onClick={onClose}>Cancel</button><button className="primary-button" onClick={() => onSelect(preview)}>Apply layout</button></div>
  </div></div>;
}

function OptionsDialog({ onClose }) {
  const tabs = ['General', 'Dates', 'Times', 'Numbers', 'Editing', 'Document', 'AutoSave', 'AutoArchive', 'Update'];
  const [activeTab, setActiveTab] = useState('General');
  const [saved, setSaved] = useState(false);
  const select = (label, values) => <label className="option-control"><span>{label}</span><select>{values.map((value) => <option key={value}>{value}</option>)}</select></label>;
  const check = (text, checked = false) => <label className="check-line"><input type="checkbox" defaultChecked={checked} />{text}</label>;
  const radio = (text, group, checked = false) => <label className="radio-line"><input type="radio" name={group} defaultChecked={checked} />{text}</label>;
  const renderTab = () => {
    if (activeTab === 'General') return <div className="option-section"><h3>Program Start Options</h3><div className="option-columns"><div>{radio('Show Getting Started... Dialog', 'program', true)}{radio('Open Most Recent Schedule', 'program')}{radio('Create New Schedule', 'program')}{radio('Show Open... Dialog', 'program')}{radio('Show Menus Only', 'program')}</div><div>{select('Number of recent files', ['15', '10', '5'])}<button className="subtle-button">Clear All</button><button className="subtle-button">Reset All Warnings</button></div></div>{check('Follow system personalization default app mode', true)}<h3>New Schedule Defaults</h3>{radio('Capture Current', 'defaults')}{radio('Restore to Factory', 'defaults')}{radio('No Change', 'defaults', true)}</div>;
    if (activeTab === 'Dates') return <div className="option-section"><div className="option-columns">{select('Date Format', ['Short', 'Long', 'Custom'])}{select('Date Order', ['mm/dd/yy', 'dd/mm/yy', 'yy-mm-dd'])}{select('Week Starts on', ['Sunday', 'Monday'])}{select('Weekday Placement', ['Before', 'After'])}</div><h3>Display</h3><div className="date-options"><span>Weekday: <b>None</b></span><span>Month: <b>9</b> | Sept | September</span><span>Day: <b>1</b> | 01 | None</span><span>Year: <b>2026</b> | 26 | None</span></div><h3>Separators</h3><div className="separator-preview">Weekday <input /> Month <input defaultValue="/" /> Day <input defaultValue="/" /> Year</div><div className="example-line">Example: 9/1/2026</div></div>;
    if (activeTab === 'Times') return <div className="option-section"><div className="option-columns">{select('Time Format', ['12 Hours', '24 Hours'])}{radio('2:06 AM example', 'time', true)}</div><h3>12 Hours Display</h3>{radio('2 hours', 'hours', true)}{radio('02 hours', 'hours')}{radio('06 minutes', 'minutes', true)}{radio('None for minutes', 'minutes')}</div>;
    if (activeTab === 'Numbers') return <div className="option-section"><h3>Display</h3><div className="option-columns"><label className="option-control"><span>Decimal Point</span><input defaultValue="." /></label><label className="option-control"><span>Thousands Separator</span><input defaultValue="," /></label><label className="option-control"><span>List Separator</span><input defaultValue="," /></label></div><div className="example-line">Example: 1,234,567.89</div></div>;
    if (activeTab === 'Editing') return <div className="option-section"><h3>Row Resizing</h3>{radio('Action Column Only', 'resize', true)}{radio('Data and Action Columns', 'resize')}<h3>Baseline Editing</h3>{check('Allow editing of baseline data') }<h3>Imported Files</h3>{check('Autofit Schedule after Importing XML Files', true)}<h3>Printing</h3>{check('Use Legacy Print Dialog')}</div>;
    if (activeTab === 'Document') return <div className="option-section"><h3>Document Properties</h3>{check('Prompt for document properties on first save')}<h3>Additional Save Options</h3>{radio('Always save Microsoft Project XML (.xml)', 'save')}{radio('Always save the originally opened type', 'save')}{radio('None', 'save', true)}{check('Use stringent writability test for open files', true)}</div>;
    if (activeTab === 'AutoSave') return <div className="option-section"><h3>AutoSave Options</h3>{check('Save all open documents every 120 minutes')}{check('Prompt before saving')}<h3>AutoRecover Options</h3><label className="option-control"><span>Discard AutoRecover files older than</span><input type="number" defaultValue="10" /></label></div>;
    if (activeTab === 'AutoArchive') return <div className="option-section">{check('Enable AutoArchive', true)}<h3>AutoArchive Options</h3>{check('Archive when an enabled document is closed', true)}{check('Archive enabled documents every 1 hour', true)}<label className="option-control"><span>Default AutoArchive location</span><input defaultValue="C:\\Users\\baps\\Documents\\ProjectTrack Archives" /></label></div>;
    return <div className="option-section"><h3>Update Options</h3>{check('Check for updates when ProjectTrack starts', true)}{check('Include preview builds')}<p className="option-help">Updates are shown for review and never installed without user approval.</p></div>;
  };
  return <div className="dialog-backdrop" role="presentation" onClick={onClose}><div className="options-dialog" role="dialog" aria-modal="true" aria-label="ProjectTrack Options" onClick={(event) => event.stopPropagation()}><div className="dialog-title"><div><strong>ProjectTrack Options</strong><small>Application defaults and document behavior</small></div><button onClick={onClose} aria-label="Close options"><X size={16} /></button></div><div className="options-tabs">{tabs.map((tab) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => { setActiveTab(tab); setSaved(false); }}>{tab}</button>)}</div><div className="options-content">{renderTab()}</div><div className="dialog-actions"><span className="layout-current">{saved ? 'Options staged for this workspace' : 'Changes are local until saved'}</span><button className="ghost-button" onClick={onClose}>Cancel</button><button className="primary-button" onClick={() => setSaved(true)}>OK</button></div></div></div>;
}


function StatusLayoutView({ rows, notice }) {
  const statusRows = rows.slice(0, 22);
  return <section className="status-layout-view"><div className="status-layout-heading"><div><span className="eyebrow">STATUS LAYOUT | VISUAL REFERENCE</span><h2>Actuals and schedule status</h2><p>Actual duration, actual dates, completion, usage and status remain visible beside the timeline.</p></div><div className="status-legend"><span><i className="status-dot green" /> Complete</span><span><i className="status-dot amber" /> Behind schedule</span><span><i className="status-dot blue" /> Not started</span></div></div><div className="status-layout-body"><div className="status-grid"><div className="status-grid-head"><span>#</span><span>Activity Name</span><span>Actual Duration (Hours)</span><span>Actual Start Date</span><span>Actual Finish Date</span><span>% Complete</span><span>% Used</span><span>Status</span></div>{statusRows.map((row) => { const plannedDays = parseInt(row.duration, 10) || 0; const actualHours = plannedDays * 8 * (row.progress / 100); return <div className="status-grid-row" key={row.id}><span>{row.id}</span><span className="status-activity">{row.name}</span><span className="actual-hours">{actualHours.toFixed(2)}</span><span>{row.progress ? row.start : ''}</span><span>{row.progress === 100 ? row.finish : ''}</span><span className="status-percent">{row.progress}%</span><span>100%</span><span className={row.status === 'At risk' || row.progress === 0 ? 'behind' : row.status === 'Complete' ? 'done' : ''}>{row.progress === 0 ? 'Not Started - Behind Schedule' : row.status}</span></div>; })}</div><div className="status-timeline"><div className="status-timeline-head">July 2026 <span>August 2026</span><span>September 2026</span><span>October 2026</span></div>{statusRows.map((row) => <div className="status-timeline-row" key={row.id}><div className={`status-bar ${row.color}`} style={{ left: `${(row.bar[0] / 30) * 100}%`, width: `${Math.max(2, ((row.bar[1] - row.bar[0] + 1) / 30) * 100)}%` }} /><span>{row.name}</span></div>)}</div></div><div className="panel-note"><span className="note-icon"><Activity size={14} /></span><div><strong>{notice}</strong><span>Status Layout prototype matches the reference columns; actuals and usage become engine-backed in the tracking phase.</span></div></div></section>;
}

function CostLayoutView({ action, notice }) {
  const [values, setValues] = useState(() => Object.fromEntries(costRows.map((row) => [row.id, {
    plannedHours: row.hours,
    plannedRate: row.rate,
    plannedMaterials: row.materials,
    spentHours: row.spentHours,
    spentRate: row.spentRate,
    spentMaterials: row.spentMaterials,
  }])));
  const update = (id, field, raw) => setValues((current) => ({ ...current, [id]: { ...current[id], [field]: Number(raw) || 0 } }));
  const rowsWithTotals = costRows.map((row) => {
    const current = values[row.id];
    const plannedLabor = current.plannedHours * current.plannedRate;
    const plannedTotal = plannedLabor + current.plannedMaterials;
    const spentLabor = current.spentHours * current.spentRate;
    const spentTotal = spentLabor + current.spentMaterials;
    return { ...row, ...current, plannedLabor, plannedTotal, spentLabor, spentTotal, variance: spentTotal - plannedTotal, used: plannedTotal ? (spentTotal / plannedTotal) * 100 : 0 };
  });
  const stageTotals = rowsWithTotals.reduce((acc, row) => {
    const stage = acc[row.stage] || { planned: 0, spent: 0, variance: 0 };
    stage.planned += row.plannedTotal;
    stage.spent += row.spentTotal;
    stage.variance += row.variance;
    acc[row.stage] = stage;
    return acc;
  }, {});
  const plannedTotal = rowsWithTotals.reduce((sum, row) => sum + row.plannedTotal, 0);
  const spentTotal = rowsWithTotals.reduce((sum, row) => sum + row.spentTotal, 0);
  const variance = spentTotal - plannedTotal;
  const spentPercent = plannedTotal ? (spentTotal / plannedTotal) * 100 : 0;
  const money = (value) => `${value < 0 ? '-$' : '$'}${Math.round(Math.abs(value)).toLocaleString()}`;
  const varianceClass = (value) => value > 0 ? 'variance-over' : value < 0 ? 'variance-under' : '';
  const field = (row, name) => <input type="number" min="0" value={row[name]} onChange={(event) => update(row.id, name, event.target.value)} />;
  return <section className="cost-layout-view">
    <div className="cost-toolbar"><div><span className="eyebrow">COST LAYOUT | PLANNED VS SPENT</span><h2>Personnel and material cost detail</h2><p>Compare the approved plan with actual spend for every activity, stage, and the project.</p></div><div className="cost-toolbar-actions"><button className="ghost-button" onClick={() => action('Add material cost')}>+ Material cost</button><button className="primary-button" onClick={() => action('Cost report')}>Open cost report</button></div></div>
    <div className="cost-summary"><div><span>Cost planned</span><strong>{money(plannedTotal)}</strong><small>Budget baseline</small></div><div><span>Cost spent</span><strong>{money(spentTotal)}</strong><small>Recorded actuals</small></div><div><span>Variance (spent − planned)</span><strong className={varianceClass(variance)}>{variance > 0 ? '+' : ''}{money(variance)}</strong><small>{variance > 0 ? 'Over plan' : variance < 0 ? 'Under plan' : 'On plan'}</small></div><div><span>Cost used</span><strong className={varianceClass(variance)}>{spentPercent.toFixed(1)}%</strong><small>Spent ÷ planned</small></div></div>
    <div className="cost-table-wrap"><table className="cost-table"><thead><tr><th rowSpan="2">Stage</th><th rowSpan="2">Activity</th><th rowSpan="2">Material note</th><th colSpan="5" className="group-planned">Cost planned</th><th colSpan="5" className="group-spent">Cost spent</th><th rowSpan="2">Variance</th><th rowSpan="2">% used</th></tr><tr><th>Hours</th><th>Hourly rate</th><th>Personnel</th><th>Materials</th><th>Total</th><th>Hours</th><th>Hourly rate</th><th>Personnel</th><th>Materials</th><th>Total</th></tr></thead><tbody>{rowsWithTotals.map((row) => <tr key={row.id}><td>{row.stage}</td><td className="cost-activity">{row.activity}</td><td>{row.note}</td><td>{field(row, 'plannedHours')}</td><td><span className="currency-input"><b>$</b>{field(row, 'plannedRate')}</span></td><td>{money(row.plannedLabor)}</td><td><span className="currency-input"><b>$</b>{field(row, 'plannedMaterials')}</span></td><td className="cost-total">{money(row.plannedTotal)}</td><td>{field(row, 'spentHours')}</td><td><span className="currency-input"><b>$</b>{field(row, 'spentRate')}</span></td><td>{money(row.spentLabor)}</td><td><span className="currency-input"><b>$</b>{field(row, 'spentMaterials')}</span></td><td className="cost-total">{money(row.spentTotal)}</td><td className={varianceClass(row.variance)}>{row.variance > 0 ? '+' : ''}{money(row.variance)}</td><td className={varianceClass(row.variance)}>{row.used.toFixed(1)}%</td></tr>)}</tbody><tfoot><tr><td colSpan="13">Total project cost</td><td className={varianceClass(variance)}>{variance > 0 ? '+' : ''}{money(variance)}</td><td className={varianceClass(variance)}>{spentPercent.toFixed(1)}%</td></tr></tfoot></table></div>
    <div className="cost-stage-rollup"><span className="eyebrow">STAGE ROLL-UP</span>{Object.entries(stageTotals).map(([stage, totals]) => <div key={stage}><span>{stage}</span><strong>Planned {money(totals.planned)} · Spent {money(totals.spent)} · <em className={varianceClass(totals.variance)}>{totals.variance > 0 ? '+' : ''}{money(totals.variance)}</em></strong></div>)}</div>
    <div className="panel-note"><span className="note-icon"><BarChart3 size={14} /></span><div><strong>{notice}</strong><span>Cost planned is the budget baseline; cost spent is recorded actuals. Variance, percentage used, row totals, stage totals, and project totals recalculate immediately.</span></div></div>
  </section>;
}

function ShellDialog({ title, fields, onClose }) { const tabs = title.toLowerCase().includes('activity') ? ['Tracking', 'Columns', 'Links', 'Assignments'] : title.toLowerCase().includes('calendar') ? ['Information', 'Work Calendar', 'Exceptions'] : ['Information', 'Work Calendar', 'Other Columns']; return <div className="dialog-backdrop" role="presentation" onClick={onClose}><div className="shell-dialog" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}><div className="dialog-title"><strong>{title}</strong><button onClick={onClose} aria-label="Close dialog"><X size={16} /></button></div><div className="dialog-tabs">{tabs.map((tab, i) => <button key={tab} className={i === 0 ? 'active' : ''}>{tab}</button>)}</div><div className="dialog-content">{fields.map((field, i) => <label key={field}><span>{field}</span>{i === 0 && fields.length > 1 ? <select><option>Presentation fixture value</option><option>Future implementation</option></select> : <input value={i === 1 ? '01 Sep 2026' : ''} readOnly placeholder="Shell field" />}</label>)}</div><div className="dialog-actions"><button className="ghost-button" onClick={onClose}>Cancel</button><button className="primary-button" onClick={onClose}>Close</button></div></div></div>; }

const defaultProjectFiles = [
  { id: 'doc-1', projectId: 'orion', kind: 'document', name: 'Orion requirements.pdf', meta: 'Project brief · 2.4 MB' },
  { id: 'doc-2', projectId: 'orion', kind: 'link', name: 'Architecture reference', meta: 'https://example.com/architecture' },
  { id: 'doc-3', projectId: 'atlas', kind: 'document', name: 'Atlas validation notes.docx', meta: 'Validation · 840 KB' },
];

function MyTasksView({ rows, notice, personalTasks, onAddTask }) {
  const [task, setTask] = useState('');
  const [section, setSection] = useState('All');
  const linked = rows.filter((row) => row.type !== 'summary').slice(0, 14).map((row) => ({ id: `linked-${row.id}`, name: row.name, section: 'Project tasks', project: row.project || 'Project schedule', progress: row.progress, status: row.status }));
  const allTasks = [...linked, ...personalTasks];
  const visible = section === 'All' ? allTasks : allTasks.filter((item) => item.section === section);
  return <section className="my-tasks-view"><div className="my-tasks-toolbar"><div><span className="eyebrow">PERSONAL WORKSPACE</span><h2>My Tasks</h2><p>Project assignments and personal tasks in one place.</p></div><label><span>Add a task</span><input value={task} onChange={(event) => setTask(event.target.value)} placeholder="Write a task…" onKeyDown={(event) => { if (event.key === 'Enter' && task.trim()) { onAddTask(task.trim()); setTask(''); } }} /></label></div><div className="task-tabs">{['All','Project tasks','Personal'].map((tab) => <button key={tab} className={section === tab ? 'active' : ''} onClick={() => setSection(tab)}>{tab} <span>{tab === 'All' ? allTasks.length : allTasks.filter((item) => item.section === tab).length}</span></button>)}</div><div className="task-board"><div className="task-section"><h3>My Tasks <span>{visible.length}</span></h3>{visible.map((item) => <article className="task-card" key={item.id}><button className="task-check" aria-label={`Complete ${item.name}`} onClick={() => onAddTask(item.name + ' · completed')}>○</button><div><strong>{item.name}</strong><span>{item.section}{item.project ? ` · ${item.project}` : ''}</span></div><em className={item.status === 'At risk' ? 'risk-text' : ''}>{item.status || 'Open'}</em></article>)}{visible.length === 0 && <div className="empty-files">No tasks in this tab yet.</div>}</div></div><div className="panel-note"><span className="note-icon"><ClipboardList size={14} /></span><div><strong>{notice}</strong><span>Add tasks with Enter, then classify them under Project tasks or Personal.</span></div></div></section>;
}

function TagsView({ rows, onSelect, notice }) { const tags = ['Planning','Risk','Release','R&D','Testing','Certification','Assembly','Quality','Documentation','Procurement','Prototype','Firmware','ML and AI']; const counts = Object.fromEntries(tags.map((tag) => [tag, rows.filter((row) => (row.tags || [row.status === 'At risk' ? 'Risk' : row.type === 'milestone' ? 'Release' : 'Planning']).includes(tag)).length])); return <section className="tags-view"><div className="placeholder-toolbar"><button className="toolbar-button active"><ListFilter size={15} /> Tags</button><span className="range-label">Classify activities by stage and type</span></div><div className="tag-cloud">{tags.map((tag) => <button key={tag} onClick={() => onSelect(tag)}><span className="tag-swatch" />{tag}<b>{counts[tag]}</b></button>)}</div><div className="panel-note"><span className="note-icon"><ListFilter size={14} /></span><div><strong>{notice}</strong><span>Choose a tag to filter the schedule. New activity types can attach tags automatically or be edited manually.</span></div></div></section>; }

function ProjectFilesView({ projectId, mode, files, onAddFile, onAddComment, notice, globalQuery = '' }) {
  const [comment, setComment] = useState('');
  const [link, setLink] = useState('');
  const [fileQuery, setFileQuery] = useState('');
  const scoped = files.filter((file) => projectId === 'all' || file.projectId === projectId);
  const comments = scoped.filter((file) => file.kind === 'comment');
  const modeFiles = mode === 'Comments' ? comments : mode === 'Attachments' ? scoped.filter((file) => file.kind === 'attachment') : scoped.filter((file) => file.kind === 'document' || file.kind === 'link');
  const search = (fileQuery || globalQuery).trim().toLowerCase();
  const visible = search ? modeFiles.filter((file) => (file.name + ' ' + file.meta).toLowerCase().includes(search)) : modeFiles;
  const heading = mode === 'Comments' ? 'Project comments' : mode === 'Attachments' ? 'Project attachments' : 'Project documents';
  return <section className="placeholder-view project-files-view"><div className="placeholder-toolbar"><button className="toolbar-button active"><ClipboardList size={15} /> {heading}</button><label className="inline-search"><Search size={14} /><input value={fileQuery} onChange={(event) => setFileQuery(event.target.value)} placeholder={`Search ${mode.toLowerCase()}…`} /></label><span className="range-label">{projectId === 'all' ? 'All projects · grouped by project' : projects.find((p) => p.id === projectId)?.label}</span></div><div className="files-grid"><div className="files-list"><div className="files-list-head"><strong>{visible.length} items</strong>{projectId === 'all' && <span>Each item retains its project</span>}</div>{visible.length === 0 && <div className="empty-files">No {mode.toLowerCase()} yet for this project.</div>}{visible.map((file) => <article className="file-card" key={file.id}><div className={`file-icon ${file.kind}`}><FileText size={16} /></div><div>{file.kind === 'link' ? <a className="file-link" href={file.meta} target="_blank" rel="noreferrer">{file.name}</a> : <strong>{file.name}</strong>}<span>{projects.find((p) => p.id === file.projectId)?.label || 'Project'} · {file.meta}</span></div></article>)}</div><div className="files-inspector"><span className="eyebrow">ADD TO {projectId === 'all' ? 'A PROJECT' : projects.find((p) => p.id === projectId)?.label.toUpperCase()}</span>{mode !== 'Comments' && <><label className="file-input"><span>{mode === 'Attachments' ? 'Add attachment' : 'Add document'}</span><input type="file" onChange={(event) => { const selected = event.target.files?.[0]; if (selected) onAddFile({ kind: mode === 'Attachments' ? 'attachment' : 'document', name: selected.name, meta: `${selected.type || 'file'} · ${Math.round(selected.size / 1024)} KB` }); }} /></label><label><span>Add link</span><input value={link} onChange={(event) => setLink(event.target.value)} placeholder="https://…" /></label><button className="primary-button" onClick={() => { if (link.trim()) { onAddFile({ kind: 'link', name: link.trim(), meta: link.trim() }); setLink(''); } }}>Add link</button></>}{mode !== 'Attachments' && <><label><span>Comment</span><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Add a project comment…" /></label><button className="primary-button" onClick={() => { if (comment.trim()) { onAddComment(comment.trim()); setComment(''); } }}>Add comment</button></>}</div></div><div className="panel-note"><span className="note-icon"><ClipboardList size={14} /></span><div><strong>{notice}</strong><span>Documents, links, comments and attachments stay scoped to their project; All Projects groups them without changing ownership.</span></div></div></section>;
}

function NewRowDialog({ projectId, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [project, setProject] = useState(projectId === 'all' ? 'orion' : projectId);
  const [start, setStart] = useState('2026-09-15');
  const [finish, setFinish] = useState('2026-09-19');
  const submit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    const startDay = Number(start.slice(-2)) || 1;
    const finishDay = Math.max(startDay, Number(finish.slice(-2)) || startDay);
    onCreate({ name: name.trim(), projectId: project, start, finish, bar: [startDay - 1, finishDay - 1] });
  };
  return <div className="dialog-backdrop" role="presentation" onClick={onClose}><form className="new-row-dialog" role="dialog" aria-modal="true" aria-label="New activity" onClick={(event) => event.stopPropagation()} onSubmit={submit}>
    <div className="dialog-title"><strong>New activity</strong><button type="button" onClick={onClose} aria-label="Close new activity"><X size={16} /></button></div>
    <p className="dialog-help">Add a real activity to the selected project. It will appear in the shared All Projects view immediately.</p>
    <label><span>Activity name</span><input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Supplier review" /></label>
    <label><span>Project</span><select value={project} onChange={(event) => setProject(event.target.value)}>{projects.slice(1).map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
    <div className="new-row-dates"><label><span>Start</span><input type="date" value={start} onChange={(event) => setStart(event.target.value)} /></label><label><span>Finish</span><input type="date" value={finish} onChange={(event) => setFinish(event.target.value)} /></label></div>
    <div className="dialog-actions"><button type="button" className="ghost-button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Add activity</button></div>
  </form></div>;
}

function ProjectDialog({ onClose, onCreate }) {
  const [name, setName] = useState('');
  return <div className="dialog-backdrop" role="presentation"><div className="new-row-dialog" role="dialog" aria-modal="true" aria-label="Add project"><div className="dialog-title"><strong>Add project</strong><button onClick={onClose} aria-label="Close add project"><X size={16} /></button></div><label><span>Project name</span><input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Phoenix Rollout" /></label><div className="dialog-actions"><button className="ghost-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={!name.trim()} onClick={() => onCreate(name.trim())}>Add project</button></div></div></div>;
}

function App() {
  const [activeProject, setActiveProject] = useState(initialParams.get('project') || 'all');
  const [activeNav, setActiveNav] = useState(initialParams.get('nav') || 'Schedule');
  const [ribbon, setRibbon] = useState(initialParams.get('ribbon') || 'Home');
  const storedWorkspace = useMemo(() => { try { return JSON.parse(localStorage.getItem('projecttrack-workspace') || '{}'); } catch { return {}; } }, []);
  const [layout, setLayout] = useState(storedWorkspace.layout || 'Main Layout');
  const [layoutGallery, setLayoutGallery] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [filterMenu, setFilterMenu] = useState(false);
  const [filterName, setFilterName] = useState(storedWorkspace.filterName || 'All Activities');
  const [tagFilter, setTagFilter] = useState('All Tags');
  const [density, setDensity] = useState(storedWorkspace.density || 'Compact');
  const [zoom, setZoom] = useState(storedWorkspace.zoom || 100);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(initialParams.get('compact') !== '1');
  const [outlineMode, setOutlineMode] = useState(initialParams.get('outline') || (initialParams.get('compact') === '1' ? 'compact' : 'expanded'));
  const [notice, setNotice] = useState('Ready');
  const [leftWidth, setLeftWidth] = useState(42);
  const [mode, setMode] = useState('populated');
  const [dialog, setDialog] = useState(() => { const requested = initialParams.get('dialog'); if (!requested) return null; const key = Object.keys(dialogFields).find((name) => name.toLowerCase() === requested.toLowerCase()) || requested; return { title: requested, fields: dialogFields[key] || ['Presentation fixture value', 'Open behaviour remains tracked in docs/10_OPEN_QUESTIONS.md'] }; });
  const [activeTool, setActiveTool] = useState('Arrow');
  const [lockedTool, setLockedTool] = useState(null);
  const [newRowOpen, setNewRowOpen] = useState(false);
  const [extraProjects, setExtraProjects] = useState([]);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [customRows, setCustomRows] = useState(() => { try { return JSON.parse(localStorage.getItem('projecttrack-custom-rows') || '[]'); } catch { return []; } });
  const [collapsedIds, setCollapsedIds] = useState(() => new Set());
  const [personalTasks, setPersonalTasks] = useState(() => { try { return JSON.parse(localStorage.getItem('projecttrack-personal-tasks') || '[]'); } catch { return []; } });
  const [projectFiles, setProjectFiles] = useState(() => { try { return JSON.parse(localStorage.getItem('projecttrack-files') || JSON.stringify(defaultProjectFiles)); } catch { return defaultProjectFiles; } });

  useEffect(() => { localStorage.setItem('projecttrack-workspace', JSON.stringify({ layout, density, zoom, filterName })); }, [layout, density, zoom, filterName]);
  useEffect(() => { localStorage.setItem('projecttrack-custom-rows', JSON.stringify(customRows)); }, [customRows]);
  useEffect(() => { localStorage.setItem('projecttrack-files', JSON.stringify(projectFiles)); }, [projectFiles]);
  useEffect(() => { localStorage.setItem('projecttrack-personal-tasks', JSON.stringify(personalTasks)); }, [personalTasks]);

  const scopedRows = useMemo(() => {
    const base = activeProject === 'all' ? allProjectRows : (projectRowsById[activeProject] || []);
    return [...base, ...customRows.filter((row) => activeProject === 'all' || row.projectId === activeProject)];
  }, [activeProject, customRows]);
  const filteredRows = useMemo(() => applyFilter(scopedRows.filter((row) => (!query || row.name.toLowerCase().includes(query.toLowerCase())) && (tagFilter === 'All Tags' || (row.tags || [row.status === 'At risk' ? 'Risk' : row.type === 'milestone' ? 'Release' : 'Planning']).includes(tagFilter))), filterName), [query, filterName, tagFilter, scopedRows]);
  const visibleRows = useMemo(() => {
    const scoped = outlineMode === 'compact' ? filteredRows.filter((row) => row.level === 0 || row.type === 'milestone') : outlineMode === 'selective' ? filteredRows.filter((row) => row.level <= 1 || row.type === 'milestone') : filteredRows;
    const output = [];
    let hiddenBelow = null;
    scoped.forEach((row) => {
      if (hiddenBelow !== null && row.level > hiddenBelow) return;
      hiddenBelow = null;
      output.push(row);
      if (row.type === 'summary' && collapsedIds.has(row.id)) hiddenBelow = row.level;
    });
    return output;
  }, [outlineMode, filteredRows, collapsedIds]);
  const showDashboard = activeNav === 'Dashboard';
  const showReports = activeNav === 'Reports';
  const showCalendar = activeNav === 'Calendar';
  const showResource = activeNav === 'Resource';
  const showCost = layout === 'Cost Layout';
  const showStatus = layout === 'Status Layout';
  const showFiles = ['Documents', 'Comments', 'Attachments'].includes(activeNav);
  const showMyTasks = activeNav === 'My Tasks';
  const showTags = activeNav === 'Tags';

  const availableProjects = [...projects, ...extraProjects];
  const addProject = (name) => { const id = `project-${Date.now()}`; setExtraProjects((current) => [...current, { id, label: name, kind: 'project', status: 'On track' }]); setActiveProject(id); setProjectDialogOpen(false); setNotice(`${name} added`); };
  const action = (label) => {
    if (label === 'Add project') { setProjectDialogOpen(true); return; }
    if (label === 'Manage workspace') { setDialog({ title: 'Manage projects', fields: ['Project list', 'Select a project to inspect details'] }); return; }
    if (label === 'Schedule' || label === 'Calendar' || label === 'Resource') { setActiveNav(label); setNotice(`${label} view opened`); return; }
    if (label === 'New row') { setNewRowOpen(true); return; }
    if (label === 'Save') { localStorage.setItem('projecttrack-last-save', new Date().toISOString()); setNotice('Workspace saved locally'); return; }
    if (label === 'Open') { setNotice('Workspace restored from this browser'); return; }
    setNotice(`${label} · shell command ready`); const key = Object.keys(dialogFields).find((name) => label.toLowerCase().includes(name.toLowerCase())); if (key) setDialog({ title: label, fields: dialogFields[key] });
  };
  const createRow = (row) => { const nextId = Math.max(0, ...allProjectRows.map((item) => Number(item.id) || 0), ...customRows.map((item) => Number(item.id) || 0)) + 1; setCustomRows((current) => [...current, { ...row, id: nextId, level: 1, type: 'task', duration: `${Math.max(1, row.bar[1] - row.bar[0] + 1)}d`, status: 'Not started', progress: 0, color: 'blue' }]); setNewRowOpen(false); setNotice(`${row.name} added`); };
  const createBar = ({ projectId, day }) => { const nextId = Math.max(0, ...allProjectRows.map((item) => Number(item.id) || 0), ...customRows.map((item) => Number(item.id) || 0)) + 1; const start = `2026-09-${String(day + 1).padStart(2, '0')}`; const finish = `2026-09-${String(Math.min(30, day + 3)).padStart(2, '0')}`; setCustomRows((current) => [...current, { id: nextId, projectId: projectId === 'all' ? 'orion' : projectId, name: `New activity ${nextId}`, start, finish, bar: [day, Math.min(29, day + 2)], level: 1, type: 'task', duration: '3d', status: 'Not started', progress: 0, color: 'blue' }]); setActiveTool('Arrow'); setNotice(`New activity ${nextId} added`); };
  const toggleCollapse = (row) => { setCollapsedIds((current) => { const next = new Set(current); if (next.has(row.id)) next.delete(row.id); else next.add(row.id); return next; }); setNotice(`${row.name} ${collapsedIds.has(row.id) ? 'expanded' : 'collapsed'}`); };
  const addProjectFile = (file) => { const target = activeProject === 'all' ? 'orion' : activeProject; setProjectFiles((current) => [...current, { ...file, id: `file-${Date.now()}`, projectId: target }]); setNotice(`${file.kind === 'link' ? 'Link' : file.kind === 'document' ? 'Document' : 'Attachment'} added to ${projects.find((p) => p.id === target)?.label}`); };
  const addProjectComment = (comment) => { const target = activeProject === 'all' ? 'orion' : activeProject; setProjectFiles((current) => [...current, { id: `comment-${Date.now()}`, projectId: target, kind: 'comment', name: comment, meta: `Comment · ${new Date().toLocaleDateString()}` }]); setNotice(`Comment added to ${projects.find((p) => p.id === target)?.label}`); };
  const chooseTool = (label) => { if (toolNames.has(label)) { setActiveTool(label); setNotice(`${label} tool selected`); } else if (label === 'Lock Tool') { setLockedTool((current) => { const next = current ? null : activeTool; setNotice(next ? `${next} tool locked for repeated use` : 'Tool lock released'); return next; }); } else if (label === 'Layouts') { setLayoutGallery(true); setNotice('Layouts gallery opened'); } else if (label === 'Filters') { setFilterMenu(true); setNotice('Filters menu opened'); } else if (label === 'Options') { setOptionsOpen(true); setNotice('Options opened'); } else action(label); };
  const toggleExpanded = () => { const next = !expanded; setExpanded(next); setOutlineMode(next ? 'expanded' : 'compact'); setNotice(next ? 'Hierarchy expanded' : 'Hierarchy compacted'); };

  return <div className="app-shell">
    <header className="titlebar">
      <div className="title-left"><div className="quick-access"><button onClick={() => action('New')} title="New"><Plus size={13} /></button><button onClick={() => action('Open')} title="Open"><FolderKanban size={13} /></button><button onClick={() => action('Save')} title="Save"><ClipboardList size={13} /></button><button onClick={() => action('Save As')} title="Save As"><FileText size={13} /></button><button onClick={() => action('Undo')} title="Undo"><Undo2 size={13} /></button><button onClick={() => action('Redo')} title="Redo"><Redo2 size={13} /></button><button onClick={() => action('Print / Print Preview')} title="Print / Print Preview"><FileText size={13} /></button></div><div className="brand"><div className="brand-mark"><span /></div><span>ProjectTrack</span><small>Professional scheduling workspace</small></div></div>
      <div className="title-actions"><button aria-label="Help"><HelpCircle size={16} /></button><button aria-label="Notifications"><Bell size={16} /><i /></button><div className="avatar">SS</div></div>
    </header>

    <nav className="workspace-tabs" aria-label="Project tabs">
      <div className="tabs-left">{availableProjects.map((project) => <button key={project.id} className={`workspace-tab ${activeProject === project.id ? 'active' : ''}`} onClick={() => { setActiveProject(project.id); setNotice(`${project.label} opened`); }}>{project.label}{project.id === 'all' && <span className="tab-count">{projects.length - 1}</span>}</button>)}<button className="add-tab" onClick={() => action('New project tab')}><Plus size={15} /></button></div>
      <div className="workspace-tools"><button className="layout-picker" onClick={() => setLayoutGallery(true)}><Grid3X3 size={13} /><span>Layout</span><strong>{layout}</strong><ChevronDown size={13} /></button><div className="search-box"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search workspace" /><kbd>Ctrl K</kbd>{query && <button onClick={() => setQuery('')}><X size={13} /></button>}</div></div>
    </nav>

    <div className="ribbon-tabs">{Object.keys(ribbonGroups).map((name) => <button key={name} className={ribbon === name ? 'active' : ''} onClick={() => setRibbon(name)}>{name}</button>)}<div className="ribbon-spacer" /><button className="mode-button" onClick={() => setMode(mode === 'populated' ? 'loading' : 'populated')}><span className={`state-dot ${mode}`} /> {mode === 'loading' ? 'Loading preview' : 'Workspace ready'}</button></div>
    <section className="ribbon" aria-label={`${ribbon} commands`}><div className="ribbon-inner">{ribbonGroups[ribbon].map(([label, Icon]) => { const disabled = futureCommands.has(label); const isTool = toolNames.has(label); const isLock = label === 'Lock Tool'; return <button key={label} className={`ribbon-command ${disabled ? 'future-command' : ''} ${isTool && activeTool === label ? 'tool-active' : ''} ${isLock && lockedTool ? 'tool-locked' : ''}`} disabled={disabled} title={disabled ? 'Available after UI-03 / G-ENG-02' : isLock && lockedTool ? `${lockedTool} locked for repeated use` : label} onClick={() => chooseTool(label)}><span className="command-icon"><Icon size={19} /></span><span>{isLock && lockedTool ? `Unlock ${lockedTool}` : label}</span></button>; })}<div className="ribbon-divider" /><button className="ribbon-command" onClick={toggleExpanded}><span className="command-icon"><ChevronRight size={19} className={expanded ? 'rotate-90' : ''} /></span><span>{expanded ? 'Collapse' : 'Expand'}</span></button><button className="ribbon-command" onClick={() => action('Autofit')}><span className="command-icon"><SlidersHorizontal size={19} /></span><span>Autofit</span></button></div><div className="ribbon-caption">{ribbon} commands</div></section>

    <div className="work-area">
      <aside className="sidebar">
        <div className="sidebar-heading"><span>PROJECT</span><button onClick={() => action('Project selector')}><MoreHorizontal size={15} /></button></div>
        <button className="project-selector"><FolderKanban size={15} /><span>{activeProject === 'all' ? 'All Projects' : projects.find((p) => p.id === activeProject)?.label}</span><ChevronDown size={14} /></button>
        <div className="nav-list">{navItems.map(([label, Icon]) => <button key={label} className={activeNav === label ? 'active' : ''} onClick={() => { setActiveNav(label); setNotice(`${label} view selected`); }}><Icon size={16} /><span>{label}</span>{label === activeNav && <span className="nav-accent" />}</button>)}</div>
        <div className="sidebar-divider" />
        <div className="sidebar-heading"><span>ALL PROJECTS</span><button onClick={() => action('Project tree menu')}><MoreHorizontal size={15} /></button></div>
        <div className="tree-search"><Search size={14} /><input placeholder="Filter projects" /></div>
        <div className="project-tree"><div className="tree-node root"><ChevronDown size={14} /><FolderKanban size={15} /><span>All Projects</span></div>{projects.slice(1).map((p) => <div className="tree-node" key={p.id}><ChevronRight size={14} /><FolderKanban size={15} /><span>{p.label}</span><span className={`mini-status ${p.status === 'At risk' ? 'risk' : ''}`} /></div>)}</div>
        <div className="sidebar-footer"><button onClick={() => action('Add project')}><Plus size={14} /> Add project</button><button onClick={() => action('Manage workspace')}><Settings2 size={14} /> Manage</button></div>
      </aside>

      <main className="main-content">
        <div className="view-header"><div><div className="breadcrumb">{activeProject === 'all' ? 'ALL PROJECTS' : projects.find((p) => p.id === activeProject)?.label.toUpperCase()} <ChevronRight size={13} /> {activeNav.toUpperCase()}</div><h1>{showMyTasks || showFiles || showDashboard || showReports ? activeNav : showCalendar ? 'Calendar' : showResource ? 'Resource planning' : 'Schedule'}</h1><p>{showMyTasks ? 'Personal and project tasks in one workspace.' : showFiles ? 'Project-scoped documents, links, comments and attachments.' : showDashboard ? 'Portfolio completion, schedule health and project momentum.' : showReports ? 'Visual status of delivery, completion and attention items.' : showCalendar ? 'Wall calendar projection across shared project weeks.' : showResource ? 'Resource load and assignment structure across the workspace.' : 'Plan, inspect and coordinate work across your project portfolio.'}</p></div><div className="view-actions"><button className="ghost-button" onClick={() => action('Refresh view')}><RefreshCw size={15} /> Refresh</button><button className="primary-button" onClick={() => action('New row')}><Plus size={15} /> New row</button></div></div>
        {mode === 'loading' ? <div className="state-panel"><RefreshCw size={25} className="spin" /><h2>Loading workspace</h2><p>Preparing the deterministic sample fixture…</p></div> : <>
          {showTags ? <TagsView rows={filteredRows} onSelect={(tag) => { setTagFilter(tag); setActiveNav('Schedule'); setNotice(tag + ' tag filter applied'); }} notice={notice} /> : showMyTasks ? <MyTasksView rows={filteredRows} notice={notice} personalTasks={personalTasks} onAddTask={(name) => { setPersonalTasks((current) => [...current, { id: `personal-${Date.now()}`, name, section: 'Personal', status: 'Open' }]); setNotice('Personal task added'); }} /> : showFiles ? <ProjectFilesView projectId={activeProject} mode={activeNav} files={projectFiles} onAddFile={addProjectFile} onAddComment={addProjectComment} notice={notice} globalQuery={query} /> : showCost ? <CostLayoutView notice={notice} action={action} /> : showStatus ? <StatusLayoutView rows={filteredRows} notice={notice} /> : showDashboard ? <DashboardView rows={filteredRows} notice={notice} /> : showReports ? <ReportsView rows={filteredRows} notice={notice} /> : showCalendar ? <CalendarPlaceholder notice={notice} action={action} rows={filteredRows} projectLabel={activeProject === 'all' ? 'All Projects' : projects.find((p) => p.id === activeProject)?.label} /> : showResource ? <ResourcePlaceholder notice={notice} action={action} /> : <ScheduleView rows={visibleRows} leftWidth={leftWidth} setLeftWidth={setLeftWidth} density={density} setDensity={setDensity} zoom={zoom} setZoom={setZoom} outlineMode={outlineMode} setOutlineMode={(next) => { setOutlineMode(next); setExpanded(next !== 'compact'); }} action={action} notice={notice} activeTool={activeTool} onCreateBar={(day) => createBar({ projectId: activeProject, day })} onToggleCollapse={toggleCollapse} collapsedIds={collapsedIds} />}
        </>}
      </main>
    </div>
    {dialog && <ShellDialog title={dialog.title} fields={dialog.fields} onClose={() => setDialog(null)} />}
    {layoutGallery && <LayoutGallery current={layout} onSelect={(next) => { setLayout(next); setLayoutGallery(false); setNotice(`Layout ${next} applied`); }} onClose={() => setLayoutGallery(false)} />}
    {optionsOpen && <OptionsDialog onClose={() => setOptionsOpen(false)} />}
    {filterMenu && <FilterMenu current={filterName} onSelect={(next) => { setFilterName(next === 'Restore All' ? 'All Activities' : next); setFilterMenu(false); setNotice(`${next === 'Restore All' ? 'All activities' : next} filter applied`); }} onClose={() => setFilterMenu(false)} />}
    {projectDialogOpen && <ProjectDialog onClose={() => setProjectDialogOpen(false)} onCreate={addProject} />}\n    {newRowOpen && <NewRowDialog projectId={activeProject} onClose={() => setNewRowOpen(false)} onCreate={createRow} />}
    <footer className="statusbar"><div><span className="status-led" />{notice}</div><div className="status-center">Tool: {activeTool}{lockedTool ? ` · ${lockedTool} locked` : ''} · Filter: {filterName} · {filteredRows.length} rows · {projects.length - 1} projects · Last saved just now</div><div className="status-right"><span>Zoom {zoom}%</span><button onClick={() => setZoom(Math.max(60, zoom - 10))}>−</button><button onClick={() => setZoom(Math.min(160, zoom + 10))}>＋</button><span className="connection"><span className="status-led green" />Local workspace</span></div></footer>
  </div>;
}

function shiftDisplayDate(value, delta) {
  const match = String(value || '').match(/^(\d{2})\s+([A-Za-z]{3})\s+(\d{2,4})$/);
  if (!match) return value;
  const monthIndex = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }[match[2]] ?? 0;
  const date = new Date(Date.UTC(Number(match[3].length === 2 ? `20${match[3]}` : match[3]), monthIndex, Number(match[1])));
  date.setUTCDate(date.getUTCDate() + delta);
  return `${String(date.getUTCDate()).padStart(2, '0')} ${date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })} ${String(date.getUTCFullYear()).slice(-2)}`;
}

function displayRowWithRevision(row, revised) {
  if (!revised) return row;
  const startShift = revised[0] - row.bar[0];
  const finishShift = revised[1] - row.bar[1];
  const start = shiftDisplayDate(row.start, startShift);
  const finish = shiftDisplayDate(row.finish, finishShift);
  const baseDuration = Number.parseInt(row.duration, 10) || Math.max(1, row.bar[1] - row.bar[0] + 1);
  const duration = `${Math.max(1, baseDuration + finishShift - startShift)}d`;
  return { ...row, start, finish, duration };
}

function ScheduleView({ rows, leftWidth, setLeftWidth, density, setDensity, zoom, setZoom, outlineMode, setOutlineMode, action, notice, activeTool, onCreateBar, onToggleCollapse, collapsedIds }) {
  const scale = 0.86 + zoom / 100 * 0.14;
  const timelineRef = useRef(null);
  const scheduleBodyRef = useRef(null);
  const dragRef = useRef(null);
  const [revisedBars, setRevisedBars] = useState(() => { try { return JSON.parse(localStorage.getItem('projecttrack-revised-bars') || '{}'); } catch { return {}; } });
  const [progressOverrides, setProgressOverrides] = useState(() => { try { return JSON.parse(localStorage.getItem('projecttrack-progress') || '{}'); } catch { return {}; } });
  const [rationales, setRationales] = useState(() => { try { return JSON.parse(localStorage.getItem('projecttrack-rationales') || '{}'); } catch { return {}; } });
  const [links, setLinks] = useState(() => { try { return JSON.parse(localStorage.getItem('projecttrack-links') || '[]'); } catch { return []; } });
  const [criticalIds, setCriticalIds] = useState([]);
  const [linkSource, setLinkSource] = useState(null);
  const [reasonFor, setReasonFor] = useState(null);
  const [draftReason, setDraftReason] = useState('');
  const [risks, setRisks] = useState(() => { try { return JSON.parse(localStorage.getItem('projecttrack-risks') || '{}'); } catch { return {}; } });
  const [riskMenu, setRiskMenu] = useState(null);
  const displayRows = rows.map((row) => displayRowWithRevision(row, revisedBars[row.id]));
  useEffect(() => { localStorage.setItem('projecttrack-revised-bars', JSON.stringify(revisedBars)); }, [revisedBars]);
  useEffect(() => { localStorage.setItem('projecttrack-progress', JSON.stringify(progressOverrides)); }, [progressOverrides]);
  useEffect(() => { localStorage.setItem('projecttrack-rationales', JSON.stringify(rationales)); }, [rationales]);
  useEffect(() => { localStorage.setItem('projecttrack-links', JSON.stringify(links)); }, [links]);
  useEffect(() => { localStorage.setItem('projecttrack-risks', JSON.stringify(risks)); }, [risks]);
  const markRisk = (row, severity, points) => { setRisks((current) => ({ ...current, [row.id]: severity === 'none' ? undefined : { severity, points: Number(points) || 0 } })); setRiskMenu(null); action(row.name + ' risk marked ' + severity); };
  const beginResize = (event, row, edge) => {
    if (row.type === 'milestone' || activeTool === 'Link') return;
    event.preventDefault(); event.stopPropagation();
    dragRef.current = { row, edge, mode: 'dates', changed: false };
  };
  const beginProgress = (event, row) => {
    if (row.type === 'milestone' || (activeTool !== 'Percent' && activeTool !== 'Arrow')) return;
    event.preventDefault(); event.stopPropagation();
    dragRef.current = { row, mode: 'progress', changed: false, value: progressOverrides[row.id] ?? row.progress };
  };
  const updateResize = (event) => {
    const drag = dragRef.current;
    if (!drag || !timelineRef.current) return;
    const bounds = timelineRef.current.getBoundingClientRect();
    const dayFloat = Math.max(0, Math.min(29.99, ((event.clientX - bounds.left) / bounds.width) * 30));
    const day = Math.max(0, Math.min(29, Math.round(dayFloat)));
    const current = revisedBars[drag.row.id] || drag.row.bar;
    if (drag.mode === 'progress') {
      const span = Math.max(1, current[1] - current[0] + 1);
      const nextProgress = Math.max(0, Math.min(100, Math.round(((dayFloat - current[0]) / span) * 100)));
      if (nextProgress !== drag.value) { drag.changed = true; drag.value = nextProgress; setProgressOverrides((value) => ({ ...value, [drag.row.id]: nextProgress })); }
      return;
    }
    const next = drag.edge === 'start' ? [Math.min(day, current[1] - 1), current[1]] : [current[0], Math.max(day, current[0] + 1)];
    if (next[0] !== current[0] || next[1] !== current[1]) { drag.changed = true; setRevisedBars((value) => ({ ...value, [drag.row.id]: next })); }
  };
  const finishResize = () => {
    const drag = dragRef.current; dragRef.current = null;
    if (!drag?.changed) return;
    if (drag.mode === 'progress') { action(drag.row.name + ' completion set to ' + drag.value + '%'); return; }
    setReasonFor(drag.row.id); setDraftReason(rationales[drag.row.id] || '');
  };
  const openRationale = (row) => { if (revisedBars[row.id]) { setReasonFor(row.id); setDraftReason(rationales[row.id] || ''); } };
  const saveRationale = () => { setRationales((value) => ({ ...value, [reasonFor]: draftReason || 'Reason to be documented.' })); setReasonFor(null); setDraftReason(''); action('Revision rationale saved'); };
  const solverPreview = (nextLinks) => {
    const solverRows = rows.filter((row) => row.type !== 'summary').map((row) => createTask({ id: String(row.id), name: row.name, durationHours: row.type === 'milestone' ? 0 : Math.max(0, (row.bar[1] - row.bar[0] + 1) * 8), start: '2026-09-' + String(Math.min(30, row.bar[0] + 1)).padStart(2, '0') + 'T09:00:00Z' }));
    const dependencies = nextLinks.map((link) => createDependency({ predecessorId: String(link.from), successorId: String(link.to), type: link.type || 'FS', lagHours: link.lagHours || 0 }));
    return scheduleProject({ projectStart: '2026-09-01T09:00:00Z', tasks: solverRows, dependencies });
  };
  const runScheduler = (nextLinks = links) => {
    const result = solverPreview(nextLinks);
    setCriticalIds(result.tasks.filter((task) => task.critical).map((task) => Number(task.id)));
    action(result.status === 'conflict' ? 'Scheduler found ' + result.conflicts.length + ' conflict(s)' : 'Scheduler recalculated ' + result.tasks.length + ' activities');
  };
  const handleBarClick = (event, row) => {
    if (activeTool !== 'Link' || row.type === 'summary') return;
    event.stopPropagation();
    if (linkSource == null) { setLinkSource(row.id); action('Link source selected: ' + row.name); return; }
    if (linkSource === row.id) { setLinkSource(null); return; }
    const next = [...links, { id: linkSource + '-' + row.id, from: linkSource, to: row.id, type: 'FS', lagHours: 0 }];
    setLinks(next); setLinkSource(null); runScheduler(next);
  };
  const handleTimelineClick = (event) => {
    if (activeTool !== 'Bar' || event.target.closest('.bar')) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const day = Math.max(0, Math.min(29, Math.floor(((event.clientX - bounds.left) / bounds.width) * 30)));
    onCreateBar(day);
  };
  const nudgeScroll = (left, top) => scheduleBodyRef.current?.scrollBy({ left, top, behavior: 'smooth' });
  return <><section className={'schedule-panel density-' + density.toLowerCase()}>
    <div className="panel-toolbar"><div className="toolbar-group"><button className="toolbar-button active"><Table2 size={15} /> Grid + Gantt</button><button className="toolbar-button" onClick={() => action('Show level')}><ListFilter size={15} /> Show level <ChevronDown size={13} /></button><button className={outlineMode === 'compact' ? 'toolbar-button active' : 'toolbar-button'} onClick={() => { setOutlineMode('compact'); action('Projects only'); }}>Projects only</button><button className={outlineMode === 'selective' ? 'toolbar-button active' : 'toolbar-button'} onClick={() => { setOutlineMode('selective'); action('Selective expansion'); }}>Selective expansion</button><button className={outlineMode === 'expanded' ? 'toolbar-button active' : 'toolbar-button'} onClick={() => { setOutlineMode('expanded'); action('Expand everything'); }}>Expand everything</button><button className="toolbar-button scheduler-button" onClick={() => runScheduler()}><Play size={14} /> Run scheduler</button></div><div className="toolbar-group"><span className="bar-legend"><i className="legend-line original" /> Original</span><span className="bar-legend"><i className="legend-line revised" /> Revised</span><span className="bar-legend"><i className="legend-fill" /> Complete</span><span className="bar-legend"><i className="completion-marker" /> Drag marker to edit %</span><label className="density-control">Row height <select value={density} onChange={(e) => setDensity(e.target.value)}><option>Compact</option><option>Comfortable</option><option>Expanded</option></select></label><label className="zoom-control">Timeline <input type="range" min="60" max="160" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} /><span>{zoom}%</span></label></div></div>
    {activeTool === 'Link' && <div className="link-mode-hint"><Link2 size={13} /> Click one bar, then another to create an FS link{linkSource == null ? '.' : ' · Source selected. Choose the successor.'}<span>{links.length} link{links.length === 1 ? '' : 's'}</span></div>}
    <div className="schedule-body" ref={scheduleBodyRef}><div className="grid-pane" style={{ width: leftWidth + '%' }}><div className="grid-header"><span className="row-number">#</span><span className="activity-name">Activity name</span><span>Start</span><span>Finish</span><span>Dur.</span><span>Status</span><span>% Complete</span></div><div className="grid-rows">{displayRows.map((row) => <div className={'grid-row ' + (row.type === 'summary' ? 'summary ' : '') + (row.type === 'milestone' ? 'milestone-row' : '')} key={row.id} onClick={(event) => activeTool === 'Link' && handleBarClick(event, row)}><span className="row-number">{row.id}</span><span className="activity-name" style={{ paddingLeft: 'calc(10px + ' + row.level * 18 + 'px)' }}>{row.type === 'summary' ? <button className="collapse-toggle" aria-label={`${collapsedIds.has(row.id) ? 'Expand' : 'Collapse'} ${row.name}`} onClick={(event) => { event.stopPropagation(); onToggleCollapse(row); }}><ChevronDown size={13} className={collapsedIds.has(row.id) ? 'collapsed' : ''} /></button> : row.type === 'milestone' ? <Gauge size={12} className="milestone-icon" /> : <span className="task-dot" />}<span>{row.name}</span></span><span>{row.start}</span><span>{row.finish}</span><span>{row.duration}</span><span className={'status ' + (row.status === 'At risk' ? 'risk' : row.status === 'Complete' ? 'complete' : '')}>{row.status}</span><span className="completion-cell"><span className="completion-track"><i style={{ width: (progressOverrides[row.id] ?? row.progress) + '%' }} /></span>{progressOverrides[row.id] ?? row.progress}%</span></div>)}</div></div><button className="splitter" aria-label="Resize grid pane" onClick={() => setLeftWidth(leftWidth > 44 ? 34 : 52)}><span /></button><div className="timeline-pane"><div className="timeline-header"><div className="month-label">September 2026</div><div className="timeline-date-stack"><div className="weekday-labels">{timeline.map((day, i) => <span key={'w-' + day}>{['T','W','T','F','S','S','M'][i % 7]}</span>)}</div><div className="day-labels">{timeline.map((day, i) => <span key={day} className={i === 8 ? 'today' : ''}>{day}</span>)}</div></div></div><div className="timeline-grid" ref={timelineRef} onClick={handleTimelineClick} onPointerMove={updateResize} onPointerUp={finishResize} onPointerLeave={finishResize} style={{ '--scale': scale }}><div className="today-line" style={{ left: (8.5 / 30) * 100 + '%' }}><span>Today</span></div>{rows.map((row, index) => { const revised = revisedBars[row.id]; const shown = revised || row.bar; const progress = progressOverrides[row.id] ?? row.progress; const isCritical = criticalIds.includes(Number(row.id)); const isSource = linkSource === row.id; return <div key={row.id} className={'timeline-row ' + (row.type === 'summary' ? 'summary' : '')}><div className={'bar ' + row.color + ' ' + (revised ? 'has-revision ' : '') + (isCritical ? 'critical-bar ' : '') + (isSource ? 'link-source' : '') + (risks[row.id] ? 'risk-' + risks[row.id].severity : '')} style={{ left: (row.bar[0] / 30) * 100 + '%', width: row.type === 'milestone' ? '0' : ((row.bar[1] - row.bar[0] + 1) / 30) * 100 * scale + '%' }} onClick={(event) => handleBarClick(event, row)} onContextMenu={(event) => { event.preventDefault(); setRiskMenu({ row, x: event.clientX, y: event.clientY }); }} onDoubleClick={() => openRationale(row)}>{row.type === 'milestone' ? <span className="diamond" /> : <><button className="resize-handle original-handle start" aria-label={'Adjust ' + row.name + ' start'} onPointerDown={(event) => beginResize(event, row, 'start')} /><button className="resize-handle original-handle end" aria-label={'Adjust ' + row.name + ' finish'} onPointerDown={(event) => beginResize(event, row, 'end')} /><span className="bar-progress" style={{ width: progress + '%' }} /><button className="progress-handle" aria-label={'Adjust ' + row.name + ' completion'} onPointerDown={(event) => beginProgress(event, row)} style={{ left: progress + '%' }}><span>{progress}%</span></button><span className="bar-label">{row.name}</span>{index > 0 && <span className="dependency" />}</>}</div>{revised && <div className={'bar revised ' + row.color + ' ' + (isCritical ? 'critical-bar' : '')} style={{ left: (shown[0] / 30) * 100 + '%', width: ((shown[1] - shown[0] + 1) / 30) * 100 * scale + '%' }} onClick={(event) => handleBarClick(event, row)} onDoubleClick={() => openRationale(row)} title={rationales[row.id] ? 'Rationale: ' + rationales[row.id] : 'Double-click to add rationale'}><button className="resize-handle start" aria-label={'Adjust ' + row.name + ' start'} onPointerDown={(event) => beginResize(event, row, 'start')} /><button className="resize-handle end" aria-label={'Adjust ' + row.name + ' finish'} onPointerDown={(event) => beginResize(event, row, 'end')} /><span className="revised-progress" style={{ width: progress + '%' }} /><button className="progress-handle revised-progress-handle" aria-label={'Adjust ' + row.name + ' completion'} onPointerDown={(event) => beginProgress(event, row)} style={{ left: progress + '%' }} /><span className="revision-label">Edited · {shown[0] + 1}–{shown[1] + 1} Sep</span>{rationales[row.id] && <span className="rationale-preview">{rationales[row.id]}</span>}</div>}</div>; })}</div><div className="timeline-footer"><span>01 Sep</span><span>Week 37</span><span>08 Sep</span><span>15 Sep</span><span>22 Sep</span><span>30 Sep</span></div></div></div><div className="scroll-controls" aria-label="Schedule navigation"><button onClick={() => nudgeScroll(-420, 0)} aria-label="Scroll left">←</button><button onClick={() => nudgeScroll(0, -300)} aria-label="Scroll up">↑</button><span>Drag the bottom scrollbar or swipe to view the full timeline</span><button onClick={() => nudgeScroll(0, 300)} aria-label="Scroll down">↓</button><button onClick={() => nudgeScroll(420, 0)} aria-label="Scroll right">→</button></div><div className="quicklook-card"><span className="eyebrow">QUICKLOOK · HOVER PREVIEW</span><strong>Architecture</strong><span>07 Sep → 14 Sep · 6d · 62% complete</span><span>Resources: Systems Architect, Business Analysts</span></div><div className="panel-note"><span className="note-icon"><Clock3 size={14} /></span><div><strong>{notice}</strong><span>Hover a task bar to reveal resize handles. Drag an edge to revise dates while the original remains; drag the completion marker to change %. Select the Link tool to sequence two activities and then run the deterministic scheduler.</span></div><button onClick={() => runScheduler()}>Details</button></div></section>{riskMenu && <div className="risk-context-menu" style={{ left: riskMenu.x, top: riskMenu.y }} role="menu"><strong>Mark risk · {riskMenu.row.name}</strong><span>Risk points</span><div className="risk-point-actions"><button onClick={() => markRisk(riskMenu.row, 'medium', 3)}>3</button><button onClick={() => markRisk(riskMenu.row, 'medium', 7)}>7</button><button onClick={() => markRisk(riskMenu.row, 'severe', 10)}>10 · Severe</button></div><button onClick={() => markRisk(riskMenu.row, 'none', 0)}>Clear risk</button></div>}{reasonFor && <div className="dialog-backdrop" role="presentation"><div className="rationale-dialog" role="dialog" aria-modal="true" aria-label="Revision rationale"><div className="dialog-title"><strong>Revision rationale</strong><button onClick={() => setReasonFor(null)} aria-label="Close rationale"><X size={16} /></button></div><p>Describe why the revised timeline changed. The original bar remains visible beneath the edited line.</p><textarea value={draftReason} onChange={(e) => setDraftReason(e.target.value)} placeholder="Enter rationale for the extension…" autoFocus /><div className="dialog-actions"><button className="ghost-button" onClick={() => setReasonFor(null)}>Cancel</button><button className="primary-button" onClick={saveRationale}>Save rationale</button></div></div></div>}</>;
}
function DashboardView({ rows, notice }) {
  const projectRows = projects.filter((p) => p.id !== 'all').map((project) => { const items = [...(projectRowsById[project.id] || []), ...rows.filter((r) => r.projectId === project.id)]; const progress = items.length ? Math.round(items.reduce((sum, r) => sum + r.progress, 0) / items.length) : 0; const risk = items.filter((r) => r.status === 'At risk').length; return { ...project, progress, risk, count: items.length }; });
  const overall = projectRows.length ? Math.round(projectRows.reduce((s, p) => s + p.progress, 0) / projectRows.length) : 0;
  return <section className="dashboard-view"><div className="dashboard-hero"><div><span className="eyebrow">PORTFOLIO DASHBOARD</span><h2>All projects at a glance</h2><p>Overall completion, schedule health and project momentum across the portfolio.</p></div><div className="completion-ring" style={{ background: `conic-gradient(#1779d1 0 ${overall}%, #dbe7f2 ${overall}% 100%)` }}><strong>{overall}%</strong><span>complete</span></div></div><div className="dashboard-cards"><div><span>Projects</span><strong>{projectRows.length}</strong><small>Active portfolio</small></div><div><span>Activities</span><strong>{rows.length}</strong><small>Across all plans</small></div><div><span>At risk</span><strong>{projectRows.reduce((s,p) => s+p.risk,0)}</strong><small>Needs attention</small></div><div><span>On track</span><strong>{projectRows.filter((p) => p.risk === 0).length}</strong><small>Healthy projects</small></div></div><div className="project-health-grid">{projectRows.map((project) => <article key={project.id}><div className="health-title"><strong>{project.label}</strong><span className={project.risk ? 'risk' : 'good'}>{project.risk ? `${project.risk} at risk` : 'On track'}</span></div><div className="health-track"><i style={{ width: `${project.progress}%` }} /></div><div className="health-meta"><span>{project.progress}% complete</span><span>{project.count} activities</span></div></article>)}</div><div className="panel-note"><span className="note-icon"><LayoutDashboard size={14} /></span><div><strong>{notice}</strong><span>Portfolio completion is calculated from the activities currently shown in the workspace.</span></div></div></section>;
}
function ReportsView({ rows, notice }) {
  const complete = rows.filter((r) => r.progress === 100).length; const risk = rows.filter((r) => r.status === 'At risk').length; const planned = rows.length ? Math.round(rows.reduce((s, r) => s + r.progress, 0) / rows.length) : 0;
  return <section className="reports-view"><div className="report-hero"><div><span className="eyebrow">REPORTS · PORTFOLIO HEALTH</span><h2>Schedule performance report</h2><p>Visual status of delivery, completion and attention items for the selected project scope.</p></div><button className="primary-button">Export report</button></div><div className="report-metrics"><div><span>Average completion</span><strong>{planned}%</strong><i className="metric-bar blue" style={{ width: `${planned}%` }} /></div><div><span>Completed activities</span><strong>{complete}</strong><small>of {rows.length}</small></div><div><span>At-risk activities</span><strong className="risk-text">{risk}</strong><small>review required</small></div></div><div className="report-table"><div className="report-row report-head"><span>Activity</span><span>Project</span><span>Progress</span><span>Status</span></div>{rows.filter((r) => r.type !== 'summary').slice(0, 12).map((row) => <div className="report-row" key={row.id}><span>{row.name}</span><span>{projects.find((p) => p.id === row.projectId)?.label || (row.id <= 4 ? 'Orion Program' : row.id <= 7 ? 'Atlas Program' : row.id <= 10 ? 'Delta Release' : 'Portfolio')}</span><span>{row.progress}%</span><span className={row.status === 'At risk' ? 'risk-text' : ''}>{row.status}</span></div>)}</div><div className="panel-note"><span className="note-icon"><FileText size={14} /></span><div><strong>{notice}</strong><span>Report rows follow the active project and filter scope.</span></div></div></section>;
}

function ResourcePlaceholder({ action, notice }) { const resources = [['Database Administrator','$0.00/h','$0.00/h','$0.00','$0.00','IT'],['Network Administrator','$0.00/h','$0.00/h','$0.00','$0.00','IT'],['Business Analysts','$0.00/h','$0.00/h','$0.00','$0.00','People'],['Project Managers','$0.00/h','$0.00/h','$0.00','$0.00','People'],['IT Staff','$0.00/h','$0.00/h','$0.00','$0.00','IT'],['Server Administrator','$0.00/h','$0.00/h','$0.00','$0.00','IT'],['Systems Architect','$0.00/h','$0.00/h','$0.00','$0.00','People'],['Desktop Support','$0.00/h','$0.00/h','$0.00','$0.00','IT'],['Application Deployment','$0.00/h','$0.00/h','$0.00','$0.00','People'],['Team Members','$0.00/h','$0.00/h','$0.00','$0.00','People'],['Business Sponsors','$0.00/h','$0.00/h','$0.00','$0.00','People'],['Application Developers','$0.00/h','$0.00/h','$0.00','$0.00','People']]; return <section className="placeholder-view"><div className="placeholder-toolbar"><button className="toolbar-button active"><Users size={15} /> Resource table</button><button className="toolbar-button" onClick={() => action('Percent work usage')}><Activity size={15} /> Percent work usage</button><button className="toolbar-button" onClick={() => action('Assignments')}><ClipboardList size={15} /> Assignments</button><span className="range-label">Resource information · 12 visible resources</span></div><div className="resource-layout"><div className="resource-table"><div className="resource-header"><span>Resource Name</span><span>Standard Rate</span><span>Overtime Rate</span><span>Per Use Cost</span><span>Total Resource Cost</span><span>Category</span></div>{resources.map((r, rowIndex) => <div className="resource-row" key={r[0]}><span><span className="row-number">{rowIndex + 1}</span><Users size={14} />{r[0]}</span>{r.slice(1).map((v, i) => <span key={i}>{v}</span>)}</div>)}</div><div className="resource-inspector"><span className="eyebrow">RESOURCE INSPECTOR</span><h2>Shared resource view</h2><p>Structured placeholder for profiles, workload and assignments. Domain calculations arrive in the approved resource phase.</p><div className="inspector-card"><div><span>Visible load</span><strong>62%</strong></div><div><span>Assignments</span><strong>14</strong></div><div><span>Open issues</span><strong>2</strong></div></div><button className="primary-button" onClick={() => action('Open resource profile')}>Open profile</button></div></div><div className="panel-note"><span className="note-icon"><Users size={14} /></span><div><strong>{notice}</strong><span>Resource view is a structured UI-01 placeholder with deterministic sample rows.</span></div></div></section>; }

function CalendarPlaceholder({ action, notice, rows = [], projectLabel = 'All Projects' }) { const weeks = [['30 Aug','31 Aug','01 Sep','02 Sep','03 Sep','04 Sep','05 Sep'],['06 Sep','07 Sep','08 Sep','09 Sep','10 Sep','11 Sep','12 Sep'],['13 Sep','14 Sep','15 Sep','16 Sep','17 Sep','18 Sep','19 Sep'],['20 Sep','21 Sep','22 Sep','23 Sep','24 Sep','25 Sep','26 Sep'],['27 Sep','28 Sep','29 Sep','30 Sep','01 Oct','02 Oct','03 Oct']]; const eventsByDay = rows.reduce((map, row) => { const match = String(row.start || '').match(/(?:2026-)?(?:0?9|10)[-\\/](\d{1,2})|(?:^|\\s)(\d{1,2}) Sep/); const day = match ? Number(match[1] || match[2]) : null; if (day >= 1 && day <= 30) { if (!map[day]) map[day] = []; map[day].push(row); } return map; }, {}); return <section className="placeholder-view"><div className="placeholder-toolbar"><button className="toolbar-button active"><CalendarDays size={15} /> Wall calendar</button><button className="toolbar-button" onClick={() => action('Week range')}><Clock3 size={15} /> Week</button><button className="toolbar-button" onClick={() => action('Month range')}>Month</button><span className="range-label">September 2026 <ChevronDown size={13} /></span></div><div className="calendar-board"><div className="calendar-side"><span className="eyebrow">{projectLabel === 'All Projects' ? 'SHARED TIMELINE' : 'PROJECT TIMELINE'}</span><h2>September 2026</h2><p>All activities for the selected project, grouped by date.</p><div className="calendar-key"><span><i className="key-dot blue" /> Planned</span><span><i className="key-dot amber" /> At risk</span><span><i className="key-dot green" /> Complete</span></div></div><div className="month-grid"><div className="weekday-row">{['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map((day) => <span key={day}>{day}</span>)}</div>{weeks.map((week, wi) => <div className="calendar-week" key={wi}>{week.map((day, di) => <div className="calendar-day" key={day}><div className="day-title">{day}</div>{(eventsByDay[Number(day.slice(0, 2))] || []).slice(0, 4).map((row) => <div className={`calendar-event ${row.status === 'At risk' ? 'amber' : row.status === 'Complete' ? 'green' : 'blue'}`} key={row.id}><strong>{row.name}</strong><span>{row.status} · {row.duration}</span></div>)}</div>)}</div>)}</div></div><div className="panel-note"><span className="note-icon"><CalendarDays size={14} /></span><div><strong>{notice}</strong><span>Wall-calendar projection is ready for visual review; editing semantics remain outside P02.</span></div></div></section>; }

createRoot(document.getElementById('root')).render(<App />);
