import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'
import pt from './locales/pt.json'

export type MessageSchema = typeof es

export type SupportedLocale = 'es' | 'en' | 'pt'

export const SUPPORTED_LOCALES: { code: SupportedLocale; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' }
]

export const i18n = createI18n<[MessageSchema], SupportedLocale>({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es,
    en,
    pt
  }
})

export default i18n
