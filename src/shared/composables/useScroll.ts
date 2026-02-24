import { ref, onMounted, onBeforeUnmount } from 'vue'

export interface UseScrollOptions {
  threshold?: number
}

export function useScroll(options: UseScrollOptions = {}) {
  const { threshold = 50 } = options
  const isScrolled = ref(false)
  const scrollY = ref(0)

  const handleScroll = (): void => {
    scrollY.value = window.scrollY
    isScrolled.value = window.scrollY > threshold
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isScrolled,
    scrollY
  }
}
