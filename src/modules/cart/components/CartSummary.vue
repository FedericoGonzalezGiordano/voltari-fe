<template>
  <aside class="cart-summary">
    <div class="cart-summary__card">
      <!-- Header with icon and item count -->
      <div class="cart-summary__header">
        <div class="cart-summary__header-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <div>
          <h2 class="cart-summary__title">Resumen del carrito</h2>
          <p class="cart-summary__item-count">{{ itemCount }} {{ itemCount === 1 ? 'producto' : 'productos' }}</p>
        </div>
      </div>

      <!-- Coupon Section -->
      <div class="cart-summary__coupon">
        <label class="cart-summary__coupon-label">Código de descuento</label>
        <div class="cart-summary__coupon-input-group">
          <input
            v-model="couponCode"
            type="text"
            class="cart-summary__coupon-input"
            placeholder="Ingresa tu código"
            @input="couponStatus = 'idle'"
          />
          <button class="cart-summary__coupon-btn" @click="handleApplyCoupon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="cart-summary__coupon-icon">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            Aplicar
          </button>
        </div>
        <Transition name="coupon-slide">
          <div v-if="couponStatus !== 'idle'" :class="['cart-summary__coupon-message', `cart-summary__coupon-message--${couponStatus}`]">
            <svg v-if="couponStatus === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="cart-summary__coupon-message-icon">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="cart-summary__coupon-message-icon">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {{ couponMessage }}
          </div>
        </Transition>
      </div>

      <div class="cart-summary__items">
        <div class="cart-summary__row">
          <span>Subtotal</span>
          <span>${{ summary.subtotal.toFixed(2) }}</span>
        </div>

        <div v-if="summary.discount > 0" class="cart-summary__row cart-summary__row--discount">
          <span>Descuento</span>
          <span>-${{ summary.discount.toFixed(2) }}</span>
        </div>

        <div class="cart-summary__row">
          <span>Envío</span>
          <span :class="{ 'cart-summary__free': summary.shippingCost === 0 }">
            {{ summary.shippingCost === 0 ? 'GRATIS' : `$${summary.shippingCost.toFixed(2)}` }}
          </span>
        </div>

        <div class="cart-summary__row">
          <span>Impuestos (21%)</span>
          <span>${{ summary.tax.toFixed(2) }}</span>
        </div>
      </div>

      <div class="cart-summary__divider"></div>

      <div class="cart-summary__total">
        <span>Total</span>
        <Transition name="total-pulse" mode="out-in">
          <div :key="summary.total" class="cart-summary__total-wrapper">
            <span class="cart-summary__total-amount">
              ${{ summary.total.toFixed(2) }}
            </span>
            <span class="cart-summary__total-note">IVA incluido</span>
          </div>
        </Transition>
      </div>

      <button class="cart-summary__checkout" @click="$emit('checkout')">Proceder al pago</button>

      <button class="cart-summary__secondary-btn" @click="$emit('continueShopping')">Continuar comprando</button>

      <div class="cart-summary__badges">
        <div class="cart-summary__badge">
          <span class="cart-summary__badge-icon">✓</span>
          <span>Pago seguro</span>
        </div>
        <div class="cart-summary__badge">
          <span class="cart-summary__badge-icon">✓</span>
          <span>Envío rápido</span>
        </div>
        <div class="cart-summary__badge">
          <span class="cart-summary__badge-icon">✓</span>
          <span>Garantía</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/useCartStore'

const cartStore = useCartStore()
const { summary } = cartStore

const itemCount = computed(() =>
  cartStore.items.reduce((sum, item) => sum + item.quantity, 0)
)

const couponCode = ref('')
const couponStatus = ref<'idle' | 'success' | 'error'>('idle')
const couponMessage = ref('')

const handleApplyCoupon = () => {
  if (couponCode.value.toUpperCase() === 'TOOLFUT10') {
    couponStatus.value = 'success'
    couponMessage.value = '¡Cupón aplicado! 10% de descuento'
  } else if (couponCode.value) {
    couponStatus.value = 'error'
    couponMessage.value = 'Cupón inválido'
  }
}

