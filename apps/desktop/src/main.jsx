import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity, AlertTriangle, ArrowDownToLine, ArrowUpToLine, BarChart3, Bell,
  CalendarDays, ChevronDown, ChevronRight, CircleHelp, ClipboardList, Clock3,
  Columns3, Database, FileText, FolderKanban, Gauge, Grid3X3, HelpCircle,
  LayoutDashboard, Link2, ListFilter, Menu, MoreHorizontal, PanelLeft,
  Play, Plus, Redo2, RefreshCw, Search, Settings2, SlidersHorizontal,
  Table2, Undo2, Users, X
} from 'lucide-react';
import './styles.css';

const projects = [
  { id: 'all', label: 'All Projects', kind: 'workspace' },
  { id: 'orion', label: 'Orion Program', kind: 'program', status: 'On track' },
  { id: 'atlas', label: 'Atlas Program', kind: 'program', status: 'At risk' },
  { id: 'delta', label: 'Delta Release', kind: 'program', status: 'On track' },
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
];

const timeline = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];

const navItems = [
  ['Schedule', Table2], ['Resource', Users], ['Calendar', CalendarDays], ['Reports', FileText],
  ['Dashboard', LayoutDashboard], ['Documents', ClipboardList], ['Risks', AlertTriangle], ['Issues', CircleHelp]
];

const ribbonGroups = {
  Home: [['Schedule', Table2], ['Arrow', ArrowDownToLine], ['Select', Grid3X3], ['Bar', Plus], ['Revise', RefreshCw], ['Link', Link2]],
  Insert: [['Task', Plus], ['Milestone', Gauge], ['Text box', FileText], ['Picture', PanelLeft], ['Object', Database]],
  Format: [['Bar style', SlidersHorizontal], ['Critical path', Activity], ['Datelines', Clock3], ['Gridlines', Grid3X3]],
  View: [['Summary bars', BarChart3], ['Action columns', Columns3], ['Show level', ListFilter], ['Density', Gauge]],
  Project: [['Project info', FolderKanban], ['Activity info', ClipboardList], ['Resource info', Users], ['Calendars', CalendarDays]],
  Tools: [['Baseline', ArrowDownToLine], ['Compare', BarChart3], ['Find', Search], ['Filter', ListFilter]],
  Application: [['Save', ClipboardList], ['Undo', Undo2], ['Redo', Redo2], ['Preferences', Settings2]],
};

function App() {
  const [activeProject, setActiveProject] = useState('all');
  const [activeNav, setActiveNav] = useState('Schedule');
  const [ribbon, setRibbon] = useState('Home');
  const [layout, setLayout] = useState('Standard');
  const [density, setDensity] = useState('Compact');
  const [zoom, setZoom] = useState(100);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(true);
  const [notice, setNotice] = useState('Ready');
  const [leftWidth, setLeftWidth] = useState(42);
  const [mode, setMode] = useState('populated');

  const filteredRows = useMemo(() => rows.filter((row) => !query || row.name.toLowerCase().includes(query.toLowerCase())), [query]);
  const showCalendar = activeNav === 'Calendar';
  const showResource = activeNav === 'Resource';

  const action = (label) => { setNotice(`${label} · shell command ready`); };
  const toggleExpanded = () => { setExpanded((value) => !value); setNotice(expanded ? 'Hierarchy compacted' : 'Hierarchy expanded'); };

  return <div className="app-shell">
    <header className="titlebar">
      <div className="brand"><div className="brand-mark"><span /></div><span>ProjectTrack</span><small>Professional scheduling workspace</small></div>
      <div className="title-actions"><button aria-label="Help"><HelpCircle size={16} /></button><button aria-label="Notifications"><Bell size={16} /><i /></button><div className="avatar">SS</div></div>
    </header>

    <nav className="workspace-tabs" aria-label="Project tabs">
      <div className="tabs-left">{projects.map((project) => <button key={project.id} className={`workspace-tab ${activeProject === project.id ? 'active' : ''}`} onClick={() => { setActiveProject(project.id); setNotice(`${project.label} opened`); }}>{project.label}{project.id === 'all' && <span className="tab-count">3</span>}</button>)}<button className="add-tab" onClick={() => action('New project tab')}><Plus size={15} /></button></div>
      <div className="workspace-tools"><label className="layout-label">Layout <select value={layout} onChange={(e) => { setLayout(e.target.value); setNotice(`Layout ${e.target.value} selected`); }}><option>Standard</option><option>Executive</option><option>Review</option></select><ChevronDown size={13} /></label><div className="search-box"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search workspace" /><kbd>Ctrl K</kbd>{query && <button onClick={() => setQuery('')}><X size={13} /></button>}</div></div>
    </nav>

    <div className="ribbon-tabs">{Object.keys(ribbonGroups).map((name) => <button key={name} className={ribbon === name ? 'active' : ''} onClick={() => setRibbon(name)}>{name}</button>)}<div className="ribbon-spacer" /><button className="mode-button" onClick={() => setMode(mode === 'populated' ? 'loading' : 'populated')}><span className={`state-dot ${mode}`} /> {mode === 'loading' ? 'Loading preview' : 'Workspace ready'}</button></div>
    <section className="ribbon" aria-label={`${ribbon} commands`}><div className="ribbon-inner">{ribbonGroups[ribbon].map(([label, Icon]) => <button key={label} className="ribbon-command" onClick={() => action(label)}><span className="command-icon"><Icon size={19} /></span><span>{label}</span></button>)}<div className="ribbon-divider" /><button className="ribbon-command" onClick={toggleExpanded}><span className="command-icon"><ChevronRight size={19} className={expanded ? 'rotate-90' : ''} /></span><span>{expanded ? 'Collapse' : 'Expand'}</span></button><button className="ribbon-command" onClick={() => action('Autofit')}><span className="command-icon"><SlidersHorizontal size={19} /></span><span>Autofit</span></button></div><div className="ribbon-caption">{ribbon} commands</div></section>

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
          {showCalendar ? <CalendarPlaceholder notice={notice} action={action} /> : showResource ? <ResourcePlaceholder notice={notice} action={action} /> : <ScheduleView rows={filteredRows} leftWidth={leftWidth} setLeftWidth={setLeftWidth} density={density} setDensity={setDensity} zoom={zoom} setZoom={setZoom} expanded={expanded} action={action} notice={notice} />}
        </>}
      </main>
    </div>
    <footer className="statusbar"><div><span className="status-led" />{notice}</div><div className="status-center">{filteredRows.length} rows · 3 projects · Last saved just now</div><div className="status-right"><span>Zoom {zoom}%</span><button onClick={() => setZoom(Math.max(60, zoom - 10))}>−</button><button onClick={() => setZoom(Math.min(160, zoom + 10))}>＋</button><span className="connection"><span className="status-led green" />Local workspace</span></div></footer>
  </div>;
}

