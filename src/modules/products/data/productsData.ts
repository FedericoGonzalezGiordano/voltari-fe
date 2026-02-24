export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stock: 'high' | 'medium' | 'low' | 'out';
  images: string[];
  category: string;
  brand: string;
  power?: string;
  batteryType?: string;
  badge?: 'bestseller' | 'new' | 'combo';
  installments?: number;
  variants: {
    color?: { name: string; value: string }[];
    size?: string[];
    material?: string[];
  };
  featured?: boolean;
  bestSeller?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Taladro Percutor 20V MAX',
    description: 'Motor sin escobillas de alto rendimiento, 2 velocidades',
    sku: 'TF-DRL-2024-001',
    price: 189.99,
    originalPrice: 249.99,
    stock: 'high',
    category: 'Taladros',
    brand: 'ToolFut Pro',
    power: '20V',
    batteryType: 'Li-ion',
    badge: 'bestseller',
    installments: 12,
    featured: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1632095710940-ad578e8cbe6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3dlciUyMGRyaWxsJTIwYmxhY2t8ZW58MXx8fHwxNzcwNjc1NzcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {
      color: [
        { name: 'Negro', value: '#000000' },
        { name: 'Rojo', value: '#dc2626' },
        { name: 'Azul', value: '#2563eb' },
      ],
      size: ['Kit Básico', 'Kit Pro', 'Kit Completo'],
    },
  },
  {
    id: '2',
    name: 'Amoladora Angular 125mm',
    description: 'Potencia 850W, sistema anti-vibración, regulación de velocidad',
    sku: 'TF-ANG-2024-087',
    price: 129.99,
    originalPrice: 159.99,
    stock: 'medium',
    category: 'Amoladoras',
    brand: 'ToolFut Pro',
    power: '850W',
    batteryType: 'Corded',
    badge: 'combo',
    installments: 6,
    featured: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1597554354354-ad6eba0e8340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwYW5nbGUlMjBncmluZGVyfGVufDF8fHx8MTc3MDY3NTc3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {
      material: ['Plástico Industrial', 'Aleación de Magnesio'],
    },
  },
  {
    id: '3',
    name: 'Atornillador de Impacto 18V',
    description: 'Torque 180Nm, batería litio-ion incluida, luz LED',
    sku: 'TF-IMP-2024-142',
    price: 159.99,
    stock: 'low',
    category: 'Atornilladores',
    brand: 'ToolFut Pro',
    power: '18V',
    batteryType: 'Li-ion',
    installments: 12,
    featured: true,
    bestSeller: true,
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
  },
  {
    id: '4',
    name: 'Sierra Circular 7-1/4"',
    description: 'Corte de precisión con guía láser',
    sku: 'TF-SAW-2024-056',
    price: 199.99,
    originalPrice: 259.99,
    stock: 'high',
    category: 'Sierras',
    brand: 'ToolFut Elite',
    power: '1800W',
    batteryType: 'Corded',
    badge: 'bestseller',
    installments: 12,
    featured: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1738817628789-5475991390c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaXJjdWxhciUyMHNhd3xlbnwxfHx8fDE3NzA2NzU3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {
      size: ['7-1/4"', '8-1/4"'],
    },
  },
  {
    id: '5',
    name: 'Martillo Rotativo 24V SDS',
    description: 'Potencia combinada para hormigón',
    sku: 'TF-HAM-2024-089',
    price: 249.99,
    originalPrice: 319.99,
    stock: 'low',
    category: 'Martillos',
    brand: 'ToolFut Elite',
    power: '24V',
    batteryType: 'Li-ion',
    badge: 'bestseller',
    installments: 12,
    featured: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1638503387702-3bc881d3ee52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMHJvdGFyeSUyMGhhbW1lciUyMGRyaWxsfGVufDF8fHx8MTc3MDY3NjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {
      size: ['SDS Plus', 'SDS Max'],
    },
  },
  {
    id: '6',
    name: 'Multiherramienta Oscilante',
    description: 'Versatilidad total con múltiples accesorios',
    sku: 'TF-MUL-2024-123',
    price: 89.99,
    originalPrice: 119.99,
    stock: 'high',
    category: 'Multiherramientas',
    brand: 'ToolFut Pro',
    power: '300W',
    batteryType: 'Corded',
    badge: 'new',
    installments: 6,
    featured: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvc2NpbGxhdGluZyUyMG11bHRpJTIwdG9vbHxlbnwxfHx8fDE3NzA2NzYxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {
      size: ['Kit Básico', 'Kit Pro'],
    },
  },
  {
    id: '7',
    name: 'Sierra Caladora 750W',
    description: 'Control de velocidad variable profesional',
    sku: 'TF-JIG-2024-428',
    price: 119.99,
    stock: 'medium',
    category: 'Sierras',
    brand: 'ToolFut Pro',
    power: '750W',
    batteryType: 'Corded',
    installments: 12,
    featured: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1592761735671-945aa9e10e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBqaWdzYXclMjBwb3dlciUyMHRvb2x8ZW58MXx8fHwxNzcwNjc2MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {},
  },
  {
    id: '8',
    name: 'Aspiradora Taller 20L',
    description: 'Succión industrial húmedo/seco',
    sku: 'TF-VAC-2024-642',
    price: 179.99,
    stock: 'high',
    category: 'Limpieza',
    brand: 'ToolFut Pro',
    power: '1200W',
    batteryType: 'Corded',
    installments: 12,
    featured: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1766096847418-9a2ae64c9621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMHZhY3V1bSUyMHdvcmtzaG9wfGVufDF8fHx8MTc3MDY3NjE2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {},
  },
  {
    id: '9',
    name: 'Nivel Láser Profesional',
    description: 'Auto-nivelación 360° con trípode',
    sku: 'TF-LEV-2024-753',
    price: 139.99,
    originalPrice: 189.99,
    stock: 'medium',
    category: 'Medición',
    brand: 'ToolFut Elite',
    power: 'Battery',
    batteryType: 'AA',
    badge: 'new',
    installments: 6,
    featured: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1694106722138-27187c94f50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYXNlciUyMGxldmVsJTIwdG9vbHxlbnwxfHx8fDE3NzA2NzYxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {},
  },
  {
    id: '10',
    name: 'Esmeril de Banco 150mm',
    description: 'Doble muela para afilado profesional',
    sku: 'TF-GRN-2024-864',
    price: 99.99,
    stock: 'high',
    category: 'Amoladoras',
    brand: 'ToolFut Pro',
    power: '500W',
    batteryType: 'Corded',
    installments: 6,
    featured: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1688940738180-aaa0bc27a4cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBiZW5jaCUyMGdyaW5kZXJ8ZW58MXx8fHwxNzcwNjc2MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {},
  },
  {
    id: '11',
    name: 'Pistola de Calor 2000W',
    description: 'Temperatura regulable digital',
    sku: 'TF-HET-2024-975',
    price: 69.99,
    originalPrice: 89.99,
    stock: 'high',
    category: 'Térmicas',
    brand: 'ToolFut Pro',
    power: '2000W',
    batteryType: 'Corded',
    badge: 'combo',
    installments: 6,
    featured: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1720036236727-009f5b6f5a20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWF0JTIwZ3VuJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NzA2NzYxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {},
  },
  {
    id: '12',
    name: 'Kit Banco de Trabajo Plegable',
    description: 'Superficie robusta con abrazaderas',
    sku: 'TF-WRK-2024-086',
    price: 159.99,
    stock: 'out',
    category: 'Accesorios',
    brand: 'ToolFut Pro',
    installments: 12,
    featured: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1746221331496-a87689fc8eb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrYmVuY2glMjB0b29sc3xlbnwxfHx8fDE3NzA2NzYxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    variants: {},
  },
];

export const categories = [
  'Todos',
  'Taladros',
  'Amoladoras',
  'Atornilladores',
  'Sierras',
  'Martillos',
  'Multiherramientas',
  'Medición',
  'Térmicas',
  'Limpieza',
  'Accesorios',
];

export const brands = ['ToolFut Pro', 'ToolFut Elite'];

export const powerOptions = ['18V', '20V', '24V', '300W', '500W', '750W', '850W', '1200W', '1800W', '2000W'];

export const batteryTypes = ['Li-ion', 'Corded', 'AA'];
