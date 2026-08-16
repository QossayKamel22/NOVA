import styles from './Skeleton.module.css'

export default function Skeleton({ width = '100%', height = 16, radius = 8, className = '' }) {
  return (
    <span
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  )
}

export function SkeletonCard() {
  return (
    <div className={styles.card}>
      <Skeleton width={40} height={40} radius={12} />
      <Skeleton width="60%" height={14} />
      <Skeleton width="40%" height={12} />
    </div>
  )
}
