<template>
  <div
    class="cart-item cart-item--animated"
    :style="{ animationDelay: `${index * 0.1}s` }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="cart-item__wrapper">
      <div class="cart-item__image-wrapper">
        <Transition name="image-fade" mode="out-in">
          <img 
            :key="currentImageIndex"
            :src="item.images[currentImageIndex]" 
            :alt="item.name" 
            class="cart-item__image"
            @mouseenter="handleImageHover"
            @mouseleave="handleImageLeave"
          />
        </Transition>
        <!-- Discount badge on image -->
        <div v-if="discount > 0" class="cart-item__discount-badge">-{{ discount }}%</div>
        <Transition name="fade">
          <div v-if="isHovered" class="cart-item__overlay">
            <button class="cart-item__quick-view" aria-label="Quick view">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </Transition>
        <!-- Image indicators -->
        <div v-if="item.images.length > 1" class="cart-item__image-indicators">
          <button
            v-for="(_, index) in item.images"
            :key="index"
            :class="['cart-item__indicator', { 'cart-item__indicator--active': index === currentImageIndex }]"
            @click="currentImageIndex = index"
            :aria-label="`View image ${index + 1}`"
          />
        </div>
      </div>

      <div class="cart-item__content">
      <div class="cart-item__header">
        <div class="cart-item__info">
          <h3 class="cart-item__name">{{ item.name }}</h3>
          <p class="cart-item__description">{{ item.description }}</p>
          <p class="cart-item__sku">{{ item.sku }}</p>
          <div class="cart-item__stock-wrapper">
            <StockBadge :stock="item.stock" />
          </div>
        </div>
        
        <!-- Remove button - desktop -->
        <button
          class="cart-item__remove-btn"
          @click="removeItem"
          aria-label="Remove item"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>

      <div v-if="hasVariants" class="cart-item__variants">
        <div v-if="item.variants.color" class="cart-item__variant-group">
          <label class="cart-item__variant-label">Color</label>
          <div class="cart-item__color-swatches">
            <ColorSwatch
              v-for="color in item.variants.color"
              :key="color.value"
              :label="color.name"
              :color="color.value"
              :selected="item.selectedVariants.color === color.value"
              @select="updateVariant('color', color.value)"
            />
          </div>
        </div>

        <div v-if="item.variants.size" class="cart-item__variant-group">
          <label class="cart-item__variant-label">Configuración</label>
          <select
            :value="item.selectedVariants.size"
            class="cart-item__select"
            @change="updateVariant('size', ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="size in item.variants.size" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
        </div>

        <div v-if="item.variants.material" class="cart-item__variant-group">
          <label class="cart-item__variant-label">Material</label>
          <div class="cart-item__material-pills">
            <button
              v-for="material in item.variants.material"
              :key="material"
              :class="['cart-item__pill', { 'cart-item__pill--active': item.selectedVariants.material === material }]"
              @click="updateVariant('material', material)"
            >
              {{ material }}
            </button>
          </div>
        </div>
      </div>

      <div class="cart-item__footer">
        <div class="cart-item__pricing">
          <div class="cart-item__price-group">
            <div class="cart-item__price-row">
              <span v-if="item.originalPrice" class="cart-item__original-price">
                ${{ item.originalPrice.toFixed(2) }}
              </span>
              <span class="cart-item__price">${{ item.price.toFixed(2) }}</span>
            </div>
            <span v-if="item.quantity > 1" class="cart-item__total-price">
              ${{ (item.price * item.quantity).toFixed(2) }} total
            </span>
          </div>
        </div>

        <QuantitySelector :quantity="item.quantity" @change="updateQuantity" />
      </div>

      <!-- Mobile actions -->
      <div class="cart-item__mobile-actions">
        <button class="cart-item__mobile-btn" title="Save for later">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.88" />
          </svg>
          Guardar
        </button>
        <button class="cart-item__mobile-btn cart-item__mobile-btn--danger" @click="removeItem" title="Remove">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
          Eliminar
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/useCartStore'
import type  { CartItem as CartItemType } from '../types'
import QuantitySelector from './QuantitySelector.vue'
import ColorSwatch from './ColorSwatch.vue'
import StockBadge from './StockBadge.vue'

const props = defineProps<{
  item: CartItemType
  index?: number
}>()

const index = props.index ?? 0

const cartStore = useCartStore()
const isHovered = ref(false)
const currentImageIndex = ref(0)
const isImageHovered = ref(false)

const discount = computed(() =>
  props.item.originalPrice
    ? Math.round(((props.item.originalPrice - props.item.price) / props.item.originalPrice) * 100)
    : 0
)

const handleImageHover = () => {
  isImageHovered.value = true
}

const handleImageLeave = () => {
  isImageHovered.value = false
}

const hasVariants = computed(() =>
  !!(props.item.variants.color || props.item.variants.size || props.item.variants.material)
)

const updateQuantity = (quantity: number) => {
  cartStore.updateQuantity(props.item.id, quantity)
}

const updateVariant = (variantType: string, value: string) => {
  cartStore.updateVariant(props.item.id, variantType, value)
}

