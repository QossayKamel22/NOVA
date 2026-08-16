import Card from '../../components/Card/Card'
import { WeeklyTrendChart, PriorityBarChart, FocusPieChart, CategoryBarChart } from '../../features/insights/Charts'
import styles from './Insights.module.css'

const stats = [
  { label: 'Tasks Completed', value: '24', delta: '+12%' },
  { label: 'Focus Time', value: '18h 42m', delta: '+8%' },
  { label: 'Productivity', value: '78%', delta: '+15%' },
  { label: 'Goals Progress', value: '62%', delta: '+10%' },
]

export default function Insights() {
  return (
    <div>
      <div className={styles.statsGrid}>
        {stats.map((s) => (
          <Card key={s.label} className={styles.statCard}>
            <span className={styles.statLabel}>{s.label}</span>
            <div className={styles.statRow}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statDelta}>{s.delta}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.chartGrid}>
        <Card className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Productivity Trend</h3>
          <div className={styles.chartBox}><WeeklyTrendChart /></div>
        </Card>
        <Card className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Tasks by Priority</h3>
          <div className={styles.chartBox}><PriorityBarChart /></div>
        </Card>
        <Card className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Focus Time Breakdown</h3>
          <div className={styles.chartBox}><FocusPieChart /></div>
        </Card>
        <Card className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Top Categories</h3>
          <div className={styles.chartBox}><CategoryBarChart /></div>
        </Card>
      </div>
    </div>
  )
}
