import Logo from '../Logo/Logo'
import styles from './PageLoader.module.css'

export default function PageLoader() {
  return (
    <div className={styles.wrap}>
      <div className={styles.pulse}><Logo withWordmark={false} size={40} /></div>
    </div>
  )
}
