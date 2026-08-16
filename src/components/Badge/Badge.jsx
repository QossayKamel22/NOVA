import styles from './Badge.module.css'

// tone: 'design' | 'work' | 'health' | 'ideas' | 'personal' | 'study' | 'high' | 'medium' | 'low' | 'default'
export default function Badge({ children, tone = 'default', dot = false, className = '' }) {
  return (
    <span className={`${styles.badge} ${styles[tone] || styles.default} ${className}`}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  )
}
