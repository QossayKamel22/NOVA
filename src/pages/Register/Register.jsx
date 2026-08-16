import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { IconGoogle, IconApple } from '../../components/Icons/Icons'
import { registerWithEmail, loginWithGoogle, loginWithApple } from '../../firebase/auth'
import styles from '../shared/Auth.module.css'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!agreed) {
      setError('Please agree to the Terms to continue.')
      return
    }
    setLoading(true)
    try {
      await registerWithEmail(form)
      navigate('/dashboard', { replace: true })
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
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setSocialLoading('')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.promo}>
        <Logo size={32} dark withTagline />
        <div className={styles.promoContent}>
          <h2 className={styles.promoTitle}>Build a workspace that thinks the way you do.</h2>
          <p className={styles.promoDesc}>Create your NOVA account and start turning intention into progress today.</p>
        </div>
        <div className={styles.promoBlobA} />
        <div className={styles.promoBlobB} />
      </div>

      <div className={styles.formSide}>
        <div className={styles.formWrap}>
          <div className={styles.mobileLogo}><Logo size={28} /></div>
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.subtitle}>Let’s get you started</p>

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
            <Input label="Full name" placeholder="Qossay Kamel" required
              value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            <Input label="Email" type="email" placeholder="you@example.com" required
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input label="Password" type="password" placeholder="At least 6 characters" required
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Input label="Confirm password" type="password" placeholder="••••••••" required
              value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />

            <label className={styles.terms}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              I agree to NOVA’s Terms of Service and Privacy Policy.
            </label>

            <Button type="submit" size="lg" loading={loading} className={styles.submit}>Create account</Button>
          </form>

          <p className={styles.footerText}>
            Already have an account? <Link to="/login" className={styles.link}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
