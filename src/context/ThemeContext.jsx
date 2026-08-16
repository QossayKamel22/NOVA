import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(null)

function resolveTheme(pref) {
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return pref
}

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(() => localStorageGet('nova-theme', 'light'))
  const [resolved, setResolved] = useState(() => resolveTheme(preference))

  useEffect(() => {
    const applied = resolveTheme(preference)
    setResolved(applied)
    document.documentElement.setAttribute('data-theme', applied)
    try {
      window.localStorage.setItem('nova-theme', preference)
    } catch {
      /* ignore */
    }
  }, [preference])

  useEffect(() => {
    if (preference !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => {
      const applied = resolveTheme('system')
      setResolved(applied)
      document.documentElement.setAttribute('data-theme', applied)
    }
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [preference])

  const setTheme = useCallback((pref) => setPreference(pref), [])

  return (
    <ThemeContext.Provider value={{ preference, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function localStorageGet(key, fallback) {
  try {
    return window.localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
