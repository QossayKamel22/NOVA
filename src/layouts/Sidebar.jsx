import { NavLink } from 'react-router-dom'
import Logo from '../components/Logo/Logo'
import Avatar from '../components/Avatar/Avatar'
import { useAuth } from '../context/AuthContext'
import { logout } from '../firebase/auth'
import { useToast } from '../context/ToastContext'
import { useNavigate } from 'react-router-dom'
import {
  IconDashboard, IconTasks, IconGoals, IconNotes, IconCalendar, IconInsights,
  IconSettings, IconProfile, IconLogout,
} from '../components/Icons/Icons'
import styles from './Sidebar.module.css'

const primaryNav = [
  { to: '/dashboard', label: 'Dashboard', icon: IconDashboard },
  { to: '/tasks', label: 'Tasks', icon: IconTasks },
  { to: '/goals', label: 'Goals', icon: IconGoals },
  { to: '/notes', label: 'Notes', icon: IconNotes },
  { to: '/calendar', label: 'Calendar', icon: IconCalendar },
  { to: '/insights', label: 'Insights', icon: IconInsights },
]

export default function Sidebar() {
  const { user, profile } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch {
      showToast('Unable to log out. Please try again.', { type: 'error' })
    }
  }

  const displayName = profile?.displayName || user?.displayName || 'NOVA User'

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <Logo size={30} />
      </div>

      <nav className={styles.nav} aria-label="Primary">
        {primaryNav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <Icon width={18} height={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.bottom}>
        <NavLink to="/settings" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <IconSettings width={18} height={18} />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <IconProfile width={18} height={18} />
          <span>Profile</span>
        </NavLink>
        <button className={styles.navItem} onClick={handleLogout}>
          <IconLogout width={18} height={18} />
          <span>Log out</span>
        </button>

        <div className={styles.userCard}>
          <Avatar name={displayName} src={profile?.photoURL} size={38} />
          <div className={styles.userInfo}>
            <span className={styles.userName}>{displayName}</span>
            <span className={styles.userPlan}>{profile?.plan || 'Premium Plan'}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
