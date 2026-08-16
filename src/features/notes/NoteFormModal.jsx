import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { NOTE_CATEGORIES, NOTE_COLORS } from '../../constants/options'
import { useAuth } from '../../context/AuthContext'
import { addItem, updateItem } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import styles from '../shared/FormModal.module.css'

const empty = { title: '', content: '', category: 'Ideas', color: 'blue' }

export default function NoteFormModal({ open, onClose, note }) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setForm(note ? {
      title: note.title || '', content: note.content || '',
      category: note.category || 'Ideas', color: note.color || 'blue',
    } : empty)
  }, [note, open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setSaving(true)
    try {
      if (note) {
        await updateItem(user.uid, 'notes', note.id, { ...form })
        showToast('Note updated.', { type: 'success' })
      } else {
        await addItem(user.uid, 'notes', { ...form })
        showToast('Note created.', { type: 'success' })
      }
      onClose()
    } catch {
      showToast('Your changes couldn’t be saved. Please try again.', { type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={note ? 'Edit note' : 'New note'} subtitle="Write down your ideas and notes.">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Title" placeholder="e.g. Website Redesign Ideas" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} required autoFocus />

        <div className={styles.field}>
          <label className={styles.label}>Content</label>
          <textarea className={styles.textarea} rows={5} value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })} />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <select className={styles.select} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {NOTE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Color</label>
            <select className={styles.select} value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}>
              {NOTE_COLORS.map((c) => <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={saving}>{note ? 'Save changes' : 'Create note'}</Button>
        </div>
      </form>
    </Modal>
  )
}
