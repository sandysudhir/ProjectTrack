import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity, AlertTriangle, ArrowDownToLine, ArrowUpToLine, BarChart3, Bell,
  CalendarDays, ChevronDown, ChevronRight, CircleHelp, ClipboardList, Clock3,
  Columns3, Database, FileText, FolderKanban, Gauge, Grid3X3, HelpCircle,
  LayoutDashboard, Link2, ListFilter, Menu, MoreHorizontal, PanelLeft,
  Play, Plus, Redo2, RefreshCw, Search, Settings2, SlidersHorizontal, Scissors,
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

const timeline = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];

const navItems = [
  ['Schedule', Table2], ['Resource', Users], ['Calendar', CalendarDays], ['Reports', FileText],
  ['Dashboard', LayoutDashboard], ['Documents', ClipboardList], ['Risks', AlertTriangle], ['Issues', CircleHelp]
];

const ribbonGroups = {
  Home: [['Schedule', Table2], ['Calendar', CalendarDays], ['Resource', Users], ['Keyboard shortcuts', HelpCircle], ['Cut', Scissors], ['Copy', ClipboardList], ['Paste', ArrowDownToLine], ['Font', FileText], ['Bold', FileText], ['Italic', FileText], ['Underline', FileText], ['Alignment', Columns3], ['Show Level', ListFilter], ['Arrow', ArrowDownToLine], ['Bar', Plus], ['Link', Link2], ['Unlink', X], ['Revise', RefreshCw], ['Percent', Activity], ['Text Box', FileText], ['Lock Tool', Settings2], ['Bar Styles', SlidersHorizontal], ['Start', Clock3], ['Finish', Clock3], ['Duration', Clock3], ['Find', Search], ['Go To', ArrowUpToLine], ['Select', Grid3X3]],
  Insert: [['Row', Plus], ['Column', Columns3], ['Text Box', FileText], ['Legend', FileText], ['Picture', PanelLeft], ['Pointer', ArrowUpToLine], ['Object', Database], ['Summary Graph', BarChart3], ['Timescale', Clock3], ['Datelines', Clock3], ['Header & Footer', FileText], ['Page Break', FileText]],
  Format: [['Bar Style', SlidersHorizontal], ['Critical Path', Activity], ['Link', Link2], ['Datelines', Clock3], ['Gridlines', Grid3X3], ['Header & Footer', FileText], ['Format Selected', Settings2]],
  View: [['Action Columns', Columns3], ['Summary Bars', BarChart3], ['Datelines', Clock3], ['Links', Link2], ['Critical Paths', Activity], ['Alignment Grid', Grid3X3], ['Percent Work Usage', Activity], ['Work Usage', BarChart3], ['Assignments', ClipboardList], ['Show Level', ListFilter], ['Restore All', RefreshCw]],
  Project: [['Project Information', FolderKanban], ['Activity Information', ClipboardList], ['Resource Information', Users], ['Work Calendars', CalendarDays], ['WBS', ListFilter], ['All Bars Range', ArrowUpToLine], ['Timeline Ranges', Clock3], ['Timeline Units', Clock3], ['Layouts', Grid3X3], ['Sorts', ListFilter], ['Filters', ListFilter], ['Restore All', RefreshCw]],
  Tools: [['Spelling', FileText], ['FastSteps', Gauge], ['Define', ClipboardList], ['Get Updates', ArrowDownToLine], ['Save Baseline', ArrowDownToLine], ['Clear Baseline', X], ['Reset Revised', RefreshCw], ['Reset Actual', RefreshCw], ['Column Map', Columns3], ['Shift Items', ArrowUpToLine], ['Shift Schedule', ArrowUpToLine], ['Bring to Front', ArrowUpToLine], ['Send to Back', ArrowDownToLine], ['Arrange', SlidersHorizontal], ['Autofit', Columns3]],
  Application: [['On the Web', ArrowUpToLine], ['About', CircleHelp], ['Keyboard Shortcuts', HelpCircle], ['Example Files', FileText], ['Tutorial', CircleHelp], ['Tab Workspace', Grid3X3], ['Status Bar', Activity], ['Themes', SlidersHorizontal], ['Toolbars', Columns3], ['Switch Windows', MoreHorizontal], ['Cascade', Grid3X3], ['Tile Horizontally', Columns3], ['Tile Vertically', Columns3]],
};
const initialParams = new URLSearchParams(window.location.search);
const futureCommands = new Set(['Revise','Link','Unlink','Percent','Save Baseline','Clear Baseline','Reset Revised','Reset Actual','Column Map','Get Updates','Shift Items','Shift Schedule','Spelling','Cost Report','Resource Cost Report','Critical Path','Critical Paths','Work Usage','Assignments','WBS','Consolidation','Summary Graph','Gridlines','Header & Footer','Format Selected']);
const toolNames = new Set(['Arrow','Bar','Link','Revise','Percent','Text Box']);
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

