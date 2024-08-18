import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'CalculatorView',
      component: () => import('../views/CalculatorView.vue')
    },
    {
      path: '/calculator',
      name: 'CalculatorView',
      component: () => import('../views/CalculatorView.vue')
    },
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/records',
      name: 'RecordsView',
      component: () => import('../views/RecordsView.vue')
    }
  ]
})

export default router
