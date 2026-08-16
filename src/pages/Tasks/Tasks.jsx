import { useMemo, useState } from 'react'
import Card from '../../components/Card/Card'
import Badge from '../../components/Badge/Badge'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import EmptyState from '../../components/EmptyState/EmptyState'
import { SkeletonCard } from '../../components/Skeleton/Skeleton'
import { IconSearch, IconFilter, IconPlus, IconCheck, IconMore, IconEdit, IconTrash, IconTasks } from '../../components/Icons/Icons'
import { useAuth } from '../../context/AuthContext'
import { useQuickAdd } from '../../context/QuickAddContext'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { updateItem, deleteItem } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import styles from './Tasks.module.css'

const TABS = ['All', 'Today', 'Upcoming', 'Completed']

function isToday(dateStr) {
  if (!dateStr) return false
  const today = new Date().toISOString().slice(0, 10)
  return dateStr === today
}

export default function Tasks() {
  const { user } = useAuth()
  const { openCreate } = useQuickAdd()
  const { showToast } = useToast()
  const { items: tasks, loading } = useFirestoreCollection('tasks')
  const [tab, setTab] = useState('All')
  const [search, setSearch] = useState('')
  const [menuOpenId, setMenuOpenId] = useState(null)

  const filtered = useMemo(() => {
    let list = tasks
    if (tab === 'Today') list = list.filter((t) => isToday(t.dueDate) && !t.completed)
    if (tab === 'Upcoming') list = list.filter((t) => !isToday(t.dueDate) && !t.completed)
    if (tab === 'Completed') list = list.filter((t) => t.completed)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((t) => t.title?.toLowerCase().includes(q) || t.category?.toLowerCase().includes(q))
    }
    return list
  }, [tasks, tab, search])

  const today = filtered.filter((t) => isToday(t.dueDate) && !t.completed)
  const upcoming = filtered.filter((t) => !isToday(t.dueDate) && !t.completed)
  const completed = filtered.filter((t) => t.completed)

  const completedTotal = tasks.filter((t) => t.completed).length
  const overdue = tasks.filter((t) => !t.completed && t.dueDate && t.dueDate < new Date().toISOString().slice(0, 10)).length

  const toggle = async (task) => {
    try {
      await updateItem(user.uid, 'tasks', task.id, { completed: !task.completed })
    } catch {
      showToast('Unable to update task.', { type: 'error' })
    }
  }

  const remove = async (task) => {
    try {
      await deleteItem(user.uid, 'tasks', task.id)
      showToast('Task deleted.', { type: 'success' })
    } catch {
      showToast('Unable to delete task.', { type: 'error' })
    } finally {
      setMenuOpenId(null)
    }
  }

  const renderTask = (task) => (
    <li key={task.id} className={styles.taskRow}>
      <button
        className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
        onClick={() => toggle(task)}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed && <IconCheck width={12} height={12} />}
      </button>
      <div className={styles.taskInfo}>
        <span className={`${styles.taskTitle} ${task.completed ? styles.taskDone : ''}`}>{task.title}</span>
        <div className={styles.taskMeta}>
          {task.category && <Badge tone={task.category.toLowerCase()}>{task.category}</Badge>}
          {(task.dueDate || task.dueTime) && (
            <span className={styles.taskTime}>{task.dueDate} {task.dueTime}</span>
          )}
        </div>
      </div>
      {task.priority && <Badge tone={task.priority.toLowerCase()}>{task.priority}</Badge>}
      <div className={styles.menuWrap}>
        <button className={styles.moreBtn} onClick={() => setMenuOpenId(menuOpenId === task.id ? null : task.id)} aria-label="More options">
          <IconMore width={16} height={16} />
        </button>
        {menuOpenId === task.id && (
          <div className={styles.menu}>
            <button onClick={() => { openCreate('task', { item: task }); setMenuOpenId(null) }}><IconEdit width={14} height={14} /> Edit</button>
            <button onClick={() => remove(task)} className={styles.menuDanger}><IconTrash width={14} height={14} /> Delete</button>
          </div>
        )}
      </div>
    </li>
  )

  return (
    <div>
      <div className={styles.controls}>
        <Input icon={<IconSearch width={16} height={16} />} placeholder="Search tasks" value={search} onChange={(e) => setSearch(e.target.value)} containerClassName={styles.searchInput} />
        <Button variant="secondary" icon={<IconFilter width={16} height={16} />}>Filter</Button>
        <Button icon={<IconPlus width={16} height={16} />} onClick={() => openCreate('task')}>Add Task</Button>
      </div>

      <div className={styles.tabs}>
        {TABS.map((t) => (
          <button key={t} className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <div className={styles.summary}>
        <span><strong>{tasks.length}</strong> Tasks</span>
        <span><strong>{completedTotal}</strong> Completed</span>
        <span><strong>{overdue}</strong> Overdue</span>
      </div>

      {loading ? (
        <div className={styles.skeletonGrid}>{[1,2,3].map((i) => <SkeletonCard key={i} />)}</div>
      ) : tasks.length === 0 ? (
        <Card>
          <EmptyState icon={<IconTasks width={24} height={24} />} title="No tasks yet." description="Create your first task and start organizing your day." actionLabel="Create Task" onAction={() => openCreate('task')} />
        </Card>
      ) : (
        <div className={styles.sections}>
          {(tab === 'All' || tab === 'Today') && today.length > 0 && (
            <Card>
              <h3 className={styles.sectionTitle}>Today</h3>
              <ul className={styles.list}>{today.map(renderTask)}</ul>
            </Card>
          )}
          {(tab === 'All' || tab === 'Upcoming') && upcoming.length > 0 && (
            <Card>
              <h3 className={styles.sectionTitle}>Upcoming</h3>
              <ul className={styles.list}>{upcoming.map(renderTask)}</ul>
            </Card>
          )}
          {(tab === 'All' || tab === 'Completed') && completed.length > 0 && (
            <Card>
              <h3 className={styles.sectionTitle}>Completed</h3>
              <ul className={styles.list}>{completed.map(renderTask)}</ul>
            </Card>
          )}
          {today.length === 0 && upcoming.length === 0 && completed.length === 0 && (
            <Card><EmptyState title="No matching tasks." description="Try a different search or filter." /></Card>
          )}
        </div>
      )}
    </div>
  )
}
