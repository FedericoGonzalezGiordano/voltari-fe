import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, CartSummary } from '../types/index.js'
import { mockCartItems } from '../composables/useMockData.js'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(mockCartItems)

  const summary = computed((): CartSummary => {
    const subtotal = items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = items.value.reduce(
      (sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity,
      0
    )
    const shippingCost = subtotal > 200 ? 0 : 15.99
    const tax = (subtotal - discount + shippingCost) * 0.21

    return {
      subtotal,
      discount,
      shippingCost,
      tax,
      total: subtotal - discount + shippingCost + tax,
    }
  })

  const updateQuantity = (id: string, quantity: number) => {
    const item = items.value.find((i) => i.id === id)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  }

  const removeItem = (id: string) => {
    items.value = items.value.filter((item) => item.id !== id)
  }

  const updateVariant = (id: string, variantType: string, value: string) => {
    const item = items.value.find((i) => i.id === id)
    if (item) {
      item.selectedVariants[variantType as keyof typeof item.selectedVariants] = value
    }
  }

  const addItem = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const existingItem = items.value.find((i) => i.id === newItem.id)
    if (existingItem) {
      existingItem.quantity += newItem.quantity || 1
    } else {
      items.value.push({
        ...newItem,
        quantity: newItem.quantity || 1,
      } as CartItem)
    }
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    summary,
    updateQuantity,
    removeItem,
    updateVariant,
    addItem,
    clearCart,
  }
})
