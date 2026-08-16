import { useMemo, useState } from 'react'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import EmptyState from '../../components/EmptyState/EmptyState'
import { IconChevronLeft, IconChevronRight, IconPlus, IconCalendar } from '../../components/Icons/Icons'
import { useQuickAdd } from '../../context/QuickAddContext'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import styles from './Calendar.module.css'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const CATEGORY_COLOR = { Work: 'blue', Personal: 'purple', Health: 'green', Study: 'orange' }

function toISO(date) {
  return date.toISOString().slice(0, 10)
}

function buildMonthGrid(year, month) {
  const first = new Date(year, month, 1)
  const startOffset = first.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export default function Calendar() {
  const { openCreate } = useQuickAdd()
  const { items: events, loading } = useFirestoreCollection('events', 'date')
  const [cursor, setCursor] = useState(() => { const d = new Date(); d.setDate(1); return d })
  const [selected, setSelected] = useState(() => toISO(new Date()))

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const cells = useMemo(() => buildMonthGrid(year, month), [year, month])

  const eventsByDate = useMemo(() => {
    const map = {}
    events.forEach((e) => {
      if (!e.date) return
      map[e.date] = map[e.date] || []
      map[e.date].push(e)
    })
    return map
  }, [events])

  const selectedEvents = (eventsByDate[selected] || []).sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''))
  const upcoming = useMemo(() => {
    const todayISO = toISO(new Date())
    return events.filter((e) => e.date >= todayISO).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5)
  }, [events])

  const changeMonth = (delta) => {
    const d = new Date(cursor)
    d.setMonth(d.getMonth() + delta)
    setCursor(d)
  }

  const goToday = () => {
    const t = new Date(); t.setDate(1)
    setCursor(t)
    setSelected(toISO(new Date()))
  }

  return (
    <div>
      <div className={styles.controls}>
        <div className={styles.monthNav}>
          <Button variant="ghost" size="sm" onClick={goToday}>Today</Button>
          <button className={styles.navBtn} onClick={() => changeMonth(-1)} aria-label="Previous month"><IconChevronLeft width={18} height={18} /></button>
          <span className={styles.monthLabel}>{cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
          <button className={styles.navBtn} onClick={() => changeMonth(1)} aria-label="Next month"><IconChevronRight width={18} height={18} /></button>
        </div>
        <Button icon={<IconPlus width={16} height={16} />} onClick={() => openCreate('event', { defaultDate: selected })}>New Event</Button>
      </div>

      <div className={styles.layout}>
        <Card className={`${styles.calendarCard} desktop-only`}>
          <div className={styles.weekdays}>
            {WEEKDAYS.map((d) => <span key={d}>{d}</span>)}
          </div>
          <div className={styles.grid}>
            {cells.map((date, i) => {
              if (!date) return <div key={i} className={styles.emptyCell} />
              const iso = toISO(date)
              const dayEvents = eventsByDate[iso] || []
              const isToday = iso === toISO(new Date())
              const isSelected = iso === selected
              return (
                <button
                  key={iso}
                  className={`${styles.cell} ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''}`}
                  onClick={() => setSelected(iso)}
                >
                  <span className={styles.cellNum}>{date.getDate()}</span>
                  <div className={styles.pills}>
                    {dayEvents.slice(0, 2).map((e) => (
                      <span key={e.id} className={`${styles.pill} ${styles[CATEGORY_COLOR[e.category] || 'blue']}`}>{e.title}</span>
                    ))}
                    {dayEvents.length > 2 && <span className={styles.pillMore}>+{dayEvents.length - 2} more</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </Card>

        <div className={`${styles.agendaMobile} mobile-only`}>
          {loading ? null : events.length === 0 ? (
            <EmptyState icon={<IconCalendar width={24} height={24} />} title="No events yet." description="Schedule an event on your calendar." actionLabel="New Event" onAction={() => openCreate('event')} />
          ) : (
            Object.keys(eventsByDate).sort().map((date) => (
              <Card key={date} className={styles.agendaGroup}>
                <h4 className={styles.agendaDate}>{new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</h4>
                {eventsByDate[date].map((e) => (
                  <div key={e.id} className={styles.agendaEvent}>
                    <span className={`${styles.dotColor} ${styles[CATEGORY_COLOR[e.category] || 'blue']}`} />
                    <div>
                      <div className={styles.agendaTitle}>{e.title}</div>
                      <div className={styles.agendaTime}>{e.startTime} – {e.endTime}</div>
                    </div>
                  </div>
                ))}
              </Card>
            ))
          )}
        </div>

        <div className={styles.sidebar}>
          <Card>
            <h3 className={styles.sideTitle}>{new Date(selected).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
            {selectedEvents.length === 0 ? (
              <p className={styles.noEvents}>No events scheduled for this day.</p>
            ) : (
              <ul className={styles.eventList}>
                {selectedEvents.map((e) => (
                  <li key={e.id} className={styles.eventRow}>
                    <span className={`${styles.dotColor} ${styles[CATEGORY_COLOR[e.category] || 'blue']}`} />
                    <div>
                      <div className={styles.eventTitle}>{e.title}</div>
                      <div className={styles.eventTime}>{e.startTime} – {e.endTime}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <h3 className={styles.sideTitle}>Upcoming events</h3>
            {upcoming.length === 0 ? (
              <p className={styles.noEvents}>Nothing scheduled soon.</p>
            ) : (
              <ul className={styles.eventList}>
                {upcoming.map((e) => (
                  <li key={e.id} className={styles.eventRow}>
                    <span className={`${styles.dotColor} ${styles[CATEGORY_COLOR[e.category] || 'blue']}`} />
                    <div>
                      <div className={styles.eventTitle}>{e.title}</div>
                      <div className={styles.eventTime}>{e.date} · {e.startTime}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
