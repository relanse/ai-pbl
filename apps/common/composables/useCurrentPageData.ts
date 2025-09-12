import {computed, inject} from 'vue'
import {
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
} from '../components/CourseTemplate/provider'
import {getTemplateDefaultData} from '../components/CourseTemplate/templateDefaults'

/**
 * 一个自定义 Hook，用于获取和设置当前选中页面的数据。
 * @param templateType - 模板类型，用于获取默认数据。
 * @returns 一个可写的计算属性，它代理了当前页面的数据。
 */
export function useCurrentPageData<T>(templateType: string) {
  // 从上层注入 isEdit, courseData, selectedPageIndex
  const {courseData, selectedPageIndex} = inject(
    CourseTemplateProviderKey,
    CourseTemplateProviderDefaultValue
  )
  const data = computed<T>({
    get: () => {
      if (selectedPageIndex.value !== null) {
        return courseData.value.pages[selectedPageIndex.value].data as T
      }
      return getTemplateDefaultData(templateType) as T
    },
    set: val => {
      if (selectedPageIndex.value !== null) {
        courseData.value.pages[selectedPageIndex.value].data = val
      }
    }
  })
  return {data}
}
