import { createContext, useCallback, useContext, useState } from 'react'
import QuickAddModal from '../features/quickadd/QuickAddModal'
import TaskFormModal from '../features/tasks/TaskFormModal'
import GoalFormModal from '../features/goals/GoalFormModal'
import NoteFormModal from '../features/notes/NoteFormModal'
import EventFormModal from '../features/calendar/EventFormModal'

const QuickAddContext = createContext(null)

export function QuickAddProvider({ children }) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [activeForm, setActiveForm] = useState(null) // 'task' | 'goal' | 'note' | 'event'
  const [editItem, setEditItem] = useState(null)
  const [eventDefaultDate, setEventDefaultDate] = useState(null)

  const openQuickAdd = useCallback(() => setPickerOpen(true), [])

  const openCreate = useCallback((type, options = {}) => {
    setEditItem(options.item || null)
    if (type === 'event' && options.defaultDate) setEventDefaultDate(options.defaultDate)
    setActiveForm(type)
    setPickerOpen(false)
  }, [])

  const closeAll = useCallback(() => {
    setPickerOpen(false)
    setActiveForm(null)
    setEditItem(null)
  }, [])

  return (
    <QuickAddContext.Provider value={{ openQuickAdd, openCreate }}>
      {children}
      <QuickAddModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(type) => openCreate(type)}
      />
      <TaskFormModal open={activeForm === 'task'} onClose={closeAll} task={editItem} />
      <GoalFormModal open={activeForm === 'goal'} onClose={closeAll} goal={editItem} />
      <NoteFormModal open={activeForm === 'note'} onClose={closeAll} note={editItem} />
      <EventFormModal open={activeForm === 'event'} onClose={closeAll} event={editItem} defaultDate={eventDefaultDate} />
    </QuickAddContext.Provider>
  )
}

export function useQuickAdd() {
  const ctx = useContext(QuickAddContext)
  if (!ctx) throw new Error('useQuickAdd must be used within QuickAddProvider')
  return ctx
}
