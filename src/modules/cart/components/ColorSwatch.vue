<template>
  <button
    :class="['color-swatch', { 'color-swatch--selected': selected }]"
    :style="{ '--color': color } as any"
    :title="label"
    @click="$emit('select')"
    @mousedown="isPressed = true"
    @mouseup="isPressed = false"
    @mouseleave="isPressed = false"
  >
    <span class="color-swatch__color"></span>
    <Transition name="checkmark">
      <span v-if="selected" class="color-swatch__checkmark">✓</span>
    </Transition>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  label: string
  color: string
  selected?: boolean
}>()

defineEmits<{
  select: []
}>()

const isPressed = ref(false)
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.color-swatch {
  @include button-base;
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: $radius-full;
  padding: 2px;
  border: 2px solid transparent;
  transition: all $transition-fast;

  &__color {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: $radius-full;
    background: var(--color);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    transition: transform $transition-fast;
  }

  &__checkmark {
    position: absolute;
    inset: 0;
    @include flex-center;
    color: white;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  &:hover {
    border-color: $color-border-accent;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &--selected {
    border-color: $color-accent;
    box-shadow: 0 0 0 2px $color-bg-primary, 0 0 0 4px $color-accent;
  }
}

.checkmark-enter-active {
  animation: checkmark-in 0.2s ease-out;
}

.checkmark-leave-active {
  animation: checkmark-out 0.15s ease-in;
}

@keyframes checkmark-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes checkmark-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}
</style>
