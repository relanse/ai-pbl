export type CourseDataType<T extends keyof CourseTemplateMap> = {
  courseName: string
  version: string
  meta: {author: string; createTime: string; updateTime: string}
  pages: {
    uniqueId: string
    pageId: number
    templateType: string
    data: CourseTemplateMap[T]
  }[]
}
//连一连json模板格式
export type CourseConnectionType = {
  prompt: string
  leftColumn: {
    title: string
    cards: {
      id: string
      content: string
      tag: string
      img: string
      color: string
    }[]
  }
  rightColumn: {
    title: string
    cards: {id: string; content: string}[]
  }
  wrongMsg: string
}
//选择题json模板格式
export type CourseChoicesType = {
  prompt: string
  title: string
  options: {id: string; content: string}[]
  correctAnswer: string
}

//拖拽json模板格式
export type CourseDragType = {
  prompt: string
  title: string
  subtitle: string
  itemmean: string
  items: {
    id: string
    mean: string
    title: string
    color: string
  }[]
  targetmean: string
  targets: {
    id: string
    title: string
    subtitle: string
    correctItems: string[] // array of item titles that belong to this target
  }[]
}
// 找一找json模板格式
export type FindItemType = {
  id: string // 唯一ID
  x: number // x 坐标 (百分比)
  y: number // y 坐标 (百分比)
  text: string // 物品名称
  img: string // 物品图标URL
  found: boolean // 在预览模式下是否已被发现
}
export type CourseFindType = {
  prompt: string
  backgroundImg: string
  items: FindItemType[]
}
//模板组件映射
export type CourseTemplateMap = {
  connection: CourseConnectionType
  choices: CourseChoicesType
  drag: CourseDragType
  find: CourseFindType
}
