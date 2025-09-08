import {ref, type InjectionKey, type Ref} from 'vue'
export type CourseTemplateProvider = {
  isEdit: Ref<boolean>
  courseData: Ref<{
    courseName: string
    version: string
    meta: object
    pages: {uniqueId: string; pageId: number; templateType: string; data: any}[]
  }>
  selectedPageIndex: Ref<number | null>
}

// 创建一个类型安全的 Injection Key
export const CourseTemplateProviderKey: InjectionKey<CourseTemplateProvider> =
  Symbol('CourseTemplateProviderKey')
export const CourseTemplateProviderDefaultValue = {
  isEdit: ref(false),
  courseData: ref({
    courseName: 'AI 应用课',
    version: '1.0.0',
    meta: {
      author: 'nas',
      createdAt: '2025-09-05T12:00:00Z',
      updatedAt: '2025-09-05T12:30:00Z'
    },
    pages: []
  }),
  selectedPageIndex: ref<number | null>(null)
}
