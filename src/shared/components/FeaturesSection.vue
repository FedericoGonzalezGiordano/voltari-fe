<template>
  <section class="features">
    <div class="features__container">
      <span class="features__tag">{{ t('features.tag') }}</span>
      <h2 class="features__title">{{ t('features.title') }}</h2>

      <div class="features__grid">
        <FeatureCard
          v-for="feature in features"
          :key="feature.key"
          :icon="feature.icon"
          :title="t(`features.${feature.key}.title`)"
          :description="t(`features.${feature.key}.description`)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import FeatureCard from '@/shared/components/FeatureCard.vue'

const { t } = useI18n()

const features = [
  { key: 'tools', icon: '🔧' },
  { key: 'shipping', icon: '🚚' },
  { key: 'financing', icon: '💳' },
  { key: 'service', icon: '🛠️' }
]
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.features {
  padding: $spacing-5xl $padding-container;
  @include gradient-bg;

  @include respond-to(md) {
    padding: $spacing-6xl $padding-container;
  }

  &__container {
    @include container;
    text-align: center;
  }

  &__tag {
    @include text-tag;
    margin-bottom: $spacing-md;
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3rem);
    @include text-title;
    margin-bottom: $spacing-4xl;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-2xl;

    @include respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
