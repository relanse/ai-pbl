import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/pages/layout/layout.vue'),
      children: [
        //学生管理
        {
          path: '/student-manage',
          name: 'student-manage',
          component: () => import('@/pages/studentManage/studentManage.vue'),
          children: []
        },
        //课程管理
        {
          path: 'course-manage',
          name: 'course-manage',
          component: () => import('@/pages/courseManage/courseManage.vue'),
          children: []
        },
        //项目管理
        {
          path: 'project-manage',
          name: 'project-manage',
          component: () => import('@/pages/projectManage/projectManage.vue'),
          children: []
        }
      ],
      redirect: '/student-manage'
    },
    //登录
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/login.vue'),
      children: []
    }
  ]
});

export default router;
