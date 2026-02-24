<template>
  <div class="shop-page">
    <div class="shop-page__container">
      <ProductsHeader :product-count="filteredProducts.length" />

      <div class="shop-page__content">
        <!-- Desktop Sidebar -->
        <aside class="shop-page__sidebar">
          <FilterSidebar
            v-model:sort-by="sortBy"
            v-model:selected-category="selectedCategory"
            v-model:price-range="priceRange"
            v-model:selected-stock="selectedStock"
            v-model:selected-brands="selectedBrands"
            v-model:selected-power="selectedPower"
            v-model:selected-battery-type="selectedBatteryType"
            :categories="categories"
            :brands="brands"
            :power-options="powerOptions"
            :battery-types="batteryTypes"
            @reset="handleResetFilters"
          />
        </aside>

        <!-- Products Grid -->
        <div class="shop-page__products">
          <!-- Mobile Filter Button -->
          <button class="shop-page__mobile-filter-btn" @click="isMobileFilterOpen = true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filtros
            <span v-if="activeFiltersCount > 0" class="shop-page__filter-count">
              {{ activeFiltersCount }}
            </span>
          </button>

          <TransitionGroup name="products-grid" tag="div" class="shop-page__products-grid">
            <ProductCard
              v-for="(product, index) in filteredProducts"
              :key="product.id"
              :product="product"
              :style="{ animationDelay: `${index * 0.05}s` }"
            />
          </TransitionGroup>

          <!-- No results -->
          <div v-if="filteredProducts.length === 0" class="shop-page__no-results">
            <p>No se encontraron productos con los filtros seleccionados</p>
            <button class="shop-page__clear-btn" @click="handleResetFilters">
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Filter Drawer -->
    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="isMobileFilterOpen" class="shop-page__drawer-overlay" @click="isMobileFilterOpen = false">
          <div class="shop-page__drawer" @click.stop>
            <FilterSidebar
              v-model:sort-by="sortBy"
              v-model:selected-category="selectedCategory"
              v-model:price-range="priceRange"
              v-model:selected-stock="selectedStock"
              v-model:selected-brands="selectedBrands"
              v-model:selected-power="selectedPower"
              v-model:selected-battery-type="selectedBatteryType"
              :categories="categories"
              :brands="brands"
              :power-options="powerOptions"
              :battery-types="batteryTypes"
              :is-mobile="true"
              @reset="handleResetFilters"
              @close="isMobileFilterOpen = false"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockProducts, categories, brands, powerOptions, batteryTypes } from './data/productsData'
import ProductsHeader from './components/ProductsHeader.vue'
import FilterSidebar from './components/FilterSidebar.vue'
import ProductCard from './components/ProductCard.vue'

// Filter states
const sortBy = ref('bestseller')
const selectedCategory = ref('Todos')
const priceRange = ref<[number, number]>([0, 500])
const selectedStock = ref<string[]>([])
const selectedBrands = ref<string[]>([])
const selectedPower = ref<string[]>([])
const selectedBatteryType = ref<string[]>([])
const isMobileFilterOpen = ref(false)

const activeFiltersCount = computed(() => {
  let count = 0
  if (selectedCategory.value !== 'Todos') count++
  if (selectedStock.value.length > 0) count += selectedStock.value.length
  if (selectedBrands.value.length > 0) count += selectedBrands.value.length
  if (selectedPower.value.length > 0) count += selectedPower.value.length
  if (selectedBatteryType.value.length > 0) count += selectedBatteryType.value.length
  return count
})

