// Minimal, consistent stroke-icon set for NOVA. All icons: 20x20 viewbox, currentColor.
const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const IconDashboard = (p) => (
  <svg {...base} {...p}><rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/></svg>
)
export const IconTasks = (p) => (
  <svg {...base} {...p}><path d="M9 11l2 2 4-4"/><rect x="3" y="3" width="18" height="18" rx="4"/></svg>
)
export const IconGoals = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>
)
export const IconNotes = (p) => (
  <svg {...base} {...p}><path d="M4 4h13l3 3v13H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>
)
export const IconCalendar = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>
)
export const IconInsights = (p) => (
  <svg {...base} {...p}><path d="M4 19V9M11 19V4M18 19v-6"/></svg>
)
export const IconSettings = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.6V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.6 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.6 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.6 1z"/></svg>
)
export const IconProfile = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6"/></svg>
)
export const IconLogout = (p) => (
  <svg {...base} {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>
)
export const IconPlus = (p) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14"/></svg>
)
export const IconSearch = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
)
export const IconFilter = (p) => (
  <svg {...base} {...p}><path d="M4 5h16M7 12h10M10 19h4"/></svg>
)
export const IconBell = (p) => (
  <svg {...base} {...p}><path d="M6 8a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 004 0"/></svg>
)
export const IconChevronLeft = (p) => (<svg {...base} {...p}><path d="M15 18l-6-6 6-6"/></svg>)
export const IconChevronRight = (p) => (<svg {...base} {...p}><path d="M9 18l6-6-6-6"/></svg>)
export const IconCheck = (p) => (<svg {...base} {...p}><path d="M20 6L9 17l-5-5"/></svg>)
export const IconMore = (p) => (<svg {...base} {...p}><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>)
export const IconTrash = (p) => (<svg {...base} {...p}><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"/></svg>)
export const IconEdit = (p) => (<svg {...base} {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>)
export const IconGoogle = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...p}>
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.4H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z"/>
    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.3 21.4 7.3 24 12 24z"/>
    <path fill="#FBBC05" d="M5.4 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.6.4-2.4V6.5H1.4A12 12 0 000 12c0 1.9.5 3.8 1.4 5.5z"/>
    <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.3 0 3.3 2.6 1.4 6.5l4 3.1c.9-2.8 3.5-4.8 6.6-4.8z"/>
  </svg>
)
export const IconApple = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M16.4 1c.1 1.2-.4 2.4-1.1 3.3-.7.9-2 1.6-3.1 1.5-.1-1.2.5-2.5 1.2-3.3C14.1 1.6 15.3 1 16.4 1zM20 17.3c-.6 1.3-.9 1.9-1.7 3-1.1 1.6-2.6 3.6-4.6 3.6-1.7 0-2.1-1.1-4.4-1.1-2.2 0-2.7 1.1-4.4 1.1-2 0-3.4-1.8-4.5-3.4C-2.2 16.9-1.4 10 3 7.6c1.2-.7 2.5-1.1 3.7-.1.7.6 2.9-.5 3.5-.5.6 0 1.5.5 2.8.5 1.1 0 2-.4 3-.5 1.3-.1 2.6.3 3.6 1.1-3.1 1.9-2.6 6.4.4 9.2z"/></svg>
)
export const IconClose = (p) => (<svg {...base} {...p}><path d="M18 6L6 18M6 6l12 12"/></svg>)
export const IconClock = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>)
export const IconFlame = (p) => (<svg {...base} {...p}><path d="M12 2c1 4-4 5-4 9a4 4 0 008 0c0-1-.5-2-1-3 2 1 3 3 3 5a6 6 0 01-12 0c0-5 4-6 6-11z"/></svg>)
