<template>
  <div :class="['filter-sidebar', { 'filter-sidebar--mobile': isMobile }]">
    <!-- Header -->
    <div class="filter-sidebar__header">
      <h2 class="filter-sidebar__title">Filtros</h2>
      <div class="filter-sidebar__actions">
        <button class="filter-sidebar__clear" @click="$emit('reset')">Limpiar</button>
        <button v-if="isMobile" class="filter-sidebar__close" @click="$emit('close')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <div class="filter-sidebar__content">
      <!-- Sort -->
      <FilterSection title="Ordenar por" :is-open="sections.sort" @toggle="toggleSection('sort')">
        <select :value="sortBy" class="filter-sidebar__select" @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)">
          <option value="bestseller">Más vendidos</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="newest">Más nuevos</option>
        </select>
      </FilterSection>

      <!-- Categories -->
      <FilterSection title="Categorías" :is-open="sections.category" @toggle="toggleSection('category')">
        <div class="filter-sidebar__options">
          <button
            v-for="category in categories"
            :key="category"
            :class="['filter-sidebar__option', { 'filter-sidebar__option--active': selectedCategory === category }]"
            @click="$emit('update:selectedCategory', category)"
          >
            {{ category }}
          </button>
        </div>
      </FilterSection>

      <!-- Price Range -->
      <FilterSection title="Rango de precio" :is-open="sections.price" @toggle="toggleSection('price')">
        <div class="filter-sidebar__price-inputs">
          <input
            type="number"
            :value="priceRange[0]"
            placeholder="Mín"
            class="filter-sidebar__input"
            @input="$emit('update:priceRange', [Number(($event.target as HTMLInputElement).value), priceRange[1]])"
          />
          <input
            type="number"
            :value="priceRange[1]"
            placeholder="Máx"
            class="filter-sidebar__input"
            @input="$emit('update:priceRange', [priceRange[0], Number(($event.target as HTMLInputElement).value)])"
          />
        </div>
      </FilterSection>

      <!-- Stock/Availability -->
      <FilterSection title="Disponibilidad" :is-open="sections.stock" @toggle="toggleSection('stock')">
        <div class="filter-sidebar__checkboxes">
          <label v-for="option in stockOptions" :key="option.value" class="filter-sidebar__checkbox-label">
            <input
              type="checkbox"
              :checked="selectedStock.includes(option.value)"
              class="filter-sidebar__checkbox"
              @change="toggleArrayFilter('selectedStock', option.value, ($event.target as HTMLInputElement).checked)"
            />
            <span>{{ option.label }}</span>
          </label>
        </div>
      </FilterSection>

      <!-- Brands -->
      <FilterSection title="Marca" :is-open="sections.brand" @toggle="toggleSection('brand')">
        <div class="filter-sidebar__pills">
          <button
            v-for="brand in brands"
            :key="brand"
            :class="['filter-sidebar__pill', { 'filter-sidebar__pill--active': selectedBrands.includes(brand) }]"
            @click="togglePill('selectedBrands', brand)"
          >
            {{ brand }}
          </button>
        </div>
      </FilterSection>

      <!-- Power -->
      <FilterSection title="Potencia" :is-open="sections.power" @toggle="toggleSection('power')">
        <div class="filter-sidebar__pills">
          <button
            v-for="power in powerOptions"
            :key="power"
            :class="['filter-sidebar__pill', { 'filter-sidebar__pill--active': selectedPower.includes(power) }]"
            @click="togglePill('selectedPower', power)"
          >
            {{ power }}
          </button>
        </div>
      </FilterSection>

      <!-- Battery Type -->
      <FilterSection title="Tipo de batería" :is-open="sections.battery" @toggle="toggleSection('battery')">
        <div class="filter-sidebar__pills">
          <button
            v-for="type in batteryTypes"
            :key="type"
            :class="['filter-sidebar__pill', { 'filter-sidebar__pill--active': selectedBatteryType.includes(type) }]"
            @click="togglePill('selectedBatteryType', type)"
          >
            {{ type }}
          </button>
        </div>
      </FilterSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import FilterSection from './FilterSection.vue'

const props = defineProps<{
  sortBy: string
  selectedCategory: string
  categories: string[]
  priceRange: [number, number]
  selectedStock: string[]
  selectedBrands: string[]
  brands: string[]
  selectedPower: string[]
  powerOptions: string[]
  selectedBatteryType: string[]
  batteryTypes: string[]
  isMobile?: boolean
}>()

