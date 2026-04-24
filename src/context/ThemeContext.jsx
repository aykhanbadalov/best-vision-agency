import { createContext, useContext, useState, useLayoutEffect } from 'react'

function getInitialDark() {
  try {
    const saved = localStorage.getItem('bv-theme')
    return saved !== null ? saved === 'dark' : true
  } catch {
    return true
  }
}

// Apply synchronously at module-import time — prevents any flash of wrong theme
// before React mounts and runs effects.
;(function applyInitialTheme() {
  if (typeof document === 'undefined') return
  if (getInitialDark()) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})()

const ThemeContext = createContext({ dark: true, toggle: () => {} })

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(getInitialDark)

  // useLayoutEffect runs synchronously after DOM mutations — no visible flash.
  useLayoutEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('bv-theme', dark ? 'dark' : 'light')
    } catch {
      // localStorage unavailable — silent fail
    }
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
