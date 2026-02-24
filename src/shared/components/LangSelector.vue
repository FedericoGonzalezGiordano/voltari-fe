<template>
  <div class="lang-selector">
    <button
      class="lang-selector__toggle"
      @click="toggleMenu"
      @mouseenter="setHovering(true)"
      @mouseleave="setHovering(false)"
      :aria-expanded="isMenuOpen"
      aria-haspopup="true"
    >
      <canvas ref="globeCanvas" class="lang-selector__globe"></canvas>
      <span class="lang-selector__flag">{{ currentFlag }}</span>
      <svg
        class="lang-selector__arrow"
        :class="{ 'lang-selector__arrow--open': isMenuOpen }"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div v-if="isMenuOpen" class="lang-selector__menu">
      <button
        v-for="loc in locales"
        :key="loc.code"
        class="lang-selector__option"
        :class="{ 'lang-selector__option--active': locale === loc.code }"
        @click="changeLocale(loc.code)"
      >
        <span class="lang-selector__option-flag">{{ loc.flag }}</span>
        <span class="lang-selector__option-name">{{ loc.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLanguage } from '@/shared/composables/useLanguage'
import { useGlobe3D } from '@/shared/composables/useGlobe3D'

const globeCanvas = ref<HTMLCanvasElement | null>(null)

const {
  locale,
  locales,
  currentFlag,
  isMenuOpen,
  toggleMenu,
  changeLocale
} = useLanguage()

const { setHovering, setMenuOpen } = useGlobe3D(globeCanvas)

watch(isMenuOpen, (open) => {
  setMenuOpen(open)
})
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.lang-selector {
  position: relative;

  &__toggle {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    padding: $spacing-xs $spacing-sm;
    border-radius: $radius-md;
    color: $color-text-secondary;
    cursor: pointer;
    transition: all $transition-fast;

    &:hover {
      border-color: $color-border-accent;
      color: $color-text-primary;
    }
  }

  &__globe {
    width: 28px;
    height: 28px;
    display: block;
  }

  &__flag {
    font-size: $font-size-lg;
  }

  &__arrow {
    transition: transform $transition-fast;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__menu {
    position: absolute;
    top: calc(100% + $spacing-xs);
    right: 0;
    min-width: 150px;
    border-radius: $radius-lg;
    padding: $spacing-xs;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    z-index: $z-index-dropdown;
  }

  &__option {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    width: 100%;
    padding: $spacing-sm $spacing-md;
    background: transparent;
    border: none;
    border-radius: $radius-md;
    color: $color-text-secondary;
    cursor: pointer;
    transition: all $transition-fast;

    &:hover {
      background: $color-overlay-medium;
      color: $color-text-primary;
    }

    &--active {
      background: $color-accent-light;
      color: $color-accent;
    }
  }

  &__option-flag {
    font-size: $font-size-xl;
  }

  &__option-name {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
  }
}
</style>
