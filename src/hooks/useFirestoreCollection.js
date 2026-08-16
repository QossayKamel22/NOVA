import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { subscribeToCollection } from '../firebase/firestore'

export function useFirestoreCollection(coll, order = 'createdAt') {
  const { user, firebaseConfigured } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!firebaseConfigured || !user) {
      setLoading(false)
      setItems([])
      return
    }
    setLoading(true)
    setError(null)
    const unsub = subscribeToCollection(
      user.uid,
      coll,
      (data) => {
        setItems(data)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
      order
    )
    return unsub
  }, [user, coll, order, firebaseConfigured])

  return { items, loading, error }
}
