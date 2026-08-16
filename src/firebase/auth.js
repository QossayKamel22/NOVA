import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth'
import { auth } from './config'
import { createUserDoc, getUserDoc } from './firestore'

const googleProvider = new GoogleAuthProvider()
const appleProvider = new OAuthProvider('apple.com')

function friendlyAuthError(error) {
  const code = error?.code || ''
  const map = {
    'auth/invalid-credential': 'Incorrect email or password. Please try again.',
    'auth/invalid-email': 'That email address doesn’t look right.',
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect email or password. Please try again.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Please choose a stronger password (6+ characters).',
    'auth/popup-closed-by-user': 'Sign-in was cancelled.',
    'auth/network-request-failed': 'Network error. Check your connection and try again.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  }
  return map[code] || 'Something went wrong. Please try again.'
}

export async function registerWithEmail({ fullName, email, password }) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: fullName })
    await createUserDoc(cred.user.uid, {
      displayName: fullName,
      email,
      username: email.split('@')[0],
      photoURL: '',
      bio: '',
    })
    return cred.user
  } catch (error) {
    throw new Error(friendlyAuthError(error))
  }
}

export async function loginWithEmail(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    return cred.user
  } catch (error) {
    throw new Error(friendlyAuthError(error))
  }
}

async function ensureUserDoc(user) {
  const existing = await getUserDoc(user.uid).catch(() => null)
  if (!existing) {
    await createUserDoc(user.uid, {
      displayName: user.displayName || 'NOVA User',
      email: user.email || '',
      username: (user.email || 'user').split('@')[0],
      photoURL: user.photoURL || '',
      bio: '',
    })
  }
}

export async function loginWithGoogle() {
  try {
    const cred = await signInWithPopup(auth, googleProvider)
    await ensureUserDoc(cred.user)
    return cred.user
  } catch (error) {
    throw new Error(friendlyAuthError(error))
  }
}

export async function loginWithApple() {
  try {
    const cred = await signInWithPopup(auth, appleProvider)
    await ensureUserDoc(cred.user)
    return cred.user
  } catch (error) {
    throw new Error(friendlyAuthError(error))
  }
}

export async function logout() {
  await signOut(auth)
}

export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw new Error(friendlyAuthError(error))
  }
}
