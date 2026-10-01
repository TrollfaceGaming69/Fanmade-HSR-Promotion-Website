export type Language = 'en' | 'id'

export const LANGUAGES: readonly Language[] = ['en', 'id']

export const DEFAULT_LANGUAGE: Language = 'en'

export const LANGUAGE_STORAGE_KEY = 'hsr-language'

/** Shown in the switcher, each written in its own language. */
export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  id: 'Indonesia',
}

/** BCP 47 tags for the <html lang> attribute. */
export const LANGUAGE_TAGS: Record<Language, string> = {
  en: 'en',
  id: 'id',
}

export const isLanguage = (value: unknown): value is Language =>
  value === 'en' || value === 'id'
