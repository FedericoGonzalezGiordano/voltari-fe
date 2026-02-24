<template>
  <div class="filter-section">
    <button class="filter-section__header" @click="$emit('toggle')">
      <span class="filter-section__title">{{ title }}</span>
      <svg
        :class="['filter-section__icon', { 'filter-section__icon--open': isOpen }]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
    <Transition name="collapse">
      <div v-if="isOpen" class="filter-section__content">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  isOpen: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.filter-section {
  padding-bottom: $spacing-md;
  margin-bottom: $spacing-md;
  border-bottom: 1px solid $color-border-light;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: none;
    border: none;
    padding: 0;
    margin-bottom: $spacing-md;
    cursor: pointer;
    transition: color $transition-fast;

    &:hover {
      .filter-section__title {
        color: $color-text-primary;
      }
    }
  }

  &__title {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    transition: color $transition-fast;
  }

  &__icon {
    width: 16px;
    height: 16px;
    color: $color-text-muted;
    transition: transform $transition-fast;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__content {
    overflow: hidden;
  }
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.2s ease-out;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}

.collapse-enter-to,
.collapse-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}
</style>
