import { useMemo, useState } from 'react'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import EmptyState from '../../components/EmptyState/EmptyState'
import { SkeletonCard } from '../../components/Skeleton/Skeleton'
import { IconSearch, IconFilter, IconPlus, IconNotes, IconMore, IconEdit, IconTrash } from '../../components/Icons/Icons'
import { useAuth } from '../../context/AuthContext'
import { useQuickAdd } from '../../context/QuickAddContext'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { deleteItem } from '../../firebase/firestore'
import { useToast } from '../../context/ToastContext'
import { NOTE_CATEGORIES } from '../../constants/options'
import styles from './Notes.module.css'

function formatTimestamp(ts) {
  if (!ts?.toDate) return ''
  return ts.toDate().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function Notes() {
  const { user } = useAuth()
  const { openCreate } = useQuickAdd()
  const { showToast } = useToast()
  const { items: notes, loading } = useFirestoreCollection('notes')
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [menuOpenId, setMenuOpenId] = useState(null)

  const filtered = useMemo(() => {
    let list = notes
    if (category !== 'All') list = list.filter((n) => n.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((n) => n.title?.toLowerCase().includes(q) || n.content?.toLowerCase().includes(q))
    }
    return list
  }, [notes, category, search])

  const remove = async (note) => {
    try {
      await deleteItem(user.uid, 'notes', note.id)
      showToast('Note deleted.', { type: 'success' })
    } catch {
      showToast('Unable to delete note.', { type: 'error' })
    } finally {
      setMenuOpenId(null)
    }
  }

  return (
    <div>
      <div className={styles.controls}>
        <Input icon={<IconSearch width={16} height={16} />} placeholder="Search notes" value={search} onChange={(e) => setSearch(e.target.value)} containerClassName={styles.searchInput} />
        <Button variant="secondary" icon={<IconFilter width={16} height={16} />}>Filter</Button>
        <Button icon={<IconPlus width={16} height={16} />} onClick={() => openCreate('note')}>New Note</Button>
      </div>

      <div className={styles.categories}>
        {['All', ...NOTE_CATEGORIES].map((c) => (
          <button key={c} className={`${styles.chip} ${category === c ? styles.chipActive : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      {loading ? (
        <div className={styles.grid}>{[1,2,3,4].map((i) => <SkeletonCard key={i} />)}</div>
      ) : filtered.length === 0 ? (
        <Card>
          <EmptyState icon={<IconNotes width={24} height={24} />} title="No notes yet." description="Capture ideas and important information." actionLabel="New Note" onAction={() => openCreate('note')} />
        </Card>
      ) : (
        <div className={styles.grid}>
          {filtered.map((note) => (
            <div key={note.id} className={`${styles.noteCard} ${styles[`note_${note.color || 'blue'}`]}`}>
              <div className={styles.noteTop}>
                <h3 className={styles.noteTitle}>{note.title}</h3>
                <div className={styles.menuWrap}>
                  <button className={styles.moreBtn} onClick={() => setMenuOpenId(menuOpenId === note.id ? null : note.id)} aria-label="More options">
                    <IconMore width={16} height={16} />
                  </button>
                  {menuOpenId === note.id && (
                    <div className={styles.menu}>
                      <button onClick={() => { openCreate('note', { item: note }); setMenuOpenId(null) }}><IconEdit width={14} height={14} /> Edit</button>
                      <button onClick={() => remove(note)} className={styles.menuDanger}><IconTrash width={14} height={14} /> Delete</button>
                    </div>
                  )}
                </div>
              </div>
              <p className={styles.noteContent}>{note.content || 'No content yet.'}</p>
              <div className={styles.noteFooter}>
                <span className={styles.noteCategory}>{note.category}</span>
                <span className={styles.noteTime}>{formatTimestamp(note.updatedAt) || formatTimestamp(note.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
