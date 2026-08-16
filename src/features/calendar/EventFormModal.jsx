import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { EVENT_CATEGORIES } from '../../constants/options'
import { useAuth } from '../../context/AuthContext'
import { addItem, updateItem } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import styles from '../shared/FormModal.module.css'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

const emptyForm = { title: '', description: '', date: todayISO(), startTime: '09:00', endTime: '10:00', category: 'Work' }

export default function EventFormModal({ open, onClose, event, defaultDate }) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || '', description: event.description || '', date: event.date || todayISO(),
        startTime: event.startTime || '09:00', endTime: event.endTime || '10:00', category: event.category || 'Work',
      })
    } else {
      setForm({ ...emptyForm, date: defaultDate || todayISO() })
    }
  }, [event, open, defaultDate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setSaving(true)
    try {
      if (event) {
        await updateItem(user.uid, 'events', event.id, { ...form })
        showToast('Event updated.', { type: 'success' })
      } else {
        await addItem(user.uid, 'events', { ...form })
        showToast('Event created.', { type: 'success' })
      }
      onClose()
    } catch {
      showToast('Your changes couldn’t be saved. Please try again.', { type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={event ? 'Edit event' : 'New event'} subtitle="Schedule an event on your calendar.">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Event title" placeholder="e.g. Product review" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} required autoFocus />

        <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />

        <div className={styles.row}>
          <Input label="Start time" type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
          <Input label="End time" type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <select className={styles.select} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {EVENT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description (optional)</label>
          <textarea className={styles.textarea} rows={2} value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={saving}>{event ? 'Save changes' : 'Create event'}</Button>
        </div>
      </form>
    </Modal>
  )
}