function ScheduleView({ rows, leftWidth, setLeftWidth, density, setDensity, zoom, setZoom, expanded, action, notice }) {
  const scale = 0.86 + zoom / 100 * 0.14;
  return <section className="schedule-panel"><div className="panel-toolbar"><div className="toolbar-group"><button className="toolbar-button active"><Table2 size={15} /> Grid + Gantt</button><button className="toolbar-button" onClick={() => action('Show level')}><ListFilter size={15} /> Show level <ChevronDown size={13} /></button><button className="toolbar-button" onClick={() => action('Active now')}><Play size={14} /> Active now</button></div><div className="toolbar-group"><label className="density-control">Row height <select value={density} onChange={(e) => setDensity(e.target.value)}><option>Compact</option><option>Comfortable</option><option>Expanded</option></select></label><label className="zoom-control">Timeline <input type="range" min="60" max="160" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} /><span>{zoom}%</span></label></div></div><div className="schedule-body"><div className="grid-pane" style={{ width: `${leftWidth}%` }}><div className="grid-header"><span className="row-number">#</span><span className="activity-name">Activity name</span><span>Start</span><span>Finish</span><span>Dur.</span><span>Status</span></div><div className="grid-rows">{rows.map((row) => <div className={`grid-row ${row.type === 'summary' ? 'summary' : ''} ${row.type === 'milestone' ? 'milestone-row' : ''}`} key={row.id} style={{ '--indent': `${row.level * 18}px` }}><span className="row-number">{row.id}</span><span className="activity-name" style={{ paddingLeft: `calc(10px + ${row.level * 18}px)` }}>{row.level > 0 && <span className="branch-line" />}{row.type === 'summary' ? <ChevronDown size={13} /> : row.type === 'milestone' ? <Gauge size={12} className="milestone-icon" /> : <span className="task-dot" />}<span>{row.name}</span></span><span>{row.start}</span><span>{row.finish}</span><span>{row.duration}</span><span className={`status ${row.status === 'At risk' ? 'risk' : row.status === 'Complete' ? 'complete' : ''}`}>{row.status}</span></div>)}</div></div><button className="splitter" aria-label="Resize grid pane" onClick={() => setLeftWidth(leftWidth > 44 ? 34 : 52)}><span /></button><div className="timeline-pane"><div className="timeline-header"><div className="month-label">September 2026</div><div className="day-labels">{timeline.map((day, i) => <span key={day} className={i === 8 ? 'today' : ''}>{day}</span>)}</div></div><div className="timeline-grid" style={{ '--scale': scale }}><div className="today-line" style={{ left: `${(8.5 / 30) * 100}%` }}><span>Today</span></div>{rows.map((row) => <div key={row.id} className={`timeline-row ${row.type === 'summary' ? 'summary' : ''}`}><div className={`bar ${row.color}`} style={{ left: `${(row.bar[0] / 30) * 100}%`, width: row.type === 'milestone' ? '0' : `${((row.bar[1] - row.bar[0] + 1) / 30) * 100 * scale}%` }}>{row.type === 'milestone' ? <span className="diamond" /> : <><span className="bar-progress" style={{ width: `${row.progress}%` }} /><span className="bar-label">{row.name}</span></>}</div></div>)}</div><div className="timeline-footer"><span>01 Sep</span><span>Week 37</span><span>08 Sep</span><span>15 Sep</span><span>22 Sep</span><span>30 Sep</span></div></div></div><div className="panel-note"><span className="note-icon"><Clock3 size={14} /></span><div><strong>UI-01 shell fixture</strong><span>Navigation and visual structure are active. Scheduling commands remain intentionally outside this phase.</span></div><button onClick={() => action('Open validation note')}>Details</button></div></section>;
}

