<template>
  <div class="feature-card">
    <div class="feature-card__icon">{{ icon }}</div>
    <h3 class="feature-card__title">{{ title }}</h3>
    <p class="feature-card__description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.feature-card {
  @include card-base;
  padding: $spacing-3xl $spacing-2xl;
  text-align: center;

  &:hover {
    @include card-hover;
  }

  &__icon {
    font-size: $spacing-3xl;
    margin-bottom: $spacing-lg;
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-sm;
  }

  &__description {
    font-size: $font-size-md;
    line-height: $line-height-relaxed;
    color: $color-text-muted;
  }
}
</style>
