import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { TASK_CATEGORIES, PRIORITIES } from '../../constants/options'
import { useAuth } from '../../context/AuthContext'
import { addItem, updateItem } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import styles from '../shared/FormModal.module.css'

const empty = { title: '', category: 'Work', priority: 'Medium', dueDate: '', dueTime: '', description: '' }

export default function TaskFormModal({ open, onClose, task }) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        category: task.category || 'Work',
        priority: task.priority || 'Medium',
        dueDate: task.dueDate || '',
        dueTime: task.dueTime || '',
        description: task.description || '',
      })
    } else {
      setForm(empty)
    }
  }, [task, open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setSaving(true)
    try {
      if (task) {
        await updateItem(user.uid, 'tasks', task.id, { ...form })
        showToast('Task updated.', { type: 'success' })
      } else {
        await addItem(user.uid, 'tasks', { ...form, completed: false })
        showToast('Task created.', { type: 'success' })
      }
      onClose()
    } catch {
      showToast('Your changes couldn’t be saved. Please try again.', { type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={task ? 'Edit task' : 'New task'} subtitle="Add a task to your list and get things done.">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Task title" placeholder="e.g. Finish landing page design" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} required autoFocus />

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <select className={styles.select} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {TASK_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Priority</label>
            <select className={styles.select} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <Input label="Due date" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          <Input label="Time" type="time" value={form.dueTime} onChange={(e) => setForm({ ...form, dueTime: e.target.value })} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description (optional)</label>
          <textarea className={styles.textarea} rows={3} value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={saving}>{task ? 'Save changes' : 'Create task'}</Button>
        </div>
      </form>
    </Modal>
  )
}
