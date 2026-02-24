<template>
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
    <line class="icon__line" x1="5" y1="12" x2="19" y2="12" />
    <polyline class="icon__arrow" points="12 5 19 12 12 19" />
  </svg>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.icon {
  width: 20px;
  height: 20px;
  transition: transform $transition-normal;

  &__line {
    transition: transform $transition-fast;
    transform-origin: left center;
  }

  &__arrow {
    transition: transform $transition-fast;
  }
}
</style>
