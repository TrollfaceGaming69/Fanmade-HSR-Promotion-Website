import { createContext, useContext } from 'react'
import { DEFAULT_LANGUAGE } from './types'
import type { Language } from './types'

export type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

/**
 * Kept in a .ts file (no JSX) so the provider component can live on its own and
 * fast refresh stays happy about files exporting only components.
 */
export const LanguageContext = createContext<LanguageContextValue>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
})

export const useLanguage = () => useContext(LanguageContext)
