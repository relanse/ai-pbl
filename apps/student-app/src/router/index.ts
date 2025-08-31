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
    },
    {
      path: '/password-find',
      name: 'password-find',
      component: () => import('@/pages/Login/CodeVerification.vue')
    },
    {
      path: '/password-find/rest',
      name: 'password-rest',
      component: () => import('@/pages/Login/ResetPassword.vue')
    }
  ]
})
export default router