function ResourcePlaceholder({ action, notice }) { return <section className="placeholder-view"><div className="placeholder-toolbar"><button className="toolbar-button active"><Users size={15} /> Resource table</button><button className="toolbar-button" onClick={() => action('Percent work usage')}><Activity size={15} /> Percent work usage</button><button className="toolbar-button" onClick={() => action('Assignments')}><ClipboardList size={15} /> Assignments</button></div><div className="resource-layout"><div className="resource-table"><div className="resource-header"><span>Resource</span><span>Category</span><span>Usage</span><span>Cost</span><span>Status</span></div>{[['Asha Mehta','People','62%','$18,400','Available'],['Design studio','Equipment','48%','$6,250','Available'],['QA pool','People','84%','$12,900','Watch'],['Prototype vendor','Material','35%','$4,800','Available']].map((r) => <div className="resource-row" key={r[0]}>{r.map((v, i) => <span key={i} className={i === 4 && v === 'Watch' ? 'risk' : ''}>{i === 0 && <Users size={14} />}{v}</span>)}</div>)}</div><div className="resource-inspector"><span className="eyebrow">RESOURCE INSPECTOR</span><h2>Shared resource view</h2><p>Structured placeholder for profiles, workload and assignments. Domain calculations arrive in the approved resource phase.</p><div className="inspector-card"><div><span>Visible load</span><strong>62%</strong></div><div><span>Assignments</span><strong>14</strong></div><div><span>Open issues</span><strong>2</strong></div></div><button className="primary-button" onClick={() => action('Open resource profile')}>Open profile</button></div></div><div className="panel-note"><span className="note-icon"><Users size={14} /></span><div><strong>{notice}</strong><span>Resource view is a structured UI-01 placeholder with deterministic sample rows.</span></div></div></section>; }

function CalendarPlaceholder({ action, notice }) { const days = ['Mon 14','Tue 15','Wed 16','Thu 17','Fri 18','Sat 19','Sun 20']; return <section className="placeholder-view"><div className="placeholder-toolbar"><button className="toolbar-button active"><CalendarDays size={15} /> Wall calendar</button><button className="toolbar-button" onClick={() => action('Week range')}><Clock3 size={15} /> Week</button><button className="toolbar-button" onClick={() => action('Month range')}>Month</button><span className="range-label">September 2026 <ChevronDown size={13} /></span></div><div className="calendar-board"><div className="calendar-side"><span className="eyebrow">SHARED TIMELINE</span><h2>September</h2><p>Orion, Atlas and Delta in one continuous wall view.</p><div className="calendar-key"><span><i className="key-dot blue" /> Planned</span><span><i className="key-dot amber" /> At risk</span><span><i className="key-dot green" /> Complete</span></div></div><div className="week-grid">{days.map((day) => <div className="calendar-day" key={day}><div className="day-title">{day}</div><div className="calendar-event blue" style={{ top: '68px', height: '54px' }}><strong>Architecture</strong><span>Orion Program</span></div><div className="calendar-event amber" style={{ top: '154px', height: '64px' }}><strong>Build</strong><span>Atlas Program</span></div><div className="calendar-event green" style={{ top: '246px', height: '42px' }}><strong>Feasibility</strong><span>Complete</span></div>{day === 'Fri 18' && <div className="calendar-milestone" style={{ top: '322px' }}><Gauge size={13} /> Publish milestone</div>}</div>)}</div></div><div className="panel-note"><span className="note-icon"><CalendarDays size={14} /></span><div><strong>{notice}</strong><span>Wall-calendar projection is ready for visual review; editing semantics remain outside P02.</span></div></div></section>; }

createRoot(document.getElementById('root')).render(<App />);
