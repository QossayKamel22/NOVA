import Card from '../../components/Card/Card'
import Avatar from '../../components/Avatar/Avatar'
import { ProgressBar } from '../../components/ProgressBar/ProgressBar'
import { IconFlame } from '../../components/Icons/Icons'
import { useAuth } from '../../context/AuthContext'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import styles from './Profile.module.css'

const activity = [
  { label: 'Completed “Finish landing page design”', time: '2 hours ago' },
  { label: 'Updated goal “Build Portfolio Website” to 72%', time: 'Yesterday' },
  { label: 'Added note “Website Redesign Ideas”', time: '2 days ago' },
  { label: 'Completed “Reply to emails”', time: '3 days ago' },
]

export default function Profile() {
  const { user, profile } = useAuth()
  const { items: tasks } = useFirestoreCollection('tasks')
  const { items: goals } = useFirestoreCollection('goals')

  const displayName = profile?.displayName || user?.displayName || 'NOVA User'
  const completedTasks = tasks.filter((t) => t.completed).length
  const achievedGoals = goals.filter((g) => (g.progress || 0) >= 100).length

  const stats = [
    { label: 'Projects', value: 24 },
    { label: 'Tasks Completed', value: completedTasks || 128 },
    { label: 'Goals Achieved', value: achievedGoals || 12 },
  ]

  return (
    <div>
      <Card className={styles.header}>
        <Avatar name={displayName} src={profile?.photoURL} size={84} />
        <div>
          <h2 className={styles.name}>{displayName}</h2>
          <p className={styles.email}>{profile?.email || user?.email}</p>
          <span className={styles.plan}>{profile?.plan || 'Premium Plan'}</span>
        </div>
      </Card>

      <div className={styles.statsRow}>
        {stats.map((s) => (
          <Card key={s.label} className={styles.statCard}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </Card>
        ))}
      </div>

      <Card className={styles.overview}>
        <h3 className={styles.sectionTitle}>Activity Overview</h3>
        <div className={styles.overviewGrid}>
          <div>
            <div className={styles.overviewLabel}>Tasks Completed</div>
            <ProgressBar value={Math.min(100, (completedTasks || 18) * 4)} tone="accent" />
          </div>
          <div>
            <div className={styles.overviewLabel}>Focus Time</div>
            <ProgressBar value={72} tone="blue" />
          </div>
          <div>
            <div className={styles.overviewLabel}>Productivity</div>
            <ProgressBar value={78} tone="green" />
          </div>
          <div className={styles.streak}>
            <IconFlame width={22} height={22} />
            <div>
              <div className={styles.streakValue}>12 days</div>
              <div className={styles.overviewLabel}>Current streak</div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className={styles.sectionTitle}>Recent Activity</h3>
        <ul className={styles.activityList}>
          {activity.map((a) => (
            <li key={a.label} className={styles.activityRow}>
              <span className={styles.activityDot} />
              <div>
                <div className={styles.activityLabel}>{a.label}</div>
                <div className={styles.activityTime}>{a.time}</div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
