import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { CartPage } from '@/modules/cart'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/modules/landing/LandingPage.vue'),
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/modules/products/ShopPage.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import('@/shared/components/Forbidden.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/shared/components/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
