<template>
  <div class="cart-page">
    <CartHeader :itemCount="itemCount" :total="cartStore.summary.total" />

    <div class="cart-page__container">
      <CartEmpty v-if="cartStore.items.length === 0" />

      <template v-else>
        <div class="cart-page__content">
          <div class="cart-page__items-list">
            <TransitionGroup name="cart-items" tag="div" class="cart-page__items">
              <CartItem
                v-for="(item, index) in cartStore.items"
                :key="item.id"
                :item="item"
                :index="index"
              />
            </TransitionGroup>
          </div>
          <CartSummary @continue-shopping="handleContinueShopping" @checkout="handleCheckout" />
        </div>

        <div v-if="cartStore.items.length > 0" class="cart-page__mobile-sheet">
          <div class="cart-page__mobile-total">
            <div>
              <p class="cart-page__mobile-label">Total estimado</p>
              <p class="cart-page__mobile-amount">${{ cartStore.summary.total.toFixed(2) }}</p>
            </div>
            <button class="cart-page__mobile-cta">Proceder al pago</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/useCartStore'
import CartHeader from './CartHeader.vue'
import CartItem from './CartItem.vue'
import CartSummary from './CartSummary.vue'
import CartEmpty from './CartEmpty.vue'

const router = useRouter()
const cartStore = useCartStore()

const itemCount = computed(() =>
  cartStore.items.reduce((sum, item) => sum + item.quantity, 0)
)

const handleContinueShopping = () => {
  router.push('/shop')
}

const handleCheckout = () => {
  // TODO: Navigate to checkout page
  console.log('Proceder al pago')
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.cart-page {
  background: $color-bg-primary;
  min-height: 100vh;

  &__container {
    @include container-wide;
    padding: 0 $padding-container $spacing-xl;
    margin: 0 auto;

    @include respond-to(md) {
      padding: 0 $padding-container $spacing-2xl;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-4xl;

    @include respond-to(lg) {
      grid-template-columns: 1fr 380px;
      gap: $spacing-6xl;
    }
  }

  &__items-list {
    min-height: 400px;
  }

  &__items {
    @include flex-column;
    gap: $spacing-2xl;
  }

  &__mobile-sheet {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-bg-tertiary;
    border-top: 1px solid $color-border-light;
    padding: $spacing-md;
    z-index: 50;

    @include respond-to(lg) {
      display: none;
    }
  }

  &__mobile-total {
    @include flex-between;
    align-items: center;
  }

  &__mobile-label {
    font-size: 11px;
    color: $color-text-secondary;
  }

  &__mobile-amount {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-accent;
  }

  &__mobile-cta {
    @include button-cta;
    padding: $spacing-sm $spacing-xl;
    font-size: $font-size-sm;
  }
}

.cart-items-enter-active {
  animation: cart-item-enter 0.3s ease-out;
}

.cart-items-leave-active {
  animation: cart-item-leave 0.3s ease-out;
}

.cart-items-move {
  transition: transform $transition-normal;
}

@keyframes cart-item-enter {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cart-item-leave {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100px);
  }
}
</style>

