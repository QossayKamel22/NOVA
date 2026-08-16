export const TASK_CATEGORIES = ['Design', 'Work', 'Health', 'Personal', 'Study']
export const PRIORITIES = ['Low', 'Medium', 'High']
export const NOTE_CATEGORIES = ['Ideas', 'Personal', 'Work', 'Study']
export const NOTE_COLORS = ['blue', 'green', 'yellow', 'purple']
export const EVENT_CATEGORIES = ['Work', 'Personal', 'Health', 'Study']
export const GOAL_STATUSES = ['Active', 'Completed', 'Archived']

export function categoryTone(category) {
  return (category || '').toLowerCase()
}