defineEmits<{
  continueShopping: []
  checkout: []
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.cart-summary {
  position: sticky;
  top: $spacing-2xl;

  &__card {
    @include card-base;
    padding: $spacing-2xl;
  }

  &__header {
    @include flex-center;
    gap: $spacing-md;
    margin-bottom: $spacing-xl;
    padding-bottom: $spacing-xl;
    border-bottom: 1px solid $color-border-light;
  }

  &__header-icon {
    width: 40px;
    height: 40px;
    @include flex-center;
    background: $color-accent-light;
    border-radius: $radius-lg;
    color: $color-accent;
    flex-shrink: 0;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__title {
    font-size: $font-size-lg;
    @include text-title;
    margin: 0 0 $spacing-xs 0;
  }

  &__item-count {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin: 0;
  }

  &__coupon {
    margin-bottom: $spacing-xl;
    padding-bottom: $spacing-xl;
    border-bottom: 1px solid $color-border-light;
  }

  &__coupon-label {
    display: block;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: $letter-spacing-wider;
    margin-bottom: $spacing-sm;
  }

  &__coupon-input-group {
    @include flex-center;
    gap: $spacing-sm;
  }

  &__coupon-input {
    flex: 1;
    background: $color-bg-tertiary;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    padding: $spacing-sm $spacing-md;
    color: $color-text-primary;
    font-size: $font-size-base;
    transition: all $transition-fast;

    &:focus {
      outline: none;
      border-color: $color-accent;
      box-shadow: 0 0 0 2px $color-accent-glow;
    }

    &::placeholder {
      color: $color-text-muted;
    }
  }

  &__coupon-btn {
    @include button-base;
    @include flex-center;
    gap: $spacing-xs;
    padding: $spacing-sm $spacing-md;
    background: $color-bg-tertiary;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    color: $color-text-primary;
    font-size: $font-size-sm;
    white-space: nowrap;
    transition: all $transition-fast;

    &:hover {
      background: $color-accent;
      border-color: $color-accent;
      color: $color-bg-primary;
    }
  }

  &__coupon-icon {
    width: 16px;
    height: 16px;
  }

  &__coupon-message {
    @include flex-center;
    gap: $spacing-xs;
    margin-top: $spacing-sm;
    padding: $spacing-sm $spacing-md;
    border-radius: $radius-md;
    font-size: $font-size-sm;

    &--success {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }

    &--error {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }
  }

  &__coupon-message-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  &__items {
    @include flex-column;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
  }

  &__row {
    @include flex-between;
    font-size: $font-size-base;
    color: $color-text-secondary;

    &--discount {
      color: $color-accent;
    }
  }

  &__divider {
    height: 1px;
    background: $color-border-light;
    margin: $spacing-lg 0;
  }

  &__total {
    @include flex-between;
    margin-bottom: $spacing-2xl;
    align-items: baseline;

    > span:first-child {
      font-size: $font-size-lg;
      font-weight: $font-weight-semibold;
      color: $color-text-secondary;
    }
  }

  &__total-wrapper {
    @include flex-column;
    align-items: flex-end;
    gap: $spacing-xs;
  }

  &__total-amount {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-accent;
    line-height: 1;

    @include respond-to(md) {
      font-size: $font-size-3xl;
    }
  }

  &__total-note {
    font-size: $font-size-xs;
    color: $color-text-subtle;
  }

  &__checkout {
    @include button-cta;
    width: 100%;
    transition: all $transition-fast;

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  &__secondary-btn {
    @include button-base;
    width: 100%;
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    background: transparent;
    border: none;
    margin-top: $spacing-md;
    transition: color $transition-fast;

    &:hover {
      color: $color-text-primary;
      text-decoration: underline;
    }
  }

  &__badges {
    margin-top: $spacing-xl;
    padding-top: $spacing-xl;
    border-top: 1px solid $color-border-light;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-md;
    text-align: center;
  }

  &__badge {
    @include flex-column-center;
    gap: $spacing-xs;
  }

  &__badge-icon {
    font-size: $font-size-lg;
    color: $color-accent;
    font-weight: $font-weight-bold;
  }

  &__badge > span:last-child {
    font-size: 11px;
    color: $color-text-muted;
  }

  &__free {
    color: #22c55e;
    font-weight: $font-weight-semibold;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-fast;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.coupon-slide-enter-active {
  animation: coupon-slide-in 0.3s ease-out;
}

.coupon-slide-leave-active {
  animation: coupon-slide-out 0.2s ease-in;
}

@keyframes coupon-slide-in {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes coupon-slide-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.total-pulse-enter-active {
  animation: total-pulse-in 0.3s ease-out;
}

.total-pulse-leave-active {
  animation: total-pulse-out 0.2s ease-in;
}

@keyframes total-pulse-in {
  0% {
    opacity: 0;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes total-pulse-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
