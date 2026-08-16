import styles from './Avatar.module.css'

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('') || 'N'
}

export default function Avatar({ src, name, size = 40, className = '' }) {
  return (
    <div className={`${styles.avatar} ${className}`} style={{ width: size, height: size, fontSize: size * 0.4 }}>
      {src ? <img src={src} alt={name || 'Avatar'} /> : <span>{initials(name)}</span>}
    </div>
  )
}
