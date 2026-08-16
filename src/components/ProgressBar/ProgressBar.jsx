import styles from './ProgressBar.module.css'

export function ProgressBar({ value = 0, tone = 'accent', label, size = 'md' }) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={styles.wrap}>
      {label && (
        <div className={styles.labelRow}>
          <span>{label}</span>
          <span className={styles.value}>{clamped}%</span>
        </div>
      )}
      <div className={`${styles.track} ${styles[size]}`} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div className={`${styles.fill} ${styles[tone]}`} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}

export function CircularProgress({ value = 0, size = 56, stroke = 5, tone = 'accent' }) {
  const clamped = Math.min(100, Math.max(0, value))
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference
  const colorVar = tone === 'green' ? 'var(--green)' : tone === 'orange' ? 'var(--orange)' : 'var(--accent)'
  return (
    <div className={styles.circleWrap} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--border)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colorVar}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 400ms var(--ease)' }}
        />
      </svg>
      <span className={styles.circleLabel}>{clamped}%</span>
    </div>
  )
}
