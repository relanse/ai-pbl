import {createRouter, createWebHistory} from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/pages/Layout.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login/Login.vue')
    }
  ]
})
export default router
