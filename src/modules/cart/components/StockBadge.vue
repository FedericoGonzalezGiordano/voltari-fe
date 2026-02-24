<template>
  <span :class="['stock-badge', `stock-badge--${stock}`]">
    {{ stockText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  stock: 'high' | 'medium' | 'low'
}>()

const stockText = computed(() => {
  switch (props.stock) {
    case 'high':
      return 'En Stock'
    case 'medium':
      return 'Stock Limitado'
    case 'low':
      return 'Últimas Unidades'
    default:
      return ''
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.stock-badge {
  display: inline-block;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-sm;
  text-transform: uppercase;
  letter-spacing: $letter-spacing-wide;

  &--high {
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
  }

  &--medium {
    background: rgba(249, 115, 22, 0.1);
    color: $color-accent;
  }

  &--low {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
}
</style>