function ShellDialog({ title, fields, onClose }) { const tabs = title.toLowerCase().includes('activity') ? ['Tracking', 'Columns', 'Links', 'Assignments'] : title.toLowerCase().includes('calendar') ? ['Information', 'Work Calendar', 'Exceptions'] : ['Information', 'Work Calendar', 'Other Columns']; return <div className="dialog-backdrop" role="presentation" onClick={onClose}><div className="shell-dialog" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}><div className="dialog-title"><strong>{title}</strong><button onClick={onClose} aria-label="Close dialog"><X size={16} /></button></div><div className="dialog-tabs">{tabs.map((tab, i) => <button key={tab} className={i === 0 ? 'active' : ''}>{tab}</button>)}</div><div className="dialog-content">{fields.map((field, i) => <label key={field}><span>{field}</span>{i === 0 && fields.length > 1 ? <select><option>Presentation fixture value</option><option>Future implementation</option></select> : <input value={i === 1 ? '01 Sep 2026' : ''} readOnly placeholder="Shell field" />}</label>)}</div><div className="dialog-actions"><button className="ghost-button" onClick={onClose}>Cancel</button><button className="primary-button" onClick={onClose}>Close</button></div></div></div>; }

function App() {
  const [activeProject, setActiveProject] = useState(initialParams.get('project') || 'all');
  const [activeNav, setActiveNav] = useState(initialParams.get('nav') || 'Schedule');
  const [ribbon, setRibbon] = useState(initialParams.get('ribbon') || 'Home');
  const [layout, setLayout] = useState('Standard');
  const [density, setDensity] = useState('Compact');
  const [zoom, setZoom] = useState(100);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(initialParams.get('compact') !== '1');
  const [outlineMode, setOutlineMode] = useState(initialParams.get('outline') || (initialParams.get('compact') === '1' ? 'compact' : 'expanded'));
  const [notice, setNotice] = useState('Ready');
  const [leftWidth, setLeftWidth] = useState(42);
  const [mode, setMode] = useState('populated');
  const [dialog, setDialog] = useState(() => { const requested = initialParams.get('dialog'); if (!requested) return null; const key = Object.keys(dialogFields).find((name) => name.toLowerCase() === requested.toLowerCase()) || requested; return { title: requested, fields: dialogFields[key] || ['Presentation fixture value', 'Open behaviour remains tracked in docs/10_OPEN_QUESTIONS.md'] }; });
  const [activeTool, setActiveTool] = useState('Arrow');
  const [lockedTool, setLockedTool] = useState(null);

  const filteredRows = useMemo(() => rows.filter((row) => !query || row.name.toLowerCase().includes(query.toLowerCase())), [query]);
  const visibleRows = outlineMode === 'compact' ? filteredRows.filter((row) => row.level === 0 || row.type === 'milestone') : outlineMode === 'selective' ? filteredRows.filter((row) => row.level <= 1 || row.type === 'milestone') : filteredRows;
  const showCalendar = activeNav === 'Calendar';
  const showResource = activeNav === 'Resource';

  const action = (label) => { setNotice(`${label} · shell command ready`); const key = Object.keys(dialogFields).find((name) => label.toLowerCase().includes(name.toLowerCase())); if (key) setDialog({ title: label, fields: dialogFields[key] }); };
  const chooseTool = (label) => { if (toolNames.has(label)) { setActiveTool(label); setNotice(`${label} tool selected`); } else if (label === 'Lock Tool') { setLockedTool((current) => { const next = current ? null : activeTool; setNotice(next ? `${next} tool locked for repeated use` : 'Tool lock released'); return next; }); } else action(label); };
  const toggleExpanded = () => { const next = !expanded; setExpanded(next); setOutlineMode(next ? 'expanded' : 'compact'); setNotice(next ? 'Hierarchy expanded' : 'Hierarchy compacted'); };

  return <div className="app-shell">
    <header className="titlebar">
      <div className="title-left"><div className="quick-access"><button onClick={() => action('New')} title="New"><Plus size={13} /></button><button onClick={() => action('Open')} title="Open"><FolderKanban size={13} /></button><button onClick={() => action('Save')} title="Save"><ClipboardList size={13} /></button><button onClick={() => action('Save As')} title="Save As"><FileText size={13} /></button><button onClick={() => action('Undo')} title="Undo"><Undo2 size={13} /></button><button onClick={() => action('Redo')} title="Redo"><Redo2 size={13} /></button><button onClick={() => action('Print / Print Preview')} title="Print / Print Preview"><FileText size={13} /></button></div><div className="brand"><div className="brand-mark"><span /></div><span>ProjectTrack</span><small>Professional scheduling workspace</small></div></div>
      <div className="title-actions"><button aria-label="Help"><HelpCircle size={16} /></button><button aria-label="Notifications"><Bell size={16} /><i /></button><div className="avatar">SS</div></div>
    </header>

    <nav className="workspace-tabs" aria-label="Project tabs">
      <div className="tabs-left">{projects.map((project) => <button key={project.id} className={`workspace-tab ${activeProject === project.id ? 'active' : ''}`} onClick={() => { setActiveProject(project.id); setNotice(`${project.label} opened`); }}>{project.label}{project.id === 'all' && <span className="tab-count">3</span>}</button>)}<button className="add-tab" onClick={() => action('New project tab')}><Plus size={15} /></button></div>
      <div className="workspace-tools"><label className="layout-label">Layout <select value={layout} onChange={(e) => { setLayout(e.target.value); setNotice(`Layout ${e.target.value} selected`); }}><option>Standard</option><option>Executive</option><option>Review</option></select><ChevronDown size={13} /></label><div className="search-box"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search workspace" /><kbd>Ctrl K</kbd>{query && <button onClick={() => setQuery('')}><X size={13} /></button>}</div></div>
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
        <div className="view-header"><div><div className="breadcrumb">{activeProject === 'all' ? 'ALL PROJECTS' : projects.find((p) => p.id === activeProject)?.label.toUpperCase()} <ChevronRight size={13} /> {activeNav.toUpperCase()}</div><h1>{showCalendar ? 'Calendar' : showResource ? 'Resource planning' : 'Schedule'}</h1><p>{showCalendar ? 'Wall calendar projection across shared project weeks.' : showResource ? 'Resource load and assignment structure across the workspace.' : 'Plan, inspect and coordinate work across your project portfolio.'}</p></div><div className="view-actions"><button className="ghost-button" onClick={() => action('Refresh view')}><RefreshCw size={15} /> Refresh</button><button className="primary-button" onClick={() => action('New row')}><Plus size={15} /> New row</button></div></div>
        {mode === 'loading' ? <div className="state-panel"><RefreshCw size={25} className="spin" /><h2>Loading workspace</h2><p>Preparing the deterministic sample fixture…</p></div> : <>
          {showCalendar ? <CalendarPlaceholder notice={notice} action={action} /> : showResource ? <ResourcePlaceholder notice={notice} action={action} /> : <ScheduleView rows={visibleRows} leftWidth={leftWidth} setLeftWidth={setLeftWidth} density={density} setDensity={setDensity} zoom={zoom} setZoom={setZoom} expanded={expanded} outlineMode={outlineMode} setOutlineMode={(next) => { setOutlineMode(next); setExpanded(next !== 'compact'); }} action={action} notice={notice} />}
        </>}
      </main>
    </div>
    {dialog && <ShellDialog title={dialog.title} fields={dialog.fields} onClose={() => setDialog(null)} />}
    <footer className="statusbar"><div><span className="status-led" />{notice}</div><div className="status-center">Tool: {activeTool}{lockedTool ? ` · ${lockedTool} locked` : ''} · {filteredRows.length} rows · {projects.length - 1} projects · Last saved just now</div><div className="status-right"><span>Zoom {zoom}%</span><button onClick={() => setZoom(Math.max(60, zoom - 10))}>−</button><button onClick={() => setZoom(Math.min(160, zoom + 10))}>＋</button><span className="connection"><span className="status-led green" />Local workspace</span></div></footer>
  </div>;
}

