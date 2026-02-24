<template>
  <nav class="nav-bar" :class="{ 'nav-bar--scrolled': isScrolled }">
    <div class="nav-bar__content">
      <div class="nav-bar__logo">
        <img
          :src="logoSrc"
          alt="Voltari"
          class="nav-bar__logo-img"
        />
      </div>
      <ul class="nav-bar__links">
        <li><RouterLink to="/shop">{{ t('nav.products') }}</RouterLink></li>
        <li><a href="#servicios">{{ t('nav.services') }}</a></li>
        <li><a href="#contacto">{{ t('nav.contact') }}</a></li>
      </ul>
      <div class="nav-bar__actions">
        <LangSelector />
        <button class="nav-bar__cart-btn" @click="goToCart" :title="`Cart (${itemCount})`">
          <CartIcon />
          <span v-if="itemCount > 0" class="nav-bar__cart-badge">{{ itemCount }}</span>
        </button>
        <UserIcon />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScroll } from '@/shared/composables/useScroll'
import { useCartStore } from '@/modules/cart'
import LangSelector from '@/shared/components/LangSelector.vue'
import { CartIcon, UserIcon } from '@/shared/icons'
import logoSrc from '@/assets/images/voltari-lading-logo.png'

const { t } = useI18n()
const router = useRouter()
const cartStore = useCartStore()
const { isScrolled } = useScroll({ threshold: 50 })

const itemCount = computed(() =>
  cartStore.items.reduce((sum, item) => sum + item.quantity, 0)
)

const goToCart = () => {
  router.push('/cart')
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: $z-index-fixed;
  height: 60px;
  transition: all $transition-normal;

  @include respond-to(md) {
    height: 80px;
  }

  &--scrolled {
    background: rgba(10, 10, 10, 0.85);
    height: 50px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    @include respond-to(md) {
      height: 60px;
    }
  }

  &__content {
    @include container-wide;
    @include flex-between;
    height: 100%;
  }

  &__logo {
    display: flex;
    align-items: center;
    height: 100%;
  }

  &__logo-img {
    height: 100px;
    width: auto;
    object-fit: contain;

    @include respond-to(md) {
      height: 250px;
    }
  }

  &__links {
    display: none;
    gap: $spacing-3xl;

    @include respond-to(lg) {
      display: flex;
    }

    a,
    :deep(a) {
      color: $color-text-secondary;
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      text-decoration: none;
      transition: color $transition-fast;

      &:hover {
        color: $color-text-primary;
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $spacing-sm;

    @include respond-to(md) {
      gap: $spacing-md;
    }
  }

  &__cart-btn {
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: $spacing-sm;
    @include flex-center;
    color: $color-accent;
    transition: all $transition-fast;

    &:hover {
      transform: scale(1.1);
      color: $color-accent-hover;
    }
  }

  &__cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: $color-accent;
    color: $color-bg-primary;
    font-size: 11px;
    font-weight: $font-weight-bold;
    width: 20px;
    height: 20px;
    border-radius: $radius-full;
    @include flex-center;
  }
}
</style>
