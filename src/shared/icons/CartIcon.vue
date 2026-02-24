<template>
  <div class="icon-wrapper" :class="{ 'icon-wrapper--badge': badge }">
    <svg
      class="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle class="icon__wheel icon__wheel--left" cx="9" cy="21" r="1" />
      <circle class="icon__wheel icon__wheel--right" cx="20" cy="21" r="1" />
      <path class="icon__body" d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
    <span v-if="badge" class="icon-badge">{{ badge }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  badge?: number | string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.icon-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon {
  width: 24px;
  height: 24px;
  color: $color-text-secondary;
  transition: color $transition-fast, transform $transition-fast;

  &__body {
    transform-origin: center;
    transition: transform $transition-fast;
  }

  &__wheel {
    transition: transform $transition-fast;
  }
}

.icon-wrapper:hover .icon {
  color: $color-accent;
  transform: translateY(-2px);

  .icon__body {
    animation: cart-bounce 0.4s ease;
  }

  .icon__wheel--left {
    animation: wheel-spin 0.5s ease;
  }

  .icon__wheel--right {
    animation: wheel-spin 0.5s ease 0.1s;
  }
}

.icon-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: $color-accent;
  border-radius: 9px;
  font-size: 11px;
  font-weight: $font-weight-bold;
  color: $color-bg-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: badge-pop 0.3s ease;
}

@keyframes cart-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes wheel-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes badge-pop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>