const removeItem = () => {
  cartStore.removeItem(props.item.id)
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.cart-item {
  @include card-base;
  padding: $spacing-xl $spacing-lg;
  
  @include respond-to(md) {
    padding: $spacing-2xl $spacing-3xl;
  }

  &:hover {
    @include card-hover;
  }

  &--animated {
    animation: cart-item-enter 0.4s ease-out backwards;
  }
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

.cart-item {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;

    @include respond-to(md) {
      flex-direction: row;
      gap: $spacing-3xl;
      align-items: flex-start;
    }
  }

  &__image-wrapper {
    position: relative;
    width: 100%;
    height: 192px;
    overflow: hidden;
    border-radius: $radius-lg;
    background: $color-bg-secondary;
    flex-shrink: 0;

    @include respond-to(md) {
      width: 200px;
      height: 200px;
    }
  }

  &__discount-badge {
    position: absolute;
    top: $spacing-sm;
    right: $spacing-sm;
    background: $color-accent;
    color: $color-bg-primary;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    padding: $spacing-xs $spacing-sm;
    border-radius: $radius-sm;
    z-index: 2;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-normal;

    .cart-item__image-wrapper:hover & {
      transform: scale(1.05);
    }
  }

  &__image-indicators {
    position: absolute;
    bottom: $spacing-sm;
    left: 50%;
    transform: translateX(-50%);
    @include flex-center;
    gap: $spacing-xs;
  }

  &__indicator {
    width: 6px;
    height: 6px;
    border-radius: $radius-full;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all $transition-fast;

    &--active {
      width: 16px;
      background: $color-accent;
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    @include flex-center;
    background: $color-backdrop-heavy;
  }

  &__quick-view {
    @include button-base;
    width: 48px;
    height: 48px;
    border-radius: $radius-full;
    background: $color-accent;
    color: $color-bg-primary;

    &:hover {
      background: $color-accent-hover;
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }

  &__content {
    @include flex-column;
    gap: $spacing-lg;
    flex: 1;
    min-width: 0;
  }

  &__header {
    @include flex-between;
    gap: $spacing-md;
    align-items: flex-start;
    margin-bottom: $spacing-lg;
  }

  &__info {
    flex: 1;
  }

  &__stock-wrapper {
    margin-top: $spacing-md;
  }

  &__remove-btn {
    @include button-base;
    width: 40px;
    height: 40px;
    border-radius: $radius-md;
    color: $color-text-secondary;
    opacity: 0;
    transition: all $transition-fast;

    .cart-item:hover & {
      opacity: 1;
    }

    &:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }

    svg {
      width: 20px;
      height: 20px;
    }

    @include respond-to(md) {
      display: flex;
    }
  }

  &__name {
    font-size: $font-size-base;
    @include text-title;
    margin-bottom: $spacing-xs;

    @include respond-to(md) {
      font-size: $font-size-lg;
    }
  }

  &__description {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-bottom: $spacing-xs;
  }

  &__sku {
    font-size: 0.75rem;
    font-family: monospace;
    color: $color-text-muted;
  }

  &__pricing {
    flex: 1;
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
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-accent;
  }

  &__total-price {
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }

  &__variants {
    @include flex-column;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
  }

  &__variant-group {
    @include flex-column;
    gap: $spacing-sm;
  }

  &__variant-label {
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: $letter-spacing-wider;
  }

  &__color-swatches {
    @include flex-center;
    gap: $spacing-md;
    flex-wrap: wrap;
  }

  &__select {
    background: $color-bg-tertiary;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    padding: $spacing-sm $spacing-md;
    color: $color-text-primary;
    font-size: $font-size-base;
    cursor: pointer;
    transition: all $transition-fast;

    &:focus {
      outline: none;
      border-color: $color-accent;
      box-shadow: 0 0 0 2px $color-accent-glow;
    }

    &:hover {
      border-color: $color-border-accent;
    }
  }

  &__material-pills {
    @include flex-center;
    gap: $spacing-sm;
    flex-wrap: wrap;
  }

  &__pill {
    @include button-base;
    padding: $spacing-sm $spacing-lg;
    background: $color-bg-tertiary;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    color: $color-text-secondary;
    font-size: $font-size-sm;

    &:hover {
      border-color: $color-border-accent;
      color: $color-text-primary;
    }

    &--active {
      background: $color-accent-light;
      border-color: $color-accent;
      color: $color-accent;
    }
  }

  &__footer {
    @include flex-between;
    gap: $spacing-md;
    padding-top: $spacing-lg;
    border-top: 1px solid $color-border-light;
    align-items: flex-end;
  }

  &__mobile-actions {
    @include flex-center;
    gap: $spacing-sm;
    margin-top: $spacing-lg;
    padding-top: $spacing-lg;
    border-top: 1px solid $color-border-light;

    @include respond-to(md) {
      display: none;
    }
  }

  &__mobile-btn {
    @include button-base;
    @include flex-center;
    gap: $spacing-xs;
    flex: 1;
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
    background: $color-bg-tertiary;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    color: $color-text-secondary;
    transition: all $transition-fast;

    &:hover {
      border-color: $color-border-accent;
      color: $color-text-primary;
    }

    &--danger {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.2);

      &:hover {
        background: rgba(239, 68, 68, 0.2);
      }
    }

    svg {
      width: 16px;
      height: 16px;
    }
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

.image-fade-enter-active,
.image-fade-leave-active {
  transition: opacity 0.3s;
}

.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
}
</style>
