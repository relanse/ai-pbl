import {createRouter, createWebHistory} from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/pages/Layout.vue'),
      children: [
        {
          path: 'user',
          name: 'user',
          component: () => import('@/pages/User/UserInfo.vue')
        },
        {
          path: 'course',
          name: 'course',
          component: () => import('@/pages/course/courseMap.vue')
        },
        {
          path: 'course/all/:id',
          name: 'course-mainpage',
          component: () => import('@/pages/course/courseMainpage.vue')
        },
        {
          path: 'course/detail/:id',
          name: 'course-detail',
          component: () => import('@/pages/course/courseDetail.vue')
        },
        {
          path: 'certificate',
          name: 'certificate',
          component: () => import('@/pages/certificate/certificate.vue')
        },
        {
          path: 'levelTest',
          name: 'levelTest',
          component: () => import('@/pages/levelTest/levelTest.vue')
        },
        {
          path: 'course/:id/exercise',
          name: 'exercise',
          component: () => import('@/pages/course/exercise.vue')
        }
      ],
      redirect: '/course'
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
    },
    {
      path: '/register/userInfo',
      name: 'userInfo',
      component: () => import('@/pages/Login/FillUserInfo.vue')
    }
  ]
})
export default router
