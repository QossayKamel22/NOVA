// Per-route title/subtitle for the app shell topbar, keyed by pathname.
// App.jsx uses a plain BrowserRouter (not a data router), so this can't
// live on <Route handle> / be read via useMatches() — see AppLayout.jsx.
export const PAGE_META = {
  '/tasks': { title: 'Tasks', subtitle: 'Stay on top of your tasks and get things done.' },
  '/goals': { title: 'Goals', subtitle: 'Track your progress and achieve more.' },
  '/notes': { title: 'Notes', subtitle: 'Capture ideas and important information.' },
  '/calendar': { title: 'Calendar', subtitle: 'Plan your schedule and never miss a deadline.' },
  '/insights': { title: 'Insights', subtitle: 'Deep insights into your productivity and progress.' },
  '/profile': { title: 'Profile', subtitle: 'Your account at a glance.' },
  '/settings': { title: 'Settings', subtitle: 'Manage your account and preferences.' },
}