function ScheduleView({ rows, leftWidth, setLeftWidth, density, setDensity, zoom, setZoom, expanded, outlineMode, setOutlineMode, action, notice }) {
  const scale = 0.86 + zoom / 100 * 0.14;
  const timelineRef = useRef(null);
  const dragRef = useRef(null);
  const [revisedBars, setRevisedBars] = useState({});
  const [progressOverrides, setProgressOverrides] = useState({});
  const [rationales, setRationales] = useState({});
  const [reasonFor, setReasonFor] = useState(null);
  const [draftReason, setDraftReason] = useState('');
  const beginResize = (event, row, edge) => {
    if (row.type === 'milestone') return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current = { row, edge, mode: 'dates', changed: false };
  };
  const beginProgress = (event, row) => {
    if (row.type === 'milestone') return;
    event.preventDefault();
    event.stopPropagation();
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
      const span = Math.max(1, current[1] - current[0]);
      const nextProgress = Math.max(0, Math.min(100, Math.round(((dayFloat - current[0]) / span) * 100)));
      if (nextProgress !== drag.value) { drag.changed = true; drag.value = nextProgress; setProgressOverrides((value) => ({ ...value, [drag.row.id]: nextProgress })); }
      return;
    }
    const next = drag.edge === 'start' ? [Math.min(day, current[1] - 1), current[1]] : [current[0], Math.max(day, current[0] + 1)];
    if (next[0] !== current[0] || next[1] !== current[1]) { drag.changed = true; setRevisedBars((value) => ({ ...value, [drag.row.id]: next })); }
  };
  const finishResize = () => { const drag = dragRef.current; dragRef.current = null; if (!drag?.changed) return; if (drag.mode === 'progress') { action(`${drag.row.name} completion set to ${drag.value}%`); return; } setReasonFor(drag.row.id); setDraftReason(rationales[drag.row.id] || ''); };
  const openRationale = (row) => { if (revisedBars[row.id]) { setReasonFor(row.id); setDraftReason(rationales[row.id] || ''); } };
  const saveRationale = () => { setRationales((value) => ({ ...value, [reasonFor]: draftReason || 'Reason to be documented.' })); setReasonFor(null); setDraftReason(''); };
  return <><section className={`schedule-panel density-${density.toLowerCase()}`}>
    <div className="panel-toolbar"><div className="toolbar-group"><button className="toolbar-button active"><Table2 size={15} /> Grid + Gantt</button><button className="toolbar-button" onClick={() => action('Show level')}><ListFilter size={15} /> Show level <ChevronDown size={13} /></button><button className="toolbar-button" onClick={() => action('Active now')}><Play size={14} /> Active now</button><button className={`toolbar-button ${outlineMode === 'compact' ? 'active' : ''}`} onClick={() => { setOutlineMode('compact'); action('Projects only'); }}>Projects only</button><button className={`toolbar-button ${outlineMode === 'selective' ? 'active' : ''}`} onClick={() => { setOutlineMode('selective'); action('Selective expansion'); }}>Selective expansion</button><button className={`toolbar-button ${outlineMode === 'expanded' ? 'active' : ''}`} onClick={() => { setOutlineMode('expanded'); action('Expand everything'); }}>Expand everything</button></div><div className="toolbar-group"><span className="bar-legend"><i className="legend-line original" /> Original</span><span className="bar-legend"><i className="legend-line revised" /> Revised</span><span className="bar-legend"><i className="legend-fill" /> Complete</span><span className="bar-legend"><i className="completion-marker" /> Drag marker to edit %</span><label className="density-control">Row height <select value={density} onChange={(e) => setDensity(e.target.value)}><option>Compact</option><option>Comfortable</option><option>Expanded</option></select></label><label className="zoom-control">Timeline <input type="range" min="60" max="160" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} /><span>{zoom}%</span></label></div></div>
    <div className="schedule-body"><div className="grid-pane" style={{ width: `${leftWidth}%` }}><div className="grid-header"><span className="row-number">#</span><span className="activity-name">Activity name</span><span>Start</span><span>Finish</span><span>Dur.</span><span>Status</span><span>% Complete</span></div><div className="grid-rows">{rows.map((row) => <div className={`grid-row ${row.type === 'summary' ? 'summary' : ''} ${row.type === 'milestone' ? 'milestone-row' : ''}`} key={row.id} style={{ '--indent': `${row.level * 18}px` }}><span className="row-number">{row.id}</span><span className="activity-name" style={{ paddingLeft: `calc(10px + ${row.level * 18}px)` }}>{row.level > 0 && <span className="branch-line" />}{row.type === 'summary' ? <ChevronDown size={13} /> : row.type === 'milestone' ? <Gauge size={12} className="milestone-icon" /> : <span className="task-dot" />}<span>{row.name}</span></span><span>{row.start}</span><span>{row.finish}</span><span>{row.duration}</span><span className={`status ${row.status === 'At risk' ? 'risk' : row.status === 'Complete' ? 'complete' : ''}`}>{row.status}</span><span className="completion-cell"><span className="completion-track"><i style={{ width: `${progressOverrides[row.id] ?? row.progress}%` }} /></span>{progressOverrides[row.id] ?? row.progress}%</span></div>)}</div></div><button className="splitter" aria-label="Resize grid pane" onClick={() => setLeftWidth(leftWidth > 44 ? 34 : 52)}><span /></button><div className="timeline-pane"><div className="timeline-header"><div className="month-label">September 2026</div><div className="timeline-date-stack"><div className="weekday-labels">{timeline.map((day, i) => <span key={`w-${day}`}>{['T','W','T','F','S','S','M'][i % 7]}</span>)}</div><div className="day-labels">{timeline.map((day, i) => <span key={day} className={i === 8 ? 'today' : ''}>{day}</span>)}</div></div></div><div className="timeline-grid" ref={timelineRef} onPointerMove={updateResize} onPointerUp={finishResize} onPointerLeave={finishResize} style={{ '--scale': scale }}><div className="today-line" style={{ left: `${(8.5 / 30) * 100}%` }}><span>Today</span></div>{rows.map((row, index) => { const revised = revisedBars[row.id]; const shown = revised || row.bar; const progress = progressOverrides[row.id] ?? row.progress; return <div key={row.id} className={`timeline-row ${row.type === 'summary' ? 'summary' : ''}`}><div className={`bar ${row.color} ${revised ? 'has-revision' : ''}`} style={{ left: `${(row.bar[0] / 30) * 100}%`, width: row.type === 'milestone' ? '0' : `${((row.bar[1] - row.bar[0] + 1) / 30) * 100 * scale}%` }} onDoubleClick={() => openRationale(row)}>{row.type === 'milestone' ? <span className="diamond" /> : <><button className="resize-handle original-handle start" aria-label={`Adjust ${row.name} start`} onPointerDown={(event) => beginResize(event, row, 'start')} /><button className="resize-handle original-handle end" aria-label={`Adjust ${row.name} finish`} onPointerDown={(event) => beginResize(event, row, 'end')} /><span className="bar-progress" style={{ width: `${progress}%` }} /><button className="progress-handle" aria-label={`Adjust ${row.name} completion`} onPointerDown={(event) => beginProgress(event, row)} style={{ left: `${progress}%` }}><span>{progress}%</span></button><span className="bar-label">{row.name}</span>{index > 0 && <span className="dependency" />}</>}</div>{revised && <div className={`bar revised ${row.color}`} style={{ left: `${(shown[0] / 30) * 100}%`, width: `${((shown[1] - shown[0] + 1) / 30) * 100 * scale}%` }} onDoubleClick={() => openRationale(row)} title={rationales[row.id] ? `Rationale: ${rationales[row.id]}` : 'Double-click to add rationale'}><button className="resize-handle start" aria-label={`Adjust ${row.name} start`} onPointerDown={(event) => beginResize(event, row, 'start')} /><button className="resize-handle end" aria-label={`Adjust ${row.name} finish`} onPointerDown={(event) => beginResize(event, row, 'end')} /><span className="revised-progress" style={{ width: `${progress}%` }} /><button className="progress-handle revised-progress-handle" aria-label={`Adjust ${row.name} completion`} onPointerDown={(event) => beginProgress(event, row)} style={{ left: `${progress}%` }}><span>{progress}%</span></button><span className="revision-label">Edited · {shown[0] + 1}–{shown[1] + 1} Sep</span>{rationales[row.id] && <span className="rationale-preview">{rationales[row.id]}</span>}</div>}</div>; })}</div><div className="timeline-footer"><span>01 Sep</span><span>Week 37</span><span>08 Sep</span><span>15 Sep</span><span>22 Sep</span><span>30 Sep</span></div></div></div><div className="quicklook-card"><span className="eyebrow">QUICKLOOK · HOVER PREVIEW</span><strong>Architecture</strong><span>07 Sep → 14 Sep · 6d · 62% complete</span><span>Resources: Systems Architect, Business Analysts</span></div><div className="panel-note"><span className="note-icon"><Clock3 size={14} /></span><div><strong>UI-01 shell fixture</strong><span>Hover a task bar to reveal resize handles. Drag an edge to revise dates, or drag the completion marker to change %. Double-click the edited line to record its rationale.</span></div><button onClick={() => action('Open validation note')}>Details</button></div></section>{reasonFor && <div className="dialog-backdrop" role="presentation"><div className="rationale-dialog" role="dialog" aria-modal="true" aria-label="Revision rationale"><div className="dialog-title"><strong>Revision rationale</strong><button onClick={() => setReasonFor(null)} aria-label="Close rationale"><X size={16} /></button></div><p>Describe why the revised timeline changed. The original bar remains visible beneath the edited line.</p><textarea value={draftReason} onChange={(e) => setDraftReason(e.target.value)} placeholder="Enter rationale for the extension…" autoFocus /><div className="dialog-actions"><button className="ghost-button" onClick={() => setReasonFor(null)}>Cancel</button><button className="primary-button" onClick={saveRationale}>Save rationale</button></div></div></div>}</>
}

