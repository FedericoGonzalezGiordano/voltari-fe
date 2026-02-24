<template>
  <nav class="breadcrumb">
    <div class="breadcrumb__content">
      <ol class="breadcrumb__list">
        <li><a href="/">{{ t('breadcrumb.home') }}</a></li>
        <li><a href="/shop">{{ t('breadcrumb.shop') }}</a></li>
        <li class="breadcrumb__current">{{ t('breadcrumb.cart') }}</li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.breadcrumb {
  background: $color-bg-primary;
  padding: $spacing-md $padding-container;
  border-bottom: 1px solid $color-border-light;

  @include respond-to(md) {
    padding: $spacing-lg $padding-container;
  }

  &__content {
    @include container;
  }

  &__list {
    @include flex-center;
    gap: $spacing-md;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    list-style: none;

    a {
      color: $color-text-secondary;
      transition: color $transition-fast;

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

  &__current {
    color: $color-text-primary;
  }
}
</style>
