import Modal from '../../components/Modal/Modal'
import { IconTasks, IconGoals, IconNotes, IconCalendar } from '../../components/Icons/Icons'
import styles from './QuickAddModal.module.css'

const options = [
  { type: 'task', title: 'New Task', desc: 'Add a task to your list and get things done.', icon: IconTasks },
  { type: 'goal', title: 'New Goal', desc: 'Set a new goal and track your progress.', icon: IconGoals },
  { type: 'note', title: 'New Note', desc: 'Write down your ideas and notes.', icon: IconNotes },
  { type: 'event', title: 'New Event', desc: 'Schedule an event on your calendar.', icon: IconCalendar },
]

export default function QuickAddModal({ open, onClose, onSelect }) {
  return (
    <Modal open={open} onClose={onClose} title="What do you want to add?">
      <div className={styles.grid}>
        {options.map(({ type, title, desc, icon: Icon }) => (
          <button key={type} className={styles.option} onClick={() => onSelect(type)}>
            <span className={styles.iconWrap}><Icon width={20} height={20} /></span>
            <span className={styles.optTitle}>{title}</span>
            <span className={styles.optDesc}>{desc}</span>
          </button>
        ))}
      </div>
    </Modal>
  )
}
