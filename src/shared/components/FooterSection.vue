<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__brand">
        <img
          src="../../assets/images/voltari-lading-logo.png"
          alt="Voltari"
          class="footer__logo-img"
        />
        <p class="footer__tagline">{{ t('footer.tagline') }}</p>
      </div>
      <div class="footer__links">
        <div class="footer__column">
          <h4 class="footer__column-title">{{ t('footer.products.title') }}</h4>
          <a href="#">{{ t('footer.products.drills') }}</a>
          <a href="#">{{ t('footer.products.grinders') }}</a>
          <a href="#">{{ t('footer.products.welders') }}</a>
          <a href="#">{{ t('footer.products.compressors') }}</a>
        </div>
        <div class="footer__column">
          <h4 class="footer__column-title">{{ t('footer.company.title') }}</h4>
          <a href="#">{{ t('footer.company.about') }}</a>
          <a href="#">{{ t('footer.company.locations') }}</a>
          <a href="#">{{ t('footer.company.careers') }}</a>
        </div>
        <div class="footer__column">
          <h4 class="footer__column-title">{{ t('footer.contact.title') }}</h4>
          <a href="#">{{ t('footer.contact.whatsapp') }}</a>
          <a href="#">{{ t('footer.contact.email') }}</a>
          <a href="#">{{ t('footer.contact.social') }}</a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p>{{ t('footer.copyright') }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.footer {
  background: $color-bg-secondary;
  padding: $spacing-5xl $padding-container $spacing-2xl;
  border-top: 1px solid $color-border-light;

  &__content {
    @include container;
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-4xl;
    padding-bottom: $spacing-4xl;
    border-bottom: 1px solid $color-border-light;

    @include respond-to(md) {
      grid-template-columns: 1fr 2fr;
      align-items: start;
    }
  }

  &__brand {
    @include flex-column;
    gap: $spacing-sm;
    order: 2;

    @include respond-to(md) {
      order: 0;
    }
  }

  &__logo-img {
    height: 80px;
    width: auto;
    object-fit: contain;

    @include respond-to(md) {
      height: 120px;
    }
  }

  &__tagline {
    color: $color-text-subtle;
    font-size: $font-size-base;
    margin-top: $spacing-xs;
  }

  &__links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-2xl;
    order: 1;

    @include respond-to(sm) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include respond-to(md) {
      order: 0;
    }
  }

  &__column {
    @include flex-column;
    gap: $spacing-sm;

    a {
      color: $color-text-muted;
      font-size: $font-size-base;

      &:hover {
        color: $color-accent;
      }
    }
  }

  &__column-title {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-xs;
    @include text-uppercase;
  }

  &__bottom {
    @include container;
    padding-top: $spacing-2xl;
    text-align: center;

    p {
      color: $color-text-faint;
      font-size: $font-size-sm;
    }
  }
}
</style>
