import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';
// 定义路由
const routes: RouteRecordRaw[] = [
          {
                    path: '/login',
                    name: 'login',
                    component: import('@/pages/login/LoginPage.vue')
          }
];

// 创建路由实例
const router = createRouter({
          history: createWebHistory(),
          routes
});

export default router;
