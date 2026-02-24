<template>
  <div class="not-found">
    <div class="not-found__content">
      <div class="not-found__code">404</div>
      <h1 class="not-found__title">Página no encontrada</h1>
      <p class="not-found__subtitle">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <div class="not-found__actions">
        <RouterLink to="/" class="not-found__btn not-found__btn--primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Volver al inicio
        </RouterLink>
        <RouterLink to="/shop" class="not-found__btn not-found__btn--secondary">
          Ver catálogo
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </RouterLink>
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

.not-found {
  min-height: 100vh;
  @include flex-center;
  background: $color-bg-primary;
  padding: $spacing-4xl $padding-container;

  &__content {
    @include flex-column-center;
    text-align: center;
    max-width: 500px;
  }

  &__code {
    font-size: clamp(6rem, 20vw, 12rem);
    font-weight: $font-weight-bold;
    color: $color-accent;
    line-height: 1;
    letter-spacing: $letter-spacing-tight;
    text-shadow: 0 0 60px rgba(249, 115, 22, 0.3);
    animation: pulse-glow 2s ease-in-out infinite;
  }

  &__title {
    font-size: clamp(1.5rem, 4vw, 2rem);
    @include text-title;
    margin: $spacing-lg 0 $spacing-md;
    animation: slide-up 0.5s ease-out 0.1s backwards;
  }

  &__subtitle {
    font-size: $font-size-base;
    color: $color-text-secondary;
    margin-bottom: $spacing-2xl;
    animation: slide-up 0.5s ease-out 0.2s backwards;

    @include respond-to(md) {
      font-size: $font-size-lg;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    width: 100%;
    animation: slide-up 0.5s ease-out 0.3s backwards;

    @include respond-to(sm) {
      flex-direction: row;
      justify-content: center;
    }
  }

  &__btn {
    @include flex-center;
    gap: $spacing-sm;
    padding: $spacing-md $spacing-xl;
    border-radius: $radius-md;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    text-decoration: none;
    transition: all $transition-fast;

    svg {
      width: 18px;
      height: 18px;
    }

    &--primary {
      background: $color-accent;
      color: $color-bg-primary;

      &:hover {
        background: $color-accent-hover;
        box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
        transform: translateY(-2px);
      }
    }

    &--secondary {
      background: $color-bg-tertiary;
      border: 1px solid $color-border-light;
      color: $color-text-secondary;

      &:hover {
        border-color: $color-accent;
        color: $color-accent;

        svg {
          transform: translateX(4px);
        }
      }

      svg {
        transition: transform $transition-fast;
      }
    }
  }
}

@keyframes pulse-glow {
  0%, 100% {
    text-shadow: 0 0 60px rgba(249, 115, 22, 0.3);
  }
  50% {
    text-shadow: 0 0 80px rgba(249, 115, 22, 0.5);
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