const emit = defineEmits<{
  'update:sortBy': [value: string]
  'update:selectedCategory': [value: string]
  'update:priceRange': [value: [number, number]]
  'update:selectedStock': [value: string[]]
  'update:selectedBrands': [value: string[]]
  'update:selectedPower': [value: string[]]
  'update:selectedBatteryType': [value: string[]]
  'reset': []
  'close': []
}>()

const sections = reactive({
  sort: true,
  category: true,
  price: true,
  stock: false,
  brand: false,
  power: false,
  battery: false,
})

const stockOptions = [
  { value: 'high', label: 'En Stock' },
  { value: 'medium', label: 'Stock Limitado' },
  { value: 'low', label: 'Últimas Unidades' },
]

const toggleSection = (id: keyof typeof sections) => {
  sections[id] = !sections[id]
}

const toggleArrayFilter = (filterName: string, value: string, checked: boolean) => {
  const currentArray = props[filterName as keyof typeof props] as string[]
  if (checked) {
    emit(`update:${filterName}` as any, [...currentArray, value])
  } else {
    emit(`update:${filterName}` as any, currentArray.filter((v: string) => v !== value))
  }
}

const togglePill = (filterName: string, value: string) => {
  const currentArray = props[filterName as keyof typeof props] as string[]
  if (currentArray.includes(value)) {
    emit(`update:${filterName}` as any, currentArray.filter((v: string) => v !== value))
  } else {
    emit(`update:${filterName}` as any, [...currentArray, value])
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.filter-sidebar {
  @include card-base;
  padding: 0;
  position: sticky;
  top: calc(80px + $spacing-md);
  height: fit-content;

  &--mobile {
    position: relative;
    top: 0;
    height: 100%;
    overflow-y: auto;
    border-radius: 0;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-lg;
    border-bottom: 1px solid $color-border-light;
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
    margin: 0;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__clear {
    background: none;
    border: none;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    cursor: pointer;
    transition: color $transition-fast;

    &:hover {
      color: $color-accent;
    }
  }

  &__close {
    @include button-base;
    padding: $spacing-xs;
    color: $color-text-secondary;

    &:hover {
      color: $color-text-primary;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__content {
    padding: $spacing-lg;
  }

  &__select {
    width: 100%;
    padding: $spacing-sm $spacing-md;
    background: $color-bg-primary;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    color: $color-text-secondary;
    font-size: $font-size-sm;
    cursor: pointer;
    transition: all $transition-fast;

    &:focus {
      outline: none;
      border-color: $color-accent;
      box-shadow: 0 0 0 2px $color-accent-glow;
    }
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__option {
    width: 100%;
    text-align: left;
    padding: $spacing-sm $spacing-md;
    background: transparent;
    border: none;
    border-radius: $radius-md;
    color: $color-text-secondary;
    font-size: $font-size-sm;
    cursor: pointer;
    transition: all $transition-fast;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: $color-text-primary;
    }

    &--active {
      background: $color-accent-light;
      color: $color-accent;
      border: 1px solid rgba($color-accent, 0.2);
    }
  }

  &__price-inputs {
    display: flex;
    gap: $spacing-sm;
  }

  &__input {
    flex: 1;
    padding: $spacing-sm $spacing-md;
    background: $color-bg-primary;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    color: $color-text-secondary;
    font-size: $font-size-sm;
    transition: all $transition-fast;

    &::placeholder {
      color: $color-text-muted;
    }

    &:focus {
      outline: none;
      border-color: $color-accent;
      box-shadow: 0 0 0 2px $color-accent-glow;
    }
  }

  &__checkboxes {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__checkbox-label {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    cursor: pointer;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    transition: color $transition-fast;

    &:hover {
      color: $color-text-primary;
    }
  }

  &__checkbox {
    width: 16px;
    height: 16px;
    background: $color-bg-primary;
    border: 1px solid $color-border-medium;
    border-radius: $radius-sm;
    cursor: pointer;
    accent-color: $color-accent;
  }

  &__pills {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
  }

  &__pill {
    padding: $spacing-xs $spacing-md;
    background: $color-bg-primary;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    color: $color-text-secondary;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    cursor: pointer;
    transition: all $transition-fast;

    &:hover {
      border-color: $color-border-medium;
    }

    &--active {
      background: $color-accent-light;
      border-color: rgba($color-accent, 0.2);
      color: $color-accent;
    }
  }
}

@keyframes sidebar-enter {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
