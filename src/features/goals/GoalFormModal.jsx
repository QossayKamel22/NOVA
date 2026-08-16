import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { useAuth } from '../../context/AuthContext'
import { addItem, updateItem } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import styles from '../shared/FormModal.module.css'

const empty = { title: '', description: '', progress: 0, dueDate: '', status: 'Active', tasksCompleted: 0, tasksTotal: 0 }

export default function GoalFormModal({ open, onClose, goal }) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setForm(goal ? {
      title: goal.title || '', description: goal.description || '', progress: goal.progress ?? 0,
      dueDate: goal.dueDate || '', status: goal.status || 'Active',
      tasksCompleted: goal.tasksCompleted ?? 0, tasksTotal: goal.tasksTotal ?? 0,
    } : empty)
  }, [goal, open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setSaving(true)
    try {
      const progress = Math.min(100, Math.max(0, Number(form.progress) || 0))
      const payload = { ...form, progress, status: progress >= 100 ? 'Completed' : form.status }
      if (goal) {
        await updateItem(user.uid, 'goals', goal.id, payload)
        showToast('Goal updated.', { type: 'success' })
      } else {
        await addItem(user.uid, 'goals', payload)
        showToast('Goal created.', { type: 'success' })
      }
      onClose()
    } catch {
      showToast('Your changes couldn’t be saved. Please try again.', { type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={goal ? 'Edit goal' : 'New goal'} subtitle="Set a new goal and track your progress.">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Goal title" placeholder="e.g. Build Portfolio Website" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} required autoFocus />

        <div className={styles.field}>
          <label className={styles.label}>Description (optional)</label>
          <textarea className={styles.textarea} rows={2} value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        <div className={styles.row}>
          <Input label="Progress (%)" type="number" min={0} max={100} value={form.progress}
            onChange={(e) => setForm({ ...form, progress: e.target.value })} />
          <Input label="Due date" type="date" value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        </div>

        <div className={styles.row}>
          <Input label="Tasks completed" type="number" min={0} value={form.tasksCompleted}
            onChange={(e) => setForm({ ...form, tasksCompleted: e.target.value })} />
          <Input label="Tasks total" type="number" min={0} value={form.tasksTotal}
            onChange={(e) => setForm({ ...form, tasksTotal: e.target.value })} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Status</label>
          <select className={styles.select} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={saving}>{goal ? 'Save changes' : 'Create goal'}</Button>
        </div>
      </form>
    </Modal>
  )
}
