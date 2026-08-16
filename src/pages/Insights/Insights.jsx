import Card from '../../components/Card/Card'
import EmptyState from '../../components/EmptyState/EmptyState'
import Skeleton from '../../components/Skeleton/Skeleton'
import { IconInsights } from '../../components/Icons/Icons'
import { useInsightsData } from '../../hooks/useInsightsData'
import { WeeklyTrendChart, PriorityBarChart, StatusPieChart, CategoryBarChart } from '../../features/insights/Charts'
import styles from './Insights.module.css'

export default function Insights() {
  const {
    loading, error, hasData,
    totalTasks, completedTasks, overdueTasks, completionRate,
    priorityData, categoryData, statusData, weeklyTrend,
    goalsCount, goalsProgress,
  } = useInsightsData()

  const stats = [
    { label: 'Tasks Completed', value: completedTasks, sub: `of ${totalTasks} total` },
    { label: 'Completion Rate', value: `${completionRate}%`, sub: `${completedTasks} of ${totalTasks} done` },
    { label: 'Goals Progress', value: `${goalsProgress}%`, sub: `${goalsCount} goal${goalsCount === 1 ? '' : 's'}` },
    { label: 'Overdue Tasks', value: overdueTasks, sub: overdueTasks ? 'needs attention' : 'all caught up', warn: overdueTasks > 0 },
  ]

  if (error) {
    return (
      <Card>
        <EmptyState
          icon={<IconInsights width={24} height={24} />}
          title="Unable to load insights."
          description="Something went wrong loading your productivity data. Please try again shortly."
        />
      </Card>
    )
  }

  if (loading) {
    return (
      <div>
        <div className={styles.statsGrid}>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className={styles.statCard}>
              <Skeleton width="60%" height={13} />
              <Skeleton width="40%" height={24} />
            </Card>
          ))}
        </div>
        <div className={styles.chartGrid}>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className={styles.chartCard}>
              <Skeleton width="40%" height={15} />
              <Skeleton width="100%" height={200} radius={12} />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!hasData) {
    return (
      <Card>
        <EmptyState
          icon={<IconInsights width={24} height={24} />}
          title="No insights yet."
          description="Create tasks and goals to see your productivity trends here."
        />
      </Card>
    )
  }

  return (
    <div>
      <div className={styles.statsGrid}>
        {stats.map((s) => (
          <Card key={s.label} className={styles.statCard}>
            <span className={styles.statLabel}>{s.label}</span>
            <div className={styles.statRow}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={`${styles.statDelta} ${s.warn ? styles.statDeltaWarn : ''}`}>{s.sub}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.chartGrid}>
        <Card className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Productivity Trend</h3>
          <div className={styles.chartBox}><WeeklyTrendChart data={weeklyTrend} /></div>
        </Card>
        <Card className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Tasks by Priority</h3>
          <div className={styles.chartBox}><PriorityBarChart data={priorityData} /></div>
        </Card>
        <Card className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Task Status Breakdown</h3>
          <div className={styles.chartBox}>
            {statusData.length > 0 ? (
              <StatusPieChart data={statusData} />
            ) : (
              <EmptyState title="No tasks yet." description="Task status will appear here once you add tasks." />
            )}
          </div>
        </Card>
        <Card className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Top Categories</h3>
          <div className={styles.chartBox}><CategoryBarChart data={categoryData} /></div>
        </Card>
      </div>
    </div>
  )
}
