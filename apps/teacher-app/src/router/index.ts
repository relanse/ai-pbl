import {createRouter, createWebHistory} from 'vue-router'

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
          path: 'student-manage',
          name: 'student',
          meta: {
            title: '学生管理'
          },
          component: () => import('@/pages/studentManage/studentManage.vue'),
          children: []
        },
        //课程管理
        {
          path: 'course-manage',
          name: 'course',
          meta: {
            title: '课程管理'
          },
          component: () => import('@/pages/courseManage/courseManage.vue'),
          children: []
        },
        //课程管理->创建课程
        {
          path: 'course-manage/create',
          name: 'course-create',
          meta: {
            title: '新建课程',
            activeMenu: '/course-manage',
            parentTitle: '课程管理',
            parentPath: '/course-manage'
          },
          component: () => import('@/pages/courseManage/courseCreate.vue')
        },
        //项目管理
        {
          path: 'project-manage',
          name: 'project',
          meta: {
            title: '项目管理'
          },
          component: () => import('@/pages/projectManage/projectManage.vue'),
          children: []
        },
        //项目管理->查看学生项目情况
        {
          path: 'project/student-details',
          name: 'student-details',
          component: () => import('@/pages/projectManage/studentDetails.vue'),
          meta: {
            title: '学生项目情况',
            activeMenu: '/project-manage'
          }
        },
        //项目管理->查看学生项目情况->项目详情
        {
          path: 'project/student-details/project-details',
          name: 'project-details',
          component: () => import('@/pages/projectManage/projectDetails.vue'),
          meta: {
            title: '项目详情',
            activeMenu: '/project-manage',
            parentTitle: '学生项目情况',
            parentPath: '/project/student-details'
          }
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
})

export default router
