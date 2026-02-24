<template>
  <div class="cart-empty">
    <div class="cart-empty__content">
      <div class="cart-empty__icon-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </div>
      <h2 class="cart-empty__title">Tu carrito está vacío</h2>
      <p class="cart-empty__subtitle">
        Explora nuestro catálogo de herramientas profesionales y encuentra el equipo perfecto para tu próximo proyecto.
      </p>
      <RouterLink to="/shop" class="cart-empty__cta">
        Seguir comprando
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </RouterLink>

      <!-- Decorative statistics -->
      <div class="cart-empty__stats">
        <div class="cart-empty__stat">
          <span class="cart-empty__stat-value">500+</span>
          <span class="cart-empty__stat-label">Herramientas disponibles</span>
        </div>
        <div class="cart-empty__stat">
          <span class="cart-empty__stat-value">24h</span>
          <span class="cart-empty__stat-label">Envío express</span>
        </div>
        <div class="cart-empty__stat">
          <span class="cart-empty__stat-value">2 años</span>
          <span class="cart-empty__stat-label">Garantía extendida</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.cart-empty {
  @include flex-center;
  padding: $spacing-4xl $padding-container;
  animation: fade-in 0.5s ease-out;

  &__content {
    @include flex-column-center;
    text-align: center;
  }

  &__icon-wrapper {
    width: 96px;
    height: 96px;
    @include flex-center;
    background: $color-bg-tertiary;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: $radius-full;
    margin-bottom: $spacing-xl;
    animation: scale-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.1s backwards;

    svg {
      width: 48px;
      height: 48px;
      color: $color-text-muted;
    }
  }

  &__title {
    font-size: $font-size-2xl;
    @include text-title;
    margin-bottom: $spacing-sm;
    animation: slide-up 0.4s ease-out 0.2s backwards;

    @include respond-to(md) {
      font-size: clamp(1.5rem, 5vw, 2rem);
    }
  }

  &__subtitle {
    font-size: $font-size-base;
    color: $color-text-subtle;
    max-width: 420px;
    margin-bottom: $spacing-2xl;
    animation: slide-up 0.4s ease-out 0.3s backwards;
  }

  &__cta {
    @include button-cta;
    gap: $spacing-sm;
    text-decoration: none;
    box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
    animation: slide-up 0.4s ease-out 0.4s backwards;

    svg {
      width: 18px;
      height: 18px;
      transition: transform $transition-fast;
    }

    &:hover svg {
      transform: translateX(4px);
    }
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-2xl;
    margin-top: $spacing-4xl;
    max-width: 600px;
    animation: slide-up 0.4s ease-out 0.5s backwards;
  }

  &__stat {
    @include flex-column-center;
    gap: $spacing-sm;
    text-align: center;
  }

  &__stat-value {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $color-accent;
  }

  &__stat-label {
    font-size: $font-size-xs;
    color: $color-text-subtle;
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
