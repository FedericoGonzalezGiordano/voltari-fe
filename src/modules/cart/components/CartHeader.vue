<template>
  <header class="cart-header">
    <div class="cart-header__content">
      <!-- Breadcrumb -->
      <nav class="cart-header__breadcrumb">
        <ol class="cart-header__breadcrumb-list">
          <li><RouterLink to="/">{{ t('breadcrumb.home') }}</RouterLink></li>
          <li><RouterLink to="/shop">{{ t('breadcrumb.shop') }}</RouterLink></li>
          <li class="cart-header__breadcrumb-current">{{ t('breadcrumb.cart') }}</li>
        </ol>
      </nav>

      <!-- Main heading with icon -->
      <div class="cart-header__top">
        <div class="cart-header__icon cart-header__icon--animated">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <Transition name="scale-bounce">
            <span v-if="itemCount > 0" key="badge" class="cart-header__badge">{{ itemCount }}</span>
          </Transition>
        </div>
        <h1 class="cart-header__title">
          Tu carrito de herramientas
        </h1>
      </div>

      <!-- Subtitle -->
      <p v-if="itemCount > 0" class="cart-header__subtitle">
        {{ itemCount }} {{ itemCount === 1 ? 'producto' : 'productos' }} • Total estimado:
        <span class="cart-header__total">${{ total.toFixed(2) }}</span>
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

defineProps<{
  itemCount: number
  total: number
}>()

const { t } = useI18n()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.cart-header {
  padding-top: calc(60px + $spacing-2xl); // NavBar height + spacing
  padding-bottom: $spacing-2xl;
  padding-left: $padding-container;
  padding-right: $padding-container;
  background: $color-bg-primary;

  @include respond-to(md) {
    padding-top: calc(80px + $spacing-3xl); // NavBar height + spacing
    padding-bottom: $spacing-3xl;
  }

  &__content {
    @include container-wide;
    margin: 0 auto;
  }

  &__breadcrumb {
    margin-bottom: $spacing-lg;
  }

  &__breadcrumb-list {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: flex-start;

    a,
    :deep(a) {
      color: $color-text-secondary;
      transition: color $transition-fast;
      text-decoration: none;

      &:hover {
        color: $color-text-primary;
      }
    }

    li::after {
      content: '>';
      margin-left: $spacing-md;
      color: $color-text-muted;
    }

    li:last-child::after {
      content: '';
      margin-left: 0;
    }
  }

  &__breadcrumb-current {
    color: $color-text-primary;
  }

  &__top {
    display: flex;
    align-items: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-lg;
    flex-wrap: wrap;
  }

  &__icon {
    position: relative;
    width: 48px;
    height: 48px;
    @include flex-center;
    background: $color-bg-tertiary;
    border: 1px solid $color-border-light;
    border-radius: $radius-lg;
    color: $color-accent;

    svg {
      width: 24px;
      height: 24px;
    }

    &--animated {
      animation: scale-bounce-in 0.45s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }

  &__badge {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
    background: $color-accent;
    color: $color-bg-primary;
    font-size: 12px;
    font-weight: $font-weight-bold;
    border-radius: $radius-full;
    @include flex-center;
    box-shadow: 0 0 15px rgba(249, 115, 22, 0.5);
  }

  &__title {
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: $line-height-tight;
    letter-spacing: $letter-spacing-normal;
    color: $color-text-primary;
    font-weight: $font-weight-medium;
    margin: 0;
    flex: 1;
    min-width: 0;
    
    @include respond-to(md) {
      white-space: nowrap;
    }
  }

  &__subtitle {
    font-size: $font-size-base;
    color: $color-text-secondary;
    margin: 0;
    margin-bottom: $spacing-sm;

    @include respond-to(md) {
      font-size: $font-size-lg;
      margin-bottom: $spacing-md;
    }
  }

  &__total {
    color: $color-accent;
    font-weight: $font-weight-medium;
  }
}

.scale-bounce-enter-active {
  animation: scale-bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.scale-bounce-leave-active {
  animation: scale-bounce-out 0.3s ease-in;
}

@keyframes scale-bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scale-bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
