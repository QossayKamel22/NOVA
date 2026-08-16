import styles from './Logo.module.css'

export default function Logo({ withWordmark = true, withTagline = false, size = 34, dark = false }) {
  return (
    <div className={styles.wrap}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="nova-mark" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#6366F1" />
            <stop offset="0.55" stopColor="#4F46FF" />
            <stop offset="1" stopColor="#071126" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="18" fill="#071126" />
        <path
          d="M19 45.5V18.5H25.6L39.6 38.2V18.5H45V45.5H38.6L24.4 25.6V45.5H19Z"
          fill="url(#nova-mark)"
        />
      </svg>
      {withWordmark && (
        <div className={styles.text}>
          <span className={`${styles.wordmark} ${dark ? styles.wordmarkDark : ''}`}>NOVA</span>
          {withTagline && <span className={styles.tagline}>Your day. Organized.</span>}
        </div>
      )}
    </div>
  )
}
