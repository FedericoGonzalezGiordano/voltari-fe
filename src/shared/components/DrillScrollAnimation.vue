<template>
  <div class="scroll-animation" ref="wrapperRef">
    <div v-if="!imagesLoaded" class="scroll-animation__loading">
      <div class="loader">
        <div class="loader__ring"></div>
        <span class="loader__text">{{ t('loading.text') }}</span>
      </div>
    </div>

    <div class="scroll-animation__canvas-container">
      <canvas ref="canvasRef" class="scroll-animation__canvas"></canvas>
    </div>

    <div class="scroll-animation__sections">
      <section class="scroll-section scroll-section--hero" data-section="hero">
        <div class="scroll-section__content scroll-section__content--center">
          <h1 class="hero__title">
            <span class="hero__title-line">{{ t('hero.title1') }}</span>
            <span class="hero__title-line hero__title-line--accent">{{ t('hero.title2') }}</span>
          </h1>
          <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>
          <div class="hero__scroll-indicator">
            <div class="hero__mouse">
              <div class="hero__wheel"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="scroll-section scroll-section--feature" data-section="feature1">
        <div class="scroll-section__content scroll-section__content--left">
          <span class="feature__tag">{{ t('feature1.tag') }}</span>
          <h2 class="feature__title">{{ t('feature1.title') }}</h2>
          <p class="feature__description">{{ t('feature1.description') }}</p>
        </div>
      </section>

      <section class="scroll-section scroll-section--feature" data-section="feature2">
        <div class="scroll-section__content scroll-section__content--right">
          <span class="feature__tag">{{ t('feature2.tag') }}</span>
          <h2 class="feature__title">{{ t('feature2.title') }}</h2>
          <p class="feature__description">{{ t('feature2.description') }}</p>
        </div>
      </section>

      <section class="scroll-section scroll-section--cta" data-section="cta">
        <div class="scroll-section__content scroll-section__content--center">
          <span class="cta__tag">{{ t('cta.tag') }}</span>
          <h2 class="cta__title">{{ t('cta.title') }}</h2>
          <RouterLink to="/shop" class="cta__button">
            {{ t('cta.button') }}
            <ArrowRightIcon />
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCanvasAnimation } from '@/shared/composables/useCanvasAnimation'
import { ArrowRightIcon } from '@/shared/icons'

const { t } = useI18n()

const wrapperRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const { imagesLoaded } = useCanvasAnimation(wrapperRef, canvasRef)

const preventCtrlScroll = (e: WheelEvent) => {
  if (e.ctrlKey) {
    e.preventDefault()
  }
}

onMounted(() => {
  wrapperRef.value?.addEventListener('wheel', preventCtrlScroll, { passive: false })
})

