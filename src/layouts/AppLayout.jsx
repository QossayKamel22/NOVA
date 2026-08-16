import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import Topbar from './Topbar'
import { useQuickAdd } from '../context/QuickAddContext'
import { PAGE_META } from '../constants/pageMeta'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  const location = useLocation()
  const { openQuickAdd } = useQuickAdd()
  const { title, subtitle } = PAGE_META[location.pathname] || {}

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