function ResourcePlaceholder({ action, notice }) { const resources = [['Database Administrator','$0.00/h','$0.00/h','$0.00','$0.00','IT'],['Network Administrator','$0.00/h','$0.00/h','$0.00','$0.00','IT'],['Business Analysts','$0.00/h','$0.00/h','$0.00','$0.00','People'],['Project Managers','$0.00/h','$0.00/h','$0.00','$0.00','People'],['IT Staff','$0.00/h','$0.00/h','$0.00','$0.00','IT'],['Server Administrator','$0.00/h','$0.00/h','$0.00','$0.00','IT'],['Systems Architect','$0.00/h','$0.00/h','$0.00','$0.00','People'],['Desktop Support','$0.00/h','$0.00/h','$0.00','$0.00','IT'],['Application Deployment','$0.00/h','$0.00/h','$0.00','$0.00','People'],['Team Members','$0.00/h','$0.00/h','$0.00','$0.00','People'],['Business Sponsors','$0.00/h','$0.00/h','$0.00','$0.00','People'],['Application Developers','$0.00/h','$0.00/h','$0.00','$0.00','People']]; return <section className="placeholder-view"><div className="placeholder-toolbar"><button className="toolbar-button active"><Users size={15} /> Resource table</button><button className="toolbar-button" onClick={() => action('Percent work usage')}><Activity size={15} /> Percent work usage</button><button className="toolbar-button" onClick={() => action('Assignments')}><ClipboardList size={15} /> Assignments</button><span className="range-label">Resource information · 12 visible resources</span></div><div className="resource-layout"><div className="resource-table"><div className="resource-header"><span>Resource Name</span><span>Standard Rate</span><span>Overtime Rate</span><span>Per Use Cost</span><span>Total Resource Cost</span><span>Category</span></div>{resources.map((r, rowIndex) => <div className="resource-row" key={r[0]}><span><span className="row-number">{rowIndex + 1}</span><Users size={14} />{r[0]}</span>{r.slice(1).map((v, i) => <span key={i}>{v}</span>)}</div>)}</div><div className="resource-inspector"><span className="eyebrow">RESOURCE INSPECTOR</span><h2>Shared resource view</h2><p>Structured placeholder for profiles, workload and assignments. Domain calculations arrive in the approved resource phase.</p><div className="inspector-card"><div><span>Visible load</span><strong>62%</strong></div><div><span>Assignments</span><strong>14</strong></div><div><span>Open issues</span><strong>2</strong></div></div><button className="primary-button" onClick={() => action('Open resource profile')}>Open profile</button></div></div><div className="panel-note"><span className="note-icon"><Users size={14} /></span><div><strong>{notice}</strong><span>Resource view is a structured UI-01 placeholder with deterministic sample rows.</span></div></div></section>; }

