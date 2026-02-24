<template>
  <div class="landing-page">
    <NavBar />
    <DrillScrollAnimation />
    <FeaturesSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/shared/components/NavBar.vue'
import DrillScrollAnimation from '@/shared/components/DrillScrollAnimation.vue'
import FeaturesSection from '@/shared/components/FeaturesSection.vue'
import FooterSection from '@/shared/components/FooterSection.vue'
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.landing-page {
  background-color: $color-bg-primary;
  color: $color-text-primary;
  min-height: 100vh;
}
</style>
