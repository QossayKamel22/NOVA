import { Link } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import Button from '../../components/Button/Button'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <Logo size={38} />
      <h1 className={styles.code}>404</h1>
      <p className={styles.text}>This page doesn’t exist. Let’s get you back on track.</p>
      <Link to="/"><Button>Back to NOVA</Button></Link>
    </div>
  )
}
