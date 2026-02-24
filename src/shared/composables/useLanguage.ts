import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/i18n'

export function useLanguage() {
  const { locale } = useI18n()
  const isMenuOpen = ref(false)

  const currentFlag = computed(() => {
    const current = SUPPORTED_LOCALES.find(l => l.code === locale.value)
    return current?.flag || '🌐'
  })

  const currentCode = computed(() => locale.value.toUpperCase())

  const toggleMenu = (): void => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = (): void => {
    isMenuOpen.value = false
  }

  const changeLocale = (newLocale: SupportedLocale): void => {
    locale.value = newLocale
    closeMenu()
  }

  const handleClickOutside = (event: MouseEvent): void => {
    const target = event.target as HTMLElement
    if (!target.closest('.lang-selector')) {
      closeMenu()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  return {
    locale,
    locales: SUPPORTED_LOCALES,
    currentFlag,
    currentCode,
    isMenuOpen,
    toggleMenu,
    closeMenu,
    changeLocale
  }
}
