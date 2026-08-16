import { Outlet, useMatches } from 'react-router-dom'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import Topbar from './Topbar'
import { useQuickAdd } from '../context/QuickAddContext'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  const matches = useMatches()
  const { openQuickAdd } = useQuickAdd()
  const current = matches[matches.length - 1]
  const { title, subtitle } = current?.handle || {}

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <div className={`${styles.content} container`}>
          {title && <Topbar title={title} subtitle={subtitle} onQuickAdd={openQuickAdd} />}
          <div className="fade-in">
            <Outlet />
          </div>
        </div>
      </div>
      <MobileNav onQuickAdd={openQuickAdd} />
    </div>
  )
}
