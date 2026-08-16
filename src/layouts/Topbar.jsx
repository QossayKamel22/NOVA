import { IconBell, IconPlus } from '../components/Icons/Icons'
import styles from './Topbar.module.css'

export default function Topbar({ title, subtitle, onQuickAdd }) {
  return (
    <div className={styles.bar}>
      <div>
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Notifications">
          <IconBell width={19} height={19} />
        </button>
        <button className={styles.addBtn} onClick={onQuickAdd} aria-label="Quick add">
          <IconPlus width={18} height={18} />
        </button>
      </div>
    </div>
  )
}
