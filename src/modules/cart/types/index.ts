export interface CartItemVariant {
  name: string
  value: string
}

export interface CartItemVariants {
  color?: CartItemVariant[]
  size?: string[]
  material?: string[]
}

export interface CartItemSelectedVariants {
  color?: string
  size?: string
  material?: string
}

export interface CartItem {
  id: string
  name: string
  description: string
  sku: string
  price: number
  originalPrice?: number
  quantity: number
  stock: 'high' | 'medium' | 'low' | 'out'
  images: string[]
  variants: CartItemVariants
  selectedVariants: CartItemSelectedVariants
}

export interface CartSummary {
  subtotal: number
  discount: number
  shippingCost: number
  tax: number
  total: number
}
