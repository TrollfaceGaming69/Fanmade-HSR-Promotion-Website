import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { LanguageContext } from './languageContext'
import {
  DEFAULT_LANGUAGE,
  isLanguage,
  LANGUAGE_STORAGE_KEY,
  LANGUAGE_TAGS,
} from './types'
import type { Language } from './types'

const readStoredLanguage = (): Language => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE

  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return isLanguage(stored) ? stored : DEFAULT_LANGUAGE
  } catch {
    // Storage can be blocked (private mode, hardened settings). Not fatal.
    return DEFAULT_LANGUAGE
  }
}

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Read synchronously so the first paint is already in the saved language
  // instead of flashing English and swapping afterwards.
  const [language, setLanguageState] = useState<Language>(readStoredLanguage)

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next)
    } catch {
      // The choice still applies for this session even if it cannot be saved.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = LANGUAGE_TAGS[language]
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
