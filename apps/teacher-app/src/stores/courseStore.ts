import {defineStore} from 'pinia'
import {v4 as uuidv4} from 'uuid'

export type LessonStatus = 'published' | 'draft'
export type LessonType = '录播' | '腾讯会议'

export interface LessonItem {
  id: string
  courseId: string // 大课程: L1/L2
  no: string // 课程序号，如 课程1
  name: string
  brief: string
  type: LessonType
  // 如果是腾讯会议，保存会议地址
  meetingUrl?: string
  cover: string
  intro: string
  points: string[]
  video?: {
    name: string
    url?: string
    duration?: string // mm:ss，用于占位
  } | null
  files: {name: string; size: string; url?: string; type?: string}[]
  status: LessonStatus
  creator: string
  createdAt: string
}

export interface CourseItem {
  id: string // L1/L2
  name: string // L1.认知基础
  published: boolean
  intro?: string
  cover?: string
}

function nowDate(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function createMock(): {courses: CourseItem[]; lessons: LessonItem[]} {
  const courses: CourseItem[] = [
    {id: 'L1', name: 'L1.认知基础', published: true},
    {id: 'L2', name: 'L2.进阶训练', published: false}
  ]
  const lessons: LessonItem[] = []
  for (const c of courses) {
    for (let i = 1; i <= 8; i++) {
      lessons.push({
        id: uuidv4(),
        courseId: c.id,
        no: `课程${i}`,
        name: `这是一段课程名称 ${i}`,
        brief: '这是一段课程简介最多显示两行，鼠标悬浮可显示全部内容。',
        type: i % 2 === 0 ? '录播' : '腾讯会议',
        meetingUrl:
          i % 2 === 0
            ? undefined
            : 'https://meeting.tencent.com/dm/abcdef123456',
        cover: 'https://dummyimage.com/240x160/e9eef5/999',
        intro:
          '这些是一些课程的介绍内容，这些是一些课程的介绍内容，这些是一些课程的介绍内容。',
        points: [
          '要点1：这些是一些课程的介绍内容',
          '要点2：这些是一些课程的介绍内容'
        ],
        video: {name: '上传的视频的名称.mp4', duration: '00:23', url: ''},
        files: [
          {name: '附件名称.pdf', size: '3.2M'},
          {name: '附件名称.jpg', size: '3.2M'}
        ],
        status: i === 1 ? 'published' : 'draft',
        creator: '张三',
        createdAt:
          i === 1
            ? nowDate(new Date('2024-03-25'))
            : i === 2
              ? nowDate(new Date('2024-02-08'))
              : nowDate(new Date('2023-04-10'))
      })
    }
  }
  return {courses, lessons}
}

export const useCourseStore = defineStore('teacher-courses', {
  state: () => ({
    courses: [] as CourseItem[],
    lessons: [] as LessonItem[]
  }),
  actions: {
    init() {
      if (!this.courses.length && !this.lessons.length) {
        const data = createMock()
        this.courses = data.courses
        this.lessons = data.lessons
      }
    },
    createCourse(
      nameOrOpts?:
        | string
        | {name?: string; intro?: string; cover?: string; published?: boolean}
    ): CourseItem {
      // 生成形如 L3 的新 ID：找到现有最大编号 + 1
      const maxNum = this.courses
        .map(c => Number((c.id || '').replace(/^L/i, '')))
        .filter(n => !isNaN(n))
        .reduce((m, n) => Math.max(m, n), 0)
      const idNum = maxNum + 1
      const id = `L${idNum}`
      const opts =
        typeof nameOrOpts === 'string' ? {name: nameOrOpts} : nameOrOpts || {}
      const cname =
        opts.name && opts.name.trim() ? opts.name.trim() : `${id}.新建课程`
      const created: CourseItem = {
        id,
        name: cname,
        published: !!opts.published,
        intro: opts.intro,
        cover: opts.cover
      }
      this.courses.push(created)
      return created
    },
    listCourses() {
      return this.courses
    },
    listLessons(courseId: string) {
      return this.lessons.filter(l => l.courseId === courseId)
    },
    getLesson(courseId: string, lessonId: string) {
      return (
        this.lessons.find(l => l.courseId === courseId && l.id === lessonId) ||
        null
      )
    },
    setCoursePublished(courseId: string, published: boolean) {
      const c = this.courses.find(c => c.id === courseId)
      if (c) c.published = published
    },
    updateCourse(courseId: string, patch: Partial<CourseItem>) {
      const idx = this.courses.findIndex(c => c.id === courseId)
      if (idx >= 0) {
        this.courses[idx] = {...this.courses[idx], ...patch}
      }
    },
    deleteCourse(courseId: string) {
      this.courses = this.courses.filter(c => c.id !== courseId)
      // 同时清理其下 lessons
      this.lessons = this.lessons.filter(l => l.courseId !== courseId)
    },
    setLessonStatus(lessonId: string, status: LessonStatus) {
      const l = this.lessons.find(l => l.id === lessonId)
      if (l) l.status = status
    },
    setAllLessonsStatus(courseId: string, status: LessonStatus) {
      this.lessons = this.lessons.map(l =>
        l.courseId === courseId ? {...l, status} : l
      )
    },
    saveLesson(
      payload: Partial<LessonItem> & {id?: string; courseId: string}
    ): string {
      if (payload.id) {
        const idx = this.lessons.findIndex(l => l.id === payload.id)
        if (idx >= 0) {
          this.lessons[idx] = {...this.lessons[idx], ...payload} as LessonItem
          return this.lessons[idx].id
        }
      }
      const id = uuidv4()
      const d: LessonItem = {
        id,
        courseId: payload.courseId,
        no:
          payload.no ||
          `课程${this.lessons.filter(l => l.courseId === payload.courseId).length + 1}`,
        name: payload.name || '未命名课程',
        brief:
          payload.brief ||
          '这是一段课程简介最多显示两行，鼠标悬浮可显示全部内容。',
        type: (payload.type as LessonType) || '录播',
        meetingUrl: payload.meetingUrl,
        cover: payload.cover || 'https://dummyimage.com/240x160/e9eef5/999',
        intro: payload.intro || '',
        points: payload.points || [],
        video: payload.video || {
          name: '上传的视频的名称.mp4',
          duration: '00:23',
          url: ''
        },
        files: payload.files || [],
        status: (payload.status as LessonStatus) || 'draft',
        creator: '张三',
        createdAt: nowDate()
      }
      this.lessons.unshift(d)
      return id
    },
    deleteLesson(lessonId: string) {
      this.lessons = this.lessons.filter(l => l.id !== lessonId)
    }
  },
  persist: true
})
