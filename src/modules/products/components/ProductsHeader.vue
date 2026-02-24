<template>
  <header class="products-header">
    <div class="products-header__content">
      <!-- Breadcrumb -->
      <nav class="products-header__breadcrumb">
        <ol class="products-header__breadcrumb-list">
          <li><RouterLink to="/">{{ t('breadcrumb.home') }}</RouterLink></li>
          <li class="products-header__breadcrumb-current">{{ t('breadcrumb.shop') }}</li>
        </ol>
      </nav>

      <!-- Main heading -->
      <div class="products-header__main">
        <h1 class="products-header__title">
          Productos
          <span class="products-header__title-line"></span>
        </h1>
        <p class="products-header__subtitle">
          Herramientas profesionales para trabajo intensivo • {{ productCount }} productos disponibles
        </p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

defineProps<{
  productCount: number
}>()

const { t } = useI18n()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.products-header {
  padding-bottom: $spacing-2xl;

  @include respond-to(md) {
    padding-bottom: $spacing-3xl;
  }

  &__content {
    animation: header-fade-in 0.4s ease-out;
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

  &__main {
    animation: content-slide-up 0.5s ease-out;
  }

  &__title {
    position: relative;
    display: inline-block;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: $font-weight-medium;
    color: $color-text-primary;
    letter-spacing: $letter-spacing-tight;
    line-height: $line-height-tight;
    margin: 0 0 $spacing-sm 0;
  }

  &__title-line {
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, $color-accent, transparent);
    opacity: 0.5;
  }

  &__subtitle {
    font-size: $font-size-base;
    color: $color-text-secondary;
    margin: 0;

    @include respond-to(md) {
      font-size: $font-size-lg;
    }
  }
}

@keyframes header-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes content-slide-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