const filteredProducts = computed(() => {
  let filtered = [...mockProducts]

  // Category filter
  if (selectedCategory.value !== 'Todos') {
    filtered = filtered.filter((p) => p.category === selectedCategory.value)
  }

  // Price range filter
  filtered = filtered.filter(
    (p) => p.price >= priceRange.value[0] && p.price <= priceRange.value[1]
  )

  // Stock filter
  if (selectedStock.value.length > 0) {
    filtered = filtered.filter((p) => selectedStock.value.includes(p.stock))
  }

  // Brand filter
  if (selectedBrands.value.length > 0) {
    filtered = filtered.filter((p) => selectedBrands.value.includes(p.brand))
  }

  // Power filter
  if (selectedPower.value.length > 0) {
    filtered = filtered.filter((p) => p.power && selectedPower.value.includes(p.power))
  }

  // Battery type filter
  if (selectedBatteryType.value.length > 0) {
    filtered = filtered.filter(
      (p) => p.batteryType && selectedBatteryType.value.includes(p.batteryType)
    )
  }

  // Sorting
  switch (sortBy.value) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      filtered.sort((a, b) => {
        const aIsNew = a.badge === 'new' ? 1 : 0
        const bIsNew = b.badge === 'new' ? 1 : 0
        return bIsNew - aIsNew
      })
      break
    case 'bestseller':
    default:
      filtered.sort((a, b) => {
        const aIsBest = a.badge === 'bestseller' || a.bestSeller ? 1 : 0
        const bIsBest = b.badge === 'bestseller' || b.bestSeller ? 1 : 0
        return bIsBest - aIsBest
      })
      break
  }

  return filtered
})

const handleResetFilters = () => {
  sortBy.value = 'bestseller'
  selectedCategory.value = 'Todos'
  priceRange.value = [0, 500]
  selectedStock.value = []
  selectedBrands.value = []
  selectedPower.value = []
  selectedBatteryType.value = []
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.shop-page {
  background: $color-bg-primary;
  min-height: 100vh;
  padding-top: calc(60px + $spacing-2xl);

  @include respond-to(md) {
    padding-top: calc(80px + $spacing-3xl);
  }

  &__container {
    @include container-wide;
    padding: 0 $padding-container $spacing-2xl;
    margin: 0 auto;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-3xl;

    @include respond-to(lg) {
      grid-template-columns: 280px 1fr;
      gap: $spacing-4xl;
    }
  }

  &__sidebar {
    display: none;

    @include respond-to(lg) {
      display: block;
    }
  }

  &__products {
    min-height: 400px;
  }

  &__mobile-filter-btn {
    @include button-base;
    @include flex-center;
    gap: $spacing-sm;
    width: 100%;
    padding: $spacing-md $spacing-lg;
    margin-bottom: $spacing-xl;
    background: $color-bg-tertiary;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    color: $color-text-secondary;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    transition: all $transition-fast;

    @include respond-to(lg) {
      display: none;
    }

    &:hover {
      border-color: $color-border-accent;
      color: $color-text-primary;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }

  &__filter-count {
    @include flex-center;
    min-width: 20px;
    height: 20px;
    padding: 0 $spacing-xs;
    background: $color-accent;
    color: $color-bg-primary;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    border-radius: $radius-full;
  }

  &__products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: $spacing-2xl;

    @include respond-to(md) {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: $spacing-6xl $spacing-xl;

    p {
      color: $color-text-secondary;
      margin-bottom: $spacing-lg;
    }
  }

  &__clear-btn {
    @include button-base;
    padding: $spacing-sm $spacing-xl;
    background: $color-bg-tertiary;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    color: $color-text-secondary;
    font-size: $font-size-sm;
    transition: all $transition-fast;

    &:hover {
      border-color: $color-accent;
      color: $color-accent;
    }
  }

  &__drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 10, 10, 0.85);
    z-index: 100;
  }

  &__drawer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 85%;
    max-width: 360px;
    background: $color-bg-primary;
    z-index: 101;
    overflow-y: auto;
  }
}

.products-grid-enter-active {
  animation: product-card-enter 0.4s ease-out backwards;
}

.products-grid-leave-active {
  animation: product-card-leave 0.2s ease-in;
}

.products-grid-move {
  transition: transform $transition-normal;
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

@keyframes product-card-leave {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}

.drawer-enter-active {
  transition: opacity 0.3s ease-out;

  .shop-page__drawer {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.drawer-leave-active {
  transition: opacity 0.2s ease-in;

  .shop-page__drawer {
    transition: transform 0.2s ease-in;
  }
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;

  .shop-page__drawer {
    transform: translateX(-100%);
  }
}

.drawer-enter-to,
.drawer-leave-from {
  opacity: 1;

  .shop-page__drawer {
    transform: translateX(0);
  }
}
</style>
