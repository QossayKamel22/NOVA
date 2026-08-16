import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import PageLoader from './components/PageLoader/PageLoader'
import { ProtectedRoute, GuestOnlyRoute } from './components/ProtectedRoute'
import AppLayout from './layouts/AppLayout'
import { QuickAddProvider } from './context/QuickAddContext'

const Landing = lazy(() => import('./pages/Landing/Landing'))
const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const Tasks = lazy(() => import('./pages/Tasks/Tasks'))
const Goals = lazy(() => import('./pages/Goals/Goals'))
const Notes = lazy(() => import('./pages/Notes/Notes'))
const Calendar = lazy(() => import('./pages/Calendar/Calendar'))
const Insights = lazy(() => import('./pages/Insights/Insights'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const Settings = lazy(() => import('./pages/Settings/Settings'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

function Protected() {
  return (
    <ProtectedRoute>
      <QuickAddProvider>
        <AppLayout />
      </QuickAddProvider>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<GuestOnlyRoute><Login /></GuestOnlyRoute>} />
          <Route path="/register" element={<GuestOnlyRoute><Register /></GuestOnlyRoute>} />

          <Route element={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} handle={{ title: 'Tasks', subtitle: 'Stay on top of your tasks and get things done.' }} />
            <Route path="/goals" element={<Goals />} handle={{ title: 'Goals', subtitle: 'Track your progress and achieve more.' }} />
            <Route path="/notes" element={<Notes />} handle={{ title: 'Notes', subtitle: 'Capture ideas and important information.' }} />
            <Route path="/calendar" element={<Calendar />} handle={{ title: 'Calendar', subtitle: 'Plan your schedule and never miss a deadline.' }} />
            <Route path="/insights" element={<Insights />} handle={{ title: 'Insights', subtitle: 'Deep insights into your productivity and progress.' }} />
            <Route path="/profile" element={<Profile />} handle={{ title: 'Profile', subtitle: 'Your account at a glance.' }} />
            <Route path="/settings" element={<Settings />} handle={{ title: 'Settings', subtitle: 'Manage your account and preferences.' }} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
