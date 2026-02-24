<template>
  <div class="product-card product-card--animated" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="product-card__image-wrapper">
      <img :src="product.images[0]" :alt="product.name" class="product-card__image" />
      
      <!-- Badges -->
      <div class="product-card__badges">
        <span v-if="badgeText" class="product-card__badge product-card__badge--bestseller">
          {{ badgeText }}
        </span>
        <span v-if="discount > 0" class="product-card__badge product-card__badge--discount">
          -{{ discount }}%
        </span>
      </div>

      <!-- Overlay on hover -->
      <Transition name="fade">
        <div v-if="isHovered" class="product-card__overlay">
          <button class="product-card__quick-view-btn" aria-label="Quick view" @click.stop="handleQuickView">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Vista rápida
          </button>
        </div>
      </Transition>
    </div>

    <div class="product-card__content">
      <div class="product-card__header">
        <div>
          <h3 class="product-card__name">{{ product.name }}</h3>
          <p class="product-card__description">{{ product.description }}</p>
        </div>
        <StockBadge :stock="product.stock" />
      </div>

      <div class="product-card__pricing">
        <div class="product-card__price-group">
          <div class="product-card__price-row">
            <span v-if="product.originalPrice" class="product-card__original-price">
              ${{ product.originalPrice.toFixed(2) }}
            </span>
            <span class="product-card__price">${{ product.price.toFixed(2) }}</span>
          </div>
          <span class="product-card__installments">
            o {{ installments }}x ${{ (product.price / installments).toFixed(2) }}
          </span>
        </div>
      </div>

      <button class="product-card__add-to-cart" @click="handleAddToCart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="product-card__cart-icon">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        Agregar al carrito
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Product } from '../data/productsData'
import StockBadge from '@/modules/cart/components/StockBadge.vue'
import { useCartStore } from '@/modules/cart'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const isHovered = ref(false)

const discount = computed(() =>
  props.product.originalPrice
    ? Math.round(((props.product.originalPrice - props.product.price) / props.product.originalPrice) * 100)
    : 0
)

const badgeText = computed(() => {
  if (props.product.badge === 'bestseller' || props.product.bestSeller) return 'Más vendido'
  if (props.product.badge === 'new') return 'Nuevo ingreso'
  if (props.product.badge === 'combo') return 'Combo'
  return null
})

const installments = computed(() => props.product.installments || 12)

const handleQuickView = () => {
  console.log('Quick view:', props.product.name)
}

const handleAddToCart = () => {
  cartStore.addItem({
    id: props.product.id,
    name: props.product.name,
    description: props.product.description,
    sku: props.product.sku,
    price: props.product.price,
    originalPrice: props.product.originalPrice,
    quantity: 1,
    stock: props.product.stock,
    images: props.product.images,
    variants: props.product.variants,
    selectedVariants: {},
  })
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.product-card {
  @include card-base;
  padding: $spacing-lg;
  @include flex-column;
  gap: $spacing-md;
  transition: all $transition-normal;
  position: relative;

  &:hover {
    @include card-hover;
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(249, 115, 22, 0.15);
  }

  &--animated {
    animation: product-card-enter 0.3s ease-out;
  }
}

@keyframes product-card-enter {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-card {
  &__image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: $radius-lg;
    background: $color-bg-secondary;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-normal;

    .product-card:hover & {
      transform: scale(1.05);
    }
  }

  &__badges {
    position: absolute;
    top: $spacing-sm;
    left: $spacing-sm;
    right: $spacing-sm;
    @include flex-between;
    align-items: flex-start;
  }

  &__badge {
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    padding: $spacing-xs $spacing-sm;
    border-radius: $radius-sm;
    text-transform: uppercase;
    letter-spacing: $letter-spacing-wide;

    &--bestseller {
      background: $color-accent;
      color: $color-bg-primary;
    }

    &--discount {
      background: $color-accent;
      color: $color-bg-primary;
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    @include flex-center;
    background: $color-backdrop-heavy;
  }

  &__quick-view-btn {
    @include button-base;
    @include flex-center;
    gap: $spacing-xs;
    padding: $spacing-sm $spacing-lg;
    border-radius: $radius-md;
    background: $color-bg-tertiary;
    color: $color-text-primary;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    transition: all $transition-fast;

    &:hover {
      background: $color-accent;
      color: $color-bg-primary;
      box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &__content {
    @include flex-column;
    gap: $spacing-md;
    flex: 1;
  }

  &__header {
    @include flex-column;
    gap: $spacing-xs;
  }

  &__name {
    font-size: $font-size-base;
    @include text-title;
    margin: 0;

    @include respond-to(md) {
      font-size: $font-size-lg;
    }
  }

  &__description {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin: 0;
  }

  &__pricing {
    margin-top: auto;
  }

  &__price-group {
    @include flex-column;
    gap: $spacing-xs;
  }

  &__price-row {
    @include flex-center;
    gap: $spacing-sm;
    align-items: baseline;
  }

  &__original-price {
    font-size: $font-size-sm;
    color: $color-text-subtle;
    text-decoration: line-through;
  }

  &__price {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-accent;

    @include respond-to(md) {
      font-size: $font-size-2xl;
    }
  }

  &__installments {
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }

  &__add-to-cart {
    @include button-cta;
    width: 100%;
    @include flex-center;
    gap: $spacing-xs;
    margin-top: $spacing-sm;
    transition: all $transition-fast;

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  &__cart-icon {
    width: 18px;
    height: 18px;
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
</style>
