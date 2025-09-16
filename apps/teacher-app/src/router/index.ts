import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/pages/layout.vue'),
      children: [
        //学生管理
        {
          path: 'student-manage',
          name: 'student',
          meta: {
            title: '学生管理'
          },
          component: () => import('@/pages/studentManage/index.vue')
        },
        // 学生详情
        {
          path: 'student-details',
          name: 'student-details',
          meta: {title: '个人详情', activeMenu: '/student-manage'},
          component: () => import('@/pages/studentManage/StudentDetail.vue')
        },
        //等级课程管理
        {
          path: 'course-level-manage',
          name: 'course-level-manage',
          meta: {title: '等级课程管理'},
          component: () => import('@/pages/courseManage/index.vue')
        },
        // 课程管理 -> 课程子列表
        {
          path: 'course-level-manage/:courseId',
          name: 'course-sub-list',
          meta: {title: '课程管理', activeMenu: '/course-level-manage'},
          component: () => import('@/pages/courseManage/courseSubList.vue')
        },
        // 新建课程
        {
          path: 'course-level-manage/:courseId/lesson/create',
          name: 'course-lesson-create',
          meta: {title: '新课程', activeMenu: '/course-level-manage'},
          component: () => import('@/pages/courseManage/courseLessonEdit.vue')
        },
        // 编辑课程
        {
          path: 'course-level-manage/:courseId/lesson/:lessonId/edit',
          name: 'course-lesson-edit',
          meta: {title: '编辑课程', activeMenu: '/course-level-manage'},
          component: () => import('@/pages/courseManage/courseLessonEdit.vue')
        },
        // 课程详情
        {
          path: 'course-level-manage/:courseId/lesson/:lessonId/detail',
          name: 'course-lesson-detail',
          meta: {title: '课程详情', activeMenu: '/course-level-manage'},
          component: () => import('@/pages/courseManage/courseLessonEdit.vue')
        },
        //题目管理
        {
          path: 'question-manage',
          name: 'question',
          meta: {title: '题目管理'},
          component: () => import('@/pages/questionManage/index.vue')
        },
        //证书管理
        {
          path: 'certificate-manage',
          name: 'certificate',
          meta: {title: '证书管理'},
          component: () => import('@/pages/certificateManage/index.vue')
        },
        //通知公告
        {
          path: 'notice',
          name: 'notice',
          meta: {title: '通知公告'},
          component: () => import('@/pages/notice/index.vue')
        },
        //个人中心
        {
          path: 'profile',
          name: 'profile',
          meta: {title: '个人中心'},
          component: () => import('@/pages/profile/index.vue')
        }
      ],
      redirect: 'student-manage'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('@/pages/courseEdit/courseEdit.vue')
    }
  ]
})
export default router
