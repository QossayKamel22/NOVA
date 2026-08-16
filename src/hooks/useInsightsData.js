import { useMemo } from 'react'
import { useFirestoreCollection } from './useFirestoreCollection'
import { TASK_CATEGORIES, PRIORITIES } from '../constants/options'

const PRIORITY_COLORS = { High: '#EF4444', Medium: '#F59E0B', Low: '#22C55E' }
const STATUS_COLORS = { Completed: '#22C55E', Pending: '#3B82F6', Overdue: '#EF4444' }

function toDate(value) {
  if (!value) return null
  if (typeof value.toDate === 'function') return value.toDate()
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

// Pure derivation so pages that already hold tasks/goals (e.g. Dashboard) can
// reuse it without opening a second set of Firestore listeners.
export function computeInsights(tasks, goals) {
  const today = todayStr()
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const overdueTasks = tasks.filter((t) => !t.completed && t.dueDate && t.dueDate < today).length
  const pendingTasks = totalTasks - completedTasks - overdueTasks
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0

  const priorityData = PRIORITIES.map((name) => ({
    name,
    value: tasks.filter((t) => t.priority === name).length,
    color: PRIORITY_COLORS[name],
  }))

  const categoryData = TASK_CATEGORIES
    .map((category) => ({ category, count: tasks.filter((t) => t.category === category).length }))
    .sort((a, b) => b.count - a.count)

  const statusData = [
    { name: 'Completed', value: completedTasks, color: STATUS_COLORS.Completed },
    { name: 'Pending', value: pendingTasks, color: STATUS_COLORS.Pending },
    { name: 'Overdue', value: overdueTasks, color: STATUS_COLORS.Overdue },
  ].filter((d) => d.value > 0)

  const weeklyTrend = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() - (6 - i))
    const value = tasks.filter((t) => {
      if (!t.completed) return false
      const done = toDate(t.updatedAt)
      return done && done.toDateString() === d.toDateString()
    }).length
    return { day: d.toLocaleDateString(undefined, { weekday: 'short' }), value }
  })

  const activeGoals = goals.filter((g) => g.status !== 'Archived')
  const goalsProgress = activeGoals.length
    ? Math.round(activeGoals.reduce((sum, g) => sum + (g.progress || 0), 0) / activeGoals.length)
    : 0

  return {
    hasData: totalTasks > 0 || goals.length > 0,
    totalTasks,
    completedTasks,
    overdueTasks,
    pendingTasks,
    completionRate,
    priorityData,
    categoryData,
    statusData,
    weeklyTrend,
    goalsCount: goals.length,
    goalsProgress,
  }
}

// Derives every Insights metric from the user's real tasks/goals — no mock data.
export function useInsightsData() {
  const { items: tasks, loading: tasksLoading, error: tasksError } = useFirestoreCollection('tasks')
  const { items: goals, loading: goalsLoading, error: goalsError } = useFirestoreCollection('goals')

  const loading = tasksLoading || goalsLoading
  const error = tasksError || goalsError

  const derived = useMemo(() => computeInsights(tasks, goals), [tasks, goals])

  return { ...derived, loading, error }
}
