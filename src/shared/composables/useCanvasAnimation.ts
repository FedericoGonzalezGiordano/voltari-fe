import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 26
const FRAME_PREFIX = 'ezgif-frame-'

const frameModules = import.meta.glob('@/assets/frames/*.png', { eager: true }) as Record<string, { default: string }>

export function useCanvasAnimation(
  wrapperRef: Ref<HTMLElement | null>,
  canvasRef: Ref<HTMLCanvasElement | null>
) {
  const imagesLoaded = ref(false)
  const images: HTMLImageElement[] = []
  let ctx: CanvasRenderingContext2D | null = null
  let currentFrame = 0
  let resizeTimeout: number | null = null

  const getFramePath = (index: number): string => {
    const frameNumber = String(index).padStart(3, '0')
    const key = Object.keys(frameModules).find(k => k.includes(`${FRAME_PREFIX}${frameNumber}`))
    return key ? (frameModules[key] as { default: string }).default : ''
  }

  const preloadImages = (): Promise<void> => {
    return new Promise((resolve) => {
      let loaded = 0

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image()
        img.src = getFramePath(i)

        img.onload = () => {
          loaded++
          if (loaded === TOTAL_FRAMES) resolve()
        }

        img.onerror = () => {
          console.error(`Error loading frame ${i}`)
          loaded++
          if (loaded === TOTAL_FRAMES) resolve()
        }

        images[i - 1] = img
      }
    })
  }

  const isMobile = (): boolean => window.innerWidth < 768

  const getScaleFactor = (): number => isMobile() ? 1.18 : 0.99

  const drawFrame = (frameIndex: number): void => {
    if (!ctx || !canvasRef.value || !images[frameIndex]) return

    const canvas = canvasRef.value
    const img = images[frameIndex]
    const scaleFactor = getScaleFactor()
    const viewportWidth = canvas.clientWidth || window.innerWidth
    const viewportHeight = canvas.clientHeight || window.innerHeight

    ctx.clearRect(0, 0, viewportWidth, viewportHeight)

    const imgRatio = img.width / img.height
    const canvasRatio = viewportWidth / viewportHeight

    let drawWidth, drawHeight, offsetX, offsetY

    if (isMobile()) {
      drawWidth = viewportWidth * scaleFactor
      drawHeight = drawWidth / imgRatio
      offsetX = (viewportWidth - drawWidth) / 2
      offsetY = Math.max(viewportHeight * 0.32, (viewportHeight - drawHeight) / 2)
    } else {
      if (imgRatio > canvasRatio) {
        drawHeight = viewportHeight * scaleFactor
        drawWidth = drawHeight * imgRatio
      } else {
        drawWidth = viewportWidth * scaleFactor
        drawHeight = drawWidth / imgRatio
      }

      offsetX = (viewportWidth - drawWidth) / 2
      offsetY = (viewportHeight - drawHeight) / 2
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }

  const setupCanvas = (): void => {
    if (!canvasRef.value) return

    const canvas = canvasRef.value
    const dpr = Math.min(window.devicePixelRatio, 2)

    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr

    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
    }

    drawFrame(currentFrame)
  }

  const setupScrollAnimation = (): void => {
    if (!wrapperRef.value) return

    ScrollTrigger.create({
      trigger: wrapperRef.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(self.progress * TOTAL_FRAMES)
        )

        if (frameIndex !== currentFrame) {
          currentFrame = frameIndex
          drawFrame(currentFrame)
        }
      }
    })

    gsap.utils.toArray<HTMLElement>('.scroll-section').forEach((section, i) => {
      const content = section.querySelector('.scroll-section__content')
      if (!content) return

      gsap.fromTo(content,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 1
          }
        }
      )

      if (i < 3) {
        gsap.to(content, {
          opacity: 0,
          y: -30,
          scrollTrigger: {
            trigger: section,
            start: 'bottom 60%',
            end: 'bottom 20%',
            scrub: 1
          }
        })
      }
    })
  }

  const handleResize = (): void => {
    if (resizeTimeout) {
      window.clearTimeout(resizeTimeout)
    }
    resizeTimeout = window.setTimeout(() => {
      setupCanvas()
    }, 100)
  }

  onMounted(async () => {
    await preloadImages()
    imagesLoaded.value = true
    setupCanvas()
    setupScrollAnimation()
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    if (resizeTimeout) {
      window.clearTimeout(resizeTimeout)
    }
    ScrollTrigger.getAll().forEach(t => t.kill())
  })

  return {
    imagesLoaded
  }
}