onBeforeUnmount(() => {
  wrapperRef.value?.removeEventListener('wheel', preventCtrlScroll)
})
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.scroll-animation {
  position: relative;
  width: 100%;
  height: 350vh;
  background-color: $color-bg-primary;

  @include respond-to(md) {
    height: 400vh;
  }

  &__loading {
    @include fixed-full;
    @include flex-center;
    background-color: $color-bg-primary;
    z-index: $z-index-loading;
  }

  &__canvas-container {
    @include sticky-top;
    width: 100%;
    height: 100vh;
    @include flex-center;
    z-index: 1;
    overflow: hidden;
  }

  &__canvas {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__sections {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
}

.loader {
  @include flex-column-center;
  gap: $spacing-xl;

  &__ring {
    width: 50px;
    height: 50px;
    border: 3px solid $color-border-light;
    border-top-color: $color-accent;
    border-radius: $radius-full;
    @include animate-spin;
  }

  &__text {
    color: $color-text-muted;
    font-size: $font-size-sm;
    letter-spacing: $letter-spacing-wider;
    @include text-uppercase;
  }
}

.scroll-section {
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 $spacing-md;

  @include respond-to(sm) {
    padding: 0 $padding-container;
  }

  @include respond-to(md) {
    padding: 0 8%;
  }

  &--cta {
    align-items: flex-start;
    padding-top: 15vh;

    @include respond-to(md) {
      align-items: center;
      padding-top: 0;
    }
  }

  &__content {
    max-width: 100%;
    pointer-events: auto;
    padding: $spacing-md;
    background: rgba(10, 10, 10, 0.52);
    border-radius: $radius-lg;

    @include respond-to(sm) {
      padding: $spacing-lg;
      border-radius: $radius-xl;
    }

    @include respond-to(sm) {
      max-width: 500px;
      background: rgba(10, 10, 10, 0.5);
    }

    @include respond-to(md) {
      max-width: 600px;
      padding: 0;
      background: transparent;
      border-radius: 0;
    }

    &--center {
      margin: 0 auto;
      text-align: center;
    }

    &--left {
      margin: 0 auto;
      text-align: center;

      @include respond-to(md) {
        margin-right: auto;
        margin-left: 0;
        text-align: left;
      }
    }

    &--right {
      margin: 0 auto;
      text-align: center;

      @include respond-to(md) {
        margin-left: auto;
        margin-right: 0;
        text-align: right;
      }
    }
  }
}

.hero {
  &__title {
    font-size: clamp(2rem, 10vw, 3rem);
    font-weight: $font-weight-extrabold;
    line-height: $line-height-tight;
    letter-spacing: $letter-spacing-tight;
    color: $color-text-primary;
    margin-bottom: $spacing-md;

    @include respond-to(sm) {
      font-size: clamp(2.5rem, 12vw, 4rem);
      margin-bottom: $spacing-lg;
    }

    @include respond-to(md) {
      font-size: clamp(3rem, 10vw, 7rem);
      margin-bottom: $spacing-xl;
    }
  }

  &__title-line {
    display: block;

    &--accent {
      color: $color-accent;
    }
  }

  &__subtitle {
    font-size: $font-size-base;
    color: $color-text-muted;
    margin-bottom: $spacing-2xl;
    letter-spacing: $letter-spacing-wide;

    @include respond-to(sm) {
      font-size: $font-size-lg;
      margin-bottom: $spacing-3xl;
    }

    @include respond-to(md) {
      font-size: $font-size-xl;
      margin-bottom: $spacing-4xl;
    }
  }

  &__scroll-indicator {
    display: flex;
    justify-content: center;
  }

  &__mouse {
    width: 22px;
    height: 34px;
    border: 2px solid $color-text-faint;
    border-radius: 11px;
    display: flex;
    justify-content: center;
    padding-top: 6px;

    @include respond-to(md) {
      width: 26px;
      height: 40px;
      border-radius: 13px;
      padding-top: 8px;
    }
  }

  &__wheel {
    width: 3px;
    height: 6px;
    background-color: $color-text-muted;
    border-radius: 2px;
    animation: scroll-wheel 1.5s ease-in-out infinite;

    @include respond-to(md) {
      width: 4px;
      height: 8px;
    }
  }
}

.feature {
  &__tag {
    @include text-tag;
    padding: $spacing-xs $spacing-sm;
    background: $color-accent-light;
    border-radius: $radius-sm;
    margin-bottom: $spacing-sm;
    font-size: 0.65rem;

    @include respond-to(sm) {
      padding: $spacing-xs $spacing-md;
      margin-bottom: $spacing-md;
      font-size: $font-size-xs;
    }
  }

  &__title {
    font-size: clamp(1.25rem, 5vw, 1.75rem);
    @include text-title;
    margin-bottom: $spacing-md;

    @include respond-to(sm) {
      font-size: clamp(1.5rem, 5vw, 2rem);
    }

    @include respond-to(md) {
      font-size: clamp(2rem, 5vw, 3.5rem);
      margin-bottom: $spacing-lg;
    }
  }

  &__description {
    font-size: $font-size-sm;
    line-height: $line-height-relaxed;
    color: $color-text-muted;
    max-width: 100%;

    @include respond-to(sm) {
      font-size: $font-size-base;
      max-width: 350px;
      margin: 0 auto;
    }

    @include respond-to(md) {
      font-size: $font-size-xl;
      line-height: $line-height-loose;
      max-width: 400px;
      margin: 0;
    }

    .scroll-section__content--right & {
      @include respond-to(md) {
        margin-left: auto;
        margin-right: 0;
      }
    }

    .scroll-section__content--left & {
      @include respond-to(md) {
        margin-left: 0;
        margin-right: auto;
      }
    }
  }
}

.cta {
  &__tag {
    @include text-tag;
    padding: $spacing-xs $spacing-sm;
    background: $color-accent-light;
    border-radius: $radius-sm;
    margin-bottom: $spacing-sm;
    font-size: 0.65rem;

    @include respond-to(sm) {
      padding: $spacing-xs $spacing-md;
      margin-bottom: $spacing-md;
      font-size: $font-size-xs;
    }
  }

  &__title {
    font-size: clamp(1.25rem, 5vw, 1.75rem);
    @include text-title;
    margin-bottom: $spacing-md;

    @include respond-to(sm) {
      font-size: clamp(1.5rem, 5vw, 2rem);
    }

    @include respond-to(md) {
      font-size: clamp(2rem, 5vw, 3.5rem);
      margin-bottom: $spacing-lg;
    }
  }

  &__button {
    @include button-cta;
    margin-top: $spacing-sm;
    padding: $spacing-sm $spacing-lg;
    font-size: $font-size-sm;
    text-decoration: none;

    @include respond-to(sm) {
      margin-top: $spacing-md;
      padding: $spacing-md $spacing-xl;
      font-size: $font-size-base;
    }

    @include respond-to(md) {
      padding: $spacing-md $spacing-2xl;
      font-size: $font-size-lg;
    }

    :deep(svg) {
      width: 16px;
      height: 16px;
      transition: transform $transition-normal;

      @include respond-to(md) {
        width: 20px;
        height: 20px;
      }
    }

    &:hover :deep(svg) {
      transform: translateX(4px);
    }
  }
}
</style>
