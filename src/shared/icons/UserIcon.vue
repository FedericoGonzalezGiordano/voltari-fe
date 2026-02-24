<template>
  <div class="icon-wrapper">
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
      <circle class="icon__head" cx="12" cy="7" r="4" />
      <path class="icon__body" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    </svg>
    <div class="icon-glow"></div>
  </div>
</template>

<script setup lang="ts">
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
  position: relative;
  z-index: 1;

  &__head {
    transform-origin: center;
    transition: transform $transition-fast;
  }

  &__body {
    transition: transform $transition-fast;
  }
}

.icon-glow {
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba($color-accent, 0.3) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0.5);
  transition: opacity $transition-fast, transform $transition-fast;
  z-index: 0;
}

.icon-wrapper:hover {
  .icon {
    color: $color-accent;

    .icon__head {
      animation: head-pulse 0.5s ease;
    }

    .icon__body {
      animation: body-wave 0.5s ease;
    }
  }

  .icon-glow {
    opacity: 1;
    transform: scale(1);
    animation: glow-pulse 1s ease infinite;
  }
}

@keyframes head-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

@keyframes body-wave {
  0%, 100% { transform: translateY(0); }
  30% { transform: translateY(1px); }
  60% { transform: translateY(-1px); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}
</style>
