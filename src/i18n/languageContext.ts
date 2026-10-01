import { createContext, useContext } from 'react'
import { DEFAULT_LANGUAGE } from './types'
import type { Language } from './types'

export type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
})

export const useLanguage = () => useContext(LanguageContext)
