import styles from './Card.module.css'

export default function Card({ children, className = '', as: Tag = 'div', padded = true, hover = false, ...rest }) {
  return (
    <Tag className={`${styles.card} ${padded ? styles.padded : ''} ${hover ? styles.hover : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
