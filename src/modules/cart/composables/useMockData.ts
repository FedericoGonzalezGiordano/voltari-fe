import type { CartItem } from '../types/index.js'

export const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Taladro Percutor 20V MAX',
    description: 'Motor sin escobillas de alto rendimiento, 2 velocidades',
    sku: 'TF-DRL-2024-001',
    price: 189.99,
    originalPrice: 249.99,
    quantity: 1,
    stock: 'high',
    images: [
      'https://images.unsplash.com/photo-1632095710940-ad578e8cbe6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3dlciUyMGRyaWxsfGVufDF8fHx8fDE3NzA2NzU3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {
      color: [
        { name: 'Negro', value: '#000000' },
        { name: 'Rojo', value: '#dc2626' },
        { name: 'Azul', value: '#2563eb' },
      ],
      size: ['Kit Básico', 'Kit Pro', 'Kit Completo'],
    },
    selectedVariants: {
      color: '#000000',
      size: 'Kit Pro',
    },
  },
  {
    id: '2',
    name: 'Amoladora Angular 125mm',
    description: 'Potencia 850W, sistema anti-vibración, regulación de velocidad',
    sku: 'TF-ANG-2024-087',
    price: 129.99,
    originalPrice: 159.99,
    quantity: 2,
    stock: 'medium',
    images: [
      'https://images.unsplash.com/photo-1597554354354-ad6eba0e8340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwYW5nbGUlMjBncmluZGVyfGVufDF8fHx8fDE3NzA2NzU3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {
      material: ['Plástico Industrial', 'Aleación de Magnesio'],
    },
    selectedVariants: {
      material: 'Aleación de Magnesio',
    },
  },
  {
    id: '3',
    name: 'Atornillador de Impacto 18V',
    description: 'Torque 180Nm, batería litio-ion incluida, luz LED',
    sku: 'TF-IMP-2024-142',
    price: 159.99,
    quantity: 1,
    stock: 'low',
    images: [
      'https://images.unsplash.com/photo-1648304179037-cebd797bf5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMGltcGFjdCUyMGRyaXZlcnxlbnwxfHx8fDE3NzA2NzU3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {
      color: [
        { name: 'Negro', value: '#000000' },
        { name: 'Gris', value: '#6b7280' },
      ],
      size: ['Solo Herramienta', 'Con Batería', 'Kit Completo'],
    },
    selectedVariants: {
      color: '#000000',
      size: 'Con Batería',
    },
  },
]
