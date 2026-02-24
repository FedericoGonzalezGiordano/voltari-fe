import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import * as THREE from 'three'

const IDLE_ROTATION_SPEED = 0.003
const HOVER_ROTATION_SPEED = 0.015
const MENU_OPEN_ROTATION_SPEED = 0.008
const LERP_FACTOR = 0.1

export function useGlobe3D(canvasRef: Ref<HTMLCanvasElement | null>) {
  const isReady = ref(false)

  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let renderer: THREE.WebGLRenderer | null = null
  let globe: THREE.Mesh | null = null
  let animationId: number | null = null

  let targetRotationSpeed = IDLE_ROTATION_SPEED
  let currentRotationSpeed = IDLE_ROTATION_SPEED

  const initScene = (): void => {
    if (!canvasRef.value) return

    const canvas = canvasRef.value
    const size = 28

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 2.2

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    })
    renderer.setSize(size, size, false)
    renderer.setPixelRatio(2)

    const geometry = new THREE.SphereGeometry(0.93, 12, 6)
    const material = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      wireframe: true
    })

    globe = new THREE.Mesh(geometry, material)
    globe.rotation.x = 0.3
    scene.add(globe)

    isReady.value = true
  }

  const animate = (): void => {
    if (!globe || !renderer || !scene || !camera) return

    currentRotationSpeed += (targetRotationSpeed - currentRotationSpeed) * LERP_FACTOR

    globe.rotation.y += currentRotationSpeed

    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }

  const setHovering = (hovering: boolean): void => {
    targetRotationSpeed = hovering ? HOVER_ROTATION_SPEED : IDLE_ROTATION_SPEED
  }

  const setMenuOpen = (open: boolean): void => {
    if (open) {
      targetRotationSpeed = MENU_OPEN_ROTATION_SPEED
    } else {
      targetRotationSpeed = IDLE_ROTATION_SPEED
    }
  }

  const dispose = (): void => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
      animationId = null
    }

    if (globe) {
      globe.geometry.dispose()
      if (globe.material instanceof THREE.Material) {
        globe.material.dispose()
      }
      globe = null
    }

    if (renderer) {
      renderer.dispose()
      renderer = null
    }

    scene = null
    camera = null
  }

  onMounted(() => {
    initScene()
    animate()
  })

  onBeforeUnmount(() => {
    dispose()
  })

  return {
    isReady,
    setHovering,
    setMenuOpen
  }
}
