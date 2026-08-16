import { NavLink } from 'react-router-dom'
import { IconDashboard, IconTasks, IconGoals, IconProfile, IconPlus } from '../components/Icons/Icons'
import styles from './MobileNav.module.css'

export default function MobileNav({ onQuickAdd }) {
  return (
    <nav className={styles.nav} aria-label="Primary mobile">
      <NavLink to="/dashboard" className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}>
        <IconDashboard width={20} height={20} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/tasks" className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}>
        <IconTasks width={20} height={20} />
        <span>Tasks</span>
      </NavLink>
      <button className={styles.center} onClick={onQuickAdd} aria-label="Quick add">
        <IconPlus width={22} height={22} />
      </button>
      <NavLink to="/goals" className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}>
        <IconGoals width={20} height={20} />
        <span>Goals</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}>
        <IconProfile width={20} height={20} />
        <span>Profile</span>
      </NavLink>
    </nav>
  )
}
