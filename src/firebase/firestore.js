import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'

// Generic per-user subcollection helpers: users/{uid}/{coll}/{id}

export function userDocRef(uid) {
  return doc(db, 'users', uid)
}

export async function getUserDoc(uid) {
  const snap = await getDoc(userDocRef(uid))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function createUserDoc(uid, data) {
  await setDoc(userDocRef(uid), {
    plan: 'Premium Plan',
    createdAt: serverTimestamp(),
    ...data,
  })
}

export async function updateUserDoc(uid, data) {
  await updateDoc(userDocRef(uid), data)
}

export function subCollectionRef(uid, coll) {
  return collection(db, 'users', uid, coll)
}

export function subscribeToCollection(uid, coll, callback, onError, order = 'createdAt') {
  const q = query(subCollectionRef(uid, coll), orderBy(order, 'desc'))
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      callback(items)
    },
    (err) => {
      console.error(`[NOVA] Firestore subscription error (${coll}):`, err)
      onError?.(err)
    }
  )
}

export async function addItem(uid, coll, data) {
  return addDoc(subCollectionRef(uid, coll), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateItem(uid, coll, id, data) {
  return updateDoc(doc(db, 'users', uid, coll, id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteItem(uid, coll, id) {
  return deleteDoc(doc(db, 'users', uid, coll, id))
}
