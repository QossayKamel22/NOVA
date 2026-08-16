import { useMemo, useState } from 'react'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import EmptyState from '../../components/EmptyState/EmptyState'
import { SkeletonCard } from '../../components/Skeleton/Skeleton'
import { ProgressBar, CircularProgress } from '../../components/ProgressBar/ProgressBar'
import { IconPlus, IconGoals, IconMore, IconEdit, IconTrash, IconCheck } from '../../components/Icons/Icons'
import { useAuth } from '../../context/AuthContext'
import { useQuickAdd } from '../../context/QuickAddContext'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { deleteItem } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import styles from './Goals.module.css'

const TABS = ['All Goals', 'Active', 'Completed', 'Archived']

export default function Goals() {
  const { user } = useAuth()
  const { openCreate } = useQuickAdd()
  const { showToast } = useToast()
  const { items: goals, loading } = useFirestoreCollection('goals')
  const [tab, setTab] = useState('All Goals')
  const [menuOpenId, setMenuOpenId] = useState(null)

  const filtered = useMemo(() => {
    if (tab === 'All Goals') return goals
    return goals.filter((g) => (g.status || 'Active') === tab.replace(' Goals', ''))
  }, [goals, tab])

  const remove = async (goal) => {
    try {
      await deleteItem(user.uid, 'goals', goal.id)
      showToast('Goal deleted.', { type: 'success' })
    } catch {
      showToast('Unable to delete goal.', { type: 'error' })
    } finally {
      setMenuOpenId(null)
    }
  }

  return (
    <div>
      <div className={styles.controls}>
        <div />
        <Button icon={<IconPlus width={16} height={16} />} onClick={() => openCreate('goal')}>New Goal</Button>
      </div>

      <div className={styles.tabs}>
        {TABS.map((t) => (
          <button key={t} className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {loading ? (
        <div className={styles.grid}>{[1,2,3,4].map((i) => <SkeletonCard key={i} />)}</div>
      ) : filtered.length === 0 ? (
        <Card>
          <EmptyState icon={<IconGoals width={24} height={24} />} title="No goals yet." description="Set a new goal and track your progress." actionLabel="New Goal" onAction={() => openCreate('goal')} />
        </Card>
      ) : (
        <div className={styles.grid}>
          {filtered.map((goal) => {
            const complete = (goal.progress || 0) >= 100
            return (
              <Card key={goal.id} className={`${styles.card} ${complete ? styles.cardComplete : ''}`} hover>
                <div className={styles.cardTop}>
                  <div>
                    <h3 className={styles.goalTitle}>{goal.title}</h3>
                    {goal.dueDate && <span className={styles.dueDate}>Due {goal.dueDate}</span>}
                  </div>
                  <div className={styles.menuWrap}>
                    <button className={styles.moreBtn} onClick={() => setMenuOpenId(menuOpenId === goal.id ? null : goal.id)} aria-label="More options">
                      <IconMore width={16} height={16} />
                    </button>
                    {menuOpenId === goal.id && (
                      <div className={styles.menu}>
                        <button onClick={() => { openCreate('goal', { item: goal }); setMenuOpenId(null) }}><IconEdit width={14} height={14} /> Edit</button>
                        <button onClick={() => remove(goal)} className={styles.menuDanger}><IconTrash width={14} height={14} /> Delete</button>
                      </div>
                    )}
                  </div>
                </div>

                {goal.description && <p className={styles.desc}>{goal.description}</p>}

                <div className={styles.progressRow}>
                  <CircularProgress value={goal.progress || 0} tone={complete ? 'green' : 'accent'} />
                  <div className={styles.progressBarWrap}>
                    <ProgressBar value={goal.progress || 0} tone={complete ? 'green' : 'accent'} />
                    <span className={styles.taskCount}>{goal.tasksCompleted || 0} / {goal.tasksTotal || 0} tasks</span>
                  </div>
                </div>

                {complete && (
                  <div className={styles.completeBadge}><IconCheck width={14} height={14} /> Goal completed</div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
