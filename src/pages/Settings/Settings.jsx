import { useState } from 'react'
import Card from '../../components/Card/Card'
import Avatar from '../../components/Avatar/Avatar'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../context/ToastContext'
import { updateUserDoc } from '../../firebase/firestore'
import { logout } from '../../firebase/auth'
import { useNavigate } from 'react-router-dom'
import styles from './Settings.module.css'

const TABS = ['Profile', 'Preferences', 'Account', 'Security', 'Billing']

export default function Settings() {
  const { user, profile, refreshProfile } = useAuth()
  const { preference, setTheme } = useTheme()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [tab, setTab] = useState('Profile')
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    displayName: profile?.displayName || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
  })
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateUserDoc(user.uid, form)
      await refreshProfile()
      showToast('Profile updated.', { type: 'success' })
    } catch {
      showToast('Your changes couldn’t be saved. Please try again.', { type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    showToast('Account deletion requires re-authentication and is not enabled in this demo.', { type: 'error' })
    setConfirmDelete(false)
  }

  return (
    <div>
      <div className={styles.tabs}>
        {TABS.map((t) => (
          <button key={t} className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'Profile' && (
        <Card>
          <form className={styles.form} onSubmit={handleSaveProfile}>
            <div className={styles.avatarRow}>
              <Avatar name={form.displayName} src={profile?.photoURL} size={64} />
              <div>
                <div className={styles.avatarName}>{form.displayName || 'Your name'}</div>
                <div className={styles.avatarEmail}>{profile?.email || user?.email}</div>
              </div>
            </div>
            <Input label="Full Name" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
            <Input label="Email" value={profile?.email || user?.email || ''} disabled />
            <Input label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <div className={styles.field}>
              <label className={styles.label}>Bio</label>
              <textarea className={styles.textarea} rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </div>
            <div className={styles.actions}>
              <Button type="submit" loading={saving}>Save Changes</Button>
            </div>
          </form>
        </Card>
      )}

      {tab === 'Preferences' && (
        <Card className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Theme</label>
            <div className={styles.themeRow}>
              {['light', 'dark', 'system'].map((t) => (
                <button key={t} className={`${styles.themeChip} ${preference === t ? styles.themeChipActive : ''}`} onClick={() => setTheme(t)}>
                  {t[0].toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Language</label>
            <select className={styles.select} defaultValue="English">
              <option>English</option>
              <option>Arabic</option>
              <option>Spanish</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Notifications</label>
            <label className={styles.switchRow}>
              <input type="checkbox" defaultChecked /> Email notifications
            </label>
            <label className={styles.switchRow}>
              <input type="checkbox" defaultChecked /> Push notifications
            </label>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Timezone</label>
            <select className={styles.select} defaultValue="Asia/Hebron">
              <option value="Asia/Hebron">Asia/Hebron (UTC+3)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York</option>
            </select>
          </div>
        </Card>
      )}

      {tab === 'Account' && (
        <Card className={styles.form}>
          <Input label="Email" value={profile?.email || user?.email || ''} disabled />
          <p className={styles.hintText}>To change your email, please contact support.</p>
          <Button variant="secondary" onClick={async () => { await logout(); navigate('/login') }}>Log out of NOVA</Button>
        </Card>
      )}

      {tab === 'Security' && (
        <Card className={styles.form}>
          <p className={styles.hintText}>Password changes and two-factor authentication are managed through your sign-in provider.</p>
        </Card>
      )}

      {tab === 'Billing' && (
        <Card className={styles.form}>
          <div className={styles.planBox}>
            <div>
              <div className={styles.avatarName}>Premium Plan</div>
              <p className={styles.hintText}>You have access to every NOVA feature.</p>
            </div>
          </div>
        </Card>
      )}

      <Card className={styles.dangerZone}>
        <h3 className={styles.dangerTitle}>Danger Zone</h3>
        <p className={styles.hintText}>Deleting your account permanently removes all your tasks, goals, notes and events. This cannot be undone.</p>
        {!confirmDelete ? (
          <Button variant="danger" onClick={() => setConfirmDelete(true)}>Delete Account</Button>
        ) : (
          <div className={styles.confirmRow}>
            <Button variant="danger" onClick={handleDeleteAccount}>Confirm deletion</Button>
            <Button variant="ghost" onClick={() => setConfirmDelete(false)}>Cancel</Button>
          </div>
        )}
      </Card>
    </div>
  )
}
