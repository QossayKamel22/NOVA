import Button from '../Button/Button'
import styles from './EmptyState.module.css'

export default function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <div className={`${styles.wrap} fade-in`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction} className={styles.action}>{actionLabel}</Button>
      )}
    </div>
  )
}
