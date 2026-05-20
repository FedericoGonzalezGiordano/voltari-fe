<template>
  <div class="quantity-selector">
    <button
      class="quantity-selector__btn"
      :disabled="quantity <= min"
      @click="$emit('change', quantity - 1)"
      aria-label="Decrease quantity"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
    <Transition name="quantity-pop" mode="out-in">
      <div :key="quantity" class="quantity-selector__value">{{ quantity }}</div>
    </Transition>
    <button
      class="quantity-selector__btn"
      :disabled="quantity >= max"
      @click="$emit('change', quantity + 1)"
      aria-label="Increase quantity"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    quantity: number
    min?: number
    max?: number
    onChange?: (quantity: number) => void
  }>(),
  {
    min: 1,
    max: 99
  }
)

defineEmits<{
  change: [quantity: number]
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.quantity-selector {
  @include flex-center;
  gap: $spacing-sm;
  background: $color-bg-tertiary;
  border: 1px solid $color-border-light;
  border-radius: $radius-md;
  padding: $spacing-xs;

  &__btn {
    @include button-base;
    width: 36px;
    height: 36px;
    border-radius: $radius-sm;
    color: $color-text-secondary;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    transition: all $transition-fast;

    &:hover:not(:disabled) {
      background: $color-overlay-medium;
      color: $color-accent;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__value {
    min-width: 48px;
    height: 32px;
    text-align: center;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    @include flex-center;
    background: $color-bg-tertiary;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    font-variant-numeric: tabular-nums;
  }
}

.quantity-pop-enter-active {
  animation: quantity-pop-in 0.2s ease-out;
}

.quantity-pop-leave-active {
  animation: quantity-pop-out 0.15s ease-in;
}

@keyframes quantity-pop-in {
  0% {
    opacity: 0;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes quantity-pop-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
</style>
