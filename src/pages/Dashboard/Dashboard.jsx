import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Badge from '../../components/Badge/Badge'
import { ProgressBar } from '../../components/ProgressBar/ProgressBar'
import Skeleton from '../../components/Skeleton/Skeleton'
import EmptyState from '../../components/EmptyState/EmptyState'
import Topbar from '../../layouts/Topbar'
import { IconTasks, IconGoals, IconNotes, IconInsights, IconCheck } from '../../components/Icons/Icons'
import { useAuth } from '../../context/AuthContext'
import { useQuickAdd } from '../../context/QuickAddContext'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { computeInsights } from '../../hooks/useInsightsData'
import { updateItem } from '../../firebase/firestore'
import { WeeklyTrendChart } from '../../features/insights/Charts'
import styles from './Dashboard.module.css'

function greetingName(profile, user) {
  const name = profile?.displayName || user?.displayName || 'there'
  return name.split(' ')[0]
}

export default function Dashboard() {
  const { user, profile } = useAuth()
  const { openQuickAdd, openCreate } = useQuickAdd()
  const { items: tasks, loading: tasksLoading } = useFirestoreCollection('tasks')
  const { items: goals, loading: goalsLoading } = useFirestoreCollection('goals')
  const { items: notes, loading: notesLoading } = useFirestoreCollection('notes')

  const todayTasks = useMemo(() => tasks.filter((t) => !t.completed).slice(0, 4), [tasks])
  const activeGoals = useMemo(() => goals.filter((g) => g.status !== 'Archived').slice(0, 3), [goals])
  const recentNotes = useMemo(() => notes.slice(0, 3), [notes])
  const insights = useMemo(() => computeInsights(tasks, goals), [tasks, goals])

  const stats = [
    { label: 'Tasks', value: tasks.length || 0, sub: 'Today', icon: IconTasks, tone: 'blue' },
    { label: 'Goals', value: goals.filter((g) => g.status === 'Active').length, sub: 'In progress', icon: IconGoals, tone: 'accent' },
    { label: 'Notes', value: notes.length, sub: 'New notes', icon: IconNotes, tone: 'green' },
    { label: 'Productivity', value: `${insights.completionRate}%`, sub: 'This week', icon: IconInsights, tone: 'orange' },
  ]

  const toggleTask = async (task) => {
    try {
      await updateItem(user.uid, 'tasks', task.id, { completed: !task.completed })
    } catch (e) {
      console.error('[NOVA] Failed to toggle task:', e)
    }
  }

  return (
    <div>
      <Topbar
        title={`Good morning, ${greetingName(profile, user)}. 👋`}
        subtitle="Let's make today productive."
        onQuickAdd={openQuickAdd}
      />

      <div className={styles.statsGrid}>
        {stats.map((s) => (
          <Card key={s.label} className={styles.statCard} hover>
            <div className={`${styles.statIcon} ${styles[s.tone]}`}><s.icon width={18} height={18} /></div>
            <div>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statSub}>{s.sub}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <Card className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Today&apos;s Tasks</h3>
            <Link to="/tasks" className={styles.viewAll}>View all</Link>
          </div>
          {tasksLoading ? (
            <div className={styles.skeletonList}>{[1,2,3].map((i) => <Skeleton key={i} height={52} radius={12} />)}</div>
          ) : todayTasks.length === 0 ? (
            <EmptyState title="No tasks yet." description="Create your first task and start organizing your day." actionLabel="Create Task" onAction={() => openCreate('task')} />
          ) : (
            <ul className={styles.taskList}>
              {todayTasks.map((task) => (
                <li key={task.id} className={styles.taskRow}>
                  <button
                    className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
                    onClick={() => toggleTask(task)}
                    aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {task.completed && <IconCheck width={12} height={12} />}
                  </button>
                  <div className={styles.taskInfo}>
                    <span className={`${styles.taskTitle} ${task.completed ? styles.taskDone : ''}`}>{task.title}</span>
                    <div className={styles.taskMeta}>
                      {task.category && <Badge tone={task.category.toLowerCase()}>{task.category}</Badge>}
                      {task.dueTime && <span className={styles.taskTime}>{task.dueTime}</span>}
                    </div>
                  </div>
                  {task.priority && <Badge tone={task.priority.toLowerCase()}>{task.priority}</Badge>}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Goals</h3>
            <Link to="/goals" className={styles.viewAll}>View all</Link>
          </div>
          {goalsLoading ? (
            <div className={styles.skeletonList}>{[1,2].map((i) => <Skeleton key={i} height={60} radius={12} />)}</div>
          ) : activeGoals.length === 0 ? (
            <EmptyState title="No goals yet." description="Set a goal and track your progress." actionLabel="Create Goal" onAction={() => openCreate('goal')} />
          ) : (
            <ul className={styles.goalList}>
              {activeGoals.map((goal) => (
                <li key={goal.id} className={styles.goalRow}>
                  <div className={styles.goalTop}>
                    <span className={styles.goalTitle}>{goal.title}</span>
                    <span className={styles.goalPct}>{goal.progress || 0}%</span>
                  </div>
                  <ProgressBar value={goal.progress || 0} tone={goal.progress >= 100 ? 'green' : 'accent'} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Quick Notes</h3>
            <Link to="/notes" className={styles.viewAll}>View all</Link>
          </div>
          {notesLoading ? (
            <div className={styles.skeletonList}>{[1,2].map((i) => <Skeleton key={i} height={64} radius={12} />)}</div>
          ) : recentNotes.length === 0 ? (
            <EmptyState title="No notes yet." description="Write down your ideas and notes." actionLabel="Create Note" onAction={() => openCreate('note')} />
          ) : (
            <ul className={styles.noteList}>
              {recentNotes.map((note) => (
                <li key={note.id} className={`${styles.noteCard} ${styles[`note_${note.color || 'blue'}`]}`}>
                  <span className={styles.noteTitle}>{note.title}</span>
                  <p className={styles.notePreview}>{note.content?.slice(0, 60) || 'No content yet.'}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className={`${styles.section} ${styles.insightsCard}`}>
          <div className={styles.sectionHeader}>
            <h3>Insights</h3>
            <Link to="/insights" className={styles.viewAll}>View all</Link>
          </div>
          {tasksLoading || goalsLoading ? (
            <div className={styles.skeletonList}><Skeleton height={140} radius={12} /></div>
          ) : !insights.hasData ? (
            <EmptyState title="No insights yet." description="Create tasks and goals to see your productivity trends here." />
          ) : (
            <>
              <div className={styles.insightStats}>
                <div><span className={styles.insightValue}>{insights.completedTasks}</span><span className={styles.insightLabel}>Tasks Completed</span></div>
                <div><span className={styles.insightValue}>{insights.completionRate}%</span><span className={styles.insightLabel}>Completion Rate</span></div>
                <div><span className={styles.insightValue}>{insights.goalsProgress}%</span><span className={styles.insightLabel}>Goals Progress</span></div>
              </div>
              <div className={styles.chartWrap}>
                <WeeklyTrendChart data={insights.weeklyTrend} />
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
