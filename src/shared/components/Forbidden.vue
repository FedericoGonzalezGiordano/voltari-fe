<template>
  <div class="forbidden">
    <div class="forbidden__content">
      <div class="forbidden__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <div class="forbidden__code">403</div>
      <h1 class="forbidden__title">Acceso denegado</h1>
      <p class="forbidden__subtitle">
        No tienes permisos para acceder a esta página. Si crees que esto es un error, contacta al soporte.
      </p>
      <div class="forbidden__actions">
        <RouterLink to="/" class="forbidden__btn forbidden__btn--primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Volver al inicio
        </RouterLink>
        <button class="forbidden__btn forbidden__btn--secondary" @click="goBack">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Volver atrás
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.forbidden {
  min-height: 100vh;
  @include flex-center;
  background: $color-bg-primary;
  padding: $spacing-4xl $padding-container;

  &__content {
    @include flex-column-center;
    text-align: center;
    max-width: 500px;
  }

  &__icon {
    width: 80px;
    height: 80px;
    @include flex-center;
    background: rgba(239, 68, 68, 0.1);
    border-radius: $radius-full;
    color: #ef4444;
    margin-bottom: $spacing-lg;
    animation: shake 0.5s ease-in-out;

    svg {
      width: 40px;
      height: 40px;
    }
  }

  &__code {
    font-size: clamp(4rem, 15vw, 8rem);
    font-weight: $font-weight-bold;
    color: #ef4444;
    line-height: 1;
    letter-spacing: $letter-spacing-tight;
    animation: slide-up 0.5s ease-out backwards;
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
    cursor: pointer;
    border: none;

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
        border-color: $color-border-accent;
        color: $color-text-primary;

        svg {
          transform: translateX(-4px);
        }
      }

      svg {
        transition: transform $transition-fast;
      }
    }
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
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