function CalendarPlaceholder({ action, notice }) { const weeks = [['30 Aug','31 Aug','01 Sep','02 Sep','03 Sep','04 Sep','05 Sep'],['06 Sep','07 Sep','08 Sep','09 Sep','10 Sep','11 Sep','12 Sep'],['13 Sep','14 Sep','15 Sep','16 Sep','17 Sep','18 Sep','19 Sep'],['20 Sep','21 Sep','22 Sep','23 Sep','24 Sep','25 Sep','26 Sep'],['27 Sep','28 Sep','29 Sep','30 Sep','01 Oct','02 Oct','03 Oct']]; return <section className="placeholder-view"><div className="placeholder-toolbar"><button className="toolbar-button active"><CalendarDays size={15} /> Wall calendar</button><button className="toolbar-button" onClick={() => action('Week range')}><Clock3 size={15} /> Week</button><button className="toolbar-button" onClick={() => action('Month range')}>Month</button><span className="range-label">September 2026 <ChevronDown size={13} /></span></div><div className="calendar-board"><div className="calendar-side"><span className="eyebrow">SHARED TIMELINE</span><h2>September 2026</h2><p>Continuous wall-calendar view across Orion, Atlas and Delta project weeks.</p><div className="calendar-key"><span><i className="key-dot blue" /> Planned</span><span><i className="key-dot amber" /> At risk</span><span><i className="key-dot green" /> Complete</span></div></div><div className="month-grid"><div className="weekday-row">{['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map((day) => <span key={day}>{day}</span>)}</div>{weeks.map((week, wi) => <div className="calendar-week" key={wi}>{week.map((day, di) => <div className="calendar-day" key={day}><div className="day-title">{day}</div>{wi === 1 && di === 1 && <div className="calendar-event blue"><strong>Architecture</strong><span>Orion Program</span></div>}{wi === 2 && di === 1 && <div className="calendar-event amber"><strong>Build</strong><span>Atlas Program</span></div>}{wi === 3 && di === 2 && <div className="calendar-event green"><strong>Feasibility</strong><span>Complete</span></div>}{wi === 3 && di === 5 && <div className="calendar-milestone"><Gauge size={13} /> Publish milestone</div>}{wi === 4 && di === 4 && <div className="calendar-event blue"><strong>Handover</strong><span>Delta Release</span></div>}</div>)}</div>)}</div></div><div className="panel-note"><span className="note-icon"><CalendarDays size={14} /></span><div><strong>{notice}</strong><span>Wall-calendar projection is ready for visual review; editing semantics remain outside P02.</span></div></div></section>; }

createRoot(document.getElementById('root')).render(<App />);

