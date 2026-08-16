import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { IconGoogle, IconApple } from '../../components/Icons/Icons'
import { loginWithEmail, loginWithGoogle, loginWithApple, resetPassword } from '../../firebase/auth'
import { useToast } from '../../context/ToastContext'
import styles from '../shared/Auth.module.css'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useToast()
  const [form, setForm] = useState({ email: '', password: '' })
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState('')
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginWithEmail(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSocial = async (provider) => {
    setSocialLoading(provider)
    setError('')
    try {
      if (provider === 'google') await loginWithGoogle()
      else await loginWithApple()
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setSocialLoading('')
    }
  }

  const handleForgotPassword = async () => {
    if (!form.email) {
      setError('Enter your email above first, then click “Forgot password?”')
      return
    }
    try {
      await resetPassword(form.email)
      showToast('Password reset email sent.', { type: 'success' })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.promo}>
        <Logo size={32} dark withTagline />
        <div className={styles.promoContent}>
          <h2 className={styles.promoTitle}>Welcome back to your command center.</h2>
          <p className={styles.promoDesc}>Pick up right where you left off — your tasks, goals and notes are exactly as you left them.</p>
        </div>
        <div className={styles.promoBlobA} />
        <div className={styles.promoBlobB} />
      </div>

      <div className={styles.formSide}>
        <div className={styles.formWrap}>
          <div className={styles.mobileLogo}><Logo size={28} /></div>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to your account</p>

          <div className={styles.socialRow}>
            <Button variant="secondary" onClick={() => handleSocial('google')} loading={socialLoading === 'google'} icon={<IconGoogle />}>
              Continue with Google
            </Button>
            <Button variant="secondary" onClick={() => handleSocial('apple')} loading={socialLoading === 'apple'} icon={<IconApple />}>
              Continue with Apple
            </Button>
          </div>

          <div className={styles.divider}><span>or</span></div>

          {error && <div className={styles.errorBanner} role="alert">{error}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <Input label="Email" type="email" placeholder="you@example.com" required
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input label="Password" type="password" placeholder="••••••••" required
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

            <div className={styles.rowBetween}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember me
              </label>
              <button type="button" className={styles.link} onClick={handleForgotPassword}>Forgot password?</button>
            </div>

            <Button type="submit" size="lg" loading={loading} className={styles.submit}>Sign in</Button>
          </form>

          <p className={styles.footerText}>
            Don’t have an account? <Link to="/register" className={styles.link}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
